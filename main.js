var classicGameChoice = document.getElementById("classicGame");
var gameTitle = document.getElementById("gameHeader");
var classicRules = document.getElementById("classicRules");

window.onload = displayClassicGame();
// classicGameChoice.addEventListener("click", displayClassicGame);
var currentGame;

function displayClassicGame() {
  var gameName = "Rock, Paper, Scissors";
  var gameDescription = "\nRock Beats Scissors\nScissors Beats Paper\nPaper Beats Rock"
  currentGame = new Game(gameName, gameDescription);
  gameTitle.innerText = currentGame.name;
  classicRules.innerText += currentGame.description;
}
