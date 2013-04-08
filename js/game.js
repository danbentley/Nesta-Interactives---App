var canvasElem = document.getElementById("game");
var world = boxbox.createWorld(canvasElem);
 
var player = world.createEntity({
  name: "player",
  shape: "circle",
  radius: 1,
  image: "img/pig.png",
  imageStretchToFit: true,
  density: 4,
  x: 2
});

var clickOrigin;
$(window).on('mousedown', function(e) {
    clickOrigin = {
        x:e.offsetX,
        y:e.offsetY
    };
});
$(window).on('mouseup', function(e) {
    var dragDistance = clickOrigin.x + e.offsetX;

    var degree = getAngle({
        x:e.pageX,
        y:e.pageY,
    }, clickOrigin);

    player.applyImpulse(dragDistance, degree);
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
 
world.createEntity({
  name: "ground",
  shape: "square",
  type: "static",
  color: "rgb(0,100,0)",
  width: 20,
  height: .5,
  y: 12
});
 
var block = {
  name: "block",
  shape: "square",
  color: "brown",
  width: .5,
  height: 4,
  onImpact: function(entity, force) {
    if (entity.name() === "player") {
      this.color("black");
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
