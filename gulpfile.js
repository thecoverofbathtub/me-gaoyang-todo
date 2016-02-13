'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const gutil = require('gulp-util');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const babelify = require('babelify');
const del = require('del');
const source = require('vinyl-source-stream');

const paths = {
    buildDir: './build',
    cssSubDir: '/assets/styles',
    bundleJs: 'bundle.js'
};

const config = {
    browserSync: {
        files: [paths.buildDir + '/**/*'],
        notify: false,
        open: false,
        port: 3000,
        server: {
            baseDir: paths.buildDir
        }
    },
    clean: [paths.buildDir]
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
		.pipe(source(paths.bundleJs))
		.pipe(gulp.dest(paths.buildDir));
}

function buildSass() {
    gulp.src('./src/styles/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.buildDir + paths.cssSubDir))
}

function deploy() {
    gulp.src('./src/index.html')
		.pipe(gulp.dest(paths.buildDir));
}

function serve() {
    browserSync.init(config.browserSync);
}

gulp.task('clean', () => {
    clean();
});

gulp.task('build', ['clean'], () => {
    compile();
    buildSass();
    deploy();
})

gulp.task('default', ['clean', 'build'], () => {
    serve();
    gutil.log('Start serving on localhost:3000', 'Really it did', gutil.colors.magenta('123'));
})

// TODO: gulp watch