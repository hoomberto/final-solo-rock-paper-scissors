// Query Selectors
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
var botzExplanation = document.getElementById("botzExplanation");
var battleLog = document.getElementById("battleLog");
var battleLogContainer = document.getElementById("battleLogContainer");
var compareBox = document.getElementById("comparisonBox");

// Global Variables

var currentGame;
var currentUser;
var currentComp;

// Event Handlers
window.onload = displayDefaultGame();
classicGameChoice.addEventListener("click", playClassicGame);
botzGameChoice.addEventListener("click", playBotzGame);
goBackBtn.addEventListener("click", goBack)

// DOM Rendering

function renderDefaultPage(currentLocalGame) {
  renderFromLocal();
  renderRPS();
}

function renderRPS() {
  gameSelections.innerHTML = "";
  for (var choice of currentGame.choices) {
    gameSelections.innerHTML += `
    <div id="${choice}ChoiceContainer" class="choice-container choice">
      <img id="${choice}" src="./assets/${choice}.png" alt="${choice}">
      <p id="${choice}Text" class="choice-icon"></p>
    </div>
    `
  }
}

// localStorage

function renderFromLocal() {
  resetUserCompText()
  // checkLocalStorage();
  var parsedGame = JSON.parse(localStorage.getItem("game"));
  userIcon.innerText += parsedGame.player1.icon
  compIcon.innerText += parsedGame.player2.icon
  playerWins.innerText += `Wins: ${parsedGame.player1.wins}`;
  compWins.innerText += `Wins: ${parsedGame.player2.wins}`;
}

function resetStorage() {
  var gameObject = { player1: "", player2: "" };
  var strGameObject = JSON.stringify(gameObject);
  localStorage.setItem("game", strGameObject);
}

function checkLocalStorage() {
  var localGame = getGameFromLocal();
  if (!localGame.player1) {
    resetStorage();
    initializeGame()
    saveToStorage(currentUser, currentComp);
  }
}

function saveToStorage(player1, player2) {
  // checkLocalStorage();
  var parsedGame = JSON.parse(localStorage.getItem("game"));
  parsedGame.player1 = player1;
  parsedGame.player2 = player2;
  localStorage.setItem("game", JSON.stringify(parsedGame));
}

function getGameFromLocal() {
  // if (!localStorage.getItem("game")) {
  //   initializeGame()
  // }
  var parsedGame = JSON.parse(localStorage.getItem("game"));
  return parsedGame;
}

// Default / Global Functionality

function displayDefaultGame() {
  debugger
  initializeGame()
  checkLocalStorage();
  var currentLocalGame = getGameFromLocal();
  renderDefaultPage(currentLocalGame);
  initializeDefaultText(currentGame);
  makeChoicesSelectable();
}

function initializeGame() {
  var gameName = "Rock, Paper, Scissors";
  var gameDescription = "\nRock Beats Scissors\nScissors Beats Paper\nPaper Beats Rock";
  currentGame = new Game(gameName, gameDescription);
  currentGame.player1 = new Player("User", "🟢");
  currentGame.player2 = new Player("Computer", "🤖");
  currentUser = currentGame.player1
  currentComp = currentGame.player2
}

function resetUserCompText() {
  userIcon.innerText = "";
  compIcon.innerText = "";
  playerWins.innerText = "";
  compWins.innerText = "";
}

function goBack() {
  playAnother();
  hide(botzGameSection);
  hide(battleLogContainer)
  resetBattleLog();
  resetBotz();
  show(mainGameSection);
}

function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function randomChoice(choices) {
  return choices[randomIndex(choices)];
}

function hide(element) {
  element.classList.add("hidden");
}

function show(element) {
  element.classList.remove("hidden");
}

function updateInner(element, content) {
  element.innerHTML += `<p>${content}</p>`
}

function resetElement(element) {
  element.innerHTML = "";
}

function resetText(element) {
  element.innerText = "";
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

function initializeDefaultText(currentGame) {
  var botzDescription = "\nFace the other signs in a battle royale - see how many rounds you last!";
  gameTitle.innerText = currentGame.name;
  classicRules.innerText += currentGame.description;
  botzRules.innerText += botzDescription;
}

// Classic Game Functionality

function playAnother() {
  hide(gameChoices);
  hide(goBackBtn);
  resultText.innerText = "";
  show(gameSelections);
  show(classicGameChoice);
  show(botzGameChoice);
  gameSubtitle.innerText = "Choose your game!"
}

function makeChoicesSelectable() {
    var choiceContainers = document.querySelectorAll(".choice-container")
    for (var choice of choiceContainers) {
      choice.addEventListener("click", function() {
      selectChoice(event);
    });
  }
}

function resetTokens() {
  var choiceIcons = document.querySelectorAll(".choice-icon")
  for (var choice of choiceIcons) {
    if (choice.innerText) {
      resetText(choice);
    }
  }
}

function displayClassicGame() {
  hide(classicGameChoice)
  hide(botzGameChoice)
  show(goBackBtn);
  show(gameChoices)
  showAllChoices();
}

function playClassicGame() {
  displayClassicGame()
  renderFromLocal();
  resultText.innerText = "Take your pick";
  resetTokens();
  gameSubtitle.innerText = "Make a choice:";
}

function hideAllChoices() {
  var choiceContainers = document.querySelectorAll(".choice-container");
  for (var choice of choiceContainers) {
    hide(choice);
  }
}

function showAllChoices() {
  goBackBtn.style.pointerEvents = 'auto'
  var choiceContainers = document.querySelectorAll(".choice-container")
  for (var choice of choiceContainers) {
      show(choice)
      choice.style.pointerEvents = 'auto'
  }
}

function showChoice(player) {
  var playerChoice = player.currentChoice
  let choiceContainers = document.querySelectorAll(".choice-container")
  goBackBtn.style.pointerEvents = 'none'
  for (var choice of choiceContainers) {
    if (choice.children[0].id === playerChoice) {
      show(choice)
      choice.style.pointerEvents = 'none';
      choice.children[1].innerText += `${player.icon}`
    }
  }
}

function showBothChoices() {
  showChoice(currentUser);
  showChoice(currentComp);
}

function selectChoice(event) {
    if (event.target.id === "rock") {
      currentUser.currentChoice = "rock"
    }
    if (event.target.id === "paper") {
      currentUser.currentChoice = "paper"
    }
    if (event.target.id === "scissors") {
      currentUser.currentChoice = "scissors"
    }
    currentGame.playGame(currentUser.currentChoice);
}

// Battle of the Zodiac (Botz) game Functionality

function displayRoundsWon() {
  resetElement(playerWins);
  resetElement(compWins);
  var localGame = getGameFromLocal();
  playerWins.innerText += `Rounds won: ${localGame.player1.roundsWon}`
  compWins.innerText += `Rounds won: ${localGame.player2.roundsWon}`
}

function resetBotz() {
  hide(playerBox)
  hide(computerBox)
  battleText.innerHTML = "Choose your fighter"
  hide(battleText)
  hide(playerBattleText)
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

function displayZodiacSelection() {
  hide(mainGameSection);
  show(botzGameSection);
  show(goBackBtn)
  show(battleText)
  show(signs)
}

function updateBattleLog(content) {
  battleLog.innerHTML += `<p>${content}</p>`
  scrollToTop(battleLog)
}

function scrollToTop(element) {
  element.scrollTo({
    top: element.scrollHeight,
    behavior: "smooth"
  });
}

function setZodiacAndMoves() {
  currentGame.currentZodiac = []
  currentGame.initializeZodiac();
  currentGame.setZodiacMoves();
}

function checkPlayerExistence() {
  var localGame = getGameFromLocal();
  if (localGame.player1.roundsWon) {
    return
  }
  else {
    currentUser = new Player("User", "🟢");
    currentComp = new Player("Computer", "🤖");
    currentGame = new Game("Battle of the Zodiac", "Face the other signs in a battle royale")
  }
}

function playBotzGame() {
  displayRoundsWon()
  displayZodiacSelection()
  checkPlayerExistence()
  // currentUser = new Player("User", "🟢");
  // currentComp = new Player("Computer", "🤖");
  // currentGame = new Game("Battle of the Zodiac", "Face the other signs in a battle royale")
  setZodiacAndMoves()
  show(botzExplanation)
  showSigns();
  makeIconsSelectable();
}

function selectSign(event) {
  evaluateAndSet(event)

  currentUser.sign.hp = 100;
  currentComp.sign.hp = 100;

  initialBattleText();
  hide(zodiacSignSelection);
  hide(botzExplanation)
  show(goBackBtn)

  evaluateSigns(currentUser, currentComp)
  setTimeout(function() {show(goBackBtn)}, 9000)
  setTimeout(function() {startBotzGame()}, 9000)
};

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
    move.addEventListener("click", function() {
      selectMove(event);
    });
    move.style.pointerEvents = "auto";
  }
}

function makeMovesUnselectable() {
  var moveChoices = document.querySelectorAll(".move");
  for (var move of moveChoices) {
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
  var selectedMove = event.srcElement.innerText
  currentUser.currentChoice = selectedMove;
  for (var move of currentUser.sign.moves) {
    if (selectedMove === move.name) {
      currentUser.currentMove = move;
      updateBattleLog(`User selected ${currentUser.currentMove.name}`)
    }
  }
  makeMovesUnselectable()
  showPlayerChoice();
  gameRound();
  hide(playerMoveText);
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
    resetElement(playerBattleText)
    show(playerBox)
    var userSign = currentUser.sign.name.toUpperCase();
    playerBox.innerHTML = ""
    playerBox.innerHTML += `
    <h4>YOU BEAT THE ZODIAC AS ${userSign}!</h4>
    `
    updateBattleLog(`YOU BEAT THE ZODIAC AS ${userSign}!`)

    setTimeout(function() {playAnotherBotz()}, 3500);
    return
  }
  currentComp.sign = randomChoice(currentGame.currentZodiac);
  battleText.innerText = `NEW CHALLENGER APPEARS: ${currentComp.sign.name}`
  updateBattleLog(`NEW CHALLENGER APPEARS: ${currentComp.sign.name}`)
  removeSign(currentComp, currentGame.currentZodiac);
  hide(playerBattleText);
  resetAdvantages(currentUser, currentComp)
}

function resetAdvantages(currentUser, currentComp) {
  currentUser.sign.hasElementAdvantage = false;
  currentUser.sign.hasQualityAdvantage = false;
  currentComp.sign.hasElementAdvantage = false;
  currentComp.sign.hasQualityAdvantage = false;
}

function gameRound() {
  if (!currentComp.sign.hp) {
    newChallenger()
    startBotzGame()
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

function startBattle() {
  setBothBoxes()
  makeMovesUnselectable();
  currentComp.currentMove = randomChoice(currentComp.sign.moves);
  var currentRoundMove = currentComp.currentMove;
  runBattleSequence()
}

function runBattleSequence() {
  compareSpeeds(currentUser, currentComp);
  checkMoved(currentUser, currentComp);
  setPlayerMoves(playerBox, currentUser);
  resetPlayers(currentUser, currentComp);
}

function delayShowMoves() {
  setTimeout(setPlayerMoves(playerBox, currentUser), 8000);
}

function updateBothHealth(currentPlayer, opponent) {
  updateHealth(currentPlayer);
  updateHealth(opponent);
}


function resetPlayers(currentPlayer, opponent) {
  currentPlayer.hasMoved = false;
  opponent.hasMoved = false;
}

function initialBattleText() {
  resetText(battleText)
  battleText.innerText += "FIGHT!!"
}

function startBotzGame() {
  show(playerBox);
  show(computerBox);
  show(battleLogContainer)
  setBothBoxes()
  setPlayerMoves(playerBox, currentUser)
  makeMovesSelectable();
}

function pullAndSetFromZodiac(sign) {
  currentUser.sign = sign;
  removeSign(currentUser, currentGame.currentZodiac)
  currentComp.sign = randomChoice(currentGame.currentZodiac);
  removeSign(currentComp, currentGame.currentZodiac)
}

function evaluateAndSet(event) {
  currentUser.currentChoice = "";
  let selectedSign = event.srcElement.innerText
  currentUser.currentChoice = selectedSign;
  var lowerCase = currentUser.currentChoice.toLowerCase();
  for (var sign of currentGame.currentZodiac) {
    if (lowerCase === sign.name || currentUser.currentChoice === sign.icon) {
      pullAndSetFromZodiac(sign);
    }
  }
}
