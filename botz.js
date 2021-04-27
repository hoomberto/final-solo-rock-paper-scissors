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

function evaluateSigns(currentUser, currentComp) {
  hide(goBackBtn)
  show(compareBox)
  announce(currentUser, currentComp)
  setTimeout(function() {resetText(compareBox)}, 4200);
  setTimeout(function() {compareElements(currentUser, currentComp)}, 4300);
  setTimeout(function() {resetText(compareBox)}, 5500);
  setTimeout(function() {compareQualities(currentUser.sign, currentComp.sign)},5600);
  setTimeout(function() {resetText(compareBox)}, 6800);
  setTimeout(function() {compareAdvantages(currentUser.sign, currentComp.sign)}, 6900);
  setTimeout(function() {resetText(compareBox)}, 8900);
  setTimeout(function() {hide(compareBox)}, 8900);
}

function announce(currentUser, currentComp) {
  var playerSign = currentUser.sign.name.toUpperCase();
  var opponentSign = currentComp.sign.name.toUpperCase();
  resetElement(compareBox);
  compareBox.innerHTML += `<p>${playerSign} encounters ${opponentSign}!!</p>\n`
  compareBox.innerHTML += `<p>${playerSign} belongs to the ${currentUser.sign.element} element and its quality is ${currentUser.sign.quality}</p> \n`
  compareBox.innerHTML += `<p>${opponentSign} belongs to the ${currentComp.sign.element} element and its quality is ${currentComp.sign.quality}</p> \n`
  updateBattleLog(`${playerSign} encounters ${opponentSign}!!`)
  updateBattleLog(`${playerSign} belongs to the ${currentUser.sign.element} element and its quality is ${currentUser.sign.quality}`)
  updateBattleLog(`${opponentSign} belongs to the ${currentComp.sign.element} element and its quality is ${currentComp.sign.quality}`)

  // battleLog.innerHTML += `<p>${playerSign} encounters ${opponentSign}!!</p>\n`
  // battleLog.innerHTML += `<p>${playerSign} belongs to the ${currentUser.sign.element} element and its quality is ${currentUser.sign.quality}</p> \n`
  // battleLog.innerHTML += `<p>${opponentSign} belongs to the ${currentComp.sign.element} element and its quality is ${currentComp.sign.quality}</p> \n`
}

function compareQualities(user, comp) {
  // compareBox.innerHTML = "";
  if (user.quality === comp.quality) {
    compareBox.innerHTML +=`<p>It was ${user.quality} vs ${comp.quality} - tie!</p>\n`
  }
  if ((user.quality === 'cardinal' && comp.quality === 'fixed') || (user.quality === 'fixed' && comp.quality === 'mutable') || (user.quality === 'mutable' && comp.quality === 'cardinal')) {
    user.qualityMultiplier = 2;
    user.buffs.attack = 10;
    user.buffs.speed = 1.2;
    comp.buffs.attack = -10;
    user.hasQualityAdvantage = true;
    compareBox.innerHTML +=`<p>Quality win! ${user.quality} beats ${comp.quality}!</p>\n`
  }
  if ((user.quality === 'cardinal' && comp.quality === 'mutable') || (user.quality === 'fixed' && comp.quality === 'cardinal') || (user.quality === 'mutable' && comp.quality === 'fixed')) {
    user.buffs.attack = -10;
    comp.buffs.attack = 10;
    comp.buffs.speed = 1.2;
    comp.qualityMultiplier = 2;
    comp.hasQualityAdvantage = true;
    compareBox.innerHTML +=`<p>Quality loss! ${user.quality} lost against ${comp.quality}</p>\n`
  }
}

function compareElements(currentPlayer, opponent) {
  compareBox.innerHTML = "";
  if (currentPlayer.sign.element === opponent.sign.element) {
    compareBox.innerHTML =`Element Tie! ${currentPlayer.sign.element} is the same as ${opponent.sign.element}\n`
  }
  if (currentPlayer.sign.element === 'air' && opponent.sign.element === 'earth' || currentPlayer.sign.element === 'earth' && opponent.sign.element === 'water' || currentPlayer.sign.element === 'water' && opponent.sign.element === 'fire' || currentPlayer.sign.element === 'fire' && opponent.sign.element === 'air') {
    currentPlayer.sign.hasElementAdvantage = true;
    compareBox.innerHTML =`Element win! ${currentPlayer.sign.element} won against ${opponent.sign.element}\n`
  }
    if (currentPlayer.sign.element === 'air' && opponent.sign.element === 'fire' || currentPlayer.sign.element === 'earth' && opponent.sign.element === 'air' || currentPlayer.sign.element === 'water' && opponent.sign.element === 'earth' || currentPlayer.sign.element === 'fire' && opponent.sign.element === 'water') {
    opponent.sign.hasElementAdvantage = true;
    compareBox.innerHTML =`Element loss! ${currentPlayer.sign.element} lost against ${opponent.sign.element}\n`
  }
    if (currentPlayer.sign.element === 'air' && opponent.sign.element === 'water' || currentPlayer.sign.element === 'earth' && opponent.sign.element === 'fire' || currentPlayer.sign.element === 'water' && opponent.sign.element === 'air' || currentPlayer.sign.element === 'fire' && opponent.sign.element === 'earth') {
    compareBox.innerHTML =`Element Tie! ${currentPlayer.sign.element} tied against ${opponent.sign.element}\n`
  }
}

function compareAdvantages(currentPlayer, opponent) {
  if (!currentPlayer.hasElementAdvantage && !currentPlayer.hasElementAdvantage && !opponent.hasElementAdvantage && !opponent.hasQualityAdvantage) {
    compareBox.innerHTML = "You are both evenly matched!\n"
    battleLog.innerHTML += `<p>You are both evenly matched!</p>`
    return
  }
  if (currentPlayer.hasElementAdvantage && !currentPlayer.hasQualityAdvantage && !opponent.hasElementAdvantage && !opponent.hasQualityAdvantage) {
    compareBox.innerHTML = "All right! You have an elemental advantage!\n"
    battleLog.innerHTML += `<p>All right! You have an elemental advantage!</p>`
  }
  if (opponent.hasElementAdvantage && !opponent.hasQualityAdvantage && !currentPlayer.hasElementAdvantage && !currentPlayer.hasQualityAdvantage) {
    compareBox.innerHTML += "Yikes! You're at an elemental disadvantage!\n"
    battleLog.innerHTML += `<p>Yikes! You're at an elemental disadvantage!</p>`
  }
  if (!currentPlayer.hasElementAdvantage && currentPlayer.hasQualityAdvantage && !opponent.hasQualityAdvantage && !opponent.hasElementAdvantage) {
    compareBox.innerHTML += "Yes! You have a quality advantage!\n"
    battleLog.innerHTML += `<p>Yes! You have a quality advantage!</p>`
  }
  if (!opponent.hasElementAdvantage && opponent.hasQualityAdvantage && !currentPlayer.hasElementAdvantage && !currentPlayer.hasQualityAdvantage) {
    compareBox.innerHTML += "Uh oh! The opponent has a quality advantage!\n"
    battleLog.innerHTML += `<p>Uh oh! The opponent has a quality advantage!</p>`
  }
  else if (currentPlayer.hasElementAdvantage && currentPlayer.hasElementAdvantage && !opponent.hasElementAdvantage && !opponent.hasQualityAdvantage) {
    compareBox.innerHTML += `${currentPlayer.name} has a total advantage!\n`
    battleLog.innerHTML += `<p>${currentPlayer.name} has a total advantage!</p>`
  }
  else if (opponent.hasElementAdvantage && opponent.hasQualityAdvantage && !currentPlayer.hasElementAdvantage && !currentPlayer.hasQualityAdvantage) {
    compareBox.innerHTML = "Oh no! You're at a total disadvantage!\n"
    battleLog.innerHTML += `<p>Oh no! You're at a total disadvantage!</p>`
  }
  else  {
    compareBox.innerHTML = "This could be a close one!\n"
    battleLog.innerHTML += `<p>This could be a close one!</p>`
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
  else if (((currentPlayerSpeed + currentPlayerBuff) < (opponentSpeed + opponentBuff)) && !opponent.hasMoved) {
    runMove(opponent, currentPlayer)
  }
  else if (((currentPlayerSpeed + currentPlayerBuff) === (opponentSpeed + opponentBuff)) && !currentPlayer.hasMoved) {
    runMove(currentPlayer, opponent)
  }
  else if (currentPlayer.hasMoved && !opponent.hasMoved){
    runMove(opponent, currentPlayer)
  }
}

function runMove(currentPlayer, opponent) {
  currentPlayer.hasMoved = true;
  var currentPlayerHp = currentPlayer.sign.hp
  currentMove = currentPlayer.currentMove;
  hitOrMiss(currentPlayer, opponent)
  setTimeout(function() {checkOpponentHealth(currentPlayer, opponent)}, 1000)
}

function hitOrMiss(currentPlayer, opponent) {
  if (checkAccuracy(currentPlayer.currentMove.accuracy)) {
    var damageCalculation = (currentMove.damage + currentPlayer.sign.stats.attack + currentPlayer.sign.buffs.attack) * currentPlayer.sign.elementMultiplier * currentPlayer.sign.qualityMultiplier
    showMoveUsed(currentPlayer);
    battleLog.innerHTML += `<p>${currentPlayer.sign.name} uses ${currentPlayer.currentMove.name}! It causes ${damageCalculation} damage!</p>`

    opponent.sign.hp -= damageCalculation

  }
  else {
    announceMiss(currentPlayer);
    battleLog.innerHTML += `<p>${currentPlayer.sign.name} tried using ${currentMove.name}, but it missed!</p>`
  }
}

function checkOpponentHealth(currentPlayer, opponent) {
  if (opponent.sign.hp > 0) {
    showPlayerBattleText(opponent)
    setBothBoxes();
    setPlayerMoves(playerBox, currentUser)
    makeMovesSelectable();
    battleLog.innerHTML += `<p>${opponent.sign.name} still standing with ${opponent.sign.hp} HP</p>`
  }
  else {
    opponent.sign.hp = 0;
    opponent.lostRound = true;
    currentPlayer.lostRound = false;
    currentPlayer.isWinner = true;
    currentPlayer.winRound();
    opponent.signLoss();
    if (currentPlayer.name === currentComp.name && currentPlayer.isWinner && opponent.lostRound) {
      gameOver()
      setTimeout(function() {resetElement(playerBattleText)}, 3400);
      setTimeout(function() {resetElement(battleText)}, 3450)
      setTimeout(function() {playAnotherBotz()}, 3500);
      return
    }
    else if (currentPlayer.name === currentUser.name && currentPlayer.isWinner) {
      hide(playerBox)
      hide(computerBox)
      gameRound();
    }
  }
}

function checkMoved(currentPlayer, opponent) {
  if (!currentPlayer.sign.hp || !opponent.sign.hp) {
    return
  }
  if (currentPlayer.hasMoved && !opponent.hasMoved) {
    runMove(opponent, currentPlayer)
  }
  else if (!currentPlayer.hasMoved && opponent.hasMoved) {
    runMove(currentPlayer, opponent)
  }
  else if (currentPlayer.hasMoved && opponent.hasMoved) {
    return
  }
  else {
    console.log("NOT WORKING")
  }
}

function setNewGame() {
  var newZodiac = setZodiacSigns();
  setZodiacMoves(newZodiac);
  currentGame = new Game("Battle of the Zodiac", "Face the other signs in a battle royale", newZodiac)
}

function gameOver() {
    resetElement(playerBattleText)
    battleText.innerText = `Lasted ${currentUser.roundsWon} rounds with ${currentUser.sign.name}`;
    battleLog.innerHTML += `<p>Lasted ${currentUser.roundsWon} rounds with ${currentUser.sign.name}</p>`
    playerBox.innerHTML = "";
}

function resetBattleLog() {
  resetElement(battleLog);
  battleLog.innerHTML += `
  <h3>Battle Log</h3>
  `
}

function endBotzGame() {
  hide(computerBox)
  hide(playerBox)
  hide(battleLog)
  resetBattleLog()
  setNewGame()
  show(goBackBtn)
  show(zodiacSignSelection)
  show(botzExplanation)
  battleText.innerText = "Choose your fighter"
}

function playAnotherBotz() {
  currentUser.roundsWon = 0;
  endBotzGame();
}
