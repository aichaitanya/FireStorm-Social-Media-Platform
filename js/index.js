const firebaseConfig = {
    apiKey: "AIzaSyArlCXi0yPqRMAYR-Rh2mnnGnOWZTUTlIo",
    authDomain: "firestorm-f6930.firebaseapp.com",
    databaseURL: "https://firestorm-f6930.firebaseio.com",
    projectId: "firestorm-f6930",
    storageBucket: "firestorm-f6930.appspot.com",
    messagingSenderId: "336000827720",
    appId: "1:336000827720:web:ec07f6bb87f67293"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.auth.Auth.Persistence.LOCAL;

  //Login
  $("#btn-login").click(function(){
      var email = $("#email").val();
      var password = $("#password").val();

      if(email != "" && password != ""){
          var result = firebase.auth().signInWithEmailAndPassword(email, password);

          result.catch(function(error){
              var errorCode = error.code;
              var errorMessage = error.message;

              console.log(errorCode);
              console.log(errorMessage);
  
              window.alert("Message : "+errorMessage);
          });
      }
      else {
          window.alert("Please enter the Email ID & Password ....");
      }
  });

  //Logout
  $("#btn-logout").click(function(){
    firebase.auth().signOut().then(function() {
        window.location.href="signin.html";
        // Sign-out successful.
        console.log("Signed Out");
      }).catch(function(error) {
        // An error happened.
        console.log("Error : "+error);
      });
    });


  //SignUp
 $("#btn-signup").click(function(){
      var email = $("#email").val();
      var password = $("#password").val();
      var cPassword = $("#confirmPassword").val();

      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");

      if(email != "" && password != "" && cPassword != ""){
          if(password == cPassword){
              if(strongRegex.test(password)){
                var result = firebase.auth().createUserWithEmailAndPassword(email, password);

                result.catch(function(error){
                    var errorCode = error.code;
                    var errorMessage = error.message;
          
                    console.log(errorCode);
                    console.log(errorMessage);
            
                    window.alert("Message : "+errorMessage);
                });                
              }
              else {
                  window.alert("Password must contain atleast 8 digits or numeric with Upper,Lower & Special Characters  ....");
              }
          }
          else {
            window.alert("Please check your password, Password & Confirm Password should be matched ....");
          }
      }
      else {
          window.alert("Please enter the Email ID & Password ....");
      }
  });

  //Reset Password
  $("#btn-resetPassword").click(function(){
    var auth = firebase.auth();
    var email = $("#email").val();

    if(email != "") {
        auth.sendPasswordResetEmail(email).then(function(){
            window.alert("Email has been sent, Please check and verify.");
            window.location.href="signin.html";
        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
  
            console.log(errorCode);
            console.log(errorMessage);
    
            window.alert("Message : "+errorMessage);
        });
    }
    else {
        alert("Please enter your Email ID ....");
    }
});

//Account Settings
$("#btn-update").click(function(){

    var phone = $("#phone").val();
    var address = $("#address").val();
    var bio = $("#bio").val();
    var fName = $("#firstName").val();
    var sName = $("#secondName").val();
    var country = $("#country").val();
    var gender = $("#gender").val();


    //var userCur = firebase.auth().currentUser;

    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if(fName!="" && sName!="" && phone!="" && country!="" && gender!="" && bio!="" && address!="") {
        var userData = {
            "phone" : phone,
            "address" : address,
            "bio" : bio,
            "firstName" : fName,
            "secondName" : sName,
            "country" : country,
            "gender" : gender,
            //"photoUrl" : userCur.photoURL,
        };
        usersRef.set(userData, function(error){
            if(error){
                var errorCode = error.code;
                var errorMessage = error.message;
      
                console.log(errorCode);
                console.log(errorMessage);
        
                window.alert("Message : "+errorMessage);
            }
            else {
                window.location.href = "index.html";
            }
        });
    }
    else {
        window.alert("Please enter required Fields ...");
    } 
});

function switchView(view){
    $.get({
        url:view,
        cache:false,
    })
    .then(function(data){
        $("#container").html(data);
    });
}

