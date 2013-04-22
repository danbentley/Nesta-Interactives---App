define(['boxbox', 'src/character'], function(box, Character) {

    return {

        $canvas: document.getElementById('game'),

        world: null,

        characterCount: 0,

        enemies: [],

        destroyedCharacterIds: [],

        wallTemplate: {
            name: 'wall',
            shape: 'square',
            type: 'static',
            color: 'rgb(231, 227, 221)',
            borderColor: 'rgb(231, 227, 221)',
            height: 100,
            width: 25
        }, 

        groundTemplate: {
            name: 'ground',
            shape: 'square',
            type: 'static',
            color: 'rgb(101, 102, 101)',
            borderColor: 'rgb(101, 101, 101)',
            width: 500,
            height: 1.25,
            y: 12
        },

        blockTemplate: {
            name: 'block',
            shape: 'square',
            color: 'rgb(206, 206, 206)',
            borderColor: 'rgb(159, 159, 159)',
            density: 5,
            width: .5,
            height: 4
        },

        init: function() {

            this.addListeners();

            this.world = this.createWorld({
                //collisionOutlines:true,
                //scale:10,
                width:1000,
                height:500,
            });

            this.createGround();

            this.characters = this.createCharacters();

            this.createWall({
                x: 80
            });

            this.createWall({
                x: -35
            });

            this.createPedestalAtPosition({ x: -6, y:10 });

            this.createStandAtPosition({ x:3, y:10 });
            this.createTallStandAtPosition({ x:9, y:7 });
            this.createStandAtPosition({ x:14, y:10 });

            this.createStandAtPosition({ x:27, y:10 });
            this.createStandAtPosition({ x:27, y:7 });
            this.createStandAtPosition({ x:27, y:4 });
            this.createStandAtPosition({ x:27, y:1 });
            
            this.createStandAtPosition({ x:33, y:10 });
            this.createStandAtPosition({ x:33, y:7 });
            this.createStandAtPosition({ x:33, y:4 });
            this.createStandAtPosition({ x:33, y:1 });
            this.createStandAtPosition({ x:33, y:-2 });
            this.createStandAtPosition({ x:33, y:-5 });

            this.createBridgeAtPosition({ x:45, y:10, legs:8 });
            this.createBridgeAtPosition({ x:47, y:7, legs:6 });
            this.createBridgeAtPosition({ x:49, y:4, legs:4 });
        },

        addListeners: function() {

            $(window).on('character.destroyed', $.proxy(function(e, character) {

                if (this.destroyedCharacterIds.indexOf(character.entity._id) !== -1) return;

                this.destroyedCharacterIds.push(character.entity._id);

                this.characterCount--;
                if (this.characterCount === 0) {
                    $(window).trigger('characters.destroyed');
                }
            }, this));
        },

        createCharacters: function() {

            var enemies = [];

            enemies.push(new Character({
                world: this.world,
                image: 'img/new-blue-character.png',
                x:4.5,
                y:-4,
                width:2,
                height:1.7,
                imageOffsetX:-.45,
                imageOffsetY:-.4
            }));
            
            enemies.push(new Character({
                world: this.world,
                image: 'img/new-green-character.png',
                x: 10,
                y: -1,
                width:2.79,
                height:3.4,
                imageOffsetX:-.68,
                imageOffsetY:-0.86
            }));
            
            enemies.push(new Character({
                world: this.world,
                image: 'img/new-yellow-character.png',
                x: 16,
                y: 5,
                width: 1.5,
                height: 2.8,
                imageOffsetX: -.35,
                imageOffsetY: -.68
            }));

            enemies.push(new Character({
                world: this.world,
                image: 'img/new-red-character.png',
                x: 28,
                y: 5,
                width: 1.2,
                height: 1,
                imageOffsetX: -.25,
                imageOffsetY: -.27
            }));
            
            enemies.push(new Character({
                world: this.world,
                image: 'img/new-yellow-character.png',
                x: 28,
                y: -5,
                width: 1.5,
                height: 2.8,
                imageOffsetX: -.35,
                imageOffsetY: -.68
            }));

            enemies.push(new Character({
                world: this.world,
                image: 'img/new-red-character.png',
                x:34.5,
                y:0,
                width:1.2,
                height:1,
                imageOffsetX:-.25,
                imageOffsetY:-.27
            }));
            
            enemies.push(new Character({
                world: this.world,
                image: 'img/new-blue-character.png',
                x:34.5,
                y:6,
                width:2,
                height:1.7,
                imageOffsetX:-.45,
                imageOffsetY:-.4
            }));
            
            enemies.push(new Character({
                world: this.world,
                image: 'img/new-red-character.png',
                x:48,
                y:7,
                width:1.2,
                height:1,
                imageOffsetX:-.25,
                imageOffsetY:-.27
            }));
                        
            
            enemies.push(new Character({
                world: this.world,
                image: 'img/new-green-character.png',
                x:52,
                y: 0,
                width:2.79,
                height:3.4,
                imageOffsetX:-.68,
                imageOffsetY:-0.86
            }));

            enemies.push(new Character({
                world: this.world,
                image: 'img/new-blue-character.png',
                x:59,
                y:6,
                width:2,
                height:1.7,
                imageOffsetX:-.45,
                imageOffsetY:-.4
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

        createBlock: function(options) {
            return this.world.createEntity(this.blockTemplate, options);
        },

        createPedestalAtPosition: function(position) {

            this.createBlock({
                x: position.x,
                y: position.y,
                type: 'static',
                height: 3,
                width: 1
            });
        },

        createBridgeAtPosition: function(options) {

            var legs = ('legs' in options) ? options.legs : 4;

            for (var i=0; i < legs; i++) {

                this.createBlock({
                    x: options.x + (i * 2),
                    y: options.y,
                    height: 2
                });
            };

            var spans = legs / 2;
            for (var i=0; i < spans; i++) {
                this.createBlock({
                    x: options.x + 1 + (i * 4),
                    y: options.y - 1,
                    width: 4,
                    height: .5
                });
            };
        },
        
        createStandAtPosition: function(position) {

            var legs = 2;
            for (var i=0; i < legs; i++) {
                this.createBlock({
                    x: position.x + (i * 3),
                    y: position.y,
                    height: 1.7,
                    width: 0.4
                });
            };
        
            this.createBlock({
                x: position.x + 1.5,
                y: position.y - 2,
                width: 4,
                height: .25
            });
        },
        
        createTallStandAtPosition: function(position) {
        
            this.createBlock({
                x: position.x,
                y: position.y,
                height: 6,
                width:0.25,
                density: 25
            });
        
            this.createBlock({
                x: position.x + 2,
                y: position.y,
                height: 6,
                width: 0.25
            });
            
            this.createBlock({
                x: position.x + 1,
                y: position.y - 3.5,
                width: 3,
                height: .25
            });
        
        }

    };
});
