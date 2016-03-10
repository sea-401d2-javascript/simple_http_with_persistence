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
    var newFilename = __dirname + '/../data/' + padId + 'series.json';
    fs.writeFile(newFilename, data.toString(), () => {
      console.log(newFilename + ' finished writing');
    });
    nextId++;
  });
  res.end();
});


seriesRouter.get('/series/', (req, res) => {
  console.log('/series GET hit');
  var item = '';
  console.log();
  fs.readdir('../data', (err, files) => {
    if(err) {
      console.log(err);
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('This is some text.\n');
      for(var ctr = 0; ctr < files.length; ctr++) {
        res.write(files[ctr] + '\n');
      }
      // files.forEach( (cur) => {
      //   item = fs.readFile('../data/' + cur, (err, data) => {
      //     if(err) {
      //       console.log(err);
      //     } else {
      //       console.log(data.toString());
      //       res.write(data.toString());
      //     }
      //   });
      // });
      res.end();
    }
  });
  debugger;
  console.log(req.url);
});

http.createServer(seriesRouter.route()).listen(3000, () => {
  console.log('server up on 3000');
});
