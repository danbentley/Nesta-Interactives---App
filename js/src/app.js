define(['src/environment', 'src/player'], function(environment, player) {

    return {

        offsetStart: null,
        offsetEnd: null,
        power: 0,
        shotCount: 0,
        clicked: false,
        environment: null,
        player: null,
        zoomInterval: null,
        MAX_SCALE: 30,

        init: function() {

            this.environment = environment;
            this.environment.init();

            this.player = player;
            this.player.init({ 
                world: this.environment.world
            });

            this.addListeners();
            this.startZoom();
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

                this.dragDistance = this.getDragDistance();
                var power = this.player.calculatePowerFromDrag(this.dragDistance);
                this.player.setPower(power);

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
               console.log('game over');
            });
        },

        updateStats: function() {
            $('#stats .angle').html(Math.round(this.player.angle));
            $('#stats .power').html(this.player.power + '/' + this.player.MAX_POWER);
            $('#stats .shot-count').html(this.shotCount);
        },

        startZoom: function() {
            // Follow make the camera follow the player .
            this.zoomInterval = setInterval($.proxy(function() {
                var newScale = this.environment.world.scale() + 0.05;
                this.environment.world.scale(newScale);
                if (newScale > this.MAX_SCALE) {
                    clearInterval(this.zoomInterval);
                    $(window).trigger('world.ready');
                }
            }, this), 1);
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

        getDragDistance: function() {
            return Math.abs(this.offsetStart.x - this.offsetEnd.x);
        }
    };
});
