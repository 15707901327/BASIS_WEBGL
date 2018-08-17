window.onload = function (ev) {

  // 初始化渲染器，并挂载
  var webGLRenderer = new PGL.WebGLRenderer();
  webGLRenderer.setSize(400, 400);
  webGLRenderer.setClearColor(new PGL.Color(0.0, 0.0, 1.0), 1.0);
  var container = document.getElementById('container');
  container.appendChild(webGLRenderer.domElement);

  webGLRenderer.render();
};
