;(function (_) {
    if (_.oldChromeVersion) {
        _.onMessage = chrome.extension.onMessage || chrome.extension.onRequest;
        _.sendMessage = chrome.extension.sendMessage || chrome.extension.sendRequest;
    } else {
        _.onMessage = chrome.runtime.onMessage;
        _.sendMessage = chrome.runtime.sendMessage;
    }
}(xe))
