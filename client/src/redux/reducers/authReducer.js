import {
  USER_LOGOUT_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from '../constants/authConstants';

const tokenReducer = (state = { token: null }, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_SIGNIN_REQUEST:
    case USER_SIGNUP_REQUEST:
      return { loading: true };

    case USER_SIGNIN_SUCCESS:
    case USER_SIGNUP_SUCCESS:
      return { loading: false, token: payload };

    case USER_SIGNIN_FAIL:
    case USER_SIGNUP_FAIL:
      return { loading: false, error: payload };

    case USER_LOGOUT_SUCCESS:
      return { token: null };

    default:
      return state;
  }
};

export default tokenReducer;
