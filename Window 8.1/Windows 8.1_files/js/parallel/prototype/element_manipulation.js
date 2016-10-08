'use strict';

parallel.pt.extend({
    push: function (selector) {
        if (parallel.isElement(selector)) {
            this.elements.add(selector);
        } else if (parallel.isArray(selector)) {
            selector.forEach(function (i) {
                this.elements.add(i);
            }, this);
        } else if (parallel.isString(selector)) {
            parallel.find(selector).forEach(function (i) {
                this.elements.add(i);
            }, this);
        }
        return this;
    },
    add: function (selector) {
        return this.push(selector);
    },
    has: function (ele) {
        return this.elements.has(ele);
    },
    "delete": function (selector) {
        if (parallel.isArray(selector)) {
            selector.forEach(function (i) {
                this.elements["delete"](i);
            }, this);
        } else if (parallel.isString(selector)) {
            parallel.find(selector, this.toArray()).forEach(function (i) {
                this.elements["delete"](i);
            }, this);
        } else if (parallel.isElement(selector)) {
            this.elements["delete"](selector);
        }
        return this;
    },
    filter: function (selector) {
        var arr = this.toArray();
        this.elements = new Set;
        parallel.find(selector, arr).forEach(function (i) {
            this.elements.add(i);
        }, this);
        return this;
    },
    first: function () {
        return this.elements.size != 0 ? this.elements.entries().next().value[0] : null;
    },
    forEach: function (func, This) {
        if (This) {
            this.elements.forEach(func, This);
        } else {
            this.elements.forEach(func, this);
        }
        return this;
    },
    toArray: function () {
        var array = [];
        this.elements.forEach(function (i) {
            array.push(i);
        });
        return array;
    },
    length: function () {
        return this.elements.size;
    }
});