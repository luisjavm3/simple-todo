import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';

const reducer = combineReducers({ user: userReducer });

const initialState = {
  user: { user: JSON.parse(localStorage.getItem('todo_store'))?.user || null },
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
