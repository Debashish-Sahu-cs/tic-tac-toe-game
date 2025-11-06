let btns = document.querySelectorAll(".btn");
let newGameBtn = document.querySelector("#new-game");
let resetBtn = document.querySelector("#reset");
let winnerIs = document.querySelector("#winner-is");
let turnDisplay = document.querySelector("#turnOf");
let scoreX = document.querySelector("#scoreX");
let scoreO = document.querySelector("#scoreO");
let turnOfX = true;
let boardFinish = false;
let count = 0;
let scoreOfX = 0;
let scoreOfO = 0;

const winningPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnOfX = true;
  boardFinish = false;
  count = 0;
  startNewGame();
  currentTurn("X");
};

const newGame = () => {
  turnOfX = true;
  boardFinish = false;
  count = 0;
  startNewGame();
  currentTurn("X");
  scoreOfX = 0;
  scoreX.textContent = scoreOfX;
  scoreOfO = 0;
  scoreO.textContent = scoreOfO;
};

const currentTurn = (player) => {
  turnDisplay.innerHTML = `Turn of: <strong>${player}</strong> `;
};

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (turnOfX) {
      btn.innerText = "X";
      currentTurn("O");
      turnOfX = false;
    } else {
      btn.innerText = "O";
      currentTurn("X");
      turnOfX = true;
    }
    btn.disabled = true;
    winningCheck();
  });
});

const stopGameOnWin = () => {
  for (let btn of btns) {
    btn.disabled = true;
    turnDisplay.innerText = "";
  }
};

const startNewGame = () => {
  for (let btn of btns) {
    btn.disabled = false;
    btn.innerText = "";
    winnerIs.innerHTML = "";
  }
};
const checkCells = () => {
  for (let btn of btns) {
    if (btn.innerText === "") {
      boardFinish = false;
      break;
    }
    boardFinish = true;
  }
};
const checkDraw = () => {
  if (count === 9 && boardFinish) {
    winnerIs.innerHTML = `<strong>MATCH DRAW!</strong>`;
  }
};

const winnerDisplay = (player) => {
  winnerIs.innerHTML = `Player <strong>${player}</strong> winns.🎉`;
  stopGameOnWin();
};

const winningCheck = () => {
  count++;
  checkCells();
  for (pattern of winningPatterns) {
    let pos1 = btns[pattern[0]].innerText;
    let pos2 = btns[pattern[1]].innerText;
    let pos3 = btns[pattern[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        winnerDisplay(pos1);
        boardFinish = false;
        if (pos1 == "X") {
          scoreOfX++;
          scoreX.textContent = scoreOfX;
        } else {
          scoreOfO++;
          scoreO.textContent = scoreOfO;
        }
      } else {
        checkDraw();
      }
    }
  }
};

newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);
