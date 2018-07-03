// MultiJointModel_segment.js
// 顶点着色器程序
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Normal;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' + //用来变换法向量的矩阵
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  '  vec3 lightDirection = normalize(vec3(0.0, 0.5, 0.7));\n' +
  '  vec4 color = vec4(1.0, 0.4, 0.0, 1.0);\n' +
  '  vec3 normal = normalize((u_NormalMatrix * a_Normal).xyz);\n' +
  '  float nDotL = max(dot(normal, lightDirection), 0.0);\n' +
  '  v_Color = vec4(color.rgb * nDotL + vec3(0.1), color.a);\n' +
  '}\n';

// Fragment shader program
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

  // 设置顶点坐标
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // 设置<canvas>背景色，并开启隐藏面消除
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // 获取uniform变量的存储地址
  var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  var u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
  if (!u_MvpMatrix || !u_NormalMatrix) {
    console.log('Failed to get the storage location');
    return;
  }

  // 计算视图的投影矩阵
  var viewProjMatrix = new Matrix4();
  viewProjMatrix.setPerspective(50.0, canvas.width / canvas.height, 1.0, 1000.0);
  viewProjMatrix.lookAt(20.0, 1.0, 30.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

  document.onkeydown = function (ev) { // 注册鼠标响应函数
    keydown(ev, gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
  };
  draw(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);  // Draw the robot arm
}

var ANGLE_STEP = 3.0;  // 每次按键转动的角度
var g_arm1Angle = 90.0;  // arm1的当前角度
var g_joint1Angle = 45.0; // joint1的当前角度
var g_joint2Angle = 0.0;  // joint2的当前角度
var g_joint3Angle = 0.0;  // joint3的当前角度

function keydown(ev, gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix) {
  switch (ev.keyCode) {
    case 40: // 上方向键 -> joint1绕z轴正方向转
      if (g_joint1Angle < 135.0) g_joint1Angle += ANGLE_STEP;
      break;
    case 38: // 下方向键 ->joint1绕z轴负方向转
      if (g_joint1Angle > -135.0) g_joint1Angle -= ANGLE_STEP;
      break;
    case 39: // 右方向键 -> arm1绕Y轴正方向转
      g_arm1Angle = (g_arm1Angle + ANGLE_STEP) % 360;
      break;
    case 37: // 左方向键 -> arm1绕Y轴负方向转
      g_arm1Angle = (g_arm1Angle - ANGLE_STEP) % 360;
      break;
    case 90: // 'ｚ'key -> the positive rotation of joint2
      g_joint2Angle = (g_joint2Angle + ANGLE_STEP) % 360;
      break;
    case 88: // 'x'key -> the negative rotation of joint2
      g_joint2Angle = (g_joint2Angle - ANGLE_STEP) % 360;
      break;
    case 86: // 'v'key -> the positive rotation of joint3
      if (g_joint3Angle < 60.0) g_joint3Angle = (g_joint3Angle + ANGLE_STEP) % 360;
      break;
    case 67: // 'c'key -> the nagative rotation of joint3
      if (g_joint3Angle > -60.0) g_joint3Angle = (g_joint3Angle - ANGLE_STEP) % 360;
      break;
    default:
      return;
  }
  draw(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix); // 绘制手臂
}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    0.5, 1.0, 0.5, -0.5, 1.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0, 0.5, // v0-v1-v2-v3 front
    0.5, 1.0, 0.5, 0.5, 0.0, 0.5, 0.5, 0.0, -0.5, 0.5, 1.0, -0.5, // v0-v3-v4-v5 right
    0.5, 1.0, 0.5, 0.5, 1.0, -0.5, -0.5, 1.0, -0.5, -0.5, 1.0, 0.5, // v0-v5-v6-v1 up
    -0.5, 1.0, 0.5, -0.5, 1.0, -0.5, -0.5, 0.0, -0.5, -0.5, 0.0, 0.5, // v1-v6-v7-v2 left
    -0.5, 0.0, -0.5, 0.5, 0.0, -0.5, 0.5, 0.0, 0.5, -0.5, 0.0, 0.5, // v7-v4-v3-v2 down
    0.5, 0.0, -0.5, -0.5, 0.0, -0.5, -0.5, 1.0, -0.5, 0.5, 1.0, -0.5  // v4-v7-v6-v5 back
  ]);

  // Normal
  var normals = new Float32Array([
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, // v0-v1-v2-v3 front
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, // v0-v3-v4-v5 right
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, // v0-v5-v6-v1 up
    -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // v1-v6-v7-v2 left
    0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, // v7-v4-v3-v2 down
    0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0  // v4-v7-v6-v5 back
  ]);

  // 顶点索引
  var indices = new Uint8Array([
    0, 1, 2, 0, 2, 3,    // front
    4, 5, 6, 4, 6, 7,    // right
    8, 9, 10, 8, 10, 11,    // up
    12, 13, 14, 12, 14, 15,    // left
    16, 17, 18, 16, 18, 19,    // down
    20, 21, 22, 20, 22, 23     // back
  ]);

  // 将顶点坐标和颜色坐标写入缓存区对象
  if (!initArrayBuffer(gl, 'a_Position', vertices, gl.FLOAT, 3)) return -1;
  if (!initArrayBuffer(gl, 'a_Normal', normals, gl.FLOAT, 3)) return -1;

  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // 创建缓存区对象
  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // 将顶点索引数据写入缓存区
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer(gl, attribute, data, type, num) {
  var buffer = gl.createBuffer();   // Create a buffer object
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return false;
  }

  // 将数据写入缓存区对象
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  // 将缓存区对象分配给变量
  var a_attribute = gl.getAttribLocation(gl.program, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }

  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  gl.enableVertexAttribArray(a_attribute);

  return true;
}

// 坐标变换矩阵
var g_modelMatrix = new Matrix4(), g_mvpMatrix = new Matrix4();

function draw(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix) {
  // 用以清空颜色缓存区和深度缓存区的背景色
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // 绘制基座
  var baseHeight = 2.0;
  g_modelMatrix.setTranslate(0.0, -12.0, 0.0);
  drawBox(gl, n, 10.0, baseHeight, 10.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix); // 绘制

  // Arm1
  var arm1Length = 10.0; // arm1的长度
  g_modelMatrix.translate(0.0, baseHeight, 0.0); // 移至基座
  g_modelMatrix.rotate(g_arm1Angle, 0.0, 1.0, 0.0); // 绕Y轴旋转
  drawBox(gl, n, 3.0, arm1Length, 3.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix); // 绘制

  // Arm2
  var arm2Length = 10.0;
  g_modelMatrix.translate(0.0, arm1Length, 0.0); // 移至joint1处
  g_modelMatrix.rotate(g_joint1Angle, 0.0, 0.0, 1.0);// 绕Z轴旋转
  drawBox(gl, n, 4.0, arm2Length, 4.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix); // 绘制

  // A palm
  var palmLength = 2.0;
  g_modelMatrix.translate(0.0, arm2Length, 0.0);       // Move to palm
  g_modelMatrix.rotate(g_joint2Angle, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  drawBox(gl, n, 2.0, palmLength, 6.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);

  // 移动至palm一端的中点
  g_modelMatrix.translate(0.0, palmLength, 0.0);

  // 绘制finger1
  pushMatrix(g_modelMatrix);
  g_modelMatrix.translate(0.0, 0.0, 2.0);
  g_modelMatrix.rotate(g_joint3Angle, 1.0, 0.0, 0.0);  // Rotate around the x-axis
  drawBox(gl, n, 1.0, 2.0, 1.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
  g_modelMatrix = popMatrix();

  // Finger2
  g_modelMatrix.translate(0.0, 0.0, -2.0);
  g_modelMatrix.rotate(-g_joint3Angle, 1.0, 0.0, 0.0);  // Rotate around the x-axis
  drawBox(gl, n, 1.0, 2.0, 1.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
}

var g_matrixStack = []; // Array for storing a matrix
function pushMatrix(m) { // Store the specified matrix to the array
  var m2 = new Matrix4(m);
  g_matrixStack.push(m2);
}

function popMatrix() { // Retrieve the matrix from the array
  return g_matrixStack.pop();
}

var g_normalMatrix = new Matrix4(); // 法线的旋转矩阵

// 绘制立方体
function drawBox(gl, n, width, height, depth, viewProjMatrix, u_MvpMatrix, u_NormalMatrix) {
  pushMatrix(g_modelMatrix);

  g_modelMatrix.scale(width, height, depth);
  // 计算模型视图矩阵并传给u_MvpMatrix
  g_mvpMatrix.set(viewProjMatrix);
  g_mvpMatrix.multiply(g_modelMatrix);
  gl.uniformMatrix4fv(u_MvpMatrix, false, g_mvpMatrix.elements);
  // 计算法线变换矩阵并传给u_NormalMatrix变量
  g_normalMatrix.setInverseOf(g_modelMatrix);
  g_normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, g_normalMatrix.elements);
  // Draw
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
  g_modelMatrix = popMatrix();
}