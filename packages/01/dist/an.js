(() => {
  // webpackBootstrap
  var __webpack_modules__ = {
    /***/ "./src/main.js":
      /*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
      /***/ (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__
      ) => {
        eval(
          'const sum = __webpack_require__(/*! ./sum */ "./src/sum.js");\r\nconsole.log("1233");\r\n\r\nconsole.log(sum(1, 2));\r\n\n\n//# sourceURL=webpack://01/./src/main.js?'
        );

        /***/
      },

    /***/ "./src/sum.js":
      /*!********************!*\
    !*** ./src/sum.js ***!
    \********************/
      /***/ (module) => {
        eval(
          "module.exports = function sum(a, b) {\r\n  return a + b;\r\n};\r\n\n\n//# sourceURL=webpack://01/./src/sum.js?"
        );

        /***/
      },
  };
  /************************************************************************/
  // The module cache
  var __webpack_module_cache__ = {};

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // Create a new module (and put it into the cache)
    var module = (__webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {},
    });

    // Execute the module function
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    // Return the exports of the module
    return module.exports;
  }

  /************************************************************************/

  // startup
  // Load entry module and return exports
  // This entry module can't be inlined because the eval devtool is used.
  var __webpack_exports__ = __webpack_require__("./src/main.js");
})();
