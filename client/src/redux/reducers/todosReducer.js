import { USER_LOGOUT_SUCCESS } from '../constants/authConstants';
import {
  TODOS_GET_TODOS_FAIL,
  TODOS_GET_TODOS_REQUEST,
  TODOS_GET_TODOS_SUCCESS,
} from '../constants/todosConstants';

const todosReducer = (state = { todos: null }, action) => {
  const { type, payload } = action;

  switch (type) {
    case TODOS_GET_TODOS_REQUEST:
      return { loading: true };

    case TODOS_GET_TODOS_SUCCESS:
      return { loading: false, todos: payload };

    case TODOS_GET_TODOS_FAIL:
      return { loading: false, error: payload };

    case USER_LOGOUT_SUCCESS:
      return { loading: false };

    default:
      return state;
  }
};

export default todosReducer;
