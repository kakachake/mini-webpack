#! /usr/bin/env node

console.log("打包工具");
const path = require("path");
const config = require(path.resolve(process.cwd(), "webpack.config.js"));
console.log(config);
const Compiler = require("../lib/Compiler.js");
const compiler = new Compiler(config);
compiler.run();
