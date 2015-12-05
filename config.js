function config(){
  var conf = {
    "mongo": {
      "uri": "mongodb://localhost:27017/zoho",
      "port": 271017
    },

    "session": {
      "secret": "iloveapples",
      "expiration": 36000000,
    }
  };
  return conf;
}

exports.load = config;
