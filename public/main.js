// Variables
var currentState = Array(9).fill(null);
var xIsCurrentUser = false;
var winner;

// UI Components
var winnerText;

//Constants
const winState = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

window.onload = function () {
    winnerText = document.getElementById('winnerText');
    winnerText.innerHTML = `Next Player: ${!xIsCurrentUser ? 'X' : 'O'}`;
};

function handleClick(button) {
    if (!currentState[button.id] && !winner) {
        xIsCurrentUser = !xIsCurrentUser;

        button.innerHTML = xIsCurrentUser ? 'X' : 'O';
        currentState[button.id] = xIsCurrentUser ? 'X' : 'O';
        winnerText.innerHTML = `Next Player: ${!xIsCurrentUser ? 'X' : 'O'}`;
        if (winner = checkWinner()) {
            winnerText.innerHTML = `Player: ${xIsCurrentUser ? 'X' : 'O'} won the game`;
        }
    }
};

function checkWinner() {
    for (let i = 0; i < winState.length; ++i) {
        const [a, b, c] = winState[i];
        if (currentState[a] && currentState[a] === currentState[b] &&
            currentState[b] === currentState[c]) {
            document.getElementById(`${a}`).classList.add('square-green');
            document.getElementById(`${b}`).classList.add('square-green');
            document.getElementById(`${c}`).classList.add('square-green');
            return currentState[a];
        }
    }
    return null;
}

function startNewGame() {
    // Reset status
    currentState = Array(9).fill(null);
    xIsCurrentUser = false;
    winner = null;
    winnerText.innerHTML = "";

    // re-render the page
    var square = document.getElementsByClassName('square');
    for (let i = 0; i < square.length; ++i) {
        square[i].innerHTML = '';
        square[i].classList.remove('square-green');
    }
}