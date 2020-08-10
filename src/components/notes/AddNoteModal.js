import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DefaultModal from '../shared/DefaultModal';
import { addNote, editNote, clearNote} from '../../redux/actions/notesActions';
import { isNullOrEmty } from '../../utils/helpers/index';
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
        addNote: ({ text, boardId }) => { dispatch(addNote({ text, boardId })) },
        editNote: (noteId, { text }) => { dispatch(editNote(noteId, { text })) },
        clearNote: () => { dispatch(clearNote()) }
    }
}

function AddNoteModal(props) {


    const [selectedBoard, setSelectedBoard] = useState({});
    const [isBoardSelected, setIsBoardSElected] = useState(false);
    const [selectedNote, setSelectedNote] = useState({});
    const [isNoteSelected, setIsNoteSelected] = useState(false);
    useEffect(() => {
        if(props.selectedBoard){
            setSelectedBoard(props.selectedBoard);
            setIsBoardSElected(true);
        }
        if (props.selectedNote) {
            setSelectedNote(props.selectedNote);
            setIsNoteSelected(true);
        }
        props.clearNote();
    }, []);

    const [formNote, setFormNote] = useState({
        text: props.selectedNote ? props.selectedNote.text : '',
        errorMessages: []
    });

    const validateFormBoard = (cb) => {

        const formPropertiesValidations = {
            "Text": !isNullOrEmty(formNote.text),
        };

        const errorMessagesArray = Object.keys(formPropertiesValidations).filter(propertyName => {
            return !formPropertiesValidations[propertyName];
        }).map(propertyName => {
            return `Invalid ${propertyName}`;
        });

        if (errorMessagesArray.length > 0) {
            setFormNote({ ...formNote, errorMessages: errorMessagesArray });
            return cb('Error validating form');
        }

        setFormNote({ ...formNote, errorMessages: [] });
        return cb(null);
    }

    const onEditNoteHandler = (event) => {
        event.preventDefault()
        validateFormBoard((error) => {
            if (!error) {
                props.editNote(selectedNote._id, { text: formNote.text });
            }
        });
    }

    const onAddNoteHandler = (event) => {
        event.preventDefault();
        validateFormBoard((error) => {
            if (!error) {
                props.addNote({ text: formNote.text, boardId: selectedBoard._id });
            }
        });

    }

    return (
        <DefaultModal title={isNoteSelected ? "Edit Note" : "Add new Note"} show={props.show} handleClose={props.handleClose}>
            <Form>
                {!props.error && props.message &&
                    <Alert variant="success">
                        {props.message}
                    </Alert>
                }
                {(formNote.errorMessages.length > 0 || props.error) &&
                    <Fragment>
                        {formNote.errorMessages.length > 0 && formNote.errorMessages.map((errorMsg, i) =>
                            <Alert variant="danger" key={`inavlid${i}`} >{errorMsg} </Alert>
                        )}

                        {props.error && props.message && <Alert variant="danger">{props.message}</Alert>}
                    </Fragment>
                }
                <Form.Group controlId="formBasicNoteText">
                    <Form.Label>Text</Form.Label>
                    <Form.Control as="textarea" rows="3" placeholder={isNoteSelected ? "Enter the edited note text" : "Enter note text"}
                        value={formNote.text} onChange={(e) => { setFormNote({ ...formNote, text: e.target.value }) }} />
                </Form.Group>
                <div className="row">
                    <div className="col">
                        {!isNoteSelected && isBoardSelected &&
                            <Button variant="success" type="submit" block onClick={onAddNoteHandler}>
                                Add Note
                        </Button>
                        }
                        {isNoteSelected &&
                            <Button variant="success" type="submit" block onClick={onEditNoteHandler}>
                                Edit Note
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

export default connect(mapStateToProps, mapDispatchToProps)(AddNoteModal);