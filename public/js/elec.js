const db=firebase.firestore();

db.collection("Elections").get().then(function(querySnapshot) {
    querySnapshot.docs.map(function(doc) {
        disp(doc.data().name,doc.data().venue,doc.id);
    });
}).catch(function(error) {
    console.log("Error getting User :", error);
});


var info_vote=[
    {
        id:"0",
        name:"Discipline Committee Head",
        venue:"SRMIST",
        nom:[
            {
                name:"Tom",
                age:"20",
                dept:"CSE",
                yos:"2nd Year",
                no_vote:"0"
            },
            {
                name:"Sejal",
                age:"19",
                dept:"EEE",
                yos:"2nd Year",
                no_vote:0
            },
            {
                name:"Ross",
                age:"19",
                dept:"ECE",
                yos:"2nd Year",
                no_vote:"0"
            },
            {
                name:"Rachel",
                age:"19",
                dept:"Bio Tech",
                yos:"2nd Year",
                no_vote:"0"
            },
            {
                name:"Monica",
                age:"21",
                dept:"CSE",
                yos:"2nd Year",
                no_vote:"0"
            }
        ]    
    },
    {
        id:"1",
        name:"Sports Committee Head",
        venue:"SRMIST",
        nom:[{
                name:"Harry",
                age:"21",
                dept:"CSE",
                yos:"2nd Year",
                no_vote:"0"
            },
            {
                name:"Rob",
                age:"20",
                dept:"ECE",
                yos:"2nd Year",
                no_vote:"0"
            },
            {
                name:"Bob",
                age:"20",
                dept:"Bio Tech",
                yos:"2nd Year",
                no_vote:"0"
            },
            {
                name:"Tom",
                age:"20",
                dept:"Mech",
                yos:"2nd Year",
                no_vote:"0"
            }
        ]
    },
]
//info_vote.forEach(disp);
function disp(name,venue,ind){
    document.querySelector(".cast_vote").innerHTML+='<div class="card mt-4">\
    <div class="card-header">'+name+'</div>\
    <div class="card-body">\
      <h5 class="card-title">'+venue+'</h5>\
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>\
      <a  id='+ind+' class="btn btn-primary">Place Vote</a>\
    </div>\
  </div>'
var v=document.getElementById(''+ind+'');
v.onclick=()=>{disp_nom(v.id)};
}

function disp_nom(item){
    document.querySelector(".nom_vote").innerHTML="";
    document.querySelector(".nom_vote_info").innerHTML="";
    document.querySelector(".choice").innerHTML='<option value="" disabled selected>Choose your Preferred Nominee</option>';
    $(document).ready(function(){
        $("#place_vote").modal("show");
    });
    var docRef=db.collection("Elections").doc(item);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            var obj=doc.data().nom;
            for(let key in obj)
            {
                disp_cand(obj[key],key);
            }
        } 
        else 
        {
           alert('Error Occured!');
        }
    }).catch(function(error) {
        console.log("Error getting User :", error);
    });
    document.querySelector(".vote_btn").innerHTML='<a id="'+item+'" class="btn choice_vote">Vote</a>'
    var d=document.querySelector('.choice_vote');
    d.onclick=()=>{placef_vote(d.id)};
}

function disp_cand(item,index)
{
    if(index==0)
    {
    document.querySelector(".nom_vote").innerHTML+='<li class="nav-item">\
    <a class="nav-link active" id="'+item["name"]+'-tab" data-toggle="tab" href="#'+index+'" role="tab">'+item["name"]+'</a>\
    </li>'
    document.querySelector(".nom_vote_info").innerHTML+='<div class="tab-pane fade show active" id="'+index+'" role="tabpanel">\
    <br><p><strong>Age: </strong>'+item["age"]+'</p>\
    <p><strong>Department: </strong>'+item["dept"]+'</p>\
    <p><strong>Year of Study: </strong>'+item["yos"]+'</p>\
    </div>'
    }
    else
    {
        document.querySelector(".nom_vote").innerHTML+='<li class="nav-item">\
        <a class="nav-link" id="'+item["name"]+'-tab" data-toggle="tab" href="#'+index+'" role="tab">'+item["name"]+'</a>\
        </li>'
        document.querySelector(".nom_vote_info").innerHTML+='<div class="tab-pane show" id="'+index+'" role="tabpanel">\
        <br><p><strong>Age: </strong>'+item["age"]+'</p>\
        <p><strong>Department: </strong>'+item["dept"]+'</p>\
        <p><strong>Year of Study: </strong>'+item["yos"]+'</p>\
        </div>'
    }
    document.querySelector(".choice").innerHTML+='<option value="'+index+'">'+item["name"]+'</option>'
}

function placef_vote(ind){
    var val=document.getElementById('nominee').value;
    var obj;
    //console.log(val);
    var docRef=db.collection("Elections").doc(ind);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log(typeof(doc));
            obj=doc.data().votes[val];
        } 
        else 
        {
           alert('Error Occured!');
        }

    }).catch(function(error) {
        console.log("Error getting User :", error);
    });
    docRef.votes.val.update(obl+1).then(function(){
        console.log("Vote Placed!");
    }).catch(function(err){
        console.log("Error",err);
    })

}