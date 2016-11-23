var gulp = require('gulp'),
webpack = require('webpack');


gulp.task('scripts', ['modernizr'], function(callback) { //scripts nie wykona sie dopoki nie uruchomi najpierw [modernizr];
	webpack(require('../../webpack.config.js'), function(err, stats) {
		if (err) {
			console.log(err.toString());
		}
		console.log(stats.toString());
		callback();
	});
});