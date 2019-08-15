/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';

import Favorite from './pages/Favorite';


const Routes = () => (
  <>
    <Switch>      
      <Route path="/" exact component={Home} />
      <Route path="/cart" component={Cart} />
      <Route path="/favorite" component={Favorite} />
    </Switch>
  </>
);


export default Routes;
