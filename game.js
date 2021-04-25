class Game {
  constructor(gameName, gameDescription, zodiac) {
    this.name = gameName;
    this.description = gameDescription;
    this.ties = 0;
    this.choices = ["rock", "paper", "scissors"];
    this.currentZodiac = zodiac;
  }
  renderRPS() {
    gameSelections.innerHTML = "";
    for (var choice of this.choices) {
      gameSelections.innerHTML += `
      <img id="${choice}" class="choice" src="./assets/${choice}.png" alt="${choice}">
      `
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
    setTimeout(function() {playAnother()}, 2500)
  }

}

function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function randomChoice(choices) {
  return choices[randomIndex(choices)];
}

function hideAllChoices() {
  rpsChoices = document.querySelectorAll(".choice");
  for (var choice of rpsChoices) {
    hide(choice)
  }
}

function showAllChoices() {
  let rpsChoices = document.querySelectorAll(".choice");
  for (var choice of rpsChoices) {
    show(choice)
  }
}



function showChoice(playerChoice) {
  let rpsChoices = document.querySelectorAll(".choice");
  for (var choice of rpsChoices) {
    if (choice.id === playerChoice) {
      show(choice)
    }
  }
}

function showBothChoices() {
  showChoice(currentUser.currentChoice);
  showChoice(currentComp.currentChoice);
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
