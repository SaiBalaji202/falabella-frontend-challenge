import React from 'react';
import { BrowserRouter as Route, Switch, Redirect } from 'react-router-dom';
import AdminRoute from './AdminRoute';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import Landing from '../layout/Landing';
import NotifySubscribers from '../admin/NotifySubscribers';

export default function Routes() {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <AdminRoute path='/notify-subscribers' component={NotifySubscribers} />
        <Route path='/' exact component={Landing} />
        <Redirect to='/login'></Redirect>
      </Switch>
    </section>
  );
}
