(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        define(['buoy'], factory(root));
    } else if ( typeof exports === 'object' ) {
        module.exports = factory();
    } else {
        root.insRouter = factory();
    }
})(typeof global !== 'undefined' ? global : this.window || this.global, function (){

    let insRouter = {
        location : window.location,
        history : window.history,
    };

    insRouter.url = function (root) {
      if (root) {
        return root.location;
      }
      return window.location
    }

    insRouter.go = function (path, root) {
      if (!path) {
        console.error('Please include pathname');
        return;
      }

      if (root) {
        return root.location.href = path;
      }
      return document.location.href = path
    };

    insRouter.back = function (root) {
      if (root) {
        return root.history.back();
      }
      return window.history.back();
    };

    insRouter.forward = function (root) {
      if (root) {
        return root.history.forward();
      }
      return window.history.forward();
    };
    return insRouter;
});



