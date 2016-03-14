'use strict';
var http = require('http');
var Router = require('../lib/router');
var fs = require('fs');
var studentsRouter = new Router();

studentsRouter.get('/users', (req, res) => {
  console.log('/users route hit with GET request');
  fs.readdir(__dirname + '/../data/', (err, files) => {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write(JSON.stringify(files.slice(1)));
    res.end();
  });
});


studentsRouter.post('/users', (req, res) => {
  console.log('/users route hit with POST request');

  var jsonObject = '';
  req.on('data', (data) => {
    jsonObject += data;
  });

  return req.on('end', () => {
    logger(jsonObject, res);
  });
});

function logger(jsonObject, res) {
  fs.readdir(__dirname + '/../data/', (err, files) => {
    let counter = files.length;
    let dir = __dirname + '/../data/';
    let newFile = 'userFile-' + counter + '.json';
    fs.writeFileSync(dir + newFile, jsonObject, 'utf-8');

    res.writeHead(200, {'content-type': 'text/plain'});
    res.write(newFile);
    return res.end();

  });
}

http.createServer(studentsRouter.route()).listen(3000);
