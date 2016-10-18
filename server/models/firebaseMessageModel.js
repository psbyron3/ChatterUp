///////////////////////////////////////////////////////////
/////////// DEPRECATED ---- FOR NOW //////////////////////
//////////////////////////////////////////////////////////


// const Message = module.exports;
// const moment = require('moment');
// const firebase = require('firebase');


// const db = firebase.database();

// Message.sendMessage = (params) => {
  
//   console.log("in model with params ready to go to db", params);
//   const postMessage = {
//     userId  : params.userId,
//     content : params.content,
//     chatRoomId : params.chatRoomId,
//     createdAt : params.createdAt,
//   }
//   return db.ref('messages/' + params.chatRoomId).push({params});
//   // const newPostKey = db.ref().child('posts').push().key;

//   // const updates = {};
// }

// Message.getMessages = (chatRoomId, callback) => {
//   let conversation = [];

//   console.log("in model fetching messages from db");

//   let getMessages = db.ref('messages/' + chatRoomId);

//   getMessages.on('value', (snapshot) => {
//     console.log("GETMESSAGES SNAPSHOT ::::::::::", snapshot.val());
//     let messages = snapshot.val();
//     messages.forEach((message) => {
//       console.log("INDIVIDUAL MESSAGES I HOPE IN FOREACH ", message);
//       conversation.push(message)
//     })
//   })
//   //let organizedMessages = getMessages.orderByKey();
//   //console.log("GETMESSAGES :::::::::::: ", getMessages);
//   //console.log("ORGANIZEDMESSAGES :::::::: ", organizedMessages);

//   // organizedMessages.on('value', (snapshot) => {
//   //   //console.log("snapshot.val in Model ", snapshot.val());
//   //   snapshot.forEach((message) => {
//   //     console.log("Check out each message in the LOOP ", message);
//   //     conversation.push(message)
//   //   })
//   //   // conversation.push(messages);
//   //   console.log("in getMessages in Model -- conversation: ", conversation);
//   // });
//   //callback();
//   callback(conversation);
// };