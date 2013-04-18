define(['boxbox'], function() {

    function Character(options) {

        this.characterTemplate = {
            name: 'character',
            shape: 'square'
        };

        // Whether this enemy is one of:
        // ['', 'dead', 'dying']
        this.status = '';

        // The minimum amount of force required to destroy
        // this enemy
        this.minForce = 5;

        // An entity is inactive until the world is created.
        // Inactive enemies cannot be destroyed on impact
        this.active = false;

        this.world = options.world;
        options.onImpact = $.proxy(function(entity, force) {
            this.onImpact(entity, force)
        }, this);
        this.entity = this.createCharacter(options);

        this.addListeners();
    }

    Character.prototype.addListeners = function(options) {
        $(window).on('world.ready', $.proxy(function() {
            this.active = true;
        }, this));
    }; 

    Character.prototype.createCharacter = function(options) {
        return this.world.createEntity(this.characterTemplate, options);
    }; 

    Character.prototype.onImpact = function(entity, force) {
        if (!this.active || !this.isForceStrongEnough(force)) return;
        this.destroy();
    };

    Character.prototype.isForceStrongEnough = function(force) {
        return (force > this.minForce);
    };

    Character.prototype.destroy = function() {
        this.status = 'dying';
        this.updateImage();
        this.startDestroyDelay();
    };

    Character.prototype.updateImage = function() {
        var img = this.entity.image();
        if (img.match(new RegExp('dead'))) return;
        if (!img.match(new RegExp(this.status))) {
            this.entity.image(img.replace(/(-dying|-dead)?.png/, '-' + this.status + '.png'));
        }
    };

    Character.prototype.startDestroyDelay = function() {
        var DESTROY_DELAY = 1000;
        setTimeout($.proxy(function() {
            this.status = 'dead';
            this.updateImage();
            // Set delay before we remove this enemy from the map
            setTimeout($.proxy(function() {
                this.entity.destroy();
            }, this), DESTROY_DELAY);
            $(window).trigger('character.destroyed', [this]);
        }, this), DESTROY_DELAY);
    };

    return Character;
});
