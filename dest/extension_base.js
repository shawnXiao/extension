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
    return _;
})()

window.xe = xe;
xe in window || (window._ = xe)

/*
 *nstructor(optional XMLHttpRequestOptions options)]
 *interface XMLHttpRequest : XMLHttpRequestEventTarget {
 *  // event handler
 *  attribute EventHandler onreadystatechange;
 *
 ;*  // states
 *  const unsigned short UNSENT = 0;
 *  const unsigned short OPENED = 1;
 *  const unsigned short HEADERS_RECEIVED = 2;
 *  const unsigned short LOADING = 3;
 *  const unsigned short DONE = 4;
 *  readonly attribute unsigned short readyState;
 *
 *  // request
 *  void open(ByteString method, DOMString url, optional boolean async = true, optional DOMString? user = null, optional DOMString? password = null);
 *  void setRequestHeader(ByteString header, ByteString value);
 *           attribute unsigned long timeout;
 *           attribute boolean withCredentials;
 *  readonly attribute XMLHttpRequestUpload upload;
 *  void send(optional (ArrayBufferView or Blob or Document or DOMString or FormData)? data = null);
 *  void abort();
 *
 *  // response
 *  readonly attribute unsigned short status;
 *  readonly attribute ByteString statusText;
 *  ByteString? getResponseHeader(ByteString header);
 *  ByteString getAllResponseHeaders();
 *  void overrideMimeType(DOMString mime);
 *           attribute XMLHttpRequestResponseType responseType;
 *  readonly attribute any response;
 *  readonly attribute DOMString responseText;
 *  readonly attribute Document? responseXML;
 *};
 */
/*
 *With changes to the XMLHttpRequest specification and improved browser support, you can now:
 *  Set request timeouts
 *  Better manage data with FormData objects
 *  Transfer binary data
 *  Monitor the progress of data transfers
 *  Make safer cross-origin requests
 *  Override the media type and encoding of responses.
 */

;(function (_) {
    _.active = 0;
    // the default settings of ajax
    _.ajaxSettings = {
        type: "GET",
        context: null,
        timeout: 3000,
        isAsynic: true,
        xhr: function () {
            return new XMLHttpRequest;
        }
    };
    _.ajax = function (options) {
        var configs = _.extend({}, options || {});
        var key;
        for (key in _.ajaxSettings) {
            if (!!!configs[key]) {
                configs[key] = _.ajaxSettings[key];
            }
        }
        var xhr = configs.xhr();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    configs.success.call(configs.context, xhr.response)
                }
            }
        }

        /*
         *XMLHttpRequest now provides progress event attributes that allow us to monitor data transfers.
         *Previously, we would listen to the readystatechange event, as in the example below:
         */
        /*
         *client. upload
         *    Returns the associated XMLHttpRequestUpload object.
         *    It can be used to gather transmission information when data is transferred to a server.
         */
        if (configs.upload) {
            var uploadHandler;
            for (uploadHandler in configs.upload) {
                //addEventListener() registers the specified listener on the EventTarget it's called on.
                //The event target may be an Element in a document,
                //the Document itself, a Window, or any other object that supports events (such as XMLHttpRequest).
                xhr.upload.addEventListener(uploadHandler, configs.upload[uploadHandler], false);
            }
        }

        //Progress events exist for both download and upload transfers.
        //The download events are fired on the XMLHttpRequest object itself,
        //as shown in the above sample. The upload events are fired on the XMLHttpRequest.upload object
        if (configs.download) {
            var downloadHandler;
            for (downloadHandler in configs.download) {
                xhr.addEventListener(downloadHandler, configs.download[downloadHandler], false);
            }
        }

        xhr.open(configs.type, configs.url, configs.isAsynic);

        //XHR now provides a way for handling this problem:
        //request timeouts. Using the timeout attribute,
        //we can specify how many milliseconds to wait before the application does something else.
        //In the example that follows, we've set a three second (3000 millisecond) timeout:

        xhr.timeout = configs.timeout;

        /*
         *Enforceing a response MIME type
         *  MIME-type mismatches are pretty common on the web.
         *  Sometimes XML data will have a Content-type: text/html response header,
         *  which will cause the value of xhr.responseXML to be null.
         *  To ensure that the browser handles such responses in the way we’d like, we can use the overrideMimeType() method.
         */
        if (configs.responseType) {
            xhr.responseType = configs.responseType;
        }

        /*
         *Now, we can use the FormData object, and its ordered, key-value pairs. The syntax offers three benefits:
         *    Scripts are more readable
         *    Data is sent in key-value pairs, as with regular HTML forms
         *    FormData objects are sent with multipart/form-data encoding, making it possible to use XHR for sending binary data.
         */
        //FormData objects provide a way to easily construct a set of key/value pairs representing form fields and their values,
        //which can then be easily sent using the XMLHttpRequest send() method
        if (configs.type === "POST" && configs.dataToSend) {
            var dataToSend = new FormData();
            var dataProperty;
            for(dataProperty in configs.dataToSend) {
                dataToSend.append(dataProperty, configs.dataToSend[dataProperty]);
            }
            xhr.send(dataToSend);
        } else {
            xhr.send();
        }
    }
}(xe))

;(function (_) {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    _.fs = null;
    function errorHandler(e) {
      var msg = '';
      switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
          msg = 'QUOTA_EXCEEDED_ERR';
          break;
        case FileError.NOT_FOUND_ERR:
          msg = 'NOT_FOUND_ERR';
          break;
        case FileError.SECURITY_ERR:
          msg = 'SECURITY_ERR';
          break;
        case FileError.INVALID_MODIFICATION_ERR:
          msg = 'INVALID_MODIFICATION_ERR';
          break;
        case FileError.INVALID_STATE_ERR:
          msg = 'INVALID_STATE_ERR';
          break;
        default:
          msg = 'Unknown Error';
          break;
      };
      console.log('Error: ' + msg);
    }
     function initFS() {
        //It's important to remember that this file system is sandboxed,
        //meaning one web app cannot access another app's files.
        //This also means you cannot read/write files to an arbitrary
        //folder on the user's hard drive (for example My Pictures, My Documents, etc.).
         window.requestFileSystem(window.TEMPORARY, 1024*1024, function(filesystem) {
            fs = filesystem;
         }, errorHandler);

    }

    if (window.requestFileSystem) {
      initFS();
    }
}(xe))

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

;(function (_) {
    var emptyArray = [];
    var slice = emptyArray.slice;
    _.log = function () {
        var arrayLikeArgs = slice.call(arguments, 0);
        console.log.apply(console, arrayLikeArgs);
    }
    var method;
    for (method in console) {
        if (_.isFunction(console[method])) {
            _.log(method);
            _.log["log_" + method] = console[method];
            _.log["log_" + method].bind(console);
        }
    }
}(xe))
