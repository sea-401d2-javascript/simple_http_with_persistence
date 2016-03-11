'use strict';

const http = require('http');
const fs = require('fs');
var counter = 0;

http.createServer((req, res) => {

  if(req.url === '/messages' && req.method === 'GET') {
    res.writeHead(200, {'content-type': 'text/html'});
    fs.readdir('data', (err, files) => {
      res.write('You have ' + files.length + ' new Messages\n');
      if(err) throw err;
      files.forEach( (file) => {
        fs.readFile('data/' + file, 'utf8', (err, data) => {
          if(err) throw err;
          res.write(JSON.parse(data).message + '\n');
          counter++;
          if(counter == files.length){
            res.end();
          }
        }); // end readFile
      });// end forEach
    });// end readdir
  }// end GET

  if(req.url === '/messages' && req.method === 'POST') {
    req.on('data', (data) => {
      fs.readdir('data', (err, files) => {
        if(err) throw err;
        var num = files.length;
        fs.writeFile('data/message' + num + '.json', data, (err) => {
          if(err) throw err;
          res.writeHead(200, {'content-type': 'text/html'});
          res.write('File message'+num+'.json was saved!');
          return res.end();
        });// end writeFile
      });// end on readdir
    });// end on data
  }// end POST

}).listen(3000, () => {
  console.log('Server running on port 3000');
});
