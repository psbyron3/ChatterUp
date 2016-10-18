const Chatroom = require('../db/db.js');
const mongoose = require('mongoose');

const Message = module.exports;


Message.getMessages = (chatRoomId, callback) => {
  
  mongoose.model("Chatroom").find((err, messages) => {
    if (err) {
      console.error("Error in model/GET: ", err);
    } else {
      callback(messages);
    }
  })
}

Message.sendMessage = (params, callback) => {

    const username  = params.userId;
    const content = params.content;
    const chatRoomId = params.chatRoomId;
    const createdAt = params.createdAt;

  mongoose.model('Chatroom').create({
    username : username,
    content : content,
    chatRoomId : chatRoomId,
    createdAt : createdAt
  }, (err, blob) => {
    if (err) {
      console.error("Problem writing to db in model/post ", err);
    } else {
      callback(blob);
    }
  })


}