var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

$(".btn").on("click", function(event) {

  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  var currentLevel = userClickedPattern.length - 1;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(currentLevel);


});

function playSound(currentKey) {

  switch (currentKey) {
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;

    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;

    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;

    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;

    default:
      console.log(currentKey);

  }
}

function animatePress(currentKey) {
  var currentColour = $("#" + currentKey);
  currentColour.addClass("pressed");
  setTimeout(function() {
    currentColour.removeClass("pressed");
  }, 100);

}


function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    startOver();
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
