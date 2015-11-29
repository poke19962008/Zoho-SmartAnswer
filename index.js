var app = require('./expressApp').port_3000;
var reStore = require('./routes/regexStore');
var normalize = require('./routes/normalize').normalize;



app.get('/query', function (req, res){
  var query = req.query.q;
  var found = false;

  var norm = normalize(query);
  if(req.session.usrID == undefined)
    res.redirect('/login');
  norm.regID.push(req.session.usrID);
  console.log(norm);

  for(var key in norm.bools){
    if(found) break;

    if(norm.bools[key] && !found){
      for(var queryType in reStore.query[key]){
        if(found) break;
        var reQueries = reStore.query[key][queryType];

        for(var ind in reQueries.queries){
          var re = reQueries.queries[ind];

          if(new RegExp(re).test(query)){
            reQueries.answer(norm, function result(err, doc){
              res.send(doc);
            });
            found = true;
            break;
          }

        }
      }
    }
  }

  if(!found)
    res.send("Invalid Query");

});

app.get('/createSession', function(req, res){
  var reID = new RegExp("(ra)(1411003010)[0-7][0-9]{2}$");
  var ID = req.query.id;

  if(reID.test(ID)){
    req.session.usrID = ID;
    res.send({ status: "success" });
  }
  else
    res.send({ status: "not Valid" });
});

app.get('/getQueryList', function (req, res){
  var q = [
    'How much I scored in oops, micro and ooad', 'How much I scored in dcf',
  ];

  res.send(q);
});
