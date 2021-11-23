import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/userActions';

const Header = () => {
  const user = useSelector((state) => state.user);
  const { user: userObj } = user;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="header">
      <div className="header__title-bar">
        <span className="header__title">
          {userObj ? (
            <span>
              {`${userObj.first_name} ${userObj.last_name} ${
                userObj.role === 'ADMIN' ? '(ADMIN)' : ''
              }`}
            </span>
          ) : (
            'Welcome'
          )}
        </span>
      </div>

      <div className="header__menu-container">
        <div className="header__logo">
          <span>Logo</span>
        </div>

        <div className="header__menu">
          <div className="header__navigation-menu"></div>

          <div className="header__auth-options">
            <ul>
              {!userObj ? (
                <Fragment>
                  <li>
                    <Link to="/signin">Signin</Link>
                  </li>
                  <li>
                    <Link to="/signup">Signup</Link>
                  </li>
                </Fragment>
              ) : (
                <li>
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
