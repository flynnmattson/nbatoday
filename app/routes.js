import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Game from './components/Game';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/game/:id' component={Game} />
  </Route>
);
