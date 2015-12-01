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

  overallPassInOneSubject: function (data, result){
    console.log("Query type: overallPassInOneSubject");

    mongoClient.connect(uri, function (err, db){
      var res = {
        JSON: {},
        msg: "",
      };
      res.JSON[data.subject[0]] = {};

      if((data.subject[0] == "CS1033")||(data.subject[0] == "CS1031")){
        var find = {};
        find["course." + data.subject[0] + ".internal"] = {$gt: 30};
        db.collection('main').find(find).count(function(err, count){
          res.JSON[data.subject[0]].internal = {};
          res.JSON[data.subject[0]].internal = ((count/731)*100).toPrecision(4)+"\%";

          res.msg = ((count/731)*100).toPrecision() + "\% students passed in "+ invMapSub[data.subject[0]] + "("+ data.subject[0] + ") internals. Following stats shows students passed: "

          var find = {};
          find["course." + data.subject[0] + ".pt"] = {$gt: 25};
          db.collection('main').find(find).count(function(err, count){
            res.JSON[data.subject[0]].practical = {};
            res.JSON[data.subject[0]].practical = ((count/731)*100).toPrecision(4) + "\%";

            result(err, res);
          });
        });

      }else{

        var find = {};
        find["course." + data.subject[0] + ".internal"] = {$gt: 25};
        db.collection('main').find(find).count(function (err, count){
          res.JSON[data.subject[0]].internal = {};
          res.JSON[data.subject[0]].internal = ((count/731)*100).toPrecision(4) + "\%";

          res.msg = ((count/731)*100).toPrecision(4)+"\% students passed in " + invMapSub[data.subject[0]] + "("+ data.subject[0] + ") internals. Following stats shows students passed: ";

          var find = {};
          find["course." + data.subject[0] + ".ct1"] = {$gt: 5};
          db.collection('main').find(find).count(function(err, count){
            res.JSON[data.subject[0]].ct1 = {};
            res.JSON[data.subject[0]].ct1 = ((count/731)*100).toPrecision(4) + "\%";

            var find = {};
            find["course." + data.subject[0] + ".ct1"] = {$gt: 5};
            db.collection('main').find(find).count(function (err, count){
              res.JSON[data.subject[0]].ct2 = {};
              res.JSON[data.subject[0]].ct2 = ((count/731)*100).toPrecision(4) + "\%";

              res.template = "card.jade";
              result(err, res);
            });
          });
        });

      }
    });
  },

  overallFailInOneSubject: function (data, result){
    console.log("Query type: overallFailInOneSubject");

    mongoClient.connect(uri, function (err, db){
      var res = {
        JSON: {},
        msg: "",
      };
      res.JSON[data.subject[0]] = {};

      if((data.subject[0] == "CS1033")||(data.subject[0] == "CS1031")){
        var find = {};
        find["course." + data.subject[0] + ".internal"] = {$lt: 30};
        db.collection('main').find(find).count(function(err, count){
          res.JSON[data.subject[0]].internal = {};
          res.JSON[data.subject[0]].internal = ((count/731)*100).toPrecision(4)+"\%";

          res.msg = ((count/731)*100).toPrecision() + "\% students failed in "+ invMapSub[data.subject[0]] + "("+ data.subject[0] + ") internals. Following stats shows students failed: "

          var find = {};
          find["course." + data.subject[0] + ".pt"] = {$lt: 25};
          db.collection('main').find(find).count(function(err, count){
            res.JSON[data.subject[0]].practical = {};
            res.JSON[data.subject[0]].practical = ((count/731)*100).toPrecision(4) + "\%";

            result(err, res);
          });
        });

      }else{

        var find = {};
        find["course." + data.subject[0] + ".internal"] = {$lt: 25};
        db.collection('main').find(find).count(function (err, count){
          res.JSON[data.subject[0]].internal = {};
          res.JSON[data.subject[0]].internal = ((count/731)*100).toPrecision(4) + "\%";

          res.msg = ((count/731)*100).toPrecision(4)+"\% students failed in " + invMapSub[data.subject[0]] + "("+ data.subject[0] + ") internals. Following stats shows students failed: ";

          var find = {};
          find["course." + data.subject[0] + ".ct1"] = {$lt: 5};
          db.collection('main').find(find).count(function(err, count){
            res.JSON[data.subject[0]].ct1 = {};
            res.JSON[data.subject[0]].ct1 = ((count/731)*100).toPrecision(4) + "\%";

            var find = {};
            find["course." + data.subject[0] + ".ct2"] = {$lt: 5};
            db.collection('main').find(find).count(function (err, count){
              res.JSON[data.subject[0]].ct2 = {};
              res.JSON[data.subject[0]].ct2 = ((count/731)*100).toPrecision(4) + "\%";

              res.template = "card.jade";
              result(err, res);
            });
          });
        });

      }
    });
  },

};
