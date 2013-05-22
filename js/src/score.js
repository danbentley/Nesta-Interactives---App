define(['jquery', 'lib/array.shuffle'], function() {

    return {

        score: 0,
        $finalScore: $('.final-score'),
        $appContainer: $('#app'),
        SCORE_COLOUR_CLASSES: ['red', 'green', 'blue', 'orange'],
        onComplete: null,

        init: function(options) {
            this.addListeners();
        },

        addListeners: function() {
            $(window).on('game.over', $.proxy(function(e, score) {
                this.$appContainer.addClass('complete');
                this.score = score;
                this.updateFinalScore();

                // Replace with call to onComplete
                // clearInterval(this.drawIntervalId);
            }, this));

            $('#play-again').on('click', $.proxy(function() {
                this.$appContainer.removeClass('complete');
                $(window).trigger('game.restart');
            }, this));
        },

        updateFinalScore: function() {
            var score = this.score + '';
            var scorePieces = score.split("");
            var markup = '';

            var colours = this.SCORE_COLOUR_CLASSES.shuffle();

            var scorePiecesLength = scorePieces.length;
            for (var i=0; i < scorePiecesLength; i++) {
                var scorePart = scorePieces[i];
                var colour = (i < colours.length) ? colours[i] : colours[i % colours.length];
                markup += '<span class="number no-' + scorePart + ' ' + colour + '"></span>';
            }

            this.$finalScore.html(markup);
        }
    }
});
