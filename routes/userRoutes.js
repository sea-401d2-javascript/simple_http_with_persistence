'use strict';

var http = require('http');
var Router = require('../lib/router');
var studentsRouter = new Router();

studentsRouter.get('/users', (req, res) => {
  console.log('/users route hit');
  res.end();
});

http.createServer(studentsRouter.route()).listen(3000);
