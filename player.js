class Player {
  constructor(name, icon, sign) {
    this.currentChoice = "";
    this.name = name;
    this.icon = icon
    this.sign = sign;
    this.currentMove = undefined;
    this.hasMoved = false;
    this.roundsWon = 0;
    this.isWinner = false;
    this.lostRound = false;
    this.wins = 0;
    this.losses = 0;
    this.ties = 0;
    this.winsAs = {
      aries: 0,
      taurus: 0,
      gemini: 0,
      cancer: 0,
      leo: 0,
      virgo: 0,
      libra: 0,
      scorpio: 0,
      sagittarius: 0,
      capricorn: 0,
      aquarius: 0,
      pisces: 0
    }
    this.lossesAs = {
      aries: 0,
      taurus: 0,
      gemini: 0,
      cancer: 0,
      leo: 0,
      virgo: 0,
      libra: 0,
      scorpio: 0,
      sagittarius: 0,
      capricorn: 0,
      aquarius: 0,
      pisces: 0
    }
  }
  winRound() {
    var capitalSign = this.sign.name.toUpperCase();
    playerBattleText.innerText = `${this.sign.name} is the winner!`
    battleLog.innerHTML += `<p>${capitalSign} is the winner!</p>`
    this.roundsWon++
    this.wins++
    this.winsAs[this.sign.name]++;
    updateWinCount();
  }
  signLoss() {
    this.lossesAs[this.sign.name]++;
  }
}
