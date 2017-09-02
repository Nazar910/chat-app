'use strict';
const socketIo = require('socket.io');

const bindEvents = socket => {

    socket.on('message', data => {
        console.log('message', data);
        socket.broadcast.emit('message', data);
    });

};

module.exports = server => {
    const io = socketIo(server);

    io.on('connection', socket => {
        bindEvents(socket);
        console.log('A user connected');
    });

    return server;
};
