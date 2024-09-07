// Variables to track time
let startTime, updatedTime, difference, interval;
let paused = false;
let lapCount = 0;

// DOM elements
const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

// Event listeners
startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

function startStopwatch() {
    if (!paused) {
        startTime = new Date().getTime();
    } else {
        paused = false;
        startTime = new Date().getTime() - difference;
    }
    interval = setInterval(updateTime, 10);  // Update every 10 ms
}

function pauseStopwatch() {
    paused = true;
    clearInterval(interval);  // Stop updating the time
    difference = new Date().getTime() - startTime;  // Save the difference
}

function resetStopwatch() {
    clearInterval(interval);
    paused = false;
    difference = 0;
    lapCount = 0;
    timeDisplay.innerHTML = '00:00:00.00';  // Reset the time display
    lapsContainer.innerHTML = '';  // Clear lap times
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor(difference / 3600000);
    let minutes = Math.floor((difference % 3600000) / 60000);
    let seconds = Math.floor((difference % 60000) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    // Update the display
    timeDisplay.innerHTML = (hours < 10 ? '0' : '') + hours + ':' +
                            (minutes < 10 ? '0' : '') + minutes + ':' +
                            (seconds < 10 ? '0' : '') + seconds + '.' +
                            (milliseconds < 10 ? '0' : '') + milliseconds;
}

function recordLap() {
    lapCount++;
    const lapTime = document.createElement('li');
    lapTime.innerText = `Lap ${lapCount}: ${timeDisplay.innerHTML}`;
    lapsContainer.appendChild(lapTime);
}
