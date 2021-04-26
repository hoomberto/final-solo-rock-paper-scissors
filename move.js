class Move {
  constructor(name, description, damage, accuracy, type) {
    this.name = name;
    this.description = description;
    this.damage = damage;
    this.accuracy = accuracy
    this.type = type;
  }
}

var rockin = new Move("PSI-Rockin", "Deals 20 damage most of the time", 20, 90, "earth");
var psiThunder = new Move("PSI-Thunder", "Deals 30 damage without fail", 30, 100, "air");
var psiFire = new Move("PSI-Fire", "Deals lots of damage, but tends to miss", 60, 20, "fire");
var psiFreeze = new Move("PSI-Freeze", "Deals 40 with decent accuracy", 40, 80, "water");


var emeraldSplash = new Move("Emerald Splash", "Nobody can deflect this?!", 35, 70, "water");
var detroitSmash = new Move("Detroit Smash", "デトロイトスマッシュ", 50, 80, "fire");
var negativeEnergy = new Move("Negative Energy", "Overwhelming bad vibes!", 35, 70, "water");

var poke = new Move("Poke", "Doesn't do much, but usually work", 15, 70, "earth");
var machineWashCold = new Move("Macine Wash Cold", "Less likely to fade!", 50, 80, "water");
var sneeze = new Move("Sneeze", "Is your opponent wearing a mask?", 35, 70, "water");

var moodKill = new Move("Mood Kill", "Bring it to a halt!", 35, 70, "water");
var scoff = new Move("Scoff", "An expression of scornful derision", 50, 80, "air");
var saltSplash = new Move("Salt Splash", "ソルトスプラッシュ", 35, 70, "water");

var jojoPose = new Move("JoJo Pose", "Best against enemy stand users", 15, 70, "fire");
var blink = new Move("Blink", "Is there hidden power behind this move?", 100, 5, "air");
var pout = new Move("Pout", "Sometimes it's effective?", 50, 30, "water");


var moves = [
  rockin, psiThunder, psiFire, psiFreeze, emeraldSplash,
  detroitSmash, negativeEnergy, poke, machineWashCold,
  sneeze, moodKill, scoff, saltSplash, jojoPose, blink, pout];
