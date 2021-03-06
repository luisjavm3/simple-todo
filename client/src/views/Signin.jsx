import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signin } from '../redux/actions/authActions';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useSelector((state) => state.auth);
  const { error, token } = auth;

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

  useEffect(() => {
    if (token) navigate('/todos');
  }, [navigate, token]);

  return (
    <div className="signin">
      <div className="signin__content">
        <h1 className="signin__title">SignIn</h1>

        {error && (
          <span style={{ backgroundColor: 'tomato', color: 'white' }}>
            {error}
          </span>
        )}

        <form>
          <div className="form-group">
            <div>
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
            </div>
            <div>
              <input type="email" id="email" onChange={changeHandler} />
            </div>
          </div>

          <div className="form-group">
            <div>
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
            </div>
            <div>
              <input
                type="password"
                id="password"
                autoComplete="off"
                onChange={changeHandler}
              />
            </div>
          </div>

          <div className="form-group">
            <button
              className="form-button"
              type="submit"
              onClick={signinHandler}
            >
              Signin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
