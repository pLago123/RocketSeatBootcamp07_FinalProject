import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Details from '~/pages/Details';
import Create from '~/pages/Create';
import Edit from '~/pages/Edit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/details/:id" component={Details} isPrivate />
      <Route path="/create" component={Create} isPrivate />
      <Route path="/edit/:id" component={Edit} isPrivate />

      <Route path="" component={() => <h1>404</h1>} />
    </Switch>
  );
}
