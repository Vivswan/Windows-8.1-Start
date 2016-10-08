'use strict';

parallel.pt.extend({
    stopedPropagation: false,
    defaultPrevented: false,
    preventDefault: function () {
        this.defaultPrevented = true;
        return this;
    },
    notPreventDefault: function () {
        this.defaultPrevented = false;
        return this;
    },
    stopPropagation: function () {
        this.stopedPropagation = true;
        return this;
    },
    startPropagation: function () {
        this.stopedPropagation = false;
        return this;
    },
    addEvent: function (type, func, useCapture) {
        var nfunc = new Object({
            This: this,
            type: type,
            func: func,
            useCapture: useCapture,
            stopedPropagation: this.stopedPropagation,
            defaultPrevented: this.defaultPrevented,
            handleEvent: function (e) {
                if (this.stopedPropagation) {
                    e.stopPropagation();
                }
                if (this.defaultPrevented) {
                    e.preventDefault();
                }
                if (this.func.handleEvent) {
                    this.func.handleEvent(e);
                } else {
                    this.func.call(e.currentTarget, e);
                }
            },
            removeEvent: function () {
                this.This.elements.forEach(function (i) {
                    if (parallel.isArray(type)) {
                        type.forEach(function (j) {
                            i.removeEventListener(j, this, !!useCapture);
                        }, this);
                    } else {
                        i.removeEventListener(type, this, !!useCapture);
                    }
                }, this);
            }
        });
        this.elements.forEach(function (i) {
            if (parallel.isArray(type)) {
                type.forEach(function (j) {
                    i.addEventListener(j, nfunc, !!useCapture);
                });
            } else {
                i.addEventListener(type, nfunc, !!useCapture);
            }
        });
        return nfunc;
    },
    addEventToElse: function (type, func) {
        var nfunc = new Object({
            This: this,
            handleEvent: function (e) {
                var a = e.target;
                var c = true;
                while ((a != document || a != window) && c && a) {
                    c = !this.This.has(a);
                    a = a.parentElement;
                }
                if (c){
                    func.call(this.This)
                }
            }
        });
        window.addEventListener(type, nfunc);
    }
});