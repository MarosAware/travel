var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', function() { // preview calego projektu dist w przegladarce.
	browserSync.init({
		notify:false,
		server: {
			baseDir: "docs"
		}
	});
});

gulp.task('deleteDistFolder', ['icons'], function() { // optimizeImages nie wykona sie dopóki nie  wykona sie icons task aby byla najnowsza kopia.
	return del("./docs");
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
	var pathsToCopy = [
		'./app/**/*',
		'!./app/index.html',
		'!./app/assets/images/**',
		'!./app/assets/styles/**',
		'!./app/assets/scripts/**',
		'!./app/temp',
		'!./app/temp/**'
	]

	return gulp.src(pathsToCopy)
	.pipe(gulp.dest("./docs"));
})

gulp.task('optimizeImages',['deleteDistFolder'], function() { 
	return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
	.pipe(imagemin({
		progressive: true, //optymalizuje pliki jpg
		interlaced: true, //do optymalizacji gif-ow
		multipass: true //do optymalizacji svg
	}))
	.pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
	gulp.start("usemin");
});

gulp.task('usemin', ['styles', 'scripts'],  function() { // usemin nie wykona sie dopóki nie wykona sie sytles i scripts tasks aby byla najnowsza kopia.
	return gulp.src("./app/index.html")
	.pipe(usemin({
		css: [function() {return rev()}, function() {return cssnano()}],
		js: [function() {return rev()}, function() {return uglify()}]
	}))
	.pipe(gulp.dest("./docs"));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);