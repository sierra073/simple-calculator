const computerPlays = ["👊🏿","✋🏿","✌🏿"];
const userPlays = ["👊","✋","✌️"];

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', (e) => game(e.target.id));
});

function userPlay(id) {
  if (id=="user-rock") {
    return "👊";
  } else if (id=="user-paper") {
    return "✋";
  } else {
    return "✌️";
  }
}

function computerPlay() {
  let randomIndex = Math.floor((Math.random() * 3));
  return computerPlays[randomIndex];
}

function playRound(playerSelection, computerSelection) {
  let playerIndex = userPlays.indexOf(playerSelection);
  let computerIndex = computerPlays.indexOf(computerSelection);

  if ((playerIndex == 0 && computerIndex == 2) ||
    (playerIndex > 0 && playerIndex == computerIndex + 1)) {
    return 'Player Won';
  }
  else {
    return (playerIndex == computerIndex) ? 'Tied' : 'Computer Won';
  }
}

function game(buttonId) {

  playerScore = getScore('#player-score');
  computerScore = getScore('#computer-score');

  if (playerScore < 5 & computerScore < 5) {
    playAndUpdate(buttonId);
    checkResult()
  }
}

function playAndUpdate(buttonId) {
  const playContainer = Array.from(document.querySelector('#play-container').children);
  playContainer[0].textContent = userPlay(buttonId)
  playContainer[1].textContent = computerPlay()
  playContainer.forEach((playText) => {
    playText.style.visibility = 'visible';
  });

  let playerSelection = playContainer[0].textContent;
  let computerSelection = playContainer[1].textContent;
  result = playRound(playerSelection, computerSelection);
  (result == 'Player Won') ? updateScore('#player-score') : (result == 'Computer Won') ? updateScore('#computer-score'): true;
}

function getScore(scoreId) {
  scoreDiv = document.querySelector(scoreId);
  return parseInt(scoreDiv.textContent,10);
}

function updateScore(scoreId) {
  score = getScore(scoreId);
  score ++;
  scoreDiv.textContent = score;
}

function displayResult(playerScore, computerScore) {
  let resultDiv = document.querySelector('#final-score');
  let result = document.createElement('p');
  result.classList.add("win-text")
  if (playerScore == computerScore) {
    result.textContent = "You tied the game 😐"
    result.style.color = 'darkgrey'
    resultDiv.appendChild(result);
  }
  else if (playerScore > computerScore) {
    result.textContent = "You won the game! 😄"
    result.style.color = '#3cb371'
    resultDiv.appendChild(result);
  }
  else {
    result.textContent = "You lost the game 😔"
    result.style.color = 'red'
    resultDiv.appendChild(result);
  }
}

function checkResult() {
  playerScore = getScore('#player-score');
  computerScore = getScore('#computer-score');
  if (playerScore == 5 || computerScore == 5) {
    displayResult(playerScore, computerScore);
  }
}
