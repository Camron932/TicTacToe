const newBtn = document.getElementById("newBtn");
const formId = document.getElementById("formId");
const startBtn = document.getElementById("startBtn");
const form = document.getElementById("myForm");

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
    
};
