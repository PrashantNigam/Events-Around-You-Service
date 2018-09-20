/** Common Utility Methods */
var methods = {

    /** Custom validator to validation classification schema
     * TODO: replace with a 3rd party library implementation like AJV
     */
    validateClassifications: function (classifications) {

        var stringConstructor = "".constructor;
        var arrayConstructor = [].constructor;
        var objectConstructor = {}.constructor;
        if ((classifications === null) || 
            (classifications.constructor !== arrayConstructor)) {
            throw "Invalid JSON 1";
        }
        for (var classification of classifications) {
            if (!classification.name || 
                (classification.constructor !== objectConstructor) || 
                (classification.name.constructor !== stringConstructor)) {
                throw "Invalid JSON 2";
            }                  
            if ((classification.genres === null) || 
                (classification.genres.constructor !== arrayConstructor)) {
                throw "Invalid JSON 3";
            }
            for (var genre of classification.genres) {
                if (genre.constructor !== objectConstructor) {
                    throw "Invalid JSON 4";
                }
                if (!genre.genreId ||
                    genre.genreId.constructor !== stringConstructor) {
                    throw "Invalid JSON";
                }
            }
        }
    }
}

exports.data = methods;