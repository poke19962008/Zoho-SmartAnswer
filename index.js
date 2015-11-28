var app = require('./expressApp').port_3000;
var reStore = require('./routes/regexStore');
var normalize = require('./routes/normalize').normalize;



app.get('/', function (req, res){
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

app.get('/login', function(req, res){
  req.session.usrID = "ra1411003010485";
  res.send("Login Successfull");
});

app.get('/test', function(req, res){
  res.send(req.session['usrID']);

  console.log(req.session);
});
