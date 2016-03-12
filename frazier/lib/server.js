'use strict';
var http = require('http');
var fs = require('fs');
var Router = require(__dirname + '/router.js');

var notesRouter = new Router();

notesRouter.addGETRoute('/notes', (request, response) => {
  fs.readdir(__dirname + '/notes', (error, files) => {
    if (error || files.length === 0){
      console.log(error);
      response.writeHead(404, {'content-type': 'text/plain'});
      return response.end('404 Not found');  
    } 
    // console.log('files is');
    // console.log(files);
    
    files.forEach((file) => {
      var fileContents = fs.readFileSync(__dirname + '/notes/' + file, 'utf8');
      // console.log('fileContents is');
      // console.log(fileContents);
      response.write(fileContents);
    });
    response.end();
    
    // files.forEach((file, fileNumber) => {
    //   fs.readFile(__dirname + '/notes/' + file, 'utf8', (error, data) => {
    //     if (error){
    //       console.log('server error occured');
    //       console.log(error);
    //       response.writeHead(500, {'content-type': 'application/json'});
    //     } 
    //     response.write(data, () => {
    //       if (fileNumber === files.length - 1){
    //         response.end();
    //       }
    //     });
    //   });
    // });
  });
});

notesRouter.addGETRoute('/notes/:number', (request, response, parsedUrl) => {
  var fileNumber = parsedUrl.pathname.match(/\/notes\/(\d+)/)[1];
  fs.readFile(__dirname + '/notes/' + fileNumber + '.json', 'utf8', (error, data) => {
    if (error){
      response.writeHead(404, {'content-type': 'text/plain'});
      return response.end('404 Not found');
    } 
    response.writeHead(200, {'content-type': 'application/json'});
    return response.end(data); 
  });
});

notesRouter.addPOSTRoute('/notes', (request, response) => {
  request.on('data', (data) => {
    fs.writeFile(__dirname + '/notes/' + notesRouter.fileNumber + '.json', data, (error) => {
      notesRouter.fileNumber++;
      if (error) {
        console.log(error);
        response.writeHead(500, {'content-type': 'text/plain'});
        return response.end('500 Internal server error');
      } 
      response.writeHead(200, {'content-type': 'text/plain'});
      return response.end();
    });
  });
});

// console.log('notesRouter is');
// console.dir(notesRouter);
// function thisRoutes(){
//   console.log('this.routes:');
//   console.dir(this.routes);
// }
// thisRoutes.call(notesRouter);
http.createServer(notesRouter.routeRequests()).listen(3000);
