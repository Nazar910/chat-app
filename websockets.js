'use strict';
const socketIo = require('socket.io');

const bindEvents = socket => {

    socket.on('message', data => {
        console.log('message', data);
    })

};

module.exports = server => {
    const io = socketIo(server);

    io.on('connection', socket => {
        bindEvents(socket);
        // socket.emit('message', 'Hello');
        console.log('A user connected');
    });

    return server;
};
