var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subject = {
  "qat" : String,
  "pt" : String,
  "ct1" : String,
  "ct2" : String,
  "st" : String,
  "mt" : String,
  "attendance" : String,
  "faculty" : String,
  "tile" : String,
  "internal" : String,
};

var main = new Schema({
  "_id" : String,
  "dept" : String,
  "name" : String,
  "course" : {
    "" : {  },
    "MA1003" : subject,
    "CS1033" : subject,
    "CS1031" : subject,
    "CS1003" : subject,
    "EE1053" : subject,
    "LE1004" : subject,
    "CS1005" : subject,
    "CS1007" : subject,
    "CS1009" : subject
  }
});



exports.student = main;
