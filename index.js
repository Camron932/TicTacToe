const newBtn = document.getElementById("newBtn");
const formId = document.getElementById("formId");
const startBtn = document.getElementById("startBtn");
const form = document.getElementById("myForm");

const winningConditions = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
];

newBtn.addEventListener("click", () => {
    formId.classList.remove("hidden");
});

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    formId.classList.add("hidden");
    initializeGame(data);
});

function initializeVariables(data) {
    data.choice = +data.choice;
    data.board = [1,2,3,4,5,6,7,8,9];
    data.player1 = "X";
    data.player2 = "O";
    data.round = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
};

function addEventListenersToGameBoard(data) {
    document.querySelectorAll('.cubes').forEach((cubes) => {
        cubes.addEventListener('click', (event) => {
            playMove(event.target, data);
        })
    }) 
}

function initializeGame(data) {
    initializeVariables(data);
    addEventListenersToGameBoard(data);
};

function playMove(cubes, data) {
    if(data.gameOver || data.round > 8) {
        return
    }
    if(data.board[cubes.id] === "X" || data.board[cubes.id] === "O") {
    return
    }

    data.board[cubes.id] = data.currentPlayer;
    cubes.textContent = data.currentPlayer;
    cubes.classList.add(data.currentPlayer === "X" ? "player1" : "player2");
    data.round++;

    if(endConditions(data)) {
    }
};

function endConditions(data) {
    if(checkWinner(data)) {
        return true
    } else if (data.round ===9) {
        return true
    }
    return false
};

function checkWinner(data) {
    let result = false;
    winningConditions.forEach(condition => {
        if(data.board[condition[0]] === data.board[condition[1]] && data.board[condition[1]] === data.board[condition[2]]) {
            data.gameOver = true;
            result = true;
        } 
    })
    return result;
};
