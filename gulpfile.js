var webpack = require('gulp-webpack')
var uglify = require('gulp-uglify')
var gulp = require('gulp')
var gutil = require('gulp-util')
var shell = require('gulp-shell');
gulp.task('frontSide', function(callback) {
	return shell('webpack'); 
	//return webpack(require('./webpack.config.js'));
/*  return gulp.src('./src/webApp/script/index.js')
      .pipe(webpack(require('./webpack.config.js')))*/
});
gulp.task('uglifyjs', function () {
    gulp.src('src/testModels/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/testModels/'))
})

gulp.task('default', function () {
    gulp.watch('src/**/*.js', ['uglifyjs','frontSide'])
})