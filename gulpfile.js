var path = require('path');
var gulp = require('gulp');
var browserify = require('browserify');
var less = require('gulp-less');
var forever = require('forever-monitor');
var source = require('vinyl-source-stream');
 
gulp.task('browserify', function() {
  return browserify('./public/scripts/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/dist/'));
});

gulp.task('less', function() {
  gulp.src('./public/styles/bundle.less')
    .pipe(less({ compress: true }))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('watch', function() {
  gulp.watch('./public/scripts/*.js', ['browserify']);
  gulp.watch('./public/styles/*.less', ['less']);
});

// gulp.task('forever', function () {
//   forever.stop('./app.js');
//   forever.start('./app.js');
// });

// gulp.task('server', function () {
//   gulp.watch('./**/**/**/*.js', 'forever')
// });

gulp.task('default', ['browserify', 'less', 'watch']);
