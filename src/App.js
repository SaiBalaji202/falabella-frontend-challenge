import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

import './App.css';

import { Switch, Redirect } from 'react-router-dom';
import AdminRoute from './components/routing/AdminRoute';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing';
import NotifySubscribers from './components/admin/NotifySubscribers';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Alert />
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <AdminRoute
              path='/notify-subscribers'
              component={NotifySubscribers}
            />
            <Route path='/' exact component={Landing} />
            <Redirect to='/'></Redirect>
          </Switch>
        </>
      </Router>
    </Provider>
  );
}

export default App;
