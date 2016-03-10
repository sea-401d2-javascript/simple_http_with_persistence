'use strict';

var http = require('http');
var Router = require(__dirname + '/../router/router');

var productsRouter = new Router();

productsRouter.get('/products', (req, res) => {
  console.log('/products route hit with GET request');
  res.end();
}

productsRouter.post('/products', (req, res) => {
  console.log('/products route hit with POST request');
  res.end();
})

productsRouter.get('/products/:id', (req, res) => {
  console.log();
})
