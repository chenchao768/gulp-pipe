const SRC_DIR = './src/';//主目录
const DIST_DIR = './dist/';//打包之后的目录

var config = {
   src:SRC_DIR,
   dist:DIST_DIR,
   html:{
       src:SRC_DIR+'.html',
       dist:DIST_DIR
   },
    assets:{
        src:SRC_DIR+'**/*',
        dist:DIST_DIR+'assets/'
    },
    css:{
        src:SRC_DIR+'css/**/*.css',
        dist:DIST_DIR+'css/'
    },
    less:{
        src:SRC_DIR+'less/**/*.less',
        dist:DIST_DIR+'less/'
    },
    js:{
       src:SRC_DIR+'js/**/*.js,',
       dist:DIST_DIR+'js/'
    },
    iamges:{
       src:SRC_DIR+'images/**/*',
       dist:DIST_DIR+'images/'
    }
}

module.exports.config = config;
