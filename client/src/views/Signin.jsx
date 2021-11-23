import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signin } from '../redux/actions/userActions';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector((state) => state.user);
  const { error, user: userObj } = user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const value = e.target.value;

    switch (e.target.id) {
      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        break;
    }
  };

  const signinHandler = (e) => {
    e.preventDefault();

    dispatch(signin(email, password, navigate));
  };

  return (
    <div className="signin">
      <h1>SignIn</h1>

      {error && (
        <span style={{ backgroundColor: 'tomato', color: 'white' }}>
          {error}
        </span>
      )}

      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={changeHandler} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={changeHandler} />
        </div>

        <button type="submit" onClick={signinHandler}>
          Signin
        </button>
      </form>
    </div>
  );
};

export default Signin;
