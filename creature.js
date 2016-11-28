"use strict";

var Species = function(game){
  this.game = game;

  this.group;
  this.name;
  this.creatures = [];
  this.color = getRandomHex();
  this.name = this.color;

  this.consumes = []; // Species which this species consumes
  this.evades = []; // Species which this species evades


  this.init = function(){
    console.log(this.name, ' species init');

    // Make game group for species
    this.group = this.game.add.group();

    // Make first creature
    var new_creature = new Creature(game, this);
    new_creature.name = "givemename";
    
    // Call reproduce here instead of instantiating a way different
    // from how our creature itself will do it
    this.creatures.push(new_creature);
    this.game.creatures.push(new_creature);
    this.game.species.push(this);
  }
}


var Creature = function(game, species){
  this.name;
  this.location;
  this.sprite;

  this.consumesFunction;
  this.evadesFunction;

  this.species = species;
  this.game = game;
  this.alive = false;
  this.color = this.species.color;

  this.size = 6;
  this.speed = 250;

  this.consumes = [];

  // Initialize creature (and mark as alive)
  this.init = function(){
    console.log(this.name, "is born");

    // Assign a location
    if (!this.location) this.location = getRandomLocation();

    // Assign sprite
    this.sprite = this.game.add.sprite(this.location.x, this.location.y, this.shape());

    // Add to species group
    this.species.group.add(this.sprite);

    // Add physics
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.setTo(1, 1);
    //this.sprite.body.velocity.x = 200;


    // Start movement
    var randX = getRandomIntInclusive(0, game.world.width);
    var randY = getRandomIntInclusive(0, game.world.height);
    this.game.physics.arcade.moveToXY(this.sprite, randX, randY, this.speed);

    this.alive = true;
  }

  // Game loop calls act for every creature
  this.act = function(){
    if (this.alive === false) this.init();

    //this.game.physics.arcade.moveToPointer(this.sprite, this.speed);
  }

  this.reproduce = function(){
    console.log(this.name, "is reproducing");
    var new_creature = new Creature(this.game, this.species);
    new_creature.color = this.color;
    new_creature.init();

  }

  // The shape or sprite representing the creature
  this.shape = function(){
    // create a new bitmap data object
    // NOTE The hitbox/bitmapdata size can be larger than the visual size (rect) below
    var bmd = game.add.bitmapData(this.size, this.size);

    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,this.size, this.size);
    bmd.ctx.fillStyle = this.color;
    bmd.ctx.fill();

    return bmd;
  }

}
