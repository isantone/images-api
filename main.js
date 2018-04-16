'use strict';

const MODE = process.env.MODE;

const SERVER_PORT = 3003;
const ALLOWED_ORIGINS = [
    'http://localhost:7777',
    'http://localhost:7779',
    'http://localhost:4200'
]

const express = require('express');
const path = require('path');

const app = express();

// CORS
app.use(function(req, res, next) {
    const origin = req.headers.origin;

    if (ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});

// Public resources
app.use(express.static('public', {  maxAge: '1h'}));

// Unknown EndPoint
app.use(function(req, res, next) {
    const err = new Error('Not Found');

    err.status = 404;
    next(err);
});

const server = app.listen(SERVER_PORT, () => {
    console.log('---------------------------');
    console.log(`The server is listening on http://localhost:${SERVER_PORT} in ${MODE} mode`);
    console.log('---------------------------');
});

function stop() {
    server.close();
}

// For tests
module.exports = server;
module.exports.stop = stop;