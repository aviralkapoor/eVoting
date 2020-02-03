function generateOTP() { 
          
    var digits = '0123456789'; 
    var OTP = ''; 
    for (i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
}
function submitEmailForm(form){
    const code=generateOTP();
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
    obj.send(JSON.stringify({"email": form.email.value,"code":code}));
    return false;
}