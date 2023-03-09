const pathLib = require("path");
const fs = require("fs");
const babylon = require("babylon");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;
// 将es6 es7 等高级的语法转化为es5的语法
const { transformFromAst } = require("@babel/core");
const ejs = require("ejs");
const { SyncHook } = require("tapable");

module.exports = class Compiler {
  constructor(config) {
    this.extentions = [".js", ".jsx", ".ts", ".tsx"];
    this.config = config;
    this.entryId;
    this.entry = config.entry;
    // 当前目录
    this.root = process.cwd();
    // 模块依赖
    this.modules = {};
    this.hooks = {
      entryOption: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook(),
    };
    // for plugins
    const plugins = this.config.plugins;
    if (Array.isArray(plugins)) {
      plugins.forEach((plugin) => {
        plugin.apply(this);
      });
    }
  }

  // 读取模块内容
  getSource(modulePath) {
    // return fs.readFileSync(modulePath, "utf-8");
    // for loader
    const rules = this.config.module.rules;
    let content = fs.readFileSync(modulePath, "utf-8");
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      let { test, use } = rule;
      let len = use.length - 1;
      if (test.test(modulePath)) {
        while (len >= 0) {
          const loader = require(use[len--]);
          content = loader(content);
          console.log(content);
        }
      }
    }
    return content;
  }

  addExtention(modulePath, parentPath) {
    const ext = this.extentions.find((ext) => {
      const fullPath = pathLib.join(this.root, parentPath, modulePath + ext);
      // 查看文件是否存在
      if (fs.existsSync(fullPath)) {
        return true;
      }
    });
    if (!ext) return modulePath;
    return modulePath + ext;
  }

  // 模块文件解析
  parseSource(source, parentPath) {
    const ast = babylon.parse(source);
    const dependencies = [];
    traverse(ast, {
      CallExpression: (path) => {
        const { node } = path;
        if (node.callee.name === "require") {
          let modulePath = node.arguments[0].value;
          if (pathLib.extname(modulePath) === "") {
            modulePath = this.addExtention(modulePath, parentPath);
            // modulePath是相对于root的相对路径
          }
          modulePath =
            "./" + pathLib.join(parentPath, modulePath).replace(/\\/g, "/");
          node.arguments[0].value = modulePath;
          dependencies.push(modulePath);
          node.callee.name = "__webpack_require__";
        }
      },
    });
    const { code } = transformFromAst(ast, null, {});
    console.log("sourceCode：", code);
    return {
      sourceCode: code,
      dependencies,
    };
  }

  // 从root节点找到所有的依赖模块
  buildModule(modulePath, isEntry) {
    const source = this.getSource(modulePath);
    const moduleName =
      "./" + pathLib.relative(this.root, modulePath).replace(/\\/g, "/");
    console.log("moduleName", moduleName);
    if (isEntry) {
      this.entryId = moduleName;
    }
    // 解析结果，是否存在子依赖
    const { sourceCode, dependencies } = this.parseSource(
      source,
      pathLib.dirname(moduleName)
    );
    // 保存模块的路径，内容，依赖
    this.modules[moduleName] = sourceCode;
    // 递归
    dependencies.forEach((dep) => {
      this.buildModule(pathLib.join(this.root, dep), false);
    });
  }

  // 打包文件
  async emitFile() {
    const main = pathLib.join(
      this.config.output.path,
      this.config.output.filename
    );
    const templateStr = this.getSource(pathLib.join(__dirname, "bundle.ejs"));
    const result = await ejs.render(templateStr, {
      entryId: this.entryId,
      modules: this.modules,
    });
    console.log(this.modules);
    this.assets = {};
    this.assets[main] = result; // 文件全名 -- 文件内容
    fs.writeFileSync(main, this.assets[main]);
  }

  // 执行
  run() {
    this.hooks.run.call();
    this.hooks.compile.call();
    this.buildModule(pathLib.resolve(this.root, this.entry), true);
    this.hooks.afterCompile.call();
    this.hooks.emit.call();
    this.emitFile();
    this.hooks.done.call();
  }

  // generatorCode() {
  //   const modules = this.modules;
  //   let modulesStr = "";
  //   Object.entries(modules).forEach(([key, code]) => {
  //     modulesStr += `
  //       "${key}":function(__webpack_require__, module, exports){
  //         eval('${code.replace(/\n|\r/g, "")}')
  //       },
  //     `;
  //   });
  //   const iife = `
  //     ((modules)=>{
  //       function require(key){
  //         const fn = modules[key]
  //         const module = {exports: {}}
  //         fn(require, module, module.exports)
  //         return module.exports
  //       }
  //       require('${this.entryId}')
  //     })({${modulesStr}})
  //   `;
  //   fs.writeFileSync(
  //     pathLib.join(this.output.path, this.output.filename),
  //     iife
  //   );
  // }
};
