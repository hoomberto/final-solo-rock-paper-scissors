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

var moves = [rockin, psiThunder, psiFire, psiFreeze]
