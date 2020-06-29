import { combineReducers } from 'redux';
import twitterReducer from './twitterReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  twitter:twitterReducer,
  errors:errorReducer,
  auth:authReducer,
});

export default rootReducer