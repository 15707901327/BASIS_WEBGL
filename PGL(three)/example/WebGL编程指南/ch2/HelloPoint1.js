// 顶点着色器程序
var VSHADER_SOURCE =
  'void main() {\n' +
  '  gl_Position = vec4(0.5,0.5,0.5,1.0);\n' + //设置坐标
  '  gl_PointSize = 10.0;\n' + //设置尺寸
  '}\n';

// 片元着色器
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

window.onload = function (ev) {

  // 挂载点
  var container = document.getElementById('container');

  // 初始化渲染器
  var webGLRenderer = new PGL.WebGLRenderer();
  webGLRenderer.setSize(400, 400);
  webGLRenderer.setClearColor(new PGL.Color(0.0, 0.0, 0.0), 1.0);
  container.appendChild(webGLRenderer.domElement);

  // 初始化场景
  var scene = new PGL.Scene();

  // 向场景中添加物体
  var starsGeometry = new PGL.Geometry();
  var star = new PGL.Vector3(0.5, 0.5, 0.5);
  starsGeometry.vertices.push(star);
  var starsMaterial = new PGL.PointsMaterial({color:0x888888});
  starsMaterial.size = 10;
  var starField = new PGL.Points(starsGeometry,starsMaterial);
  scene.add(starField);

  // var gl = webGLRenderer.getContext();
  // if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
  //   console.log('Failed to intialize shaders.');
  //   return;
  // }

  webGLRenderer.render(scene);

  // gl.drawArrays(gl.POINTS, 0, 1);
};
