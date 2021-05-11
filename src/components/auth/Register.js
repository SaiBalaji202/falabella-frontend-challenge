import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import './Register.css';

function Register({ setAlert, register, isAuthenticated }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmationPassword: '',
  });

  const { name, email, password, confirmationPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmationPassword) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
      console.log(formData);
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <section className='register text-center'>
      <h1 className='mg-sm text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>

      <form className='form register-form mg-sm' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='confirmationPassword'
            value={confirmationPassword}
            onChange={onChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Register
        </button>
      </form>
      <p className='info'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </section>
  );
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
