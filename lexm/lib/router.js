'use strict';

var Router = module.exports = function() {
  this.routes = {
    'GET': {},
    'POST': {},
    'PUT': {},
    'DELETE': {}
  }
}

Router.prototype.get = function(route, cb) {
  this.routes['GET'][route] = cb
}

Router.prototype.post = function(route, cb) {
  this.routes['POST'][route] = cb
}
