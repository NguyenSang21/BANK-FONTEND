import { combineReducers } from 'redux';
import { notification } from './notification.reducer';

const rootReducer = combineReducers({
  notification
});

export default rootReducer;
