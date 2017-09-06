// This is a JavaScript file

function testAuth() {
    if (firebase.auth().currentUser){
        document.getElementById("onsNavigator").popPage();
        alert("Du bist jetzt angemeldet");
    }
    else{
        alert("Es gab einen unbekannten Fehler bei der Anmeldung");
    }
}

function handleSignup(){
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  if (email.length < 4) {
        alert('Gib bitte eine Email-Adresse an.');
        return;
  }
      if (password.length < 4) {
        alert('Gib bitte ein längeres Passwort an.');
        return;
  }
    
  //Start create with email
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
          alert('Das Passwort ist zu schwach.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
  //End create with mail  
  
  //continue sign up process here
  //document.getElementById("onsNavigator").pushPage('SignupDetails.html');
}

function toggleSignin() {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
            alert('Gib bitte eine Email-Adresse an.');
            return;
      }
          if (password.length < 4) {
            alert('Gib bitte ein längeres Passwort an.');
            return;
      }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Falsches Passwort.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      //document.getElementById('quickstart-sign-in').disabled = false;
      // [END_EXCLUDE]
    });
    // [END authwithemail]
  }
  //document.getElementById('quickstart-sign-in').disabled = true;
  testAuth();
}

function noSignup() {
    firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage);
  // ...
    });
  testAuth();    
}







