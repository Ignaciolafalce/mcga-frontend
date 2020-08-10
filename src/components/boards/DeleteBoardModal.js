import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DefaultModal from '../shared/DefaultModal';
import { deleteBoard, clearBoard } from '../../redux/actions/boardsActions';
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
        deleteBoard: (boardId) => { dispatch(deleteBoard(boardId)) },
        clearBoard: () => { dispatch(clearBoard()) }
    }
}

function DeleteBoardModal(props) {


    const [selectedBoard, setSelectedBoard] = useState({});
    const [isBoardSelected, setIsBoardSelected] = useState(false);
    useEffect(() => {
        if (props.selectedBoard) {
            setSelectedBoard(props.selectedBoard);
            setIsBoardSelected(true);
        }
        props.clearBoard();
    }, []);

    const onDeleteBoardHandler = (event) => {
        event.preventDefault()
        props.deleteBoard(selectedBoard._id);
    }

    return (
        <DefaultModal title="Delete Board" show={props.show} handleClose={props.handleClose}>
            <Form>

                {!props.error && props.message &&
                    <Alert variant="success">
                        {props.message}
                    </Alert>
                }

                {props.error && props.message && <Alert variant="danger">{props.message}</Alert>}

                {isBoardSelected && !props.error && !props.message &&
                    <Form.Group controlId="formBasicBoardName">
                        <Form.Label>Are you sure you want to delete this board?</Form.Label>
                        <Form.Text>if you do it you are going to delete {selectedBoard.name} board and all the notes that the board has.</Form.Text>
                    </Form.Group>
                }
                <div className="row">
                    <div className="col">
                        {isBoardSelected && !props.error && !props.message &&
                            <Button variant="danger" type="submit" block onClick={onDeleteBoardHandler}>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteBoardModal);