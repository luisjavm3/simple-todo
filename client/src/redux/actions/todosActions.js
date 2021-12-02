import axios from 'axios';

import {
  TODOS_GET_TODOS_FAIL,
  TODOS_GET_TODOS_REQUEST,
  TODOS_GET_TODOS_SUCCESS,
} from '../constants/todosConstants';

export const getTodosFromAuthUser = () => async (dispatch, getState) => {
  dispatch({ type: TODOS_GET_TODOS_REQUEST });
  const token = getState().auth.token;

  try {
    const { data: user } = await axios.get(`http://localhost:5000/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { data } = await axios.get(
      `http://localhost:5000/users/${user._id}/todos`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch({ type: TODOS_GET_TODOS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TODOS_GET_TODOS_FAIL, payload: error });
  }
};
