var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoStore = require('connect-mongo')(session);
var config = require('./config').load();

var app_3000 = express()

app_3000.use(cookieParser());

app_3000.use(session({
  secret: config.session.secret,
  saveUninitialized: true,
  resave: true,

  cookie: {                  // Cookie configs
    expires: new Date(Date.now() + config.session.expiration),
    maxAge: config.session.expiration,
  },

  store: new mongoStore({     // Mongo Store configs
    url: config.mongo.uri,
    autoRemove: 'native', // Remove all the expired sessions
    collection: 'session', // COllection name
  }),
}));

app_3000.use(express.static(__dirname + "/public"));
app_3000.set('views', __dirname + "/views");
app_3000.set('view engine', 'jade');

app_3000.listen(3000, function(){
  console.log("Listening on port 3000");
});

exports.port_3000 = app_3000;
