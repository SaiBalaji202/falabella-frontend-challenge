import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner';

import { connect } from 'react-redux';
import { login } from '../../actions/auth';

import './Login.css';

function Login({ loading, isAuthenticated, login }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  const { email, password } = formData;

  return (
    <section className='login text-center'>
      <h1 className='text-primary mg-sm'>Login to Falabella!</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Sign Into Your Account
      </p>

      <form className='form login-form mg-sm' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            id='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Your Password...'
            name='password'
            id='password'
            value={password}
            onChange={onChange}
            minLength='4'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Login
        </button>
      </form>
      <p className='info'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>

      {loading && <Spinner />}
    </section>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { login })(Login);
