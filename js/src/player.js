define(['boxbox'], function() {

    return {

        MAX_POWER: 500,

        world: null,

        entity: null,

        angle: 0,

        power: 0,

        updateInterval: null,

        monitorInterval: null,

        options: [],

        /**
         * This player may still be moving but really, really slowly. 
         * This margin is uses to determine whether the player is as good as stopped.
         */
        STOP_MARGIN: 0.03,

        allowInput: false,

        template: {
            name: 'player',
            shape: 'circle',
            image: 'img/player/player-0.png',
            maxVelocityX: this.MAX_POWER,
            maxVelocityY: this.MAX_POWER,
            radius: 0.88,
            imageOffsetX: -0.4,
            imageOffsetY: -0.43,
            density: 6,
            x: -6,
            y: 2
        },

        init: function(options) {

            this.options = options;

            this.startUpdateInterval();
            this.allowInput = true;

            this.world = options.world;
            this.entity = this.createPlayer(this.options);
        },

        startUpdateInterval: function() {
            clearInterval(this.updateInterval);
            this.updateInterval = setInterval($.proxy(function() {
                this.updateImage();
            }, this), 100);
        },

        startMonitorInterval: function() {
            this.stopMonitorInterval();
            // How many times we check whether the player is moving before
            // we quit and remove player from field. This value acts as
            // a timeout
            var checks = 50;
            this.monitorInterval = setInterval($.proxy(function() {
                if (this.isStopped() && !this.allowInput || checks === 0) {
                    this.restart();
                    clearInterval(this.monitorInterval);
                }
                checks--;
            }, this), 100);
        },

        stopMonitorInterval: function() {
            clearInterval(this.monitorInterval);
        },

        createPlayer: function(options) {
            return this.world.createEntity(this.template, options);
        },
         
        canMove: function() {
            return (this.allowInput && this.isStopped());
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
            return Math.floor(power / 50);
        },

        fire: function() {
            this.entity.applyImpulse(this.power, this.angle);
            $(window).trigger('player.fired');
            this.reset();
            this.allowInput = false;
            this.startMonitorInterval();
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
            this.entity.image('img/player/player-' + strength + '.png');
        },

        isStopped: function() {
            var velocity = this.entity._body.GetLinearVelocity();
            return ((velocity.x < this.STOP_MARGIN && velocity.x > this.STOP_MARGIN * -1) 
                    && (velocity.y < this.STOP_MARGIN && velocity.y > this.STOP_MARGIN * -1));
        },

        restart: function() {
            setTimeout($.proxy(function() {
                this.stopMonitorInterval();
                this.destroy();
                this.entity = this.createPlayer(this.options);
                this.allowInput = true;
            }, this), 1000);
        },

        destroy: function() {
            this.allowInput = false;
            this.reset();
            this.entity.destroy();
        }
    };
});
