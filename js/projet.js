
function commencer() {
  document.getElementById("education").style.display = "none"; //cacher
  document.getElementById("results").style.display = "none"; //cacher
  document.getElementById("container").style.display = "block"; //afficher
  showQuestion(currentQuestion);
  startTimer();
}
var currentQuestion = 1;
var totalQuestions = 10;
var score = 0;
var timer;

function startTimer() {
  timer = setInterval(function () {
    //methode setInterval sera appelle kol 1s(1000)
    var timeLeft = document.getElementById("timer").innerText; //Le texte actuel de l'élément HTML avec l'ID timer est récupéré (temps restant )
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timer);
      calculateResult();
    } else {
      document.getElementById("timer").innerText = timeLeft;
    }
  }, 1000);
}

// Afficher la question actuelle
function showQuestion(questionIndex) {
  var questions = document.querySelectorAll(".question");
  questions.forEach((q, index) => {
    q.style.display = index + 1 === questionIndex ? "block" : "none";
  });
  updateProgress();
}

// Mettre à jour l'affichage de la progression des questions
function updateProgress() {
  document.getElementById("questionProgress").innerText = currentQuestion;
  document.getElementById("prevBtn").style.display =
    currentQuestion === 1 ? "none" : "inline-block";
  document.getElementById("nextBtn").style.display =
    currentQuestion === totalQuestions ? "none" : "inline-block";
  document.getElementById("submitBtn").style.display =
    currentQuestion === totalQuestions ? "inline-block" : "none";
}

function nextQuestion() {
  if (currentQuestion < totalQuestions) {
    currentQuestion++;
    showQuestion(currentQuestion);
  }
}

function prevQuestion() {
  if (currentQuestion > 1) {
    currentQuestion--;
    showQuestion(currentQuestion);
  }
}

function calculateResult() {
  score = 0;

  if (document.getElementById("question1b").checked) {
    score++;
  }
  if (document.getElementById("question2c").checked) {
    score++;
  }
  if (document.getElementById("question3c").checked) {
    score++;
  }
  if (document.getElementById("question4c").checked) {
    score++;
  }
  if (document.getElementById("question5b").checked) {
    score++;
  }
  if (document.getElementById("question6b").checked) {
    score++;
  }
  if (document.getElementById("question7b").checked) {
    score++;
  }
  if (document.getElementById("question8b").checked) {
    score++;
  }
  if (document.getElementById("question9b").checked) {
    score++;
  }
  if (document.getElementById("question10b").checked) {
    score++;
  }

  const percentage = Math.round((score / totalQuestions) * 100);
  document.getElementById("percentageText").innerText = `${percentage}%`;

  const progressRing = document.querySelector(".progress-ring__circle-fg");
  const circumference = 2 * Math.PI * 140; // Nouveau rayon = 140
  const offset = circumference - (percentage / 100) * circumference;
  progressRing.style.strokeDashoffset = offset;

  document.getElementById(
    "score"
  ).innerText = `Vous avez obtenu ${score} sur ${totalQuestions}`;
  document.getElementById("results").style.display = "block";
  document.getElementById("quizForm").style.display = "none";
}

function reponse() {
  document.getElementById("results").style.display = "none";

  const reponsesContainer = document.getElementById("reponses");
  reponsesContainer.style.display = "block";

  const correctAnswers = {
    question1: "correct",
    question2: "correct",
    question3: "correct",
    question4: "correct",
    question5: "correct",
    question6: "correct",
    question7: "correct",
    question8: "correct",
    question9: "correct",
    question10: "correct",
  };

  const questions = document.querySelectorAll(".question");
  questions.forEach((question) => {
    const questionId = question.id;

    const userAnswer = question.querySelector("input[type='radio']:checked");
    const userAnswerValue = userAnswer ? userAnswer.value : null;

    const questionDiv = document.createElement("div");
    questionDiv.classList.add("reponse-item");

    const questionTitle = document.createElement("p");
    const questionText = question.querySelector("label").innerText; //pour récupérer le texte affiché dans le <label> associé à chaque question.
    questionTitle.innerText = `${questionText}`; //innerText :Permet de définir ou de récupérer le texte visible d'un élément HTML.
    questionDiv.appendChild(questionTitle);

    const options = question.querySelectorAll("input[type='radio']");

    options.forEach((option) => {
      const optionButton = document.createElement("button");
      optionButton.classList.add("radio-btnn");
      optionButton.innerText = option.parentElement.innerText.trim(); //trim() : Supprime les espaces blancs au début et à la fin d'une chaîne de text (sans espaces inutiles)
      //parentElt :button
      if (option.value === correctAnswers[questionId]) {
        // Bonne réponse toujours en vert
        optionButton.classList.add("correct");

        const correctSpan = document.createElement("span");
        correctSpan.classList.add("answercommentc");
        correctSpan.innerHTML =
          userAnswerValue === option.value
            ? "&nbsp;&nbsp;Votre réponse&nbsp;&nbsp;"
            : "&nbsp;&nbsp;Réponse correcte&nbsp;&nbsp;";
        optionButton.appendChild(correctSpan);
      } else if (userAnswerValue === option.value) {
        // Mauvaise réponse sélectionnée
        optionButton.classList.add("incorrect");
        const incorrectSpan = document.createElement("span");
        incorrectSpan.classList.add("answercomment");
        incorrectSpan.innerHTML = "&nbsp;&nbsp;Votre réponse&nbsp;&nbsp;";
        optionButton.appendChild(incorrectSpan);
      } else {
        // Réponse neutre (ni correcte ni sélectionnée)
        optionButton.classList.add("neutral");
      }

      questionDiv.appendChild(optionButton);
    });

    reponsesContainer.appendChild(questionDiv);
  });
}
