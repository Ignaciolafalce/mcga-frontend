import {
    BOARDS_PENDING,
    BOARDS_ERROR,
    BOARDS_GETALL_SUCCESS,
    BOARDS_CLEAR,
    BOARDS_BOARD_PENDING,
    BOARDS_BOARD_ERROR,
    BOARDS_BOARD_SUCCESS,
    BOARDS_BOARD_CLEAR,
    BOARDS_BOARD_GET_SUCCESS,
    BOARDS_BOARD_ADD_SUCCESS,
    BOARDS_BOARD_EDIT_SUCCESS,
    BOARDS_BOARD_DELETE_SUCCESS
} from '../actions/types'

const initState = {
    isLoading: false,
    error: false,
    message: null,
    list: [],
    board: {
        isLoading: false,
        error: false,
        message: null,
        data: {}
    }
}

function boardsReducer(state = initState, action) {
    switch (action.type) {
        case BOARDS_PENDING:
            return {
                ...state,
                isLoading: true,
                error: null,
                message: action.payload.message
            }
        case BOARDS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: true,
                message: action.payload.message
            }
        case BOARDS_GETALL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                message: action.payload.message,
                list: [...action.payload.data.boards]
            }
        case BOARDS_CLEAR:
            return {
                ...state,
                isLoading: false,
                error: false,
                message: null,
            }
        case BOARDS_BOARD_PENDING:
            return {
                ...state,
                board: {
                    isLoading: true,
                    error: null,
                    message: action.payload.message
                }
            }
        case BOARDS_BOARD_ERROR:
            return {
                ...state,
                board: {
                    isLoading: false,
                    error: true,
                    message: action.payload.message,
                    data: {}
                }
            }
        case BOARDS_BOARD_GET_SUCCESS:
            return {
                ...state,
                list: [...state.list, action.payload.data.board],
                board: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: action.payload.data.board
                }
            }
        case BOARDS_BOARD_ADD_SUCCESS:
            return {
                ...state,
                list: [...state.list, action.payload.data.board],
                board: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: action.payload.data.board
                }
            }
        case BOARDS_BOARD_EDIT_SUCCESS:
            return {
                ...state,
                list: [...state.list, action.payload.data.board],
                board: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: action.payload.data.board
                }
            }
        case BOARDS_BOARD_DELETE_SUCCESS:
            let newListBoards = [...state.list].filter(board => board._id !== action.payload.data._id);
            return {
                ...state,
                list: newListBoards,
                board: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: {}
                }
            }
        case BOARDS_BOARD_CLEAR:
            return {
                ...state,
                board: {
                    isLoading: false,
                    error: false,
                    message: null,
                    data: {}
                }
            }
        default:
            return state
    }
}

export default boardsReducer;