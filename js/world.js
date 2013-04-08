var canvasElem = document.getElementById('game');
var world = boxbox.createWorld(canvasElem, {
    //collisionOutlines:true,
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
    x:20,
    width:1,
    height:1,
    imageOffsetX:-.25,
    imageOffsetY:-.25
});

world.createEntity(character, {
    image: 'img/blue-character.png',
    x:10,
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
