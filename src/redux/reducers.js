import { combineReducers } from 'redux';
import cropboxReducer from './cropbox/reducer';

const combinedReducer = combineReducers({
  cropbox: cropboxReducer
});

export default combinedReducer;
