;(function () {
    console.log(119);
    var method;
    for (method in chrome.extension) {
        console.log(method);
        console.log(chrome.extension[method]);
    }
}());
