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
                offsetStart = {
                    x:e.offsetX,
                    y:e.offsetY
                };
                this.clicked = true;
            }, this));

            $(window).on('mousemove', $.proxy(function(e) {

                if (!this.clicked) return;

                offsetEnd = {
                    x:e.offsetX,
                    y:e.offsetY,
                };
                var dragDistance = offsetStart.x - offsetEnd.x;
                this.speed = Math.abs(Math.min(dragDistance, this.environment.MAX_SPEED));
                this.angle = this.getAngle(offsetEnd, offsetStart);

                this.environment.player.rotation(this.angle);

                this.updateStats()
            }, this));

            $(window).on('mouseup', $.proxy(function(e) {
                this.environment.player.applyImpulse(this.speed, this.angle);
                this.clicked = false;
            }, this));
        },

        getAngle: function(startPosition, endPosition) {
            var calcAngle = Math.atan2(startPosition.x - endPosition.x, startPosition.y - endPosition.y) * (180 / Math.PI);	
            // To atan2 returns a range of -180 to 180 which is perfect
            // for CSS3 rotation but not here where we'd prefer a range
            // between 0 and 360
            if(calcAngle < 0) {
                calcAngle = Math.abs(calcAngle);
            } else {
                calcAngle = 360 - calcAngle;		
            }
            return calcAngle;
        },

        updateStats: function() {
            $('#stats .angle').html(Math.round(this.angle));
            $('#stats .speed').html(this.speed + '/400');
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
