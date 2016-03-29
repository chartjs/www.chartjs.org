var gulp = require('gulp');
var fs = require('fs');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var connect = require('gulp-connect');
var less = require('gulp-less');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var marked = require('marked');
var foreach = require('gulp-foreach');
var nunjucks = require('gulp-nunjucks');
var rename = require('gulp-rename');

function compile(watch) {
	var bundler = watchify(browserify('./src/index.js', { debug: true }).transform(babel, {presets: ["es2015"]}));

	function rebundle() {
		bundler.bundle()
			.on('error', function(err) { console.error(err); this.emit('end'); })
			.pipe(source('build.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./www'));
	}

	if (watch) {
		bundler.on('update', function() {
			gutil.log(gutil.colors.green('-> Bundling...'));
			rebundle();
		});
	}

	rebundle();
}

gulp.task('build', function() { return compile(); });
gulp.task('watch-js', function(){ return compile(true); });

gulp.task('server', function(){
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

gulp.task('watch-less', function(){
	return gulp.watch(
		'./src/styles.less',
		['less']
	);
});

gulp.task('watch-templates', function(){
	return gulp.watch(
		'./src/**/*.html',
		['template']
	);
});

gulp.task('move-docs', function(){
	return gulp.src('./node_modules/chart.js/docs/*.md')
		.pipe(gulp.dest('./docs'));
});

gulp.task('template', ['docs-template', 'home-template']);

gulp.task('docs-template', ['move-docs'], function(cb){
	var docs = {};

	var openLinksInNewTab = function(href, title, text){
		return '<a href="' + href + '" target="_blank">' + text + '</a>';
	}

	return gulp.src('./docs/*.md')
		.pipe(foreach(function(stream, file){
			// TODO - parse yml front matter for anchor yaml
			var anchor = file.relative.replace('.md', '');

			var renderer = new marked.Renderer();

			var documentationBlock = {};

			documentationBlock.title = file.relative;
			documentationBlock.links = [];

			renderer.heading = function(text, level){

				var html = '<h' + level;

				// For h3s and above - we'll assign an anchor link for this.
				if (level <= 3){
					var escaped = text.toLowerCase().replace(/[^\w]+/g, '-');

					var link = anchor + '-' + escaped;

					documentationBlock.links.push(link);

					html += ' id="' + link +'"';
				}

				html += '>' + text + '</h'+ level + '>';

				return html;
			};

			renderer.link = openLinksInNewTab;

			documentationBlock.text = marked(
				file.contents.toString('utf8'),
				{
					renderer: renderer
				}
			);

			docs[file.relative] = documentationBlock;

			return stream;
		}))
		.on('end', function(){
			gulp.src('./src/templates/docs.html')
				.pipe(nunjucks.compile({
					doc: docs
				}, { autoescape: false }))
				.pipe(rename({basename: 'index'}))
				.pipe(gulp.dest('./www/docs'));
		});

});

gulp.task('home-template', function(){
	return gulp.src('./src/templates/homepage.html')
		.pipe(nunjucks.compile())
		.pipe(rename({basename: 'index'}))
		.pipe(gulp.dest('./www'));
});


gulp.task('default', ['server', 'watch-js', 'watch-less', 'watch-templates']);

