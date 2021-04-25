// class Player {
//   constructor() {
//     this.currentChoice = "";
//     this.wins = 0;
//     this.losses = 0;
//     this.ties = 0;
//   }
// }


class Player {
  constructor(name, sign) {
    this.currentChoice = "";
    this.name = name;
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
    console.log(`${this.sign.name} is the winner!`)
    playerBattleText.innerText = `${this.sign.name} is the winner!`
    this.roundsWon++
    this.wins++
    updateWinCount();
    return true
  }
  signVictory() {
    this.winsAs[this.sign.name]++;
  }
  signLoss() {
    this.lossesAs[this.sign.name]++;
  }
}
