import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignInForm from './SignInForm';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

function SignInPage(props) {
    return (
        <Fragment>
            {props.isAuth && <Redirect to="/"></Redirect>}
            {!props.isAuth &&
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-11 col-md-5 bg-light p-4 rounded">
                            <SignInForm></SignInForm>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    );
}

export default connect(mapStateToProps)(SignInPage);