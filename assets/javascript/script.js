var time = 60;
var quizFinished = false;
var score;
var mainQuestionDiv = document.getElementById("Main-Questions");
var quizStartContent = document.getElementById("quizStartContent");
var mainScoreDiv = document.getElementById("Scores");
var questionsEl = document.getElementById("questions-div");
var buttonA = document.getElementById("answer-A");
var buttonB = document.getElementById("answer-B");
var buttonC = document.getElementById("answer-C");
var buttonD= document.getElementById("answer-D");
var timerEl= document.getElementById("timer");
var startEl = document.getElementById("start");
var initialEl = document.getElementById("initial-input");
var initialBtnEl = document.getElementById("initialbtn");
var scoreBoard = document.getElementById("top-scores");
var topScores = [];
var myButtons = document.querySelectorAll(".answertext");


function hidebuttons () {
    for (var i = 0; i<myButtons.length; i++){
        myButtons[i].classList.add("hide");
    }
};

function showbuttons () {
    for (var i = 0; i<myButtons.length; i++){
        myButtons[i].classList.remove("hide");
    }
};

startEl.addEventListener("click", function(){
    startQuiz();
});

var questionObj = [

    {
        question: 'What HTML element do we put the javascript?',
        answers: ["<Javascript>", "<Script>", "<Scripting>", "<Js>" ],
        correctAnswer: "<Script>",
    },
    {
        question: 'What is not a JS primitive data type?',
        answers: ["String", "Boolean", "Array", "Number"],
        correctAnswer: "Array",
    },
    {
        question: 'String values must be enclosed within ____ when being assigned to variables.',
        answers: ["Commas", "Curly brackets", "Quotes", "Parenthesis"],
        correctAnswer: "Quotes",
    },
    {  
        question: 'What is the first index in an array?',
        answers: ["0", "1", "4","3"],
        correctAnswer: "0",
    },
    {

        question: 'CSS stands for ____ Style Sheets.',
        answers: ["Curious", "Concept", "Cascading", "Concave"],
        correctAnswer: "Cascading",
    }

];
var currentQuestionIndex = 0

function startQuiz () {
    quizStartContent.classList.add("hide");
    setQandA();
    showbuttons();
    myTimer ();
};

function setQandA () {
    var currentQuestion = questionObj[currentQuestionIndex];
    questionsEl.textContent = currentQuestion.question;
    buttonA.textContent = questionObj[currentQuestionIndex].answers[0];
    buttonB.textContent = questionObj[currentQuestionIndex].answers[1];
    buttonC.textContent = questionObj[currentQuestionIndex].answers[2];
    buttonD.textContent = questionObj[currentQuestionIndex].answers[3];
};

function myTimer () {
var startTime = setInterval(function () {
    if (!quizFinished) {
    if (time > 0){
        time--;
        console.log (time)
        timerEl.textContent =  "Time: " + time;
    }
}
    else {
        clearInterval (startTime);
        if (quizFinished) {
        alert ("Quiz Complete")
        } 
        else {
            alert ("Time's Up")
        }
    }
    },1000);
};

function checkAnswer (selectedAnswer){
    var correctAnswer = questionObj[currentQuestionIndex].correctAnswer;

    if(selectedAnswer === correctAnswer){
        timerEl.textContent =  "Time: " + time;
        alert("Correct");
    }
    else{
        time -= 5;
        timerEl.textContent =  "Time: " + time;
        alert("Incorrect");
    };
    if (currentQuestionIndex === questionObj.length - 1){
        timerEl.textContent =  "Time: " + time;
        endQuiz ();
    }
    else{
        currentQuestionIndex ++ ;
        timerEl.textContent =  "Time: " + time;
        setQandA();
    }

};
 function endQuiz(){
    timerEl.textContent =  "Time: " + time;
    score = time;
    quizFinished = true;
    var delay = 1;
            var delayTimer = setInterval(function() {
            delay--;
            if (delay === 0){
            clearInterval(delayTimer);
            alert("Your Score Is:" + score);
            }
},500);

    hidebuttons();
    questionsEl.setAttribute("class", "hide");
    mainScoreDiv.setAttribute("class", "unhide");
   
 };

 function saveScore(){
    var initials = document.getElementById("initial-input").value;
    for (var i = 0; i<scoreBoard.children.length; i++) {
        scoreBoard[0].removeChild();
    }
    var myEntry = {
        score: score,
        initials: initials,
    }
    if (localStorage.getItem("scores") === null){
        topScores.push(myEntry);
        localStorage.setItem("scores", JSON.stringify (topScores));
        var myScoreArray = JSON.parse(localStorage.getItem ("scores"));
    for (var i = 0; i<myScoreArray.length; i++) {
    var tempEl = document.createElement("li");
    tempEl.textContent = myScoreArray[i].score + " " + myScoreArray[i].initials;
    scoreBoard.appendChild(tempEl);
    }
    }
    else {
        topScores.push(myEntry);
        var myTempArray = JSON.parse(localStorage.getItem ("scores"));
        for (var i= 0; i<myTempArray.length; i++) {
            topScores.push(myTempArray[i]);
        }
        localStorage.setItem("scores", JSON.stringify (topScores));
        for (var i = 0; i<topScores.length; i++) {
        var tempEl = document.createElement("li");
        tempEl.textContent = topScores[i].score + " " + topScores[i].initials;
        scoreBoard.appendChild(tempEl);
      
    }
  }
    
}; 
 buttonA.addEventListener("click", function(){
    checkAnswer(buttonA.textContent);
 });
 buttonB.addEventListener("click", function(){
    checkAnswer(buttonB.textContent);
 });
 buttonC.addEventListener("click", function(){
    checkAnswer(buttonC.textContent);
 });
 buttonD.addEventListener("click", function(){
    checkAnswer(buttonD.textContent);
 });

initialBtnEl.addEventListener("click", saveScore);
