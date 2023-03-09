module.exports = class MyPlugin {
  constructor() {}
  apply(compiler) {
    //
    console.log("start");
    // 注册订阅
    compiler.hooks.emit.tap("myPlugin", () => {
      console.log("emit 开始");
    });
  }
};
