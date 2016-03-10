'use strict';

var http = require('http');
var Router = require(__dirname + '/../lib/router.js');
var productsRouter = new Router();
var fs = require('fs');
var uuid = require('uuid');
var dataDirectory = __dirname + '/../data/';
var createUniqueFileName = require(__dirname + '/../lib/createUniqueFileName.js');

productsRouter.get('/products', (req, res) => {
  console.log('GET /products route hit');
  fs.readdir(dataDirectory, (err, files) => {
    if (err) console.error(err);
    files.forEach((file) => {
      fs.readFile(dataDirectory + file, function(err, data) {
        if (err) console.error(err);
        console.log(data.toString());
      });
    });
  });
  res.end();
});

productsRouter.post('/products', (req, res) => {
  var value;
  fs.mkdir(dataDirectory, (err) => {
  });

  console.log('POST /products route hit');
  req.on('data', function(data) {

    value = JSON.parse(data);
    fs.writeFile(__dirname + '/../data/' + createUniqueFileName(), JSON.stringify(value), (err) => {
      if (err) throw err;
    });
  });
  res.write('bye\n');
  res.end();
});

http.createServer(productsRouter.route()).listen(3000);