import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import io from 'socket.io-client'

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  // componentWillMount() {
  //   axios.get(`api/messages`)
  //     .then((result) => {
  //       this.props.messages = result.data
  //       console.log("Props in App : ", this.props.messages)
  //   })
  // };

  componentDidUpdate() {
      window.scrollTo(0, 0);
  };

  render() {
    return (
      <div>
        <div id="routeView">
          <div
            messages={this.props.messages}  
          >
            {this.props.children}
          </div>
        </div>
      </div>

    );
  }
};

App.propTypes = { children: PropTypes.object };
