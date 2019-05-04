// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCafmplLd0Do2Eaoia_Uer52D6hg40j0RE",
    authDomain: "swolemates-22427.firebaseapp.com",
    databaseURL: "https://swolemates-22427.firebaseio.com",
    projectId: "swolemates-22427",
    storageBucket: "swolemates-22427.appspot.com",
    messagingSenderId: "522806249949"
  };


  firebase.initializeApp(config);
  var db = firebase.firestore();


  ///////////// ON-CLICK function for transferring user's username and password into FireStore ////////////
$(".get-started-button").on("click", function(event) {
  event.preventDefault();

  var userObjectInformation = {};      // { username: username, password: password}
  var username = $("#input-username").val();              // user's username input
  var password = $("#input-password").val();             // user's password input
  var existingUsernameArray = [];        // Array of user's existing usernames
  

     db.collection("existingUsernames").get().then(function(querySnapshot) {
       querySnapshot.forEach(function(doc) {
         existingUsernameArray.push(doc.data().username);            // Putting all existing usernames in an array
       });

       if (username === "") {
        $(".existing-username-text").remove();
        $(".password-length-wrong").remove();
        $(".blank-username-text").remove();
        var blankUsernameContainer = $("<small>");
        blankUsernameContainer.addClass("form-text text-muted blank-username-text");
        blankUsernameContainer.text("Please type a valid username.");
        $(".username-input-form").append(blankUsernameContainer);
      }
      
      else if ((existingUsernameArray.includes(username) === false) && (password.length >= 8 && password.length <= 20)) {    // if the current list of already existing usernames does NOT include the username that the user typed in...
         
        userObjectInformation.username = username;             // pushes un-used usernames into the userObjectInformation object
        userObjectInformation.password = password;
         
         db.collection("existingUsernames").doc().set({          // Adds that un-used username to a usernames doc in firestore
           username: username
           })
           .then(function() {
           console.log("Document successfully written!");
           })
           .catch(function(error) {
           console.error("Error writing document: ", error);
           });
          $('#modal2').modal('hide');
          $('#modal15').modal('show');

       } else if ((existingUsernameArray.includes(username) === true) && (password.length >= 8 && password.length <= 20)) {         // if there is already an existing username
         $(".password-length-wrong").remove();
         $(".existing-username-text").remove();
         $(".blank-username-text").remove();
         var wrongUsernameContainer = $("<small>");
         wrongUsernameContainer.addClass("form-text text-muted existing-username-text");
         wrongUsernameContainer.text("This username is already taken. Please go bo back to the login screen or use a different username.");
         $(".username-input-form").append(wrongUsernameContainer);
       } else if ((existingUsernameArray.includes(username) === false) && (password.length = 8 || password.length > 20)) {         // if there is already an existing username
        $(".existing-username-text").remove();
        $(".password-length-wrong").remove();
        $(".blank-username-text").remove();
        var invalidPasswordContainer = $("<small>");
        invalidPasswordContainer.addClass("form-text text-muted password-length-wrong");
        invalidPasswordContainer.text("Your password is an invalid length!");
        $("#passwordHelpBlock").append(invalidPasswordContainer);
      } else if ((existingUsernameArray.includes(username) === true) && (password.length < 8 || password.length > 20)) {         // if there is already an existing username
        $(".existing-username-text").remove();
        $(".password-length-wrong").remove();
        $(".blank-username-text").remove();
        var wrongUsernameContainer = $("<small>");
        wrongUsernameContainer.addClass("form-text text-muted existing-username-text");
        wrongUsernameContainer.text("This username is already taken. Please go bo back to the login screen or use a different username.");
        $(".username-input-form").append(wrongUsernameContainer);
        var invalidPasswordContainer = $("<small>");
        invalidPasswordContainer.addClass("form-text text-muted password-length-wrong");
        invalidPasswordContainer.text("Your password is an invalid length!");
        $("#passwordHelpBlock").append(invalidPasswordContainer);
      };
     });  
      
    
  $(".profile-completion-button").on("click", function() {     // ON-CLICK FUNCTION FOR PROFILE BUTTON AFTER SIGN-UP MODAL CONDITION IS MET
    var userName = $("#name").val();
    var userGender = $("#gender").val();             // user's gender input
    var userLocation = $("#location").val();           // user's location input
    var userAge = $("#age").val();             // user's age input
    var userWeight = $("#weight").val();            // user's weight input
    var userActivityLevel = $("#activity").val();             // user's activity level input
    var userExperienceLevel = $("#experience").val();             // user's experience level input
    var userProfileBlurb = $("#why-swole").val();           // user's profile blurb input
    var userProfilePicture = $("#photo-input").val();      // profile-picture file path
    var userProfileArray = [];

    userProfileArray.push(userName);               // pushing all the user's profile information into an array
    userProfileArray.push(userGender);             
    userProfileArray.push(userLocation);
    userProfileArray.push(userAge);
    userProfileArray.push(userWeight);
    userProfileArray.push(userActivityLevel);
    userProfileArray.push(userExperienceLevel);
    userProfileArray.push(userProfileBlurb);
    userProfileArray.push(userProfilePicture);

    userObjectInformation.userProfileInformation = userProfileArray;          // pushing the array into the user information object
    console.log('2nd page ',userObjectInformation);


    $("#finish-user-info-button").on("click", function() { 
      console.log("user profile array", userProfileArray);

      event.preventDefault();     // ON-CLICK FUNCTION FOR PREFERENCES BUTTON AFTER PROFILE INPUT MODAL
      var userPreferenceLocation = $("#user-preference-location").val();           // user's location preference input
      var userWeekdayAvailability = $("#weekday-availability").val();      //user's weekday availability
      var userWeekendAvailability = $("#weekend-availability").val();      //user's weekend availability
      var userFitnessGoals = $("#fitness-goal").val();            // user's weight input
      var userSwolemateGender = $("#gender-preference").val();             // user's activity level input
      
      userObjectInformation.userPreferenceLocation = userPreferenceLocation;        // pushing the user preferences array into user profile array (array within array)
      userObjectInformation.userWeekdayAvailability = userWeekdayAvailability;
      userObjectInformation.userWeekendAvailability = userWeekendAvailability;
      userObjectInformation.userFitnessGoals = userFitnessGoals;
      userObjectInformation.userSwolemateGender = userSwolemateGender;
      console.log('3rd page ',userObjectInformation);
      
      
      db.collection("allUserInformation").doc().set({          // Creating the collection database and storing the user's Object information in Firestore
        userObjectInformation: userObjectInformation
        })
        .then(function() {
        console.log("Document successfully written!");
        })
        .catch(function(error) {
        console.error("Error writing document: ", error);
        });
        // Once user presses the finish button the login modal automatically pops up
      });
    });
  });




/////////////// ON-CLICK EVENT FOR LOGIN PAGE - CHECKS FOR IF USERNAME AND PASSWORD ARE CORRECT ///////////////
$(".sign-in-button").on("click", function(event) {
  
  db.collection("currentUsersPreferences").doc("UsZpSo6kUVDWQfh3FdUz").delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
  });
  
  event.preventDefault();
  var loginUsername = $("#login-username").val();              // user's username input
  var loginPassword = $("#login-password").val();             // user's password input
  var existingUsernames = [];
  var existingPasswords = [];
  var count = 0;
  
  db.collection("allUserInformation").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      existingUsernames.push(doc.data().userObjectInformation.username);
      existingPasswords.push(doc.data().userObjectInformation.password);
      if ((doc.data().userObjectInformation.username === loginUsername) && (doc.data().userObjectInformation.password === loginPassword)) {          // If username and password match an existing one...
        window.location.href = "MatchMe.html"; 
        console.log("Worked")
        db.collection("currentUsersPreferences").doc("UsZpSo6kUVDWQfh3FdUz").set({          // Creating the current user's preferences in firestore
        currentUserPreferenceLocation: doc.data().userObjectInformation.userPreferenceLocation,
        currentUserFitnessGoals: doc.data().userObjectInformation.userFitnessGoals,
        currentUserSwolemateGender: doc.data().userObjectInformation.userSwolemateGender,
        currentUserWeekdayAvailability: doc.data().userObjectInformation.userWeekdayAvailability,
        currentUserWeekendAvailability: doc.data().userObjectInformation.userWeekendAvailability,
        currentUserFirstAndLastName: doc.data().userObjectInformation.userProfileInformation[0]
        });
      }; 
    });
      for (var i = 0; i<existingUsernames.length; i++) {
      if ((existingUsernames[i] === loginUsername) && (existingPasswords[i] === loginPassword)) {        // CODE BELOW DISPLAYS ONE ERROR MESSAGE IF USERNAME AND PASSWORD ARE INCORRECT     
        count++;
      };
    };
      if (count < 1) {
      $(".wrong-loginInfo-text").remove();
      var loginErrorContainer = $("<small>");
      loginErrorContainer.addClass("form-text text-muted wrong-loginInfo-text");
      loginErrorContainer.text("Your username and/or password information are incorrect. Please try again.");
      $(".user-login-password-container").append(loginErrorContainer); 
      };
    });
    $("#login-username").val(""); 
    $("#login-password").val("");
  });
  

////////////////// Google maps API Request -- Autocomplete ////////////////////////
// location profile request 
function initiate() {
  var input = document.getElementById('location');
  var autocomplete = new google.maps.places.Autocomplete(input);
  console.log("api worked");
};
google.maps.event.addDomListener(window, 'load', initiate);
//location preferences request 

function initiate2() {
  var inputUser = document.getElementById('user-preference-location');
  var autocomplete = new google.maps.places.Autocomplete(inputUser);
};
google.maps.event.addDomListener(window, 'load', initiate2);

// function initiate3() {
//   var inputUser = document.getElementById('findGym');
//   var autocomplete = new google.maps.places.Autocomplete(inputUser);
// };
// google.maps.event.addDomListener(window, 'load', initiate3);


//////////////////// SOUND CLOUD API WIDGET On Click//////////////////////////////

$(".fa-soundcloud").on("click", function (){
  $("#sc-widget").remove();
  $(".widget-empty-div").append("<iframe id='sc-widget' width='100%' height='166' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https://soundcloud.com/user-160781157/sets/workout&show_artwork=true'></iframe>")
})


//////// Function for shuffling elements in an array //////////////
/*

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  };
  return array;
};
*/

////////////////////////////////////   BEGINNING CODE FOR MATCHING SYSTEM   //////////////////////////////////

///////////////// Match Card Generator Function that will go inside "Match Me" ON-CLICK ////////////////////

/*
var otherUsersPreferencesArray = [];        // each index of this array will have an array of another user's preferences
var otherUsersProfileArray = [];      // each index of this array will have an array of another user's profile information
var eachUsersProfileInformation = [];       // goes into the array above
*/
 
// currentUserPreferencesArray
$(".current-matches-match-button").hide();
$("#current-matches-container").hide();
$("#get-matched").on("click", function() {

  $(".fa-soundcloud").remove();
  $(".current-matches-match-button").show();
  var currentUserPreferencesArray2 = [];
  var userFullName = "";

  db.collection("currentUsersPreferences").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        currentUserPreferencesArray2.push(doc.data().currentUserPreferenceLocation);
        currentUserPreferencesArray2.push(doc.data().currentUserFitnessGoals);
        currentUserPreferencesArray2.push(doc.data().currentUserSwolemateGender);
        currentUserPreferencesArray2.push(doc.data().currentUserWeekdayAvailability);
        currentUserPreferencesArray2.push(doc.data().currentUserWeekendAvailability);
      });
    });
  
    db.collection("currentUsersPreferences").doc("UsZpSo6kUVDWQfh3FdUz").get().then(function(doc) {
      userFullName = doc.data().currentUserFirstAndLastName;
    });
  
    db.collection("allUserInformation").get().then(function(querySnapshot) {
    var cardCount = 0;
    var otherUsersProfileArray = [];
    querySnapshot.forEach(function(doc) {
      var eachUsersPreferences = [];
      var eachUsersProfileInformation = [];
      
      
      eachUsersPreferences.push(doc.data().userObjectInformation.userPreferenceLocation);      // 0 index 
      eachUsersPreferences.push(doc.data().userObjectInformation.userFitnessGoals);        // 1 index
      eachUsersPreferences.push(doc.data().userObjectInformation.userSwolemateGender);      // 2 index
      eachUsersPreferences.push(doc.data().userObjectInformation.userWeekdayAvailability);      // 3 index
      eachUsersPreferences.push(doc.data().userObjectInformation.userWeekendAvailability);      // 4 index
      
      console.log(eachUsersPreferences);
      console.log(currentUserPreferencesArray2);
      
        if (userFullName === doc.data().userObjectInformation.userProfileInformation[0]) {
          cardCount;
        } 
        // if all 4 categories match
        else if ((currentUserPreferencesArray2[0] === eachUsersPreferences[0]) && (currentUserPreferencesArray2[1] === eachUsersPreferences[1]) && (currentUserPreferencesArray2[2] === eachUsersPreferences[2]) && (currentUserPreferencesArray2[3] === eachUsersPreferences[3]) && (currentUserPreferencesArray2[4] === eachUsersPreferences[4])) {
          cardCount++;
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[0])     // full name
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[3])     // age
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[2])     // location
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[8])     // image
          otherUsersProfileArray.push(eachUsersProfileInformation);    // [[0,1,2,3], [0,1,2,3], [0,1,2,3]]
        } 
        // if all preferences match EXCEPT fitness goals
        else if ((currentUserPreferencesArray2[0] === eachUsersPreferences[0]) && (currentUserPreferencesArray2[1] !== eachUsersPreferences[1]) && (currentUserPreferencesArray2[2] === eachUsersPreferences[2]) && (currentUserPreferencesArray2[3] === eachUsersPreferences[3]) && (currentUserPreferencesArray2[4] === eachUsersPreferences[4])) {
          cardCount++;
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[0])     // full name
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[3])     // age
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[2])     // location
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[8])     // image
          otherUsersProfileArray.push(eachUsersProfileInformation);    // [[0,1,2,3], [0,1,2,3], [0,1,2,3]]
        }
        // if ONLY location and availability match
        else if ((currentUserPreferencesArray2[0] === eachUsersPreferences[0]) && (currentUserPreferencesArray2[1] !== eachUsersPreferences[1]) && (currentUserPreferencesArray2[2] !== eachUsersPreferences[2]) && (currentUserPreferencesArray2[3] === eachUsersPreferences[3]) && (currentUserPreferencesArray2[4] === eachUsersPreferences[4])) {
          cardCount++;
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[0])     // full name
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[3])     // age
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[2])     // location
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[8])     // image
          otherUsersProfileArray.push(eachUsersProfileInformation);    // [[0,1,2,3], [0,1,2,3], [0,1,2,3]]
        }
        // if ONLY location and weekday matches
        else if ((currentUserPreferencesArray2[0] === eachUsersPreferences[0]) && (currentUserPreferencesArray2[1] !== eachUsersPreferences[1]) && (currentUserPreferencesArray2[2] !== eachUsersPreferences[2]) && (currentUserPreferencesArray2[3] === eachUsersPreferences[3]) && (currentUserPreferencesArray2[4] !== eachUsersPreferences[4])) {
          cardCount++;
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[0])     // full name
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[3])     // age
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[2])     // location
          eachUsersProfileInformation.push("MatchPageExample1.jpg")     // image
          otherUsersProfileArray.push(eachUsersProfileInformation);    // [[0,1,2,3], [0,1,2,3], [0,1,2,3]]
        }
        // if not all cards have been generated, and ONLY location and weekend matches
        else if ((currentUserPreferencesArray2[0] === eachUsersPreferences[0]) && (currentUserPreferencesArray2[1] !== eachUsersPreferences[1]) && (currentUserPreferencesArray2[2] !== eachUsersPreferences[2]) && (currentUserPreferencesArray2[3] !== eachUsersPreferences[3]) && (currentUserPreferencesArray2[4] === eachUsersPreferences[4])) {
          cardCount++;
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[0])     // full name
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[3])     // age
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[2])     // location
          eachUsersProfileInformation.push("MatchPageExample1.jpg")     // image
          otherUsersProfileArray.push(eachUsersProfileInformation);    // [[0,1,2,3], [0,1,2,3], [0,1,2,3]]
        }
        // if not all cards have been generated, and everything BUT weekday matches
        else if ((currentUserPreferencesArray2[0] === eachUsersPreferences[0]) && (currentUserPreferencesArray2[1] == eachUsersPreferences[1]) && (currentUserPreferencesArray2[2] == eachUsersPreferences[2]) && (currentUserPreferencesArray2[3] !== eachUsersPreferences[3]) && (currentUserPreferencesArray2[4] === eachUsersPreferences[4])) {
          cardCount++;
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[0])     // full name
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[3])     // age
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[2])     // location
          eachUsersProfileInformation.push("MatchPageExample1.jpg")     // image
          otherUsersProfileArray.push(eachUsersProfileInformation);    // [[0,1,2,3], [0,1,2,3], [0,1,2,3]]
        }
        // if not all cards have been generated, and everything BUT weekend matches
        else if ((currentUserPreferencesArray2[0] === eachUsersPreferences[0]) && (currentUserPreferencesArray2[1] == eachUsersPreferences[1]) && (currentUserPreferencesArray2[2] == eachUsersPreferences[2]) && (currentUserPreferencesArray2[3] === eachUsersPreferences[3]) && (currentUserPreferencesArray2[4] !== eachUsersPreferences[4])) {
          cardCount++;
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[0])     // full name
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[3])     // age
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[2])     // location
          eachUsersProfileInformation.push("MatchPageExample1.jpg")     // image
          otherUsersProfileArray.push(eachUsersProfileInformation);    // [[0,1,2,3], [0,1,2,3], [0,1,2,3]]
        }
        // if not all cards have been generated, and everything BUT availability matches
        else if ((currentUserPreferencesArray2[0] === eachUsersPreferences[0]) && (currentUserPreferencesArray2[1] == eachUsersPreferences[1]) && (currentUserPreferencesArray2[2] == eachUsersPreferences[2]) && (currentUserPreferencesArray2[3] !== eachUsersPreferences[3]) && (currentUserPreferencesArray2[4] !== eachUsersPreferences[4])) {
          cardCount++;
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[0])     // full name
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[3])     // age
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[2])     // location
          eachUsersProfileInformation.push("MatchPageExample1.jpg")     // image
          otherUsersProfileArray.push(eachUsersProfileInformation);    // [[0,1,2,3], [0,1,2,3], [0,1,2,3]]
        }
        // if not all cards have been generated, if ONLY location and gender match
        else if ((currentUserPreferencesArray2[0] === eachUsersPreferences[0]) && (currentUserPreferencesArray2[1] !== eachUsersPreferences[1]) && (currentUserPreferencesArray2[2] === eachUsersPreferences[2]) && (currentUserPreferencesArray2[3] !== eachUsersPreferences[3]) && (currentUserPreferencesArray2[4] !== eachUsersPreferences[4])) {
          cardCount++;
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[0])     // full name
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[3])     // age
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[2])     // location
          eachUsersProfileInformation.push("MatchPageExample1.jpg")     // image
          otherUsersProfileArray.push(eachUsersProfileInformation);    // [[0,1,2,3], [0,1,2,3], [0,1,2,3]]
        }
        // if not all cards have been generated, and if ONLY location matches
        else if ((currentUserPreferencesArray2[0] === eachUsersPreferences[0]) && (currentUserPreferencesArray2[1] !== eachUsersPreferences[1]) && (currentUserPreferencesArray2[2] !== eachUsersPreferences[2]) && (currentUserPreferencesArray2[3] !== eachUsersPreferences[3]) && (currentUserPreferencesArray2[4] !== eachUsersPreferences[4])) {
          cardCount++;
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[0])     // full name
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[3])     // age
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[2])     // location
          eachUsersProfileInformation.push("MatchPageExample1.jpg")     // image
          otherUsersProfileArray.push(eachUsersProfileInformation);    // [[0,1,2,3], [0,1,2,3], [0,1,2,3]]
        }
        // if not all cards have been generated, if ONLY availability matches
        else if ((currentUserPreferencesArray2[0] !== eachUsersPreferences[0]) && (currentUserPreferencesArray2[1] !== eachUsersPreferences[1]) && (currentUserPreferencesArray2[2] !== eachUsersPreferences[2]) && (currentUserPreferencesArray2[3] === eachUsersPreferences[3]) && (currentUserPreferencesArray2[4] === eachUsersPreferences[4])) {
          cardCount++;
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[0])     // full name
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[3])     // age
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[2])     // location
          eachUsersProfileInformation.push("MatchPageExample1.jpg")     // image
          otherUsersProfileArray.push(eachUsersProfileInformation);    // [[0,1,2,3], [0,1,2,3], [0,1,2,3]]
        }
        // if not all cards have been generated, if only location DOESN'T MATCH
        else if ((currentUserPreferencesArray2[0] !== eachUsersPreferences[0]) && (currentUserPreferencesArray2[1] === eachUsersPreferences[1]) && (currentUserPreferencesArray2[2] === eachUsersPreferences[2]) && (currentUserPreferencesArray2[3] === eachUsersPreferences[3]) && (currentUserPreferencesArray2[4] === eachUsersPreferences[4])) {
          cardCount++;
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[0])     // full name
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[3])     // age
          eachUsersProfileInformation.push(doc.data().userObjectInformation.userProfileInformation[2])     // location
          eachUsersProfileInformation.push("MatchPageExample1.jpg")     // image
          otherUsersProfileArray.push(eachUsersProfileInformation);    // [[0,1,2,3], [0,1,2,3], [0,1,2,3]]
        };
        console.log(otherUsersProfileArray);
        console.log(cardCount);
    });
    if (cardCount > 0) {
    // buttons on page are cleared (so that matches can be displayed)
      $(".containerMatch").empty();
  
      // a loop to go through the (array of) current matches
      for (var i = 0; i < otherUsersProfileArray.length; i++) {
  
      // variable for current match in the array
      var currentUser = otherUsersProfileArray[i];
    
      // create a div that is a card
      var cardDiv = $("<div>");
      $(cardDiv).addClass("card whole-card");
      $(cardDiv).attr("id", "card-" + i);
      $(cardDiv).attr("data-clickable", true);
  
      // create a  div row to house potential's pic, name, & age;
      // append to card
      var cardMain = $("<div>");
            
  
      // create an IMAGE for card - FIREBASE 
      // images are placeholders for rn
      var potentialPicDiv = $("<div>");
      // create an image within the div and 
      // set the source of the image to the correct file path
      var potentialPic = $("<img>");
      $(potentialPic).attr("src", "assets/images/MatchPageExample2.jpg");
      // give image a class so can be styled later in CSS - class: profile-card-pic
      // also add other essential attributes - (e.g. alt text: "Match #1 Photo" and so on)
      $(potentialPic).addClass("profile-card-pic no-gutters card-img img-fluid m-xs-auto");
      $(potentialPic).attr("alt", "Match #" + (i + 1) + " Photo");
      $(potentialPicDiv).append(potentialPic);
      $(cardMain).append(potentialPicDiv);
  
      // create the textual body of the card
      var potentialDetailsChoices = $("<div>").addClass("text-center potential-details");
      // create a card title to hold the name of the potential match
      // & append to card body div
      var potentialDetailsContent = $("<div>").addClass("card-text");
      var potentialNameAge = $("<h5>").addClass("card-title");
      $(potentialNameAge).text(currentUser[0] + ", " + currentUser[1]);
      $(potentialDetailsContent).append(potentialNameAge);
      // create match location text on card
      var potentialLocation = $("<h6>").attr("id", "match-location");
      // $(potentialLocation).addClass("card-body");
      $(potentialLocation).text(currentUser[2]);
      $(potentialDetailsContent).append(potentialLocation);
  
  
      // create a  div for the buttons
      var choiceButtons = $("<div>").addClass("choice-buttons");
      // create like and dislike buttons
      var likeButton = $("<button>").addClass("btn btn-light like-choice-button");
      $(likeButton).attr("data-like", i);
      // .html("<button><i class='em em-heart_decoration'</i></button>");
      var emojiLike = $("<i>").addClass("em em-muscle");
      $(likeButton).append(emojiLike);
      var dislikeButton = $("<button>").addClass("btn btn-light dislike-choice-button");
      $(dislikeButton).attr("data-dislike", i);
      var emojiDislike = $("<i>").addClass("em em-x");
      $(dislikeButton).append(emojiDislike);
      // append those buttons to the div
      $(choiceButtons).append(likeButton);
      $(choiceButtons).append(dislikeButton);
  
  
  
      // append these all to one another and to the card
      $(potentialDetailsChoices).append(potentialDetailsContent);
      $(potentialDetailsChoices).append(choiceButtons);
      $(cardMain).append(potentialDetailsChoices);
  
      // append this card to the match div (i.e. main content on page
      $(cardDiv).append(cardMain);
  
      $(".containerMatch").append(cardDiv);

      ///// IF THE CARDS ARE CREATED -> This on-click function for the like button works /////
      $(".dislike-choice-button").on("click", function() {
        $(cardDiv).remove();
      });

      ///// IF THE CARDS ARE CREATED -> This on-click function for the like button works /////
      $(".like-choice-button").on("click", function() {
        db.collection("allUserInformation").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if (currentUser[0] === doc.data().userObjectInformation.userProfileInformation[0]) {
              // create a div that is a card
              var cardDiv = $("<div>");
              $(cardDiv).addClass("card whole-card match-details");

              // create a  div row to house match's pic and single-word details
              var cardMainOne = $("<div>").addClass("row");
        
              // create an IMAGE for card - FIREBASE 
              // images are placeholders for rn
              var matchPicDiv = $("<div>").addClass("col");
              // create an image within the div and 
              // set the source of the image to the correct file path
              var matchPic = $("<img>");
              $(matchPic).attr("src", "assets/images/MatchPageExample3.jpg");
              // give image a class so can be styled later in CSS - class: profile-card-pic
              // also add other essential attributes - (e.g. alt text: "Match #1 Photo" and so on)
              $(matchPic).addClass("profile-card-pic card-img card-img-top img-fluid m-auto no-gutters");
              $(matchPic).attr("alt", "Match #" + doc.data().userObjectInformation.username + " Photo");
              $(matchPicDiv).append(matchPic);
              $(cardMainOne).append(matchPicDiv);

              // create the textual body of the card
              var matchDetails = $("<div>").addClass("row text-center m-1");
              // create a card title to hold the name of the potential match
        
              // & append to card body div
              var matchDetailsContent = $("<div>").addClass("col card-body");
              var matchName = $("<h5>").addClass("card-title");
              $(matchName).text(doc.data().userObjectInformation.userProfileInformation[0]);
              $(matchDetailsContent).append(matchName);

              // create the text fields for age, gender, location, weight, activity level, 
              // experience level, fitness goals, availability, why swolemates
              // age
              var matchAge = $("<div>").addClass("match-age");
              $(matchAge).html("<p><span class='age-header special-card-word'>Age: </span>" + doc.data().userObjectInformation.userProfileInformation[3] + "</p>");
              $(matchDetailsContent).append(matchAge);

              // gender
              var matchGender = $("<div>").addClass("match-gender");
              $(matchGender).html("<p><span class='gender-header special-card-word'>Gender: </span>" + doc.data().userObjectInformation.userProfileInformation[1] + "</p>");
              $(matchDetailsContent).append(matchGender);

              // location
              var matchLocation = $("<div>").addClass("match-location");
              $(matchLocation).html("<p><span class='location-header special-card-word'>Location: </span>" + doc.data().userObjectInformation.userProfileInformation[2] + "</p>");
              $(matchDetailsContent).append(matchLocation);

              // weight
              var matchWeight = $("<div>").addClass("match-weight");
              $(matchWeight).html("<p><span class='weight-header special-card-word'>Weight: </span>" + doc.data().userObjectInformation.userProfileInformation[4] + "</p>");
              $(matchDetailsContent).append(matchWeight);

              // activity level
              var matchActivity = $("<div>").addClass("match-activity");
              $(matchActivity).html("<p><span class='activity-header special-card-word'>Activity Level: </span>" + doc.data().userObjectInformation.userProfileInformation[5] + "</p>");
              $(matchDetailsContent).append(matchActivity);

              // experience level
              var matchExperience = $("<div>").addClass("match-experience");
              $(matchExperience).html("<p><span class='experience-header special-card-word'>Experience: </span>" + doc.data().userObjectInformation.userProfileInformation[6] + "</p>");
              $(matchDetailsContent).append(matchExperience);

              // fitness goals - a list
              var matchGoals = $("<div>").addClass("match-goals");
              $(matchGoals).append("<p><span class='goal-header special-card-word'>Goals: </span>" + doc.data().userObjectInformation.userFitnessGoals + "</p>");
              // var goalsList = $("<p>")
              // var goal = $("<p>");
              // goal.text();
              // goalsList.append(goal);
              // $(matchGoals).append(goal);
              $(matchDetailsContent).append(matchGoals);

              // availability
              var matchAvailability = $("<div>").addClass("match-availability");
              var formattedWeekdayAvailability = (doc.data().userObjectInformation.userWeekdayAvailability[0]).toLowerCase() + (doc.data().userObjectInformation.userWeekdayAvailability).slice(1);
              var formattedWeekendAvailability = (doc.data().userObjectInformation.userWeekendAvailability[0]).toLowerCase() + (doc.data().userObjectInformation.userWeekendAvailability).slice(1);
              var availabilityText = "<p>You might be able to hit the gym together on weekday " + formattedWeekdayAvailability + " and weekend " + formattedWeekendAvailability + ".</p>";
              $(matchAvailability).html(availabilityText);
              $(matchDetailsContent).append(matchAvailability);
        

              // why swolemates
              var matchBlurb = $("<div>").addClass("match-blurb");
              $(matchBlurb).append("<p><span class='blurb-header special-card-word'>Reason for Swolemates:</span></p>");
              $(matchBlurb).append("<p>" + doc.data().userObjectInformation.userProfileInformation[7]);
              $(matchDetailsContent).append(matchBlurb);

              // heart emoji icon to indicate that this is a mutual like
              var heartIcon = $("<div>").addClass("d-flex flex-row-reverse bd-highlight profile-heart");
              $(heartIcon).html("<i class='em em-heart'</i>");
              
              $(matchDetails).append(matchDetailsContent);
              $(cardMainOne).append(matchDetails);


              // append these all to one another and to the card
              // $(cardMainTwo).append(matchDetailsContent2);

              // append this card to the match div (i.e. main content on page
              $(cardDiv).append(cardMainOne);
              $("#current-matches-container").append(cardDiv);
              };
            });
          });
        });
      };
        
      $(".current-matches-match-button").on("click", function() {
        $(".fa-soundcloud").remove();
        $(".current-matches-match-button").hide();
        $(".containerMatch").hide();
        $("#current-matches-container").show();
      });
    
    } else if (cardCount === 0) {
      $(".containerMatch").empty();
      $(".containerMatch").append("<h1 id='no-match-message'>You have no current matches!</h1>");
      $(".fa-soundcloud").remove();
      console.log(otherUsersProfileArray);
    };
  });
});

////////////////////////////////
  $("#show-matches").on("click", function() {
  $(".fa-soundcloud").remove();
  $("#current-matches-container").show();
  $(".containerMatch").hide();
});
/*
$(".current-matches-match-button").on("click", function() {
  $(".current-matches-match-button").hide();
  $(".containerMatch").hide();
  $("#current-matches-container").show();
});
*/


        
////////////////////////////////////   EVENT LISTENERS FOR NAVBAR   //////////////////////////////////

// clicking "Match Me! in the navbar"
$("#nav-get-matched-2").on("click", function() {
  window.location.href = "MatchMe.html";
});

// clicking "Current Matches in the navbar"
// $("nav-show-matches").on("click", FUNCTION FOR SHOWING CURRENT MATCHES);

$("#nav-logout-2").on("click", function() {
  window.location.href = "openingScreen.html";
});



/////////// PSEUDOCODE TASKS ///////////
  
  /* 
DATA STORAGE:
- Sign-up page: Create on-click event for when user clicks on the "Get Started" button, the username and username values get stored in FireBase
- Sign-up profile page: Create on-click event for when user clicks on the "Next" button, the user's profile information gets stored in FireBase
- Sign-up preferences page: Create on-click event for when user clicks on the "Create Profile" button, the user's preferences information gets stored in FireBase


GRABBING DATA:
- Login page: Create on-click event for when user clicks on the "Sign in" button, the values that the user inputs get compared to the data in firebase and is checked for match (create an error case)
inputs for username and password are checked with those values in FireBase - if they match, then the user gets transferred to the next page
- Match Me page: Create on-click event for when user clicks on the "Match Me!" button, the user's preferences from FireBase is compared with other user's preferences in FireBase (use points)
    - Sketch out the scoring algorithm that we will use to match user's together
- Potential Matches page: Create on-click event for when user clicks on the heart button on another person's card, that person's profile 
information and their picture from Firebase gets transferred to the Current Matches Page

APIs
- Using the Google Maps Location API (Library, not AJAX request) for when the user is filling out their profile and their location preferences


Dynamic Elements 
- Create a card for the user matches
    - Use the appropriate bootstrap classes/IDs (refer to the individual HTML pages that have the visual samples on them)
    - Potential Matches page: Create an Object that contains one whole dynamically created card, and for multiple matches that object is appended below the first card
    - Current Matches page: Generate a different dynamically-created card Object for this page, since the card will look different than the one on the Potential Matches page. Append subsequent cards below each other.

OTHER
- On-click event on the cards for elements that link to social media, etc
*/
  
  
