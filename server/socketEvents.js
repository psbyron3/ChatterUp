module.exports = (io) => {

  io.on('connection', (socket) => {
    console.log("Beautiful sockets are connected")
    console.log("THE HANDSHAKES : ", socket.handshake.issued)
    //socket.emit('join user', socket.handshake.issued);
    socket.once('disconnect', () => {
      console.log("socket is disconnected");
    });

    socket.on('join global', (username) => {
      socket.join(username);
      console.log("New user in the global chat : ", username)
    });

    socket.on('new message', (msg) => {
      console.log("The new message from sockets : ", msg);
      socket.broadcast.emit('message', msg);
    });

  });
}