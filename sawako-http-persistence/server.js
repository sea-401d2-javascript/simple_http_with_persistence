'use strict';
var http = require('http');
var fs = require('fs');
var Router = require('./router.js');
var ArticlesRouter = new Router();
var count = 0;
// var filesArray;

ArticlesRouter.get('/mynotes', (req, res) => {
  fs.readdir( __dirname + '/data',(err, files) => {
    var filesArray = files;
    console.log('My files are here : ' + files);
    res.writeHead(200, {'content-type': 'text/html'});
    res.write(filesArray.toString());
    res.write('anything anything');
    res.end();
  });
});

ArticlesRouter.post('/mynotes', (req, res)=>{
  req.on('data', (data)=>{
    var stringData = JSON.parse(data);
    var buffy = JSON.stringify(stringData);
    var jsonString = buffy.toString();
    // console.log('My precious2 :' + jsonString);

    fs.writeFile( __dirname + '/data/mynote' + count + '.json', jsonString , (err)=> {
      if(err) console.log('it\'s not writing... : ' + err);
      res.writeHead(200, {'content-type': 'text/html'});
      count += 1;
      res.end();
    });
  });
});

http.createServer(ArticlesRouter.route()).listen(3000, () => {
  console.log('Port 3000 is listening..');
});
