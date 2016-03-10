'use strict';
var Router = module.exports = function (){
  this.routes = {};
  this.routes.GET = {};
  this.routes.POST = {};
};

Router.prototype.addGETRoute = function(route, callback){
  this.routes['GET'][route] = callback;
};

Router.prototype.addPOSTRoute = function(route, callback){
  this.routes['POST'][route] = callback;
};

Router.prototype.routeRequest = function(){
  return function(request, response){
    var routeFunction = this.routes[request.method][request.url];
    return routeFunction(request, response);
  };
  
};
