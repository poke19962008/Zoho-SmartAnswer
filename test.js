var mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017/zoho', function (err, db){
  var sub = "course.MA1003.internal"
  var q = {};
  q[sub] = 1;
  var cur = db.collection('main').count({_id: 'RA1411003010485'});

  console.log(cur);

  // cur.toArray(function (err, doc){
  //   console.log(doc);
  // });
});
