;(function () {
    chrome.runtime.onMessage.addListener(function (request) {
        console.log(request);
    });

    chrome.runtime.sendMessage({test:"xx"});
}())
