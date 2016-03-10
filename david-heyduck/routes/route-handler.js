'use strict';

var Router = require(__dirname + '/../libs/router');
var fs = require('fs');
var dataRoute = new Router();
var fileSeq = 0;

//Shows what has been posted and saved
dataRoute.get('/alien', function(req, res) {
  console.log('/alien route hit');
  res.write('They\'re here.');
  fs.readdir(__dirname + '/../data/', (error, files) => {
    res.write(files.toString());
    res.end();
  });
});

dataRoute.post('/alien', function(req, res) {
  req.on('data', function(data) {
    fileSeq += 1;
    fs.writeFile(__dirname + '/../data/alien-contact-' + fileSeq + '.json', data, (error) => {
      res.writeHead(200, {'content-type': 'text/html'});
      res.end();
    });
  });
});

module.exports = dataRoute;
