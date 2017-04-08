'use strict';
const path = require('path');
const express = require('express');
require('dotenv').config();

const app = express();

const memberconnect = require('./routers/memberconnect');

app.use('/memberconnect', memberconnect);

app.listen(process.env.PORT, () => console.log(`💕  Its happening on port ${process.env.PORT || 9696} 💕`));

module.exports = app;
