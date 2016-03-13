'use strict'

var Router = require(__dirname + '/../lib/router.js');
var dogs = new Router();
var fs = require('fs');
var isEmpty;

dogs.get('/dogs', (req, res) => {
  fs.readdir(__dirname + '/../data', (err, files) => {
    if (err) {throw err}
    isEmpty = files;
    //a check, to see if data directory is empty
    if(isEmpty == 0) {
      res.writeHead(404, {'content-type': 'text/html'})
      res.write('Error 404, no dogs files found.')
      res.end();
    }

    if(isEmpty !== 0 && isEmpty !== null) {
      res.writeHead(200, {'content-type': 'application/json'});
      isEmpty.forEach(function(data) {
        res.write(data + '; ');
      })
      res.end();
    }
  })
})

dogs.post('/dogs', (req, res) => {
  res.writeHead(200, {'content-type': 'application/json'});
  req.on('data', (data) => {
    var newDog = JSON.parse(data);
    fs.writeFile(__dirname + '/../data/' + newDog.name + '.json', JSON.stringify('hello ' + newDog.name + ', would you like a bone?'), (err) => {
      if (err) {throw err}
    });
    res.end();
  })
})

module.exports = dogs;
