// 'use strict';
//
// var http = require('http');
// var fs = require('fs');
// var moment = require('moment');
//
// http.createServer((req, res) => {
//   if(req.method === 'POST' && req.url === '/venues/') {
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     req.on('data',(data)=> {
//       fs.writeFile(__dirname + '/data/' + moment() + '.json', data, (err) => {
//         if (err) throw err;
//         console.log('created new venue');
//         return res.end();
//       });
//     });
//   }
//   if(req.method === 'GET' && req.url === '/venues/:id/') {
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     req.on('data',(data) => {
//       fs.writeFile(__dirname + '/data/' + moment() + '.json', data,(err) => {
//         if(err) throw err;
//         console.log('saved id');
//         return res.end();
//       });
//     });
//   }
//   if(req.method === 'GET' && req.url === '/venues/') {
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     req.on('data', (data) => {
//       console.log('data' + data);
//       fs.writeFile(__dirname + '/data/' + moment() + '.json', data, (err) => {
//         if(err) throw err;
//         console.log('saved venue');
//         return res.end();
//       });
//     });
//   }
//
//   if(req.url === '/') {
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     var rr = fs.createReadStream(__dirname + '/router/*.js');
//     return rr.pipe(res);
//   }
//   res.writeHead(404, {'Content-Type': 'application/json'});
//   res.write('404 Not Found');
//   res.end();
//
// }).listen(3000), () => {
//   console.log('server is up on 3000');
// };
