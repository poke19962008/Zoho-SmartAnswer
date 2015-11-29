var nodeHost = "http://localhost:3000";

$(document).ready(function (){

  $.ajax({
    url: nodeHost + "/getQueryList",
    dataType: "json",
    cache: false,
  })
  .done(function (alertMsg){

    setInterval(function(){
      var ind = Math.floor((Math.random() * (alertMsg.length-1)) );
      notie.alert(4, "Search for \'"+alertMsg[ind]+"\'" , 3);
    }, 5000);

    $("#title, #search, footer").addClass('animated bounceInUp');
  });

});
