
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

  // // create a new bitmap data object
  // var bmd = game.add.bitmapData(30,30);

  // // draw to the canvas context like normal
  // bmd.ctx.beginPath();
  // bmd.ctx.rect(0,0,30,30);
  // bmd.ctx.fillStyle = '#ff0000';
  // bmd.ctx.fill();

  // //  In this example the little Gameboy sprite can pass through the top/bottom of the Atari sprite
  // //  Because it's set to ignore collisions on its top/bottom faces.

  // sprite = game.add.sprite(300, 200, 'atari');
  // sprite.name = 'atari';
  // game.physics.enable(sprite, Phaser.Physics.ARCADE);
  // sprite.body.collideWorldBounds = true;
  // sprite.body.checkCollision.up = false;
  // sprite.body.checkCollision.down = false;
  // sprite.body.immovable = true;

  // sprite2 = game.add.sprite(200, 200, bmd);

  // game.physics.enable(sprite2, Phaser.Physics.ARCADE);
  // sprite2.body.collideWorldBounds = true;
  // sprite2.body.bounce.setTo(1, 1);

  // sprite3 = game.add.sprite(0, 210, 'gameboy', 4);

  // game.physics.enable(sprite3, Phaser.Physics.ARCADE);

  // sprite3.name = 'gameboy2';
  // sprite3.body.collideWorldBounds = true;
  // sprite3.body.bounce.setTo(1, 1);

  // sprite2.body.velocity.y = -200;
  // sprite3.body.velocity.x = 200;


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





