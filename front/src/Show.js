import React, { Component } from 'react';
import axios from 'axios';
import con from './config';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container, Row, Col, Dropdown, DropdownButton} from 'react-bootstrap';
import MainShow from './components/MainShow';
import Layout from './components/Layout';

class Show extends Component {
  constructor(props) {
        super(props);

        this.state = {
          temp: {
            count: 0
          },
          roots: [],
          changes: {},
          message: "",
          messageType: "success"
        }
    }

    componentDidMount(){
      let self = this;

      axios(con.addr + '/get_trees', {
                method: "GET"
            })
                .then(function (response) {
                    console.log(response.data);
                    self.setState({roots: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                });
    }

    submitData(){

        let self = this;
        axios(con.addr + '/commit_changes', {
            method: "POST",
            data: JSON.stringify(self.state.changes),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                console.log(response);
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
              <Layout id="show" />
              <h3>DataBase</h3>
              <div className="clt">
                <ul>
                {
                  self.state.roots.map((root) => {
                    return (
                      <MainShow changes={self.state.changes} key={root.idvertex} obj={root} isRoot={true} style={{borderLeft: "solid 1px black"}}/>
                    )
                  })
                }
                </ul>
              </div>
              <div className={"alert alert-"+this.state.messageType} role="alert" hidden={!this.state.message} style={{width: "200px"}}>
                {this.state.message}
              </div>
              <Button onClick = {self.submitData.bind(self)} style={{margin: "10px 0px 20px 90%", borderColor: "black", color: "white", backgroundColor: "#4E729A", border: "grey"}}>submit</Button>
            </div>
          );
  }
}

export default Show;