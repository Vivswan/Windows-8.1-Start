'use strict';

parallel.pt.extend({
    getAttribute: function (aName) {
        return this.first().getAttribute(aName);
    },
    setAttribute: function (aName, aValue) {
        this.elements.forEach(function (i) {
            if (parallel.isObject(aName)) {
                Object.getOwnPropertyNames(i).forEach(function (j) {
                    i.removeAttribute(j);
                    i.setAttribute(j, i[j]);
                });
            } else {
                i.removeAttribute(aName);
                i.setAttribute(aName, aValue);
            }
        });
        return this;
    },
    hasAttribute: function (aName) {
        var c = true;
        this.elements.forEach(function (i) {
            if (!i.hasAttribute(aName)) {
                c = false;
            }
        });
        return c;
    },
    deleteAttribute: function (aName) {
        this.elements.forEach(function (i) {
            if (parallel.isArray(aName)) {
                i.forEach(function (j) {
                    i.removeAttribute(j);
                });
            } else {
                i.removeAttribute(aName);
            }
        });
        return this;
    }
});