var classicGameChoice = document.getElementById("classicGame");
var botzGameChoice = document.getElementById("botzGame");
var gameTitle = document.getElementById("gameHeader");
var gameSubtitle = document.getElementById("gameSubHeader");
var classicRules = document.getElementById("classicRules");
var gameChoices = document.getElementById("gameChoices");
var gameTypes = document.getElementById("gameTypes");
var rpsChoices = document.querySelectorAll(".choice");

window.onload = displayDefaultGame();
classicGameChoice.addEventListener("click", playClassicGame);
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
  gameTitle.innerText = currentGame.name;
  classicRules.innerText += currentGame.description;
}

function hide(element) {
  element.classList.add("hidden");
}

function add(element) {
  element.classList.remove("hidden");
}

function selectChoice(event) {

    if (event.target.id === "rock") {
      console.log("rock")
      return
    }
    if (event.target.id === "paper") {
      console.log("paper")
      return
    }
    if (event.target.id === "scissors") {
      console.log("scissors")
      return
    }

}

function playClassicGame() {
  hide(classicGameChoice)
  hide(botzGameChoice)
  add(gameChoices)
  gameSubtitle.innerText = "Make a choice:";
}
