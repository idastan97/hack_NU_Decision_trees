import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container, Row, Col, Dropdown, DropdownButton} from 'react-bootstrap';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { value: "End", multNum: 0, mains: [], hidden: false, obj: {
          question: '',
          typ: 'End',
          is_ans: 0,
          ans: '',
          parent_ans: '',
          ref: '',
          children: []
      }};

      if (this.props.isBin)
        this.state.obj.parent_ans = ( this.props.isYes ? "Yes" : "No");

      if (this.props.isCont)
        this.state.obj.parent_ans = "<Any>";

      this.props.addChild(this.state.obj);
      this.onChangeType = this.onChangeType.bind(this);
      this.onChangeNum = this.onChangeNum.bind(this);
      this.addChild = this.addChild.bind(this);
      this.removeChild = this.removeChild.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    addChild(obj){
      this.state.obj.children.push(obj);
    }

    removeChild(obj){
      let ind = this.state.obj.children.indexOf(obj);
      this.state.obj.children.splice(ind, 1);
    }

  onChangeType(event){
        console.log(event.target.value);
        this.setState({value: event.target.value});
        this.state.obj.typ = event.target.value;
  }
  onChangeNum(event){
        // console.log(event.target.value);
        if (event.target.value > 20) {
          event.target.value = 20;
        }
        if (event.target.value < 0){
          event.target.value = 0;
        }
        let i = 0;
        let newMains = []
        for (i=0; i<event.target.value; i++){
          newMains.push(i);
        }
        this.setState({multNum: event.target.value, mains: newMains});
  }
  onChangeText(event){
    this.state.obj.question = event.target.value;
  }
  handleClick() {
    let self = this;
    this.setState({hidden: !self.state.hidden});
  }
  onChangeRef(event){
    this.state.obj.ref = event.target.value;
  }

  onChangeAns(event){
    this.state.obj.ans = event.target.value;
    this.state.obj.is_ans = (event.target.value != '');
  }

  onChangeParAns(event) {
    this.state.obj.parent_ans = event.target.value;
  }

  componentWillUnmount(){
    this.props.removeChild(this.state.obj);
  }

  render() {
        let self = this;
        if (this.state.value == "Binary") {
          return (
            <li key={this.props.key} style={{padding: "20px 20px 0px 20px"}}>
                <form>
                    { !self.props.isRoot ? ( self.props.isBin ? <input value={ self.props.isYes ? "Yes" : "No" } disabled/> : ( self.props.isCont ? <input disabled value="<Any>"/> : <input onChange={self.onChangeParAns.bind(self)}/>) ) : <div></div>}
                        { !self.props.isRoot ? <span style={{fontSize: "150%", position: "absolute"}}>&#8628;</span> : <div></div>}
                        <div style={{marginTop: "15px", marginBottom: "0px"}}>

                          <span style={{padding: "10px", borderRadius: "4px", border: "1px solid grey", backgroundColor: "#4c75a3"}}>
                          <Button style={{margin: "0px 7px 0px 0px", border: "1px solid white", padding: "0px 5px 0px 5px", borderRadius: "10px", backgroundColor: "white", color: "#4c75a3"}} onClick={this.handleClick.bind(this)}>
                            { !self.state.hidden ? <span>&#9698;</span> : <span>&#9701;</span>}
                          </Button>
                            <input onChange={this.onChangeText.bind(this)} type="text" required placeholder="System question" style={{marginRight: "10px"}} />

                            <select onChange={this.onChangeType.bind(this)} id="dropdown-basic-button" style={{marginRight: "10px"}}>
                              <option value="Binary">Binary</option>
                              <option value="Multiple">Multiple</option>
                              <option value="Continue">Continue</option>
                              <option value="End">End</option>
                              <option value="Reference">Reference</option>
                            </select>
                            <input onChange={this.onChangeAns.bind(this)} type="text" placeholder="System answer"/>
                          </span>
                        </div>
                </form>
              <ul style={{}} hidden={self.state.hidden}>
                <Main isBin={true} isYes={true} addChild={self.addChild} removeChild={self.removeChild} key={self.props.getCount().toString()} getCount={self.props.getCount}/>
                <Main isBin={true} addChild={self.addChild} removeChild={self.removeChild} key={self.props.getCount().toString()} getCount={self.props.getCount}/>
              </ul>
            </li>
          );
        }
        if (this.state.value == "Multiple") {
          return (
            <li key={this.props.key} style={{padding: "20px 20px 0px 20px"}}>
                  <form>
                      { !self.props.isRoot ? ( self.props.isBin ? <input value={ self.props.isYes ? "Yes" : "No" } disabled/> : ( self.props.isCont ? <input disabled value="<Any>"/> : <input onChange={self.onChangeParAns.bind(self)}/>) ) : <div></div>}
                      { !self.props.isRoot ? <span style={{fontSize: "150%", position: "absolute"}}>&#8628;</span> : <div></div>}
                    <div style={{marginTop: "15px", marginBottom: "0px"}}>
                      <span style={{padding: "10px", borderRadius: "4px", border: "1px solid grey", backgroundColor: "#4c75a3"}}>
                        <Button style={{margin: "0px 7px 0px 0px", border: "1px solid white", padding: "0px 5px 0px 5px", borderRadius: "10px", backgroundColor: "white", color: "#4c75a3"}} onClick={this.handleClick.bind(this)}>
                            { !self.state.hidden ? <span>&#9698;</span> : <span>&#9701;</span>}
                          </Button>
                        <input onChange={this.onChangeText.bind(this)} type="text" required placeholder="System question" style={{marginRight: "10px"}} />

                        <select onChange={this.onChangeType.bind(this)} id="dropdown-basic-button" style={{marginRight: "10px"}}>
                          <option value="Binary">Binary</option>
                          <option value="Multiple">Multiple</option>
                          <option value="Continue">Continue</option>
                          <option value="End">End</option>
                          <option value="Reference">Reference</option>
                        </select>
                        <input id="multtt" type="number" placeholder="0" onChange={this.onChangeNum.bind(this)} style={{width:"40px", marginRight: "10px"}}/>
                        <input onChange={this.onChangeAns.bind(this)} type="text" placeholder="System answer" style={{width:"138px"}}/>
                      </span>
                    </div>
                  </form>
              <ul style={{}} hidden={self.state.hidden}>
                {
                    this.state.mains.map((ind) => {
                        return <Main addChild={self.addChild} removeChild={self.removeChild} key={self.props.getCount().toString()} getCount={self.props.getCount}/>
                    })
                }
              </ul>
            </li>
          );
        }
        if (this.state.value == "Continue") {
          return (
            <li key={this.props.key} style={{padding: "20px 20px 0px 20px"}}>
              <form>
                      { !self.props.isRoot ? ( self.props.isBin ? <input value={ self.props.isYes ? "Yes" : "No" } disabled/> : ( self.props.isCont ? <input disabled value="<Any>"/> : <input onChange={self.onChangeParAns.bind(self)}/>) ) : <div></div>}
                      { !self.props.isRoot ? <span style={{fontSize: "150%", position: "absolute"}}>&#8628;</span> : <div></div>}
                    <div style={{marginTop: "15px", marginBottom: "0px"}}>
                      <span style={{padding: "10px", borderRadius: "4px", border: "1px solid grey", backgroundColor: "#4c75a3"}}>
                        <Button style={{margin: "0px 7px 0px 0px", border: "1px solid white", padding: "0px 5px 0px 5px", borderRadius: "10px", backgroundColor: "white", color: "#4c75a3"}} onClick={this.handleClick.bind(this)}>
                            { !self.state.hidden ? <span>&#9698;</span> : <span>&#9701;</span>}
                          </Button>
                        <input onChange={this.onChangeText.bind(this)} type="text" required placeholder="System question" style={{marginRight: "10px"}} />
                        <select onChange={this.onChangeType.bind(this)} id="dropdown-basic-button" style={{marginRight: "10px"}}>
                          <option value="Binary">Binary</option>
                          <option value="Multiple">Multiple</option>
                          <option value="Continue">Continue</option>
                          <option value="End">End</option>
                          <option value="Reference">Reference</option>
                        </select>
                        <input onChange={this.onChangeAns.bind(this)} type="text" placeholder="System answer" />
                      </span>
                    </div>
              </form>
              <ul style={{}} hidden={self.state.hidden}>
                <Main isCont = {true} addChild={self.addChild} removeChild={self.removeChild} key={self.props.getCount().toString()} getCount={self.props.getCount}/>
              </ul>
            </li>
          );
        }
        if (this.state.value == "End") {
            return (
              <li key={this.props.key} style={{padding: "20px 20px 0px 20px"}}>
                <form type="exampleForm.ControlInput1">
                      { !self.props.isRoot ? ( self.props.isBin ? <input value={ self.props.isYes ? "Yes" : "No" } disabled/> : ( self.props.isCont ? <input disabled value="<Any>"/> : <input onChange={self.onChangeParAns.bind(self)}/>) ) : <div></div>}
                      { !self.props.isRoot ? <span style={{fontSize: "150%", position: "absolute"}}>&#8628;</span> : <div></div>}
                      <div style={{marginTop: "15px", marginBottom: "0px"}}>
                        <span style={{padding: "10px", borderRadius: "4px", border: "1px solid grey", backgroundColor: "#4c75a3"}}>
                          <Button style={{margin: "0px 7px 0px 0px", border: "1px solid white", padding: "0px 5px 0px 5px", borderRadius: "10px", backgroundColor: "white", color: "#4c75a3"}} onClick={this.handleClick.bind(this)}>
                            { !self.state.hidden ? <span>&#9698;</span> : <span>&#9701;</span>}
                          </Button>
                          <input onChange={this.onChangeText.bind(this)} type="text" required placeholder="System question" style={{marginRight: "10px"}} />
                          <select onChange={this.onChangeType.bind(this)} id="dropdown-basic-button" value="End" style={{marginRight: "10px"}}>
                            <option value="Binary">Binary</option>
                            <option value="Multiple">Multiple</option>
                            <option value="Continue">Continue</option>
                            <option value="End">End</option>
                            <option value="Reference">Reference</option>
                          </select>
                          <input onChange={this.onChangeAns.bind(this)} type="text" placeholder="System answer" />
                        </span>
                      </div>
                  </form>
              </li>
            );
            
        }

        if (this.state.value == "Reference") {
            return (
              <li key={this.props.key} style={{padding: "20px 20px 0px 20px"}}>
                <form type="exampleForm.ControlInput1">
                      { !self.props.isRoot ? ( self.props.isBin ? <input value={ self.props.isYes ? "Yes" : "No" } disabled/> : ( self.props.isCont ? <input disabled value="<Any>"/> : <input onChange={self.onChangeParAns.bind(self)}/>) ) : <div></div>}
                      { !self.props.isRoot ? <span style={{fontSize: "150%", position: "absolute"}}>&#8628;</span> : <div></div>}
                      <div style={{marginTop: "15px", marginBottom: "0px"}}>
                        <span style={{padding: "10px", borderRadius: "4px", border: "1px solid grey", backgroundColor: "#4c75a3"}}>
                          <Button style={{margin: "0px 7px 0px 0px", border: "1px solid white", padding: "0px 5px 0px 5px", borderRadius: "10px", backgroundColor: "white", color: "#4c75a3"}} onClick={this.handleClick.bind(this)}>
                            { !self.state.hidden ? <span>&#9698;</span> : <span>&#9701;</span>}
                          </Button>
                          <input onChange={this.onChangeRef.bind(this)} type="text" placeholder="Reference ID" style={{marginRight: "10px"}}/>
                          <select onChange={this.onChangeType.bind(this)} id="dropdown-basic-button" value="Reference">
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

export default Main; 