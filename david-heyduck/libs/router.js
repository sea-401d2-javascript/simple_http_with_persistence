'use strict';

//Creates empty GET/POST objects
//Each object will be populated with a key/value pair

var Router = function() {
  this.routes = {
    'GET': {},
    'POST': {}
  };
};

//feeds GET request into GET object
Router.prototype.get = function(route, cb) {
  this.routes['GET'][route] = cb;
};

//feeds POST request into POST object
Router.prototype.post = function(route, cb) {
  this.routes['POST'][route] = cb;
};

Router.prototype.route = function() {
  return function(req, res) {
    var routeFunction = this.routes[req.method][req.url];
    routeFunction(req, res);
  };
};

module.exports = Router;
