class Game {
  constructor(gameName, gameDescription, zodiac) {
    this.name = gameName;
    this.description = gameDescription;
    this.ties = 0;
    this.choices = ["rock", "paper", "scissors"];
    this.zodiac = [];
    this.currentZodiac = zodiac;
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
    currentComp.currentChoice = randomChoice(this.choices)
    var compInput = currentComp.currentChoice
    this.compareChoices(userInput, compInput);
    setWinCount();
  }

  compareChoices(user, comp) {
    hideAllChoices();
    // show(playAgainBtn);
    if (user === comp) {
    this.ties++;
    resultText.innerText = `It was ${user} vs ${comp} - tie! Play again`
    }
    else if (user === 'rock' && comp === 'scissors' || user === 'scissors' && comp === 'paper' || user === 'paper' && comp === 'rock') {
      currentUser.wins++
      currentComp.losses++
      resultText.innerText = `${user} beats ${comp}! You win!`
    }
    else if (user === 'rock' && comp === 'paper' || user === 'scissors' && comp === 'rock' || user === 'paper' && comp === 'scissors') {
      currentUser.losses++
      currentComp.wins++
      resultText.innerText = `${user} lost against ${comp}! You lost!`
    }
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
