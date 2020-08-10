import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PrivateRoute from '../shared/PrivateRoute';
import { formatDateToString } from '../../utils/helpers/index';
import { getAllBoards } from '../../redux/actions/boardsActions';
import Loader from '../shared/Loader';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddBoardModal from '../AddBoardModal';
import DeleteBoardModal from '../DeleteBoardModal';


const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        boards: state.boards.list,
        isLoading: state.boards.isLoading,
        error: state.boards.error,
        message: state.boards.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllBoards: () => { dispatch(getAllBoards()) },
    }
}

function BoardsPage(props) {

    const { getAllBoards } = props;
    useEffect(() => {
        getAllBoards();
    }, [getAllBoards]);


    const [showAddBoardModal, setShowAddBoardModal] = useState(false);
    const toggleAddBoardModal = () => {
        setShowAddBoardModal(!showAddBoardModal);
    }

    const [selectedBoard, setSelectedBoard] = useState({});
    const [showEditBoardModal, setShowEditBoardModal] = useState(false);
    const toggleEditBoardModal = () => {
        if (showEditBoardModal) {
            setSelectedBoard({});
            setShowEditBoardModal(false);
        }
        if (!showEditBoardModal) {
            setShowEditBoardModal(true);
        }
    }

    const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);
    const toggleDeleteBoardModal = () => {
        if (showDeleteBoardModal) {
            setSelectedBoard({});
            setShowDeleteBoardModal(false);
        }
        if (!showDeleteBoardModal) {
            setShowDeleteBoardModal(true);
        }
    }

    return (
        <PrivateRoute>
            <div className="container">
                <div className="row justify-content-center mb-2">
                    <div className="col">
                        <h1>Your boards</h1>
                    </div>
                    <div className="col text-right">
                        <Button variant="warning" className="mr-2 mt-2" onClick={toggleAddBoardModal}>+ Add a new board</Button>
                    </div>
                </div>

                <Loader isVisible={props.isLoading} />

                <div className="row justify-content-center">
                    <div className="col-11">
                        {/* <AddBoardForm></AddBoardForm> */}

                        {props.boards && props.boards.length === 0 &&
                            <div className="text-center">You dont have any board!, why dont you create one?</div>}

                        {/* LIST OF BOARDS */}
                        {props.boards && props.boards.length > 0 &&
                            <Fragment>
                                {props.boards.map(board =>
                                    <div key={board._id} className="row mb-2">
                                        <div className="col bg-light p-2 rounded">
                                            <div className="row justify-content-start m-2 rounded text-light">
                                                <div className="col-8 rounded p-2 text-dark font-weight-bold">{board.name}</div>
                                                <div className="col-4 text-right text-dark p-2 font-weight-light">{formatDateToString(board.created_at)}</div>
                                            </div>
                                            <div className="row justify-content-between">
                                                <div className="col-5 m-2">
                                                    <Link to={`/board/${board._id}`} className="mr-2 btn-go-board">
                                                        <Button variant="secondary">
                                                            Go to this board
                                                        </Button>
                                                    </Link>
                                                </div>
                                                <div className="col text-right m-2">
                                                    <Button variant="primary" className="mr-2 mb-2" onClick={() => {
                                                        setSelectedBoard(board);
                                                        toggleEditBoardModal();
                                                    }}>
                                                        Edit
                                                    </Button>

                                                    <Button className="mb-2" variant="danger" onClick={() => {
                                                        setSelectedBoard(board);
                                                        toggleDeleteBoardModal();
                                                    }}>
                                                        Delete
                                                </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Fragment>
                        }
                    </div>
                </div>

                {/* MODALS */}
                {showAddBoardModal &&
                    <AddBoardModal show={showAddBoardModal} handleClose={toggleAddBoardModal} />
                }

                {showEditBoardModal &&
                    <AddBoardModal show={showEditBoardModal} selectedBoard={selectedBoard} handleClose={toggleEditBoardModal} />
                }

                {showDeleteBoardModal &&
                    <DeleteBoardModal show={showDeleteBoardModal} selectedBoard={selectedBoard} handleClose={toggleDeleteBoardModal} />
                }

            </div>
        </PrivateRoute>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardsPage);