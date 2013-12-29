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
