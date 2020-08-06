import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DefaultModal from './DefaultModal';
import { deleteNote, clearNote} from '../redux/actions/notesActions'
import { Form, Button, Alert } from 'react-bootstrap';

const mapStateToProps = (state) => {
    return {
        isLoading: state.notes.note.isLoading,
        error: state.notes.note.error,
        message: state.notes.note.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteNote: (noteId) => { dispatch(deleteNote(noteId)) },
        clearNote: () => { dispatch(clearNote()) }
    }
}

function DeleteNoteModal(props) {

    const [selectedNote, setSelectedNote] = useState({});
    const [isNoteSelected, setIsNoteSelected] = useState(false);
    useEffect(() => {
        if (props.selectedNote) {
            setSelectedNote(props.selectedNote);
            setIsNoteSelected(true);
        }
        props.clearNote();
    }, []);

    const onDeleteNoteHandler = (event) => {
        event.preventDefault()
        props.deleteNote(selectedNote._id);
    }

    return (
        <DefaultModal title="Delete Note" show={props.show} handleClose={props.handleClose}>
            <Form>

                {!props.error && props.message &&
                    <Alert variant="success">
                        {props.message}
                    </Alert>
                }

                {props.error && props.message && <Alert variant="danger">{props.message}</Alert>}

                {isNoteSelected && !props.error && !props.message &&
                    <Form.Group controlId="formBasicNoteDelete">
                        <Form.Label>Are you sure you want to delete this board?</Form.Label>
                        <Form.Text>There is no way back :(</Form.Text>
                    </Form.Group>
                }
                <div className="row">
                    <div className="col">
                        {isNoteSelected && !props.error && !props.message &&
                            <Button variant="danger" type="submit" block onClick={onDeleteNoteHandler}>
                                Yes, delete it!
                            </Button>
                        }
                    </div>
                    <div className="col">
                        <Button variant="secondary" type="submit" block onClick={props.handleClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </Form>
        </DefaultModal>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteNoteModal);