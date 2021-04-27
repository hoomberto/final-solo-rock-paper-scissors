var classicGameChoice = document.getElementById("classicGame");
var botzGameChoice = document.getElementById("botzGame");
var gameTitle = document.getElementById("gameHeader");
var gameSubtitle = document.getElementById("gameSubHeader");
var classicRules = document.getElementById("classicRules");
var botzRules = document.getElementById("botzRules");
var gameChoices = document.getElementById("gameChoices");
var gameTypes = document.getElementById("gameTypes");
var gameSelections = document.getElementById("gameSelections");
var playerWins = document.getElementById("playerWins");
var compWins = document.getElementById("compWins");
var userIcon = document.getElementById("userIcon");
var compIcon = document.getElementById("compIcon");
// var rpsChoices = document.querySelectorAll(".choice");
var resultText = document.getElementById("resultText");
var playAgainBtn = document.getElementById("playAgain");
var botzGameSection = document.getElementById("botz");
var mainGameSection = document.getElementById("mainGame");
var zodiacSignSelection = document.getElementById("signs");
var playerBox = document.getElementById("playerBox");
var computerBox = document.getElementById("computerBox");
var battleText = document.getElementById("battleText");
var playerBattleText = document.getElementById("playerBattleText");
var playerMoveText = document.getElementById("playerMoveText")
var playerWinLosses = document.getElementById("playerWinLosses");
var compWinLosses = document.getElementById("compWinLosses");
var goBackBtn = document.getElementById("goBack");
var choiceContainers = document.querySelectorAll(".choice-container")




// Battle Elements
var compareBox = document.getElementById("comparisonBox");

window.onload = displayDefaultGame();
classicGameChoice.addEventListener("click", playClassicGame);
playAgainBtn.addEventListener("click", playAnother);
botzGameChoice.addEventListener("click", playBotzGame);
goBackBtn.addEventListener("click", goBack)
// console.log(rpsChoices)


function makeChoicesSelectable() {
  // var rpsChoices = document.querySelectorAll(".choice");
    var choiceContainers = document.querySelectorAll(".choice-container")
    for (var choice of choiceContainers) {
      choice.addEventListener("click", function() {
      selectChoice(event);
    });
  }
}

var currentGame;
var currentUser;
var currentComp;

// function generateGame()

function displayDefaultGame() {
  checkLocalStorage();
  var gameName = "Rock, Paper, Scissors";
  var botzDescription = "\nFace the other signs in a battle royale - see how many rounds you last!"
  var gameDescription = "\nRock Beats Scissors\nScissors Beats Paper\nPaper Beats Rock"
  currentGame = new Game(gameName, gameDescription);
  currentUser = new Player("User", "🟢");
  currentComp = new Player("Computer", "🤖");
  var currentLocalGame = getGameFromLocal();
  if (!currentLocalGame.player1.wins) {
    saveToStorage(currentUser, currentComp);
  }
  renderFromLocal();

  currentGame.renderRPS();
  makeChoicesSelectable();
  // userIcon.innerText += currentUser.icon
  // compIcon.innerText += currentComp.icon
  // playerWins.innerText += `${currentUser.wins}`;
  // compWins.innerText += `${currentComp.wins}`;
  gameTitle.innerText = currentGame.name;
  classicRules.innerText += currentGame.description;
  botzRules.innerText += botzDescription;
}

function goBack() {
  playAnother()
  hide(botzGameSection)
  resetBotz();
  show(mainGameSection)
}

function resetBotz() {
  hide(playerBox)
  hide(computerBox)
  battleText.innerHTML = "Choose your fighter"
  hide(battleText)
  hide(playerBattleText)
}

function resetTokens() {
  var choiceIcons = document.querySelectorAll(".choice-icon")
  for (var choice of choiceIcons) {
    if (choice.innerText) {
      resetText(choice);
    }
  }
}

function playAnother() {
  resultText.innerText = "";
  showAllChoices();
  show(gameSelections);
  hide(gameChoices);
  hide(goBackBtn);
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

// function resetPlayerChoices(choiceContainers) {
//   for (var choice of choiceContainers) {
//     resetText(choice.children[1])
//   }
// }

function playClassicGame() {
  resultText.innerText = "Take your pick";
  hide(classicGameChoice)
  hide(botzGameChoice)
  show(goBackBtn);
  show(gameChoices)
  showAllChoices();
  resetTokens();
  // if (choiceContainers.children) {
  //   currentGame.resetPlayerChoices();
  // }

  gameSubtitle.innerText = "Make a choice:";
}

function showSigns() {
  zodiacSignSelection.innerHTML = ""
  for (var sign of currentGame.currentZodiac) {
    zodiacSignSelection.innerHTML += `
    <div class="icon-container">
    <p class="icon">${sign.icon}</p>
    <p class="icon">${sign.name}</p>
    </div>
    `
  }
}


function playBotzGame() {
  hide(mainGameSection);
  show(botzGameSection);
  show(goBackBtn)
  show(battleText)
  show(signs)
  // endBotzGame();
  currentUser = new Player("User", "🟢");
  currentComp = new Player("Computer", "🤖");
  currentGame = new Game("Battle of the Zodiac", "Face the other signs in a battle royale", zodiac)
  if (currentGame.currentZodiac.length < 12 || !currentGame.currentZodiac.length) {
    var resetZodiac = setZodiacSigns();
    setZodiacMoves(resetZodiac)
    currentGame = new Game("Battle of the Zodiac", "Face the other signs in a battle royale", resetZodiac)
  }
  showSigns();
  makeIconsSelectable();
}

function setBothBoxes() {
  setPlayerBox(playerBox, currentUser);
  setPlayerBox(computerBox, currentComp);
}



function setPlayerMoves(infoContainer, player) {
  if (currentUser.sign.hp > 0) {
    for (var move of player.sign.moves) {
      infoContainer.innerHTML += `
      <p class="move">${move.name}</p>
      <p>${move.description}</p>`
    }
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
    move.style.pointerEvents = "auto";
  }
}

function makeMovesUnselectable() {
  var moveChoices = document.querySelectorAll(".move");
  for (var move of moveChoices) {
    // console.log(move)
    move.style.pointerEvents = "none";
  }
}



function updateHealth(player) {
  let playerHP = player.sign.hp
  if (playerHP < 0) {
    playerHP = 0;
  }
  let userHealth = document.getElementById(player.sign.name)
  let userHPVal = document.getElementById(player.sign.id)
  userHealth.value = playerHP;
  userHPVal.innerText = `${playerHP} HP`;
}

function setPlayerBox(infoContainer, player) {
  infoContainer.innerHTML = "";
  infoContainer.innerHTML += `
  <div class="player-name-hp">
    <h3>${player.sign.icon} ${player.sign.name}</h3>
    <div class="health-bar-container">
      <progress id="${player.sign.name}" value="${player.sign.hp}" max="100"></progress>
    </div>
    <h4 id="${player.sign.id}">${player.sign.hp} HP</h4>
  </div>
  <div id="playerStats" class="player-stats">
    <h5>Element: ${player.sign.element}</h5>
    <h6>Quality: ${player.sign.quality}</h6>
  </div>
  `
}

function selectMove(event) {
  // debugger
  var selectedMove = event.srcElement.innerText
  currentUser.currentChoice = selectedMove;
  for (var move of currentUser.sign.moves) {
    if (selectedMove === move.name) {
      currentUser.currentMove = move;
      console.log(`User selected ${currentUser.currentMove.name}`)
      // resetPlayers(currentUser, currentComp)
    }
  }
  // resetPlayers(currentUser, currentComp)
  makeMovesUnselectable()
  // debugger
  showPlayerChoice();
  // setBothBoxes();
  gameRound();
  hide(playerMoveText);
  // setTimeout(function() {gameRound()}, 1000);
  // setTimeout(function() {hide(playerMoveText)}, 900)
  // gameRound();
  // startBattle();

}

function setBoxesAndMoves() {
  setBothBoxes();
  setPlayerMoves(playerBox, currentUser);
  makeMovesSelectable();
}

function newChallenger() {
  if (!currentGame.currentZodiac.length) {
    hide(computerBox)
    hide(battleText)
    show(playerBox)
    playerBox.innerHTML = ""
    playerBox.innerHTML += `
    <h4>YOU BEAT THE ZODIAC AS ${currentUser.sign.name}!</h4>
    `
    setTimeout(function() {playAnotherBotz()}, 4000)
  }
  currentComp.sign = randomChoice(currentGame.currentZodiac);
  battleText.innerText = `NEW CHALLENGER APPEARS: ${currentComp.sign.name}`
  removeSign(currentComp, currentGame.currentZodiac);
  hide(playerBattleText);
  resetAdvantages(currentUser, currentComp)
  // evaluateSigns(currentUser, currentComp);
  // setTimeout(function() {startBotzGame()}, 9000);
  // setBothBoxes();
  // setPlayerMoves(playerBox, currentUser);
  // makeMovesSelectable();
}

function resetAdvantages(currentUser, currentComp) {
  currentUser.sign.hasElementAdvantage = false;
  currentUser.sign.hasQualityAdvantage = false;
  currentComp.sign.hasElementAdvantage = false;
  currentComp.sign.hasQualityAdvantage = false;
}

function gameRound() {
  // debugger
  if (!currentComp.sign.hp) {

    newChallenger()
    // setTimeout(function() {startBotzGame()}, 9000);
    startBotzGame()
    // resetPlayers(currentUser, currentComp)
    console.log("RESET")
  }

  else {
    startBattle();
  }
}

function showCompMove() {
  battleText.innerText = `${currentComp.name} selected ${currentComp.currentMove.name}`
}

function announceMiss(currentPlayer) {
  var missText = `${currentPlayer.sign.name} tried using ${currentMove.name}, but it missed!`
  if (currentPlayer.name === currentComp.name) {
    battleText.innerText = missText;
  }
  else {
    show(playerBattleText)
    playerBattleText.innerText = missText;
  }

}

function showMoveUsed(currentPlayer) {
  var damageCalculation = (currentMove.damage + currentPlayer.sign.stats.attack + currentPlayer.sign.buffs.attack) * currentPlayer.sign.elementMultiplier * currentPlayer.sign.qualityMultiplier
  if (currentPlayer.name === "Computer") {
    battleText.innerText = `${currentPlayer.sign.name} uses ${currentPlayer.currentMove.name}! It dealt ${damageCalculation} damage!`
  }
  else {
    playerBattleText.innerText = `${currentPlayer.sign.name} uses ${currentPlayer.currentMove.name}! It dealt ${damageCalculation} damage!`
  }
}

function showDamageDealt(currentPlayer, damageCalculation) {
  battleText.innerText = `${currentPlayer.sign.name} dealt ${damageCalculation} damage!`
}

function showPlayerBattleText(opponent) {
  show(playerBattleText);
  playerBattleText.innerText = `${opponent.sign.name} still standing with ${opponent.sign.hp} HP`
}

function showPlayerChoice() {
  show(playerMoveText);
  playerMoveText.innerText = `${currentUser.name} selected ${currentUser.currentMove.name}`
}

// function beginFight() {
//   compareSpeeds(currentUser, currentComp);
//
//   checkMoved(currentUser, currentComp)
//   resetPlayers(currentUser, currentComp)
//   setPlayerMoves(playerBox, currentUser)
//   // delayShowMoves();
//   makeMovesSelectable();
// }

function startBattle() {
  setBothBoxes()
  makeMovesUnselectable();
  currentComp.currentMove = randomChoice(currentComp.sign.moves);
  var currentRoundMove = currentComp.currentMove;
  // setTimeout(function() {beginFight()}, 6900);
  compareSpeeds(currentUser, currentComp)
  // setTimeout(function() {compareSpeeds(currentUser, currentComp)}, 100)
  checkMoved(currentUser, currentComp)
  setPlayerMoves(playerBox, currentUser)
  resetPlayers(currentUser, currentComp)
  // setTimeout(function() {checkMoved(currentUser, currentComp)}, 2500)
  // setTimeout(function() {setPlayerMoves(playerBox, currentUser)}, 3500)
  // setTimeout(function() {checkMoved(currentUser, currentComp)}, 2550)
  // setTimeout(function() {resetPlayers(currentUser, currentComp)}, 3600)
  // checkMoved(currentUser, currentComp)
  // resetPlayers(currentUser, currentComp)
  // setPlayerMoves(playerBox, currentUser)
  // delayShowMoves();
  // makeMovesSelectable();
  // compareSpeeds(currentUser, currentComp);
  //
  // checkMoved(currentUser, currentComp)
  // setTimeout(function() {resetPlayers(currentUser, currentComp)}, 2600)
  // setPlayerMoves(playerBox, currentUser)
  // // delayShowMoves();
  // makeMovesSelectable();
}

function delayShowMoves() {
  setTimeout(setPlayerMoves(playerBox, currentUser), 8000);
}

function updateBothHealth(currentPlayer, opponent) {
  updateHealth(currentPlayer);
  updateHealth(opponent);
}

function updateWinCount() {
  playerWins.innerText = `Rounds won: ${currentUser.wins}`
  compWins.innerText = `Rounds won: ${currentComp.wins}`
}

function resetPlayers(currentPlayer, opponent) {
  console.log("players reset")
  currentPlayer.hasMoved = false;
  opponent.hasMoved = false;
}

function initialBattleText() {
  battleText.innerText = "";
  battleText.innerText += "FIGHT!!"
}

function startBotzGame() {
  show(playerBox);
  show(computerBox);
  setBothBoxes()
  setPlayerMoves(playerBox, currentUser)
  makeMovesSelectable();
}

function resetElement(element) {
  element.innerHTML = "";
}

function resetText(element) {
  element.innerText = "";
}

function selectSign(event) {
    currentUser.currentChoice = "";
    let selectedSign = event.srcElement.innerText
    currentUser.currentChoice = selectedSign;
    var lowerCase = currentUser.currentChoice.toLowerCase();
    for (var sign of currentGame.currentZodiac) {
      if (lowerCase === sign.name || currentUser.currentChoice === sign.icon) {
        currentUser.sign = sign;
        removeSign(currentUser, currentGame.currentZodiac)
        currentComp.sign = randomChoice(currentGame.currentZodiac);
        removeSign(currentComp, currentGame.currentZodiac)
      }
    }
    currentUser.sign.hp = 100;
    currentComp.sign.hp = 100;
    // setTimeout(initialBattleText, 1000)
    initialBattleText();
    hide(zodiacSignSelection);

    show(goBackBtn)
    // startBotzGame()

    evaluateSigns(currentUser, currentComp)
    setTimeout(function() {show(goBackBtn)}, 9000)
    setTimeout(function() {startBotzGame()}, 9000)

};
