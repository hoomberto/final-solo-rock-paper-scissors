class Game {
  constructor(gameName, gameDescription) {
    this.name = gameName;
    this.description = gameDescription;
    this.ties = 0;

  }
  playGame() {
    var compInput = randomChoice(choices)
    var randomUser = randomChoice(choices)
    var randomGame = compareChoices(randomUser, compInput)
    return randomGame;
  }
  compareChoices(user, comp) {
      if (user === comp) {
      this.ties++;
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
}
