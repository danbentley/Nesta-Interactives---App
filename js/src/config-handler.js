define(['jquery', 'src/app'], function($, app) {

    'use strict';

    return {

        $gravity: null,
        $playerDensity: null,
        $enemyBounciness: null,

        init: function() {
            this.$gravity = $('#gravity');
            this.$playerDensity = $('#player-density');
            this.$enemyBounciness = $('#enemy-bounciness');

            this.addListeners();
            this.updateDefaultValues();
        }, 

        updateDefaultValues: function() {

            var player = app.player;

            this.$gravity.val(app.environment.world.gravity.y);
            this.$playerDensity.val(app.environment.world.gravity.y);
            this.$enemyBounciness.val(player.entity.restitution() * 100);
        },

        addListeners: function() {
            this.$gravity.on('change', function(e) {
                app.environment.world.gravity($(this).val());
            });

            this.$playerDensity.on('change', function(e) {
                var density = parseInt($(this).val());
                app.player.entity._body.m_fixtureList.SetDensity(density);
                app.player.options.density = density;
                app.player.entity._body.ResetMassData()
            });

            this.$enemyBounciness.on('change', function(e) {
                var value = parseInt($(this).val()) / 100;
                $.each(app.environment.characters, function(index, enemy) { 
                    enemy.entity.restitution(value);
                });
            });
        }
    }
});
