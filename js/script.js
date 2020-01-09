function addText_conduct(item){
    var content = document.getElementsByClassName("conduct-content");
  for (i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }
    document.getElementById(item).style.display="block";
}