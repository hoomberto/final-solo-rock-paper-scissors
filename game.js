class Game {
  constructor() {
    this.name = "";
    this.description = "";

  }
  playGame() {
    var compInput = randomChoice(choices)
    var randomUser = randomChoice(choices)
    var randomGame = compareChoices(randomUser, compInput)
    return randomGame;
  }
}

function compareChoices(user, comp) {
    if (user === comp) {
    ties++;
    return `It was ${user} vs ${comp} - tie! Play again`
  }
  else if (user === 'rock' && comp === 'scissors' || user === 'scissors' && comp === 'paper' || user === 'paper' && comp === 'rock') {
    userInput.wins++
    compChoice.losses++
    return `${user} beats ${comp}!`
  }
  else if (user === 'rock' && comp === 'paper' || user === 'scissors' && comp === 'rock' || user === 'paper' && comp === 'scissors') {
    userInput.losses++
    compChoice.wins++
    return `${user} lost against ${comp}`
  }
}
