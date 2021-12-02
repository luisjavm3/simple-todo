import axios from 'axios';

import {
  USER_LOGOUT_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from '../constants/authConstants';

export const signup =
  (first_name, last_name, email, gender, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });

    try {
      const { data } = await axios.post(`http://localhost:5000/auth/signup`, {
        first_name,
        last_name,
        email,
        gender,
        password,
      });

      setTokenAtLocalStorage(data.token);
      // this goes to the token reducer
      dispatch({ type: USER_SIGNUP_SUCCESS, payload: data.token });
    } catch (error) {
      const message = error.response.data.errors
        ? JSON.stringify(error.response.data.errors)
        : error.message;

      // this goes to the token reducer
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload: message,
      });
    }
  };

export const signin = (email, password, navigate) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });

  try {
    const { data } = await axios.post(`http://localhost:5000/auth/signin`, {
      email,
      password,
    });

    setTokenAtLocalStorage(data.token);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.token });
  } catch (err) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: err.response.data.error });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('simple_todo');
  dispatch({ type: USER_LOGOUT_SUCCESS });
};

const getDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('simple_todo'));
};

const setTokenAtLocalStorage = (token) => {
  let lsData = getDataFromLocalStorage();

  lsData = { ...lsData, auth: { token } };

  localStorage.setItem('simple_todo', JSON.stringify(lsData));
};
