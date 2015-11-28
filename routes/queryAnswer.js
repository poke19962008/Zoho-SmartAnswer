var mongoClient = require('mongodb').MongoClient;
var uri = require('../config').load().mongo.uri;

var invMapSub = {
  MA1003 : "math",
  EE1053: "electrical",
  PD1003: "aptitude",
  CS1003: "digital computer fundamentals",
  CS1005: "object oriented programming",
  CS1007: "microprocessor and interfacing",
  CS1009: "object oriented analysis and design",
  CS1031: "object oriented programming",
  CS1033: "microprocessor and interfacing",
};

exports.init = {
  scoreInOneSubject: function(data, result){
    console.log("Query type: scoreInOneSubject");
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
    console.log("Query type: scoreInMultipleSubject");

    if(data.subject.length < 2 && data.regID.length == 0)
      result("", "Invalid Query");
    else{
      mongoClient.connect(uri, function (err, db){
        var cur = db.collection('main').find({
          "_id": {$regex: data.regID[0], $options: 'i'},
        },{
          course: true,
        });

        cur.toArray(function (err, doc){
          var res = {
            JSON: {},
            msg: "You have scored ",
          };

          for (var i = 0; i < data.subject.length; i++) {
            res.JSON[data.subject[i]] = doc[0].course[data.subject[i]];

            if((data.subject[i] == "CS1033")||(data.subject[i] == "CS1031"))
              res.msg +=  res.JSON[data.subject[i]].internal + " out of 60 in your "+data.subject[i]+"("+invMapSub[data.subject[i]]+") internal, ";
            else
              res.msg += res.JSON[data.subject[i]].internal + " out of 50 in your "+data.subject[i]+"("+invMapSub[data.subject[i]]+") internal, ";
          }
          res.template = "xyz.jade";
          result(err, res);
        });
      });
    }

  },

};
