var util = {
  "regID": /(ra)(1411003010)[0-7][0-9]{2}/g,
  "subCode": /((cs)|(ma)|(le)|(pd))10[0-9]{2}/g,

};

var synonym = {
  subject: {
    "TRANSFORMS AND BOUNDARY VALUE PROBLEMS" : /math|maths/g,
    "ELECTRIC CIRCUITS": /(electrical)|(electric)|(ee)|(eee)/g,
    "APTITUDE - I": /aptitude|apttitude/g,
    "DIGITAL COMPUTER FUNDAMENTALS": /dcf|d\.c\.f|d\.c\.f\./g,
    "OBJECT ORIENTED PROGRAMMING": /oops|oop|o\.o\.p\.s|o\.o\.p\.s\.|o\.o\.p|o\.o\.p\./g,
    "MICROPROCESSOR AND INTERFACING": /micro|microprocessor/g,
    "OBJECT ORIENTED ANALYSIS AND DESIGN": /ooad|oad|o\.o\.a\.d\.|o\.o\.a\.d|o\.a\.d\.|o\.a\.d/g,
    "OBJECT ORIENTED PROGRAMMING LABORATORY": /(oops|oop|o\.o\.p\.s|o\.o\.p\.s\.|o\.o\.p|o\.o\.p\.) (lab|laboratory)/g,
    "MICROPROCESSOR AND INTERFACING LABORATORY": /(micro|microprocessor) (lab|laboratory)/g
  },
  attendance: /attendance/g,
};

var query = {
  scoreInOneSubject: {
    queries: [/(how much i )?(scored?|marks?|got) (in )?((((cs)|(ma)|(le)|(pd))10[0-9]{2})|(math|maths)|((electrical)|(electric)|(ee)|(eee))|(aptitude|apttitude)|(dcf|d\.c\.f|d\.c\.f\.)|(oops|oop|o\.o\.p\.s|o\.o\.p\.s\.|o\.o\.p|o\.o\.p\.)|(ooad|oad|o\.o\.a\.d\.|o\.o\.a\.d|o\.a\.d\.|o\.a\.d)|((oops|oop|o\.o\.p\.s|o\.o\.p\.s\.|o\.o\.p|o\.o\.p\.) (lab|laboratory))|((micro|microprocessor) (lab|laboratory)))/g],

    extract: ["subCode", "subject"],
    
    need: ["regID", "subCode", "subject"],

    answer: function (data){
      return data;
    },
  },

};

exports.util = util;
exports.synonym = synonym;
exports.query = query;
