var answers = require('./queryAnswer').init;

var util = {
  "regID": /(ra)(1411003010)[0-7][0-9]{2}/g,
  "subCode": /((cs)|(ma)|(le)|(pd))10[0-9]{2}/g,

};

var synonym = {
  subject: {
    "MA1003" : /math|maths|ma1003/g,
    "EE1053": /(electrical)|(electric)|(ee)|(eee)|ee1053/g,
    "PD1003": /aptitude( - (I|1|i))?|apttitude|pd1003/g,
    "CS1003": /(digital computer fundamentals)|dcf|d\.c\.f|d\.c\.f\.|cs1003/g,
    "CS1005": /(object oriented programming)|oops?|o\.o\.p(\.s)?(\.)?/g,
    "CS1007": /(microprocessor and interfacing)|micro|microprocessor|cs1007/g,
    "CS1009": /(object oriented analysis and design)|ooad|oad|o\.o\.a\.d\.|o\.o\.a\.d|o\.a\.d\.|o\.a\.d|cs1009/g,
    "CS1031": /((object oriented programming)|oops?|o\.o\.p(\.s)?(\.)?) (lab|laboratory)|cs1031/g,
    "CS1033": /((microprocessor and interfacing)|micro|microprocessor) (lab|laboratory)|cs1033/g
  },

};

var bools = {
  attendance: /attendance/g,
  marks: /marks|scored?/g,
};

var query = {
  marks:{
    scoreInOneSubject: {
      queries: [/(how much i )?(scored?|marks?|got)( in )?((((cs)|(ma)|(le)|(pd))10[0-9]{2})|(math|maths)|((electrical)|(electric)|(ee)|(eee))|(aptitude|apttitude)|(dcf|d\.c\.f|d\.c\.f\.)|(oops?|o\.o\.p(\.s)?(\.)?)|(ooad|oad|o\.o\.a\.d\.|o\.o\.a\.d|o\.a\.d\.|o\.a\.d)|((oops?|o\.o\.p(\.s)?(\.)?) (lab|laboratory))|((micro|microprocessor) (lab|laboratory)))(?![a-z]?(,|and))/g],

      answer: answers.scoreInOneSubject,
    },

    scoreInMultipleSubject:{
      queries: [
        /(how much i )?(scored?|marks?|got)( in)? (((((((cs)|(ma)|(le)|(pd))10[0-9]{2})|(math|maths)|((electrical)|(electric)|(ee)|(eee))|(aptitude|apttitude)|(dcf|d\.c\.f|d\.c\.f\.)|(oops?|o\.o\.p(\.s)?(\.)?)|(ooad|oad|o\.o\.a\.d\.|o\.o\.a\.d|o\.a\.d\.|o\.a\.d)|((oops?|o\.o\.p(\.s)?(\.)?) (lab|laboratory))|((micro|microprocessor) (lab|laboratory)))( ?,? ?)){2,}( ?(and|&) ((((cs)|(ma)|(le)|(pd))10[0-9]{2})|(math|maths)|((electrical)|(electric)|(ee)|(eee))|(aptitude|apttitude)|(dcf|d\.c\.f|d\.c\.f\.)|(oops?|o\.o\.p(\.s)?(\.)?)|(ooad|oad|o\.o\.a\.d\.|o\.o\.a\.d|o\.a\.d\.|o\.a\.d)|((oops?|o\.o\.p(\.s)?(\.)?) (lab|laboratory))|((micro|microprocessor) (lab|laboratory))))?))|(((((cs)|(ma)|(le)|(pd))10[0-9]{2})|(math|maths)|((electrical)|(electric)|(ee)|(eee))|(aptitude|apttitude)|(dcf|d\.c\.f|d\.c\.f\.)|(oops?|o\.o\.p(\.s)?(\.)?)|(ooad|oad|o\.o\.a\.d\.|o\.o\.a\.d|o\.a\.d\.|o\.a\.d)|((oops?|o\.o\.p(\.s)?(\.)?) (lab|laboratory))|((micro|microprocessor) (lab|laboratory))) (and|&) ((((cs)|(ma)|(le)|(pd))10[0-9]{2})|(math|maths)|((electrical)|(electric)|(ee)|(eee))|(aptitude|apttitude)|(dcf|d\.c\.f|d\.c\.f\.)|(oops?|o\.o\.p(\.s)?(\.)?)|(ooad|oad|o\.o\.a\.d\.|o\.o\.a\.d|o\.a\.d\.|o\.a\.d)|((oops?|o\.o\.p(\.s)?(\.)?) (lab|laboratory))|((micro|microprocessor) (lab|laboratory))))/g
      ],

      answer: answers.scoreInMultipleSubject,
    },
  },

};

exports.util = util;
exports.synonym = synonym;
exports.query = query;
exports.bools = bools;
