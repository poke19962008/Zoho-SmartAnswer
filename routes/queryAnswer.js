var mongoClient = require('mongodb').MongoClient;
var uri = require('../config').load().mongo.uri;

exports.init = {
  scoreInOneSubject: function(data, result){
    var foo = "bar";

    mongoClient.connect(uri, function (err, db){
      var cur = db.collection('main').find({
        "_id": "RA1411003010485",
      },{
        course: true,
      });
      foo = "bar2";

      cur.toArray(function (err, doc){
        // result(err, doc[0].course[data.subject[0]]);
        foo = doc[0].course[data.subject[0]];
      });
    });
  },
};
