'use strict';
var http = require('http');
var fs = require('fs');
var Router = require('./router.js');
var ArticlesRouter = new Router();

//**********************************************************
//counting how many files are in directory to start with
//so post function can use that number to create a new file.
//**********************************************************
var count = fs.readdirSync( __dirname + '/data').length;
console.log(count);


//get function
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

//post function
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

//creating http server
module.exports = http.createServer(ArticlesRouter.route()).listen(3000, () => {
  console.log('Port 3000 is listening..');
});
