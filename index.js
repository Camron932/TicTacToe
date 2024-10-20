const newBtn = document.getElementById("newBtn");
const formId = document.getElementById("formId");
const startBtn = document.getElementById("startBtn");
const form = document.getElementById("myForm");
const restartBtn = document.getElementById("restartBtn");

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

newBtn.addEventListener("click", () => {
    formId.classList.remove("hidden");
    location.reload();
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
    data.board = [0,1,2,3,4,5,6,7,8];
    data.player1 = "X";
    data.player2 = "O";
    data.round = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
};

function resetDom() {
    document.querySelectorAll(".cubes").forEach((cubes) => {
        cubes.className = "cubes";
        cubes.textContent = "";
    });
};

function addEventListenersToGameBoard(data) {
    document.querySelectorAll('.cubes').forEach((cubes) => {
        cubes.addEventListener('click', (event) => {
            playMove(event.target, data);
        });
    });
    restartBtn.addEventListener('click', () => {
        initializeVariables(data);
        resetDom();
        adjustDom("displayTurn", `${data.player1Name}'s turn`);
    });
};

function initializeGame(data) {
    adjustDom('displayTurn', `${data.player1Name}'s turn`);
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
        return;
    }

    if(data.choice === 0) {
        changePlayer(data);
    } else if (data.choice === 1) {
        easyAiMove(data);
        data.currentPlayer = "X";
    } else if (data.choice === 2) {
        changePlayer(data);
        impossibleAiMove(data);
        if (endConditions(data)) {
            return;
        }
        changePlayer(data);
    }
};

function endConditions(data) {
    if(checkWinner(data, data.currentPlayer)) {
        let winnerName = 
            data.currentPlayer === "X" ? data.player1Name : data.player2Name;
        adjustDom('displayTurn', winnerName + ' has won the game');
        return true;
    } else if (data.round === 9) {
        adjustDom('displayTurn', "It's a Tie!");
        data.gameOver = true;
        return true;
    }
    return false;
};

function checkWinner(data, player) {
    let result = false;
    winningConditions.forEach((condition) => {
        if(
            data.board[condition[0]] === player && 
            data.board[condition[1]] === player &&
            data.board[condition[2]] === player
        ) {
            result = true;
        } 
    })
    return result;
};

function adjustDom(className, textContent) {
    const elem = document.querySelector(`.${className}`);
    elem.textContent = textContent;
};

function changePlayer(data) {
    data.currentPlayer = data.currentPlayer === "X" ? "O" : "X";
    let displayTurnText =
    data.currentPlayer === "X" ? data.player1Name : data.player2Name;
    adjustDom('displayTurn', `${displayTurnText}'s turn`);
};

function easyAiMove(data) {
    changePlayer(data);
  
    data.round++;
    let availableSpaces = data.board.filter(
      (space) => space !== "X" && space !== "O"
    );
    let move =
      availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
    data.board[move] = data.player2;
    setTimeout(() => {
      let box = document.getElementById(`${move}`);
      box.textContent = data.player2;
      box.classList.add("player2");
    }, 200);
  
    if (endConditions(data)) {
      return;
    }
    changePlayer(data);
};


function impossibleAiMove(data) {
    data.round++;

    const move = minimax(data, "O").index;
    data.board[move] = data.player2;
    let cubes = document.getElementById(`${move}`);
    cubes.textContent = data.player2;
    cubes.classList.add("player2");

    console.log(data);
    };

    function minimax(data, player) {
        let availableSpaces = data.board.filter(
            (space) => space !== "X" && space !== "O"
        );
        if(checkWinner(data, data.player1)) {
            return {
                score: -100,
            };
        } else if(checkWinner(data, data.player2)) {
            return {
                score: 100,
            };
        } else if (availableSpaces.length === 0) {
            return {
                score: 0,
            };
        }
          
          const potentialMoves = [];
          for(let i=0; i<availableSpaces.length; i++) {
            let move = {};
            move.index = data.board[availableSpaces[i]];
            data.board[availableSpaces[i]] = player;
            if(player === data.player2) {
                move.score = minimax(data, data.player1).score;
            } else {
                move.score = minimax(data, data.player2).score;
            }
            data.board[availableSpaces[i]] = move.index;
            potentialMoves.push(move);
        }
        let bestMove = 0;
        if(player === data.player2) {
            let bestScore = -10000;
            for (let i=0; i<potentialMoves.length; i++) {
                if(potentialMoves[i].score > bestScore) {
                    bestScore = potentialMoves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for(let i=0; i<potentialMoves.length; i++) {
                if (potentialMoves[i].score > bestScore) {
                    bestScore = potentialMoves[i].score;
                    bestMove = i;
                }
            }
        }
        return potentialMoves[bestMove];
    }