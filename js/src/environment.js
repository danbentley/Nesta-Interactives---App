/*
var canvasElem = document.getElementById('game');
var world = boxbox.createWorld(canvasElem, {
    collisionOutlines:true,
    width:1000,
    height:500
});
*/


/*
var player = world.createEntity({
    name: 'player',
    shape: 'circle',
    image: 'img/player1.png',
    imageStretchToFit: true,
    density: 4,
    x: 0
});
*/


define([], function() {

    return {

        $canvas: document.getElementById('game'),

        MAX_SPEED: 400,

        DESTROY_DELAY: 2000,

        world: null,

        player: null,

        init: function() {

            this.world = this.createWorld({
                collisionOutlines:true,
                width:1000,
                height:500
            });

            this.createGround();

            this.createWall({
                x: 60
            });

            this.createWall({
                x: -5
            });

            this.createCharacter({
                image: 'img/green-character.png',
                x:25,
                width:2.6,
                height:3.3,
                imageOffsetX:-.6,
                imageOffsetY:-1.1
            });

            this.createCharacter({
                image: 'img/red-character.png',
                x:20,
                width:1,
                height:1,
                imageOffsetX:-.25,
                imageOffsetY:-.25
            });

            this.createCharacter({
                image: 'img/blue-character.png',
                x:10,
                width:1.5,
                height:1.2,
                imageOffsetX:-.4,
                imageOffsetY:-.3
            });

            this.createCharacter({
                image: 'img/yellow-character.png',
                x:40,
                width:1.5,
                height:2.8,
                imageOffsetX:-.4,
                imageOffsetY:-.7
            });

            this.createBridgeAtPosition({ x:15, y:0 });
            this.createBridgeAtPosition({ x:30, y:0 });
            this.createBridgeAtPosition({ x:45, y:0 });

            this.player = this.createPlayer();
        },

        wallTemplate: {
            name: 'wall',
            shape: 'square',
            type: 'static',
            color: 'rgb(231, 227, 221)',
            height: 500,
            widtr: .5
        }, 

        playerTemplate: {
            name: 'player',
            shape: 'circle',
            image: 'img/player1.png',
            imageStretchToFit: true,
            density: 4,
            x: 0
        },

        characterTemplate: {
            name: 'character',
            shape: 'square',
            onImpact: function(entity, force) {
                if (entity.name() !== 'ground') {
                    setTimeout($.proxy(function() {
                        this.destroy();
                    }, this), this.DESTROY_DELAY);
                }
            }
        },

        groundTemplate: {
            name: 'ground',
            shape: 'square',
            type: 'static',
            color: 'rgb(231, 227, 221)',
            width: 500,
            height: .5,
            y: 12
        },

        createWall: function(options) {
            return this.world.createEntity(this.wallTemplate, options);
        },

        createWorld: function(options) {
            return boxbox.createWorld(this.$canvas, options);
        },

        createPlayer: function(options) {
            return this.world.createEntity(this.playerTemplate, options);
        },

        createGround: function(options) {
            return this.world.createEntity(this.groundTemplate, options);
        },

        createCharacter: function(options) {
            return this.world.createEntity(this.characterTemplate, options);
        },

        createBridgeAtPosition: function(position) {

            var block = {
                name: 'block',
                shape: 'square',
                color:'rgb(205, 205, 207)',
                width: .5,
                height: 4
            };

            this.world.createEntity(block, {
                x: position.x
            });

            this.world.createEntity(block, {
                x: position.x + 2
            });

            this.world.createEntity(block, {
                x: position.x + 4
            });

            this.world.createEntity(block, {
                x: position.x + 6
            });

            this.world.createEntity(block, {
                x: position.x + 1,
                y: 1,
                width: 4,
                height: .5
            });

            this.world.createEntity(block, {
                x: position.x + 5,
                y: 1,
                width: 4,
                height: .5
            });
        }
    };
});



/*
world.createEntity({
    name: 'ground',
    shape: 'square',
    type: 'static',
    color: 'rgb(231, 227, 221)',
    width: 500,
    height: .5,
    y: 12
});


*/

/*
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
*/

/*
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
*/

