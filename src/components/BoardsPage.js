import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute';
import { formatDateToString } from '../utils/helpers/index';
import { getAllBoards,deleteBoard } from '../redux/actions/boardsActions';
import Loader from './Loader';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


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
        deleteBoard: (boardId) => { dispatch(deleteBoard(boardId))}
    }
}

function BoardsPage(props) {

    useEffect(() => {
        props.getAllBoards();
    }, []);

    return (
        // <PrivateRoute>
        <div class="container">
            <div className="row justify-content-center mb-2">
                <div className="col">
                    <h1>Your boards</h1>
                </div>
                <div className="col text-right">
                <Button variant="warning" className="mr-2 mt-2">+ Add a new board</Button>
                </div>
            </div>

            <Loader isVisible={props.isLoading} />

            <div className="row justify-content-center">
                <div className="col-11">
                    {/* <AddBoardForm></AddBoardForm> */}

                    {props.boards && props.boards.length === 0 &&
                        <div className="text-center">You dont have any board!, why dont you create one?</div>}

                    {props.boards && props.boards.length > 0 &&
                        <Fragment>

                            {props.boards.map(board =>
                                <div key={board._id} className="row mb-2">
                                    <div className="col bg-light p-2 rounded">
                                        <div class="row justify-content-start m-2 rounded text-light">
                                            <div className="col-9 rounded p-2 text-dark font-weight-bold">{board.name}</div>
                                            <div className="col-3 text-right text-dark p-2 font-weight-light">{formatDateToString(board.created_at)}</div>
                                        </div>
                                        <div class="row justify-content-between">
                                            <div className="col-5 m-2">
                                                <Link to={`/board/${board._id}`} variant="secondary" className="mr-2">Go to this board</Link>
                                            </div>
                                            <div className="col text-right m-2">
                                                <Button variant="primary" className="mr-2 mb-2" onClick={() => {
                                                    props.deleteBoard(board._id);
                                                }}>Edit</Button>
                                                <Button className="mb-2" variant="danger">Delete</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    }
                    {/* 
                    {props.boards && props.boards.length > 0 &&
                        <div>
                            {props.boards.map(board =>
                                <div key={board._id} className="bg-light p-5">
                                    <Link to={`/board/${board._id}`}>
                                        {formatDateToString(board.created_at)} - {board.name}
                                    </Link>
                                </div>
                            )}
                        </div>
                    } */}
                </div>
            </div>
        </div>
        // </PrivateRoute>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardsPage);