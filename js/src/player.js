define(['boxbox'], function() {

    return {

        MAX_POWER: 400,

        world: null,

        entity: null,

        angle: 0,

        power: 0,

        updateInterval: null,

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

        init: function(options) {

            this.startUpdateInterval();

            this.world = options.world;
            this.entity = this.createPlayer(options);
        },

        startUpdateInterval: function() {
            this.updateInterval = setInterval($.proxy(function() {
                this.updateImage();
            }, this), 100);
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

        calculatePowerFromDrag: function(dragDistance) {
            return Math.min(dragDistance, this.MAX_POWER);
        },

        getDragStrengthForPower: function(power) {
            var strength = 'weak';
            if (power > this.MAX_POWER / 3 && power < this.MAX_POWER / 2) {
                strength = 'medium';
            } else if (power > this.MAX_POWER / 2 && power < this.MAX_POWER) {
                strength = 'strong';
            } else if (power === this.MAX_POWER) {
                strength = 'max';
            }

            return strength;
        },

        fire: function() {
            this.entity.applyImpulse(this.power, this.angle);
            $(window).trigger('player.fired');
            this.reset();
        },

        reset: function() {
            this.power = 0;
            this.angle = 0;
        },

        updateImage: function() {
            var strength = this.getDragStrengthForPower(this.power);
            this.updateImageWithStrength(strength);
        },

        updateImageWithStrength: function(strength) {
            this.entity.image('img/player-' + strength + '.png');
        }
    };
});
