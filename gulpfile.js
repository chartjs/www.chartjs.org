'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babel = require('babelify');
var uglify = require('gulp-uglify-es').default;
var connect = require('gulp-connect');
var less = require('gulp-less');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var nunjucks = require('gulp-nunjucks');
var rename = require('gulp-rename');
var merge = require('merge-stream');

gulp.task('build-js', function() {
  return browserify({entries: './src/index.js', debug: gutil.env.debug})
    .transform(babel, {presets: ['@babel/preset-env']})
    .bundle()
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./www'));
});

gulp.task('watch-js', gulp.series('build-js', function() {
  return gulp.watch(
    './src/*.js',
    ['build-js']
  );
}));

gulp.task('less', function() {
  return gulp.src('./src/styles.less')
    .pipe(plumber({
      errorHandler: function(err) {
        gutil.log(gutil.colors.red(err));
        this.emit('end');
      }
    }))
    .pipe(less())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest('./www'));
});

gulp.task('watch-less', gulp.series('less', function() {
  return gulp.watch(
    './src/*.less',
    ['less']
  );
}));

gulp.task('copy-assets', function() {
  return merge(
    gulp.src('_config.yml').pipe(gulp.dest('./www')),
    gulp.src('./src/favicon.ico').pipe(gulp.dest('./www')),
    gulp.src('./src/img/*').pipe(gulp.dest('./www/img')),
    gulp.src('./media/*').pipe(gulp.dest('./www/media'))
  );
});

gulp.task('docs-template', function() {
  return gulp.src('./src/templates/docs.html')
    .pipe(nunjucks.compile())
    .pipe(rename({basename: 'index'}))
    .pipe(gulp.dest('./www/docs'));
});

gulp.task('samples-template', function() {
  return gulp.src('./src/templates/samples.html')
    .pipe(nunjucks.compile())
    .pipe(rename({basename: 'index'}))
    .pipe(gulp.dest('./www/samples'));
});

gulp.task('home-template', function() {
  return gulp.src('./src/templates/homepage.html')
    .pipe(nunjucks.compile())
    .pipe(rename({basename: 'index'}))
    .pipe(gulp.dest('./www'));
});

gulp.task('template', gulp.series('docs-template', 'samples-template', 'home-template'));

gulp.task('watch-templates', gulp.series('template', function() {
  return gulp.watch(
    './src/**/*.html',
    ['template']
  );
}));

gulp.task('site', gulp.series('template', 'less', 'build-js', 'copy-assets'));

gulp.task('server', gulp.series('site', function() {
  connect.server({
    root: 'www',
    port: 8080
  });
}));

gulp.task('default', gulp.series('server', 'watch-js', 'watch-less', 'watch-templates'));
