import {
    NOTES_PENDING,
    NOTES_ERROR,
    NOTES_GETALL_SUCCESS,
    NOTES_GETBYBOARD_SUCCESS,
    NOTES_NOTE_PENDING,
    NOTES_NOTE_ERROR,
    NOTES_NOTE_CLEAR,
    NOTES_NOTE_GET_SUCCESS,
    NOTES_NOTE_DELETE_SUCCESS,
    NOTES_NOTE_ADD_SUCCESS,
    NOTES_NOTE_EDIT_SUCCESS
} from './types';
import store from '../store'

import axios from 'axios';
import { API_URL, DEFAULT_ERROR_FETCH_MESSAGE } from '../../config';

let defaultErrorMessage = DEFAULT_ERROR_FETCH_MESSAGE;


export function getAllNotes() {
    return (dispatch) => {
        dispatch({ type: NOTES_PENDING, payload: {} });
        axios({
            url: `${API_URL}/api/notes/`,
            method: "get",
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data)
            .then(response => {
                if (!response.data || response.error) {
                    return dispatch({ type: NOTES_ERROR, payload: { message: response.message } });
                }
                dispatch({ type: NOTES_GETALL_SUCCESS, payload: { message: response.message, data: response.data } });

            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    defaultErrorMessage = error.response.data.message;
                }
                dispatch({ type: NOTES_ERROR, payload: { message: defaultErrorMessage } });
            });
    }
}

export function getNotesByBoard(boardId) {
    return (dispatch) => {
        dispatch({ type: NOTES_PENDING, payload: {} });
        axios({
            url: `${API_URL}/api/boards/${boardId}`,
            method: "get",
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data)
            .then(response => {
                if (!response.data || response.error) {
                    return dispatch({ type: NOTES_ERROR, payload: { message: response.message } });
                }
                dispatch({ type: NOTES_GETBYBOARD_SUCCESS, payload: { message: response.message, data: { notes: response.data.board.notes } } });

            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    defaultErrorMessage = error.response.data.message;
                }
                dispatch({ type: NOTES_ERROR, payload: { message: defaultErrorMessage } });
            });
    }
}

export function getNoteById(noteId) {
    return (dispatch) => {
        dispatch({ type: NOTES_NOTE_PENDING, payload: {} });
        axios({
            url: `${API_URL}/api/notes/${noteId}`,
            method: "get",
            data: {},
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data).then(response => {
            if (!response.data || response.error) {
                return dispatch({ type: NOTES_NOTE_ERROR, payload: { message: response.message } });
            }
            dispatch({ type: NOTES_NOTE_GET_SUCCESS, payload: { message: response.message, data: response.data } });

        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                defaultErrorMessage = error.response.data.message;
            }
            dispatch({ type: NOTES_NOTE_ERROR, payload: { message: error.response.data.message } });
        });
    }
}

export function addNote({ text, boardId }) {
    return (dispatch) => {
        dispatch({ type: NOTES_NOTE_PENDING, payload: {} });
        const board = { text, boardId };
        axios({
            url: `${API_URL}/api/notes/add`,
            method: "post",
            data: board,
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data)
            .then(response => {
                if (!response.data || response.error) {
                    return dispatch({ type: NOTES_NOTE_ERROR, payload: { message: response.message } });
                }
                dispatch({ type: NOTES_NOTE_ADD_SUCCESS, payload: { message: response.message, data: response.data } });

            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    defaultErrorMessage = error.response.data.message;
                }
                dispatch({ type: NOTES_NOTE_ERROR, payload: { message: defaultErrorMessage } });
            });
    }
}

export function editNote(noteId, { text }) {
    return (dispatch) => {
        dispatch({ type: NOTES_NOTE_PENDING, payload: {} });
        const board = { text };
        axios({
            url: `${API_URL}/api/notes/edit/${noteId}`,
            method: "put",
            data: board,
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data).then(response => {
            if (!response.data || response.error) {
                return dispatch({ type: NOTES_NOTE_ERROR, payload: { message: response.message } });
            }
            console.log(response);
            dispatch({ type: NOTES_NOTE_EDIT_SUCCESS, payload: { message: response.message, data: response.data } });

        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                defaultErrorMessage = error.response.data.message;
            }
            console.log(error);
            dispatch({ type: NOTES_NOTE_ERROR, payload: { message: defaultErrorMessage } });
        });
    }
}

export function deleteNote(noteId) {
    return (dispatch) => {
        dispatch({ type: NOTES_NOTE_PENDING, payload: {} });
        axios({
            url: `${API_URL}/api/notes/delete/${noteId}`,
            method: "delete",
            data: {},
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data)
            .then(response => {
                if (!response.data || response.error) {
                    return dispatch({ type: NOTES_NOTE_ERROR, payload: { message: response.message } });
                }
                dispatch({ type: NOTES_NOTE_DELETE_SUCCESS, payload: { message: response.message, data: response.data } });

            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    defaultErrorMessage = error.response.data.message;
                }
                dispatch({ type: NOTES_NOTE_ERROR, payload: { message: defaultErrorMessage } });
            });
    }
}

export function clearNote() {
    return {
        type: NOTES_NOTE_CLEAR
    }
}