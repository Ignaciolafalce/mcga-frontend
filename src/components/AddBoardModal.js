import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DefaultModal from './DefaultModal';
import { addBoard, editBoard, clearBoard } from '../redux/actions/boardsActions';
import { isNullOrEmty } from '../utils/helpers/index';
import { Form, Button, Alert } from 'react-bootstrap';

const mapStateToProps = (state) => {
    return {
        isLoading: state.boards.board.isLoading,
        error: state.boards.board.error,
        message: state.boards.board.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addBoard: ({ name }) => { dispatch(addBoard({ name })) },
        editBoard: (boardId, { name }) => { dispatch(editBoard(boardId, { name })) },
        clearBoard: () => { dispatch(clearBoard()) }
    }
}

function AddBoardModal(props) {


    const [selectedBoard, setSelectedBoard] = useState({});
    const [isBoardSelected, setIsBoardSelected] = useState(false);
    useEffect(() => {
        if (props.selectedBoard) {
            setSelectedBoard(props.selectedBoard);
            setIsBoardSelected(true);
        }
        props.clearBoard();
    }, []);

    const [formBoard, setFormBoard] = useState({
        name: props.selectedBoard ? props.selectedBoard.name : '',
        errorMessages: []
    });

    const validateFormBoard = (cb) => {

        const formPropertiesValidations = {
            "Name": !isNullOrEmty(formBoard.name),
        };

        const errorMessagesArray = Object.keys(formPropertiesValidations).filter(propertyName => {
            return !formPropertiesValidations[propertyName];
        }).map(propertyName => {
            return `Invalid ${propertyName}`;
        });

        if (errorMessagesArray.length > 0) {
            setFormBoard({ ...formBoard, errorMessages: errorMessagesArray });
            return cb('Error validating form');
        }

        setFormBoard({ ...formBoard, errorMessages: [] });
        return cb(null);
    }

    const onEditBoardHandler = (event) => {
        event.preventDefault()
        validateFormBoard((error) => {
            if (!error) {
                props.editBoard(selectedBoard._id, { name: formBoard.name });
            }
        });
    }

    const onAddNewBoardHandler = (event) => {
        event.preventDefault();

        validateFormBoard((error) => {
            if (!error) {
                props.addBoard({ name: formBoard.name });
            }
        });

    }

    return (
        <DefaultModal title={isBoardSelected ? "Edit Board" : "Add new Board"} show={props.show} handleClose={props.handleClose}>
            <Form>
                {!props.error && props.message &&
                    <Alert variant="success">
                        {props.message}
                    </Alert>
                }
                {(formBoard.errorMessages.length > 0 || props.error) &&
                    <Fragment>
                        {formBoard.errorMessages.length > 0 && formBoard.errorMessages.map((errorMsg, i) =>
                            <Alert variant="danger" key={`inavlid${i}`} >{errorMsg} </Alert>
                        )}

                        {props.error && props.message && <Alert variant="danger">{props.message}</Alert>}
                    </Fragment>
                }
                <Form.Group controlId="formBasicBoardName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder={isBoardSelected ? "Enter the edited board name" : "Enter board name"}
                        value={formBoard.name} onChange={(e) => { setFormBoard({ ...formBoard, name: e.target.value }) }} />
                </Form.Group>
                <div className="row">
                    <div className="col">
                        {!isBoardSelected &&
                            <Button variant="success" type="submit" block onClick={onAddNewBoardHandler}>
                                Add Board
                        </Button>
                        }
                        {isBoardSelected &&
                            <Button variant="success" type="submit" block onClick={onEditBoardHandler}>
                                Edit Board
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

export default connect(mapStateToProps, mapDispatchToProps)(AddBoardModal);