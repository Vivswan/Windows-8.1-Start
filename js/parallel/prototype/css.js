'use strict';

parallel.pt.extend({
    css: function (name, value) {
        if (parallel.isString(name))
            this.elements.forEach(function (i) {
                i.style[name] = value;
            });
        else if (parallel.isObject(name))
            this.elements.forEach(function (i) {
                Object.getOwnPropertyNames(name).forEach(function (j) {
                    i.style[j] = name[j];
                })
            });
        return this;
    },
    height: function () {
        return this.first().clientHeight;
    },
    width: function () {
        return this.first().clientWidth;
    }
});