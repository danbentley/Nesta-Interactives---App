define(['src/environment'], function(environment) {

    return {

        offsetStart: null,
        offsetEnd: null,
        angle: 0,
        power: 0,
        shotCount: 0,
        clicked: false,
        environment: null,

        init: function() {
            this.environment = environment;
            this.environment.init();
            this.addListeners();
            this.makeCameraFollowPlayer();
        },

        addListeners: function() {

            $(window).on('mousedown', $.proxy(function(e) {
                this.offsetStart = {
                    x:e.screenX,
                    y:e.screenY
                };
                this.clicked = true;
            }, this));

            $(window).on('mousemove', $.proxy(function(e) {

                if (!this.clicked || !this.canMovePlayer()) return;

                this.offsetEnd = {
                    x:e.screenX,
                    y:e.screenY,
                };


                this.power = this.calculatePower();

                var strength = this.getDragStrengthForPower(this.power);
                $(window).trigger('drag.strength', [strength]);

                this.angle = this.getAngle(this.offsetEnd, this.offsetStart);

                this.environment.player.rotation(this.angle);

                this.updateStats()
            }, this));

            $(window).on('mouseup', $.proxy(function(e) {
                if (!this.canMovePlayer()) return;
                this.environment.player.applyImpulse(this.power, this.angle);
                if (this.power > 0) {
                    this.shotCount++;
                    this.updateStats()
                }
                this.clicked = false;
                this.power = 0;
                this.angle = 0;
            }, this));

            $(window).on('game.over', function() {
                alert('game over');
            });
        },

        getAngle: function(startPosition, endPosition) {
            var angle = Math.atan2(startPosition.x - endPosition.x, startPosition.y - endPosition.y) * (180 / Math.PI);	

            // To atan2 returns a range of -180 to 180 which is perfect
            // for CSS3 rotation but not here where we'd prefer a range
            // between 0 and 360
            return (angle > 0) ? 360 - angle : Math.abs(angle);
        },

        updateStats: function() {
            $('#stats .angle').html(Math.round(this.angle));
            $('#stats .power').html(this.power + '/' + this.environment.MAX_POWER);
            $('#stats .shot-count').html(this.shotCount);
        },
        
        makeCameraFollowPlayer: function() {
            // Follow make the camera follow the player .
            setInterval($.proxy(function() {
                var position = this.environment.player.position();
                position.y = 0;
                position.x -= 10;
                this.environment.world.camera(position);
            }, this), 1);
        },

        getDragStrengthForPower: function(power) {
            var strength = 'weak';
            if (power > this.environment.MAX_POWER / 3 && power < this.environment.MAX_POWER / 2) {
                strength = 'medium';
            } else if (power > this.environment.MAX_POWER / 2 && power < this.environment.MAX_POWER) {
                strength = 'strong';
            } else if (power === this.environment.MAX_POWER) {
                strength = 'max';
            }

            return strength;
        },

        calculatePower: function() {
            var dragDistance = Math.abs(this.offsetStart.x - this.offsetEnd.x);
            return Math.min(dragDistance, this.environment.MAX_POWER);
        },
         
        canMovePlayer: function() {
            var velocity = this.environment.player._body.GetLinearVelocity();
            return (Math.round(velocity.x) < 2 && Math.round(velocity.y) < 2);
        }
    };

});
