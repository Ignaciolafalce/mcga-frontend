import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import DefaultModal from './DefaultModal';
import SignUpForm from './SignUpForm';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

function SignUpModal(props) {
    return (
        <DefaultModal title="Create an account" show={props.show} handleClose={props.handleClose}>
            <SignUpForm successMessage={
                <Fragment>
                    User account successfully created you can <Link to='/signin' onClick={props.handleClose} >sign in</Link> now!
                </Fragment>}>
                You alredy have an account? you can <Link to='/signin' onClick={props.handleClose}>sign in here</Link>
            </SignUpForm>
        </DefaultModal>
    );
}

export default connect(mapStateToProps)(SignUpModal);