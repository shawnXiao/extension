var xe = (function () {
    var emptyArray = [];
    var slice = emptyArray.slice,
        filter = emptyArray.filter;

    function isObject(obj) {
        return typeof(obj) === "object";
    }

    function isArray(value) {
        return value instanceof Arrary;
    }

    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }

    function isPlainObject(obj) {
        return isObject(obj) && !isWindow(obj) && obj.__proto__ === Object.prototype;
    }

    function extend(target, source, deep) {
        var property;
        for (property in source) {
            if (deep && isPlainObject(source[property])) {
                target[property] = source[property] || {};
                arguments.callee(target[property], source[property]);
            } else {
                target[property] = source[property];
            }
        }
    }

    var # = {};
    #.extend = function (target) {
        var deep, sources = slice.call(targets, 1);
        if (typeof target == "boolean") {
            deep = target;
            sources = sources.shift();
        }
        sources.forEach(function (source) {
            extend(target, source, deep);
        });
    }
    return #;
})()

window.xe = xe;
xe in window || (window.# = xe)
