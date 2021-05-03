// Business Logic
function submitQuiz() {

  // function to return correct answer string
  function correctAnswer(correctStringNo) {
    return ("Correct answer: &nbsp;<strong>" +
      (document.getElementById(correctStringNo).innerHTML) + "</strong>");
  }
  // get each answer score
  function answerScore(qName) {
    var radiosNo = document.getElementsByName(qName);

    for (var i = 0, length = radiosNo.length; i < length; i++) {
      if (radiosNo[i].checked) {
        var answerValue = Number(radiosNo[i].value);
      }
    }
    // change NaNs to zero
    if (isNaN(answerValue)) {
      answerValue = 0;
    }
    return answerValue;
  }

  // calc score with answerScore function
  var calcScore = (answerScore('q1') + answerScore('q2') + answerScore('q3') + answerScore('q4') + answerScore('q5') + answerScore('q6') + answerScore('q7') + answerScore('q8') + answerScore('q9') + answerScore('q10'));

  // calculate "possible score" integer
  var questionCountArray = document.getElementsByClassName('question');

  var questionCounter = 0;
  for (var i = 0, length = questionCountArray.length; i < length; i++) {
    questionCounter++;
  }

  // show score as "score/possible score"
  var showScore = "Your Score: " + calcScore + "/" + questionCounter;
  if (calcScore >= 8) {
    showScore = showScore + "&nbsp; <strong>Excellent work!</strong>"
  } else if (calcScore >= 5 && calcScore < 8) {
    showScore = showScore + "&nbsp; <strong>Good! Fair Performance!</strong>"
  } else if (calcScore <= 4) {
    showScore = showScore + "&nbsp; <strong>Below Average! Please retake the assessment!</strong>"
  };
  document.getElementById('userScore').innerHTML = showScore;
}

// UI Logic
$('input[type="checkbox"]').on('change', function () {
  $(this).siblings('input[type="checkbox"]').not(this).prop('checked', false);
});

$(document).ready(function () {
  $("form#quizForm").submit(function (event) {
    event.preventDefault();
  })
  $('#submitButton').click(function () {
    $(this).addClass('hide');
  });

});