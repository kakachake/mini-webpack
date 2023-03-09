((modules) => {
  // webpackBootstrap
  var __webpack_modules__ = modules
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
})({
  
    "./src/main.js": (module, exports, __webpack_require__) => {
      eval(`const sum = __webpack_require__("./src/sum.js");
__webpack_require__("./src/style.less");
console.log("1233");
console.log(sum(1, 2));`);
    },
  
    "./src/sum.js": (module, exports, __webpack_require__) => {
      eval(`const {
  add
} = __webpack_require__("./src/add.js");
module.exports = function sum(a, b) {
  return add(a, b);
};`);
    },
  
    "./src/add.js": (module, exports, __webpack_require__) => {
      eval(`exports.add = function add(a, b) {
  return a + b;
};`);
    },
  
    "./src/style.less": (module, exports, __webpack_require__) => {
      eval(`const style = document.createElement("style");
style.innerHTML = "body {  background-color: aquamarine;}";
document.head.appendChild(style);`);
    },
  
  }
);
