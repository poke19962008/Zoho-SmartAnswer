var mongoose = require('mongoose');
var studentSchema = require('./schema').student;
var config = require('../config').load();

mongoose.connect(config.mongo.uri);

var student = mongoose.model('student', studentSchema);
