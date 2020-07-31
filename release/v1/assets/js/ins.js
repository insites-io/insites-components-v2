(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define(['buoy'], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory();
	} else {
		root.ins = factory();
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, function (){

  'use strict';
  let supports = !!document.querySelector;
  let isValidParams = function (params, message) {
    if (!params) {
      console.error(message);
      return;
    }
    return params;
  }

  let ins = function (element, root) {

      if (!supports) return;

      if (element) {
          let el;
          let get_params = isValidParams(element, 'Please include element id.');

          document.querySelectorAll(get_params);

          el = document.querySelectorAll(get_params);
          if (root) {
              el = root.document.querySelectorAll(get_params);
          }

          if (el.length === 1) {
              return el[0];
          }

          return el;
      }
  }
  return ins;
});
