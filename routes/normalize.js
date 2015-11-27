var reStore = require('./regexStore');

function init(query){

  var data = {
    subject: [],
    regID: [],
    bools: {},
  };


  var patt = reStore.util.regID;
  var words = query.split(" ");
  for(var i in words)
    if(new RegExp(patt).test(words[i])) data.regID.push(words[i]);

  var subject = reStore.synonym.subject;
  for(var key in subject){
    var patt = new RegExp(subject[key]);
    if(patt.test(query)) data["subject"].push(key);
  }

  var bools = reStore.bools;
  for(var key in bools){
    var patt = new RegExp(bools[key]);

    if(patt.test(query)) data.bools[key] = true;
    else data.bools[key] = false;
  }

  return data;
}

exports.normalize = init;
