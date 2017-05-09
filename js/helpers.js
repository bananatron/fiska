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
    x: getRandomIntInclusive(0, game.width), 
    y: getRandomIntInclusive(0, game.height)
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


function randomId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}