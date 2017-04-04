import { combineReducers } from 'redux';
import users from './users';
import stories from './stories';
import session from './session';

export default combineReducers({ users, stories, session });
