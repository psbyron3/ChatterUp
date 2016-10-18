import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import App from './components/app';
import routes from './routes.jsx';

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />
, document.getElementById('app'));