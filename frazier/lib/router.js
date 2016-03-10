'use strict';
var url = require('url');

var Router = module.exports = exports = function (){
  this.routes = {};
  this.routes.GET = {};
  this.routes.POST = {};
  this.fileNumber = 1;
};

Router.formatUrlForRouter = (request, response) => {
  var parsedUrl = url.parse(request.url);
  // console.log('parsedUrl is');
  // console.dir(parsedUrl);
  if(parsedUrl.pathname.indexOf('/notes/') !== -1){
    if (typeof(Number(parsedUrl.pathname.slice(6))) === 'number'){
      request.url = '/notes/:number';
    } else {
      response.writeHead(404, {'content-type': 'application/json'});
      response.end('404 Not found');
    }
  }
  return parsedUrl;
};

Router.prototype.addGETRoute = function(route, callback){
  this.routes['GET'][route] = callback;
};

Router.prototype.addPOSTRoute = function(route, callback){
  this.routes['POST'][route] = callback;
};

Router.prototype.routeRequests = function(){
  return (request, response) => {
    var parsedUrl = Router.formatUrlForRouter(request, response);
    console.log('request.url is');
    console.log(request.url);
    var routeFunction = this.routes[request.method][request.url];
    console.log('routeFunction is');
    console.log(routeFunction);
    if (routeFunction instanceof Function){
      routeFunction(request, response, parsedUrl);
    } else {
      response.writeHead(404, {'content-type': 'text/plain'});
      response.end('404 Not found');
    }
  };
};
