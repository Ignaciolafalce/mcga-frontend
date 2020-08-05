import {
    BOARDS_PENDING,
    BOARDS_ERROR,
    BOARDS_GETALL_SUCCESS,
    BOARDS_CLEAR,
    BOARDS_BOARD_PENDING,
    BOARDS_BOARD_ERROR,
    BOARDS_BOARD_CLEAR,
    BOARDS_BOARD_GET_SUCCESS,
    BOARDS_BOARD_DELETE_SUCCESS,
    BOARDS_BOARD_ADD_SUCCESS,
    BOARDS_BOARD_EDIT_SUCCESS,
} from './types';
import store from '../store'

import axios from 'axios';
import { API_URL } from '../../config';

let defaultErrorMessage = 'Something is broken'; //use a constant later


export function getAllBoards() {
    return (dispatch) => {
        dispatch({ type: BOARDS_PENDING, payload: {} });
        axios({
            url: `${API_URL}/api/boards/`,
            method: "get",
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data).then(response => {
            if (!response.data || response.error) {
                return dispatch({ type: BOARDS_ERROR, payload: { message: response.message } });
            }
            dispatch({ type: BOARDS_GETALL_SUCCESS, payload: { message: response.message, data: response.data } });

        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                defaultErrorMessage = error.response.data.message;
            }
            dispatch({ type: BOARDS_ERROR, payload: { message: defaultErrorMessage } });
        });
    }
}


export function getBoardById(boardId) {
    return (dispatch) => {
        dispatch({ type: BOARDS_BOARD_PENDING, payload: {} });
        axios({
            url: `${API_URL}/api/boards/${boardId}`,
            method: "get",
            data: {},
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data).then(response => {
            if (!response.data || response.error) {
                return dispatch({ type: BOARDS_BOARD_ERROR, payload: { message: response.message } });
            }
            dispatch({ type: BOARDS_BOARD_GET_SUCCESS, payload: { message: response.message, data: response.data } });

        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                defaultErrorMessage = error.response.data.message;
            }
            dispatch({ type: BOARDS_BOARD_ERROR, payload: { message: error.response.data.message } });
        });
    }
}

export function addBoard({ name }) {
    return (dispatch) => {
        dispatch({ type: BOARDS_BOARD_PENDING, payload: {} });
        const board = { name };
        axios({
            url: `${API_URL}/api/boards/add`,
            method: "post",
            data: board,
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data).then(response => {
            if (!response.data || response.error) {
                return dispatch({ type: BOARDS_BOARD_ERROR, payload: { message: response.message } });
            }
            dispatch({ type: BOARDS_BOARD_ADD_SUCCESS, payload: { message: response.message, data: response.data } });

        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                defaultErrorMessage = error.response.data.message;
            }
            dispatch({ type: BOARDS_BOARD_ERROR, payload: { message: error.response.data.message } });
        });
    }
}

export function editBoard(boardId, { name }) {
    return (dispatch) => {
        dispatch({ type: BOARDS_BOARD_PENDING, payload: {} });
        const board = { name };
        axios({
            url: `${API_URL}/api/boards/edit/${boardId}`,
            method: "put",
            data: board,
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data).then(response => {
            if (!response.data || response.error) {
                return dispatch({ type: BOARDS_BOARD_ERROR, payload: { message: response.message } });
            }
            dispatch({ type: BOARDS_BOARD_EDIT_SUCCESS, payload: { message: response.message, data: response.data.board } });

        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                defaultErrorMessage = error.response.data.message;
            }
            dispatch({ type: BOARDS_BOARD_ERROR, payload: { message: error.response.data.message } });
        });
    }
}

export function deleteBoard(boardId) {
    return (dispatch) => {
        dispatch({ type: BOARDS_BOARD_PENDING, payload: {} });
        console.log("despacho?");
        axios({
            url: `${API_URL}/api/boards/delete/${boardId}`,
            method: "delete",
            data: {},
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data).then(response => {
            if (!response.data || response.error) {
                return dispatch({ type: BOARDS_BOARD_ERROR, payload: { message: response.message } });
            }
            dispatch({ type: BOARDS_BOARD_DELETE_SUCCESS, payload: { message: response.message, data: response.data.board } });

        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                defaultErrorMessage = error.response.data.message;
            }
            dispatch({ type: BOARDS_BOARD_ERROR, payload: { message: defaultErrorMessage } });
        });
    }
}

export function clearBoard() {
    return {
        type: BOARDS_BOARD_CLEAR
    }
}