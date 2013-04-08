var canvasElem = document.getElementById('game');
var world = boxbox.createWorld(canvasElem, {
    //collisionOutlines:true,
    width:1000,
    height:500
});

var MAX_SPEED = 300;
 
var player = world.createEntity({
  name: 'player',
  shape: 'circle',
  radius: 1,
  image: 'img/pig.png',
  imageStretchToFit: true,
  density: 4,
  x: 2
});

world.createEntity({
  name: 'ground',
  shape: 'square',
  type: 'static',
  color: 'rgb(231, 227, 221)',
  width: 1000,
  height: .5,
  y: 12
});
 
var block = {
  name: 'block',
  shape: 'square',
  color:'rgb(205, 205, 207)',
  width: .5,
  height: 4,
  onImpact: function(entity, force) {
    if (entity.name() === 'player') {
      //this.color('black');
    }
  }
};
 
world.createEntity(block, {
  x: 15
});
 
world.createEntity(block, {
  x: 17
});
 
world.createEntity(block, {
  x: 16,
  y: 1,
  width: 4,
  height: .5
});

var character = {
    name: 'character',
    shape: 'square',
    density: 1,
    imageStretchToFit:true,
    onImpact: function(entity, force) {
        if (entity.name() === 'player') {
            this.destroy();
        }
    }
}

world.createEntity(character, {
    image: 'img/green-character.png',
    x:8,
    width:2,
    height:4,
    imageOffsetX:-.5,
    imageOffsetY:-1,
});


var offsetStart;
var offsetEnd;
$(window).on('mousedown', function(e) {
    offsetStart = {
        x:e.offsetX,
        y:e.offsetY
    };
});

$(window).on('mouseup', function(e) {

    offsetEnd = {
        x:e.pageX,
        y:e.pageY,
    };

    var dragDistance = offsetStart.x + offsetEnd.x
    var speed = Math.min(dragDistance, MAX_SPEED);
    var degree = getAngle(offsetEnd, offsetStart);

    player.applyImpulse(speed, degree);
});

function getAngle(startPosition, endPosition) {
    var calcAngle = Math.atan2(startPosition.x - endPosition.x, startPosition.y - endPosition.y) * (180 / Math.PI);	
    // To atan2 returns a range of -180 to 180 which is perfect
    // for CSS3 rotation but not here where we'd prefer a range
    // between 0 and 360
    if(calcAngle < 0) {
        calcAngle = Math.abs(calcAngle);
    } else {
        calcAngle = 360 - calcAngle;		
    }
    return calcAngle;
}

setInterval(function() {
    var position = player.position();
    position.y = 0;
    position.x -= 10;
    world.camera(position);
    world.scale(5);
}, 1);
 
