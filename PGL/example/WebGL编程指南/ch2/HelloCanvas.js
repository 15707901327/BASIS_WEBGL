window.onload = function (ev) {
  // 获取<canvas>元素
  var canvas = document.getElementById('webgl');

  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  gl.clearColor(0.5, 0.5, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);
};
