class Game {
  constructor(gameName, gameDescription) {
    this.name = gameName;
    this.description = gameDescription;
    this.ties = 0;
    this.choices = ["rock", "paper", "scissors"];
    this.currentZodiac = [];
    this.player1 = "";
    this.player2 = "";
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
    this.currentZodiac.push(sign);
  }
}
  playGame(userInput) {
    currentComp.currentChoice = randomChoice(this.choices)
    var compInput = currentComp.currentChoice
    this.compareChoices(userInput, compInput);
  }

  compareChoices(user, comp) {
    hideAllChoices();
    let localGame = getGameFromLocal();
    let player1 = localGame.player1;
    let player2 = localGame.player2;
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
  updateWinCount() {
    saveToStorage(currentUser, currentComp)
    resetElement(playerWins);
    resetElement(compWins);
    var localGame = getGameFromLocal();
    playerWins.innerText += `Rounds won: ${localGame.player1.roundsWon}`
    compWins.innerText += `Rounds won: ${localGame.player2.roundsWon}`
  }

  setZodiacMoves() {
    for (var sign of this.currentZodiac) {
      this.addMoves(sign)
    }
  }
  addMoves(sign) {
    var i = 0;
    while (i < 2) {
      sign.moves.push(randomChoice(moves))
      i++
    }
  }
}
