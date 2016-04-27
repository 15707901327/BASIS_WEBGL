// LookAtRotatedTriangles.js
// Vertex shader program 顶点着色器
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'uniform mat4 u_ViewMatrix;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  gl_Position =  u_ViewMatrix * u_ModelMatrix * a_Position;\n' +
    '  v_Color = a_Color;\n' +
    '}\n';

// Fragment shader program 片元着色器
var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  gl_FragColor = v_Color;\n' +
    '}\n';

function main() {
  // Retrieve <canvas> element
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

  // 设置顶点信息
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // 设置<canvas>背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  /** 获取变量的存储地址 **/
  var u_ViewMatrix = gl.getUniformLocation(gl.program,'u_ViewMatrix');
  var u_ModelMatrix = gl.getUniformLocation(gl.program,'u_ModelMatrix');

  /** 设置视点、视线、和上方向 **/
  var viewMatrix = new Matrix4();
  viewMatrix.setLookAt(0.20,0.25,0.25,0,0,0,0,1,0);

  /** 计算旋转矩阵 **/
  var modelMatrix = new Matrix4();
  modelMatrix.setRotate(-90,0,0,1);

  /** 将视图矩阵传递给变量 **/
  gl.uniformMatrix4fv(u_ViewMatrix,false,viewMatrix.elements);
  gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);

  // 绘制图形
  gl.drawArrays(gl.TRIANGLES, 0, n);
}
/** 设置顶点信息（顶点和颜色坐标）**/
function initVertexBuffers(gl) {
  var verticesColors = new Float32Array([
    // 顶点和颜色坐标
    0.0,  0.5,  -0.4,  0.4,  1.0,  0.4, // 绿色三角形在最后
    -0.5, -0.5,  -0.4,  0.4,  1.0,  0.4,
    0.5, -0.5,  -0.4,  1.0,  0.4,  0.4,

    0.5,  0.4,  -0.2,  1.0,  0.4,  0.4, // 黄色三角形在中间
    -0.5,  0.4,  -0.2,  1.0,  1.0,  0.4,
    0.0, -0.6,  -0.2,  1.0,  1.0,  0.4,

    0.0,  0.5,   0.0,  0.4,  0.4,  1.0,  // 蓝色三角形在最前面
    -0.5, -0.5,   0.0,  0.4,  0.4,  1.0,
    0.5, -0.5,   0.0,  1.0,  0.4,  0.4,
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
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
  gl.enableVertexAttribArray(a_Position);

  // 将纹理坐标分派给a_TexCoord，并开启它
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return -1;
  }
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
  gl.enableVertexAttribArray(a_Color);  // Enable the assignment of the buffer object

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return n;
}