import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';

const AdminRoute = ({
  component: Component,
  render,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (loading) {
        <Spinner />;
        return;
      }
      if (!isAuthenticated || !user?.isAdmin) return <Redirect to='/' />;
      return Component ? <Component {...props} /> : render(props);
    }}
  />
);

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoute);
