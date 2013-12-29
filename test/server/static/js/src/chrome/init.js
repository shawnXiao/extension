;(function (_) {
    _.oldChromeVersion = !chrome.runtime;
    _.manifest = (function () {
        var  manifestData;
        if (!!!_.oldChromeVersion) {
            manifestData = chrome.runtime.getManifest();
        } else {
            _.ajax({
                url: "/manifest.json",
                isAsynic: false,
                success: function (data) {
                    manifestData = data;
                }
            });
        }
        return manifestData;
    }());
}(xe))
