var nodeHost = "http://104.236.192.93:3000";

$(document).ready(function (){
});

$("#login-btn").click(function (){
  $.ajax({
    url: nodeHost + "/createSession",
    data: { id: $("#login-inp").val() },
    dataType: 'json',
    cache: false,
  })
  .done(function (msg){
    if(msg.status == "success"){
      document.location = nodeHost + "/";
      document.cookie = "isLoggedIn=true; expires="+new Date(Date.now() + 36000000)+"; path=/;";
    }
    else if(msg.status == "not Valid")
      notie.alert(3, "Enter valid ID.", 2);
    else
      notie.alert(3, "Something Went Wrong :(", 2);

  })
  .error(function (){
    notie.alert(3 ,"Connected to Internet?? O_o" , 2);
  });
});
