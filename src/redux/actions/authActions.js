import {
    AUTH_USER_SIGNUP_PENDING,
    AUTH_USER_SIGNUP_ERROR,
    AUTH_USER_SIGNUP_SUCCESS,
    AUTH_USER_SIGNUP_CLEAR,
    AUTH_USER_SIGNIN_PENDING,
    AUTH_USER_SIGNIN_ERROR,
    AUTH_USER_SIGNIN_SUCCESS,
    AUTH_USER_SIGNIN_CLEAR,
    AUTH_USER_LOGOUT
} from './types';
import axios from 'axios';
import { API_URL, DEFAULT_ERROR_FETCH_MESSAGE } from '../../config';

let defaultErrorMessage = DEFAULT_ERROR_FETCH_MESSAGE

export function signUp({ username, email, password }) {
    return (dispatch) => {
        dispatch({ type: AUTH_USER_SIGNUP_PENDING, payload: {} });
        const user = { username, email, password }
        axios
            ({
                url: `${API_URL}/api/auth/sign-up`,
                method: "post",
                data: user
            })
            .then(response => response.data)
            .then(response => {
                if (!response.data || response.error) {
                    return dispatch({ type: AUTH_USER_SIGNUP_ERROR, payload: { message: response.message } });
                }
                dispatch({ type: AUTH_USER_SIGNUP_SUCCESS, payload: { message: response.message } });
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    defaultErrorMessage = error.response.data.message;
                }
                dispatch({ type: AUTH_USER_SIGNUP_ERROR, payload: { message: defaultErrorMessage } });
            });
    }
}

export function signIn({ username, password }) {
    return (dispatch) => {
        dispatch({ type: AUTH_USER_SIGNIN_PENDING, payload: {} });
        const user = { username, password }
        axios({
            url: `${API_URL}/api/auth/sign-in`,
            method: "post",
            data: user
        })
            .then(response => response.data)
            .then(response => {
                if (!response.data || response.error) {
                    return dispatch({ type: AUTH_USER_SIGNIN_ERROR, payload: { message: response.message } });
                }
                localStorage.setItem('noteboards_t', response.data.access_token);
                dispatch({ type: AUTH_USER_SIGNIN_SUCCESS, payload: { message: response.message, data: response.data } });

            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    defaultErrorMessage = error.response.data.message;
                }
                dispatch({ type: AUTH_USER_SIGNIN_ERROR, payload: { message: defaultErrorMessage } });
            });
    }
}

export function clearSignUp() {
    return {
        type: AUTH_USER_SIGNUP_CLEAR
    }
}
export function clearSignIn() {
    return {
        type: AUTH_USER_SIGNIN_CLEAR,
    }
}

export function logout() {
    localStorage.removeItem('noteboards_t');
    return {
        type: AUTH_USER_LOGOUT,
    }
}

export function verifyToken() {
    const token = localStorage.getItem('noteboards_t');
    return (dispatch) => {
        if (!token) {
            return dispatch({ type: AUTH_USER_LOGOUT });
        }
        axios({
            url: `${API_URL}/api/auth/verify`,
            method: "post",
            data: {},
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            dispatch({ type: AUTH_USER_SIGNIN_SUCCESS, payload: { message: response.message, data: { access_token: token, user: response.data.user } } });
        }).catch(error => {
            dispatch({ type: AUTH_USER_LOGOUT });
        });
    }
}