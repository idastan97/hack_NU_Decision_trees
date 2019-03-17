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
          roots: []
        }
    }

    componentDidMount(){
      let self = this;
      
      axios(con.addr + '/get_roots', {
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



  render() {
        let self = this;
        return (
            <div className="App">
              <Layout id="roots"/>
              <h3 className="text-center" style={{color: "#45688E"}}>Roots</h3>
              <div className="clt">
                <ul>
                  <div className="row" style={{border: "1px solid grey", marginRight: "100px", borderRadius: "10px", marginTop: "20px", padding: "5px 0px 5px 0px", color: "#45688E"}}>
                    <h5 className="col-md-4">Question</h5>
                    <h5 className="col-md-4">Type</h5>
                    <h5 className="col-md-4">System Answer</h5>
                  </div>
                  {
                    self.state.roots.map((root) => {
                      return (
                        <div key={root.idvertex.toString()} className="row"  style={{marginTop: "10px", borderBottom: "1px solid grey", marginRight: "100px"}}>
                          <p className="col-md-4">{root.question}</p>
                          <p className="col-md-4">{root.typ}</p>
                          <p className="col-md-4">{root.ans}</p>
                        </div>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          );
  }
}

export default App;