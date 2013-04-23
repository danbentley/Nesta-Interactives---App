define(['boxbox', 'src/enemy-factory'], function(box, EnemyFactory) {

    return {

        $canvas: document.getElementById('game'),

        world: null,

        characterCount: 0,

        enemies: [],

        destroyedEnemyIds: [],

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

            this.characters = this.createEnemies();

            this.createWall({
                x: 120
            });

            this.createWall({
                x: -35
            });

            this.createPedestal({ x: -6, y:10 });

            this.createStand({ x:3, y:10 });
            this.createTallStand({ x:9, y:7 });
            this.createStand({ x:14, y:10 });

            this.createStand({ x:27, y:10 });
            this.createStand({ x:27, y:7 });
            this.createStand({ x:27, y:4 });
            this.createStand({ x:27, y:1 });
            
            this.createStand({ x:33, y:10 });
            this.createStand({ x:33, y:7 });
            this.createStand({ x:33, y:4 });
            this.createStand({ x:33, y:1 });
            this.createStand({ x:33, y:-2 });
            this.createStand({ x:33, y:-5 });

            this.createBridge({ x:45, y:10, legs: { count:7 }});
            this.createBridge({ x:47, y:7, legs: { count:6 }});
            this.createBridge({ x:49, y:4, legs: { count:4 }});
        },

        addListeners: function() {

            $(window).on('character.destroyed', $.proxy(function(e, character) {

                if (this.destroyedEnemyIds.indexOf(character.entity._id) !== -1) return;

                this.destroyedEnemyIds.push(character.entity._id);

                this.characterCount--;
                if (this.characterCount === 0) {
                    $(window).trigger('characters.destroyed');
                }
            }, this));
        },

        createEnemies: function() {

            var enemies = [];

            enemies.push(new EnemyFactory({
                world: this.world,
                enemyType: 'blue',
                x:4.5,
                y:-4,
            }));
            
            enemies.push(new EnemyFactory({
                world: this.world,
                enemyType: 'green',
                x: 10,
                y: -1,
            }));
            
            enemies.push(new EnemyFactory({
                world: this.world,
                enemyType: 'yellow',
                x: 16,
                y: 5,
            }));

            enemies.push(new EnemyFactory({
                world: this.world,
                enemyType: 'red',
                x: 28,
                y: 5,
            }));
            
            enemies.push(new EnemyFactory({
                world: this.world,
                enemyType: 'yellow',
                x: 28,
                y: -5,
            }));

            enemies.push(new EnemyFactory({
                world: this.world,
                enemyType: 'red',
                x:34.5,
                y:0,
            }));
            
            enemies.push(new EnemyFactory({
                world: this.world,
                enemyType: 'blue',
                x:34.5,
                y:6,
            }));
            
            enemies.push(new EnemyFactory({
                world: this.world,
                enemyType: 'red',
                x:48,
                y:7,
            }));
                        
            
            enemies.push(new EnemyFactory({
                world: this.world,
                enemyType: 'green',
                x:52,
                y: 0,
            }));

            enemies.push(new EnemyFactory({
                world: this.world,
                enemyType: 'blue',
                x:58,
                y:6,
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

        createPedestal: function(options) {

            var options = options || {};
            options.type = 'static';
            options.height = 3;
            options.width = 1;

            this.createBlock(options);
        },

        createBridge: function(options) {

            var defaults = {
                legs: {
                    height: 2,
                    count: 4,
                    // The gap between the legs. Surely there's a better
                    // variable name for this.
                    widthFactor: 3
                },
                span: {
                    width: 3,
                    height: .5
                }
            };

            var legOptions = $.extend(true, {}, defaults.legs, options.legs);
            var spanOptions = $.extend(true, {}, defaults.span, options.span);

            for (var i=0; i < legOptions.count; i++) {
                var opts = $.extend(true, {}, options, legOptions);
                opts.x = opts.x + (i * legOptions.widthFactor);

                this.createBlock(opts);
            };

            var spans = legOptions.count - 1;
            for (var i=1; i <= spans; i++) {
                var opts = $.extend({}, options, spanOptions);
                opts.x = opts.x + (i * legOptions.widthFactor - (legOptions.widthFactor / 2));
                opts.y = opts.y - 2;

                this.createBlock(opts);
            };
        },
        
        createStand: function(options) {
            options.legs = { 
                count: 2,
                width: .4,
                height: 1.7,
                widthFactor: 3
            };
            options.span = { 
                width: 4,
                height: .25
            };
            return this.createBridge(options);
        },

        createTallStand: function(options) {
            options.legs = { 
                count: 2,
                width: .25,
                height: 6,
                density: 25,
                widthFactor: 2.5
            };
            options.span = { 
                width: 4,
                height: .25,
                y: 5
            };
            return this.createBridge(options);
        }
    };
});
