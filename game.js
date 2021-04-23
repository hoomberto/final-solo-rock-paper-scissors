class Game {
  constructor(gameName, gameDescription) {
    this.name = gameName;
    this.description = gameDescription;
    this.ties = 0;
    this.choices = ["rock", "paper", "scissors"];

  }
  playGame(userInput) {
    currentComp.currentChoice = randomChoice(this.choices)
    var compInput = currentComp.currentChoice
    this.compareChoices(userInput, compInput);
    setWinCount();
  }

  compareChoices(user, comp) {
    gameSelections.innerHTML = "";
    if (user === comp) {
    this.ties++;
    gameSelections.innerHTML += `It was ${user} vs ${comp} - tie! Play again`
    }
    else if (user === 'rock' && comp === 'scissors' || user === 'scissors' && comp === 'paper' || user === 'paper' && comp === 'rock') {
      currentUser.wins++
      currentComp.losses++
      gameSelections.innerHTML += `${user} beats ${comp}!`
    }
    else if (user === 'rock' && comp === 'paper' || user === 'scissors' && comp === 'rock' || user === 'paper' && comp === 'scissors') {
      currentUser.losses++
      currentComp.wins++
      gameSelections.innerHTML += `${user} lost against ${comp}`
    }
  }


}

function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function randomChoice(choices) {
  return choices[randomIndex(choices)];
}

function selectChoice(event) {

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
