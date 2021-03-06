const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreElem = document.getElementById('score');
const timeElem = document.getElementById('time');
const endGameElem = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

// Init word
let randomWord;

// Init score
let score = 0;

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Focus on text on start
text.focus();

// Init time
let time = 10;

// Set difficulty to value in ls or medium
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';
// Set difficulty select value
difficultySelect.value = difficulty;

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreElem.innerHTML = score;
}

function updateTime() {
  time--;
  timeElem.innerHTML = time + 's';
  if (time === 0) {
    clearInterval(timeInterval);
    //end game
    gameOver();
  }
}

//Game over show end screen
function gameOver() {
  endGameElem.innerHTML = `
    <h1>Time over</h1>
    <p>Your final score is: ${score}</p>
    <button onclick="window.location.reload()">Reload</button>
  `;

  endGameElem.style.display = 'flex';
}

addWordToDOM();

// Event listeners

// Type word
text.addEventListener('input', e => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    //clear
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3.5;
    } else {
      time += 5;
    }
    updateTime();
  }
});

// Settings button click
settingsBtn.addEventListener('click', e => {
  settings.classList.toggle('hide');
});

// Settings select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
