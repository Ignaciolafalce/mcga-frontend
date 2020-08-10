import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PrivateRoute from '../shared/PrivateRoute';
import { formatDateToString } from '../../utils/helpers/index';
import { getAllNotes } from '../../redux/actions/notesActions';
import Loader from '../shared/Loader';
import { Button } from 'react-bootstrap';
import AddNoteModal from '../notes/AddNoteModal';
import DeleteNoteModal from '../notes/DeleteNoteModal';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,

        notes: state.notes.list,
        isLoading: state.notes.isLoading,
        error: state.notes.error,
        message: state.notes.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllNotes: () => { dispatch(getAllNotes()) },
    }
}

function Notes(props) {

    // const [boardId] = useState(props.match.params.boardId);

    const { getAllNotes } = props;
    useEffect(() => {
        getAllNotes();
    }, [getAllNotes]);

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
            {(!props.notes) && <Fragment>
                {(props.isLoading) &&
                    <Loader isVisible={true} />
                }
            </Fragment>
            }

            {props.notes &&
                <div className="container-fluid">
                    <div className="row justify-content-between mb-2">
                        <div className="col-5 text-left">
                            <h1>All Your notes</h1>
                        </div>
                        {/* <div className="col-5 text-right">
                            <Button variant="warning" className="mr-2 mt-2" onClick={toggleAddNoteModal}>+ Add a new Note</Button>
                        </div> */}
                    </div>

                    {(props.isLoading) &&
                        <Loader isVisible={true} />
                    }

                    <div className="row justify-content-center">
                        <div className="col-11">
                            {props.notes && props.notes.length === 0 &&
                                <div className="text-center">You dont have any note!, create a new board and add new notes!</div>
                            }
                        </div>

                        {/* NOTES */}
                        {props.notes && props.notes.length > 0 &&
                            <Fragment>
                                {props.notes.map(note =>

                                    <div className="col-11 col-lg-5 bg-light rounded mr-2 mb-2" key={note._id}>
                                        <div className="row justify-content-end p-2">
                                            <div className="col-12">
                                                <div className="row justify-content-between">

                                                    <div className="col-5 p-2 ml-2">From board: <Link to={`board/${note.board._id}`}>{note.board.name}</Link></div>
                                                    <div className="col-5 text-right">
                                                        <Button variant="primary" className="mr-1" onClick={() => {
                                                            setSelectedNote(note);
                                                            toggleEditNoteModal();
                                                        }}>EDIT</Button>
                                                        <Button variant="danger" onClick={() => {
                                                            setSelectedNote(note);
                                                            toggleDeleteNoteModal();
                                                        }}>X</Button>
                                                    </div>
                                                </div>
                                            </div>
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
                    {/* {showAddNoteModal &&
                        <AddNoteModal show={showAddNoteModal} selectedBoard={props.board} handleClose={toggleAddNoteModal} />
                    } */}

                    {showEditNoteModal &&
                        <AddNoteModal show={showEditNoteModal} selectedNote={selectedNote} handleClose={toggleEditNoteModal} />
                    }

                    {showDeleteNoteModal &&
                        <DeleteNoteModal show={showDeleteNoteModal} selectedNote={selectedNote} handleClose={toggleDeleteNoteModal} />
                    }

                </div>
            }
        </PrivateRoute>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);