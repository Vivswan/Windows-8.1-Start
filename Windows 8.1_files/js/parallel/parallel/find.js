'use strict';

parallel.extend({
    find: function (selector, inElements) {
        var result = [];
        if (inElements) {
            parallel.toArray(document.querySelectorAll(selector)).forEach(function (i) {
                if (parallel.toArray(inElements).indexOf(i) != -1) {
                    result[result.length] = i;
                }
            });
        } else {
            result = parallel(document.querySelectorAll(selector)).toArray();
        }
        return result;
    }
});