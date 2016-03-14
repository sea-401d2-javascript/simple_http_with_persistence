'use strict';


var gulp = require('gulp');
var lint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var chaiHttp = require('gulp-chai-http');

var paths = ['test/*.js', 'server.js'];

gulp.task('lint', function() {
  return gulp.src(paths)
    .pipe(lint())
    .pipe(lint.format());
});


gulp.task('mocha', function(){
  return gulp.src(paths)
    .pipe(mocha({}));

});

gulp.task('default', ['gulp','lint', 'mocha', 'chaiHttp']);
