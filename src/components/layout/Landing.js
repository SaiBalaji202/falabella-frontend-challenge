import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';

import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

import './Landing.css';
import { addSubscriber } from '../../services/subscribersService';

function Landing({ isAuthenticated, user, authLoading, setAlert }) {
  useEffect(() => {
    if (isAuthenticated && user) {
      const { name, email } = user;
      setFormData({
        name,
        email,
      });
    }
  }, [isAuthenticated, user]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);

  const clearForm = () => setFormData({ email: '', name: '' });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await addSubscriber(name, email);
      setAlert('Added Subscriber!', 'success');
      clearForm();
    } catch (ex) {
      setAlert('Failed Adding Subscriber!', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const { name, email } = formData;

  return (
    <section className='landing text-center'>
      {authLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className='mg-sm text-primary'>Subscribe to our Newsletter!</h1>
          <p className='lead'>
            <i className='far fa-envelope'></i> Get Notified about our daily
            feed!
          </p>

          <form className='form landing-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='username'>Name</label>
              <input
                type='text'
                placeholder='Your Name...'
                name='name'
                id='name'
                value={name}
                onChange={onChange}
                minLength='3'
                disabled={isAuthenticated}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                placeholder='Email Address'
                name='email'
                id='email'
                value={email}
                onChange={onChange}
                disabled={isAuthenticated}
                required
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Subscribe!
            </button>
          </form>
          {loading && <Spinner />}
        </>
      )}
    </section>
  );
}

Landing.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { setAlert })(Landing);
