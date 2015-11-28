var alertMsg = ["How much I scored in oops, micro and ooad",
               "How much I scored in dcf"];

$(document).ready(function (){

  setInterval(function(){
    var ind = Math.floor((Math.random() * (alertMsg.length-1)) );
    notie.alert(4, "Search for \'"+alertMsg[ind]+"\'" , 3);
  }, 5000);

  $("#title, #search, footer").addClass('animated bounceInUp');
});
