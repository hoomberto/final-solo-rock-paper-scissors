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
var zodiacSignSelection = document.getElementById("signs");
var playerBox = document.getElementById("playerBox");
var computerBox = document.getElementById("computerBox");

window.onload = displayDefaultGame();
classicGameChoice.addEventListener("click", playClassicGame);
playAgainBtn.addEventListener("click", playAnother);
botzGameChoice.addEventListener("click", playBotzGame);
console.log(rpsChoices)

for (var choice of rpsChoices) {
  // console.log(choice);
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

function showSigns() {
  for (var sign of zodiac) {
    zodiacSignSelection.innerHTML += `
    <p class="icon">${sign.name}</p>
    `
  }
}




function playBotzGame() {
  hide(mainGameSection);
  show(botzGameSection);
  showSigns();
  makeIconsSelectable();
  currentUser = new Player("User");
  currentComp = new Player("Computer");
}

function startBotzGame() {
  hide(zodiacSignSelection)
  show(playerBox);
  show(computerBox);
  setPlayerBox(playerBox, currentUser);
  setPlayerMoves(playerBox, currentUser)
  setPlayerBox(computerBox, currentComp);
  makeMovesSelectable();
}

function setPlayerMoves(infoContainer, player) {
  for (var move of player.sign.moves) {
    infoContainer.innerHTML += `
    <p class="move">${move.name}</p>
    <p>${move.description}</p>`
  }
}

function makeIconsSelectable() {
  var iconChoices = document.querySelectorAll(".icon");
  for (var icon of iconChoices) {
    icon.addEventListener("click", function() {
    selectSign(event);
  });
  }
}

function makeMovesSelectable() {
  var moveChoices = document.querySelectorAll(".move");
  for (var move of moveChoices) {
    // console.log(move)
    move.addEventListener("click", function() {
      selectMove(event);
    });
  }
}



function updateHealth(player) {
  var userHealth = document.getElementById(player.sign.name)
  userHealth.value = player.sign.hp
}

function setPlayerBox(infoContainer, player) {
  infoContainer.innerHTML = "";
  infoContainer.innerHTML += `
  <div class="player-name-hp">
    <h3>${player.sign.name}</h3>
    <div class="health-bar-container">
      <progress id="${player.sign.name}" value="${player.sign.hp}" max="100"></progress>
    </div>
    <h4>${player.sign.hp} HP</h4>
    </div>
  `
}

function selectMove(event) {
  var selectedMove = event.srcElement.innerText
  currentUser.currentChoice = selectedMove;
  for (var move of currentUser.sign.moves) {
    if (selectedMove === move.name) {
      currentUser.currentMove = move;
      console.log(`User selected ${currentUser.currentMove.name}`)
    }
  }
  startBattle();
  compareSpeeds(currentUser, currentComp);
}

function startBattle() {
  setPlayerBox(playerBox, currentUser);
  currentComp.currentMove = randomChoice(currentComp.sign.moves);
  console.log(`${currentComp.name} selected ${currentComp.currentMove.name}`)
}

function selectSign(event) {
    var selectedSign = event.srcElement.innerText
    currentUser.currentChoice = selectedSign;
    for (var sign of zodiac) {
      if (currentUser.currentChoice === sign.name) {
        currentUser.sign = sign;
        removeSign(currentUser, zodiac)
        currentComp.sign = randomChoice(zodiac);
        removeSign(currentComp, zodiac)
      }
    }
    startBotzGame();
};
