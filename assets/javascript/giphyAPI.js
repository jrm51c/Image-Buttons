$(document).ready(function() {
  // variables
  //=============================================================================================

  var apiKey = "Z0vmrS1H3c1iLslkkHyHnqQ7KAkLxnFe";
  var topics = ["Incredible Hulk","Thor","Iron Man","Abomination"];
  console.log(topics);

        // Function for dumping the JSON content for each button into the div
        function displayTopicImages() {

           // Storing our giphy API URL for a random cat image
       var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=thor";
      //var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=Z0vmrS1H3c1iLslkkHyHnqQ7KAkLxnFe&tag=hulk";
      //var queryURL = "http://api.giphy.com/v1/gifs/search?q=hulk&api_key=dc6zaTOxFJmzC&limit=1"
      //var queryURL = "https://api.giphy.com/v1/gifs/search?q=hulk&api_key=dc6zaTOxFJmzC";

          console.log(queryURL);
          var topic = $(this).attr("data-name");
          console.log(topic);
         // var queryURL = "https://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=trilogy";
          var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apiKey + "&limit=1";
          console.log(queryURL);
  
          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            $("#topics-view").text(JSON.stringify(response));
            renderButtons();
          });
        }    

  // Function for displaying topic images
        function renderButtons() {

          // Deleting the buttons prior to adding new topics
          // (this is necessary otherwise you will have repeat buttons)
          $("#buttons-view").empty();
  
          // Looping through the array of topics
          for (var i = 0; i < topics.length; i++) {
  
            // Then dynamically generating buttons for each topic in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of topic to our button
            a.addClass("topic");
            // Adding a data-attribute
            a.attr("data-name", topics[i]);
            // Providing the initial button text
            a.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
          }
        }

              // Function for adding a new topic entered by user
              $("#add-topic").on("click", function(event) {
              event.preventDefault();

        // This line grabs the input from the textbox
        var topic = $("#topic-input").val().trim();
      
          if (topics.includes(topic)) {
            alert("fuck");
            // Clear topic entered by user
            $("#topic-input").val("");
          }
          else  {
            // Adding the topic from the textbox to our array
            topics.push(topic);
            // Calling renderButtons which handles the processing of our topics array
            renderButtons();
            // Clear topic entered by user
            $("#topic-input").val("");
            console.log(topics);
          }
      });

      // Calling the renderButtons function to display the initial buttons
      renderButtons();
});  