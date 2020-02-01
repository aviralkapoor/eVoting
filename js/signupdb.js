function verify(email) {
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

    obj.open("post","/ajax/email",true);
    obj.setRequestHeader("Content-Type","application/json");
    obj.send(JSON.stringify({"email": email.value}));
    return false;
}






function submitsignupForm(form){
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
    obj.send(JSON.stringify({"name": form.name.value,"email": form.email.value,"pass": form.pass.value,"phn_num": form.phn_num.value,"gen": form.gen.value,"day": form.day.value,"month": form.month.value, "year": form.year.value}));
    return false;
}