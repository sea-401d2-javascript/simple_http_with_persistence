'use strict';

var Router = module.exports = function() {
  this.routes = {
    'GET': {},
    'POST': {},
    'PUT': {},
    'DELETE': {}
  };
};

Router.prototype.post = function(route, cb) {
  this.routes['POST'][route] = cb;
};
