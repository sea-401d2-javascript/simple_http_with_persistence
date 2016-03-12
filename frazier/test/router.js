'use strict';
// var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
var Router = require(__dirname + '/../lib/router.js');

describe('router.js', () => {
  var notesRouter = new Router();
  it ('should allow you to add GET routes to the router', () => {
    var getCallback = function(){
      return true;
    };
    notesRouter.addGETRoute('/notes', getCallback);
    expect(notesRouter.routes.GET['/notes']).to.eql(getCallback);
  });
  it ('should allow you to add POST routes to the router', () => {
    var postCallback = function(){
      return false;
    };
    notesRouter.addPOSTRoute('/notes', postCallback);
    expect(notesRouter.routes.POST['/notes']).to.eql(postCallback);
  });
  it ('should should return the correct value when you use the router', () => {
    expect(notesRouter.routes.GET['/notes']()).to.equal(true);
    expect(notesRouter.routes.POST['/notes']()).to.equal(false);
  });  
});
