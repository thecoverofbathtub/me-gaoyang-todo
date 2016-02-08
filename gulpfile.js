'use strict'

const gulp = require('gulp');
const del = require('del');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

const config = {
	targetDir: './build',
	target: 'bundle.js',
    clean: ['./build', './src/bundle.js']
};

function clean() {
	del(config.clean);
}

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
		.pipe(source(config.target))
		.pipe(gulp.dest(config.targetDir));
}

gulp.task('clean', () => { return clean(); });
gulp.task('default', () => { return compile(); });
