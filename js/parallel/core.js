'use strict';

(function (window, document, undefined) {
    var parallel = undefined,
        core_version = "1.0.3";
    parallel = function (selector) {
        if (this instanceof parallel) {
            this.init(selector);
            return this;
        } else {
            return new parallel(selector);
        }
    };

    parallel.pt = parallel.prototype = {
        version: core_version,
        constructor: parallel,
        elements: null,
        initialize: function (selector) {
            this.elements = new Set();
            if (selector) {
                if (parallel.isString(selector)) {
                    parallel.find(selector).forEach(function (i) {
                        this.elements.add(i);
                    }, this);
                } else if (parallel.isArray(selector) && parallel.isElement(selector[0])) {
                    selector.forEach(function (i) {
                        this.elements.add(i);
                    }, this);
                } else if (parallel.isElement(selector)) {
                    this.elements.add(selector);
                } else if (typeof selector.length !== "undefined") {
                    if (!isNaN(Number(selector.length))) {
                        for (var i = 0; i < selector.length; i++) {
                            this.elements.add(selector[i]);
                        }
                    }
                }
            }
            return this;
        }
    };

    parallel.extend = parallel.pt.extend = function (obj) {
        for (var i in obj){
            this[i] = obj[i];
        }
        return obj;
    };
    
    parallel.requireJS = function (src, thisSrc) {
        if (Array.isArray(src)) {
            for (var i = 0; i < src.length; i++){
                parallel.requireJS(src[i], thisSrc);
            }
        } else {
            var Ssrc = "";
            var script = document.createElement("script");
            if (thisSrc) {
                var a = src.split("/"), b = thisSrc.split("/");
                for (var i = 0; i < a.length; i++)
                    if (a[i] != ".") {
                        if (a[i] == "..") {
                            b.pop();
                        }
                    }else {
                        b.push(a[i]);
                    }
                Ssrc += b.join("/");
            } else {
                Ssrc = src;
            }
            Ssrc += ".js";
            script.src = Ssrc;
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    };
    
    parallel.pt.init = parallel.pt.initialize;
    parallel.pt.init.prototype = parallel.pt.initialize.prototype = parallel.prototype;
    window.parallelJS = window.parallelJs = window.paralleljs = window.parallel = parallel;
})(window, document);