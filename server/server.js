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

const app =  express(); // init express server
const dotenv = require('dotenv').config(); // establish path to config variables
// If you are having issues with .dotenv check node_modules/dotenv/lib/main.js
// and change path from '../.env' to '.env' on line 12 

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app); // create instance of http server


app.use(bodyParser.json()); // Data chunker
app.use(morgan('dev')); // debugger
app.use(express.static('./')); // Serve up our static files


// +++++++++++++++++++++++++++++ ROUTES ++++++++++++++++++++++++++++++++++++

const messageRouter = require('./routes/messageRouter.js');

app.use('/api/messages', messageRouter);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../' , 'index.html'));
});

//////////////////////////////////////////////////////
/////////// SOCKETS /////////////////////////////////

const io = new socketIo(server)
require('./socketEvents')(io);
const connections = [];

/////////////////////////////////////////////////////

server.listen(app.get('port'), () => {
  console.log(moment().format('h:mm:ss a') + ': Express Server listening on port :', app.get('port'));
});


// Deprecated Socket --> moved to socketEvents.js
//
//
//
// io.on('connection', (socket) => {
//   console.log("Sockets are beautifully connected");
//   connections.push(socket);
//   // when a client send a message event
//   socket.on('/api/messages', (msg) => {
//     console.log('The MSG in server for sockets', msg);
//     fs.writeFile('../client/components/chat.jsx', JSON.stringify(messages, null, 4), function (err) {
//       io.emit('/api/messages', messages);
//       callback(err);
//     });
//     // emit this message to all other client that are listenning (if I want to exclude myself use broadcast)
//     //socket.emit('message', msg);
//   });
//   socket.once('disconnect', function() {
//     connections.splice(connections.indexOf(socket), 1);
//     socket.disconnect();
//   });
// });