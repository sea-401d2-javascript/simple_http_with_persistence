'use strict';

var fs = require('fs');
var http = require('http');


var server = module.exports = http.createServer((req, res) => {

  if(req.method === 'GET' && req.url === '/') {
    fs.readdir('./output', (err, files) => {
      console.log(files);
      if (err) throw err;
      res.writeHead('200', {'Content-Type' : 'text/plain'})
      res.write(files.toString());
      return res.end();
    });// fs
    return
  };// if

  if(req.method === 'POST' && req.url === '/') {
    var time = new Date();
    var now = time.getTime()
    var writeStream = fs.createWriteStream('./output/' + now +'.json');
    req.pipe(writeStream);
    res.write('File ' + now +'.json created!');
    res.end();
    return
  };// if
})// exports

server.listen(3000, () => {
  console.log('server up on 3000');
});