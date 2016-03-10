'use strict';
var http = require('http');
var logger = require('../lib/logger');
var Router = require('../lib/router');
var studentsRouter = new Router();

studentsRouter.get('/users', (req, res) => {
  console.log('/users route hit with GET request');
  res.writeHead(200, {'content-type': 'text/plain'});
  res.write('hello users');
  res.end();
});


studentsRouter.post('/users', (req, res) => {
  console.log('/users route hit with POST request');

  var jsonObject = '';
  req.on('data', (data) => {
    jsonObject += data;
  });

  return req.on('end', () => {
    logger(jsonObject);
    jsonObject = JSON.parse(jsonObject);
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write(JSON.stringify('hello ' + jsonObject.name));
    return res.end();
  });
});


http.createServer(studentsRouter.route()).listen(3000);
