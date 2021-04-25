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
  }
  winRound() {
    console.log(`${this.sign.name} is the winner!`)
    battleText.innerText = `${this.sign.name} is the winner!`
    this.roundsWon++
    this.wins++
    updateWinCount();
    return true
  }
}
