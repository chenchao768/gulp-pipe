var path = require('path');

//将所有文件路径变为绝对路径，避免出错
var allConfig = {
  srcPath:path.resolve(__dirname,'../src'),
  distPath:path.resolve(__dirname,'../dist'),
  pubPath:path.resolve(__dirname,'../pub'),
  libPath:path.resolve(__dirname,'../src/lib'),
  pagePath:path.resolve(__dirname,'../src/page'),
  configPath:path.resolve(__dirname),
  componentPath:path.resolve(__dirname,'../src/component'),
}

module.exports = allConfig;