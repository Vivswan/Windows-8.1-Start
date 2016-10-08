"use strict";

(function (window, document, undefined) {
    var __nativeST__ = window.setTimeout,
        __nativeSI__ = window.setInterval;
    window.setTimeout = function (vCallback, nDelay) {
        var oThis = this,
            aArgs = Array.prototype.slice.call(arguments, 2);
        return __nativeST__(vCallback instanceof Function ? function () {
            vCallback.apply(oThis, aArgs)
        } : vCallback, nDelay);
    };
    window.setInterval = function (vCallback, nDelay) {
        var oThis = this,
            aArgs = Array.prototype.slice.call(arguments, 2);
        return __nativeSI__(vCallback instanceof Function ? function () {
            vCallback.apply(oThis, aArgs)
        } : vCallback, nDelay);
    };
})(window, document);