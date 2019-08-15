/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import Favorite from './pages/Favorite';

import KeyMarvel from './services/keymarvel';

const Routes = () => (
  <>
    <Switch>
      <Route path="/init" component={Auth} />
      <PrivateRoute path="/" exact component={Home} />
      <PrivateRoute path="/cart" component={Cart} />
      <PrivateRoute path="/favorite" component={Favorite} />
    </Switch>
  </>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      KeyMarvel.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/init', state: { from: props.location } }} />
      )
    }
  />
);

export default Routes;
