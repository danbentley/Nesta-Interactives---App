define(['boxbox'], function() {

    var entity = null,

        world = null,

        characterTemplate = {
            name: 'character',
            shape: 'square'
        };

    function Character(options) {
        this.world = options.world;
        options.onImpact = $.proxy(function(entity, force) {
            this.onImpact(entity, force)
        }, this);
        this.entity = this.createCharacter(options);
    }

    Character.prototype.createCharacter = function(options) {
        return this.world.createEntity(this.characterTemplate, options);
    }; 

    Character.prototype.onImpact = function(entity, force) {
        if (entity._name === 'ground') return;
        this.destroy();
    };

    Character.prototype.destroy = function() {
        this.updateImage();
        this.startDestroyDelay();
    };

    Character.prototype.updateImage = function() {
        var img = this.entity.image();
        if (!img.match(/dead/)) {
            this.entity.image(img.replace(/\.png/, '-dead.png'));
        }
    };

    Character.prototype.startDestroyDelay = function() {
        var DESTROY_DELAY = 2000;
        setTimeout($.proxy(function() {
            this.entity.destroy();
            $(window).trigger('character.destroyed', [this]);
        }, this), DESTROY_DELAY);
    };

    return Character;
});
