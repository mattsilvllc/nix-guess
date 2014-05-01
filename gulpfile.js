var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var forever = require('forever-monitor');
var source = require('vinyl-source-stream');
 
gulp.task('scripts', function() {
  var files = [
    './public/scripts/vendors/jquery.min.js',
    './public/scripts/vendors/bootstrap.min.js',
    './public/scripts/vendors/responsive-nav.js',
    './public/scripts/vendors/toastr.min.js',
    './public/scripts/app.js'
  ];
  
  gulp.src(files)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./public/dist/'))
});

gulp.task('less', function() {
  gulp.src('./public/styles/bundle.less')
    .pipe(less({ compress: true, yuicompress: true, optimization: 2}))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('watch', function() {
  gulp.watch('./public/scripts/*.js', ['scripts']);
  gulp.watch('./public/styles/*.less', ['less']);
});

gulp.task('forever', function () {
  var child = new (forever.Monitor)('./app.js', {
    max: 3,
    silent: true,
    options: [],
    watch: true,
    watchDirectory: './'
  });

  child.start();
});

gulp.task('default', ['scripts', 'less', 'watch', 'forever']);
