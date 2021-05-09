import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

import './Navbar.css';

const NavBar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const adminOnlyLinks = (
    <ul>
      <li>
        <Link to='/notify-subscribers'>Send Notification</Link>
      </li>
      <li>
        <a onClick={logout} href='?#'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href='?#'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> Falabella
        </Link>
      </h1>

      {!loading &&
        (user?.isAdmin
          ? adminOnlyLinks
          : isAuthenticated
          ? authLinks
          : guestLinks)}
    </nav>
  );
};

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logout,
})(NavBar);
