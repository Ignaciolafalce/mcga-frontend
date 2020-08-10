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

} from '../actions/types'

const authState = {
    isAuth: false,
    isAccessVerified:false,
    signIn: {
        isLoading: false,
        error: false,
        message: null,
    },
    signUp: {
        isLoading: false,
        error: false,
        message: null,
    },
    user: {},
    token: '',
}

function authReducer(state = authState, action) {
    switch (action.type) {
        case AUTH_USER_SIGNUP_PENDING:
            return {
                ...state,
                signUp: {
                    isLoading: true,
                    error: null,
                    message: action.payload.message
                }
            }
        case AUTH_USER_SIGNUP_ERROR:
            return {
                ...state,
                signUp: {
                    isLoading: false,
                    error: true,
                    message: action.payload.message
                }
            }
        case AUTH_USER_SIGNUP_SUCCESS:
            return {
                ...state,
                signUp: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message
                }
            }
        case AUTH_USER_SIGNUP_CLEAR:
            return {
                ...state,
                signUp: {
                    isLoading: false,
                    error: false,
                    message: null
                }
            }

        case AUTH_USER_SIGNIN_PENDING:
            return {
                ...state,
                signIn: {
                    isLoading: true,
                    error: null,
                    message: action.payload.message
                }
            }
        case AUTH_USER_SIGNIN_ERROR:
            return {
                ...state,
                signIn: {
                    isLoading: false,
                    error: true,
                    message: action.payload.message
                }
            }
        case AUTH_USER_SIGNIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                isAccessVerified: true,
                user: action.payload.data.user,
                token: action.payload.data.access_token,
                signIn: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message
                }
            }
        case AUTH_USER_SIGNIN_CLEAR:
            return {
                ...state,
                signIn: {
                    isLoading: false,
                    error: false,
                    message: null
                }
            }
        case AUTH_USER_LOGOUT:
            return {
                isAuth: false,
                isAccessVerified: true,
                signIn: {
                    isLoading: false,
                    error: false,
                    message: null,
                },
                signUp: {
                    isLoading: false,
                    error: false,
                    message: null,
                },
                user: {},
                token: '',
            }
        default:
            return state
    }
}

export default authReducer;