var mongoClient = require('mongodb').MongoClient;
var uri = require('../config').load().mongo.uri;

exports.init = {
  scoreInOneSubject: function(data, result){
    mongoClient.connect(uri, function (err, db){
      var cur = db.collection('main').find({
        "_id": {$regex: data.regID[0], $options: 'i'},
      },{
        course: true,
      });

      cur.toArray(function (err, doc){
        var res = {};

        res.JSON = doc[0].course[data.subject[0]];
        res.template = "xyz.jade";

        if((data.subject[0] == "CS1033")||(data.subject[0] == "CS1031"))
          res.msg = "You have scored " + res.JSON.internal + " out of 60 in your internal.";
        else
          res.msg = "You have scored " + res.JSON.internal + " out of 50 in your internal.";

        result(err, res);
      });
    });
  },

  scoreInMultipleSubject: function (data, result){
    result("", data);
  },

};
