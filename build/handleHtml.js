var config = require('../config/baseConfig');
var fs = require('fs');
var path = require('path');
//处理整合html函数

var componentConcat = {
  fnHtmlHandle : function (cPath,file) {
    console.log("***************start html**************")
    // 使用API文档中的fs.readFile(filename, [options], callback)
    var pa = fs.readdirSync(file);
    //遍历page路径下的html文件
    pa.forEach(function(ele,index){
      var comPath = '';
      //取到文件夹中的html文件名相同，能力有限
      var distPath = config.distPath;
      //这边只能文件夹名称与html
      var info = file+"\\"+ele+"\\"+ele+".html";
      // 使用API文档中的fs.readFile(filename, [options], callback)
      fs.readFile(info,{encoding:'utf8'},function (err,data) {

        var dataReplace  = data.replace(/<link\srel="import"\shref="(.*)">/gi,function (matchs,m1) {
          comPath = cPath+"\\"+m1;
          //异步写入替换的html
          return fs.readFileSync(cPath+"\\"+m1,{encoding:'utf8'})
        })
        //生成新的html
        var distHtml = distPath+'\\'+ele+'.html';
        componentConcat.$$mkdir(distHtml,function () {
          fs.writeFile(distHtml,dataReplace,{encoding:'utf8'},function (err) {
            if(err) throw err;
            console.log('success')
          })
        })
        componentConcat.watchHtml(cPath,file,info);
        componentConcat.watchHtml(cPath,file,comPath)
      })
    })
  },

  //同步创建文件夹
  $$mkdir : function(dir, cb) {
    var pathinfo = path.parse(dir)
    if (!fs.existsSync(pathinfo.dir)) {
      componentConcat.$$mkdir(pathinfo.dir,function() {
        fs.mkdirSync(pathinfo.dir)
      })
    }
    cb && cb()
  },
  //监听文件变化
  watchHtml : function (cPath,file,htmlSrc) {
    fs.watch(htmlSrc,function (event,fileName) {
      if(event == 'change'){
        console.log(htmlSrc + '发生了改变，重新生成...');
        componentConcat.fnHtmlHandle(cPath,file);
      }
    })
  }
}


// fnHtmlHandle(componentPath,filename)
module.exports = componentConcat;

