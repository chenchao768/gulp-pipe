var config = require('./baseConfig');
var path = require('path');

//配置gulp中使用到的文件路径
var jsLib = {
  //js库路径
  jq:path.join(config.libPath,'./js/jquery-1.9.1.min.js'),
}

var imgLib = {
  img:path.join(config.libPath,'./images/*.*')
}

var cssLib = {
  //css库路径
  addressCss:path.join(config.libPath,'./css/addressSelect.css'),
}

//组件中静态资源的整合,在这边需要写出新增的组件的样式以及js路径，已便后面的页面中静态资源整合
var componentRes = {
  header:{
    js:path.join(config.componentPath,'./header/header.js'),
    css:path.join(config.componentPath,'./header/header.scss')
  },
  footer:{
    js:path.join(config.componentPath,'./footer/footer.js'),
    css:path.join(config.componentPath,'./footer/footer.scss')
  }
}

//多页面中需要的js以及样式表(列出所有页面)
var pageRes = {
  index : {
    jsArr:[
        componentRes.header.js,
        componentRes.footer.js
    ],
    cssArr:[
        componentRes.header.css,
        componentRes.footer.css
    ]
  }
}

module.exports = { jsLib,cssLib,componentRes,imgLib,pageRes }



