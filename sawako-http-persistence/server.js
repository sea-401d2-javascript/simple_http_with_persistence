'use strict';
var http = require('http');
var Router = require('./router.js');
// var fs = require('fs');

var ArticleRouter = new Router();

ArticleRouter.get('/article', (req, res) => {
  console.log('Here are : ' + req + ' and ' + res);
  res.end;
});

http.createServer(ArticleRouter.route()).listen(3000, ()=> {
  console.log('Port 3000 is listening..');
});
