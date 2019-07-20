import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import combinedReducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, logger];

const initialState = {};

const store = createStore(combinedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

sagaMiddleware.run(sagas);

export default store;
