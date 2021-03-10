// const quizdata = [
//     {
//         question: 'What does API stands for?',
//         a: 'Application Prompt Interface',
//         b: 'Application Programming Interface',
//         c: 'Application Process Interface',
//         d: 'Android Programming Inclusion',
//         correct: 'b'
//     },
//     {
//         question: 'Javascript was launched in which year?',
//         a: '1995',
//         b: '1996',
//         c: '1999',
//         d: '1993',
//         correct: 'b'
//     },
//     {
//         question: 'Most popular language in the world is?',
//         a: 'C',
//         b: 'Python',
//         c: 'Javascript',
//         d: 'C++',
//         correct: 'c'
//     },
//     {
//         question: 'STL in C++ stand for?',
//         a: 'System Template Language',
//         b: 'Standard Template Language',
//         c: 'Standard Template Library',
//         d: 'Strong Template Library ',
//         correct: 'c'
//     },
//     {
//         question: 'jQuery is a library of?',
//         a: 'C++',
//         b: 'Python',
//         c: 'Javascript',
//         d: 'Java',
//         correct: 'c'
//     }

// ];

window.onload = sendApirequest;
const questionList = [];
const optionList = [[], [], [], [], []];
const quizdata = [];
const correctOptions = [];
const charArray = ["a", "b", "c", "d"];
async function sendApirequest() {
  let response = await fetch(
    `https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple`
  );
  let data = await response.json();
  console.log(data);

  for (let i = 0; i < data.results.length; i++) {
    questionList.push(data.results[i].question);
    optionList[i].push(data.results[i].correct_answer);
    correctOptions.push(data.results[i].correct_answer);
    optionList[i].push(data.results[i].incorrect_answers[0]);
    optionList[i].push(data.results[i].incorrect_answers[1]);
    optionList[i].push(data.results[i].incorrect_answers[2]);
  }
  console.log("hello");
  for (let i = 0; i < 5; i++) {
    optionList[i].sort();
  }
  for (let i = 0; i < questionList.length; i++) {
    var correctChar = "";
    for (let j = 0; j < 4; j++) {
      if (optionList[i][j] === correctOptions[i]) correctChar = charArray[j];
    }
    quizdata.push({
      question: questionList[i],
      a: optionList[i][0],
      b: optionList[i][1],
      c: optionList[i][2],
      d: optionList[i][3],
      correct: correctChar,
    });
  }
}

const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const next_btn = document.getElementsByClassName("next-btn");
const submit_btn = document.getElementsByClassName("submit-btn");
const counter = document.getElementsByClassName("counter");
const timer = document.getElementsByClassName("timer");
const timelevel = document.querySelector(".time-bar");
const list1 = document.getElementById("list1");
const list2 = document.getElementById("list2");
const list3 = document.getElementById("list3");
const list4 = document.getElementById("list4");
const alllist = document.querySelectorAll(".listclass");
const quizbox = document.querySelector(".quix-box");
const scorebox = document.querySelector(".wrapper");
const performance = document.querySelector(".performance");
const startquizbtn = document.querySelector(".start-button");
const instructios = document.querySelector(".instructions");
const quizpage = document.querySelector(".quiz-box");
const resultpage = document.querySelector(".result-box");

// audio section
const audio_corr = document.getElementById("audio_corr");
const audio_wron = document.getElementById("audio_wron");
const audio_appl = document.getElementById("audio_appl");

let getresult = false;
let currentQuiz = 0;
let duration;
let max_time = 15;
let correctAnswer = [false, false, false, false, false];

//about verdict icon declaration
var icon = document.createElement("span");
icon.classList.add("verdict_icons");
icon.setAttribute("class", "verdict_icons");

//  load quiz function starts

function loadQuiz() {
  const currQuizData = quizdata[currentQuiz];
  questionEl.innerHTML = `${currQuizData.question}`;
  a_text.innerHTML = `${currQuizData.a}`;
  b_text.innerHTML = `${currQuizData.b}`;
  c_text.innerHTML = `${currQuizData.c}`;
  d_text.innerHTML = `${currQuizData.d}`;
}
//next button function starts

next_btn[0].addEventListener("click", () => {
  if (getresult == false) {
    flag = false;
    icon.innerHTML = "";
    submit_btn[0].style.background = "#93e0ae";
    submit_btn[0].innerHTML = "Submit";
    alllist.forEach((list) => {
      list.style.background = "rgb(235, 240, 241)";
      list.firstElementChild.checked = false;
    });

    timelevel.style.setProperty("--level", 100 + "%");
    timelevel.style.transition = "none";

    if (currentQuiz < quizdata.length - 1) {
      currentQuiz++;
      counter[0].querySelector("span").innerHTML = currentQuiz + 1;
      clearInterval(duration);
      loadQuiz();
      startTimer(max_time);
    }
  } else {
    quizpage.style.display = "none";
    resultpage.style.display = "block";
    let score = 0;
    for (let i = 0; i < correctAnswer.length; i++) {
      if (correctAnswer[i] == true) score++;
    }
    if (score >= 3) {
      audio_appl.play();
    }
    scorebox.firstElementChild.innerHTML = score;
    if (score == 5) performance.firstElementChild.innerHTML = "Excellent 🤩";
    else if (score == 4) performance.firstElementChild.innerHTML = "Good 😀";
    else if (score == 3) performance.firstElementChild.innerHTML = "Average 🙂";
    else performance.firstElementChild.innerHTML = "Poor 🙁";
  }
});
// digital timer function starts

var timelimit = 15;
function startTimer(currTime) {
  duration = setInterval(setClock, 1000);
  function setClock() {
    if (currTime < 10) {
      currTime = "0" + currTime;
    }
    if (currTime >= 0) {
      timer[0].innerHTML = currTime;
      setLevel(timelevel, currTime);
      currTime--;
      timelimit = currTime;
      if (timelimit == -1) {
        audio_wron.play();
        submit_btn[0].style.background = "red";
        submit_btn[0].style.width = "100px";
        submit_btn[0].innerHTML = "Time Up";
        submit_btn[0].disabled = true;

        alllist[
          quizdata[currentQuiz].correct.charCodeAt(0) - "a".charCodeAt(0)
        ].style.background = "#9deea8";
      }
    }

    if (currentQuiz == quizdata.length - 1) {
      next_btn[0].style.background = "#f709a888";
      next_btn[0].style.border = "#f709a8d5";
      next_btn[0].innerHTML = "Result";
      next_btn[0].disabled = true;
      getresult = true;
      next_btn[0].style.background = "#f709a8d5";
      next_btn[0].disabled = false;
    }
    // if ((getresult == true)){
    //     next_btn[0].style.background = "#f709a8d5"
    //     next_btn[0].disabled = false;
    // }
  }
}
//function to set time bar

function setLevel(element, value) {
  element.style.setProperty("--level", (value * 100) / 15 + "%");
  element.style.transition = "width 1s linear";
}
// function to track which option is clicked by thr user

function getselected() {
  const answerEls = document.querySelectorAll(".answer");
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      if (answerEl.id == quizdata[currentQuiz].correct) {
        correctAnswer[currentQuiz] = true;
        alllist[
          answerEl.id.charCodeAt(0) - "a".charCodeAt(0)
        ].style.background = "#9deea8";

        //icon.innerHTML = "&#9989";
        icon.innerHTML = "✔️";
        audio_corr.play();
        alllist[answerEl.id.charCodeAt(0) - "a".charCodeAt(0)].appendChild(
          icon
        );
      } else {
        alllist[
          answerEl.id.charCodeAt(0) - "a".charCodeAt(0)
        ].style.background = "#f709095e";
        alllist[
          quizdata[currentQuiz].correct.charCodeAt(0) - "a".charCodeAt(0)
        ].style.background = "#9deea8";
        audio_wron.play();
        icon.innerHTML = "&#10060";
        alllist[answerEl.id.charCodeAt(0) - "a".charCodeAt(0)].appendChild(
          icon
        );
      }
    }
  });
}

// submit button function starts

var flag = false;
submit_btn[0].addEventListener("click", () => {
  clearInterval(duration);
  flag = true;
  submit_btn[0].style.background = "#93e0ae";
  submit_btn[0].disabled = true;
  getselected();
});

// function to make whole question container behave like label or clickable declared in inline html tags as onclickx

function selectList1() {
  if (flag == false && timelimit > 0) {
    alllist.forEach((list) => {
      if (list.id == "list1") {
        list1.style.background = "rgb(126, 221, 240)";
        list1.firstElementChild.checked = true;
        if (timelimit > 0 && flag == false) {
          submit_btn[0].style.background = "green";
          submit_btn[0].disabled = false;
        }
      } else {
        list.style.background = "rgb(235, 240, 241)";
      }
    });
  }
}
function selectList2() {
  if (flag == false && timelimit > 0) {
    alllist.forEach((list) => {
      if (list.id == "list2") {
        list2.style.background = "rgb(126, 221, 240)";
        list2.firstElementChild.checked = true;
        if (timelimit > 0 && flag == false) {
          submit_btn[0].style.background = "green";
          submit_btn[0].disabled = false;
        }
      } else {
        list.style.background = "rgb(235, 240, 241)";
      }
    });
  }
}
function selectList3() {
  if (flag == false && timelimit > 0) {
    alllist.forEach((list) => {
      if (list.id == "list3") {
        list3.style.background = "rgb(126, 221, 240)";
        list3.firstElementChild.checked = true;
        if (timelimit > 0 && flag == false) {
          submit_btn[0].style.background = "green";
          submit_btn[0].disabled = false;
        }
      } else {
        list.style.background = "rgb(235, 240, 241)";
      }
    });
  }
}
function selectList4() {
  if (flag == false && timelimit > 0) {
    alllist.forEach((list) => {
      if (list.id == "list4") {
        list4.style.background = "rgb(126, 221, 240)";
        list4.firstElementChild.checked = true;
        if (timelimit > 0 && flag == false) {
          submit_btn[0].style.background = "green";
          submit_btn[0].disabled = false;
        }
      } else {
        list.style.background = "rgb(235, 240, 241)";
      }
    });
  }
}

function clickhome() {
  resultpage.style.display = "none";
  startquizbtn.style.display = "block";
  instructios.style.display = "none";
  location.reload();
}
function startquiz() {
  startquizbtn.style.display = "none";
  instructios.style.display = "block";
  quizpage.style.display = "none";
}
function quitbtn() {
  instructios.style.display = "none";
  startquizbtn.style.display = "block";
}
function continuebtn() {
  loadQuiz(); //calling load quiz funtion
  startTimer(max_time); // starting the timer
  quizpage.style.display = "block";
  instructios.style.display = "none";
}
