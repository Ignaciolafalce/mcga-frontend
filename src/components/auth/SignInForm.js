import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { signIn, clearSignIn } from '../../redux/actions/authActions';
import { isNullOrEmty } from '../../utils/helpers/index';
import { Redirect, Link } from 'react-router-dom'
import Loader from '../shared/Loader';
import SignUpModal from './SignUpModal';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        isLoading: state.auth.signIn.isLoading,
        error: state.auth.signIn.error,
        message: state.auth.signIn.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearSignIn: () => { dispatch(clearSignIn()) },
        signIn: ({ username, password }) => { dispatch(signIn({ username, password })) }
    }
}

function SignInForm(props) {

    const [showSignUpModal, SetShowSignUpModal] = useState(false);
    const toggleShowSignUpModal = () => {
        SetShowSignUpModal(!showSignUpModal);
    }

    const { clearSignIn } = props;
    useEffect(() => {
        clearSignIn();
    }, [clearSignIn]);

    const [formUser, setFormUser] = useState({
        username: '',
        password: '',
        errorMessages: []
    });

    //onclick signup button handler
    const onSignInHandler = (event) => {
        event.preventDefault();

        const formPropertiesValidations = {
            "Username": !isNullOrEmty(formUser.username),
            "Password": !isNullOrEmty(formUser.password),
        };

        const errorMessagesArray = Object.keys(formPropertiesValidations).filter(propertyName => {
            return !formPropertiesValidations[propertyName];
        }).map(propertyName => {
            return `Invalid ${propertyName}`;
        });

        if (errorMessagesArray.length > 0) {
            return setFormUser({ ...formUser, errorMessages: errorMessagesArray });
        }

        setFormUser({ ...formUser, errorMessages: [] });

        props.signIn({ username: formUser.username, password: formUser.password });
    }

    return (
        <Fragment>
            {props.isAuth &&
                <Redirect to='/'></Redirect>
            }
            <Form>
                {(formUser.errorMessages.length > 0 || props.error) &&
                    <Fragment>
                        {formUser.errorMessages.length > 0 && formUser.errorMessages.map((errorMsg, i) =>
                            <Alert variant="danger" key={`inavlid${i}`} >{errorMsg}</Alert>)}

                        {props.error && props.message && <Alert variant="danger">{props.message}</Alert>}
                    </Fragment>
                }

                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username/Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter your Username or Email" value={formUser.username} onChange={(e) => { setFormUser({ ...formUser, username: e.target.value }) }} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your Password" value={formUser.password} onChange={(e) => { setFormUser({ ...formUser, password: e.target.value }) }} />
                </Form.Group>

                <Loader isVisible={props.isLoading}></Loader>

                <Button variant="primary" type="submit" block onClick={onSignInHandler}>
                    Sign in
                </Button>

                <Form.Text className="text-center">
                - <Button variant="outline-primary" onClick={toggleShowSignUpModal} size="sm">or sign up now!</Button> -
                </Form.Text>
                {/* INVOKE SIGN UP MODAL */}
                <SignUpModal show={showSignUpModal} handleClose={toggleShowSignUpModal}></SignUpModal>

            </Form>
        </Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);