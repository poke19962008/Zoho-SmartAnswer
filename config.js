function config(){
  var conf = {
    "mongo": {
      "uri": "mongodb://127.0.0.1:27017/zoho",
      "port": 271017
    },

    "session": {
      "secret": "iloveapples",
      "expiration": 360000000,
    }
  };
  return conf;
}

exports.load = config;
