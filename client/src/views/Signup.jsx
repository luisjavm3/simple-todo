import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signin } from '../redux/actions/userActions';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const user = useSelector((state) => state.user);
  const { error, user: userObj } = user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const value = e.target.value;

    switch (e.target.id) {
      case 'first-name':
        setFirstName(value);
        break;

      case 'last-name':
        setLastName(value);
        break;

      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      case 'confirm-password':
        setConfirmPassword(value);
        break;

      default:
        break;
    }
  };

  const signupHandler = (e) => {
    e.preventDefault();

    // dispatch(signin(email, password, navigate));
  };

  return (
    <div className="signin">
      <div className="signin__content">
        <h1 className="signin__title">SignUp</h1>

        {error && (
          <span style={{ backgroundColor: 'tomato', color: 'white' }}>
            {error}
          </span>
        )}

        <form>
          <div className="form-group">
            <div>
              <label htmlFor="first-name">
                <strong>First name</strong>
              </label>
            </div>
            <div>
              <input type="text" id="first-name" onChange={changeHandler} />
            </div>
          </div>

          <div className="form-group">
            <div>
              <label htmlFor="last-name">
                <strong>Last name</strong>
              </label>
            </div>
            <div>
              <input type="text" id="last-name" onChange={changeHandler} />
            </div>
          </div>

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
            <div className="signup__gender-container">
              <div>
                <input type="Radio" name="gender" value="Male" id="male" />
                <label htmlFor="male">Male</label>
              </div>

              <div>
                <input type="Radio" name="gender" value="Female" id="female" />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div>
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
            </div>
            <div>
              <input type="password" id="password" onChange={changeHandler} />
            </div>
          </div>

          <div className="form-group">
            <div>
              <label htmlFor="confirm-password">
                <strong>Confirm password</strong>
              </label>
            </div>
            <div>
              <input
                type="password"
                id="confirm-password"
                onChange={changeHandler}
              />
            </div>
          </div>

          <div className="form-group">
            <button
              className="form-button"
              type="submit"
              onClick={signupHandler}
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
