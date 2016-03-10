'use strict';

var http = require('http');
var fs = require('fs');
var Router = require(__dirname + '/../router/router');
var fileCounter = 0;
var productsRouter = new Router();

productsRouter.get('/products', (req, res) => {
  console.log('/products route hit with GET request');
  res.end();
}

productsRouter.post('/products', (req, res) => {
  req.on('data', (data) => {
    console.log('/products route hit with POST request');
    fileCounter += 1;
    fs.writeFile('../data/json-received' + fileCounter, )
  })
  res.end();
})

productsRouter.get('/products/:id', (req, res) => {
  console.log('products route hit with specific id');
})
