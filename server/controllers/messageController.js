const Message = require('../models/messageModel.js');
const url = require('url');


module.exports = {
  '/' : {
    get(req, res) {
      console.log("in GET for controller");

      const chatRoomId = "two"; //url.parse(req.url, true).path.split('/message/')[0][1];
      //console.log("In GET controller chatRoomId is ", chatRoomId);
      Message.getMessages(chatRoomId, (data, err) => {
        //console.log("IN CONTROLLER COMING BACK FROM DB WITH DATA (HOPEFULLY) ", data)
        if (data) {
          res.send(data)
        } else {
          throw err;
        }
      })
        // .then((messages) => {
        //   console.log("+++++++++++ Back in controller after GET from db ", messages);
        //   // if (!messages.length) {
        //   //   res.end('This chat has no messages')
        //   // } else {
        //   res.send(messages);
        // })
        // .catch((err) => {
        //   console.log("err in controller/get"); 
        //   throw err; 
        // });

    },
    post(req, res) {
      console.log("in post for controller with req.body", req.body);
      const newMsg = {
        content : req.body.content,
        userId : req.body.userId,
        chatRoomId : req.body.chatRoomId,
        createdAt: req.body.createdAt,
      }

      Message.sendMessage(newMsg, (data, err) => {
        if (err) {
          console.error("Error posting in controller", err);
        } else {
          res.send(data);
        }
      })
      //   .then((message) => {
      //     console.log("coming back from db in controller");
      //     res.json("content: true");
      //   })
      //   .catch((err) => { throw err; });

      // res.end('Received POST at /api/message/:eventId');

    },
    put(req, res) {

    },
    delete(req, res) {

    }
  }

}