'use strict';

var http = require('http');
var fs = require('fs');
var Router = require('./router.js');
var Venues = new Router();
var fileNum = 0;

// Venues.route('/venues');

Venues.post('/venues',(req, res) => {
  console.log('/venues server was hit');
  fileNum += 1;
  req.on('data',(data) => {
    var stringData = data.toString();
    console.log('string data: ' + stringData);
    console.log('file number ' + fileNum + ' was written to file');
    fs.writeFile(__dirname + '/data/' + fileNum + '.json', stringData, (err) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        return res.end('404 Not Found');
      } else {
        console.log('data was written');
        res.writeHead(200, {'Content-Type': 'application/json'});
        return res.end(stringData);
      }
    });
  });
});
Venues.get('/venues', (req, res) => {
  console.log('venue request received at /venues');
  fs.readdir(__dirname + '/data', function (err, data){
    var stringData = data.toString();
    console.log('data' + stringData);
    if(err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end('404 Not Found');
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    console.log('got the /venues data');
    res.write(stringData);
    res.end();
  });
});

http.createServer(Venues.route()).listen(3000);
console.log('server 3000 is listening');
