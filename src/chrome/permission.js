;(function (_) {
    if (!!!_.manifest.permissions)  {
        return;
    }
    var _persmissions = _.manifest.permissions;
    var blackWords = ["activeTab", "background", "clipboardRead", "clipboardWrite", "geolocation", "unlimitedStorage"];
    _persmissions.forEach(function (item) {
        var hostIndex = item.indexOf(":");
        if (hostIndex > 0) {
            return;
        }

        if (blackWords.indexOf(item) > 0) {
            return;
        }
        _[item] = chrome[item];
    });
}(xe))
