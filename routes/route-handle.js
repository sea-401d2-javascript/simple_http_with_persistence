'use strict';

var http = require('http');
var fs = require('fs');
var Router = require(__dirname + '/../router/router');
var fileCounter = 0;
var productsRouter = new Router();

productsRouter.get('/products', (req, res) => {
  console.log('/products route hit with GET request. By the way, there have been ' + fileCounter + ' data files posted so far.');
  var allFiles = [];
    fs.readdir(__dirname + '/../data', function(err,files) {
      console.log(files, 'in readdir');
      files.forEach(function(file, i){
        fs.readFile(__dirname + '/../data/' + file, (err, data) => {
          if (i === files.length - 1) {
            res.write(data);
            res.end();
          } else {
            res.write(data);
            // res.end();
          }
        });
      });
    });
  //   console.log(allFiles);
  //   allFiles.forEach((file) => {
  //     res.write(file);
  //     console.log(file);
  //   })
  // res.end();
});

productsRouter.post('/products', (req, res) => {
  req.on('data', (data) => {
    console.log('/products route hit with POST request');
    fileCounter += 1;
    console.log(fileCounter + 'files sent');
    fs.writeFile(__dirname + '/../data/json-received' + fileCounter + '.json', data, (error) => {
      console.log('data was written and' + data);
    } )
  })
  res.end();
})

productsRouter.get('/products/:id', (req, res) => {
  console.log('products route hit with specific id. By the way, there have been ' + fileCounter + ' data files posted so far.');
})

http.createServer(productsRouter.route()).listen(3000)
