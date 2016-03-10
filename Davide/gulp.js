'use strict';
var gulp = require('gulp');
var lint = require('gulp-eslint');

var paths = ['*.js', 'lib/greet.js', 'test/greet-test.js'];

gulp.task('lint', function(){
  return gulp.src(paths)
.pipe(lint())
    .pipe(lint.format()); //*prints things to the screen*//
});

gulp.task('default', ['lint']);
