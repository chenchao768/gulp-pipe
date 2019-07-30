var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    base64 = require('gulp-base64'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    imageMin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync'),
    getEnv = require('../config/getEnv.js'),
    gulpIf = require('gulp-if');

module.exports = {
  //处理scss
  buildcss:function (config) {
    var taskName = config.task,
        _cssDistName = config.name,
        _cssDistDir = config.dist,
        _scssArr = config.arr;
    gulp.task(taskName,function () {
      console.log('****************start sass********')
     return gulp.src(_scssArr) //传入整合后的用的样式
          .pipe(sass())
          .on('error', sass.logError)
          .pipe(concat(_cssDistName))
          .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
          }))
          .pipe(base64({
            extensions:[/\.(jpg|png)/i],
            maxImageSize:20*1024
          }))
          .pipe(minifyCss())
          .pipe(rename(_cssDistName))
          .pipe(gulp.dest(_cssDistDir))
         .pipe(gulpIf( getEnv=="dev" ,browserSync.stream()));
    })
  },

  //处理image
  bulidImg:function (src,dist) {
    console.log('************image start************')
    return gulp.src(src)
        .pipe(cache(
            imageMin({
              optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
              progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
             // interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
              multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
            })
        ))
        .pipe(gulp.dest(dist))
  },

  //处理js
  buildJs:function (config) {
    var taskName = config.task,
        _jsDistName = config.name,
        _jsDistDir = config.dist,
        _jsArr = config.arr;
    gulp.task(taskName,function () {
      console.log('****************start js********')
      return gulp.src(_jsArr)//加载的js列表
          .pipe(concat(_jsDistName))//js合并后的名字
          .pipe(babel({
            presets: ['es2015']
          }))
          .pipe(uglify())
          .pipe(gulp.dest(_jsDistDir))
          .pipe(gulpIf( getEnv=="dev" ,browserSync.stream()))
    })

  }

}