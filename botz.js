function setZodiacMoves(array) {
  for (var sign of array) {
    addMoves(sign)
  }
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
  var randomToCompare = Math.floor(Math.random() * 120 + 1);
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

function battleLogAnnounce() {
  updateBattleLog(`${currentUser.sign.name} encounters ${currentComp.sign.name}!!`);
  updateBattleLog(`${currentUser.sign.name} belongs to the ${currentUser.sign.element} element and its quality is ${currentUser.sign.quality}`);
  updateBattleLog(`${currentComp.sign.name} belongs to the ${currentComp.sign.element} element and its quality is ${currentComp.sign.quality}`);
}

function compareBoxAnnounce() {
  updateInner(compareBox, `${currentUser.sign.name} encounters ${currentComp.sign.name}!!`)
  updateInner(compareBox, `${currentUser.sign.name} belongs to the ${currentUser.sign.element} element and its quality is ${currentUser.sign.quality}`)
  updateInner(compareBox, `${currentComp.sign.name} belongs to the ${currentComp.sign.element} element and its quality is ${currentComp.sign.quality}`)
}

function announce(currentUser, currentComp) {
  var playerSign = currentUser.sign.name.toUpperCase();
  var opponentSign = currentComp.sign.name.toUpperCase();
  resetElement(compareBox);
  compareBoxAnnounce()
  battleLogAnnounce();
}

function compareQualities(user, comp) {
  if (user.quality === comp.quality) {
    compareBox.innerHTML +=`<p>It was ${user.quality} vs ${comp.quality} - tie!</p>\n`;
  }
  if ((user.quality === 'cardinal' && comp.quality === 'fixed') || (user.quality === 'fixed' && comp.quality === 'mutable') || (user.quality === 'mutable' && comp.quality === 'cardinal')) {
    buffAndWeaken(user, comp);
    compareBox.innerHTML +=`<p>Quality win! ${user.quality} beats ${comp.quality}!</p>\n`;
  }
  if ((user.quality === 'cardinal' && comp.quality === 'mutable') || (user.quality === 'fixed' && comp.quality === 'cardinal') || (user.quality === 'mutable' && comp.quality === 'fixed')) {
    buffAndWeaken(comp, user);
    compareBox.innerHTML +=`<p>Quality loss! ${user.quality} lost against ${comp.quality}</p>\n`;
  }
}

function buffAndWeaken(player, opponent) {
  player.qualityMultiplier = 2;
  player.hasQualityAdvantage = true;
  player.buffs.attack = 10;
  player.buffs.speed = 1.2;
  opponent.buffs.attack = -10;
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
    compareBox.innerHTML = "You are both evenly matched!\n";
    updateBattleLog(`You are both evenly matched!`);
    return
  }
  if (currentPlayer.hasElementAdvantage && !currentPlayer.hasQualityAdvantage && !opponent.hasElementAdvantage && !opponent.hasQualityAdvantage) {
    compareBox.innerHTML = "All right! You have an elemental advantage!\n";
    updateBattleLog(`All right! You have an elemental advantage!`);
  }
  if (opponent.hasElementAdvantage && !opponent.hasQualityAdvantage && !currentPlayer.hasElementAdvantage && !currentPlayer.hasQualityAdvantage) {
    compareBox.innerHTML += "Yikes! You're at an elemental disadvantage!\n";
    updateBattleLog(`Yikes! You're at an elemental disadvantage!`);
  }
  if (!currentPlayer.hasElementAdvantage && currentPlayer.hasQualityAdvantage && !opponent.hasQualityAdvantage && !opponent.hasElementAdvantage) {
    compareBox.innerHTML += "Yes! You have a quality advantage!\n";
    updateBattleLog(`Yes! You have a quality advantage!`);
  }
  if (!opponent.hasElementAdvantage && opponent.hasQualityAdvantage && !currentPlayer.hasElementAdvantage && !currentPlayer.hasQualityAdvantage) {
    compareBox.innerHTML += "Uh oh! The opponent has a quality advantage!\n";
    updateBattleLog(`Uh oh! The opponent has a quality advantage!`);
  }
  else if (currentPlayer.hasElementAdvantage && currentPlayer.hasElementAdvantage && !opponent.hasElementAdvantage && !opponent.hasQualityAdvantage) {
    compareBox.innerHTML += `${currentPlayer.name} has a total advantage!\n`;
    updateBattleLog(`${currentPlayer.name} has a total advantage!`);
  }
  else if (opponent.hasElementAdvantage && opponent.hasQualityAdvantage && !currentPlayer.hasElementAdvantage && !currentPlayer.hasQualityAdvantage) {
    compareBox.innerHTML = "Oh no! You're at a total disadvantage!\n";
    updateBattleLog(`Oh no! You're at a total disadvantage!`);
  }
  else  {
    compareBox.innerHTML = "This could be a close one!\n";
    updateBattleLog(`This could be a close one!`);
  }
}

function compareSpeeds(currentPlayer, opponent) {
  var currentPlayerSpeed = currentPlayer.sign.stats.speed;
  var currentPlayerBuff = currentPlayer.sign.buffs.speed;
  var opponentSpeed = opponent.sign.stats.speed;
  var opponentBuff = opponent.sign.buffs.speed;
  if (currentPlayer.hasMoved && opponent.hasMoved) {
    return;
  }
  if (((currentPlayerSpeed + currentPlayerBuff) > (opponentSpeed + opponentBuff)) && !currentPlayer.hasMoved) {
    runMove(currentPlayer, opponent);
  }
  else if (((currentPlayerSpeed + currentPlayerBuff) < (opponentSpeed + opponentBuff)) && !opponent.hasMoved) {
    runMove(opponent, currentPlayer);
  }
  else if (((currentPlayerSpeed + currentPlayerBuff) === (opponentSpeed + opponentBuff)) && !currentPlayer.hasMoved) {
    runMove(currentPlayer, opponent);
  }
  else if (currentPlayer.hasMoved && !opponent.hasMoved) {
    runMove(opponent, currentPlayer);
  }
}

function runMove(currentPlayer, opponent) {
  currentPlayer.hasMoved = true;
  var currentPlayerHp = currentPlayer.sign.hp;
  currentMove = currentPlayer.currentMove;
  hitOrMiss(currentPlayer, opponent);
  setTimeout(function() {checkOpponentHealth(currentPlayer, opponent)}, 1000);
}

function hitOrMiss(currentPlayer, opponent) {
  if (checkAccuracy(currentPlayer.currentMove.accuracy)) {
    var damageCalculation = (currentMove.damage + currentPlayer.sign.stats.attack + currentPlayer.sign.buffs.attack) * currentPlayer.sign.elementMultiplier * currentPlayer.sign.qualityMultiplier;
    showMoveUsed(currentPlayer);
    updateBattleLog(`${currentPlayer.sign.name} uses ${currentPlayer.currentMove.name}! It causes ${damageCalculation} damage!`);
    opponent.sign.hp -= damageCalculation;
  }
  else {
    announceMiss(currentPlayer);
    updateBattleLog(`${currentPlayer.sign.name} tried using ${currentMove.name}, but it missed!`);
  }
}

function checkWhoLost(currentPlayer, opponent) {
  if (currentPlayer.name === currentComp.name && currentPlayer.isWinner && opponent.lostRound) {
    gameOver()
    setTimeout(function() {delayPlayBotzAgain()}, 3500);
    return
  }
  else if (currentPlayer.name === currentUser.name && currentPlayer.isWinner) {
    hide(playerBox)
    hide(computerBox)
    gameRound();
  }
}

function checkOpponentHealth(currentPlayer, opponent) {
  if (opponent.sign.hp > 0) {
    showPlayerBattleText(opponent)
    setBothBoxes();
    setPlayerMoves(playerBox, currentUser)
    makeMovesSelectable();
    updateBattleLog(`<p>${opponent.sign.name} still standing with ${opponent.sign.hp} HP</p>`);
  }
  else {
    setWinnerLoser(currentPlayer, opponent);
    setTimeout(function() {checkWhoLost(currentPlayer, opponent)}, 500)
  }
}

function setWinnerLoser(currentPlayer, opponent) {
  opponent.sign.hp = 0;
  opponent.lostRound = true;
  currentPlayer.lostRound = false;
  currentPlayer.isWinner = true;
  currentPlayer.winRound();
  opponent.signLoss();
}

function delayPlayBotzAgain() {
  resetElement(battleText);
  resetElement(playerBattleText);
  playAnotherBotz();
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
  else {
    return
  }
}

function gameOver() {
    resetElement(playerBattleText)
    battleText.innerText = `Lasted ${currentUser.roundsWon} rounds with ${currentUser.sign.name}`;
    updateBattleLog(`Lasted ${currentUser.roundsWon} rounds with ${currentUser.sign.name}`)
    playerBox.innerHTML = "";
}

function resetBattleLog() {
  resetElement(battleLog);
  updateBattleLog(`
  <div id="battleLog" class="battle">
  </div>
  `)
}

function endBotzGame() {
  hide(computerBox)
  hide(playerBox)
  hide(battleLogContainer)
  resetBattleLog()
  setZodiacAndMoves()
  show(goBackBtn)
  show(zodiacSignSelection)
  show(botzExplanation)
  battleText.innerText = "Choose your fighter"
}

function playAnotherBotz() {
  currentUser.roundsWon = 0;
  endBotzGame();
}
