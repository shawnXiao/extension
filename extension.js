(function () {
    //some google api is based on the manifest
    //so first get the manifest and then add the api
    //such as : cookie, command
    function getExtionType() {
        var extensionType;
        return extensionType;
    }

    function getManifestInfo() {

    }

    function ajax() {
        var xhr =new XMLHttpRequest();
        xhr.onreadystatechange = function () {

        };
    }

    var log = function () {
        var styleLog = function (style, params) {

        }

        var log = function () {

        }

        var groupLog = function () {

        }

        var groupEndLog = function () {

        }

    };

    var ls = function () {
        var get = function (key) {

        };

        var set = function (key, value) {

        };

        var serialize = function () {

        }

        var unserialize = function () {

        }
    }


    var xe = function () {
        this.log = log;
        this.ls = ls;
        this.ajax = ajax;
        this.cookies = chrome.cookies;
        this.cmd = chrome.command;
        this.manifest = getManifestInfo;
    }
    return xe;
}).call(this)
