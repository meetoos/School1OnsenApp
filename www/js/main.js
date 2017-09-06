var homeworks=[{subject:"Deutsch",description:"Freiwillige Aufsatzstunde", date:"26.Mai 2017", completed:false},{subject:"Englisch",description:"Hand in a cartoon analysis or a comment or an email(use the worksheet as a resource)",date:" 22. Juni 2017", completed:false}];

document.addEventListener('init', function(event) {
  var page = event.target;

  if (page.id === 'home') {
    page.querySelector('#AddFab').onclick = function() {
      document.querySelector('#onsNavigator').pushPage('add.html');
    };
  }
  
  if (page.id === 'home') {
      page.querySelector('#accountButton').onclick = function () {
        if(firebase.auth().currentUser.email){
            document.querySelector('#onsNavigator').pushPage('account.html');
            
        }
        else{
            document.querySelector('#onsNavigator').pushPage('signup.html');
            var div=document.createElement('div');

            div.innerHTML="<ons-back-button>Home</ons-back-button>";
            document.getElementById("leftAccountToolbar");
        }
      };
  }

  
  /*if (page.id==='add') {
      page.querySelector("#saveFab").onclick = saveData();
      
  }*/
});


function loadHomeworks(blub){
  var homeworklist = document.getElementById("homeworklist");
  if (blub==="marked"){
    homeworklist.innerHTML = "";
  }  
  //alert("jap");
  for (var i=0; i<homeworks.length; i++)
  {
    if (homeworks[i].completed === false)
    {
      var data = homeworks[i];
      var shortDescription = data.description.replace(/^(.{20}).+/, "$1&hellip;");
      var date = data.date;
      var itemtemplate = '<ons-list-item  tappable onclick="HomeworkDialogFromTemplate('+"'"+date + "'"+',' + "'" + data.subject + "'" + ',' + "'" + data.description + "'" +')"><div class="left"><img class="list-item__thumbnail" src="http://placekitten.com/g/40/40"></div><div class="center"><span class="list-item__title">'+shortDescription+'</span><span class="list-item__subtitle">'+ date+ '</span></div></ons-list-item>';
      //alert(itemtemplate);
      var div = document.createElement('div');
      div.innerHTML = itemtemplate;

      document.getElementById("homeworklist").appendChild(div);
    }
    
  }
}

var homeworks=[{subject:"Deutsch",description:"Freiwillige Aufsatzstunde", date:"26.Mai 2017", completed:false},{subject:"Englisch",description:"Hand in a cartoon analysis or a comment or an email(use the worksheet as a resource)",date:" 22. Juni 2017", completed:false}];


function downloadData() {
    
}

function uploadData(su, de, da, group, entryid) {
    var database = firebase.database();
    var postRef = database.ref("entries/" + group);
    postRef.push().set({
        subject: su,
        description: de,
        date: da
        
    });
    document.querySelector('#onsNavigator').popPage().catch(function(){});
}

function saveData(){
    var subject = document.getElementById("subjectInput").value;
    var description = document.getElementById("descriptionInput").value;
    var group = document.getElementById("groupSelect").value;
    var date = new Date().toLocaleString();
    
    uploadData(subject, description, date, group);
    document.querySelector('#onsNavigator').popPage();
}

function HomeworkDialogFromTemplate(date, subject, description) {
    
  //document.getElementById('dialogTitle').textContent=subject;
  //document.getElementById('dialogText').textContent=description;
  var dialogtemplate = '<div style="text-align: left; padding: 10px;"><h2>'+ subject +'</h2><p>'+ description+'</p></div><ons-bottom-toolbar><div class="left"><ons-toolbar-button>Del</ons-toolbar-button></div><div class="center"><ons-toolbar-button>Cha</ons-toolbar-button></div><div class="right"><ons-toolbar-button>OK</ons-toolbar-button></div></ons-bottom-toolbar>'
  var dialogthing = document.createElement('ons-dialog');
  dialogthing.innerHTML = dialogtemplate;
  dialogthing.show();
  /*if (dialog) {
    dialog.show();
  }
  else {
    ons.createDialog(dialogthing)
      .then(function (dialog) {
        dialog.show();
      });
  }*/
}

function hideDialog(id){
    document.getElementById(id).hide();
}


function initialize(){
    
// Initialize Firebase
    var config = {
    apiKey: "AIzaSyCzeEMx761zfeCtxmCZXBp3OFMK6xTk7J4",
    authDomain: "school1monaca.firebaseapp.com",
    databaseURL: "https://school1monaca.firebaseio.com",
    projectId: "school1monaca",
    storageBucket: "school1monaca.appspot.com",
    messagingSenderId: "184878425436"
  };
  firebase.initializeApp(config);
  
  if (!firebase.auth().currentUser){
      //alert("not signed in yet");
      document.querySelector("#onsNavigator").pushPage('signup.html');
  }
  //load Homeworks
  loadHomeworks();
    
}

window.onload = initialize;