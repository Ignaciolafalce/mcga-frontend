import { combineReducers } from 'redux';
import authReducer from './authReducer';
import boardsReducer from './boardsReducer';
import notesReducer from './notesReducer';

export default combineReducers({
  auth: authReducer,
  boards:boardsReducer,
  notes:notesReducer
});