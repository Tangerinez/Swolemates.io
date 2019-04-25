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

  ///////////// GLOBAL VARIABLES ///////////////
  

  



  // ON-CLICK function for transferring user's email and password into FireStore
  $(".get-started-button").on("click", function(event) {
  
  event.preventDefault();
  
  var email = $("#input-email").val(); 
  var password = $("#input-password").val(); 
  var confirmPassword = $("#input-confirmPassword").val();

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
  
  

