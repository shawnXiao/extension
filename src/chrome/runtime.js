;(function (_) {
    if (!_.oldChromeVersion) {
        _.rt = chrome.runtime;
        return;
    }
    _.rt = {};
    _.rt.getManifest = _.manifest;
    _.rt.getURL = chrome.extension.getURL;
    _.rt.getBackgroundPage = chrome.extension.getBackgroundPage;

    function permissionRequire(declarePermission) {
         _.log("%c You have to declare the permission of %s  in the manifest", "color: red", declarePermission);
    }
    var _permission = _.manifest.permission;
    if (_permission.indexOf('management') > 0) {
        _.rt.onInstalled = chrome.management.onInstalled;
        _.rt.onUninstalled = chrome.management.onUninstalled;
        _.rt.setUninstallUrl = chrome.management.onUninstalled(function (url_opened) {
            chrome.tab.create({url: url_opened});
        });
    } else {
        _.rt.setUninstallUrl = permissionRequire("management");
        _.rt.onInstalled = permissionRequire("management");
        _.rt.onUninstalled = permissionRequire("management");
    }
} (xe))
