'use strict';

var size = 3, rows, cols, state = [], grid = [], colors = [], canvas, ctx;
$(document).ready(function () {
  canvas = document.getElementById('myCanvas');
  canvas.width = $(window).width()-100;
  canvas.height = $(window).height()-100;
  // cols = Math.floor($(window).width() / size);
  // rows = Math.floor($(window).height() / size);
  ctx = canvas.getContext('2d');
});


window.creatures = [];

function drawCell(x, y, size, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
  ctx.restore();
}

var Creature = function(name){
  this.name = name;
  this.location;
  this.alive = false;
  this.color = getRandomHex();
  this.size = 6;

  this.init = function(){
    // console.log(name, "is born");
    if (!this.location) this.location = getRandomLocation();
    this.alive = true;
  }

  this.act = function(){
    // console.log(name, "is acting");
    this.move();
    this.draw();
    if (window.creatures.length < 100){
      this.reproduce();
    }
  }

  this.move = function(){
    // console.log(name, "is moving");
    this.location = getRandomLocationNearby(this.location);
  }

  this.draw = function(){
    // console.log(name, "is drawing");
    drawCell(this.location.x, this.location.y, this.size, this.color);
  }

  this.reproduce = function(){
    console.log(name, "is reproducing");
    var ncc = new Creature(name);
    ncc.color = this.color;
    ncc.location = getRandomLocationNearby(this.location, this.size);
    ncc.size = 6;
    window.creatures.push(ncc);
  }
}

window.creatures.push(new Creature('ike'));
window.creatures.push(new Creature('daisy'));
window.creatures.push(new Creature('clyde'));


function clearCanvas(canvas){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function startTick(interval_ms){
  setInterval(function(){

    if (window.creatures.length === 0) return false;

    clearCanvas(canvas);

    creatures.forEach(function(creature){
      if (creature.alive === false) creature.init(); 
      creature.act();
    });

  }, interval_ms)
}
startTick(50);


function getRandomHex(){
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLocation() {
  var coords = {
    x: getRandomIntInclusive(0, canvas.width), 
    y: getRandomIntInclusive(0, canvas.height)
  }
  return coords;
}

function getRandomLocationNearby(current_location, size){
  var size = size || 1;
  var border_buffer = 10;
  // current_location is object like {x: 0, y: 0}
  var starting_location = current_location;

  // Ensure starting_location isn't off-screen
  if (starting_location.x <= 0) starting_location.x = 1
  if (starting_location.y <= 0) starting_location.y = 1
  if (starting_location.x >= canvas.width) starting_location.x = canvas.width-border_buffer
  if (starting_location.x >= canvas.height) starting_location.y = canvas.height-border_buffer

  if (Math.random() >= 0.5) {
    current_location.x += 1;
  } else {
    current_location.x -= 1;
  }
  if (Math.random() >= 0.5) {
    current_location.y += 1;
  } else {
    current_location.y -= 1;
  }

  // Don't collide with others
  var cc = ctx.getImageData(current_location.x, current_location.y, size, size).data;
  var hex_at_location = "#" + ("000000" + rgbToHex(cc[0], cc[1], cc[2])).slice(-6);

  if (hex_at_location !== '#000000') {
    return starting_location;
  }

  // Don't go off canvas
  if (current_location.x >= canvas.width || current_location.x <= 0 ){
    return starting_location;
  } else if ((current_location.y >= canvas.height || current_location.y <= 0 )) {
    return starting_location;
  } else {
    return current_location;
  }
}

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255)
  throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}




