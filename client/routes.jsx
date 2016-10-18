import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Chat from './components/chat';
import ChatBox from './samplechatbox.jsx';



export default (
  <Route path="/" component="App">
    <IndexRoute component={Chat} />
    <Route path='chatbox' component={ChatBox} />
  </Route>
);