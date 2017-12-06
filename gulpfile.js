var uglify = require('gulp-uglify')
var gulp = require('gulp')
var gutil = require('gulp-util')
gulp.task('uglifyjs', function () {
    gulp.src('src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
})

gulp.task('default', function () {
    gulp.watch('src/**/*.js', ['uglifyjs'])
})