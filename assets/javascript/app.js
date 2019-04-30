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



  ///////////// GLOBAL VARIABLES /////////////////

  var cachedUserUsername = "";
  var cachedUserPassword = "";
  var cachedFitnessGoal = "";
  var cachedSwolemateGender = "";
  var cachedUserPreferenceLocation = "";


  /////////////////////////////////////////////////////////////
  /*
  $("#sign-up-button").on("click", function(event) {

    $(".existing-username-text").empty();
  });
  */

  ///////////// ON-CLICK function for transferring user's username and password into FireStore ////////////
  $(".get-started-button").on("click", function(event) {
  
  event.preventDefault();
  
  var username = $("#input-username").val();              // user's username input
  var password = $("#input-password").val();             // user's password input
  var confirmPassword = $("#input-confirmPassword").val();               // user's Confirm Password input
  var existingUsernameArray = [];
  var availableUserName = "";
  var existingUsernameCount = 0;

  var docRef = db.collection("userInformation").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      if (existingUsernameArray.includes(doc.data().username) === false) {
      existingUsernameArray.push(doc.data().username);     // pushes every username that is added from FireStore into an existing Username Array
      };
    });
    console.log(existingUsernameArray);
    if (existingUsernameArray.includes(username) === true) {        // NEED TO FIX - KEEPS APPENDING EVEN FOR NON-EXISTING USERNAMES!
      var wrongUsernameContainer = $("<small>");
      wrongUsernameContainer.addClass("form-text text-muted existing-username-text");
      wrongUsernameContainer.text("This username is already taken. Please go bo back to the login screen or use a different username.");
      $(".username-input-form").append(wrongUsernameContainer);
      };
  });
  console.log(docRef);

  // CHECKS IF THE USERNAME ENTERED IS ALREADY TAKEN 
  /*
  for (var i = 0; i<existingUsernameArray.length; i++) {
   if (existingUsernameArray[i] === username) {        // if user's username input is already equal to an existing username
    existingUsernameCount += 1;
   };
  };
  console.log(existingUsernameArray);
  console.log(existingUsernameCount);    
   if (existingUsernameCount > 0) {
    var wrongUsernameContainer = $("<small>");
    wrongUsernameContainer.addClass("form-text text-muted existing-username-text");
    wrongUsernameContainer.text("This username is already taken. Please go bo back to the login screen or use a different username.");
    $(".username-input-form").append(wrongUsernameContainer);
    };
  */
    
  

  // CHECKS IF THE "PASSWORD" ENTERED MATCHES THE "CONFIRM PASSWORD" ENTERED
   if (password === confirmPassword) {
    db.collection("userInformation").doc().set({
      username: username,
      password: password,
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  } else {
    var wrongPasswordContainer = $("<small>");
    wrongPasswordContainer.addClass("form-text text-muted wrong-password-text");
    wrongPasswordContainer.text("Your passwords do not match! Please enter your password again.");
    $(".form-confirm-password").append(wrongPasswordContainer);
  };
  $("#input-username").val("");
  $("#input-password").val("");
  $("#input-confirmPassword").val("");
});
////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////// ON-CLICK EVENT FOR LOGIN PAGE - CHECKS FOR IF USERNAME AND PASSWORD ARE CORRECT ///////////////
$(".sign-in-button").on("click", function(event) {
  event.preventDefault();
  var loginUsername = $("#login-username").val();              // user's username input
  var loginPassword = $("#login-password").val();             // user's password input
  var existingUsernames = [];
  var existingPasswords = [];
  var matchingUserInfoCount = 0;

  var loginInfoCheck = db.collection("userInformation").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      existingUsernames.push(doc.data().username);
      existingPasswords.push(doc.data().password);
      if ((doc.data().username === loginUsername) && doc.data().password === loginPassword) {          // CHECKS IF USERNAME AND PASSWORD ARE CORRECT
        window.location.href = "MatchMe.html";
        userUsername = loginUsername;
        userPassword = loginPassword;
      }
    });
    for (var i = 0; i<existingUsernames.length; i++) {               // CODE BELOW DISPLAYS ONE ERROR MESSAGE IF USERNAME AND PASSWORD ARE INCORRECT
      if ((existingUsernames[i] === loginUsername) && existingPasswords[i] === loginPassword) {       
        matchingUserInfoCount += 1;
      };
    };
      if (matchingUserInfoCount !== 1) {
        var loginErrorContainer = $("<small>");
        loginErrorContainer.addClass("form-text text-muted wrong-loginInfo-text");
        loginErrorContainer.text("Your username and/or password information are incorrect. Please try again.");
        $(".user-login-password-container").append(loginErrorContainer); 
      };
  });
console.log(loginInfoCheck);
$("#login-username").val(""); 
$("#login-password").val(""); 
});



/////////////////// Google maps API Request -- Autocomplete ////////////////////////
// location profile request 
function initiate() {
  var input = document.getElementById('location');
  var autocomplete = new google.maps.places.Autocomplete(input);
  console.log("i worked");
}
google.maps.event.addDomListener(window, 'load', initiate);
//location preferences request 

function initiate2() {
  var inputUser = document.getElementById('user-preference-location');
  var autocomplete = new google.maps.places.Autocomplete(inputUser);
}
google.maps.event.addDomListener(window, 'load', initiate2);


//////////////////// SOUND CLOUD API WIDGET //////////////////////////////

/*
var iframeElement   = document.querySelector('iframe');
var iframeElementID = iframeElement.id;
var widget1         = SC.Widget(iframeElement);
var widget2         = SC.Widget(iframeElementID);

SC.initialize({
  client_id: 'YOUR_CLIENT_ID'
  });

  var track_url = 'http://soundcloud.com/forss/flickermood';
  SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
  console.log('oEmbed response: ', oEmbed);
  });

(function(){
  var widgetIframe = document.getElementById('sc-widget'),
      widget       = SC.Widget(widgetIframe),
      newSoundUrl = 'http://api.soundcloud.com/tracks/160781157';

    widget.bind(SC.Widget.Events.READY, function() {
    // load new widget
    widget.bind(SC.Widget.Events.FINISH, function() {
      widget.load(newSoundUrl, {
        show_artwork: false
      });
    });
  });

}());
*/
/////////////// ON-CLICK for "Next" button after the user enters in their profile information //////////////
$(".profile-completion-button").on("click", function() {


  var gender = $("#gender").val();             // user's gender input
  var userLocation = $("#location").val();           // user's location input
  var age = $("#age").val();             // user's age input
  var weight = $("#weight").val();            // user's weight input
  var activityLevel = $("#activity").val();             // user's activity level input
  var experienceLevel = $("#experience").val();             // user's experience level input
  var profileBlurb = $("#why-swole").val();           // user's profile blurb input
  var profilePicture = $("#photo-input").val();

  db.collection("userInformation").doc().update({
    gender: gender,
    userLocation: userLocation,
    age: age,
    weight: weight,
    activityLevel: activityLevel,
    experienceLevel: experienceLevel,
    profileBlurb: profileBlurb,
    profilePicture: profilePicture
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });
});           

////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////// ON-CLICK for "Next" button after the user enters in their profile information //////////////
$("#finish-user-info-button").on("click", function() {
  
  var preferenceLocation = $("#user-preference-location").val();           // user's location preference input
  var userAvailability = $("#user-availability").val();             // user's age input
  var fitnessGoals = $("#fitness-goal").val();            // user's weight input
  var swolemateGender = $("#gender-preference").val();             // user's activity level input


  db.collection("userInformation").doc().update({
    userPreferenceLocation: preferenceLocation,
    userAvailability: userAvailability,
    fitnessGoals: fitnessGoals,
    swolemateGender: swolemateGender,
    userScore: 0
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });
  cachedFitnessGoal += fitnessGoals;
  cachedSwolemateGender += swolemateGender;
  cachedUserPreferenceLocation += preferenceLocation;
});    






///////////////// Scoring System ////////////////////

// Score function 
function score() {

  var docRef = db.collection("userPreferencesInfo").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
    if (doc.data().fitnessGoals === cachedFitnessGoal) {
      doc.data().userScore++;
    };
    });
  });
  console.log(docRef);
  // score ++ for each match on availability (eg +1 for Week Day Mornings, +1 for Weekend Afternoon)
  // score ++ for goal match ; 
  // return score 
};


function matchGenerator (){
  var docRef = db.collection("userPreferencesInfo").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
    if (((doc.data().swolemateGender === cachedSwolemateGender) && (doc.data().userPreferenceLocation === cachedUserPreferenceLocation)) || doc.data().userScore > 2) {
      // Generate the card code here
    } else {
      // Not a match code here
    };
    });
  });
  console.log(docRef);
  // if statement Location === location ;
  // if statement Gender Preference === Gender Preference ;
  // if score > 2 ;
  
  // Run function Score 

// else not a match 

}

function displayMatch () {
// display 3 matches with highest score 
}


////////////////////////////////////////////////////////////////////////////////////////////////////////



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
- On-click event on the cards for elements that link to social media, etc.
*/
  
  

