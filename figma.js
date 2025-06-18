const box = document.querySelector('.box');
const btn = document.querySelector('button');
const timerElement = document.getElementById('timer');
const winnerDisplay = document.getElementById('winner-display');
const participantsList = document.getElementById('participants-list');

let timerInterval;
let seconds = 0;
let isRunning = false;
let participants = Array.from(participantsList.querySelectorAll('li'));

// Format time as MM:SS
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update timer display
function updateTimer() {
    seconds++;
    timerElement.textContent = formatTime(seconds);
    
    // Random stop between 5 and 15 seconds
    const randomStopTime = Math.floor(Math.random() * 11) + 5;
    
    if (seconds >= randomStopTime) {
        stopTimer();
        selectWinner();
    }
}

// Start the timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        seconds = 0;
        timerElement.textContent = formatTime(seconds);
        winnerDisplay.textContent = '';
        
        // Reset any previous winner highlighting
        participants.forEach(participant => {
            participant.classList.remove('winner');
        });
        
        timerInterval = setInterval(updateTimer, 1000);
        btn.textContent = 'Running...';
        btn.disabled = true;
    }
}

// Stop the timer
function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    btn.textContent = 'Submit';
    btn.disabled = false;
}

// Select a random winner
function selectWinner() {
    // Get all participants
    participants = Array.from(participantsList.querySelectorAll('li'));
    
    // Generate random number between 10 and 99
    const randomNumber = Math.floor(Math.random() * 90) + 10;
    
    // Select random winner
    const randomIndex = Math.floor(Math.random() * participants.length);
    const winner = participants[randomIndex];
    
    // Highlight winner
    winner.classList.add('winner');
    
    // Display winner with random number
    winnerDisplay.textContent = `Number: ${randomNumber}: ${winner.textContent}!`;
    
    // Scroll to winner if needed
    winner.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Event listener for the submit button
btn.addEventListener('click', () => {
    box.classList.toggle('active');
    startTimer();
});