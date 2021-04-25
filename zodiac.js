class Zodiac {
  constructor(name, element, quality, icon) {
    this.id = Date.now();
    this.hp =  100,
    this.stats = {
    shield: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    accuracy: 1,
  },
    this.buffs = {
    shield: 0,
    attack: 0,
    defense: 0,
    speed: 0,
  },
  this.statusAilments = {
    confused: false,
    paralyzed: false,
    burnt: false,
    frozen: false
  },
  this.name = name,
  this.element = element,
  this.elementMultiplier = 1,
  this.quality = quality,
  this.qualityMultiplier = 1,
  this.hasElementAdvantage = false;
  this.hasQualityAdvantage = false;
  this.moves = []
  this.icon = icon;
  }
}
