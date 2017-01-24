import React from 'react';
import {Router} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Game from './components/game/Game';

export default (
  <Router component={App}>
    <Router path='/' component={Home} />
    <Router path='/game/:gameId/:statusId' component={Game} />
  </Router>
);
