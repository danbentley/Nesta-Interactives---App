define([], function() {

    return {

        preload: function(imageURLs) {
            for (var i=0; i < imageURLs.length; i++) {
                var url = imageURLs[i];

                var img = new Image();
                img.src = url;
            };
        }
    }
});
