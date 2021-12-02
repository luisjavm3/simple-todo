import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

import { signup } from '../redux/actions/authActions.js';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Errors
  const [isMatch, setIsMatch] = useState(true);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const auth = useSelector((state) => state.auth);
  const { error, token } = auth;

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

        if (e.target.value === confirmPassword) {
          setIsMatch(true);
        } else {
          setIsMatch(false);
        }
        break;

      case 'confirm-password':
        setConfirmPassword(value);

        if (password === e.target.value) {
          setIsMatch(true);
        } else {
          setIsMatch(false);
        }
        break;

      default:
        break;
    }
  };

  const radioChange = (e) => {
    setGender(e.target.value);
  };

  const signupHandler = (e) => {
    e.preventDefault();

    if (password === confirmPassword && password.length > 0) {
      // setGeneralError('');
      dispatch(signup(firstName, lastName, email, gender, password));
    } else {
      setPassword('');
      setConfirmPassword('');
      e.target.form[5].value = '';
      e.target.form[6].value = '';
      // setGeneralError('Introduce a valid password.');
    }
  };

  useEffect(() => {
    // If error is an JSON object
    if (error) {
      const foo = JSON.parse(error);

      if (typeof foo === 'object' && !Array.isArray(foo) && foo !== null) {
        if (foo.first_name) {
          setFirstNameError(foo.first_name);
        } else {
          setFirstNameError('');
        }

        if (foo.last_name) {
          setLastNameError(foo.last_name);
        } else {
          setLastNameError('');
        }

        if (foo.email) {
          setEmailError(foo.email);
        } else {
          setEmailError('');
        }

        if (foo.gender) {
          setGenderError(foo.gender);
        } else {
          setGenderError('');
        }

        if (foo.password) {
          setPasswordError(foo.password);
        } else {
          setPasswordError('');
        }
      } else {
        setGeneralError(error);
      }
    }

    if (token) navigate('/todos');
  }, [
    error,
    firstNameError,
    lastNameError,
    emailError,
    genderError,
    passwordError,
    token,
    navigate,
  ]);

  return (
    <div className="signin">
      <div className="signin__content">
        <h1 className="signin__title">SignUp</h1>

        {generalError && <span className="alert">{generalError}</span>}

        <form>
          <div className="form-group">
            {firstNameError && <span className="alert">{firstNameError}</span>}
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
            {lastNameError && <span className="alert">{lastNameError}</span>}
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
            {emailError && <span className="alert">{emailError}</span>}
            <div>
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
            </div>
            <div>
              <input type="email" id="email" onChange={changeHandler} />
            </div>
          </div>

          {/* Gender section */}
          <div className="form-group">
            {genderError && <span className="alert">{genderError}</span>}
            <div className="signup__gender-container">
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  id="male"
                  onChange={(e) => radioChange(e)}
                />
                <label htmlFor="male">Male</label>
              </div>

              <div>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  id="female"
                  onChange={(e) => radioChange(e)}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            {passwordError && <span className="alert">{passwordError}</span>}

            <div>
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
            </div>
            <div>
              <input
                type="password"
                id="password"
                onChange={changeHandler}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="form-group">
            {!isMatch && (
              <span className="alert">Confirm Password does not match.</span>
            )}

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
                autoComplete="off"
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
