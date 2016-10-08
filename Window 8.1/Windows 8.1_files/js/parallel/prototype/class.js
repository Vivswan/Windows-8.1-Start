'use strict';

parallel.pt.extend({
    addClass: function (cName) {
        this.elements.forEach(function (i) {
            i.className = i.className.replace(cName, "");
            i.className = i.className.trim();
            i.className += " " + cName;
        });
        return this;
    },
    hasClass: function (cName) {
        var c = true;
        this.elements.forEach(function (i) {
            if (i.className.indexOf(cName) == -1) c = false;
        });
        return c;
    },
    deleteClass: function (cName) {
        this.elements.forEach(function (i) {
            i.className = i.className.replace(cName, "");
            i.className = i.className.trim();
        });
        return this;
    }
});