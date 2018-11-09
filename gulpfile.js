const gulpConfig = require('./gulp.file.config.js');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const less = require('gulp-less');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('html',function () {
    console.log('****************html*******************')
    return gulp.src(gulpConfig.config.html.src)
        .pipe(gulp.dest(gulpConfig.config.html.dist))
})

gulp.task('server',function () {
    console.log('*****************server***************************')
    browserSync.init({
        server:gulpConfig.config.dist,
        port:8080
    })
})
