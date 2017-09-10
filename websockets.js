'use strict';
const socketIo = require('socket.io');

const bindEvents = socket => {

    socket.on('message', data => {
        console.log('message', data);
        socket.broadcast.emit('message', data);
        //save message to db
        //if something goes wrong -> send message_error event
    });

};

module.exports = server => {
    const io = socketIo(server);

    io.on('connection', socket => {
        bindEvents(socket);
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('a user disconnected');
        })
    });

    return server;
};
