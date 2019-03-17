from flask import Flask, render_template, request, jsonify
from queue import Queue
import pymysql

app = Flask(__name__)


class DB:
	def __init__(self):
		host = "127.0.0.1"
		user = "root"
		password = "root"
		db = "hack_nu"
		self.con = pymysql.connect(host=host, user=user, password=password, db=db, cursorclass=pymysql.cursors.DictCursor)
		self.cur = self.con.cursor()

	def execute(self, query):
		self.cur.execute(query)
		self.con.commit()
		result = self.cur.fetchall()
		return result

	def close(self):
		self.con.close()


class Vertex:
	def __init__(self, question, typ, is_ans=0, ans=None, isRoot=False, autoSave=True):
		self.idvertex = None
		self.question = question
		self.typ = typ
		self.is_ans = is_ans
		self.ans = ans
		self.idvertex = None
		self.isRoot = isRoot
		self.idvertex = None
		if autoSave:
			self.save()
	
	def save(self):
		db = DB()
		if self.is_ans:
			db.execute(f'INSERT INTO vertex (question, typ, is_ans, ans) VALUES ("{self.question}", "{self.typ}", {self.is_ans}, "{self.ans}")')
		else:
			db.execute(f'INSERT INTO vertex (question, typ) VALUES ("{self.question}", "{self.typ}")')
		self.idvertex = db.execute('SELECT LAST_INSERT_ID()')[0]['LAST_INSERT_ID()']

		if self.isRoot:
			db.execute(f'Insert INTO roots (idroots) VALUES ({self.idvertex})')

		db.close()
		return self.idvertex
		

class Edge:
	def __init__(self, ans, id_parent, id_child=None, autoSave=True):
		self.id_parent = id_parent
		self.id_child = id_child
		self.ans = ans
		self.idedge = None
		if autoSave:
			self.idedge = self.save()
	
	def save(self):
		db = DB()
		if self.id_child is None:
			db.execute(f'INSERT INTO edge (ans, id_parent) VALUES ("{self.ans}", {self.id_parent})')
		else:
			db.execute(f'INSERT INTO edge (ans, id_parent, id_child) VALUES ("{self.ans}", {self.id_parent}, {self.id_child})')
		res = db.execute('SELECT LAST_INSERT_ID()')
		db.close()
		return res[0]['LAST_INSERT_ID()']


# @app.route("/")
# def home():
# 	return render_template('index.html')

# @app.route("/show")
# def home1():
# 	return render_template('index.html')

# @app.route("/create")
# def home2():
# 	return render_template('index.html')

# @app.route("/roots")
# def home3():
# 	return render_template('index.html')

@app.route("/submit_tree", methods=['POST'])
def submit_tree():
	print("---------post")
	data = request.get_json()
	print(data)
	parent = data;

	if parent['typ'] != 'Reference':
		if len(parent['question']) == 0:
			return jsonify({ 'typ': 'danger', 'message': 'you have empty fields' })
	else:
		return jsonify({ 'typ': 'danger', 'message': 'The root must not be a reference!' })

	q = Queue()
	q.put(data)

	while q.qsize() > 0:
		parent = q.get()
		for child in parent['children']:
			if (child['typ'] == 'Reference'):
				db = DB()
				res = db.execute(f"SELECT * FROM vertex WHERE idvertex = {int(child['ref'])}")
				db.close()
				if len(res) == 0:
					return jsonify({ 'typ': 'danger', 'message': f'reference to undefined node {child["ref"]}' })
			q.put(child)
			if len(child['question']) == 0 or len(child['parent_ans']):
				return jsonify({ 'typ': 'danger', 'message': 'you have empty fields' })


	myParent = Vertex(parent['question'], parent['typ'], is_ans=parent['is_ans'], ans=parent['ans'], isRoot=True)
	q = Queue()
	q.put((data, myParent.idvertex))

	while q.qsize() > 0:
		parent, parent_idvertex = q.get()
		print(parent['question'])
		for child in parent['children']:
			myChild = Vertex(child['question'], child['typ'], is_ans=child['is_ans'], ans=child['ans'])
			Edge(child['parent_ans'], parent_idvertex, id_child=myChild.idvertex)
			
			if (child['typ'] == 'Reference'):
				db = DB()
				res = db.execute(f"SELECT * FROM vertex WHERE idvertex = {int(child['ref'])}")
				db.close()
				if len(res) > 0:
					Edge('', myChild.idvertex, int(child['ref']))
			q.put((child, myChild.idvertex))
	return jsonify({ 'typ': 'success', 'message': 'Tree is saved' })


@app.route("/get_trees", methods=['GET', 'POST'])
def get_trees():
	db = DB()
	root_ids = db.execute('SELECT * FROM roots')
	print(root_ids)
	res = []
	q = Queue()

	for r in root_ids:
		obj = db.execute(f"SELECT * FROM vertex WHERE idvertex = {r['idroots']}")[0]
		obj['children'] = []
		res.append(obj)
		q.put(obj)

	while q.qsize() > 0:
		parent = q.get()
		parent['children'] = []
		if parent['typ'] == 'Reference':
			refs = db.execute(f"SELECT * FROM edge WHERE id_parent = {parent['idvertex']}")
			if len(refs):
				parent['ref'] = refs[0]['id_child']
			continue
		child_ids = db.execute(f"SELECT * FROM edge WHERE id_parent = {parent['idvertex']}")
		for child_id in child_ids:
			if child_id['id_child']:
				obj = db.execute(f"SELECT * FROM vertex WHERE idvertex = {child_id['id_child']}")[0]
				
				if obj['typ'] == 'Reference':
					refs = db.execute(f"SELECT * FROM edge WHERE id_parent = {obj['idvertex']}")
					if len(refs):
						ref = refs[0]['id_child']
						for i in range(len(res)):
							if res[i]['idvertex'] == ref:
								obj = res[i]
								res.pop(i)
								break

				obj['parent_ans'] = child_id['ans']
				obj['parent_edge'] = child_id['idedge']
				parent['children'].append(obj)
				q.put(obj)

	db.close()

	return jsonify(res)

@app.route("/get_roots", methods=['GET', 'POST'])
def get_roots():
	db = DB()
	res = db.execute('SELECT idvertex, question, ans, typ FROM roots LEFT JOIN vertex on roots.idroots=vertex.idvertex')
	return jsonify(res)


@app.route("/commit_changes", methods=['POST'])
def commit_changes():
	changes = request.get_json()
	print(changes)
	db = DB()
	for key in changes:
		for typ in changes[key]:
			if (typ == 'question' or typ == 'parent_ans') and len(changes[key][typ]) == 0:
				db.close()
				return jsonify({ 'typ': 'danger', 'message': 'you have empty fields' })
			if typ == 'parent_ans':
				db.execute(f"UPDATE edge SET ans = '{changes[key][typ]}' WHERE idedge={key}")
			elif typ == 'ans':
				db.execute(f"UPDATE vertex SET ans = '{changes[key][typ]}' WHERE idvertex={key}")
			elif typ == 'question':
				db.execute(f"UPDATE vertex SET question = '{changes[key][typ]}' WHERE idvertex={key}")
		
	db.close()
	return jsonify({ 'typ': 'success', 'message': 'Tree is saved' })


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')

if __name__ == "__main__":
	app.run(host='0.0.0.0', debug=True)

