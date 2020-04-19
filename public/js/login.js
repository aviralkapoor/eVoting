function login_user(){
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
        var obj = new XMLHttpRequest();
        obj.onreadystatechange = function(){
            if(obj.readyState == 4){
                if(obj.status == 200){
                    var x = JSON.parse(obj.responseText);
                    localStorage.setItem("user",x.name);
                    window.location.href = x.url;
                }
                else{
                    alert("XMLHttp Status: "+obj.status+";"+obj.statusText);
                }
            }
        };
        obj.open("post","/login/",true);
        obj.setRequestHeader("Content-Type","application/json");
        obj.send(JSON.stringify({"email": email,"password":password}));
}


function info(){
    document.querySelector('#wel').innerHTML=localStorage.getItem("user");
}

function logout(){
    localStorage.setItem("user",null);
    window.open('/index.html','_self');
}