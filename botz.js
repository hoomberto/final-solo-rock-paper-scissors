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

const zodiac =
[
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

setZodiacMoves(zodiac);

function setZodiacMoves(array) {
  for (var sign of array) {
    addMoves(sign)
  }
}

function setZodiacSigns() {
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
return zodiac
}

function resetZodiac() {
  setZodiacSigns();
  setZodiacMoves();
}

// resetZodiac();

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
  debugger
  var randomToCompare = Math.floor(Math.random() * 100 + 1);
  if (randomToCompare > moveAccuracy) {
    return false
  }
  else {
    return true
  }
}

function evaluateSigns(currentUser, currentComp) {
  show(compareBox)
  announce(currentUser, currentComp)
  setTimeout(function() {resetText(compareBox)}, 3000);
  setTimeout(function() {compareElements(currentPlayer, opponent)}, 3100);
  setTimeout(function() {resetText(compareBox)}, 4500);
  setTimeout(function() {qualityMsg()},4700);
  setTimeout(function() {hideText()}, 4000);
  setTimeout(function() {overallMsg()}, 5500);
  setTimeout(function() {hideText()}, 5600);
}

function announce(currentUser, currentComp) {
  var playerSign = currentUser.sign.name.toUpperCase();
  var opponentSign = currentComp.sign.name.toUpperCase();
  resetElement(compareBox)
  compareBox.innerHTML = `It's ${playerSign} vs ${opponentSign}!!\n`
  compareBox.innerHTML += `${playerSign} belongs to the ${currentUser.sign.element} element and its quality is ${currentUser.sign.quality} \n`
  compareBox.innerHTML += `${opponentSign} belongs to the ${currentComp.sign.element} element and its quality is ${currentComp.sign.quality} \n`
}

function compareElements(currentPlayer, opponent) {
  compareBox.innerHTML = "";
  if (currentPlayer.sign.element === opponent.sign.element) {
    compareBox.innerHTML =`Element Tie! ${currentPlayer.sign.element} is the same as ${opponent.sign.element}\n`
  }
  if (currentPlayer.sign.element === 'air' && opponent.sign.element === 'earth' || currentPlayer.sign.element === 'earth' && opponent.sign.element === 'water' || currentPlayer.sign.element === 'water' && opponent.sign.element === 'fire' || currentPlayer.sign.element === 'fire' && opponent.sign.element === 'air') {
    currentPlayer.hasElementAdvantage = true;
    compareBox.innerHTML =`Element win! ${currentPlayer.sign.element} won against ${opponent.sign.element}\n`
  }
    if (currentPlayer.sign.element === 'air' && opponent.sign.element === 'fire' || currentPlayer.sign.element === 'earth' && opponent.sign.element === 'air' || currentPlayer.sign.element === 'water' && opponent.sign.element === 'earth' || currentPlayer.sign.element === 'fire' && opponent.sign.element === 'water') {
    opponent.hasElementAdvantage = true;
    compareBox.innerHTML =`Element loss! ${currentPlayer.sign.element} lost against ${opponent.sign.element}\n`
  }
    if (currentPlayer.sign.element === 'air' && opponent.sign.element === 'water' || currentPlayer.sign.element === 'earth' && opponent.sign.element === 'fire' || currentPlayer.sign.element === 'water' && opponent.sign.element === 'air' || currentPlayer.sign.element === 'fire' && opponent.sign.element === 'earth') {
    compareBox.innerHTML =`Element Tie! ${currentPlayer.sign.element} tied against ${opponent.sign.element}\n`
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
}

function checkOpponentHealth(currentPlayer, opponent) {
  if (opponent.sign.hp > 0) {
    showPlayerBattleText(opponent)
    setBothBoxes();
    console.log(`${opponent.sign.name} still standing with ${opponent.sign.hp} HP`)
  }
  else {
    opponent.sign.hp = 0;
    opponent.lostRound = true;
    currentPlayer.lostRound = false;
    currentPlayer.isWinner = true;
    currentPlayer.winRound();
    opponent.signLoss();
    if (currentPlayer.name === "User" && currentPlayer.isWinner) {
      console.log("NEW CHALLENGER APPROACHES")
      gameRound();
    }
    else if (currentPlayer.name === currentComp.name && currentPlayer.isWinner && opponent.lostRound) {
      gameOver()
      var playBotzAgainBtn = document.getElementById("playBotzAgain");
      playBotzAgainBtn.addEventListener("click", playAnotherBotz);
    }

  }
}

function checkRounds(currentPlayer, opponent) {
    if (opponent.lostRound) {
    console.log("ROUND OVER, NEXT ROUND SOON");
  }
  else if (currentPlayer.lostRound) {
    console.log("Player lost!")
  }
}

function checkMoved(currentPlayer, opponent) {

  if (currentPlayer.hasMoved && !opponent.hasMoved) {
    runMove(opponent, currentPlayer)
  }
  else if (!currentPlayer.hasMoved && opponent.hasMoved) {
    runMove(currentPlayer, opponent)
  }
  else if (currentPlayer.hasMoved && opponent.hasMoved) {
    checkRounds(currentPlayer, opponent)
  }

}

function hitOrMiss(currentPlayer, opponent) {
  if (checkAccuracy(currentPlayer.currentMove)) {
    var damageCalculation = (currentMove.damage + currentPlayer.sign.stats.attack + currentPlayer.sign.buffs.attack) * currentPlayer.sign.elementMultiplier * currentPlayer.sign.qualityMultiplier
    showMoveUsed(currentPlayer);
    console.log(`${currentPlayer.sign.name} uses ${currentPlayer.currentMove.name}! It causes`)

    opponent.sign.hp -= damageCalculation

  }
  else {

    compMiss(currentPlayer);
    console.log(`${currentPlayer.sign.name} tried using ${currentMove.name}, but it missed!`)
  }
}

function runMove(currentPlayer, opponent) {

  currentPlayer.hasMoved = true;
  var currentPlayerHp = currentPlayer.sign.hp
  currentMove = currentPlayer.currentMove;

  hitOrMiss(currentPlayer, opponent)
  checkOpponentHealth(currentPlayer, opponent)
}

function setNewGame() {
  var newZodiac = setZodiacSigns();
  setZodiacMoves(newZodiac);
  currentGame = new Game("Battle of the Zodiac", "Face the other signs in a battle royale", newZodiac)
}

function gameOver() {
    hide(playerBattleText)
    hide(playerMoveText)
    battleText.innerText = `Lasted ${currentUser.roundsWon} rounds with ${currentUser.sign.name}`
    playerBox.innerHTML = ""
    playerBox.innerHTML += `
    <div id="playBotzAgain" class="play-again-box">
    <h4>GAME OVER</h4>
    <button>Play Again</button>
    </div>
    `
}

function endBotzGame() {
  hide(computerBox)
  hide(playerBox)
  setNewGame()
  show(zodiacSignSelection)
  battleText.innerText = "Choose your fighter"
}

function playAnotherBotz() {
  currentUser.roundsWon = 0;
  endBotzGame();
}
