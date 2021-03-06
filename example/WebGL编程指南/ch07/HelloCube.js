// LookAtRotatedTriangles.js
// Vertex shader program 顶点着色器
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  // 'uniform mat4 u_MvpMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  v_Color = a_Color;\n' +
  '}\n';

// 片元着色器
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';

function main() {

  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // 设置顶点的位置
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // 设置<canvas>背景色，并开启隐藏面消除
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // /** 获取变量的存储地址 **/
  //   // Get the storage location of u_MvpMatrix
  // var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  // if (!u_MvpMatrix) {
  //   console.log('Failed to get the storage location of u_MvpMatrix');
  //   return;
  // }
  //
  // /** 设置视点和可视空间 **/
  // var mvpMatrix = new Matrix4();
  // mvpMatrix.setPerspective(30, canvas.width / canvas.height, 1, 100);
  // mvpMatrix.lookAt(0, 0, 0.1, 0, 0, 0, 0, 1, 0);
  //
  // //将视图矩阵和投影矩阵传递给变量
  // gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

  //清空颜色缓存区和深度缓存区
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0); // 绘制图形
}

/** 设置顶点信息（顶点和颜色坐标）**/
function initVertexBuffers(gl) {
  // Create a cube
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3
  var verticesColors = new Float32Array([
    // 顶点和颜色坐标
    0.5, 0.5, 0.0, 0.5, 0.5, 0.5,  // v0 White
    -0.5, 0.5, 0.0, 0.5, 0.0, 0.5,  // v1 Magenta
    -0.5, -0.5, 0.0, 0.5, 0.0, 0.0,  // v2 Red
    0.5, -0.5, 0.0, 0.5, 0.5, 0.0,  // v3 Yellow
    // 1.0, -1.0, -1.0, 0.0, 1.0, 0.0,  // v4 Green
    // 1.0, 1.0, -1.0, 0.0, 1.0, 1.0,  // v5 Cyan
    // -1.0, 1.0, -1.0, 0.0, 0.0, 1.0,  // v6 Blue
    // -1.0, -1.0, -1.0, 0.0, 0.0, 0.0   // v7 Black
  ]);
  // 顶点索引
  var indices = new Uint8Array([
    0, 1, 2, 0, 2, 3,    // front
    // 0, 3, 4, 0, 4, 5,    // right
    // 0, 5, 6, 0, 6, 1,    // up
    // 1, 6, 7, 1, 7, 2,    // left
    // 7, 4, 3, 7, 3, 2,    // down
    // 4, 7, 6, 4, 6, 5     // back
  ]);

  // 创建缓存区对象
  var vertexColorBuffer = gl.createBuffer();
  var indexBuffer = gl.createBuffer();
  if (!vertexColorBuffer || !indexBuffer) {
    return -1;
  }

  // 将顶点坐标和颜色坐标写入缓存区对象
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  var FSIZE = verticesColors.BYTES_PER_ELEMENT;

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
  gl.enableVertexAttribArray(a_Position);

  // 将纹理坐标分派给a_TexCoord，并开启它
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if (a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return -1;
  }
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
  gl.enableVertexAttribArray(a_Color);  // Enable the assignment of the buffer object

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}