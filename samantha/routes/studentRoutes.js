'use strict';

var Router = require(__dirname + '/../lib/router')
var http = require('http');
var studentRouter = new Router();

studentRouter.get('/students', (req, res) => {
  console.log('/students route was hit')
  res.end();
})
