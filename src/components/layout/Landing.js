import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

import './Landing.css';
import { addSubscriber } from '../../services/subscribersService';

function Landing({ setAlert }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const clearForm = () => setFormData({ email: '', name: '' });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addSubscriber(name, email);
    setAlert('Added Subscriber!', 'success');

    clearForm();
  };

  const { name, email } = formData;

  return (
    <section className='landing text-center'>
      <h1 className='mg-sm text-primary'>Subscribe to our Newsletter!</h1>
      <p className='lead'>
        <i className='far fa-envelope'></i> Get Notified about our daily feed!
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
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Subscribe!
        </button>
      </form>
    </section>
  );
}

Landing.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Landing);
