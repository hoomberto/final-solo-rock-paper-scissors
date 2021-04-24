var classicGameChoice = document.getElementById("classicGame");
var botzGameChoice = document.getElementById("botzGame");
var gameTitle = document.getElementById("gameHeader");
var gameSubtitle = document.getElementById("gameSubHeader");
var classicRules = document.getElementById("classicRules");
var gameChoices = document.getElementById("gameChoices");
var gameTypes = document.getElementById("gameTypes");
var gameSelections = document.getElementById("gameSelections");
var playerWins = document.getElementById("playerWins");
var compWins = document.getElementById("compWins");
var rpsChoices = document.querySelectorAll(".choice");
var resultText = document.getElementById("resultText");
var playAgainBtn = document.getElementById("playAgain");
var botzGameSection = document.getElementById("botz");
var mainGameSection = document.getElementById("mainGame");

window.onload = displayDefaultGame();
classicGameChoice.addEventListener("click", playClassicGame);
playAgainBtn.addEventListener("click", playAnother);
botzGameChoice.addEventListener("click", playBotzGame);
console.log(rpsChoices)

for (var choice of rpsChoices) {
  console.log(choice);
  choice.addEventListener("click", function() {
  selectChoice(event);
});
}
// if (rpsChoices) {
//   console.log(rpsChoices);
//   for (var choice of rpsChoices) {
//     console.log(choice);
//     choice.addEventListener("click", function() {
//     selectChoice(event);
//   });
//   }
// }
var currentGame;
var currentUser;
var currentComp;

function displayDefaultGame() {
  var gameName = "Rock, Paper, Scissors";
  var gameDescription = "\nRock Beats Scissors\nScissors Beats Paper\nPaper Beats Rock"
  currentGame = new Game(gameName, gameDescription);
  currentUser = new Player();
  currentComp = new Player();
  playerWins.innerText += `${currentUser.wins}`;
  compWins.innerText += `${currentComp.wins}`;
  gameTitle.innerText = currentGame.name;
  classicRules.innerText += currentGame.description;
}

function playAnother() {
  resultText.innerText = "";
  show(gameSelections);
  hide(gameChoices);
  hide(playAgainBtn)
  show(classicGameChoice);
  show(botzGameChoice);
  gameSubtitle.innerText = "Choose your game!"
}

function resetWinCount() {
  playerWins.innerText = "Wins: ";
  compWins.innerText = "Wins: ";
}

function setWinCount() {
  resetWinCount()
  playerWins.innerText += `${currentUser.wins}`;
  compWins.innerText += `${currentComp.wins}`;
}

function hide(element) {
  element.classList.add("hidden");
}

function show(element) {
  element.classList.remove("hidden");
}

function playClassicGame() {
  hide(classicGameChoice)
  hide(botzGameChoice)
  show(gameChoices)
  gameSubtitle.innerText = "Make a choice:";
}

function playBotzGame() {
  hide(mainGameSection);
  show(botzGameSection);
}
