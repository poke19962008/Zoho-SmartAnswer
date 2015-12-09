var nodeHost = "http://104.236.192.93:3000";

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
      notie.alert(4, "Search for \'"+alertMsg[ind]+"\'" , 6);
    }, 6000);

    $("#loading").remove();
    $("#title, .container, footer").css("visibility", "visible");
    $("#title, #search, footer").addClass('animated bounceInUp');
  });
});

$("#search").keyup(function (e){
  if(e.keyCode == "13"){
   $("#card-div").html("<center><div style=\"margin-bottom: 20px;\" class=\"loader-inner ball-grid-pulse\"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><div style=\"margin-bottom: 60px;\"></div></center>");
    
    $.ajax({
      url: nodeHost + "/query",
      data: { q: $('#search').val() },
      dataType: 'html',
      cache: false,
    })
    .done(function (msg){
      if(msg == "session expired")
        window.location = nodeHost + "/login";
      else
        $("#card-div").html(msg);
    });
  }
});
