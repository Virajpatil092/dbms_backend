"use strict";

var express = require('express');

var app = express();

var mysql = require('mysql');

var cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/', require('./routes/login'));
app.use('/student', require('./routes/form'));
app.use('/report', require('./routes/report'));
app.listen(5000, function () {
  console.log("Server listening on port 5000");
});