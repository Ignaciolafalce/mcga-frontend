import React, { Fragment }from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        isAccessVerified: state.auth.isAccessVerified
    }
}

function PrivateRoute(props) {
    return (
        <Fragment>
            {!props.isAuth && props.isAccessVerified && <Redirect to='/' />}
            {props.isAuth && props.isAccessVerified && <Fragment>{props.children}</Fragment>}
        </Fragment>
    );
}

export default connect(mapStateToProps)(PrivateRoute);