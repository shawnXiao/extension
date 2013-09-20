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

(function (_) {
    _.active = 0;
    // the default settings of ajax
    var settings = {
        type: "GET",
        xhr: function () {
            return new XMLHttpRequest;
        }
    };
    _.ajax = function (options) {
        var configs = _.extend(settings, options)
        console.log("configs: ", configs);
        var xhr = settings.xhr();
        xhr.onreadystatechange = function () {
            console.log(xhr.readyState);
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    console.log(this.response)
                    settings.success.call(this, this.response, xhr);
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
        if (settings.upload) {
            var uploadHandler;
            for (uploadHandler in settings.upload) {
                //addEventListener() registers the specified listener on the EventTarget it's called on.
                //The event target may be an Element in a document,
                //the Document itself, a Window, or any other object that supports events (such as XMLHttpRequest).
                xhr.upload.addEventListener(uploadHandler, settings.upload[uploadHandler], false);
            }
        }

        //Progress events exist for both download and upload transfers.
        //The download events are fired on the XMLHttpRequest object itself,
        //as shown in the above sample. The upload events are fired on the XMLHttpRequest.upload object
        if (settings.download) {
            var downloadHandler;
            for (downloadHandler in settings.download) {
                xhr.addEventListener(downloadHandler, settings.download[downloadHandler], false);
            }
        }

        xhr.open(configs.type, configs.url);

        if (configs.responseType) {
            xhr.responseType = configs.responseType;
        }
        //XHR now provides a way for handling this problem:
        //request timeouts. Using the timeout attribute,
        //we can specify how many milliseconds to wait before the application does something else.
        //In the example that follows, we've set a three second (3000 millisecond) timeout:
        xhr.timeout = 3000;

        /*
         *Enforceing a response MIME type
         *  MIME-type mismatches are pretty common on the web.
         *  Sometimes XML data will have a Content-type: text/html response header,
         *  which will cause the value of xhr.responseXML to be null.
         *  To ensure that the browser handles such responses in the way we’d like, we can use the overrideMimeType() method.
         */

        /*
         *Now, we can use the FormData object, and its ordered, key-value pairs. The syntax offers three benefits:
         *    Scripts are more readable
         *    Data is sent in key-value pairs, as with regular HTML forms
         *    FormData objects are sent with multipart/form-data encoding, making it possible to use XHR for sending binary data.
         */
        //FormData objects provide a way to easily construct a set of key/value pairs representing form fields and their values,
        //which can then be easily sent using the XMLHttpRequest send() method
        if (settings.type === "POST" && settings.dataToSend) {
            var dataToSend = new FormData();
            var dataProperty;
            for(dataProperty in settings.dataToSend) {
                dataToSend.append(dataProperty, settins.dataToSend[dataProperty]);
            }
            xhr.send(dataToSend);
        }
        xhr.send();
    }
}(xe))