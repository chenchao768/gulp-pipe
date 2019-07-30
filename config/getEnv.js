(function (process) {
  if(process.env.NODE_ENV === undefined){
    process.env.NODE_ENV = 'production'
  }
}(process));

module.exports = {'env':process.env.NODE_ENV}


