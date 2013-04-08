var canvasElem = document.getElementById('game');
var world = boxbox.createWorld(canvasElem, {
    collisionOutlines:true,
    width:1000,
    height:500
});

var MAX_SPEED = 300;
var DESTROY_DELAY = 2000;

var player = world.createEntity({
    name: 'player',
    shape: 'circle',
    radius: 1,
    image: 'img/player.png',
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


var character = {
    name: 'character',
    shape: 'square',
    onImpact: function(entity, force) {
        if (entity.name() !== 'ground') {
            setTimeout($.proxy(function() {
                this.destroy();
            }, this), DESTROY_DELAY);
        }
    }
}

world.createEntity(character, {
    image: 'img/green-character.png',
    x:25,
    width:2.6,
    height:3.3,
    imageOffsetX:-.6,
    imageOffsetY:-1.1
});

world.createEntity(character, {
    image: 'img/red-character.png',
    x:10,
    width:1,
    height:1,
    imageOffsetX:-.25,
    imageOffsetY:-.25
});

world.createEntity(character, {
    image: 'img/blue-character.png',
    x:20,
    width:1.5,
    height:1.2,
    imageOffsetX:-.4,
    imageOffsetY:-.3
});

world.createEntity(character, {
    image: 'img/yellow-character.png',
    x:40,
    width:1.5,
    height:2.8,
    imageOffsetX:-.4,
    imageOffsetY:-.7
});

createBridgeAtPosition({ x:15, y:0 });
createBridgeAtPosition({ x:30, y:0 });
createBridgeAtPosition({ x:45, y:0 });

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
}, 1);

function createBridgeAtPosition(position) {

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
        x: position.x
    });

    world.createEntity(block, {
        x: position.x + 2
    });

    world.createEntity(block, {
        x: position.x + 4
    });

    world.createEntity(block, {
        x: position.x + 6
    });

    world.createEntity(block, {
        x: position.x + 1,
        y: 1,
        width: 4,
        height: .5
    });

    world.createEntity(block, {
        x: position.x + 5,
        y: 1,
        width: 4,
        height: .5
    });
}
