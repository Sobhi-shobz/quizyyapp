// Quiz Questions
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "Who is the CEO of Tesla?",
    options: ["Jeff Bezos", "Elon Musk", "Bill Gates", "Tony Stark"],
    answer: "Elon Musk"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "None"],
    answer: "Hypertext Markup Language"
  }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("quiz");
const scoreEl = document.getElementById("score");
const summaryEl = document.getElementById("summary");

// Load Question
function loadQuestion() {
  resetState();
  const currentQuiz = quizData[currentQuestion];
  questionEl.innerText = currentQuiz.question;

  currentQuiz.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.addEventListener("click", selectAnswer);
    answersEl.appendChild(button);
  });
}

// Reset previous state
function resetState() {
  nextBtn.style.display = "none";
  while (answersEl.firstChild) {
    answersEl.removeChild(answersEl.firstChild);
  }
}

// Select Answer
function selectAnswer(e) {
  const selectedBtn = e.target;
  const answer = quizData[currentQuestion].answer;
  if (selectedBtn.innerText === answer) {
    selectedBtn.classList.add("correct");
    score++;
    userAnswers.push({question: quizData[currentQuestion].question, correct: true, selected: selectedBtn.innerText});
  } else {
    selectedBtn.classList.add("wrong");
    userAnswers.push({question: quizData[currentQuestion].question, correct: false, selected: selectedBtn.innerText, answer: answer});
  }

  // Disable all buttons
  Array.from(answersEl.children).forEach(button => {
    button.disabled = true;
    if (button.innerText === answer) {
      button.classList.add("correct");
    }
  });

  nextBtn.style.display = "block";
}

// Next Question
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

// Show Results
function showResults() {
  quizContainer.classList.add("hide");
  resultContainer.classList.remove("hide");
  scoreEl.innerText = `Your Score: ${score} / ${quizData.length}`;
  
  summaryEl.innerHTML = userAnswers.map((item, index) => `
    <p><strong>Q${index+1}: ${item.question}</strong><br>
    Your answer: ${item.selected} - ${item.correct ? "✅ Correct" : "❌ Wrong"}${!item.correct ? ` (Correct: ${item.answer})` : ""}</p>
  `).join('');
}

// Restart Quiz
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  quizContainer.classList.remove("hide");
  resultContainer.classList.add("hide");
  loadQuestion();
}

// Initial load
loadQuestion();
