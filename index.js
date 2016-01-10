var app = require('./expressApp').port_3000;
var reStore = require('./routes/regexStore');
var normalize = require('./routes/normalize').normalize;
var fs = require('fs');
var winston = require('winston');


var logger = new (winston.Logger)({
    transports: [

      new (winston.transports.File)({ filename: 'log/queriesSearched.log' })
    ]
  });

app.get('/zoho/query', function (req, res){
  var query = req.query.q;
  query = query.toLowerCase();
  var found = false;

  query = query.replace(/(\s){2,}|(\n)+|(\r)+|(\t)+/g, " ");
  var norm = normalize(query);

  if(req.session.usrID == undefined)
    res.send("session expired");
  else{
    norm['usrID'] = req.session.usrID;
    norm['query'] = query;
  //  console.log(norm);
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
                res.render(doc.template, doc);
              });
              found = true;
              logger.log('info', "VLD | ID: %s  query: %s", req.session.usrID, req.query.q);
              break;
            }

          }
        }
      }
    }

    if(!found){
      res.render('invalidCard.jade', {
        msg: "Sorry Unable to Process your Query :(",
        template: "invalidCard.jade",
      });

       logger.log('info', "INV | ID: %s  query: %s", req.session.usrID, req.query.q);
     }
  }

});

app.get('/zoho/createSession', function(req, res){
  var reID = new RegExp("((ra)|(RA))(1411003010)[0-7][0-9]{2}$");
  var ID = req.query.id;
  ID = ID.toUpperCase();

  if(reID.test(ID)){
    req.session.usrID = ID;
    res.send({ status: "success" });
  }
  else
    res.send({ status: "not Valid" });
});

app.get('/zoho/getQueryList', function (req, res){
  var q =[
   'Get id of Sayan Das',  'How much I scored in oops, micro and ooad', 'How much I scored in dcf', 'How many subjects i failed', 'How many students passed in maths', 'My overall score?','compare me with ra1411003010485?', 'How ra1411003010485 performed in oops?', 'Overall performance of ra1411003010485?', 'how many students failed in maths?',  'How much I scored in oops, micro and ooad?', 'How much I scored in dcf?', 'How many subjects i failed?'];

  res.send(q);
});


app.get('/zoho/testQuery', function (req, res) {
  var query = req.query.q;

  var norm = normalize(query);
  if(req.session.usrID == undefined)
    res.redirect('/login');
  norm.regID.push(req.session.usrID);
  console.log(norm);

  reStore.query.marks.getID.answer(norm, function result(err, doc){
    res.send(doc);
  });
});

app.get('/zoho/testAnswer', function(req, res){
  var ans = require('./routes/queryAnswer').init;
  ans.getID({query: "id of sayan das", usrID: "ra1411003010490"}, function result(err, doc){
    res.render(doc.template, doc);
  });
});

app.get('/zoho/*', function (req, res){
	res.redirect('/404/');
});
