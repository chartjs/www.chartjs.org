var gulp = require('gulp');
var fs = require('fs');
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
var marked = require('marked');
var foreach = require('gulp-foreach');
var nunjucks = require('gulp-nunjucks');
var rename = require('gulp-rename');
var fm = require('front-matter');
var s3 = require('gulp-s3');
var gzip = require('gulp-gzip');

var aws = require('./aws.json');


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

gulp.task('move-docs', function(){
	return gulp.src('./node_modules/chart.js/docs/*.md')
		.pipe(gulp.dest('./docs'));
});

gulp.task('move-favicon', function(){
	return gulp.src('./src/favicon.ico')
		.pipe(gulp.dest('./www'));
});

gulp.task('move-img', function(){
	return gulp.src('./src/img/*')
		.pipe(gulp.dest('./www/img'));
});

gulp.task('template', ['docs-template', 'home-template']);

gulp.task('docs-template', ['move-docs'], function(cb){
	var docs = {};

	var openLinksInNewTab = function(href, title, text){
		var html = '<a href="' + href + '"';
		// If we're not using an internal anchor link, open in a new tab
		if (href.substring(0,1) !== '#'){
			html += ' target="_blank"';
		}
		return  html += '>' + text + '</a>';
	}

	return gulp.src('./docs/*.md')
		.pipe(foreach(function(stream, file){
			var contents = file.contents.toString('utf8');

			var parsed = fm(contents);

			var renderer = new marked.Renderer();

			var anchor = parsed.attributes.anchor;

			var documentationBlock = {};

			documentationBlock.links = [];
			documentationBlock.anchor = anchor;
			documentationBlock.title = parsed.attributes.title;

			var tableSuper = renderer.table;

			renderer.table = function(){
				return '<div class="table-wrapper">' + tableSuper.apply(renderer, arguments) + '</div>';
			}


			renderer.heading = function(text, level){

				var html = '<h' + level;

				// For h3s and above - we'll assign an anchor link for this.
				if (level <= 3){
					var escaped = text.toLowerCase().replace(/[^\w]+/g, '-');

					var link = anchor + '-' + escaped;

					documentationBlock.links.push({
						anchor: link,
						text: text
					});

					html += ' id="' + link +'"';

					text = '<a class="fragment-link" href="#' + link + '">' + text + '</a>';
				}


				html += '>' + text + '</h'+ level + '>';

				return html;
			};

			renderer.link = openLinksInNewTab;

			documentationBlock.text = marked(
				parsed.body,
				{
					renderer: renderer,
					highlight: function (code, language) {
						var highlight = require('highlight.js');
						if (language === 'javascript' || language === 'html'){
							return highlight.highlight(language, code).value;
						}
						else {
							return code;
						}
					}
				}
			);

			docs[anchor] = documentationBlock;

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


gulp.task('site', ['template', 'less', 'move-favicon', 'build-js', 'move-img']);

gulp.task('default', ['server', 'watch-js', 'watch-less', 'watch-templates']);


gulp.task('deploy', ['site'], function(){
	gulp.src('./www/**/*')
		.pipe(gzip())
		.pipe(
			s3(aws, {
				gzippedOnly: true
			})
		);
});
