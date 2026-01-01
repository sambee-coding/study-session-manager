let timer; // will store the setInterval reference
let isRunning = false;
let currentMinutes = 25;
let currentSeconds = 0;


const startBtn = document.getElementById("startBtn");
const breakBtn = document.getElementById("breakBtn");
const resetBtn = document.getElementById("resetBtn");
const time = document.getElementById("timer");


//function to update display

function updateDisplay() {
    time.textContent = `${String(currentMinutes).padStart(2, '0')}:${String(currentSeconds).padStart(2, '0')}`;
}
updateDisplay();

startBtn.addEventListener("click" , startSession);
breakBtn.addEventListener("click" , startBreak);
resetBtn.addEventListener("click" , resetTimer);

function startSession(){
    if (isRunning) return; 
    isRunning = true;

    timer = setInterval(() => {
        if (currentSeconds === 0) {
            if (currentMinutes === 0) {
                clearInterval(timer);
                isRunning = false;
             
                return;
            }
            currentMinutes--;
            currentSeconds = 59;
        } else {
            currentSeconds--;
        }
        updateDisplay();
    }, 1000);
}
function displayAlarm(){
    if(currentMinutes == 0 && currentSeconds == 0){
        playAlarm();
        alert("Time is up");
    }
}
function startBreak() {
    clearInterval(timer);
    isRunning = false;
    currentMinutes = 5; 
    currentSeconds = 0;
      timer = setInterval(() => {
        if (currentSeconds === 0) {
            if (currentMinutes === 0) {
                clearInterval(timer);
                isRunning = false;
             playAlarm();
                return;
            }
            currentMinutes--;
            currentSeconds = 59;
        } else {
            currentSeconds--;
        }
        updateDisplay();
    }, 1000);
    
}

function resetTimer(){
    clearInterval(timer);
    isRunning = false;
    currentMinutes = 25;
    currentSeconds = 0;
    updateDisplay();
}
function playAlarm(){
    const alarm = document.createElement("audio");
    alarm.src = "alarm-clock-short-6402.mp3";
    alarm.play();
}

