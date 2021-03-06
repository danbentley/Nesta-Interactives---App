define(['src/environment', 'src/player', 'src/score'], function(environment, player, score) {

    return {

        offsetStart: null,
        offsetEnd: null,
        power: 0,
        shotCount: 0,
        clicked: false,
        environment: null,
        player: null,
        panIntervalId: null,
        MAX_SCALE: 30,
        PAN_START_POSITION: {
            x: 55,
            y: 0,
        },
        PAN_END_POSITION: {
            x: -14,
            y: 0,
        },
        PAN_INTERVAL: 1,
        PAN_SPEED: 0.15,
        CAMERA_FOLLOW_PLAYER_INTERVAL: 1,
        cameraFollowPlayerIntervalId:null,
        CAMERA_OFFSET: {
            x: -10,
        },
        $stats: $('#stats'),

        init: function() {

            score.init();

            this.$stats.show();
            this.environment = environment;
            this.environment.init();

            this.player = player;
            this.player.init({ 
                world: this.environment.world
            });

            this.addListeners();
            this.startPan();
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
                    this.makeCameraFollowPlayer();
                }
            }, this));

            $(window).on('characters.destroyed', $.proxy(function() {
                $(window).trigger('game.over', [this.shotCount]);
                this.$stats.hide();
            }, this));
        },

        updateStats: function() {
            this.$stats.find('.angle').html(Math.round(this.player.angle));
            this.$stats.find('.power').html(this.player.power + '/' + this.player.MAX_POWER);
            this.$stats.find('.shot-count').html(this.shotCount);
        },

        startPan: function() {
            this.environment.world.camera(this.PAN_START_POSITION);
            this.panIntervalId = setInterval($.proxy(function() {
                var cameraPosition = this.environment.world.camera();
                cameraPosition.x -= this.PAN_SPEED;
                this.environment.world.camera(cameraPosition);
                if (cameraPosition.x <= this.PAN_END_POSITION.x) {
                    clearInterval(this.panIntervalId);
                    $(window).trigger('world.ready');
                }
            }, this), this.PAN_INTERVAL);
        },
        
        makeCameraFollowPlayer: function() {
            // Follow make the camera follow the player.
            clearInterval(this.cameraFollowPlayerIntervalId);
            this.cameraFollowPlayerIntervalId = setInterval($.proxy(function() {
                var position = this.player.entity.position();
                position.y = 0;
                position.x += this.CAMERA_OFFSET.x;
                this.environment.world.camera(position);
            }, this), this.CAMERA_FOLLOW_PLAYER_INTERVAL);
        },

        getDragDistance: function() {
            return Math.abs(this.offsetStart.x - this.offsetEnd.x);
        }
    };
});
