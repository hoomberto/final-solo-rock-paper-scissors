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


function removeSign(player, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].name === player.sign.name) {
      array.splice(i, 1);
    }
  }
}

function selectSign(event) {
  console.log(event.srcElement.innerText)
    currentUser.currentChoice = event.srcElement.innertext
    for (var sign of zodiac) {
      if (currentUser.currentChoice === sign.name) {
        currentUser.sign = sign;
        removeSign(currentUser, zodiac)
      }
    }
};

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
