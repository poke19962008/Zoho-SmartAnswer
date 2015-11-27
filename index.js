var app = require('./expressApp').port_3000;
var reStore = require('./routes/regexStore');
var normalize = require('./routes/normalize').normalize;

app.get('/', function (req, res){
  var userID = req.session.usrID;
  if(userID == "")
   res.redirect("/login");

  var query = req.query.q;

  var norm = normalize(query);
  for(var key in norm.bools){

    if(norm.bools[key]){
      for(var queryType in reStore.query[key]){
        var reQueries = reStore.query[key][queryType];

        for(var ind in reQueries.queries){
          var re = reQueries.queries[ind];

          if(new RegExp(re).test(query)){
            
          }
        }
      }
    }

  }
});

app.get('/login', function(req, res){
  req.session.usrID = "ra1411003010485";
  res.send("Login Successfull");
});

app.get('/test', function(req, res){
  res.send(req.session['usrID']);

  console.log(req.session);
});
