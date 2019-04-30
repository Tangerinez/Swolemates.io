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

    var userObjectInformation = {};
    var username = $("#input-username").val();              // user's username input
    var password = $("#input-password").val();             // user's password input
    var confirmPassword = $("#input-confirmPassword").val();               // user's Confirm Password input
    var existingUsernameArray = [];        // Array of user's existing usernames

  
    db.collection("existingUsernames").doc().set({          // Creating a collection for existing usernames
      existingUsernames: username
      })
      .then(function() {
      console.log("Document successfully written!");
      })
      .catch(function(error) {
      console.error("Error writing document: ", error);
      });
  
    db.collection("existingUsernames").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        existingUsernameArray.push(doc.data().existingUsernames);            // Putting all existing usernames in an array
      });
      console.log(existingUsernameArray);
    });  
    
    
    if ((existingUsernameArray.includes(username) === false) && (password === confirmPassword)) {    // pushes unused usernames into the userObjectInformation object
      userObjectInformation.username = username;
      userObjectInformation.password = password;
    } else if ((existingUsernameArray.includes(doc.data().userObjectInformation.username) === true) && (password !== confirmPassword)) {         // if there is already matching username AND passwords do not match
      var wrongUsernameContainer = $("<small>");
      wrongUsernameContainer.addClass("form-text text-muted existing-username-text");
      wrongUsernameContainer.text("This username is already taken. Please go bo back to the login screen or use a different username.");
      $(".username-input-form").append(wrongUsernameContainer);
      var wrongPasswordContainer = $("<small>");
      wrongPasswordContainer.addClass("form-text text-muted wrong-password-text");
      wrongPasswordContainer.text("Your passwords do not match! Please enter your password again.");
      $(".form-confirm-password").append(wrongPasswordContainer);
      // prevent onclick for modal
    } else if (existingUsernameArray.includes(doc.data().userObjectInformation.username) === true) {     // if username already exists
      var wrongUsernameContainer = $("<small>");
      wrongUsernameContainer.addClass("form-text text-muted existing-username-text");
      wrongUsernameContainer.text("This username is already taken. Please go bo back to the login screen or use a different username.");
      $(".username-input-form").append(wrongUsernameContainer);
      // prevent onclick for modal
    } else if (password !== confirmPassword) {       // if passwords don't match
      var wrongPasswordContainer = $("<small>");
      wrongPasswordContainer.addClass("form-text text-muted wrong-password-text");
      wrongPasswordContainer.text("Your passwords do not match! Please enter your password again.");
      $(".form-confirm-password").append(wrongPasswordContainer);
      // prevent onclick for modal
      };
  

    
  $(".profile-completion-button").on("click", function() {     // ON-CLICK FUNCTION FOR PROFILE BUTTON AFTER SIGN-UP MODAL CONDITION IS MET
    var userGender = $("#gender").val();             // user's gender input
    var userLocation = $("#location").val();           // user's location input
    var userAge = $("#age").val();             // user's age input
    var userWeight = $("#weight").val();            // user's weight input
    var userActivityLevel = $("#activity").val();             // user's activity level input
    var userExperienceLevel = $("#experience").val();             // user's experience level input
    var userProfileBlurb = $("#why-swole").val();           // user's profile blurb input
    var userProfilePicture = $("#photo-input").val();      // profile-picture file path
    var userProfileArray = [];

    userProfileArray.push(userGender);              // pushing all the user's profile information into an array
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
      var userAvailability = $("#user-availability").val();             // user's age input
      var userFitnessGoals = $("#fitness-goal").val();            // user's weight input
      var userSwolemateGender = $("#gender-preference").val();             // user's activity level input
      
      /*
      userPreferencesArray.push(userPreferenceLocation);       // pushing user's preferences into a new array
      userPreferencesArray.push(userAvailability);
      userPreferencesArray.push(userFitnessGoals);
      userPreferencesArray.push(userSwolemateGender);
      */
      
      userObjectInformation.userPreferenceLocation = userPreferenceLocation;        // pushing the user preferences array into user profile array (array within array)
      userObjectInformation.userAvailability = userAvailability;
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
        window.location.href = "MatchMe.html";
      });
    });
  });


  
  

////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////// ON-CLICK EVENT FOR LOGIN PAGE - CHECKS FOR IF USERNAME AND PASSWORD ARE CORRECT ///////////////
$(".sign-in-button").on("click", function(event) {
  event.preventDefault();
  var loginUsername = $("#login-username").val();              // user's username input
  var loginPassword = $("#login-password").val();             // user's password input
  var existingUsernames = [];
  var existingPasswords = [];

  db.collection("allUserInformation").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      existingUsernames.push(doc.data().userObjectInformation.username);
      existingPasswords.push(doc.data().userObjectInformation.password);
      if ((doc.data().userObjectInformation.username === loginUsername) && (doc.data().userObjectInformation.password === loginPassword)) {          // If username and password match an existing one...
        window.location.href = "MatchMe.html";
      };
    });
    for (var i = 0; i<existingUsernames.length; i++) {
      if (!((existingUsernames[i] === loginUsername) && (existingPasswords === loginPassword))) {        // CODE BELOW DISPLAYS ONE ERROR MESSAGE IF USERNAME AND PASSWORD ARE INCORRECT     
        var loginErrorContainer = $("<small>");
        loginErrorContainer.addClass("form-text text-muted wrong-loginInfo-text");
        loginErrorContainer.text("Your username and/or password information are incorrect. Please try again.");
        $(".user-login-password-container").append(loginErrorContainer); 
      };
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

////////////////////////////////////////////////////////////////////////////////////////////////////////
 

///////////////// Scoring System ////////////////////
/*
function matchGenerator() {
  
};
*/

  // if statement Location === location ;
  // if statement Gender Preference === Gender Preference ;
  // if score > 2 ;
  
  // Run function Score 

// availability will be dynamically appended into the array based on query selection, the array will be compared to stored arrays in firebase
/*
var matches = [ 
 {name: score},
];
var goal = [];
var availability = [];
var score = 0;

function score () {
  for (i=0; i < availability.length; i++);
  // score ++ for each match on availability (eg +1 for Week Day Mornings, +1 for Weekend Afternoon)
  if (userAvailability === availability[i]){
    score ++;
  };
  for (i=0; i < goal.length; i++) {
    if(fitnessGoals === goal[i]); 
    score ++;
  }
  return score; 
}


function matchGenerator (){
  //run function score
  score();
  // determine if match 
  if (userPreferenceLocation === preferenceLocation 
    && swolemateGender === gender 
    && score >=2 ) {
      //match goes to firebase 
    } 
// else not a match 
  else {
    //not a match 
  }

}

function scoreMatch() {
  for (i=0; i < match.length; i++){
    var matchScore = ""    // some value from firbase created array of matches 
  
  };
}

function displayMatch () {
// pull from firebase

//input card attr to be appended 

$(".card").append()

}
*/



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
- On-click event on the cards for elements that link to social media, etc
*/
  
  
