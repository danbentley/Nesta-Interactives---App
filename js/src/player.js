define(['boxbox'], function() {

    return {

        player: null,

        world: null,

        entity: null,

        angle: 0,

        power: 0,

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
        },

        getAngle: function(startPosition, endPosition) {
            var angle = Math.atan2(startPosition.x - endPosition.x, startPosition.y - endPosition.y) * (180 / Math.PI);	

            // To atan2 returns a range of -180 to 180 which is perfect
            // for CSS3 rotation but not here where we'd prefer a range
            // between 0 and 360
            return (angle > 0) ? 360 - angle : Math.abs(angle);
        },

        setAngle: function(angle) {
            this.angle = angle;
            this.entity.rotation(this.angle);
        },

        setPower: function(power) {
            this.power = power;
        },

        fire: function() {
            this.entity.applyImpulse(this.power, this.angle);
            $(window).trigger('player.fired');
            this.reset();
        },

        reset: function() {
            this.power = 0;
            this.angle = 0;
        }
    };
});
