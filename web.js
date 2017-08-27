'use strict';
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile('index.html'));

const port = process.env.FRONTEND_PORT || 3000;

app.listen(port, () => console.log(`Server is started on *:${port}`));

