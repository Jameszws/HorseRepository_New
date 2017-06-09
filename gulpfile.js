//1.babel-core babel-preset-es2015 gulp-babel   用于解析es6转换为es5
//2.browser-sync  服务器同步浏览

var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var gutil = require('gulp-util');
var colors = require('colors/safe');
var htmlmin = require('gulp-htmlmin');
var through2 = require('through2');
var bom = require('gulp-bom'); //防止中文乱码
//var imagemin = require('gulp-imagemin');

var watch = require('gulp-watch');

var host={
	srcDir:"src/",
	buildDir:"build/"	//build目录
};

/*********************************** Horse框架  begin *************************************/

//压缩 Horse框架 css
gulp.task('minify_horse_css', function() {
	return gulp.src(host.srcDir+'js/horse/**/*.css') //压缩的文件    	
		.pipe(minifycss()) //执行压缩
		//.pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
		.pipe(gulp.dest(host.buildDir+'js/horse/')); //输出文件夹
	//.pipe(concat('horse.css'))    //合并所有horse ui css到 horse.css
	//.pipe(gulp.dest(host.buildDir+'js/horse/'));   //输出文件夹 
});

//压缩 Horse框架  js
gulp.task('minify_horse_js', function() {
	return gulp.src(host.srcDir+'js/horse/**/*.js')
		.pipe(uglify()) //压缩
		//.pipe(rename({suffix: '.min'}))   //rename压缩后的文件名        
		.pipe(gulp.dest(host.buildDir+'js/horse/')); //输出
	//.pipe(concat('horse.js'))    //合并所有js到 horse.js
	//.pipe(gulp.dest(host.buildDir+'js/Horse/'))    //输出 horse.js到文件夹
});

//压缩 Horse框架  html
gulp.task('horse_html', function() {
	var options = {
		collapseWhitespace: true, //true:清除空格
		collapseBooleanAttributes: true, //true:省略布尔属性的值
		removeComments: true, //true:清除html中注释的部分
		removeEmptyAttributes: false, //true:清除所有的空属性
		removeScriptTypeAttributes: false, //true:清除所有script标签中的type="text/javascript"属性
		removeStyleLinkTypeAttributes: false, //true:清楚所有Link标签上的type属性
		minifyJS: true, //true:压缩html中的javascript代码
		minifyCSS: true //true:压缩html中的css代码
	};
	gulp.src([host.srcDir+'js/horse/**/*.html'])
		.pipe(htmlmin(options))
		.pipe(gulp.dest(host.buildDir+'js/horse/'));
});

//image传递
gulp.task('horse_image', function () {
    gulp.src(host.srcDir+'js/horse/**/*.{png,jpg,gif,ico}')
        .pipe(gulp.dest(host.buildDir+'js/horse/'));
});

/*********************************** Horse框架  end *************************************/

//压缩html
gulp.task('html', function() {
	var options = {
		collapseWhitespace: false, //true:清除空格
		collapseBooleanAttributes: false, //true:省略布尔属性的值
		removeComments: false, //true:清除html中注释的部分
		removeEmptyAttributes: false, //true:清除所有的空属性
		removeScriptTypeAttributes: false, //true:清除所有script标签中的type="text/javascript"属性
		removeStyleLinkTypeAttributes: false, //true:清楚所有Link标签上的type属性
		minifyJS: false, //true:压缩html中的javascript代码
		minifyCSS: false //true:压缩html中的css代码
	};
	gulp.src([host.srcDir+'view/**/*.html'])
		.pipe(htmlmin(options))
		.pipe(gulp.dest(host.buildDir+'view/'));
	gulp.src([host.srcDir+'index.html'])
		.pipe(htmlmin(options))
		.pipe(gulp.dest(host.buildDir));
});

//压缩 css （不含Horse框架）
gulp.task('minifycss', function() {
	return gulp.src(host.srcDir+'css/**/*.css') //压缩的文件    	
		.pipe(minifycss()) //执行压缩
		//.pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
		.pipe(gulp.dest(host.buildDir+'css/')); //输出文件夹
	//.pipe(concat('horse.css'))    //合并所有horse ui css到 horse.css
	//.pipe(gulp.dest(host.buildDir+'js/Horse/'));   //输出文件夹 
});

//压缩  js （不含Horse框架）
gulp.task('minifyjs', function() {
	return gulp.src([host.srcDir+'js/**/*.js', '!'+host.srcDir+'js/horse/**/*.*', '!'+host.srcDir+'js/libs/**/*.*'])
		.pipe(uglify()) //压缩
		//.pipe(rename({suffix: '.min'}))   //rename压缩后的文件名        
		.pipe(gulp.dest(host.buildDir+'js/')) //输出
		//.pipe(concat('horse.js'))    //合并所有js到 horse.js
		//.pipe(gulp.dest(host.buildDir+'js/Horse/'))    //输出 horse.js到文件夹
});

//输出libs  不做压缩处理
gulp.task('libs', function() {
	gulp.src([host.srcDir+'js/libs/**/*.*'])
		.pipe(gulp.dest(host.buildDir+'js/libs/')) //输出
		//.pipe(concat('horse.js'))    //合并所有js到 horse.js
		//.pipe(gulp.dest(host.buildDir+'js/Horse/'))    //输出 horse.js到文件夹
});

//image传递
gulp.task('image', function () {
    gulp.src(host.srcDir+'images/**/*.{png,jpg,gif,ico}')
        .pipe(gulp.dest(host.buildDir+'images/'));
});

gulp.task('watch-js-change', function() {
	return watch(['js/**/*.js', '!'+host.srcDir+'js/horse/**/*.*', '!'+host.srcDir+'js/libs/**/*.*'], function() {
		gulp.start("minifyjs");
	});
});

//执行压缩前，先删除文件夹里的内容
gulp.task('clean', function(cb) {
	gutil.log(colors.blue("清空文件夹动作开始……………………BEGIN"));
	return del([
		host.buildDir+'css/',
		host.buildDir+'js/controllers',
		host.buildDir+'js/services',
		host.buildDir+'js/routes',
		host.buildDir+'js/base',
		host.buildDir+'js/util',
		host.buildDir+'view/',
		host.buildDir+'index.html'
	], cb);
});

//默认命令，在cmd中输入gulp后，执行的就是这个命令
gulp.task('default', ['clean'], function() {
	gutil.log(colors.blue("清空文件夹动作完成……………………END"));
	gulp.start('minifycss', 'minifyjs', 'libs', 'html');
});

//执行压缩前，先删除文件夹里的内容
gulp.task('clean_all', function(cb) {
	gutil.log(colors.blue("清空文件夹动作开始……………………BEGIN"));
	return del([
		host.buildDir+'css/',
		host.buildDir+'js/',
		host.buildDir+'view/',
		host.buildDir+'index.html'
	], cb);
});

gulp.task("build_all", ["clean_all"], function() {
	gutil.log(colors.blue("清空文件夹动作完成……………………END"));
	gulp.start('minifycss', 'minifyjs', 'libs', 'html','image','minify_horse_js', 'minify_horse_css', 'horse_html', 'horse_image','watch-js-change');
});

/*
//修改View html 文件
gulp.task('modifyHtml', function() {
	console.log('修改Html');
	
	var options = {
		collapseWhitespace: false,//true:清除空格
		collapseBooleanAttributes: false,//true:省略布尔属性的值
		removeComments: false,//true:清除html中注释的部分
		removeEmptyAttributes: false,//true:清除所有的空属性
		removeScriptTypeAttributes: false,//true:清除所有script标签中的type="text/javascript"属性
		removeStyleLinkTypeAttributes: false,//true:清楚所有Link标签上的type属性
		minifyJS: false,//true:压缩html中的javascript代码
		minifyCSS: false//true:压缩html中的css代码
	};
	
	gulp.src([host.srcDir+'index.html'])
		.pipe(through2.obj(function(file, enc, callback) {
			if (file.contents) {
				var contents = String(file.contents);
				//console.log("content="+contents);
				//contents = contents.replace(/(<script[^>]*src=")([^>]*\/)([\w\.]*)(.js)("><\/script>)/g, function() {
				contents = contents.replace(/(<script[^>]*data-main=")([^>]*)("*src=")([^>]*\/)([\w\.]*)(.js)("><\/script>)/g, function() {					
					var args = arguments;
					console.log("args=" + JSON.stringify(args));
					if (args.length > 1) {						
						return args[1] +args[2]+ args[3]+args[4] + args[5]+ args[6]+ args[7];
					}
				});				
				//console.log("contents=" + contents);
				file.contents = new Buffer(contents);
				this.push(file);
			}
			callback();
		}))
		.pipe(bom())
		.pipe(htmlmin(options))
		.pipe(gulp.dest(host.buildDir+));
});
*/