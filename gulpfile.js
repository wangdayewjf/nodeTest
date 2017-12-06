var webpack = require('gulp-webpack')
var uglify = require('gulp-uglify')
var gulp = require('gulp')
var gutil = require('gulp-util')
//var shell = require('gulp-shell');
var shelljs = require('shelljs');
var nodemon = require('gulp-nodemon');
gulp.task('frontSide', function(callback) {
	return shelljs.exec('webpack');
	//return webpack(require('./webpack.config.js'));
/*  return gulp.src('./src/webApp/script/index.js')
      .pipe(webpack(require('./webpack.config.js')))*/
});
gulp.task('uglifyjs', function () {
    gulp.src('src/testModels/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/testModels/'))
})

gulp.task('start', function () {
  nodemon({
    script: 'appHttpTest.js'
  , ext: 'js'//类似于监控哪些后缀名，然后自动重启
  , env: { 'NODE_ENV': 'development' }
  ,"start": "echo 'app start'"

  })
})

//注：关于监控以及忽略文件修改有个顺序的问题，或者说优先级，首先 nodemon 会先读取 watch 里面需要监控的文件或文件路径，
//再从文件中选择监控 ext 中指定的后缀名，最后去掉从 ignore 中指定的忽略文件或文件路径。
// https://www.cnblogs.com/chris-oil/p/6239097.html 详细解释
gulp.task('default',['start'],function () {
    gulp.watch('src/**/*.js', ['uglifyjs','frontSide'])
})