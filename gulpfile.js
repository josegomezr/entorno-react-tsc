'use strict';

var gulp        = require('gulp'),
    typescript  = require('typescript'),
    ts          = require('gulp-typescript'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    del         = require('del')
    ;

var project = ts.createProject('tsconfig.json', {typescript: typescript});

gulp.task('typescript', function () {
  var result = gulp.src('src/**/*{ts,tsx}')
    .pipe(ts(project));
  return result.js.pipe(gulp.dest('.tmp'));
});

gulp.task('bundle', ['typescript'], function (done) {
  var b = browserify('.tmp/bootstrap.js');
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('compilar', ['bundle'], function (done) {
  del(['.tmp'], done.bind(this));
});