define(['src/environment'], function(environment) {

    return {

        offsetStart: null,
        offsetEnd: null,
        angle: null,
        speed: null,
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

                if (!this.clicked) return;

                this.offsetEnd = {
                    x:e.screenX,
                    y:e.screenY,
                };

                var dragDistance = Math.abs(this.offsetStart.x - this.offsetEnd.x);
                this.speed = Math.min(dragDistance, this.environment.MAX_SPEED);
                this.angle = this.getAngle(this.offsetEnd, this.offsetStart);

                this.environment.player.rotation(this.angle);

                this.updateStats()
            }, this));

            $(window).on('mouseup', $.proxy(function(e) {
                this.environment.player.applyImpulse(this.speed, this.angle);
                this.clicked = false;
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
            if(angle > 0) {
                angle = 360 - angle;		
            } else {
                angle = Math.abs(angle);
            }
            return angle;
        },

        updateStats: function() {
            $('#stats .angle').html(Math.round(this.angle));
            $('#stats .speed').html(this.speed + '/' + this.environment.MAX_SPEED);
        },
        
        makeCameraFollowPlayer: function() {
            // Follow make the camera follow the player .
            setInterval($.proxy(function() {
                var position = this.environment.player.position();
                position.y = 0;
                position.x -= 10;
                this.environment.world.camera(position);
            }, this), 1);
        }
    };

});
