$(document).ready(function() {
  // variables
  //=============================================================================================

  var apiKey = "Z0vmrS1H3c1iLslkkHyHnqQ7KAkLxnFe";
  var topics = ["hulk","thor","iron man","abomination"];
  var topic = "";
  console.log(topics);

        // Function for dumping the JSON content for each button into the div
       function displayTopicImages() {
         var index = $(this).attr("index");
         console.log("index" + index);
         var queryString = topics[index];
      //var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=Z0vmrS1H3c1iLslkkHyHnqQ7KAkLxnFe&tag=hulk";
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Z0vmrS1H3c1iLslkkHyHnqQ7KAkLxnFe&q=" + queryString + "&limit=10";
      //var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Z0vmrS1H3c1iLslkkHyHnqQ7KAkLxnFe&q=" + queryString + "&limit=10"

      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
        .then(function(response) {
          console.log("response: ", response);
          console.log("response.data: ", response.data);
          console.log("response.data[0]: ", response.data[0]);
          //console.log("response.data[0].images: ", response.data[0].images);
          //console.log("response.data[0].images.original: ", response.data[0].images.original);
          //console.log("response.data[0].images.original.url: ", response.data[0].images.original.url);

        // Saving the image_original_url property
          for (i = 0; i < 10; i++) {
          //var imageUrl = response.data[i].images.original.url;
          var imageUrl = response.data[i].images.original_still.url;

          // Creating and storing an image tag
          var topicImage = $("<img>");

          // Setting the catImage src attribute to imageUrl
          topicImage.attr("src", imageUrl);
          topicImage.attr("alt", "topic image");

          // Prepending the image to the images div
          $("#images").prepend(topicImage);
        }
         
        });
      }; 

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
            // adding an id
            a.attr("id", "btn" + i);
            // adding th eindex
            a.attr("index", i);
            // Adding a data-attribute
            a.attr("topic-search", topics[i]);
            // Providing the initial button text
            a.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
          }
          console.log(a);
        }



        // Function for adding a new topic entered by user
              $("#add-topic").on("click", function(event) {
              event.preventDefault();

        // This line grabs the input from the textbox
        topic = $("#topic-input").val().trim();
        var lowerCaseTopic = topic.toLowerCase();
        console.log("topic" + topic);
          if (lowerCaseTopic === "") {
            alert("Enter a Valid Topic");
            // Clear text input
            $("#topic-input").val("");
          }   else if (topics.includes(lowerCaseTopic)) {
            alert("Topic Already Exists");
            // Clear text input
            $("#topic-input").val("");
          } else {
            // Adding the topic from the textbox to our array
            topics.push(lowerCaseTopic);
            // Calling renderButtons which handles the processing of our topics array
            renderButtons();
            // Clear topic entered by user
            $("#topic-input").val("");
            console.log(topics);
          }
      });

      // Calling the renderButtons function to display the initial buttons
      renderButtons();
     

      // Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
     $(document).on("click", ".topic", displayTopicImages);

});
