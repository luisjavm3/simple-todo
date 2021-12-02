import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import tokenReducer from './reducers/authReducer';

const reducer = combineReducers({ auth: tokenReducer });

const initialState = {
  auth: {
    token: JSON.parse(localStorage.getItem('simple_todo'))?.auth.token || null,
  },
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
