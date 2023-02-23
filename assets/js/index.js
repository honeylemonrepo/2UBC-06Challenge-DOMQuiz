var currentQuestion = 0;
var score = 0;
var timerInterval;
var timeRemaining = 100;
const startBtn = document.getElementById("start");
startBtn.addEventListener("click", startQuiz);
const questions = [
  {
    question: "Which of the following is a server-side Java Script object?",
    answers: ["File", "Date", "Function", "DOM"],
    correctAnswer: 0,
  },
  {
    question: "How can you get the type of arguments passed to a function?",
    answers: [
      "using typeof operator",
      "using getType operator",
      "using a protego charm",
      "none of the above",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "Which of the below is used in Java script to insert special characters?",
    answers: ["&", "/", "\\", "#"],
    correctAnswer: 2,
  },
  {
    question: "Why so Java and JavaScript have similar name?",
    answers: [
      "Java Script is a stripped-down version of Java",
      "They both support Object Oriented Programming",
      "Java and JavaScript are both invented by Jar Jar Binks",
      "None of the above",
    ],
    correctAnswer: 2,
  },
  {
    question: "What is the alternate name for Java script?",
    answers: ["LimeScript ", "BodyScript", "ECMScript", "ECMAScript"],
    correctAnswer: 3,
  },
];

function endQuiz() {
  clearInterval(timerInterval);
  document.getElementById("questions").classList.add("hide");
  document.getElementById("end-screen").classList.remove("hide");
  document.getElementById("final-score").innerHTML =
    "<p>Your final score is " + score + ".</p>";
  const submitBtn = document.getElementById("submit");
  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const initialsInput = document.getElementById("initials");
    const initials = initialsInput.value;
    highScores.push({ initials, score });
    highScores.sort(function (a, b) {
      return b.score - a.score;
    });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "highscores.html";
  });
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeRemaining--;
    document.getElementById("time").innerHTML = `${timeRemaining}`;
    if (timeRemaining === 0) {
      endQuiz();
    }
  }, 1000);
}

function checkAnswer(answer, question, index) {
  if (answer == question.answers[index]) {
    score++;
  } else {
    timeRemaining -= 10;
  }
  currentQuestion++;
  if (currentQuestion === questions.length) {
    endQuiz();
  } else {
    displayQuestion();
  }
}

function displayQuestion() {
  var question = questions[currentQuestion];
  document.getElementById(
    "question-title"
  ).textContent = `${question.question}`;
  var answers = "";
  for (const index in question.answers) {
    answers += `<button class="button">${question.answers[index]}</button>`;
  }
  document.getElementById("choices").innerHTML = answers;
  const answerBtn = document.getElementsByClassName("button");
  for (let i = 0; i < answerBtn.length; i++) {
    answerBtn[i].addEventListener("click", function () {
      checkAnswer(this.textContent, question, question.correctAnswer);
    });
  }
}

function startQuiz() {
  document.getElementById("start-screen").style = "display: none";
  document.getElementById("questions").classList.remove("hide");
  displayQuestion();
  startTimer();
}
