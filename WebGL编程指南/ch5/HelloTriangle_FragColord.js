// ClickedPints.js (c) 2012 matsuda
// 顶点着色器
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  ' gl_Position = a_Position;\n' +
  ' gl_PointSize = 10.0;\n' +
  ' v_Color = a_Color;\n' +
  '}\n';

// 片元着色器
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform float u_Width;\n' +
  'uniform float u_Height;\n' +
  'void main() {\n' +
  ' gl_FragColor = vec4(gl_FragCoord.x/u_Width, 0.0, gl_FragCoord.y/u_Height, 1.0);\n' +
  '}\n';

//gl_FragColor = vec4(gl_FragColor.x/u_Width,0.0,gl_FragColor.y/u_Height,1.0)
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
    console.log('Failed to set the positions of the vertices');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}

/**
 * 创建顶点缓存区对象，并将多个顶点的数据保存在缓存区中，然后将缓存区传递给着色器。
 * @param gl：上下文
 * @returns {number}：顶点的个数
 */
function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    0.0, 0.5,
    -0.5, -0.5,
    0.5, -0.5
  ]);
  var n = 3; // 点的个数

  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // 获取a_Position的存储位置，分配缓存器并开启
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  var u_Width = gl.getUniformLocation(gl.program, 'u_Width');
  var u_Height = gl.getUniformLocation(gl.program, 'u_Height');

  gl.uniform1f(u_Width, gl.drawingBufferWidth / 400);
  gl.uniform1f(u_Height, gl.drawingBufferHeight / 400);

  return n;
}
