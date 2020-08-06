import {
    NOTES_PENDING,
    NOTES_ERROR,
    NOTES_GETALL_SUCCESS,
    NOTES_GETBYBOARD_SUCCESS,
    NOTES_CLEAR,
    NOTES_NOTE_PENDING,
    NOTES_NOTE_ERROR,
    NOTES_NOTE_CLEAR,
    NOTES_NOTE_GET_SUCCESS,
    NOTES_NOTE_ADD_SUCCESS,
    NOTES_NOTE_EDIT_SUCCESS,
    NOTES_NOTE_DELETE_SUCCESS
} from '../actions/types'

const initState = {
    isLoading: false,
    error: false,
    message: null,
    list: [],
    note: {
        isLoading: false,
        error: false,
        message: null,
        data: {
        }
    }
}

function boardsReducer(state = initState, action) {
    switch (action.type) {
        case NOTES_PENDING:
            return {
                ...state,
                isLoading: true,
                error: false,
                message: action.payload.message
            }
        case NOTES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: true,
                message: action.payload.message
            }
        case NOTES_GETALL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                message: action.payload.message,
                list: [...action.payload.data.notes]
            }
        case NOTES_CLEAR:
            return {
                ...state,
                isLoading: false,
                error: false,
                message: null,
            }
        case NOTES_NOTE_PENDING:
            return {
                ...state,
                note: {
                    isLoading: true,
                    error: null,
                    message: action.payload.message
                }
            }
        case NOTES_NOTE_ERROR:
            return {
                ...state,
                note: {
                    isLoading: false,
                    error: true,
                    message: action.payload.message,
                    data: {}
                }
            }
        case NOTES_NOTE_GET_SUCCESS:
            return {
                ...state,
                note: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: action.payload.data.note
                }
            }
        case NOTES_NOTE_ADD_SUCCESS:
            return {
                ...state,
                list: [...state.list, action.payload.data.note],
                note: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: action.payload.data.note
                }
            }
        case NOTES_NOTE_EDIT_SUCCESS:
            let newListNotesEdited = [...state.list].map(note => {
                if(note._id === action.payload.data.note._id){
                    note = action.payload.data.note;
                }
                return note;
            });
            return {
                ...state,
                list: newListNotesEdited,
                note: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: action.payload.data.note
                }
            }
        case NOTES_NOTE_DELETE_SUCCESS:
            let newListNotesDelete = [...state.list].filter(note => note._id !== action.payload.data.note._id);
            return {
                ...state,
                list: newListNotesDelete,
                note: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: {}
                }
            }
        case NOTES_NOTE_CLEAR:
            return {
                ...state,
                note: {
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