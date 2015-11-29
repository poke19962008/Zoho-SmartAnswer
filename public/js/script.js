var nodeHost = "http://localhost:3000";

function getCookieValue(cookie, value){
  for (var i = 0; i < cookie.length; i++) {
    var data = cookie[i].split("=");
    if(data[0] == value){
      return data[1];
    }
  }
}

$(document).ready(function (){
  var dataCookie = document.cookie.split("; ");
  if(getCookieValue(dataCookie, "isLoggedIn") != "true")
    document.redirect = nodeHost + "/login";

  $.ajax({
    url: nodeHost + "/getQueryList",
    dataType: "json",
    cache: false,
  })
  .done(function (alertMsg){

    setInterval(function(){
      var ind = Math.floor((Math.random() * (alertMsg.length-1)) );
      notie.alert(4, "Search for \'"+alertMsg[ind]+"\'" , 3);
    }, 6000);

    $("#title, #search, footer").addClass('animated bounceInUp');
  });


});
