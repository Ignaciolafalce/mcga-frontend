import React, { useState } from 'react';
import { connect } from 'react-redux';
import DefaultModal from './DefaultModal';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

function HomePage(props) {
    const [showDefaultModal, setShowDefaultModal] = useState(true);
    const toggleShowDefaultModal = () => {
        setShowDefaultModal(!showDefaultModal);
    }
    return (
        <div className="">
            {!props.isAuth && <div>Home Contenido para usuario no autenticado</div>}
            {props.isAuth && <div>Home Contenido para usuario autenticado</div>}
            {/* <DefaultModal title="Example" show={showDefaultModal} handleClose={toggleShowDefaultModal}></DefaultModal> */}
        </div>
    );
}

export default connect(mapStateToProps)(HomePage);