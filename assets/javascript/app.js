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

  var userEmail = "";
  var userPassword = "";


  ///////////// ON-CLICK function for transferring user's email and password into FireStore ////////////
  $(".get-started-button").on("click", function(event) {
  
  event.preventDefault();
  
  var email = $("#input-email").val();              // user's email input
  var password = $("#input-password").val();             // user's password input
  var confirmPassword = $("#input-confirmPassword").val();               // user's Confirm Password input
  var existingEmailArray = [];

  var docRef = db.collection("userLoginInfo").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      existingEmailArray.push(doc.data().email);     // pushes every email that is added from FireStore into an existing Email Array
    });
    console.log(existingEmailArray);
  });
  console.log(docRef);

  // CHECKS IF THE EMAIL ENTERED IS ALREADY TAKEN 
  /* if (existingEmailArray.includes(email) === true) {      // ERROR: RIGHT NOW THIS IS DISPLAYING FALSE EVERY TIME!!!
    var wrongEmailContainer = $("<small>");
    wrongEmailContainer.addClass("form-text text-muted existing-email-text");
    wrongEmailContainer.text("This email is already registered. Please go bo back to the login screen or use a different email.");
    $(".email-input-form").append(wrongEmailContainer);
  } else {
      db.collection("userLoginInfo").doc().set({
      email: email,
      password: password,
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }; */

  
  // CHECKS IF THE "PASSWORD" ENTERED MATCHES THE "CONFIRM PASSWORD" ENTERED
   if (password === confirmPassword) {
    db.collection("userLoginInfo").doc().set({
      email: email,
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

});
////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////// ON-CLICK EVENT FOR LOGIN PAGE - CHECKS FOR IF EMAIL AND PASSWORD ARE CORRECT ///////////////
$(".sign-in-button").on("click", function() {
  var loginEmail = $("#login-email").val();              // user's email input
  var loginPassword = $("#login-password").val();             // user's password input
  var existingEmails = [];
  var existingPasswords = [];
  var matchingUserInfoCount = 0;

  var loginInfoCheck = db.collection("userLoginInfo").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      existingEmails.push(doc.data().email);
      existingPasswords.push(doc.data().password);
      if ((doc.data().email === loginEmail) && doc.data().password === loginPassword) {          // CHECKS IF EMAIL AND PASSWORD ARE CORRECT
        window.location.href = "MatchMe.html";
        userEmail = loginEmail;
        userPassword = loginPassword;
      }
    });
    for (var i = 0; i<existingEmails.length; i++) {               // CODE BELOW DISPLAYS ONE ERROR MESSAGE IF EMAIL AND PASSWORD ARE INCORRECT
      if ((existingEmails[i] === loginEmail) && existingPasswords[i] === loginPassword) {       
        matchingUserInfoCount += 1;
      };
    };
      if (matchingUserInfoCount !== 1) {
        var loginErrorContainer = $("<small>");
        loginErrorContainer.addClass("form-text text-muted wrong-loginInfo-text");
        loginErrorContainer.text("Your email and password information is incorrect. Please try again.");
        $(".user-login-password-container").append(loginErrorContainer); 
      };
  });
console.log(loginInfoCheck);
});



// Google maps API Request -- Autocomplete 
// location profile request 
function initialize() {
  var input = document.getElementById('location');
  var autocomplete = new google.maps.places.Autocomplete(input);
}
google.maps.event.addDomListener(window, 'load', initialize);
//location preferences request 

function initialize2() {
  var inputUser = document.getElementById('user-preference-location');
  var autocomplete = new google.maps.places.Autocomplete(inputUser);
}
google.maps.event.addDomListener(window, 'load', initialize2);

/////////////// ON-CLICK for "Next" button after the user enters in their profile information //////////////
$(".profile-completion-button").on("click", function(event) {

  event.preventDefault();


  var gender = $("#gender").val();             // user's gender input
  var userLocation = $("#location").val();           // user's location input
  var age = $("#age").val();             // user's age input
  var weight = $("#weight").val();            // user's weight input
  var activityLevel = $("#activity").val();             // user's activity level input
  var experienceLevel = $("#experience").val();             // user's experience level input
  var profileBlurb = $("#why-swole").val();           // user's profile blurb input
  var profilePicture = $("#photo-input").val();

  db.collection("userProfileInfo").doc().set({
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
$("#finish-user-info-button").on("click", function(event) {

  event.preventDefault();

  var preferenceLocation = $("#user-preference-location").val();           // user's location preference input
  var userAvailability = $("#user-availability").val();             // user's age input
  var fitnessGoals = $("#fitness-goal").val();            // user's weight input
  var swolemateGender = $("#gender-preference").val();             // user's activity level input

  db.collection("userPreferencesInfo").doc().set({
    userPreferenceLocation: preferenceLocation,
    userAvailability: userAvailability,
    fitnessGoals: fitnessGoals,
    swolemateGender: swolemateGender
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });
});    

////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////// PSEUDOCODE TASKS ///////////
  
  /* 
DATA STORAGE:
- Sign-up page: Create on-click event for when user clicks on the "Get Started" button, the email and username values get stored in FireBase
- Sign-up profile page: Create on-click event for when user clicks on the "Next" button, the user's profile information gets stored in FireBase
- Sign-up preferences page: Create on-click event for when user clicks on the "Create Profile" button, the user's preferences information gets stored in FireBase


GRABBING DATA:
- Login page: Create on-click event for when user clicks on the "Sign in" button, the values that the user inputs get compared to the data in firebase and is checked for match (create an error case)
inputs for email and username are checked with those values in FireBase - if they match, then the user gets transferred to the next page
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
  
  

