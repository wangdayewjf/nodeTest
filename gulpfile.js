var webpackStream = require('webpack-stream'),
	webpack2 = require('webpack'),
	uglify = require('gulp-uglify'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	shelljs = require('shelljs'),
	nodemon = require('gulp-nodemon'),
    named = require('vinyl-named');

gulp.task('frontSide', function(callback) {
	//命令行方式
	//return shelljs.exec('webpack'); //命令行webpack打包
	//第一种
	return webpackStream(require('./webpack.config.js'),webpack2);
    // 第二种 
    //return gulp.src('src/entry.js')
    // .pipe(named())
    // .pipe(webpackStream())
    // .pipe(gulp.dest('dist/'));
    //我猜这俩个的区别是，上面用指定配置文件打包，而下面是指定一src/entry.js为入口文件，按照默认配置打包？
    //注意:用webpack-stream不需要配置entry和output,因为这可以用管道实现，不过你不用管道也可以，如果引入配置，再用
    //管道的话理论上会打包俩个配置文件，放到不同的地方。
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

gulp.task('default',function () {
    gulp.watch('src/**/*.js', ['uglifyjs','frontSide'])
})