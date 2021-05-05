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

 
  // print correct answers only if wrong (calls correctAnswer function)
  var calcScore =0;
  for (let i=1;i<=10;i++) {
     // calc score with answerScore function
     calcScore = calcScore+ answerScore("q"+i);
    if (answerScore("q"+i) === 0) {
      let quizName ="q"+i
      document.getElementById("correctAnswer"+i).innerHTML = correctAnswer("correctString"+i, i);
      $("input[name=" + quizName + "]").parents("ul").addClass("danger")
    }
  }
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
    showScore = showScore + "&nbsp; <strong>Below Average! Please contact TM for retake!</strong>"
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
    $("#submitButton").hide();
  })
  $('#submitButton').click(function () {
    $(this).addClass('hide');
  });

});