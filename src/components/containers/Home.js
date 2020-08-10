import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SignUpModal from '../auth/SignUpModal';
import { Button } from 'react-bootstrap';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

function Home(props) {

    const [showSignUpModal, SetShowSignUpModal] = useState(false);
    const toggleShowSignUpModal = () => {
        SetShowSignUpModal(!showSignUpModal);
    }

    return (
        <div className="container">
            {!props.isAuth && <div className="row justify-content-center ">
                <div className="col-8 p-2 bg-dark rounded">
                    <h3 className="text-center p-5 rounded text-white">
                        HEY <Button onClick={toggleShowSignUpModal} variant="primary">SIGN UP</Button> AND CREATE YOUR BOARDS AND NOTES!
                    </h3>
                </div>
            </div>
            }
            <SignUpModal show={showSignUpModal} handleClose={toggleShowSignUpModal}></SignUpModal>
            {props.isAuth &&
                <div className="row justify-content-center ">
                    <div className="col-8 p-2 bg-dark rounded">
                        <h3 className="text-center p-5 rounded text-white">
                            Create Notes and Boards <Link to="boards">here!</Link>
                        </h3>
                    </div>
                </div>
            }
        </div>
    );
}

export default connect(mapStateToProps)(Home);