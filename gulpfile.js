'use strict'

const gulp = require('gulp');
const gplugins = require('gulp-load-plugins')();
const gutil = require('gulp-util');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const babelify = require('babelify');
const del = require('del');
const source = require('vinyl-source-stream');

const paths = {
    buildPath: './build',
    scssDepPaths: [
        './bower_components/foundation-sites/scss',
        './bower_components/motion-ui/src',
        './bower_components/foundation-icon-fonts',
        './src/styles'
    ],
    cssDepPaths: [
        './bower_components/foundation-icon-fonts/foundation-icons.*'
    ],
    cssPath: '/assets/styles'
};

const config = {
    browserSync: {
        files: [paths.buildPath + '/**/*'],
        notify: false,
        open: false,
        port: 3000,
        server: {
            baseDir: paths.buildPath
        }
    },
    clean: [paths.buildPath]
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

	bundler.bundle()
		.on('error', function(err) {
			console.error(err);
			bundler.emit('end');
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(paths.buildPath))
        .on('end', () => {
            console.log('JS built ...');
        });
}

function sass() {
    gulp.src('./src/styles/**/*.scss')
        .pipe(gplugins.sass({
            includePaths: paths.scssDepPaths
        }).on('error', gplugins.sass.logError))
        .pipe(gplugins.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest(
            paths.buildPath + paths.cssPath
        ))
        .on('end', () => {
            console.log('Sass built ...');
        });
}

function deployHTMLAndCSSDep() {
    paths.cssDepPaths.forEach(i => {
        gulp.src(i).pipe(gulp.dest(paths.buildPath + paths.cssPath))
    });

    gulp.src('./src/index.html')
		.pipe(gulp.dest(paths.buildPath))
        .on('end', () => {
            console.log('HTML and CSS Dep deployed ...');
        });
}

function serve() {
    browserSync.init(config.browserSync);
}

function watchScss() {
    gulp.watch(['./src/styles/**/*.scss'], ['sass']);
}

function watchJs() {
    gulp.watch(['./src/**/*.js'], ['compile']);
}

gulp.task('clean', clean);

gulp.task('compile', compile);

gulp.task('sass', sass);

gulp.task('build', () => {
    compile();
    sass();
    deployHTMLAndCSSDep();
});

gulp.task('default', ['clean', 'build'], () => {
    watchJs();
    watchScss();
    serve();
    console.log('Start serving on', gutil.colors.magenta('localhost:3000'));
});
