import React, { Component } from 'react';
import axios from 'axios';
import con from './config';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container, Row, Col, Dropdown, DropdownButton} from 'react-bootstrap';
import Main from './components/Main';
import Layout from './components/Layout';

class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
          temp: {
            count: 0
          },
          obj:{
            children: []
          },
          message: "",
          messageType: "success"
        }
      this.getCount = this.getCount.bind(this);
      this.addChild = this.addChild.bind(this);
      this.removeChild = this.removeChild.bind(this);
    }

    getCount(){
        this.state.temp.count = this.state.temp.count + 1;
        return this.state.temp.count;
    }


  addChild(obj){
      this.state.obj.children.push(obj);
    }

    removeChild(obj){
      let ind = this.state.obj.children.indexOf(obj);
      this.state.obj.children.splice(ind, 1);
    }

    showObj(){
    console.log(this.state.obj.children);
  }

  submitData(){

    let self = this;
    console.log(self.state.obj.children[0])
    axios(con.addr + '/submit_tree', {
                method: "POST",
                data: JSON.stringify(self.state.obj.children[0]),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) {
                    console.log(response.data);
                    self.setState({message: response.data.message, messageType: response.data.typ});
                })
                .catch(function (error) {
                    console.log(error);
                });

  }



  render() {
        let self = this;
        return (
            <div className="App">
              <Layout id="create"/>
              <h3>Create</h3>
              <div className="clt">
                <ul>
                  <Main isRoot={true} style={{borderLeft: "solid 1px black"}} addChild={self.addChild} removeChild={self.removeChild} key="0" getCount={this.getCount}/>
                </ul>
              </div>
              <div className={"alert alert-"+this.state.messageType} role="alert" hidden={!this.state.message} style={{width: "200px"}}>
                {this.state.message}
              </div>
              <Button onClick={this.submitData.bind(this)} style={{margin: "10px 0px 20px 90%", borderColor: "black", color: "white", backgroundColor: "#4E729A", border: "grey"}}>submit</Button>
            </div>
          );
  }
}

export default App;