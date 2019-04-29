$(document).ready(function() {

    // Array for current potential matches
    var currentPotentials = [];
    var currentMatches = [];

    // ---------------------EVENT LISTENER FOR CLICKING MATCH ME & SEEING POTENTIAL MATCHES-------------------
        // assumes that modals have been cleared and we land on page to see:
            // 1. <button>Match Me!</button>
            // 2. <button>Current Matches</button>
    $("#get-matched").on("click", function() {

        // Logic for matching users runs
            // wh/ results in currentPotentials getting filled

        // Should be a reference to firebase: db.ref()...
            // the array would use snapshot.val.() to get items out of firebase

        //an example array - FIREBASE - if any key names should be fixed, should be fixed below as well
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
            var likeButton = $("<button>").addClass("btn btn-light choice-button");
            // .html("<button><i class='em em-heart_decoration'</i></button>");
            var emojiLike = $("<i>").addClass("em em-muscle");
            $(likeButton).append(emojiLike);
            var dislikeButton = $("<button>").addClass("btn btn-light choice-button");
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

        }
    })




})




