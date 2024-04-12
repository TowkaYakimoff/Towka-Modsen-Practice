const questions = [
  {
    question: "How many planets are in the solar system?",
    answers: ["8", "9", "10"],
    correctAnswer: 0
  },
  {
    question: "What is the freezing point of water?",
    answers: ["0", "-5", "-6"],
    correctAnswer: 0
  },
  {
    question: "What is the longest river in the world?",
    answers: ["Nile", "Amazon", "Yangtze"],
    correctAnswer: 1
  },
  {
    question: "How many chromosomes are in the human genome?",
    answers: ["42", "44", "46"],
    correctAnswer: 2
  },
  {
    question: "Which of these characters are friends with Harry Potter?",
    answers: ["Ron Weasley", "Draco Malfoy", "Hermione Granger"],
    correctAnswer: 0
  },
  {
    question: "What is the capital of Canada?",
    answers: ["Toronto", "Ottawa", "Vancouver"],
    correctAnswer: 1
  },
  {
    question: "What is the Jewish New Year called?",
    answers: ["Hanukkah", "Yom Kippur", "Kwanzaa"],
    correctAnswer: 1
  }
];

let currentQuestion = 0;
let correctAnswers = 0;

const questionText = document.getElementById("questionText");
const answerText0 = document.getElementById("answerText0");
const answerText1 = document.getElementById("answerText1");
const answerText2 = document.getElementById("answerText2");
const counterText = document.getElementById("counterText");
const nextButton = document.getElementById("nextButton");
const resultContainer = document.getElementById("resultContainer");
const resultText = document.getElementById("resultText");
const restartButton = document.getElementById("restartButton");

function showQuestion() {
  const question = questions[currentQuestion];
  questionText.textContent = question.question;
  answerText0.textContent = question.answers[0];
  answerText1.textContent = question.answers[1];
  answerText2.textContent = question.answers[2];
  counterText.textContent = `Question ${currentQuestion + 1}/${questions.length}`;

  Array.from(document.querySelectorAll('input[name="answer"]')).forEach(input => {
    input.checked = false;
    input.disabled = false;
    input.parentNode.classList.remove("correct", "incorrect");
  });

  nextButton.disabled = true;
  resultContainer.style.display = "none";
}

function checkAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    const question = questions[currentQuestion];
    const correctAnswer = question.correctAnswer;
    const selectedAnswerValue = parseInt(selectedAnswer.value);

    if (selectedAnswerValue === correctAnswer) {
      selectedAnswer.parentNode.classList.add("correct");
      correctAnswers++;
    } else {
      selectedAnswer.parentNode.classList.add("incorrect");
      const correctAnswerElement = document.getElementById(`answerText${correctAnswer}`);
      correctAnswerElement.parentNode.classList.add("correct");
    }

    Array.from(document.querySelectorAll('input[name="answer"]')).forEach(input => {
      input.disabled = true;
    });

    nextButton.disabled = false;
  } else {
    nextButton.disabled = true;
  }
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    resultText.textContent = `You answered ${correctAnswers} out of ${questions.length} questions correctly.`;
    resultContainer.style.display = "block";
  }
}

function restartQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;

  Array.from(document.querySelectorAll('input[name="answer"]')).forEach(input => {
    input.checked = false;
    input.disabled = false;
    input.parentNode.classList.remove("correct", "incorrect");
  });

  showQuestion();
}

const answerInputs = document.querySelectorAll('input[name="answer"]');
answerInputs.forEach(input => {
  input.addEventListener("change", checkAnswer);
});

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

showQuestion();