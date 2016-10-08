'use strict';

parallel.pt.extend({
    html: function (str) {
        this.elements.forEach(function (i) {
            i.innerHTML = str;
        });
        return this;
    },
    appendhtml: function (str) {
        this.elements.forEach(function (i) {
            i.innerHTML += str;
        });
        return this;
    },
    prependhtml: function (str) {
        this.elements.forEach(function (i) {
            i.innerHTML = str + i.innerHTML;
        });
        return this;
    },

    text: function (str) {
        this.elements.forEach(function (i) {
            i.innerText = str;
        });
        return this;
    },
    appendtext: function (str) {
        this.elements.forEach(function (i) {
            i.innerText += str;
        });
        return this
    },
    prependtext: function (str) {
        this.elements.forEach(function (i) {
            i.innerText = str + i.innerText;
        });
        return this;
    },

    empty: function () {
        this.elements.forEach(function (i) {
            i.innerHTML = "";
        });
        return this;
    },
    remove: function () {
        this.elements.forEach(function (i) {
            i.parentElement.removeChild(i);
        });
        this.elements.clear();
        return this;
    }
});