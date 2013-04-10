define(['boxbox'], function() {

    return {

        player: null,

        world: null,

        entity: null,

        init: function(options) {

            this.addListeners();

            this.world = options.world;

            this.entity = this.createPlayer(options);
        },

        addListeners: function() {
            $(window).on('drag.strength', $.proxy(function(e, strength) {
                if (!strength) return;
                this.entity.image('img/player-' + strength + '.png');
            },this));
        },

        playerTemplate: {
            name: 'player',
            shape: 'circle',
            image: 'img/player-weak.png',
            imageStretchToFit: true,
            maxVelocityX: this.MAX_POWER,
            maxVelocityY: this.MAX_POWER,
            density: 5,
            x: 0
        },

        createPlayer: function(options) {
            return this.world.createEntity(this.playerTemplate, options);
        },
         
        canMove: function() {
            var velocity = this.entity._body.GetLinearVelocity();
            return (Math.round(velocity.x) < 2 && Math.round(velocity.y) < 2);
        }
    };
});
