function addText_conduct(item){
    var content = document.getElementsByClassName("conduct-content");
  for (i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }
    document.getElementById(item).style.display="block";
}
//document.getElementById('form').addEventListener('submit',nominee);
var sub;
function nominee(e){
  e.preventDefault();
  sub=document.getElementById('sub').value;
  localStorage.setItem("sub",sub);
  window.open("../nomineeform.html","_self");
}
function disp(){
  document.getElementById('nom').innerHTML="Nominee form for "+localStorage.getItem("sub");
  return;
}

//var fm=document.getElementById('form').value;
function addcand()
{
document.getElementById('cand').innerHTML+="<hr>"+fm;
}
function removecand()
{
document.getElementById('cand').innerHTML="";
}