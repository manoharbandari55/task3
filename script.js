
const quizData = [
  {
    q: "Which keyword declares a block-scoped variable in JavaScript?",
    choices: ["var", "let", "function", "define"],
    a: "let"
  },
  {
    q: "What method converts a JavaScript object to a JSON string?",
    choices: ["JSON.stringify", "JSON.parse", "toString", "Object.toJSON"],
    a: "JSON.stringify"
  },
  {
    q: "Which array method creates a new array by applying a function to each element?",
    choices: ["filter", "map", "reduce", "forEach"],
    a: "map"
  },
  {
    q: "Which symbol is used for strict equality comparison?",
    choices: ["==", "===", "!=", "="],
    a: "==="
  },
  {
    q: "How do you write an arrow function?",
    choices: ["function => {}", "() => {}", "() -> {}", "{} => ()"],
    a: "() => {}"
  },
  {
    q: "Which method adds a new item to the end of an array?",
    choices: ["push()", "pop()", "shift()", "unshift()"],
    a: "push()"
  },
  {
    q: "What does DOM stand for?",
    choices: [
      "Document Object Model",
      "Data Object Method",
      "Digital Ordinance Model",
      "Document Oriented Mode"
    ],
    a: "Document Object Model"
  },
  {
    q: "Which statement stops a loop?",
    choices: ["stop", "end", "break", "exit"],
    a: "break"
  },
  {
    q: "Which operator spreads array elements?",
    choices: ["...", "++", "**", "=>"],
    a: "..."
  },
  {
    q: "What keyword is used to handle errors in JS?",
    choices: ["try/catch", "error/handle", "catch/do", "attempt/fail"],
    a: "try/catch"
  }
];

let current = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const result = document.getElementById("result");

function renderQuestion() {
  const item = quizData[current];
  quizContainer.innerHTML = "";

  const qEl = document.createElement("p");
  qEl.textContent = item.q;
  quizContainer.appendChild(qEl);

  item.choices.forEach(choice => {
    const btn = document.createElement("div");
    btn.className = "choice";
    btn.textContent = choice;
    btn.tabIndex = 0;

    btn.addEventListener("click", () => selectChoice(btn, item.a));
    btn.addEventListener("keydown", e => {
      if (e.key === "Enter") selectChoice(btn, item.a);
    });

    quizContainer.appendChild(btn);
  });
}

function selectChoice(el, correct) {
  document.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
  el.classList.add("selected");

  if (el.textContent === correct) {
    result.textContent = "Correct!";
  } else {
    result.textContent = "Incorrect — correct answer: " + correct;
  }
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector(".choice.selected");
  if (!selected) {
    result.textContent = "Please select an answer.";
    return;
  }

  if (selected.textContent === quizData[current].a) score++;

  current++;
  result.textContent = "";

  if (current < quizData.length) {
    renderQuestion();
  } else {
    quizContainer.innerHTML =
      `<p>Quiz completed! 🎉</p>
       <p>Your score: <strong>${score} / ${quizData.length}</strong></p>`;
    nextBtn.disabled = true;
  }
});


renderQuestion();


const images = [
  "https://picsum.photos/id/1015/800/500",
  "https://picsum.photos/id/1016/800/500",
  "https://picsum.photos/id/1018/800/500",
  "https://picsum.photos/id/1025/800/500"
];

let idx = 0;
const imgEl = document.getElementById("carousel-img");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextC = document.getElementById("next");

function showImage(i) {
  imgEl.src = images[i];
  imgEl.alt = "Image " + (i + 1);
}

showImage(idx);

prevBtn.addEventListener("click", () => {
  idx = (idx - 1 + images.length) % images.length;
  showImage(idx);
});

nextC.addEventListener("click", () => {
  idx = (idx + 1) % images.length;
  showImage(idx);
});

let playing = false;
let timer = null;

playBtn.addEventListener("click", () => {
  if (playing) {
    clearInterval(timer);
    playBtn.textContent = "Play";
  } else {
    timer = setInterval(() => {
      idx = (idx + 1) % images.length;
      showImage(idx);
    }, 2500);

    playBtn.textContent = "Pause";
  }

  playing = !playing;
});
