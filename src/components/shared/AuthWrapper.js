import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { verifyToken } from '../../redux/actions/authActions';
import Loader from './Loader';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        isAccessVerified: state.auth.isAccessVerified
    }
}

const mapDispatchToProps = dispatch => {
    return {
        verifyToken: () => { dispatch(verifyToken()) }
    }
};

function AuthWrapper(props) {
    const {verifyToken} = props;
    useEffect(() => {
        verifyToken();
    }, [verifyToken]);


    return (
        <Fragment>
            {!props.isAccessVerified && <Loader isVisible={true}></Loader>}
            {props.isAccessVerified && <Fragment>{props.children}</Fragment>}
        </Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);