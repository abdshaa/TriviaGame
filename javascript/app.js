$(document).ready(function() {
  //event listeners
  $("#remaining-time").hide();
  $("#start").on("click", trivia.startGame);
  $(document).on("click", ".option", trivia.guessChecker);
});
//trivia properties
var trivia = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId: "",
  //questions and answers
  questions: {
    q1: "Who is always the last one to find out everything?",
    q2: "Who is the chef?",
    q3: "How many times has Ross been divorced?",
    q4: "Who did Ross marry in Vegas?",
    q5: "What was the sandwhich that Ross got angry over called?",
    q6: "Who hates Thanksgiving?",
    q7: "What is Chandler Bing's job before he quit?"
    // q8: " ",
    // q9: " ",
    // q10: " "
  },
  options: {
    q1: ["Ross", "Monica", "Chandler", "Pheobe"],
    q2: ["Rachel", "Monica", "Chandler", "Joey"],
    q3: ["1", "0", "3", "5"],
    q4: ["Carol", "Emily", "Rachel", "Pheobe"],
    q5: ["The Moist Maker", "The Moist Turkey", "Ham Sandwhich", "Sandwhich"],
    q6: ["Chandler", "Rachel", "Monica", "Pheobe"],
    q7: [
      "Transpondster",
      "Statistical Analysis and Data Reconfiguration",
      "Paleontology",
      "Message Therapist"
    ]
    // q8: ["Ross", "Monica", "Chandler", "Pheobe"],
    // q9: ["Ross", "Monica", "Chandler", "Pheobe"],
    // q10: ["Ross", "Monica", "Chandler", "Pheobe"]
  },
  answers: {
    q1: "Pheobe",
    q2: "Monica",
    q3: "3",
    q4: "Rachel",
    q5: "The Moist Maker",
    q6: "Chandler",
    q7: "Statistical Analysis and Data Reconfiguration"
    // q8: "",
    // q9: "",
    // q10: ""
  },
  //initialze game
  startGame: function() {
    event.preventDefault();
    //restart game
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    //show game
    $("#results").show();
    //empty results
    $("#results").html("");
    //timer
    $("#timer").text(trivia.timer);
    //remove start button
    $("#start").hide();
    // $("remainingTime").show();
    //first question asked
    trivia.nextQuestion();
  },
  nextQuestion: function() {
    //timer to 20 seconds for each question
    $("#timer").removeClass("last-seconds");
    $("#timer").text(trivia.timer);
    //prevent timer speed up
    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $("#question").text(questionContent);
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    console.log(questionOptions);
    $.each(questionOptions, function(i, val) {
      // console.log(`z is ${z}, i is ${i}`);
      $("#options").append(
        $('<button class="option btn btn-info btn-lg">').text(val)
      );
    });
  },
  //decremt counter and count the unanswered if the timer runs out
  timerRunning: function() {
    //if timmer is still running and questions still left
    if (
      trivia.timer > -1 &&
      trivia.currentSet < Object.keys(trivia.questions).length
    ) {
      $("#timer").text(trivia.timer);
      trivia.timer--;
      if (trivia.timer === 4) {
        $("#timer").addClass("last-seconds");
      }
    }
    //timer ran out, run results
    else if (trivia.timer === -1) {
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("#result").html(
        "<h3>Out of Time! the answer was " +
          Object.values(trivia.answers)[trivia.currentSet] +
          "</h3>"
      );
    }
    //if all questions answered, game end, show results
    else if (trivia.currentSet === Object.keys(trivia.questions).length) {
      //add up results
      $("#results").html(
        "<h3>Good Game!</h3>" +
          "<p>Correct: " +
          trivia.correct +
          "</p>" +
          "<p>Incorrect: " +
          trivia.incorrect +
          "</p>" +
          "<p>Unanswered: " +
          trivia.unanswered +
          "</p>" +
          ",p>Play Again!</p>"
      );
      //hide game sectino
      $("#game").hide();
      //show start button again to begin game
      $("#start").show();
    }
  },
  guessChecker: function() {
    var resultId;

    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    if ($(this).text() === currentAnswer) {
      $(this)
        .addClass("btn-success")
        .removeClass("btn-info");
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("#results").html("<h3>Correct Answer!</h3>");
    } else {
      $(this)
        .addClass("btn-danger")
        .removeClass("btn-info");
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("#results").html("<h3>Incorrect! " + currentAnswer + "</h3>");
    }
  },
  guessResult: function() {
    trivia.currentSet++;
    $(".option").remove();
    $("#results h3").remove();
    trivia.nextQuestion();
  }
};
