let backendQuestions = [
"Explain REST API",
"What is database indexing?",
"How would you design scalable API?"
];

let frontendQuestions = [
"What is DOM?",
"Explain Flexbox",
"What is responsive design?"
];

let dataQuestions = [
"What is machine learning?",
"What is overfitting?",
"What is data preprocessing?"
];

let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

function generateQuestions(){

let resume = document.getElementById("resume").value.toLowerCase();

if(resume.includes("python")){
backendQuestions.push("Explain Python decorators.");
}

if(resume.includes("react")){
frontendQuestions.push("Explain React hooks.");
}

if(resume.includes("machine learning")){
dataQuestions.push("Explain supervised learning.");
}

alert("Questions generated based on resume!");
}

function startInterview(){

let role = document.getElementById("role").value;

if(role === "backend"){
questions = backendQuestions;
}

if(role === "frontend"){
questions = frontendQuestions;
}

if(role === "datascience"){
questions = dataQuestions;
}

questions = [...questions].sort(()=>Math.random()-0.5);

currentQuestion = 0;
score = 0;

showQuestion();
}

function showQuestion(){

clearInterval(timer);
timeLeft = 30;

document.getElementById("progress").innerText =
"Question " + (currentQuestion+1) + " / " + questions.length;

timer = setInterval(()=>{
timeLeft--;
document.getElementById("timer").innerText =
"Time Left: " + timeLeft + " sec";

if(timeLeft === 0){
submitAnswer();
}
},1000);

let box = document.getElementById("interviewBox");

if(currentQuestion < questions.length){

box.innerHTML = `
<p>${questions[currentQuestion]}</p>

<input type="text" id="answer">

<br>

<button onclick="startVoice()">🎤 Speak Answer</button>

<br>

<button onclick="submitAnswer()">Submit</button>
`;

}else{

clearInterval(timer);

let tech = Math.floor(score*0.4);
let comm = Math.floor(score*0.3);
let prob = Math.floor(score*0.3);

box.innerHTML = `
<h2>Interview Completed</h2>

<p>Total Score: ${score}/30</p>

<h3>Analysis</h3>

<p>Technical Knowledge: ${tech}/10</p>
<p>Communication: ${comm}/10</p>
<p>Problem Solving: ${prob}/10</p>
`;
}

}

function submitAnswer(){

let answer = document.getElementById("answer").value.toLowerCase();

if(answer.includes("api") || answer.includes("data") || answer.includes("design") || answer.includes("react") || answer.includes("ml")){
score += 10;
}

currentQuestion++;

showQuestion();
}

function startVoice(){

const recognition = new webkitSpeechRecognition();

recognition.lang = "en-US";

recognition.onresult = function(event){

document.getElementById("answer").value =
event.results[0][0].transcript;

};

recognition.start();

}

function toggleDark(){
document.body.classList.toggle("dark");
}
