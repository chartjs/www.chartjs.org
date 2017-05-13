var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babel = require('babelify');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var less = require('gulp-less');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var nunjucks = require('gulp-nunjucks');
var rename = require('gulp-rename');

gulp.task('build-js', function() {
	return browserify({entries: './src/index.js', debug: gutil.env.debug})
		.transform(babel, {presets: ["es2015"]})
		.bundle()
		.pipe(source('build.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('www'));

});
gulp.task('watch-js', ['build-js'], function(){
	return gulp.watch(
		'./src/*.js',
		['build-js']
	);
});

gulp.task('server', ['site'], function(){
	connect.server({
		root: 'www',
		port: 8080
	});
});

gulp.task('less', function () {
	return gulp.src('./src/styles.less')
	.pipe(plumber({
		errorHandler: function(err){
			gutil.log(gutil.colors.red(err));
			this.emit('end');
		}
	}))
	.pipe(less())
	.pipe(autoprefixer({
		browsers: ["last 2 version"],
		cascade: false
	}))
	.pipe(gulp.dest('./www'));
});

gulp.task('watch-less', ['less'], function(){
	return gulp.watch(
		'./src/*.less',
		['less']
	);
});

gulp.task('watch-templates', ['template'], function(){
	return gulp.watch(
		'./src/**/*.html',
		['template']
	);
});

gulp.task('move-favicon', function(){
	return gulp.src('./src/favicon.ico')
		.pipe(gulp.dest('./www'));
});

gulp.task('move-img', function(){
	return gulp.src('./src/img/*')
		.pipe(gulp.dest('./www/img'));
});

gulp.task('template', ['docs-template', 'samples-template', 'home-template']);

gulp.task('docs-template', function(cb){
	return gulp.src('./src/templates/docs.html')
		.pipe(nunjucks.compile())
		.pipe(rename({basename: 'index'}))
		.pipe(gulp.dest('./www/docs'));
});

gulp.task('samples-template', function(cb){
	return gulp.src('./src/templates/samples.html')
		.pipe(nunjucks.compile())
		.pipe(rename({basename: 'index'}))
		.pipe(gulp.dest('./www/samples'));
});

gulp.task('home-template', function(){
	return gulp.src('./src/templates/homepage.html')
		.pipe(nunjucks.compile())
		.pipe(rename({basename: 'index'}))
		.pipe(gulp.dest('./www'));
});


gulp.task('site', ['template', 'less', 'move-favicon', 'build-js', 'move-img']);

gulp.task('default', ['server', 'watch-js', 'watch-less', 'watch-templates']);
