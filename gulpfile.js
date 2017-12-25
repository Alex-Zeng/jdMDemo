// 'use strict';
// var gulp = require('gulp');
// gulp.task('copy',function () {
//     //gulp.src取一个文件
//     gulp.src('./gulpDemo.html')
//         .pipe(gulp.dest('dist/'))  //pipe此处需要的操作传递进去  dest输出到哪
// });
//
// gulp.task('dist',function () {
//     gulp.watch('./gulpDemo.html',['copy',])
// });

'use strict';
var gulp = require('gulp');
var less = require('gulp-less'); //css编译
var cssnano = require('gulp-cssnano');//css合并
var concat = require('gulp-concat');  //js 合并
var uglify = require('gulp-uglify');  //js 压缩
var htmlmin = require('gulp-htmlmin');  //html 压缩
var browserSync = require('browser-sync');  //同步


//1.LESS编译 压缩
gulp.task('css',function () {
    //gulp.src取一个文件
    gulp.src('less/*.less')
        .pipe(less())   //LESS编译
        .pipe(cssnano())   //CSS压缩
        .pipe(gulp.dest('dist/css/'))  //输出到..
        .pipe(browserSync.reload({stream:true}))

        // .pipe()   //pipe此处需要的操作传递进去   dest输出到哪
});
//2.JS合并 压缩 混淆
gulp.task('script',function () {
    gulp.src('script/*.js')
        .pipe(concat('all.js'))  //合并后需要自己给名字
        .pipe(uglify())  //js压缩
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.reload({stream:true}))
});


//3.图片变化
gulp.task('image',function () {
    gulp.src('images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({stream:true}))
});

//4.html
gulp.task('html',function () {
    gulp.src('*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream:true}))
});

//同步,启动监听
gulp.task('server',function () {
    browserSync({
        notify:false,
        port:3000,
        server:{
            baseDir:['dist']
        }
    },function (err,bs) {
        console.log(bs.options.getIn(["urls","local"]));

    });


    gulp.watch('script/*.js',['script']);
    gulp.watch('less/*.less',['css']);
    gulp.watch('*.html',['html']);
    gulp.watch('images/*.*',['image']);
});
