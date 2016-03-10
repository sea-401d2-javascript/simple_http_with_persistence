'use strict';

var Router = require(__dirname + '/../libs/router.js');
var fs = require('fs');
var aliens = new Router();
var fileSeq = 0;

var d = new Date();
d = d.toTimeString();

//Shows what has been posted and saved
aliens.get('/data', function(req, res) {
  console.log('/alien route hit');
  fs.readdir(__dirname + '/../data/', (error, files) => {
    res.writeHead(200, {'content-type': 'text/html'})
    res.write(files.toString());
    res.end();
  });
});

aliens.post('/data', function(req, res) {
  req.on('data', (data) => {
    fileSeq += 1;
    fs.writeFile(__dirname + '/../data/alien-contact-'+ fileSeq + '-' + d + '.json', data, (error) => {
      console.log('alien contact made.');
      res.writeHead(200, {'content-type': 'text/html'});
      res.write(data.toString());
      res.end();
    });
  });
});

module.exports = aliens;
