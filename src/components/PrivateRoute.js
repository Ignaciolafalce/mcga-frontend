import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

function PrivateRoute(props) {
    return (
        <Fragment>
            {!props.isAuth && <Redirect to='/' />}
            {props.isAuth && <Fragment>{props.children}</Fragment>}
        </Fragment>
    );
}

export default connect(mapStateToProps)(PrivateRoute);