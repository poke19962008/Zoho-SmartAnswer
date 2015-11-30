var mongoClient = require('mongodb').MongoClient;
var uri = require('../config').load().mongo.uri;

var invMapSub = {
  MA1003 : "Math",
  EE1053: "Electrical",
  PD1003: "Aptitude",
  CS1003: "Digital Computer Fundamentals",
  CS1005: "Object Oriented Programming",
  CS1007: "Microprocessor and Interfacing",
  CS1009: "Object Oriented Analysis and Design",
  CS1031: "Object Oriented Programming",
  CS1033: "Microprocessor and Interfacing",
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
        var res = {
          JSON: {}
        };

        res.JSON[data.subject[0]] = doc[0].course[data.subject[0]];

        if((data.subject[0] == "CS1033")||(data.subject[0] == "CS1031"))
          res.msg = "You have scored " + res.JSON[data.subject[0]].internal + " out of 60 in your internal.";
        else
          res.msg = "You have scored " + res.JSON[data.subject[0]].internal + " out of 50 in your internal.";

        res.template = "card.jade";
        result(err, res);
      });
    });
  },

  scoreInMultipleSubject: function (data, result){
    console.log("Query type: scoreInMultipleSubject");

    if(data.subject.length < 2 && data.regID.length == 0)
      result("", {
        msg: "Sorry Unable to Process your Query :(",
        template: "invalidCard.jade",
      });
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
              res.msg +=  res.JSON[data.subject[i]].internal + " out of 60 in "+data.subject[i]+"("+invMapSub[data.subject[i]]+") internal, ";
            else
              res.msg += res.JSON[data.subject[i]].internal + " out of 50 in "+data.subject[i]+"("+invMapSub[data.subject[i]]+") internal, ";
          }
          res.template = "card.jade";
          result(err, res);
        });
      });
    }
  },

  failedSubjects: function (data, result){
    console.log("Query type: failedSubjects");

    mongoClient.connect(uri, function(err, db){
      var cur = db.collection('main').find({
        "_id": {$regex: data.regID[0], $options: 'i'},
      },{
        "_id": false,
        "course": true,
      });

      cur.toArray(function (err, doc){
        var res = {
          msg: "You need ",
          JSON: {},
        };

        for(var subCode in doc[0].course){
          var internal = doc[0].course[subCode].internal;

          if(internal < 25){
            res.JSON[subCode] = doc[0].course[subCode];
            res.msg += (50-internal)*2 + " in " + invMapSub[subCode] + "("+ subCode + "), "
          }
        }

        res.template = "card.jade";
        result(err, res);
      });

    });
  },

};
