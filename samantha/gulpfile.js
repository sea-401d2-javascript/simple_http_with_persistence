'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

var paths = ['*.js', 'test/*.js'];

gulp.task('tasks running', function(){
  console.log('gulp is running');
});

gulp.task('eslint', function(){
  return gulp.src(paths)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('mocha', function(){
  return gulp.src(paths)
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch', function(){
  gulp.watch(paths,['eslint']);
});

gulp.task('default',['tasks running', 'mocha', 'watch']);
