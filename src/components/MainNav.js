import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import './MainNav.css';
import signInLogo from '../assets/images/signin.png';
import { Button } from 'react-bootstrap';
import SignUpModal from './SignUpModal';


const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

function MainNav(props) {

    const [showSignUpModal, SetShowSignUpModal] = useState(false);
    const toggleShowSignUpModal = () => {
        SetShowSignUpModal(!showSignUpModal);
    }

    const logOutButtonHandler = () => {

    }

    return (
        <div className="mb-4">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand as={NavLink} to="/"><h1 id="navbar-brand">Noteboards</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {props.isAuth &&
                        <Fragment>

                            <Nav className="mr-auto">
                                <Fragment>
                                    <Nav.Link as={NavLink} to="/home" className="navlink-default" activeClassName="navlink-default-active">Home</Nav.Link>
                                    <Nav.Link as={NavLink} to="/boards" className="navlink-default" activeClassName="navlink-default-active"> Boards</Nav.Link>
                                    <Nav.Link as={NavLink} to="/notes" className="navlink-default" activeClassName="navlink-default-active"> Notes</Nav.Link>
                                </Fragment>
                            </Nav>
                            <Nav>
                                <Button variant="danger" onClick={logOutButtonHandler} id="logout-button">Logout</Button>
                            </Nav>
                        </Fragment>
                    }
                    {!props.isAuth &&
                        <Nav className="ml-auto">
                            <Button variant="success" id="signin-button">
                                <Nav.Link as={NavLink} to="/signin" id="signin-navlink">
                                    <img src={signInLogo} alt="signin-logo" className="signin-logo"></img>
                                    Sign in
                                    </Nav.Link>
                            </Button>
                            {/* INVOKE SIGN UP MODAL */}
                            <Link onClick={toggleShowSignUpModal} className="link-signup">or sign up here!</Link>
                            <SignUpModal show={showSignUpModal} handleClose={toggleShowSignUpModal}></SignUpModal>

                        </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default connect(mapStateToProps)(MainNav);