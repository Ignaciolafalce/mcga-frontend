import { combineReducers } from 'redux';
import authReducer from './authReducer';
import boardsReducer from './boardsReducer';

export default combineReducers({
  auth: authReducer,
  boards:boardsReducer
});