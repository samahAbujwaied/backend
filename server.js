'use strict';
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const PORT = process.env.PORT 
const server = express();
server.use(cors());
const weatherHandler = require('./modules/weather');
const movieHandler = require('./modules/movie');

/* ---------Endpoint ------ */
server.get('/', (req, res) => {
    res.send('Welcome ....')})

    server.get('/test', (req, res) => {
    res.send('test server')})

    server.get('/weather', weatherHandler)

server.get('/movie', movieHandler)

server.get('*', (req, res) => { 
    if (res.status(400))
        res.send('Bad Request');
    else if (res.status(404))
        res.send('Not Found');})
/*------listen port-------*/
server.listen(PORT, () => {
    console.log(`Listen on PORT ${PORT}`)
})