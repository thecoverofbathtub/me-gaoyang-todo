'use strict'

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

function compile() {

	var bundler = browserify('./src/main.js', {
    	entries: './src/main.js',
		extensions: ['.jsx'],
    	paths: ['/usr/local/lib/node_modules', './node_modules', './src'],
		debug: true
	}).transform(babelify.configure({
		presets: ['react', 'es2015', 'stage-2']
    }));

	return bundler.bundle()
		.on('error', function(err) {
			console.error(err);
			bundler.emit('end');
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./build'));
}

gulp.task('default', () => { return compile() });
