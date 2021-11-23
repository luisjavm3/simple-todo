import {
  USER_LOGOUT_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
} from '../constants/userConstants';

const userReducer = (state = { user: null }, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };

    case USER_SIGNIN_SUCCESS:
      return { loading: false, user: payload };

    case USER_SIGNIN_FAIL:
      return { loading: false, error: payload };

    case USER_LOGOUT_SUCCESS:
      return { user: null };

    default:
      return state;
  }
};

export default userReducer;
