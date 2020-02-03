const db=firebase.firestore();
document.getElementById('form').addEventListener('submit',verify);
document.getElementById('form-con').addEventListener('submit',conf);

function generateOTP() { 
          
    var digits = '0123456789'; 
    var OTP = ''; 
    for (i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
}
const code=generateOTP();
function mail(){
    const email=document.getElementById('email').value;
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
        obj.send(JSON.stringify({"email": email,"code":code}));
}
function verify(e){
        e.preventDefault();
        confirm_mod_show();
        mail();
        return false;
}
function conf(e){
    e.preventDefault();
    const cd=document.getElementById('code').value;
    if(cd==code)
    {
        confirm_mod_hide();
        submitsignupForm();
        setTimeout(()=>{location.reload(true)},2500);
    }
    else
    {
        var al=document.getElementsByClassName("al-w");
        al[0].style.display="block";
        setTimeout(confirm_mod_hide,2500);
        setTimeout(()=>{location.reload(true)},2500);
    }
}
function confirm_mod_show(){
    $(document).ready(function(){
            $("#vercode").modal("show");
        });
}
function confirm_mod_hide(){
    $(document).ready(function(){
            $("#vercode").modal("hide");
        });
}
function submitsignupForm(){
    const name=document.getElementById('name').value;
    const phn_num=document.getElementById('phn_num').value;
    const pass=document.getElementById('pass').value;
    const email=document.getElementById('email').value;
    var gen;
    if(document.getElementById('genM').checked==true)
    {
        gen=document.getElementById('genM').value;
    }
    else
    {
        gen=document.getElementById('genF').value;
    }
    const year=document.getElementById('year').value;
    const month=document.getElementById('month').value;
    const date=document.getElementById('date').value;
    
    submit(name,email,phn_num,pass,gen,year,month,date);
    
    var al=document.getElementsByClassName("al");
    al[0].style.display="block";
    setTimeout(()=>{al[0].style.display="none";},3000);
}
function submit(name,email,phn_num,pass,gen,year,month,date){

    db.collection('Users').doc(email).set({
        name:name,
        pass:pass,
        phn_num:phn_num,
        gen:gen,
        dob:date+"/"+month+"/"+year,
    }).then(function(){
        console.log("Database Updated!");
    }).catch(function(err){
        console.log("Error",err);
    })
}
