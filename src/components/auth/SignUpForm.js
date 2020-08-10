import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { signUp, clearSignUp } from '../../redux/actions/authActions';
import { isNullOrEmty, isEmailValid } from '../../utils/helpers/index';
import Loader from '../shared/Loader';

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.signUp.isLoading,
        error: state.auth.signUp.error,
        message: state.auth.signUp.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearSignUp: () => { dispatch(clearSignUp()) },
        signUp: ({ email, username, password }) => { dispatch(signUp({ username, email, password })) }
    }
}

function SignUpForm(props) {

    const { clearSignUp, signUp } = props;
    useEffect(() => {
        clearSignUp();
    }, [clearSignUp]);

    const [formUser, setFormUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errorMessages: []
    });

    //onclick signup button handler
    const onSignUpHandler = (event) => {
        event.preventDefault();

        const formPropertiesValidations = {
            "Username": !isNullOrEmty(formUser.username),
            "Email": !isNullOrEmty(formUser.email) && isEmailValid(formUser.email),
            "Password": !isNullOrEmty(formUser.password),
            "Confirm Password": !isNullOrEmty(formUser.confirmPassword),
        };

        const errorMessagesArray = Object.keys(formPropertiesValidations).filter(propertyName => {
            return !formPropertiesValidations[propertyName];
        }).map(propertyName => {
            return `Invalid ${propertyName}`;
        });

        if (formUser.password !== formUser.confirmPassword) {
            errorMessagesArray.push(`Passwords must be equals`);
        }

        if (errorMessagesArray.length > 0) {
            return setFormUser({ ...formUser, errorMessages: errorMessagesArray });
        }

        setFormUser({ ...formUser, errorMessages: [] });

        signUp({ username: formUser.username, email: formUser.email, password: formUser.password, });
    }

    return (
        <Form>
            {((!props.error && !props.message) || (props.error && props.message)) &&
                <Fragment>
                    {(formUser.errorMessages.length > 0 || props.error) &&
                        <Fragment>
                            {formUser.errorMessages.length > 0 && formUser.errorMessages.map((errorMsg, i) =>
                                <Alert variant="danger" key={`inavlid${i}`} >{errorMsg}</Alert>
                            )}

                            {props.error && props.message && <Alert variant="danger">{props.message}</Alert>}
                        </Fragment>
                    }

                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter an username" value={formUser.username} onChange={(e) => { setFormUser({ ...formUser, username: e.target.value }) }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" placeholder="Enter an email" value={formUser.email} onChange={(e) => { setFormUser({ ...formUser, email: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter a Password" value={formUser.password} onChange={(e) => { setFormUser({ ...formUser, password: e.target.value }) }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm your Password" value={formUser.confirmPassword} onChange={(e) => { setFormUser({ ...formUser, confirmPassword: e.target.value }) }} />
                    </Form.Group>

                    <Loader isVisible={props.isLoading}></Loader>

                    <Button variant="primary" type="submit" block onClick={onSignUpHandler}>
                        Sign me up
                    </Button>

                    <Form.Text className="">
                        {props.children}
                    </Form.Text>

                </Fragment>}

            {!props.error && props.message &&
                <Alert variant="success">
                    {props.successMessage}
                </Alert>
            }
        </Form>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);