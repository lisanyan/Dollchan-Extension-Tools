var gulp = require('gulp');

var jshint = require('gulp-jshint');
var babel = require('gulp-babel');
var strip = require('gulp-strip-comments');
var headerfooter = require('gulp-headerfooter');
var dest = require('gulp-dest');

var paths = {
	scripts: [
		'src/browser-polyfill.js',
		'src/Dollchan_Extension_Tools.es6.user.js',
		'Dollchan_Extension_Tools.meta.js'
	],
};

gulp.task('make', function() {
	return gulp.src('src/Dollchan_Extension_Tools.es6.user.js')
		.pipe(strip())
		.pipe(babel())
		.pipe(headerfooter.header('src/browser-polyfill.js'))
		.pipe(headerfooter.header('Dollchan_Extension_Tools.meta.js'))
		.pipe(dest('', {basename: 'Dollchan_Extension_Tools.user.'}))
		.pipe(gulp.dest('./'));
});

gulp.task('lint', function() {
	return gulp.src('src/Dollchan_Extension_Tools.es6.user.js')
		.pipe(jshint({ esnext: true, elision: true, sub: true, supernew: true, curly: true }))
		.pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['make']);
});

gulp.task('default', ['make', 'watch']);