'use strict';
var http = require('http');
var fs = require('fs');
var Router = require('./router.js');
var ArticlesRouter = new Router();

ArticlesRouter.post('/articles', (req, res)=>{
  var count = 0;
  req.on('data', (data)=>{
    var stringData = JSON.parse(data);
    var buffy = JSON.stringify(stringData);
    var jsonString = buffy.toString();
    console.log('My precious1 :' + stringData);
    console.log('My precious2 :' + jsonString);
    fs.writeFile( __dirname + '/data/mynote' + count + '.json', jsonString , (err)=> {
      if(err) console.log('it\'s not writing... : ' + err);
      count += 1;
    });
  });
  res.end();
});

http.createServer(ArticlesRouter.route()).listen(3000, () => {
  console.log('Port 3000 is listening..');
});
