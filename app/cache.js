function cache(){
  var results = {};
  this.setCache = function(key, value){
    results[key] = value;
  };
  this.getCache = function(key){
    return results[key];
  };
}

export default new cache();
