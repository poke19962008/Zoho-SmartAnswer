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

var subjectRe = "(math|maths|ma1003)|((electrical)|(electric)|(ee)|(eee)|ee1053)|((digital computer fundamentals)|dcf|d\.c\.f|d\.c\.f\.|cs1003)|((object oriented programming)|oops?|o\.o\.p(\.s)?(\.)?)|((microprocessor and interfacing)|micro|microprocessor|cs1007)|((object oriented analysis and design)|ooad|oad|o\.o\.a\.d\.|o\.o\.a\.d|o\.a\.d\.|o\.a\.d|cs1009)|(((object oriented programming)|oops?|o\.o\.p(\.s)?(\.)?) (lab|laboratory)|cs1031)|(((microprocessor and interfacing)|micro|microprocessor) (lab|laboratory)|cs1033)";

var regIDRe = "(ra|RA)(1411003010)[0-7][0-9]{2}";

var bools = {
  attendance: /attendance/g,
  marks: /marks|scored?|fail(ed)?|((pass(ed)?)|(drop(p?ed)?)|(performed|performance))|compare/g,
  info: /id/g
};

var query = {
  marks:{
    scoreInOneSubject: {
      queries: ["((how much i )|(what('?s) my ))?(scored?|marks?|got)( in )?("+subjectRe+")( ?\?)?$"],

      answer: answers.scoreInOneSubject,
    },

    scoreInMultipleSubject:{
      queries: [
        "((how much i )|(what('?s) my ))?(scored?|marks?|got)( in)? (((("+subjectRe+")( ?,? ?)){2,}( ?(and|&) ("+subjectRe+"))?))|(("+subjectRe+") (and|&) ("+subjectRe+"))"
      ],

      answer: answers.scoreInMultipleSubject,
    },

    failedSubjects: {
      queries: [
        "((in)? (what|which|(how many)) )?(subjects?|courses?|subs?) ((i (have)?)|(i))? ((failed(ed)?)|(drop(p?ed)?))( ?\?)?$"
      ],

      answer: answers.failedSubjects,
    },

    overallPassInOneSubject: {
      queries: [
        "((how many )|overall |all ?)?( the ?)?students? pass(ed)? (in )?("+subjectRe+")"
      ],

      answer: answers.overallPassInOneSubject,
    },

    overallFailInOneSubject: {
      queries: [
        "((how many )|overall |all ?)?( the ?)?students? fail(ed)? (in )?("+subjectRe+")"
      ],

      answer: answers.overallFailInOneSubject,
    },

    friendScoreInOneSubject: {
      queries: [
        "(what is the )?(scores?|performance)( of)? ("+regIDRe+")( in)?( "+subjectRe+")",
        "how "+regIDRe+" (performed|scored) in "+subjectRe,
      ],

      answer: answers.friendScoreInOneSubject,
    },

    friendScoreInAllSubject: {
      queries: [
        "((overall |complete )?(scores?|performance) of ("+regIDRe+"))",
        "((how much )|(what('?s) )|(overall ))?("+regIDRe+") (score(d|s)?|performance|performed)"
      ],

      answer: answers.friendScoreInAllSubject,
    },

    compareInAllSubject: {
        queries: [
          "compare (me|myself|(my performance)) (with|wrt|(with respect to)|(w\.r\.t(\.)?)) "+regIDRe,
        ],

        answer: answers.compareInAllSubject,
    },

    scoreInAllSubjects: {
	    queries: [
	      "((my )?(overall|complete) (scores?|(score card)|performance)( ?\?)?)$"
      ],

	      answer: answers.scoreInAllSubjects,
    },
  },

  info: {
    getID: {
      queries: [
        "(what is (the)?)?(id|(reg\.? i\.?d\.?)|(registration i\.?d\.?)) of"
      ],

      answer: answers.getID,
    },
  }
};

exports.util = util;
exports.synonym = synonym;
exports.query = query;
exports.bools = bools;
