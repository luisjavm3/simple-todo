import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import tokenReducer from './reducers/authReducer';
import todosReducer from './reducers/todosReducer';

const reducer = combineReducers({ auth: tokenReducer, todos: todosReducer });

const initialState = {
  auth: {
    token: JSON.parse(localStorage.getItem('simple_todo'))?.auth.token || null,
  },
  todos: { todos: null },
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
