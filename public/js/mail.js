function submitEmailForm(form){
    var obj = new XMLHttpRequest();
    obj.onreadystatechange = function(){
        if(obj.readyState == 4){
            if(obj.status == 200){
                var x = JSON.parse(obj.responseText);
                alert(x.message);
            }
            else{
                alert("XMLHttp Status: "+obj.status+";"+obj.statusText);
            }
        }
    };
    obj.open("post",form.action,true);
    obj.setRequestHeader("Content-Type","application/json");
    obj.send(JSON.stringify({"email": form.email.value}));
    return false;
}