;(function (_) {
    var emptyArray = [];
    var slice = emptyArray.slice;
    _.log = function () {
        var arrayLikeArgs = slice.call(arguments, 0);
        console.log.apply(console, arrayLikeArgs);
    }
    _.st = console;
}(xe))
