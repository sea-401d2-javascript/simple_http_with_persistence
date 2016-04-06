'use strict';

var Router = require(__dirname + '/../router/router.js');
var fs = require('fs');
var inventory = new Router();
var fileCounter = 0;

inventory.get('/data', function(req, res){
    console.log('/inventory route has been hit');
    fs.readdir(__dirname + '/../data/', (error, files)=>{
      res.writeHead(200, {'content-type': 'text/html'})
      res.write(files.toString());
      res.end();
    });
});

inventory.get('/data/:id', function(req, res){
  res.end();
});

inventory.post('/data', function(req, res){
  req.on('data', (data)=>{
    fileCounter += 1;
    fs.writeFile(__dirname + '/../data/post-data' + fileCounter + '.json', data, (error)=>{
      console.log('Saving data');
      res.writeHead(200, {'content-type': 'text/html'});
      res.write(data.toString());
      res.end();
    });
  });
});

module.exports = inventory;
