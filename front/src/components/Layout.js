import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class Layout extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        let self = this;
        return (
            <Navbar expand="md" style={{marginBottom: "10px", marginLeft: "-20px", backgroundColor: "#4E729A"}}>
                <NavbarBrand href="/show" style={{color: "white"}}>Scenario</NavbarBrand>
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                                {self.props.id == "show" ? (<div className="row"><NavItem>
                                    <Link className="nav navlink" to='/create'>Create</Link></NavItem><NavItem>
                                    <Link className="nav navlink" to='/roots'>Show roots</Link>
                                </NavItem></div>) : ''}
                                {self.props.id == "create" ? (<div className="row"><NavItem>
                                    <Link className="navlink" to='/show'>Show Tree</Link></NavItem><NavItem>
                                    <Link className="nav navlink" to='/roots'>Show roots</Link>
                                </NavItem></div>) : ''}
                                {self.props.id == "roots" ? (<div className="row"><NavItem>
                                    <Link className="navlink" to='/create'>Create</Link></NavItem><NavItem>
                                    <Link className="nav navlink" to='/show'>Show Tree</Link>
                                </NavItem></div>) : ''}
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}