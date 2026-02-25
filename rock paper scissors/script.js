const playerChoices = document.querySelectorAll('.choice-btn');
const statusMsg = document.getElementById('status-msg');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const playerCard = document.getElementById('player-choice-card');
const computerCard = document.getElementById('computer-choice-card');
let playerScore = 0;
let computerScore = 0;

const emojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};
const choices = ['rock', 'paper', 'scissors'];
function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}
function determineWinner(player, computer) {
    if (player === computer) return 'draw';
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'player';
    }
    return 'computer';
}
function updateUI(playerChoice, computerChoice, result) {
    playerCard.textContent = emojis[playerChoice];
    computerCard.textContent = emojis[computerChoice];
   playerCard.classList.remove('active');
    computerCard.classList.remove('active');
    void playerCard.offsetWidth;
    playerCard.classList.add('active');
    computerCard.classList.add('active');
    statusMsg.classList.remove('winner', 'loser', 'draw');
    if (result === 'player') {
        playerScore++;
        statusMsg.textContent = `You Win! ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)} beats ${computerChoice}.`;
        statusMsg.classList.add('winner');
    } else if (result === 'computer') {
        computerScore++;
        statusMsg.textContent = `You Lose! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${playerChoice}.`;
        statusMsg.classList.add('loser');
    } else {
        statusMsg.textContent = "It's a Draw!";
        statusMsg.classList.add('draw');
    }
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
}
playerChoices.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.getAttribute('data-choice');
        const computerChoice = getComputerChoice();
        const result = determineWinner(playerChoice, computerChoice);
        updateUI(playerChoice, computerChoice, result);
    });
});