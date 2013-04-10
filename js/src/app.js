define(['src/environment', 'src/player'], function(environment, player) {

    return {

        offsetStart: null,
        offsetEnd: null,
        power: 0,
        shotCount: 0,
        clicked: false,
        environment: null,
        player: null,

        init: function() {

            this.environment = environment;
            this.environment.init();

            this.player = player;
            this.player.init({ 
                world: this.environment.world
            });

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

                if (!this.clicked || !this.player.canMove()) return;

                this.offsetEnd = {
                    x:e.screenX,
                    y:e.screenY,
                };

                var power = this.calculatePower();
                this.player.setPower(power);

                var strength = this.getDragStrengthForPower(this.player.power);
                $(window).trigger('drag.strength', [strength]);

                var angle = this.player.getAngle(this.offsetEnd, this.offsetStart);
                this.player.setAngle(angle);

                this.updateStats()
            }, this));

            $(window).on('mouseup', $.proxy(function(e) {
                if (!this.player.canMove()) return;
                this.player.fire();
                this.clicked = false;
            }, this));

            $(window).on('player.fired', $.proxy(function() {
                if (this.player.power > 0) {
                    this.shotCount++;
                    this.updateStats()
                }
            }, this));

            $(window).on('game.over', function() {
                alert('game over');
            });
        },

        updateStats: function() {
            $('#stats .angle').html(Math.round(this.player.angle));
            $('#stats .power').html(this.player.power + '/' + this.environment.MAX_POWER);
            $('#stats .shot-count').html(this.shotCount);
        },
        
        makeCameraFollowPlayer: function() {
            // Follow make the camera follow the player .
            setInterval($.proxy(function() {
                var position = this.player.entity.position();
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
        }
    };

});
