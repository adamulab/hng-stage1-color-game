const colors = [
  "#FF0000", // Red
  "#0000FF", // Blue
  "#008000", // Green
  "#FFFF00", // Yellow
  "#800080", // Purple
  "#A52A2A", // Brown
  "#FFC0CB", // Pink
  "#008080", // Teal
];
let targetColor = "";
let score = 0;
let buttonsVisible = false;

const colorBox = document.querySelector(".color-box");
const gameStatus = document.querySelector(".status");
const colorOptionsContainer = document.querySelector(".color-options");
const showScore = document.querySelector(".score");
const newGameButton = document.querySelector(".new-game-button");
const resetGameButton = document.querySelector(".reset-game-button");

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startGame() {
  targetColor = getRandomColor();
  colorBox.style.backgroundColor = targetColor;
  gameStatus.textContent = "";
  buttonsVisible = false;

  // Shuffle the colors array
  shuffleArray(colors);

  colorOptionsContainer.innerHTML = "";
  colors.forEach((color) => {
    const button = document.createElement("button");
    button.classList.add("color-option");
    button.textContent = color;
    button.setAttribute("data-testid", "colorOption");
    button.addEventListener("click", () => handleColorGuess(color, button));
    colorOptionsContainer.appendChild(button);
  });
}

function handleColorGuess(color, button) {
  if (!buttonsVisible) {
    document.querySelectorAll(".color-option").forEach((btn) => {
      btn.style.backgroundColor = btn.textContent;
    });
    buttonsVisible = true;
  }

  if (color === targetColor) {
    score++;
    gameStatus.textContent = "Correct! 🎉";
  } else {
    gameStatus.textContent = "Wrong! Try again.";
  }
  showScore.textContent = `Score: ${score}`;
}

newGameButton.addEventListener("click", () => {
  startGame();
});

resetGameButton.addEventListener("click", () => {
  showScore.textContent = `Score: 0`;
});

startGame();
