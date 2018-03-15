var topics = ["Charmander", "Pickachu", "Bulbasaur", "Squirtle", "Ghastly", "Charizard", "Ivysaur", "Blastoise"];

//was trying to figure out why we need the class movie-btn so that we can get the value of the buttons.  Without it, I kept on getting undefined or no value displayed when console.logging it. I've added some text in the div with myButtons id and got no value of the text displayed when I did $(this).val();
$("#myButtons").on('click', ".movie-btn", function(){
    var search = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=EIbLPuQ4rGr54EE4GJio4ZNdVnj8QyRL&limit=25&offset=0&rating=G&lang=en&q=" + search;

    $("#myStuff").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        for(var i=0;i<10;i++) {
            var image = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);
            // attaching data-still and non-animated gif to the element
            image = image.attr("data-still", response.data[i].images.fixed_height_still.url);
            // attaching data-animate and an animated gif to the element
            image = image.attr("data-animate", response.data[i].images.fixed_height_downsampled.url)
            // adding class "gif" to the element
            image = image.addClass("gif");

            image = image.attr("data-state", "still");
            //appending the image and the rating below the images
            $("#myStuff").append(image).append("<p> Rating: "+ response.data[i].rating +"</p>");
            // $("#myStuff").append("<p> " + image + " Rating: " + response.data[i].rating +"</p>");
        }
    });
})
// on click function that targets a class gif.
$("#myStuff").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    // if the data-state is still we will have the src to become an animated gif and vice versa.
    if(state === "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    } else {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }
});

// rendering out the buttons onto the html
function displayButtons() {
    // emptying out the previous buttons so that the buttons with the new added button can be displayed
    $("#myButtons").empty();
    //using map function to go through the array and displaying them with class and attr
    topics.map(function(x) {
       var a = $("<button>");
       a.addClass("movie-btn");
       a.attr("data-name", x);
       a.text(x);
       $("#myButtons").append(a);
    })
}

// adding click function that will add new text to the array
$("#addMyStuff").on("click", function(){
    event.preventDefault();
    //pushing the value of whatever the user typed into the topics array
    topics.push($("#my-input").val().trim());
   
    displayButtons();
})
displayButtons();