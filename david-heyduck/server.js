'use strict';

var http = require('http');
var dataRoute = require(__dirname + '/routes/route-handler');

http.createServer(dataRoute.route()).listen(3000, () => {
  console.log('The aliens are coming...');
});
