class Game {
  constructor(gameName, gameDescription, zodiac) {
    this.name = gameName;
    this.description = gameDescription;
    this.ties = 0;
    this.choices = ["rock", "paper", "scissors"];
    this.zodiac = [];
    this.currentZodiac = zodiac;
    this.player1 = "";
    this.player2 = "";
  }
  renderRPS() {
    gameSelections.innerHTML = "";
    for (var choice of this.choices) {
      gameSelections.innerHTML += `
      <div id="${choice}ChoiceContainer" class="choice-container choice">
        <img id="${choice}" src="./assets/${choice}.png" alt="${choice}">
        <p id="${choice}Text" class="choice-icon"></p>
      </div>
      `
    }
  }

  initializeZodiac() {
    // Fire Signs
    var aries = new Zodiac("aries", "fire", "cardinal", '🐏');
    var leo = new Zodiac("leo", "fire", "fixed", '🦁');
    var sagittarius = new Zodiac("sagittarius", "fire", "mutable", '🐴');

    // Earth Signs
    var virgo = new Zodiac("virgo", "earth", "cardinal", '🌾');
    var taurus = new Zodiac("taurus", "earth", "fixed", '🐂');
    var capricorn = new Zodiac("capricorn", "earth", "mutable", '🐐');

    // Air Signs
    var libra = new Zodiac("libra", "air", "cardinal", '⚖️');
    var aquarius = new Zodiac("aquarius", "air", "fixed", '🏺');
    var gemini = new Zodiac("gemini", "air", "mutable", '👯‍♀️');

    // Water Signs
    var cancer = new Zodiac("cancer", "water", "cardinal", '🦀');
    var scorpio = new Zodiac("scorpio", "water", "fixed", '🦂');
    var pisces = new Zodiac("pisces", "water", "mutable", '🐟');

    let zodiac = [
      aries,
      taurus,
      gemini,
      cancer,
      leo,
      virgo,
      libra,
      scorpio,
      sagittarius,
      capricorn,
      aquarius,
      pisces
    ];
  for (var sign of zodiac) {
    this.zodiac.push(sign);
  }
}
  playGame(userInput) {
    debugger
    currentComp.currentChoice = randomChoice(this.choices)
    var compInput = currentComp.currentChoice
    this.compareChoices(userInput, compInput);
    // setWinCount();
  }

  compareChoices(user, comp) {
    hideAllChoices();
    let localGame = getGameFromLocal();
    let player1 = localGame.player1;
    let player2 = localGame.player2;
    // show(playAgainBtn);
    if (user === comp) {
    this.ties++;
    resultText.innerText = `It was ${user} vs ${comp} - tie! Play again`
    }
    else if (user === 'rock' && comp === 'scissors' || user === 'scissors' && comp === 'paper' || user === 'paper' && comp === 'rock') {
      player1.wins++
      player2.losses++
      resultText.innerText = `${user} beats ${comp}! You win!`
    }
    else if (user === 'rock' && comp === 'paper' || user === 'scissors' && comp === 'rock' || user === 'paper' && comp === 'scissors') {
      player1.losses++
      player2.wins++
      resultText.innerText = `${user} lost against ${comp}! You lost!`
    }
    saveToStorage(player1, player2)
    renderFromLocal();
    showBothChoices();
    setTimeout(function() {playClassicGame()}, 2500)
  }
}

// function setPlayerChoice(player) {
//   var selected = document.getElementById("selectedChoice")
//   selected.innerText += currentUser.icon
// }

function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function randomChoice(choices) {
  return choices[randomIndex(choices)];
}

function hideAllChoices() {
      var choiceContainers = document.querySelectorAll(".choice-container")
  // rpsChoices = document.querySelectorAll(".choice");
  for (var choice of choiceContainers) {
    hide(choice)
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
  let rpsChoices = document.querySelectorAll(".choice");
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
  console.log("SOMETHING HAPPENING")
    if (event.target.id === "rock") {
      currentUser.currentChoice = "rock"
      // return "rock"
    }
    if (event.target.id === "paper") {
      currentUser.currentChoice = "paper"
      // return "paper"
    }
    if (event.target.id === "scissors") {
      currentUser.currentChoice = "scissors"
      // return "scissors"
    }
    currentGame.playGame(currentUser.currentChoice);

}

function resetStorage() {
  var gameObject = { player1: "", player2: "" };
  var strGameObject = JSON.stringify(gameObject);
  localStorage.setItem("game", strGameObject);
}

function checkLocalStorage() {
  if (!localStorage.getItem("game")) {
    resetStorage()
  }
}

function saveToStorage(player1, player2) {
  checkLocalStorage();
  var parsedGame = JSON.parse(localStorage.getItem("game"));
  parsedGame.player1 = player1;
  parsedGame.player2 = player2;
  localStorage.setItem("game", JSON.stringify(parsedGame));
}

function renderFromLocal() {
  userIcon.innerText = "";
  compIcon.innerText = "";
  playerWins.innerText = "";
  compWins.innerText = "";
  checkLocalStorage();
  var parsedGame = JSON.parse(localStorage.getItem("game"));
  userIcon.innerText += parsedGame.player1.icon
  compIcon.innerText += parsedGame.player2.icon
  playerWins.innerText += `Wins: ${parsedGame.player1.wins}`;
  compWins.innerText += `Wins: ${parsedGame.player2.wins}`;
}

function getGameFromLocal() {
  checkLocalStorage();
  var parsedGame = JSON.parse(localStorage.getItem("game"));
  return parsedGame;
}
