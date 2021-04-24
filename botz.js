// Fire Signs
var aries = new Zodiac("aries", "fire", "cardinal");
var leo = new Zodiac("leo", "fire", "fixed");
var sagittarius = new Zodiac("sagittarius", "fire", "mutable");

// Earth Signs
var virgo = new Zodiac("virgo", "earth", "cardinal");
var taurus = new Zodiac("taurus", "earth", "fixed");
var capricorn = new Zodiac("capricorn", "earth", "mutable");

// Air Signs
var libra = new Zodiac("libra", "air", "cardinal");
var aquarius = new Zodiac("aquarius", "air", "fixed");
var gemini = new Zodiac("gemini", "air", "mutable");

// Water Signs
var cancer = new Zodiac("cancer", "water", "cardinal");
var scorpio = new Zodiac("scorpio", "water", "fixed");
var pisces = new Zodiac("pisces", "water", "mutable");

var zodiac = [
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
  addMoves(sign)
}

function removeSign(player, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].name === player.sign.name) {
      array.splice(i, 1);
    }
  }
}

function addMoves(sign) {
  var i = 0;
  while (i < 2) {
    sign.moves.push(randomChoice(moves))
    i++
  }
}

function checkAccuracy(moveAccuracy) {
  var randomToCompare = Math.floor(Math.random() * 100 + 1);
  if (randomToCompare > moveAccuracy) {
    return false
  }
  else {
    return true
  }
}

function compareElements(currentPlayer, opponent) {
  if (currentPlayer.element === opponent.element) {
    console.log(`Element Tie! ${currentPlayer.element} is the same as ${opponent.element}\n`)
  }
  if (currentPlayer.element === 'air' && opponent.element === 'earth' || currentPlayer.element === 'earth' && opponent.element === 'water' || currentPlayer.element === 'water' && opponent.element === 'fire' || currentPlayer.element === 'fire' && opponent.element === 'air') {
    currentPlayer.hasElementAdvantage = true;
    console.log(`Element win! ${currentPlayer.element} won against ${opponent.element}\n`)
  }
    if (currentPlayer.element === 'air' && opponent.element === 'fire' || currentPlayer.element === 'earth' && opponent.element === 'air' || currentPlayer.element === 'water' && opponent.element === 'earth' || currentPlayer.element === 'fire' && opponent.element === 'water') {
    opponent.hasElementAdvantage = true;
    console.log(`Element loss! ${currentPlayer.element} lost against ${opponent.element}\n`)
  }
    if (currentPlayer.element === 'air' && opponent.element === 'water' || currentPlayer.element === 'earth' && opponent.element === 'fire' || currentPlayer.element === 'water' && opponent.element === 'air' || currentPlayer.element === 'fire' && opponent.element === 'earth') {
    console.log(`Element Tie! ${currentPlayer.element} tied against ${opponent.element}\n`)
  }
}

function compareSpeeds(currentPlayer, opponent) {
  var currentPlayerSpeed = currentPlayer.sign.stats.speed;
  var currentPlayerBuff = currentPlayer.sign.buffs.speed;
  var opponentSpeed = opponent.sign.stats.speed;
  var opponentBuff = opponent.sign.buffs.speed
  if (currentPlayer.hasMoved && opponent.hasMoved) {
    return;
  }
  if (((currentPlayerSpeed + currentPlayerBuff) > (opponentSpeed + opponentBuff)) && !currentPlayer.hasMoved) {
    runMove(currentPlayer, opponent)
  }
  else if (((currentPlayerSpeed + currentPlayerBuff) === (opponentSpeed + opponentBuff))) {
    runMove(currentPlayer, opponent)
  }
  else if (currentPlayer.hasMoved && !opponent.hasMoved){
    runMove(opponent, currentPlayer)
  }
  updateBothHealth();
}

function checkOpponentHealth(currentPlayer, opponent) {
  if (opponent.sign.hp > 0) {
    console.log(`${opponent.sign.name} still standing with ${opponent.sign.hp} HP`)
    return
  }
  else {
    opponent.sign.hp = 0;
    opponent.lostRound = true;
    currentPlayer.lostRound = false;
    currentPlayer.winRound();
    currentPlayer.roundsWon++
    if (currentPlayer.name === "user" && currentPlayer.sign.hp > 0) {
      console.log(`${currentPlayer.sign.name} continues on to the next round with ${currentPlayer.sign.hp} HP!`)
    }
  }
}

function checkMoved(currentPlayer, opponent) {
  // console.log(`CHECKING MOVES: CURRENT PLAYER${currentPlayer.hasMoved} OPPONENT PLAYER ${opponent.hasMoved}`)
  if (currentPlayer.hasMoved && !opponent.hasMoved) {
    runMove(opponent, currentPlayer)
  }
  else if (!currentPlayer.hasMoved && opponent.hasMoved) {
    runMove(currentPlayer, opponent)
  }
  else if (currentPlayer.hasMoved && opponent.hasMoved) {
    checkRounds(currentPlayer, opponent)
  }
  updateBothHealth();
  // console.log(`CHECKING MOVES: CURRENT PLAYER${currentPlayer.hasMoved} OPPONENT PLAYER ${opponent.hasMoved}`)
}

function runMove(currentPlayer, opponent) {
  if (currentPlayer.lostRound || opponent.lostRound) {
    return
  }
  currentPlayer.hasMoved = true;
  const currentPlayerHp = currentPlayer.sign.hp
  currentMove = currentPlayer.currentMove
  if (checkAccuracy(currentMove.accuracy)) {

    console.log(`${currentPlayer.sign.name} uses ${currentPlayer.currentMove.name}!`)

    opponent.sign.hp -= ((currentMove.damage + currentPlayer.sign.stats.attack + currentPlayer.sign.buffs.attack) * currentPlayer.sign.elementMultiplier * currentPlayer.sign.qualityMultiplier)
    if (currentPlayerHp < currentPlayer.sign.hp) {
      console.log(`${currentPlayer.sign.name} gained ${currentPlayer.sign.hp - currentPlayerHp} health!`)
    }


  }
  else {
    console.log(`${currentPlayer.sign.name} tried using ${currentMove.name}, but it missed!`)
  }

  checkOpponentHealth(currentPlayer, opponent)
}
