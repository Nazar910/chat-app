'use strict';
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
require('./websockets')(server);

const { FRONTEND_PORT } = require('./config');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile('index.html'));

const port = FRONTEND_PORT;

const serverStartedPromise = new Promise(resolve => {
    server.listen(port, () => {
        console.log(`Server is started on *:${port}`);
        resolve();
    });
});

module.exports = serverStartedPromise;
