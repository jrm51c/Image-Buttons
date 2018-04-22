$(document).ready(function() {
  // variables
  //=============================================================================================

  var apiKey = "Z0vmrS1H3c1iLslkkHyHnqQ7KAkLxnFe";
  var topics = ["hulk","thor","iron man","abomination"];
  var topic = "";
  console.log(topics);
       
       function displayTopicImages() {
         var index = $(this).attr("index");
         console.log("index" + index);
         var queryString = topics[index];
         console.log("qry string " + queryString);
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Z0vmrS1H3c1iLslkkHyHnqQ7KAkLxnFe&q=" + queryString + "&limit=10";

      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
        .then(function(response) {
          console.log("response: ", response);
          //console.log("response.data: ", response.data);
          //console.log("response.data[0]: ", response.data[0]);
          //console.log("response.data[0].images: ", response.data[0].images);
          //console.log("response.data[0].images.original: ", response.data[0].images.original);
          //console.log("response.data[0].images.original.url: ", response.data[0].images.original.url);

        // Saving the image_original_url property
          for (i = 0; i < 10; i++) {
          var urlAnimate = response.data[i].images.original.url;
          var urlStill = response.data[i].images.original_still.url;
          var imgRating = response.data[i].rating;
          var imgTitle = response.data[i].title;
          // Creating and storing a div tag
          var imageDiv = $("<div>");
          //imageDiv.addClass("imgContainer");
          imageDiv.addClass(queryString);
          // Creating a paragraph tag with the result item's rating
          var rating = $("<p>").text("Rating: " + imgRating);  
          // Creating a paragraph tag with the result item's title
          var title = $("<p>").text("Title: " + imgTitle); 
          // Creating and storing an image tag
          var topicImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          topicImage.attr("src", urlStill);
          topicImage.attr("data-still", urlStill);
          topicImage.attr("data-animate", urlAnimate)
          topicImage.attr("data-state", "still");
          topicImage.attr("alt", "topic image");  
          topicImage.addClass("image");
          //topicImage.addClass(queryString);
          // Appending the paragraph and image tag to the animalDiv
          imageDiv.append(topicImage);
          imageDiv.append(title); 
          imageDiv.append(rating); 
          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#images").prepend(imageDiv);

        }
         
        });
      }; 

  // Function for displaying topic image buttons
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
           // a.attr("id", "btn" + i);
            // adding the index
            a.attr("index", i);
            // Adding a data-attribute
            //a.attr("topic-search", topics[i]);
            a.attr("id", topics[i]);
            // Providing the initial button text
            a.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
          }
          console.log(topics);
        }

        // Function for adding a new topic entered by user
        $("#add-topic").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        topic = $("#topic-input").val().trim();
        var lowerCaseTopic = topic.toLowerCase();
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
          }
      });

      // Function for removing a topic selected by user
      $("#remove-topic").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        topic = $("#topic-input").val().trim();
        var lowerCaseTopic = topic.toLowerCase();
        console.log("LCT" + lowerCaseTopic);
          if (lowerCaseTopic === "") {
            alert("Enter a Valid Topic");
            // Clear text input
            $("#topic-input").val("");
          }   else if (topics.includes(lowerCaseTopic) === false) {
            alert("Topic Does Not Exist");
            // Clear text input
            $("#topic-input").val("");
          } else {
            // Delete the topic from the textbox to our array
            // Determine position of topic within the topics array
            var topicIndex = topics.indexOf(lowerCaseTopic);
            console.log("find" + topicIndex);
            topics.splice(topicIndex, 1);
            console.log(topics);
            // Remove images from page if they exist
           $("div").remove("." + lowerCaseTopic);
            // Calling renderButtons which handles the processing of our topics array
            renderButtons();
            // Clear topic entered by user
            $("#topic-input").val("");
          }
      });

      // Function to toggle image state from still to animate
      $("body").on("click", ".image", function() {
        //$(".image").on("click", function()  {
        //$(".imgContainer").on("click", ".image", function) {
        var state = $(this).attr("data-state");
        var urlStill = $(this).attr("data-still");
        var urlAnimate = $(this).attr("data-animate");
        console.log(state);
        console.log(urlStill);
        console.log(urlAnimate);
      
          if (state === "still") {
            $(this).attr("src", urlAnimate);
            $(this).attr("data-state", "animate");
          } else if (state === "animate")  {
            $(this).attr("src", urlStill);
            $(this).attr("data-state", "still");
          }
      });

      // Calling the renderButtons function to display the initial buttons
      renderButtons();
     

      // Using $(document).on instead of $(".topic").on to add event listeners to dynamically generated elements
     $(document).on("click", ".topic", displayTopicImages);

});
