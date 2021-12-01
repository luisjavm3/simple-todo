import axios from 'axios';

import data from '../../data';
import checkLocalStorage from '../../utils/checkLocalStorage';
import {
  USER_LOGOUT_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
} from '../constants/userConstants';

export const signup =
  (first_name, last_name, email, gender, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });

    try {
      const user = await axios.post(`http://localhost:5000/auth/signup`, {
        first_name,
        last_name,
        email,
        gender,
        password,
      });

      dispatch({ type: USER_SIGNIN_SUCCESS, payload: user });
    } catch (error) {
      if (error?.type === 'ValidationError')
        dispatch({ type: USER_SIGNUP_FAIL, payload: error.errors });
    }
  };

export const signin = (email, password, navigate) => (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });

  try {
    const user = data.users.find((user) => user.email === email);

    if (user) {
      if (user.email === email && user.password === password) {
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: user });

        checkLocalStorage(user);
        navigate('/todo');
        return;
      }

      throw new Error('Wrong credentials.');
    }

    throw new Error('User does not exist.');
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT_SUCCESS });

  localStorage.removeItem('todo_store');
};
