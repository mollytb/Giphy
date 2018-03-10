console.log(12);

$(document).ready(function () {

    //array of comics
    var api = "5Vkyw3IelCYOvYCClhHuJO0k2uxUA3q2"
    var comedians = ["Tina Fey", "Amy Poehler", "Jerry Seinfeld", "Amy Schumer"];
    function displayGifInfo() {

        // displayGifInfo function re-renders the HTML to display the appropriate content

        var comic1 = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comic1 + "&api_key=dc6zaTOxFJmzC&limit=10";
        //api.giphy.com/v1/gifs/search?q=" + $('#srcCriteria').val() +  "&api_key=dc6zaTOxFJmzC
        // Creating an AJAX call for comic gifs

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;


            for (var i = 0; i < results.length; i++) {

                // Creating a div to hold the comic gif (working)
                var gifDiv = $("<div class='gif'>");

                // Storing the rating data (working)
                var rating = results[i].rating;

                // Creating an element to have the rating displayed (working)
                var pTag = $("<p>").text("Rating: " + rating);

                // Displaying the rating within the gif div (working)
                gifDiv.append(pTag);

                // Retrieving the URL for the image (not working)
                var imgURL = results[i].fixed_height;

                // Creating an element to hold the image (working img tag is there, just no image)
                var image = $("<img class='col-6 offset-3'>");
                image.attr("src", results[i].images.downsized_still.url);
                image.attr("data-still", results[i].images.downsized_still.url);
                image.attr("data-animate", results[i].images.downsized_large.url);
                image.attr("data-state", "still");

                // Appending the image
                gifDiv.append(image);

                // Putting the gif above the previous gif (working)
                $("#gif-view").prepend(gifDiv);
                $(image).on("click", function () {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    }
                    else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }

                });
            }
        });
    }

    // Function for displaying comic gifs
    function renderButtons() {

        
        // remove buttons so you dont have copies of buttons everywhere
        $("#buttons-view").empty();

        // for loop through array
        for (var i = 0; i < comedians.length; i++) {

            // Make buttons for each array item 
            var a = $("<button>");
            // add class of comic-btn
            a.addClass("comic-btn");
            // add a data-attribute
            a.attr("data-name", comedians[i]);
            // button text
            a.text(comedians[i]);
            // add the button to the DOM
            $("#buttons-view").append(a);
        }
    }
    // Add a button when the add comic button is clicked (working)
    $("#add-comic").on("click", function (event) {

        // variable to hold user input (working)
        var comic = $("#comic-input").val().trim();

        // pushing variable made from user input to the array via above variable(working)
        comedians.push(comic);

        // call renderButtons (working)
        renderButtons();
    });

    // Adding a click event listener to all elements with a class of "comic-btn" (working)
    $(document).on("click", ".comic-btn", displayGifInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
});