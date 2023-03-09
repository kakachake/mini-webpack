function loader(sourceCss) {
  let style = `
    const style = document.createElement("style");
    style.innerHTML = ${JSON.stringify(sourceCss)}
    document.head.appendChild(style)
  `;
  console.log("style-loader", style);
  return style;
}

module.exports = loader;
