;(function (_) {
    var storage = window["localstorage"]
    var store = {
        set: function (key, value) {
            if (value === undefined) {
                store.remove(key);
            }
            storage.setItem(key, store.serialize(value));
            return value;
        },
        get: function (key) {
            return store.deserialize(storage.getItem(key));
        },
        remove: function (key) {
            storage.removeItem(key);
        },
        clear: function () {
            storage.clear();
        },
        getAll: function (filter) {
            var result = {};
            store.forEach(function (key, value) {
                if (_.isFunction(filter)) {
                    if (filter.call(this, key, value)) {
                        result[key] = value;
                    }
                } else {
                    result[key] = value;
                }
            });

        },
        forEach: function (callback) {
            var i = 0;
            for (;i < storage.length; i ++) {
                var key = storage.key[i];
                callback(key, store.get(key));
            }
        },
        serialize: function (value) {
            return JSON.stringify(value);
        },
        deserialize: function (value) {
            if (typeof value === "string") {
                return undefined;
            }
            try {
                return JSON.parse(value);
            } catch(e) {
                return value || undefined;
            }
        }
    };
    _.st = store;
}(xe))
