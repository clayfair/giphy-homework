
//where we dump our dynamically created buttons 
var buttonPanel = $("#animalButtons")

//make an array of button tags 
var heroTags = ["Sheryl Sandberg", "Kanye West", "Muhammad Ali", "Tupac", "Steve Jobs", "Elon Musk", "Kid Cudi", "Denzel Washingotn", "Gary Vaynerchuk", "Will Smith", "Kobe Bryant", "Michael Jordan", "Serena Williams", "Roger Federer", "Tony Robbins", "Donald Glover", "Childish Gambino", "Kendrick Lamar", "Barack Obama", "Malcolm X", "Venus Williams", "Michelle Obama", "Jay Z", "Beyonce"];


var panel = {

    createButtons: function () {
        for (var i = 0; i < heroTags.length; i++) {
            //create a button for each button tag and set a 'data-' class
            buttonPanel.append("<button type='button' class='btn btn-danger' data-hero='" + heroTags[i] + "'>" + heroTags[i] + "</button>");
        }
    }
}


// EVENTS 
window.onload = function () {
    panel.createButtons();
}

//on click for each button (this) hit giphy API to search for GIFS that === (this) button's 'data-' value

$("#animalButtons").on("click", function () {
    // Grabbing and storing the data-hero property value from the button
    var hero = $(this).children("button").attr('data-hero');

    //for some reason it's only displaying 'Sheryl Sandberg' or the first ith even when the inspector clearly shows different data-heroes
    console.log(hero);


    //--   ONCE I FIGURE OUT HOW TO ACCESS HERO I CAN THEN USE IT FOR THE API TO APPEND IMAGES AND RATINGS -- 
    

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        hero + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var heroDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var heroImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                heroImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the animalDiv
                heroDiv.append(p);
                heroDiv.append(heroImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(heroDiv);
            }
        });
});

//populate 10 GIFS and "rating: " + GIFrating 
