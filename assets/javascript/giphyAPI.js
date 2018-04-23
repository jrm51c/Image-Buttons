$(document).ready(function () {
  // variables
  //=============================================================================================

  var apiKey = "Z0vmrS1H3c1iLslkkHyHnqQ7KAkLxnFe";
  var topics = ["hulk", "thor", "wasp", "wolverine", "tiger", "bear", "eagle", "turtle", "mantis", "snake"];
  var topic;

  // functions
  //=============================================================================================

  // Function for creating and displaying images
  function displayTopicImages() {
    var index = $(this).attr("index");
    var queryString = topics[index];
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Z0vmrS1H3c1iLslkkHyHnqQ7KAkLxnFe&q=" + queryString + "&limit=10";
    console.log(topics);
    console.log("qryString" + queryString);
    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
      .then(function (response) {
        console.log("response: ", response);

        // Saving the image_original_url property
        for (i = 0; i < 10; i++) {
          var urlAnimate = response.data[i].images.original.url;
          var urlStill = response.data[i].images.original_still.url;
          var imgRating = response.data[i].rating;
          var imgTitle = response.data[i].title;
          // Creating and storing a div tag
          var imageDiv = $("<div>");
          imageDiv.addClass("imgContainer");
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
          // Append the paragraph and image tag to the imageDiv
          imageDiv.append(topicImage);
          imageDiv.append(title);
          imageDiv.append(rating);
          // Prepend the imageDiv to the images div
          $("#images").prepend(imageDiv);

        }

      });
  };

  // Function for creating and displaying topic buttons
  function renderButtons() {
    // Delete existing buttons prior to adding new topics
    // Prevents duplicate buttons
    $("#buttons-view").empty();
    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {
      // Generate a button for each topic in the array
      var a = $("<button>");
      // Add class
      a.addClass("topic");
      // Add id
      a.attr("id", topics[i]);
      // a.attr("id", "btn" + i);
      // Add index
      a.attr("index", i);
      // Adding a data-attribute
      //a.attr("topic-search", topics[i]);
      // Initial button text
      a.text(topics[i]);
      // Add button to the buttons-view div
      $("#buttons-view").append(a);
    }
    console.log(topics);
  }

  // Function for adding a new topic entered by user
  $("#add-topic").on("click", function (event) {
    event.preventDefault();
    // Grab user input from the textbox
    topic = $("#topic-input").val().trim();
    var lowerCaseTopic = topic.toLowerCase();
    
    if (lowerCaseTopic === "") {
      alert("Enter a Valid Topic");
    } else if (topics.includes(lowerCaseTopic)) {
      alert("Topic Already Exists");
      // Clear text input
      $("#topic-input").val("");
    } else {
      // Add the new topic to the topics array
      topics.push(lowerCaseTopic);
      // Clear topic entered by user
      $("#topic-input").val("");
      // Calling renderButtons which handles the processing of the topics array
      renderButtons();
    }
  });

  // Function for removing a topic selected by user
  $("#remove-topic").on("click", function (event) {
    event.preventDefault();
    // Grab user input from the textbox
    topic = $("#topic-input").val().trim();
    var lowerCaseTopic = topic.toLowerCase();
    console.log("remove " + lowerCaseTopic);
    if (lowerCaseTopic === "") {
      alert("Enter a Valid Topic");
      // Clear text input
      $("#topic-input").val("");
    } else if (topics.includes(lowerCaseTopic) === false) {
      alert("Topic Does Not Exist");
      // Clear text input
      $("#topic-input").val("");
    } else {
      // Remove images from page if they exist
       $("div").remove("." + lowerCaseTopic);
      // Determine position of topic within the topics array
      // Delete topic from the topics array
      var topicIndex = topics.indexOf(lowerCaseTopic);
      topics.splice(topicIndex, 1);

      // Clear topic entered by user
      $("#topic-input").val("");
      // Calling renderButtons which handles the processing of the topics array
      renderButtons();
    }
  });

  // Function to toggle image state
  $("body").on("click", ".image", function () {
    var state = $(this).attr("data-state");
    var urlStill = $(this).attr("data-still");
    var urlAnimate = $(this).attr("data-animate");

    if (state === "still") {
      $(this).attr("src", urlAnimate);
      $(this).attr("data-state", "animate");
    } else if (state === "animate") {
      $(this).attr("src", urlStill);
      $(this).attr("data-state", "still");
    }
  });

  // Function to allow user to move image into the favorites div
  /*$(function () {
    $("#images").draggable({
        revert: "invalid",
        refreshPositions: true,
        drag: function (event, ui) {
            ui.helper.addClass("draggable");
        },
        stop: function (event, ui) {
            ui.helper.removeClass("draggable");
            var image = this.src.split("/")[this.src.split("/").length - 1];
            if ($.ui.ddmanager.drop(ui.helper.data("draggable"), event)) {
                alert(image + " dropped.");
            }
            else {
                alert(image + " not dropped.");
            }
        }
    });
    $("#favorite-images").droppable({
        drop: function (event, ui) {
            if ($("#favorite-images").length == 0) {
                $("#favorite-images").html("");
            }
            ui.draggable.addClass("dropped");
            $("#favorite-images").append(ui.draggable);
        }
    });
});*/

  // Calling renderButtons which handles the processing of the topics array
  renderButtons();


  // Using $(document).on instead of $(".topic").on to add event listeners to dynamically generated elements
  $(document).on("click", ".topic", displayTopicImages);

});