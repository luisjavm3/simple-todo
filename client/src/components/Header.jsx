import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { logout } from '../redux/actions/authActions';

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const { token: tokenObj } = auth;

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    async function fetchUser() {
      const { data } = await axios.get(`http://localhost:5000/users/me`, {
        headers: { Authorization: `Bearer ${tokenObj}` },
      });

      setUser(data);
    }

    if (tokenObj) fetchUser();
  }, [tokenObj]);

  return (
    <div className="header">
      <div className="header__title-bar">
        <span className="header__title">
          {user ? (
            <span>
              {`${user.first_name} ${user.last_name} ${
                user.role === 'ADMIN' ? '(ADMIN)' : ''
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
              {!user ? (
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
