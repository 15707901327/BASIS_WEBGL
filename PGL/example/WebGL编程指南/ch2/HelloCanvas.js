window.onload = function (ev) {
  // 获取<canvas>元素
  var canvas = document.getElementById('webgl');

  var webGlRenderer = new PGL.WebGLRenderer({
    canvas: canvas
  });
  webGlRenderer.clearColor();
  webGlRenderer.render();
};
