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
      $("input[name=" + quizName + "]:checked").next("label").addClass("danger")
    }
    else if (answerScore("q"+i) === 1) {
      quizName ="q"+i
      $("input[name=" + quizName + "]:checked").next("label").addClass("success")
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
    $("#userScore").addClass("success");
  } else if (calcScore >= 5 && calcScore < 8) {
    showScore = showScore + "&nbsp; <strong>Good! Fair Performance!</strong>"
    $("#userScore").addClass("primary");
  } else if (calcScore <= 4) {
    showScore = showScore + "&nbsp; <strong>Below Average! Please contact your instructor for retake!</strong>"
    $("#userScore").addClass("danger");
  };
  document.getElementById('userScore').innerHTML = showScore;
}
// UI Logic
$('input[type="checkbox"]').on('change', function () {
  $(this).parent().siblings().children('input[type="checkbox"]').not(this).prop('checked', false);
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