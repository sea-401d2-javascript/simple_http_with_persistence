'use strict';

var http = require('http');
var fs = require('fs');
var Router = require('./router.js');
var venuesRouter = new Router();
var fileNum = 0;


venuesRouter.post('/venues/',(req, res) => {
  console.log('/venues server was hit');
  req.on('data',(data) => {
    fileNum += 1;
    fs.writeFile(__dirname + '/data/venue_' + fileNum + '.json', data, (err) => {
      console.log('data: ' + data);
      if (err) throw err;
    });
  });
  res.end();
});

venuesRouter.get('/venues/', (req, res) => {
  console.log('venue request received');
  req.on('data', (data) => {
    var vData = fs.readFile(__dirname + '/data/*.json', data, (err) => {
      console.log('data: ' + data);
      if (err) throw err;
      res.write(vData);
    });
  });
  res.end();
});

venuesRouter.get('/venues/:id', (req, res) => {
  console.log('venue id request received');
  res.end();
});



http.createServer(venuesRouter.route()).listen(3000);
console.log('server 3000 is listening');
