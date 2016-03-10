'use strict';

var http = require('http');
var aliens = require(__dirname + '/routes/route-handler');

http.createServer(aliens.route()).listen(3000, () => {
  console.log('The aliens are coming...');
});
