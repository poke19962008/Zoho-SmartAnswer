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
        "_id": {$regex: data.usrID, $options: 'i'},
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

    if(data.subject.length < 2)
      result("", {
        msg: "Sorry Unable to Process your Query :(",
        template: "invalidCard.jade",
      });
    else{
      mongoClient.connect(uri, function (err, db){
        var cur = db.collection('main').find({
          "_id": {$regex: data.usrID, $options: 'i'},
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
        "_id": {$regex: data.usrID, $options: 'i'},
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
          find["course."+data.subject[0]+".mt"] = {$gt: 10};
          db.collection('main').find(find).count(function (err, count){
            res.JSON[data.subject[0]].mt = {};
            res.JSON[data.subject[0]].mt = ((count/731)*100).toPrecision(4) + "\%";

            var find = {};
            find["course." + data.subject[0] + ".ct1"] = {$gt: 5};
            db.collection('main').find(find).count(function(err, count){
              res.JSON[data.subject[0]].ct1 = {};
              res.JSON[data.subject[0]].ct1 = ((count/731)*100).toPrecision(4) + "\%";

              var find = {};
              find["course." + data.subject[0] + ".ct2"] = {$gt: 5};
              db.collection('main').find(find).count(function (err, count){
                res.JSON[data.subject[0]].ct2 = {};
                res.JSON[data.subject[0]].ct2 = ((count/731)*100).toPrecision(4) + "\%";

                res.template = "card.jade";
                result(err, res);
              });
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
          find["course."+data.subject[0]+".mt"] = {$lt: 10};
          db.collection('main').find(find).count(function (err, count){
            res.JSON[data.subject[0]].mt = {};
            res.JSON[data.subject[0]].mt = ((count/731)*100).toPrecision(4) + "\%";

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
        });

      }
    });
  },

  friendScoreInOneSubject: function (data, result){
    console.log("Query type: friendScoreInOneSubject");

    mongoClient.connect(uri, function (err, db){
      var find = {
        _id: {
          $in: [],
        }
      };
      var proj = {
        _id: false,
        name: true,
      };
      proj["course." + data.subject[0]] = true;

      find._id.$in.push(new RegExp(data.regID[0], 'i'));


      var cur = db.collection('main').find(find, proj);

      cur.toArray(function (err, doc){
        var res = {
          msg: "",
          JSON: {},
          template: 'card.jade',
        };

        res.msg = doc[0].name + " scored "+ doc[0].course[data.subject[0]].internal + " in "+ data.subject[0]+ " internal.";
        res.JSON['Score card of '+doc[0].name+' in '+ data.subject[0]] = {};
        res.JSON['Score card of '+doc[0].name+' in '+ data.subject[0]] = doc[0].course[data.subject[0]];

        result(err, res);
      });
    });
  },

  friendScoreInAllSubject: function (data, result){
    console.log("Query type: friendScoreInAllSubject");

    mongoClient.connect(uri, function (err, db){
      var find = {
        _id: {
          $in: [],
        }
      };


      for (var i = 0; i < data.regID.length; i++)
        find._id.$in.push(new RegExp(data.regID[i], 'i'));


      var cur = db.collection('main').find(find, {_id: false, name: true, course: true});

      cur.toArray(function (err, doc){
        var res = {
          msg: "Score Card for ",
          JSON: {},
          template: 'card.jade',
        };

        for (var i = 0; i < doc.length; i++) {
          res.msg += doc[i].name + ".";
          res.JSON = doc[i].course;
        }

        result(err, res);
      });
    });
  },

  compareInAllSubject: function (data, result){
    console.log("Query type: compareInAllSubject");

    mongoClient.connect(uri, function (err, db){
      var find = {_id: {$in: [new RegExp(data.usrID, 'i'), new RegExp(data.regID[0], 'i')] }};
      var projection = {_id: false, course: true, name: true};

      var cur = db.collection('main').find(find, projection);
      cur.toArray(function(err, doc){
        var res = {
          msg: "Score Card for " + doc[0].name + ' Vs. ' + doc[1].name ,
          JSON: {},
          template: "compareCard.jade",
        };

        for(var sCode in invMapSub){
          var data = {};

          data.name = [doc[0].name, doc[1].name];
          for (var test in doc[0].course[sCode]) {
            if(test == 'title' || test == 'qat')
              continue;

            data[test] = [];
            data[test].push(doc[0].course[sCode][test]);
            data[test].push(doc[1].course[sCode][test]);
          }

          res.JSON[sCode] = data;
        }

        result(err, res);
      });

    });
  }

};
