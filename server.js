'use strict';

var http = require('http');
var inventory = require(__dirname + '/routes/routes');


http.createServer(inventory.route()).listen(5000, ()=>{
  console.log('Server started on port 5000');
});
