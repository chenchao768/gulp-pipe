var gulp = require('gulp'),
    clean = require('gulp-clean'),
    path = require('path'),
    utils = require('./build/buildTask'),
    baseConfig = require('./config/baseConfig'),
    config = require('./config/gulp.file.config'),
    html = require('./build/handleHtml'),
    gulpOpen = require('gulp-open'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    browserSync = require('browser-sync').create();

var distPath = baseConfig.distPath,
    libPath = baseConfig.libPath,
    componentPath = baseConfig.componentPath,
    filename = baseConfig.pagePath,
    pubPath = baseConfig.pubPath;

var taskArr = [];//任务列表

gulp.task('init',function (done) {
  for(var key in config.pageRes){
    var singleConfig = {};
    config.pageRes[key].cssArr.push(path.join(baseConfig.pagePath,'./'+key+'/sass/*.scss'));
    singleConfig.style = {};
    singleConfig.style.task = key+'_sass';
    singleConfig.style.arr = config.pageRes[key].cssArr;
    singleConfig.style.dist = path.join(baseConfig.distPath,'./css');
    singleConfig.style.name = key + '.min.css';

    singleConfig.imgArr = [];
    singleConfig.src_img = path.join(filename,'./'+key+'/image/*.*');
    singleConfig.dist_img = path.join(distPath,'./images');

    config.pageRes[key].jsArr.push(path.join(baseConfig.pagePath,'./'+key+'/js/*.js'))
    singleConfig.js = {};
    singleConfig.js.task = key+'_js';
    singleConfig.js.arr = config.pageRes[key].jsArr;
    singleConfig.js.dist = path.join(baseConfig.distPath,'./js');
    singleConfig.js.name = key + '.min.js';

    utils.bulidImg(singleConfig.src_img,singleConfig.dist_img);
    utils.buildcss(singleConfig.style);
    utils.buildJs(singleConfig.js);
    taskArr.push(singleConfig.style.task,singleConfig.js.task);
  }
  console.log(taskArr)
  done();
})

//触发任务列表
gulp.task('moduleRun',['libInit','init','handleHtml'],function () {
  gulp.run(taskArr)
})

//处理html
gulp.task('handleHtml',function () {
  html.fnHtmlHandle(componentPath,filename);
})

//处理图片
gulp.task('libImg',function () {
  utils.bulidImg(path.join(libPath,'./images/*.*'),path.join(distPath,'./images'));
})
//处理lib中的css
gulp.task('libCss',function () {
  return gulp.src(path.join(libPath,'./css/*.css'))
      .pipe(gulp.dest(path.join(distPath,'./lib/css')))
})
//处理lib中的js
gulp.task('libJs',function () {
  return gulp.src(path.join(libPath,'./js/*.js'))
      .pipe(gulp.dest(path.join(distPath,'./lib/js')))
})
//libINIT
gulp.task('libInit',['libImg','libJs','libCss'])

//dev开发模式监听变化
gulp.task('dev',['moduleRun'],function () {
  var commonentList = Object.keys(config.componentRes)
  var pageList = Object.keys(config.pageRes);
  pageList.forEach(function (name,index) {
    var curPage = path.join(filename,name);
    console.log(curPage)
    var curPageJs = path.join(curPage,'/js/*.js');
    var curPageCss = path.join(curPage,'/sass/*scss');

    //遍历组件中的js以及css增加watch
    commonentList.forEach(function (cName,i) {
      gulp.watch(config.componentRes[cName].js,[name+'_js']);
      gulp.watch(config.componentRes[cName].css,[name+'_sass']);
    })

    gulp.watch(curPageJs,[name+'_js']);
    gulp.watch(curPageCss,[name+'_sass']);
  });
  //监听lib中的任务
  var libJs = libPath+'/js/*.js';
  var libCss = libPath+'/css/*css';
  gulp.watch(libJs,taskArr);
  gulp.watch(libCss,taskArr);
  gulp.watch(distPath+'/**/*.*').on('change',browserSync.reload);

  gulp.run('web')
})

//发布目录
gulp.task('md5',function () {
  return gulp.src(path.join(distPath,"/**/*.*"))
      .pipe(rev())//加md5
      .pipe(gulp.dest(pubPath))
      .pipe(rev.manifest({merge:true}))
      .pipe(gulp.dest(pubPath));
})

gulp.task('rev',['md5'],function () {
  return gulp.src([path.join(pubPath,'/**/*.json'),path.join(pubPath,"/**/*.+(html|css|js)")])
      .pipe(revCollector({
        replaceReved: true,
      }))
      .pipe(gulp.dest(pubPath));
})


//清除dist文件夹
gulp.task('clean',function () {
  return gulp.src(pubPath)
      .pipe(clean())
})

//web热加载
gulp.task('web',function () {
    browserSync.init({
      server:{
        baseDir:distPath
      }
    })
})