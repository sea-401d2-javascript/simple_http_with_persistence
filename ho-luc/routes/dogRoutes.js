'use strict'

var Router = require(__dirname + '/../lib/router.js');
var dogs = new Router();
var fs = require('fs');

dogs.get('/dogs', (req, res) => {
  console.log('/get was hit');

  fs.readFile(__dirname + '/../data/shitsu.js', (err, data) => {
    if (err){throw err}
    res.write(JSON.parse(data));
  })
  res.end();
})

dogs.post('/dogs', (req, res) => {
  console.log('/post was hit');
  res.writeHead(200, {'content-type': 'application/json'});
  req.on('data', (data) => {
    var newDog = JSON.parse(data);
    console.log(newDog.name);

    fs.writeFile(__dirname + '/../data/' + newDog.name + '.js', 'hello ' + newDog.name + ' would you like a bone?', (err) => {
      if (err) {throw err}
    });
    res.end();
  })
})

module.exports = dogs;
