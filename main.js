var Player = require("./player.js");
var Game = require("./game.js");

var classicGameChoice = document.getElementById("classicGame");

classicGameChoice.addEventListener("click", displayClassicGame);
var currentGame;

function displayClassicGame {
  var gameName = "Rock, Paper, Scissors";
  var gameDescription = "Rock Beats Scissors\nScissors Beats Paper\nPaper Beats Rock"
  currentGame = new Game(gameName, gameDescription)
}
