
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', { 
  preload: preload, 
  create: create, 
  update: update, 
  render: render 
});


function preload() {

  //game.load.spritesheet('gameboy', 'assets/sprites/gameboy_seize_color_40x60.png', 40, 60);
  //game.load.image('atari', 'assets/sprites/atari130xe.png');

}

function preload(){
  game.stage.disableVisibilityChange = true;
}

function create() {

  game.creatures = [];
  game.species = [];
  game.speciesMaximum = game.width/6;

  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.stage.backgroundColor = '#292924';

  var r = new Species(game);
  var s = new Species(game);
  var p = new Species(game);
  

  r.consumes[s.name] = r;
  s.consumes[p.name] = s;
  p.consumes[r.name] = p;
  
  r.init();
  s.init();
  p.init();

}

function update() {
  // game.physics.arcade.collide(sprite, sprite2);
  // game.physics.arcade.collide(sprite, sprite3);
  // game.physics.arcade.moveToObject(sprite3, sprite2, 20)

  game.species.forEach(function(spec){
    if (spec.consumes && Object.keys(spec.consumes).length > 0) { // If this species consumes

      // Detect collision between it and it's prey
      Object.keys(spec.consumes).forEach(function(prey_key){
        var prey = spec.consumes[prey_key]
        game.physics.arcade.collide(spec.group, prey.group, collisionHandler);
      })
    }
  });

  game.creatures.forEach(function(creature){
    creature.act();
  });

}

// Handler called from update when two sprites collide
function collisionHandler (sprite1, sprite2) {

  // T("sin", {freq:getRandomIntInclusive(100, 1000), mul:0.01}).bang().play();

  // game.stage.backgroundColor = getRandomHex();

  // * sprite_1.meta is the creature object for the associated sprite
  var object1 = sprite1.meta;
  var object2 = sprite2.meta;

  // If object1 consumes object 2, kill object 2
  if (object1.consumes[object2.species.name] && object2.alive === true){
    // Unless object2 evades object 1
    object2.destroy();
  }

  window.setTimeout(function(){
    // If object2 consumes object 1, kill object 1
    if (!object2.consumes[object1.species.name] && object1.alive === true){
      // Unless object1 evades object2
      object1.destroy();
    }
  }, 500)


}

function render() {

  //game.debug.bodyInfo(sprite, 16, 24);

  // game.debug.body(sprite);
  // game.debug.body(sprite2);

}





