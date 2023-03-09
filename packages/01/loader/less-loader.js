const less = require("less");

function loader(source) {
  let css = "";
  less.render(source, function (err, res) {
    css = res.css;
  });
  console.log("less-loader", css);
  return css.replace(/\n/g, "");
}

module.exports = loader;
