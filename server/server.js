// Node Express server
const express = require('express');
const bodyParser = require('body-parser'); // chunks data + parses that body
const moment = require('moment'); // time library
const socketIo = require('socket.io'); // Bread and butter of this app
const http = require('http');
const morgan = require('morgan'); // debug helper
const path = require('path');
const db = require('./db/db.js');
const fs = require('fs');

// init express server
const app =  express();

// establish path to config variables
const dotenv = require('dotenv').config();
// If you are having issues with .dotenv check node_modules/dotenv/lib/main.js
// and change path from '../.env' to '.env' on line 12 

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'))
// init new instance of socket.io and handle web server
const io = socketIo(server);


// Data chunker
app.use(bodyParser.json());
// debugger
app.use(morgan('dev')); 
// Serve up our static files
app.use(express.static('../client'));



// +++++++++++++++++++++++++++++ ROUTES ++++++++++++++++++++++++++++++++++++

const messageRouter = require('./routes/messageRouter.js');

app.use('/api/messages', messageRouter);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

//app.listen(port);
console.log(moment().format('h:mm:ss a') + ": Server is tuning in live on 3000");


// const sendMessages = function (socket) {
//   fs.readFile('../client/components', 'utf8', function(err, messages) {
//     messages = JSON.parse(messages);
//     socket.emit('messages', messages);
//   });
// };


// Init Socket.io
// const connections = [];

// io.sockets.on('connection', (socket) => {
//   socket.emit('message', 'You are connected!!');

//   socket.on('message', (message) => {
//     app.send()
//   })
//   console.log("Sockets has a successful connection");
  
//   connections.push(socket);

//   socket.on('fetchMessages', function () {
//     sendMessages(socket);
//   });

  // socket.on('newMessage', function (comment, callback) {
  //   fs.readFile('../client/components', 'utf8', function(err, comments) {
  //     messages = JSON.parse(messages);
  //     messages.push(messages);
  //     fs.writeFile('../client/components/chat.jsx', JSON.stringify(messages, null, 4), function (err) {
  //       io.emit('messages', messages);
  //       callback(err);
  //     });
  //   });
  // });

const connections = [];
io.on('connection', (socket) => {
  console.log("Sockets are beautifully connected");
  connections.push(socket);
  // when a client send a message event
  socket.on('message', (msg) => {
    console.log('The MSG in server for sockets', msg);
    fs.writeFile('../client/components/chat.jsx', JSON.stringify(messages, null, 4), function (err) {
      io.emit('messages', messages);
      callback(err);
    });
    // emit this message to all other client that are listenning (if I want to exclude myself use broadcast)
    //socket.emit('message', msg);
  });
  socket.once('disconnect', function() {
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
  });
});
