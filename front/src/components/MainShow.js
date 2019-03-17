import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container, Row, Col, Dropdown, DropdownButton} from 'react-bootstrap';

class MainShow extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.obj;
    }

  onChangeText(event){
    this.props.obj.question = event.target.value;
    if ( !this.props.changes.hasOwnProperty(this.props.obj.idvertex) ) {
      this.props.changes[this.props.obj.idvertex] = {};
    }
    this.props.changes[this.props.obj.idvertex]["question"] = event.target.value;
  }
  handleClick() {
    let self = this;
    this.setState({hidden: !self.state.hidden});
  }

  onChangeAns(event){
    this.props.obj.ans = event.target.value;
    this.props.obj.is_ans = (event.target.value != '');
    if ( !this.props.changes.hasOwnProperty(this.props.obj.idvertex) ) {
      this.props.changes[this.props.obj.idvertex] = {};
    }
    this.props.changes[this.props.obj.idvertex]["ans"] = event.target.value;
  }

  onChangeParAns(event) {
    this.props.obj.parent_ans = event.target.value;
    if ( !this.props.changes.hasOwnProperty(this.props.obj.parent_edge) ) {
      this.props.changes[this.props.obj.parent_edge] = {};
    }
    this.props.changes[this.props.obj.parent_edge]["parent_ans"] = event.target.value;
  }

  handleClick() {
    let self = this;
    this.setState({hidden: !self.state.hidden});
  }

  render() {
        let self = this;
        if (this.props.obj.typ == "Binary") {
          return (
            <li key={this.props.key} style={{padding: "20px 20px 0px 20px"}}>
                <form>
                    { !self.props.isRoot ? ( self.props.isBin ? <input value={ self.props.isYes ? "Yes" : "No" } disabled/> : ( self.props.isCont ? <input disabled value="<Any>"/> : <input onChange={self.onChangeParAns.bind(self)} defaultValue={self.props.obj.parent_ans} />) ) : <div></div>}
                        { !self.props.isRoot ? <span style={{fontSize: "150%", position: "absolute"}}>&#8628;</span> : <div></div>}
                        <div style={{marginTop: "15px", marginBottom: "0px"}}>

                          <span style={{padding: "10px", borderRadius: "4px", border: "1px solid grey", backgroundColor: "#4c75a3"}}>
                          <Button style={{margin: "0px 7px 0px 0px", border: "1px solid white", padding: "0px 5px 0px 5px", borderRadius: "10px", backgroundColor: "white", color: "#4c75a3"}} onClick={this.handleClick.bind(this)}>
                            { !self.state.hidden ? <span>&#9698;</span> : <span>&#9701;</span>}
                          </Button>
                          <input type="text" disabled value={self.props.obj.idvertex} style={{width: "50px", marginRight: "10px"}} />
                            <input onChange={this.onChangeText.bind(this)} defaultValue={self.props.obj.question} type="text" style={{marginRight: "10px"}} />

                            <select disabled defaultValue={self.props.obj.typ} id="dropdown-basic-button" style={{marginRight: "10px"}}>
                              <option value="Binary">Binary</option>
                              <option value="Multiple">Multiple</option>
                              <option value="Continue">Continue</option>
                              <option value="End">End</option>
                              <option value="Reference">Reference</option>
                            </select>
                            <input onChange={this.onChangeAns.bind(this)} defaultValue={self.props.obj.ans} type="text"/>
                          </span>
                        </div>
                </form>
              <ul style={{}} hidden={self.state.hidden}>
                <MainShow changes={self.props.changes} obj={self.props.obj.children[0]} isBin={true} isYes={true} key={self.props.obj.children[0].idvertex}/>
                <MainShow changes={self.props.changes} obj={self.props.obj.children[1]} isBin={true} key={self.props.obj.children[1].idvertex}/>
              </ul>
            </li>
          );
        }
        if (this.props.obj.typ == "Multiple") {
          return (
            <li key={this.props.key} style={{padding: "20px 20px 0px 20px"}}>
                  <form>
                      { !self.props.isRoot ? ( self.props.isBin ? <input value={ self.props.isYes ? "Yes" : "No" } disabled/> : ( self.props.isCont ? <input disabled value="<Any>"/> : <input onChange={self.onChangeParAns.bind(self)} defaultValue={self.props.obj.parent_ans}/>) ) : <div></div>}
                      { !self.props.isRoot ? <span style={{fontSize: "150%", position: "absolute"}}>&#8628;</span> : <div></div>}
                    <div style={{marginTop: "15px", marginBottom: "0px"}}>
                      <span style={{padding: "10px", borderRadius: "4px", border: "1px solid grey", backgroundColor: "#4c75a3"}}>
                        <Button style={{margin: "0px 7px 0px 0px", border: "1px solid white", padding: "0px 5px 0px 5px", borderRadius: "10px", backgroundColor: "white", color: "#4c75a3"}} onClick={this.handleClick.bind(this)}>
                            { !self.state.hidden ? <span>&#9698;</span> : <span>&#9701;</span>}
                          </Button>
                        <input type="text" disabled value={self.props.obj.idvertex} style={{width: "50px", marginRight: "10px"}} />
                        <input onChange={this.onChangeText.bind(this)} defaultValue={self.props.obj.question} type="text" style={{marginRight: "10px"}} />

                        <select disabled defaultValue={self.props.obj.typ} id="dropdown-basic-button" style={{marginRight: "10px"}}>
                          <option value="Binary">Binary</option>
                          <option value="Multiple">Multiple</option>
                          <option value="Continue">Continue</option>
                          <option value="End">End</option>
                          <option value="Reference">Reference</option>
                        </select>
                        <input disabled defaultValue={self.props.obj.children.length} id="multtt" type="number" style={{width:"40px", marginRight: "10px"}}/>
                        <input onChange={this.onChangeAns.bind(this)} defaultValue={self.props.obj.ans} type="text" style={{width:"138px"}}/>
                      </span>
                    </div>
                  </form>
              <ul style={{}} hidden={self.state.hidden}>
                {
                    this.props.obj.children.map((ind) => {
                        return <MainShow changes={self.props.changes} obj={ind} key={ind.idvertex}/>
                    })
                }
              </ul>
            </li>
          );
        }
        if (this.props.obj.typ == "Continue") {
          return (
            <li key={this.props.key} style={{padding: "20px 20px 0px 20px"}}>
              <form>
                      { !self.props.isRoot ? ( self.props.isBin ? <input value={ self.props.isYes ? "Yes" : "No" } disabled/> : ( self.props.isCont ? <input disabled value="<Any>"/> : <input onChange={self.onChangeParAns.bind(self)} defaultValue={self.props.obj.parent_ans} />) ) : <div></div>}
                      { !self.props.isRoot ? <span style={{fontSize: "150%", position: "absolute"}}>&#8628;</span> : <div></div>}
                    <div style={{marginTop: "15px", marginBottom: "0px"}}>
                      <span style={{padding: "10px", borderRadius: "4px", border: "1px solid grey", backgroundColor: "#4c75a3"}}>
                        <Button style={{margin: "0px 7px 0px 0px", border: "1px solid white", padding: "0px 5px 0px 5px", borderRadius: "10px", backgroundColor: "white", color: "#4c75a3"}} onClick={this.handleClick.bind(this)}>
                            { !self.state.hidden ? <span>&#9698;</span> : <span>&#9701;</span>}
                          </Button>
                          <input type="text" disabled value={self.props.obj.idvertex} style={{width: "50px", marginRight: "10px"}} />
                        <input onChange={this.onChangeText.bind(this)} defaultValue={self.props.obj.question} type="text" style={{marginRight: "10px"}} />
                        <select disabled defaultValue={self.props.obj.typ} id="dropdown-basic-button" style={{marginRight: "10px"}}>
                          <option value="Binary">Binary</option>
                          <option value="Multiple">Multiple</option>
                          <option value="Continue">Continue</option>
                          <option value="End">End</option>
                          <option value="Reference">Reference</option>
                        </select>
                        <input onChange={this.onChangeAns.bind(this)} defaultValue={self.props.obj.ans} type="text" />
                      </span>
                    </div>
              </form>
              <ul style={{}} hidden={self.state.hidden}>
                <MainShow changes={self.props.changes} obj={self.props.obj.children[0]} isCont = {true} key={self.props.obj.children[0].idvertex}/>
              </ul>
            </li>
          );
        }
        if (this.props.obj.typ == "End") {
            return (
              <li key={this.props.key} style={{padding: "20px 20px 0px 20px"}}>
                <form type="exampleForm.ControlInput1">
                      { !self.props.isRoot ? ( self.props.isBin ? <input value={ self.props.isYes ? "Yes" : "No" } disabled/> : ( self.props.isCont ? <input disabled value="<Any>"/> : <input onChange={self.onChangeParAns.bind(self)} defaultValue={self.props.obj.parent_ans} />) ) : <div></div>}
                      { !self.props.isRoot ? <span style={{fontSize: "150%", position: "absolute"}}>&#8628;</span> : <div></div>}
                      <div style={{marginTop: "15px", marginBottom: "0px"}}>
                        <span style={{padding: "10px", borderRadius: "4px", border: "1px solid grey", backgroundColor: "#4c75a3"}}>
                          <Button style={{margin: "0px 7px 0px 0px", border: "1px solid white", padding: "0px 5px 0px 5px", borderRadius: "10px", backgroundColor: "white", color: "#4c75a3"}} onClick={this.handleClick.bind(this)}>
                            { !self.state.hidden ? <span>&#9698;</span> : <span>&#9701;</span>}
                          </Button>
                          <input type="text" disabled value={self.props.obj.idvertex} style={{width: "50px", marginRight: "10px"}} />
                          <input onChange={this.onChangeText.bind(this)} defaultValue={self.props.obj.question} type="text" style={{marginRight: "10px"}} />
                          <select disabled defaultValue={self.props.obj.typ} id="dropdown-basic-button" style={{marginRight: "10px"}}>
                            <option value="Binary">Binary</option>
                            <option value="Multiple">Multiple</option>
                            <option value="Continue">Continue</option>
                            <option value="End">End</option>
                            <option value="Reference">Reference</option>
                          </select>
                          <input onChange={this.onChangeAns.bind(this)} defaultValue={self.props.obj.ans} type="text" />
                        </span>
                      </div>
                  </form>
              </li>
            );
            
        }

        if (this.props.obj.typ == "Reference") {
            return (
              <li key={this.props.key} style={{padding: "20px 20px 0px 20px"}}>
                <form type="exampleForm.ControlInput1">
                      { !self.props.isRoot ? ( self.props.isBin ? <input value={ self.props.isYes ? "Yes" : "No" } disabled/> : ( self.props.isCont ? <input disabled value="<Any>"/> : <input onChange={self.onChangeParAns.bind(self)} defaultValue={self.props.obj.parent_ans} />) ) : <div></div>}
                      { !self.props.isRoot ? <span style={{fontSize: "150%", position: "absolute"}}>&#8628;</span> : <div></div>}
                      <div style={{marginTop: "15px", marginBottom: "0px"}}>
                        <span style={{padding: "10px", borderRadius: "4px", border: "1px solid grey", backgroundColor: "#4c75a3"}}>
                          <Button style={{margin: "0px 7px 0px 0px", border: "1px solid white", padding: "0px 5px 0px 5px", borderRadius: "10px", backgroundColor: "white", color: "#4c75a3"}} onClick={this.handleClick.bind(this)}>
                            { !self.state.hidden ? <span>&#9698;</span> : <span>&#9701;</span>}
                          </Button>
                          <input type="text" disabled value={self.props.obj.idvertex} style={{width: "50px", marginRight: "10px"}} />
                          <input disabled defaultValue={self.props.obj.ref} type="text" style={{marginRight: "10px"}}/>
                          <select disabled defaultValue={self.props.obj.typ} id="dropdown-basic-button">
                            <option value="Binary">Binary</option>
                            <option value="Multiple">Multiple</option>
                            <option value="Continue">Continue</option>
                            <option value="End">End</option>
                            <option value="Reference">Reference</option>
                          </select>
                        </span>
                      </div>
                  </form>
              </li>
            );
            
        }
  }
}

export default MainShow; 