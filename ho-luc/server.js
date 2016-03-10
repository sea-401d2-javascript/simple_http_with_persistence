'use strict'

var http = require('http');
var dogs = require(__dirname + '/routes/dogRoutes.js');

var server = http.createServer(dogs.route())

server.listen(3000, () => console.log('server started on port 3000.'))
