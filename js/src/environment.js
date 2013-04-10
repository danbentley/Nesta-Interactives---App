define(['boxbox', 'src/character'], function(box, Character) {

    return {

        $canvas: document.getElementById('game'),

        world: null,

        characterCount: 0,

        enemies: [],

        destroyedCharacterIds: [],

        ready: false,

        wallTemplate: {
            name: 'wall',
            shape: 'square',
            type: 'static',
            color: 'rgb(231, 227, 221)',
            borderColor: 'rgb(231, 227, 221)',
            height: 500,
            width: 25
        }, 

        groundTemplate: {
            name: 'ground',
            shape: 'square',
            type: 'static',
            color: 'rgb(101, 101, 101)',
            borderColor: 'rgb(101, 101, 101)',
            width: 500,
            height: 2,
            y: 12
        },

        blockTemplate: {
            name: 'block',
            shape: 'square',
            color: 'rgb(206, 206, 206)',
            borderColor: 'rgb(206, 206, 206)',
            width: .5,
            height: 4
        },

        init: function() {

            this.addListeners();
            this.startReadyTimer();

            this.world = this.createWorld({
                //collisionOutlines:true,
                width:1000,
                height:500
            });

            this.createGround();

            this.characters = this.createCharacters();

            this.createWall({
                x: 80
            });

            this.createWall({
                x: -25
            });

            this.createBridgeAtPosition({ x:15, y:0 });
            this.createBridgeAtPosition({ x:30, y:0 });
            this.createBridgeAtPosition({ x:45, y:0 });
        },

        startReadyTimer: function() {
            setTimeout($.proxy(function() {
                this.ready = true;
            }, this), 2000);
        },

        addListeners: function() {

            $(window).on('character.destroyed', $.proxy(function(e, character) {

                if (this.destroyedCharacterIds.indexOf(character.entity._id) !== -1) return;

                this.destroyedCharacterIds.push(character.entity._id);

                this.characterCount--;
                if (this.characterCount === 0) {
                    $(window).trigger('game.over');
                }
            }, this));
        },

        createCharacters: function() {

            var enemies = [];
            enemies.push(new Character({
                world: this.world,
                image: 'img/green-character.png',
                x:25,
                width:2.6,
                height:3.3,
                imageOffsetX:-.6,
                imageOffsetY:-1.1
            }));

            enemies.push(new Character({
                world: this.world,
                image: 'img/red-character.png',
                x:20,
                width:1,
                height:1,
                imageOffsetX:-.25,
                imageOffsetY:-.25
            }));

            enemies.push(new Character({
                world: this.world,
                image: 'img/blue-character.png',
                x:10,
                width:1.5,
                height:1.2,
                imageOffsetX:-.4,
                imageOffsetY:-.3
            }));

            enemies.push(new Character({
                world: this.world,
                image: 'img/yellow-character.png',
                x:40,
                width:1.5,
                height:2.8,
                imageOffsetX:-.4,
                imageOffsetY:-.7
            }));

            this.characterCount = enemies.length;

            return enemies;
        },

        createWall: function(options) {
            return this.world.createEntity(this.wallTemplate, options);
        },

        createWorld: function(options) {
            return boxbox.createWorld(this.$canvas, options);
        },

        createGround: function(options) {
            return this.world.createEntity(this.groundTemplate, options);
        },

        createBridgeAtPosition: function(position) {

            this.world.createEntity(this.blockTemplate, {
                x: position.x
            });

            this.world.createEntity(this.blockTemplate, {
                x: position.x + 2
            });

            this.world.createEntity(this.blockTemplate, {
                x: position.x + 4
            });

            this.world.createEntity(this.blockTemplate, {
                x: position.x + 6
            });

            this.world.createEntity(this.blockTemplate, {
                x: position.x + 1,
                y: 1,
                width: 4,
                height: .5
            });

            this.world.createEntity(this.blockTemplate, {
                x: position.x + 5,
                y: 1,
                width: 4,
                height: .5
            });
        }
    };
});
