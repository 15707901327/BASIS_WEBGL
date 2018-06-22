// ClickedPints.js (c) 2012 matsuda
// 顶点着色器
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'uniform mat4 u_ModelViewMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  ' gl_Position = u_ModelViewMatrix * a_Position;\n' +
  ' v_Color = a_Color;\n' +
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
    console.log('Failed to set the positions of the vertices');
    return;
  }

  var u_ModelViewMatrix = gl.getUniformLocation(gl.program, 'u_ModelViewMatrix');
  if (!u_ModelViewMatrix) {
    console.log('Failed to get the u_ViewMatrix');
    return;
  }
  // 设置视点、视线和上方向
  var viewMatrix = new Matrix4();
  viewMatrix.setLookAt(0.25, 0.25, 0.25, 0, 0, 0, 0, 1, 0);
  var modelMatrix = new Matrix4();
  modelMatrix.setRotate(-10, 0, 0, 1);

  var modelViewMatrix = viewMatrix.multiply(modelMatrix);

  // 将视图矩阵传递给u_ViewMatrix变量
  gl.uniformMatrix4fv(u_ModelViewMatrix, false, modelViewMatrix.elements);

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
  var verticesColors = new Float32Array([
    // 顶点和颜色坐标
    0.0, 0.5, -0.4, 0.4, 1.0, 0.4, // 绿色三角形在最后
    -0.5, -0.5, -0.4, 0.4, 1.0, 0.4,
    0.5, -0.5, -0.4, 1.0, 0.4, 0.4,

    0.5, 0.4, -0.2, 1.0, 0.4, 0.4, // 黄色三角形在中间
    -0.5, 0.4, -0.2, 1.0, 1.0, 0.4,
    0.0, -0.6, -0.2, 1.0, 1.0, 0.4,

    0.0, 0.5, 0.0, 0.4, 0.4, 1.0,  // 蓝色三角形在最前面
    -0.5, -0.5, 0.0, 0.4, 0.4, 1.0,
    0.5, -0.5, 0.0, 1.0, 0.4, 0.4
  ]);
  var n = 9; // 顶点数目

  var vertexColorBuffer = gl.createBuffer();
  if (!vertexColorBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // 2.将缓存区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  // 3.向缓存区对象写入数据
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
