$(document).ready(function() {

    // Array for current potential matches (which you review as a user and wh/ are presented via matching logic)
    var currentPotentials = [];

    // array for current matches (which you see on your page as a user - you both liked each other)
    var currentMatches = [];

    // array for people you like as a user (which you don't see, but which is used to calculate potential matches for the liked user)
    var currentLikes = [];

    // array for people you dislike as a user (which you don't see, but which is used to calculate potential matches for you moving forward)
    var currentDislikes = [];

     // ---------------------EVENT LISTENERs FOR SEEING POTENTIAL MATCHES (FUNCTION DECLARED BELOW)-------------------
        // from button on page after sign in/sign up
        // and for dynamically created button on current match page
    $("#get-matched").on("click", seePotentialMatches);
    $(".containerMatch").on('click', function(e) {
        if (e.target && e.target.id === "get-matched-2") {
            seePotentialMatches();
        }
    });
        // 2nd listener works but takes you to the bottom of the page...

    // ---------------------EVENT LISTENERs FOR SEEING POTENTIAL MATCHES (FUNCTION DECLARED BELOW)-------------------
    $("#show-matches").on("click", seeCurrentMatches);
    $(".containerMatch").on('click', function(e) {
        if (e.target && e.target.id=== "show-matches-2") {
            seeCurrentMatches();
        }
    });
        // // 2nd listener works but takes you to the bottom of the page...


    // ---------------------FUNCTION FOR SEEING POTENTIAL MATCHES (PASSED TO EVENT LISTENER ABOVE-------------------
        // assumes that modals have been cleared and we land on page to see:
            // 1. <button>Match Me!</button>
            // 2. <button>Current Matches</button>

    function seePotentialMatches() {


        // $("#get-matched").on("click", function() {
            

        // Logic for matching users runs
            // wh/ results in currentPotentials getting filled

        // Should be a reference to firebase: db.ref()...
            // the array would use snapshot.val.() to get items out of firebase

        //an example array - FIREBASE - if any key names should be fixed, should be fixed below as well
            // !! NEED TO MAKE SURE this gets user's preference location correct? 
        currentPotentials = [
            {name: "Tommy Huynh", age: 23, userLocation: "San Francisco, CA", profilePicture: "assets/images/MatchPageExample1.jpg"},
            {name: "Elon Musk", age: 47, userLocation: "San Francisco, CA", profilePicture: "assets/images/MatchPageExample2.jpg"},
            {name: "Susan Maple", age: 55, userLocation: "Portland, OR", profilePicture: "assets/images/MatchPageExample3.jpg"},
            {name: "Ricky Bobby", age: 19, userLocation: "San Francisco, CA", profilePicture: "assets/images/MatchPageExample4.jpg"}
        ];

        // buttons on page are cleared (so that matches can be displayed)
        $(".containerMatch").empty();

        // a loop to go through the (array of) current matches
        for (var i = 0; i < currentPotentials.length; i++) {

            // variable for current match in the array
            var currentPotential = currentPotentials[i];
            
            // create a div that is a card
            var cardDiv = $("<div>");
            $(cardDiv).addClass("card");
            $(cardDiv).attr("id", "card-" + i);
            $(cardDiv).attr("data-clickable", true);

            // create a  div row to house potential's pic, name, & age;
                // append to card
            var cardMain = $("<div>").addClass("row m-1");
            

            // create an IMAGE for card - FIREBASE 
                // images are placeholders for rn
            var potentialPicDiv = $("<div>").addClass("col-md-6");
                // create an image within the div and 
                // set the source of the image to the correct file path
            var potentialPic = $("<img>");
            $(potentialPic).attr("src", currentPotential.profilePicture);
                // give image a class so can be styled later in CSS - class: profile-card-pic
                // also add other essential attributes - (e.g. alt text: "Match #1 Photo" and so on)
            $(potentialPic).addClass("profile-card-pic card-img img-fluid m-xs-auto");
            $(potentialPic).attr("alt", "Match #" + (i + 1) + " Photo");
            $(potentialPicDiv).append(potentialPic);
            $(cardMain).append(potentialPicDiv);

            // create the textual body of the card
            var potentialDetailsChoices = $("<div>").addClass("col-md-6 col-xs text-center potential-details");
            // create a card title to hold the name of the potential match
            // & append to card body div
            var potentialDetailsContent = $("<div>").addClass("card-body mt-md-5");
            var potentialNameAge = $("<h5>").addClass("card-title");
            $(potentialNameAge).text(currentPotential.name + ", " + currentPotential.age);
            $(potentialDetailsContent).append(potentialNameAge);
            // create match location text on card
            var potentialLocation = $("<h6>").attr("id", "match-location");
            $(potentialLocation).text(currentPotential.userLocation);
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

        };


        // button currently lacks functionality
        var currentMatchBtn = $("<button>").addClass("btn btn-primary btn-lg btn-block"); 
        $(currentMatchBtn).attr("id", "show-matches-2");
        $(currentMatchBtn).text("Go to Current Matches");
        $(".containerMatch").append(currentMatchBtn);
    };

    

    // ---------------------EVENT LISTENER FOR CLICKING CURRENT MATCHES & SEEING CURRENT MATCHES-------------------
    function seeCurrentMatches() {

        // array of user objects get filled via a call to Firebase

        currentMatches = [
            {name: "Tommy Huynh", age: 23, userLocation: "San Francisco, CA", profilePicture: "assets/images/MatchPageExample1.jpg", 
            gender: "Male", activityLevel: "Active 1-2 days/week", experienceLevel: "5-6 years", fitnessGoals: ["Hit a new PR", "Get stronger"], 
            userAvailability: "Weekdays mornings", weight: "155 lbs",
            profileBlurb: "Sup, I'm Tommy and I'm looking for a cutie to get swole with and hang out with. Make sure to hit me up on social media - I'm all for the clout and I'll be your Zaddy."},
            {name: "Elon Musk", age: 47, userLocation: "San Francisco, CA", profilePicture: "assets/images/MatchPageExample2.jpg", gender: "Male", activityLevel: "Active 1-2 days/week", experienceLevel: "5-6 years", fitnessGoals: ["Hit a new PR", "Get stronger"], 
            userAvailability: "Weekdays mornings", weight: "160 lbs",
            profileBlurb: "Sup, I'm Tommy and I'm looking for a cutie to get swole with and hang out with. Make sure to hit me up on social media - I'm all for the clout and I'll be your Zaddy."},
            {name: "Susan Maple", age: 55, userLocation: "Portland, OR", profilePicture: "assets/images/MatchPageExample3.jpg", gender: "Male", activityLevel: "Active 1-2 days/week", experienceLevel: "5-6 years", fitnessGoals: ["Hit a new PR", "Get stronger"], 
            userAvailability: "Weekdays mornings", weight: "115 lbs",
            profileBlurb: "Sup, I'm Tommy and I'm looking for a cutie to get swole with and hang out with. Make sure to hit me up on social media - I'm all for the clout and I'll be your Zaddy."},
            {name: "Ricky Bobby", age: 19, userLocation: "San Francisco, CA", profilePicture: "assets/images/MatchPageExample4.jpg", gender: "Male", activityLevel: "Active 1-2 days/week", experienceLevel: "5-6 years", fitnessGoals: ["Hit a new PR", "Get stronger"], 
            userAvailability: "Weekdays mornings", weight: "220 lbs",
            profileBlurb: "Sup, I'm Tommy and I'm looking for a cutie to get swole with and hang out with. Make sure to hit me up on social media - I'm all for the clout and I'll be your Zaddy."}
        ];

        // buttons on page are cleared (so that matches can be displayed)
        $(".containerMatch").empty();

        // main title of page 
        var currentMatchTitle = $("<h1>");
        currentMatchTitle.text("Current Swolemate Matches");
        currentMatchTitle.addClass("display-4");

        // a loop to go through the (array of) current matches
        for (var i = 0; i < currentMatches.length; i++) {

            // variable for current match in the array
            var currentMatch = currentMatches[i];
            
            // create a div that is a card
            var cardDiv = $("<div>");
            $(cardDiv).addClass("card");

            // create a  div row to house match's pic and single-word details
            var cardMainOne = $("<div>").addClass("row m-1");
            

            // create an IMAGE for card - FIREBASE 
                // images are placeholders for rn
            var matchPicDiv = $("<div>").addClass("col-md-6");
                // create an image within the div and 
                // set the source of the image to the correct file path
            var matchPic = $("<img>");
            $(matchPic).attr("src", currentMatch.profilePicture);
                // give image a class so can be styled later in CSS - class: profile-card-pic
                // also add other essential attributes - (e.g. alt text: "Match #1 Photo" and so on)
            $(matchPic).addClass("profile-card-pic card-img img-fluid m-xs-auto");
            $(matchPic).attr("alt", "Match #" + (i + 1) + " Photo");
            $(matchPicDiv).append(matchPic);
            $(cardMainOne).append(matchPicDiv);

            // create the textual body of the card
            var matchDetails = $("<div>").addClass("col-md-6 col-xs text-center match-details");
            // create a card title to hold the name of the potential match
            // & append to card body div
            var matchDetailsContent = $("<div>").addClass("card-body mt-md-5");
            var matchName = $("<h5>").addClass("card-title");
            $(matchName).text(currentMatch.name);
            $(matchDetailsContent).append(matchName);

            // create the text fields for age, gender, location, weight, activity level, 
                // experience level, fitness goals, availability, why swolemates
                    // age
            var matchAge = $("<div>").addClass("match-age");
            $(matchAge).html("<p><span class='age-header'>Age: </span>" + currentMatch.age + "</p>");
            $(matchDetailsContent).append(matchAge);

                    // gender
            var matchGender = $("<div>").addClass("match-gender");
            $(matchGender).html("<p><span class='gender-header'>Gender: </span>" + currentMatch.gender + "</p>");
            $(matchDetailsContent).append(matchGender);

                    // location
            var matchLocation = $("<div>").addClass("match-location");
            $(matchLocation).html("<p><span class='location-header'>Location: </span>" + currentMatch.userLocation + "</p>");
            $(matchDetailsContent).append(matchLocation);

                    // weight
            var matchWeight = $("<div>").addClass("match-weight");
            $(matchWeight).html("<p><span class='weight-header'>Weight: </span>" + currentMatch.weight + "</p>");
            $(matchDetailsContent).append(matchWeight);

                    // activity level
            var matchActivity = $("<div>").addClass("match-activity");
            $(matchActivity).html("<p><span class='activity-header'>Activity Level: </span>" + currentMatch.activityLevel + "</p>");
            $(matchDetailsContent).append(matchActivity);

                    // experience level
            var matchExperience = $("<div>").addClass("match-experience");
            $(matchExperience).html("<p><span class='experience-header'>Experience: </span>" + currentMatch.experienceLevel + "</p>");
            $(matchDetailsContent).append(matchExperience);

            // a new row for the longer content that follow the above more list-like details
            var cardMainTwo = $("<div>").addClass("row m-1");
            var matchDetailsContent2 = $("<div>").addClass("col");


                    // fitness goals - a list
            var matchGoals = $("<div>").addClass("match-goals");
            $(matchGoals).append("<p><span class='goal-header'>Goals:</span></p>");
            var goalsList = $("<ul>")
            for(var j = 0; j < currentMatch.fitnessGoals.length; j++) {
                var goal = $("<li>");
                goal.text(currentMatch.fitnessGoals[j]);
                goalsList.append(goal);
            };
            $(matchGoals).append(goalsList);
            $(matchDetailsContent2).append(matchGoals);

                    // availability
            var matchAvailability = $("<div>").addClass("match-availability");
            // if(currentMatch.userAvailability === "Weekday mornings & Weekend mornings")
            $(matchAvailability).html("<p>You might be able to hit the gym together on <span class='availability-header'>" + currentMatch.userAvailability + "</p>");
            $(matchDetailsContent2).append(matchAvailability);
            // this will depend on how the data is stored from the availability table
            //     conditional statments could determine what the sentence says
            

                    // why swolemates
            var matchBlurb = $("<div>").addClass("match-blurb");
            $(matchBlurb).append("<p><span class='blurb-header'>Reason for Swolemates:</span></p>");
            $(matchBlurb).append("<p>" + currentMatch.profileBlurb);
            $(matchDetailsContent2).append(matchBlurb);

            // heart emoji icon to indicate that this is a mutual like
            var heartIcon = $("<div>").addClass("d-flex flex-row-reverse bd-highlight profile-heart");
            $(heartIcon).html("<i class='em em-heart'</i>");
            


            // append these all to one another and to the card
            $(cardMainOne).append(matchDetailsContent);
            $(cardMainTwo).append(matchDetailsContent2);

            // append this card to the match div (i.e. main content on page
            $(cardDiv).append(cardMainOne);
            $(cardDiv).append(cardMainTwo);
            $(cardDiv).append(heartIcon);



            $(".containerMatch").append(cardDiv);

    };

        // button currently lacks functionality
        var potentialMatchBtn = $("<button>").addClass("btn btn-primary btn-lg btn-block"); 
        $(potentialMatchBtn).attr("id", "get-matched-2");
        $(potentialMatchBtn).text("See Possible Matches");
        $(".containerMatch").append(potentialMatchBtn);
    };


    // ---------------------EVENT LISTENER FOR CLICKING x button on a potential match-------------------
        // Click the x button on the card --> the card greys and fades
            // the user is added to your (current user/viewer's) dislike array
            // like/dislike buttons on card become unclickable
        $(document.body).on("click", ".dislike-choice-button", function() {
            
                // establishing which card we're working on
            var cardNumber = $(this).attr("data-dislike");
                    // FOR TESTING console.log(cardNumber);
            var currentCard = $("#card-" + cardNumber);

                // making the card gray out and lose opacity when the dislike button clicked
            $(currentCard).addClass("card-fade");
                // pushing the user whose dislike button was clicked into a dislike array
            currentDislikes.push(currentPotentials[cardNumber]);
                    // FOR TESTING OF DISLIKE ARRAY
                    console.log("disliked people:")
                    console.log(currentDislikes);
                
                // setting a self-created status to render the button unclickable
            var dislikeBtnStatus = $(this).attr("data-clickable", "false");
                // if the button is unclickable according to line just above
            if (dislikeBtnStatus.attr("data-clickable") === "false") {
                    // actually cause button to lose functionality in code
                $(this).css("pointer-events", "none");
                    // grab the like button on the current card
                var currentLikeBtn = $("button[data-like=" + cardNumber + "]");
                        // FOR TESTING
                        // console.log(currentLikeBtn);
                    // causing like button on the card to lose functionality
                $(currentLikeBtn).css("pointer-events", "none");
            };

        });


    // ---------------------EVENT LISTENER FOR CLICKING muscle (like) button on a potential match-------------------
    //  Click the like muscle button on the card --> 
        // user is added to your (current user/viewer's) like array
        // like/dislike buttons on card become unclickable
        $(document.body).on("click", ".like-choice-button", function() {

                // establishing which card we're working on
            var personNumber = $(this).attr("data-like");
                // FOR TESTING console.log(personNumber);
                // JUST IN CASE var currentCard = $("#card-" + personNumber);
                // console.log(currentCard);

                // pushing the user whose like button was clicked into a like array
            currentLikes.push(currentPotentials[personNumber]);
                    // FOR TESTING OF LIKE ARRAY
                    console.log("liked people:")
                    console.log(currentLikes);
                
                //setting a self-created status to render the button unclickable 
            var likeBtnStatus = $(this).attr("data-clickable", "false");
                // if the button is unclickable according to line just above
            if (likeBtnStatus.attr("data-clickable") === "false") {
                    // actually cause button to lose functionality in code 
                $(this).css("pointer-events", "none");
                    // grab the dislike button on the current card
                var currentDislikeBtn = $("button[data-dislike=" + personNumber + "]");
                    // causing the dislike button on the card to lose functionality
                $(currentDislikeBtn).css("pointer-events", "none");
            };
            

        })
    
});



