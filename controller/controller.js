var express = require('express');
var app = express();

app.use('/', require('../routes'));
app.use('/users', require('../routes/users'));

module.exports = app;
