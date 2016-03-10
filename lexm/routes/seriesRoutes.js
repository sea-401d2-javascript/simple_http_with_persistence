'use strict';

var fs = require('fs');
var http = require('http');
var Router = require('../lib/router');
var seriesRouter = new Router();
var nextId = 1;


seriesRouter.post('/series/', (req, res) => {
  console.log('/series POST hit');
  req.on('data', (data) => {
    var padId = ('000000'+ nextId).substr(-6, 6);
    console.log(padId);
    nextId++;
    fs.writeFile(__dirname + '/../data/' + padId + 'series.json', data.toString());
    console.log(__dirname + '/../data/' + padId + 'series.json');
  });
  res.end();
});


seriesRouter.get('/series/', (req, res) => {
  console.log('/series GET hit');
  debugger;
  console.log(req.url);
  res.end();
});

http.createServer(seriesRouter.route()).listen(3000, () => {
  console.log('server up on 3000');
});
