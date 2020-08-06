import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

function HomePage(props) {
    return (
        <div className="">
            {!props.isAuth && <div>No auth content</div>}
            {props.isAuth && <div>Auth Content</div>}
        </div>
    );
}

export default connect(mapStateToProps)(HomePage);