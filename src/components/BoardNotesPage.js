import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute';
import { formatDateToString } from '../utils/helpers/index';
import { getBoardById } from '../redux/actions/boardsActions';
import { getNotesByBoard } from '../redux/actions/notesActions';
import Loader from './Loader';
import { Button } from 'react-bootstrap';
import AddNoteModal from './AddNoteModal';
import DeleteNoteModal from './DeleteNoteModal';


const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,

        board: state.boards.board.data,
        isLoadingBoard: state.boards.board.isLoading,
        errorBoard: state.boards.board.error,
        messageBoard: state.boards.board.message,

        notes: state.notes.list,
        isLoadingNotes: state.notes.isLoading,
        errorNote: state.notes.error,
        messageNote: state.notes.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBoardById: (boardId) => { dispatch(getBoardById(boardId)) },
        getNotesByBoard: (boardId) => { dispatch(getNotesByBoard(boardId)) },
    }
}

function BoardNotesPage(props) {

    const [boardId, setBoardId] = useState(props.match.params.boardId);

    useEffect(() => {
        if (props.isAuth) {
            props.getBoardById(boardId);
            props.getNotesByBoard(boardId);
        }
    }, []);

    const [showAddNoteModal, setShowAddNoteModal] = useState(false);
    const toggleAddNoteModal = () => {
        setShowAddNoteModal(!showAddNoteModal);
    }

    const [selectedNote, setSelectedNote] = useState({});
    const [showEditNoteModal, setShowEditNoteModal] = useState(false);
    const toggleEditNoteModal = () => {
        if (showEditNoteModal) {
            setSelectedNote({});
            setShowEditNoteModal(false);
        }
        if (!showEditNoteModal) {
            setShowEditNoteModal(true);
        }
    }

    const [showDeleteNoteModal, setShowDeleteNoteModal] = useState(false);
    const toggleDeleteNoteModal = () => {
        if (showDeleteNoteModal) {
            setSelectedNote({});
            setShowDeleteNoteModal(false);
        }
        if (!showDeleteNoteModal) {
            setShowDeleteNoteModal(true);
        }
    }

    return (
        <PrivateRoute>
            {(props.board || props.notes) && <Fragment>
                {props.isLoadingBoard || props.isLoadingNotes &&
                    <Loader isVisible={true} />
                }
            </Fragment>
            }

            {props.board && props.notes &&
                <div className="container-fluid">
                    <div className="row justify-content-center mb-2">
                        <div className="col-5">
                            <h1> Notes</h1>
                            <h3>from board:{props.board.name}</h3>
                        </div>
                        <div className="col-5 text-right">
                            <Button variant="warning" className="mr-2 mt-2" onClick={toggleAddNoteModal}>+ Add a new Note</Button>
                        </div>
                    </div>

                    {props.isLoadingBoard || props.isLoadingNotes &&
                        <Loader isVisible={true} />
                    }

                    <div className="row justify-content-center">
                        <div className="col-11">
                            {props.notes && props.notes.length === 0 &&
                                <div className="text-center">You dont have any note!, why dont you create one?</div>
                            }
                        </div>

                            {/* NOTES */}
                            {props.notes && props.notes.length > 0 &&
                                <Fragment>
                                    {props.notes.map(note =>

                                        <div className="col-11 col-lg-5 bg-light rounded mr-2 mb-2">
                                            <div className="row justify-content-end p-2">
                                                <Button variant="primary" className="mr-1" onClick={() => {
                                                    setSelectedNote(note);
                                                    toggleEditNoteModal();
                                                }}>EDIT</Button>
                                                <Button variant="danger" onClick={() => {
                                                    setSelectedNote(note);
                                                    toggleDeleteNoteModal();
                                                }}>X</Button>
                                            </div>
                                            <div className="row justify-content-center bg-secondary m-2 rounded overflow-auto" style={{ height: '90px' }}>
                                                <div className="col-12 text-white overflow-auto p-2 text-left">{note.text}</div>
                                            </div>
                                            <div className="row justify-content-end m-2">
                                                updated at {formatDateToString(note.updated_at)}
                                            </div>
                                        </div>
                                    )}
                                </Fragment>
                            }
                    </div>

                    {/* MODALS */}
                    {showAddNoteModal &&
                        <AddNoteModal show={showAddNoteModal} selectedBoard={props.board} handleClose={toggleAddNoteModal} />
                    }

                    {showEditNoteModal &&
                        <AddNoteModal show={showEditNoteModal} selectedBoard={props.board} selectedNote={selectedNote} handleClose={toggleEditNoteModal} />
                    }

                    {showDeleteNoteModal &&
                        <DeleteNoteModal show={showDeleteNoteModal} selectedNote={selectedNote} handleClose={toggleDeleteNoteModal} />
                    }

                </div>
            }
        </PrivateRoute>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardNotesPage);