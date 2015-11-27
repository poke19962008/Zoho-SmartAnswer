var util = {
  "regID": /(ra)(1411003010)[0-7][0-9]{2}/g,
  "subCode": /((cs)|(ma)|(le)|(pd))10[0-9]{2}/g,

};

var synonym = {
  subject: {
    "TRANSFORMS AND BOUNDARY VALUE PROBLEMS" : /math|maths|ma1003/g,
    "ELECTRIC CIRCUITS": /(electrical)|(electric)|(ee)|(eee)|ee1053/g,
    "APTITUDE - I": /aptitude|apttitude|pd1003/g,
    "DIGITAL COMPUTER FUNDAMENTALS": /dcf|d\.c\.f|d\.c\.f\.|cs1003/g,
    "OBJECT ORIENTED PROGRAMMING": /oops|oop|o\.o\.p\.s|o\.o\.p\.s\.|o\.o\.p|o\.o\.p\./g,
    "MICROPROCESSOR AND INTERFACING": /micro|microprocessor|cs1007/g,
    "OBJECT ORIENTED ANALYSIS AND DESIGN": /ooad|oad|o\.o\.a\.d\.|o\.o\.a\.d|o\.a\.d\.|o\.a\.d|cs1009/g,
    "OBJECT ORIENTED PROGRAMMING LABORATORY": /(oops|oop|o\.o\.p\.s|o\.o\.p\.s\.|o\.o\.p|o\.o\.p\.) (lab|laboratory)|cs1031/g,
    "MICROPROCESSOR AND INTERFACING LABORATORY": /(micro|microprocessor) (lab|laboratory)|cs1033/g
  },

};

var bools = {
  attendance: /attendance/g,
  marks: /marks|scored?/g,
};

var query = {
  marks:{
    scoreInOneSubject: {
      queries: [/(how much i )?(scored?|marks?|got) (in )?((((cs)|(ma)|(le)|(pd))10[0-9]{2})|(math|maths)|((electrical)|(electric)|(ee)|(eee))|(aptitude|apttitude)|(dcf|d\.c\.f|d\.c\.f\.)|(oops|oop|o\.o\.p\.s|o\.o\.p\.s\.|o\.o\.p|o\.o\.p\.)|(ooad|oad|o\.o\.a\.d\.|o\.o\.a\.d|o\.a\.d\.|o\.a\.d)|((oops|oop|o\.o\.p\.s|o\.o\.p\.s\.|o\.o\.p|o\.o\.p\.) (lab|laboratory))|((micro|microprocessor) (lab|laboratory)))/g],

      extract: ["subCode", "subject"],

      need: ["regID", "subCode", "subject"],

      answer: function (data){
        return data;
      },
    },
  },

};

exports.util = util;
exports.synonym = synonym;
exports.query = query;
exports.bools = bools;
