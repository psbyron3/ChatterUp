import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Link } from 'react-router';
import ChatBox from './chatbox.jsx';


export default class Chat extends Component {
  constructor(props){
    super(props);

    this.state = {
      messages : [],
      message : '',
    };
    this.socket = io('/');
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    //this.socket.on('messages', (newChatState) => this.handleStateChange(newChatState))
  }

  componentWillMount() {
    axios.get(`api/messages`).then((result) => {
      const messages = result.data
      console.log("COMPONENT WILL Mount messages : ", messages);
      this.setState({ messages: [...this.state.messages.concat([...messages.content])] })
    })
  };

  componentDidMount() {
    axios.get(`api/messages`).then((result) => {
      
      if (typeof result.data == "object") {
        const messages = result.data
        this.setState({ messages: [...this.state.messages, ...messages.content] })
      }
    });
    this.socket = io('/');
      this.socket.on('message', function (data) {
        console.log("in componenetDidMount", data);
        this.socket.emit('message', data);
    });
    
  };

  componentWillReceiveProps(nextProps) {
    let { messages } = this.props;
    this.setState({
      messages: [...nextProps.messages],
    })
  }

  onInputChange(event) {
    console.log("this is the value for input", event.target.value);
    this.setState({
      message: event.target.value
    })
  }

  onSubmitMessage(event) {
    console.log("the event in onSubmit", event);
    event.preventDefault();

    const content = this.state.message;

    const msg = {
      content,
      createdAt : new Date(),
      userId : "one",
      chatRoomId : "two"
    }
    // store the msg object in the database
    axios.post(`api/messages/`, msg);
    // add the new message to bottom of list
    this.setState({ messages: [...this.state.messages, msg.content] }, () => {
      // clear out input field
      //this.setState({ message : '' })
    })
    this.setState({ message : '' })
    this.socket.emit('message', msg);



  };
  
  // slide down chatbox to most current message
  scrollToBottom () {
    const chatBox = this.refs.chatBox;
    chatBox.scrollTop = chatBox.scrollHeight;

  }

  renderChat() {
    const messages = this.state.messages.map((msg, index) => (
    
      <ChatBox
        key={index}
        body={msg}
      />
    ))
    return messages
  }

  render() {
    return (
      <div>
        <ul>
          Welcome to ChatMeUp. Chat Away!
        </ul>
        <form onSubmit={this.onSubmitMessage}>
          <div>
            <input
              id="msg-input"
              type="text"
              className="form-control input-sm chat_input"
              placeholder="Send a wonderful thought..."
              onClick={ (event) => this.scrollToBottom(event) }
              onChange={this.onInputChange}
              value={this.state.message}
            />
            <span className="input-group-btn">
              <button className="btn btn-primary btn-sm" id="btn-chat"> Send </button>
            </span>
          </div>
        </form>
        <div className="chatroom"> 
        </div>
        <div className="msg-container">
          {this.renderChat()}
        </div>
      </div>
    );

  }
};