var xe = (function () {
    var emptyArray = [];
    var slice = emptyArray.slice,
        toString = Object.property.toString,
        filter = emptyArray.filter;

    function isObject(obj) {
        return typeof obj == "object";
    }

    function isString(value) {
        return typeof value == 'string';
    }

    function isArray(value) {
        return value instanceof Arrary;
    }

    // isArrayLike used judge whether the obj can use for in
    function isArrayLike(obj) {
        if (!obj || (typeof obj.length !== 'number')) {
            return false;
        }
        // function also has length property
        if (typeof obj.hasOwnProperty != 'function' &&
            typeof obj.constructor != 'function') {
            return true;
        } else {
            return toString.call() !== '[object Object]' ||
                typeof obj.callee === 'function';
        }
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

    var _ = {};
    _.extend = function (target) {
        var deep, sources = slice.call(arguments, 1);
        if (typeof target == "boolean") {
            deep = target;
            sources = sources.shift();
        }
        sources.forEach(function (source) {
            extend(target, source, deep);
        });
        return target;
    }

    _.isFunction = function (functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    _.forEach = function (obj, iterator, context) {
        var key;
        if (obj) {
            if (_.isFunction(obj)) {
                for (key in obj) {
                    if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key);
                    }
                }
            } else if (obj.forEach && obj.forEach !== _.forEach) {
                iterator.call(context, obj[key], key);
            } else if (isArrayLike(obj)) {
                for (key = 0; key < obj.length; key++) {
                    iterator.call(context, obj[key], key);
                }
            } else {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key);
                    }
                }
            }
        }
        return obj;
    }
    return _;
})()

window.xe = xe;
xe in window || (window._ = xe)
