'use strict';

parallel.extend({
    isNumber: function (obj) {
        return typeof obj === "number";
    },
    isString: function (obj) {
        return typeof obj === "string";
    },
    isBoolean: function (obj) {
        return typeof obj === "boolean";
    },
    isArray: Array.isArray || function (obj) {
        return typeof obj === "object" && obj.length;
    },
    isLikeArray: function (obj) {
        var length = obj.length,
            type = typeof obj;
        if (obj == window)
            return false;
        if (obj.nodeType === 1 && length)
            return true;
        return type === "array" || type !== "function" && (length === 0 || typeof length === "number" && length > 0 && length - 1 in obj);
    },
    isObject: function (obj) {
        return obj ? typeof obj === "object" && !parallel.isArray(obj) : false;
    },
    isFunction: function (obj) {
        return typeof obj === "function";
    },
    isElement: function (obj) {
        return parallel.isObject(obj) ? obj.tagName ? true : false : false;
    },
    toArray: function (obj) {
        var r = [];
        for (var i = 0; i < obj.length; i++){
            r[i] = obj[i];
        }
        return r;
    }
});