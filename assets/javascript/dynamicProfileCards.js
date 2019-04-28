$(document).ready(function() {

    // Array for current matches
    var currentMatches = [];

    // FUNCTION FOR CLICKING MATCH ME & SEEING POTENTIAL MATCHES
        // assumes that modals have been cleared and we land on page to see:
            // 1. <button>Match Me!</button>
            // 2. <button>Current Matches</button>
    $("#get-matched").on("click", function() {

        // Logic for matching users runs
            // wh/ results in currentMatches getting filled
        
        // Should be a reference to firebase: db.ref()...
            // the array would use snapshot.val.() to get items out of firebase
        
        //an example array - excludes profile pics (profilePicture) at the time being
        currentMatches = [
            {name: "Tommy Huynh", age: 23, userLocation: "San Francisco, CA"},
            {name: "Elon Musk", age: 47, userLocation: "San Francisco, CA"},
            {name: "Susan Maple", age: 55, userLocation: "Portland, OR"},
            {name: "Ricky Bobby", age: 19, userLocation: "San Francisco, CA"},
        ];

        // buttons on page are cleared (so that matches can be displayed)
        $(".containerMatch").empty();

        // a loop to go through the (array of) current matches
        for (var i = 0; i < currentMatches.length; i++ {

            // variable for current match in the array
            var currentMatch = currentMatches[i];
            // create a div that is a card
            var cardDiv = $("<div>");
            cardDiv.addClass("card");
            
        }




    })




})




// PSEUDOCODE - POTENTIAL MATCHES
// MAKE SURE TO PUT A HIGHLIGHT OF THE FIREBASE PROPER TERMING
// on click "match me"
    // see MatchMe.html
    // logic for matching users runs
    // an array of user objects is filled 
        // houses all matches obtained through match logic
    // page clears (in order to display matches)
        // create a div    
        // loop through the array of user objects
            // on the current element (a user obj)
                // create a card - a div
                    // create an image 
                        // w/ all attributes
                    // create a div for card body and create 
                            // the following items within 
                            // (appended to) that div:
                        // pic 
                        // name
                        // age
                        // location
                        // like and dislike buttons
                    // set content of the above (except buttons) 
                        // grab data from firebase for pic, name, age, location
                        // like and dislike content set to be an emoji
    // append all to card
    // append card to page
    // button to navigate to current matches appended after

    // Necessary vars for above: 
        // current user? 
        // array of matches
        // 


    // other dynamic occurrences
        // if hover over like / dislike button, a border or some change
        // if like button pressed, put the person in the user-object 
            // into the current user's current match array
        // if dislike button pressed, the card is greyed out
          