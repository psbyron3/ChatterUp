import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Link } from 'react-router';
import ChatBox from './chatBox.jsx';


export default class Chat extends Component {
  constructor(props){
    super(props);

    this.state = {
      messages : [],
      message : '',
    };
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    return axios.get(`api/messages`)
      .then((result) => {
        //console.log("COMPONENT DID Mount messages : ", result);
        //console.log("Length of array : ", result.data.length)
        if (result.data.length) {
          this.setState({ 
            messages: [ ...this.state.messages, ...result.data] 
          } , () => { 
            console.log("The state after messages are mounted : ", this.state) 
          })
      }
    })
    .catch((err) => { throw err})
    socket.on('new message', msg => {
      this.newMessage(msg);
    })
  };

  // componentDidMount() {
 
  //   socket.emit('join global')
  //   this.socket.on('messages', function (data) {
  //     console.log("in componenetDidMount", data);
  //     this.socket.emit('messages', data);
  //   });
    
  // };

  // componentWillReceiveProps(nextProps) {
  //   let { messages } = this.props;
  //   console.log("IN comp will Receive Props ::::: ", this.props)
  //   this.setState({
  //     messages: [...nextProps.messages],
  //   }, () => this.scrollToBottom().bind(this) );
  //   console.log("State in will receive props ++++ ", this.state)
  // }

  //set new msg to state
  // newMessage(msg) {
  //   axios.post(`api/messages/`, msg);
  //   this.setState({ messages: [...this.state.messages, msg] }, () => {
  //     //this.scrollToBottom();
  //     this.setState({ message : '' }) 
  //   })
  //   this.socket.emit('messages', msg)
  // }
  
   // slide down chatbox to most current message
  newMessage(msg) {
    this.setState({
      messages: [...this.state.messages, msg]
    }, () => {
      this.setState({ message: '' })
      return this.scrollToBottom()
    });
  };

  scrollToBottom () {
    const chatBox = this.refs.chatBox;
    chatBox.scrollTop = chatBox.scrollHeight;

  }


  onInputChange(event) {
    //console.log("this is the value for input", event.target.value);
    this.setState({
      message: event.target.value
    })
  };

  onSubmitMessage(event) {
    //console.log("the event in onSubmit", event);
    //console.log("The message onSubmit : ", this.state.message)
    event.preventDefault();
    const content = this.state.message;

    const msg = {
      content,
      createdAt : new Date(),
      userId : "one",
      chatRoomId : "two"
    }
    axios.post(`api/messages/`, msg).
    then(() => {
      this.newMessage(msg);
      socket.emit('new message', msg);
    })
  };
  

  renderChat() {
    //console.log("IN RENDERCHAT with state :", this.state.messages)
    if (this.state.messages.length === 0) {
      return <div> You have no messages </div>
    }
    return (
      this.state.messages
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map((msg, index) => {
        // console.log("Mapped state in renderChat : ", msg);
        return (
          <ChatBox
            key={index}
            body={msg}
          />
        );
      })
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitMessage}>
          <div className='chat-input-container'>
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
          <div className="msg-container" ref="chatBox">
            {this.renderChat()}
          </div>
        </div>
      </div>
    );

  }
};