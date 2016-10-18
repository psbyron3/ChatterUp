import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import io from 'socket.io-client'

export default class App extends Component {
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <div id="routeView">
          <div>
            {this.props.children}
          </div>
        </div>
      </div>

    );
  }
};

App.propTypes = { children: PropTypes.object };
