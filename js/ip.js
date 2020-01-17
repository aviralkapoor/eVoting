$.get('https://ipinfo.io',function(response){
    $("#ip").html('IP: <b>'+response.ip+'</b>');
},'jsonp');