// LookAtRotatedTriangles.js
// Vertex shader program 顶点着色器
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position =  u_MvpMatrix * a_Position;\n' +
  '  v_Color = a_Color;\n' +
  '}\n';

// 片元着色器
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  ' gl_FragColor = v_Color;\n' +
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

  // 设置<canvas>背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');

  var modelMatrix = new Matrix4();
  var viewMatrix = new Matrix4();
  var projMatrix = new Matrix4();
  var mvpMatrix = new Matrix4();
  modelMatrix.setTranslate(0.75, 0, 0); // 平移0.75单位
  viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0);
  projMatrix.setPerspective(30, canvas.width / canvas.height, 1, 100);

  mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);

  gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT);

  // 绘制图形
  gl.drawArrays(gl.TRIANGLES, 0, n);

  modelMatrix.setTranslate(-0.75, 0, 0);
  mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);
  gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
  var verticesColors = new Float32Array([
    // 顶点和颜色坐标
    0.0, 1.0, -4.0, 0.4, 1.0, 0.4, // The back green one
    -0.5, -1.0, -4.0, 0.4, 1.0, 0.4,
    0.5, -1.0, -4.0, 1.0, 0.4, 0.4,

    0.0, 1.0, -2.0, 1.0, 1.0, 0.4, // The back green one
    -0.5, -1.0, -2.0, 1.0, 1.0, 0.4,
    0.5, -1.0, -2.0, 1.0, 0.4, 0.4,

    0.0, 1.0, 0.0, 0.4, 0.4, 1.0, // The back green one
    -0.5, -1.0, 0.0, 0.4, 0.4, 1.0,
    0.5, -1.0, 0.0, 1.0, 0.4, 0.4
  ]);
  var n = 9; // 顶点数目

  // 创建缓存区对象
  var vertexColorBuffer = gl.createBuffer();
  if (!vertexColorBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }

  // 将顶点坐标和纹理坐标写入缓存区对象
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

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return n;
}