var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('stylus', function() {
	return gulp.src('src/stylus/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('build/css'));
});

gulp.task('stylus:watch', function() {
	return gulp.watch('src/stylus/*.styl', ['stylus'])
});
