var app = require('./expressApp').port_3000;
var reStore = require('./routes/regexStore');
var normalize = require('./routes/normalize').normalize;

app.get('/', function (req, res){
  var query = req.query.q;

  normalize(query);
});
