var classicGameChoice = document.getElementById("classicGame");
var botzGameChoice = document.getElementById("botzGame");
var gameTitle = document.getElementById("gameHeader");
var classicRules = document.getElementById("classicRules");
var gameChoices = document.getElementById("gameChoices");
var gameTypes = document.getElementById("gameTypes");

window.onload = displayDefaultGame();
classicGameChoice.addEventListener("click", playClassicGame);
var currentGame;

function displayDefaultGame() {
  var gameName = "Rock, Paper, Scissors";
  var gameDescription = "\nRock Beats Scissors\nScissors Beats Paper\nPaper Beats Rock"
  currentGame = new Game(gameName, gameDescription);
  gameTitle.innerText = currentGame.name;
  classicRules.innerText += currentGame.description;
}

function hide(element) {
  element.classList.add("hidden");
}

function add(element) {
  element.classList.remove("hidden");
}

function playClassicGame() {
  hide(classicGameChoice)
  hide(botzGameChoice)
  add(gameChoices)
}
