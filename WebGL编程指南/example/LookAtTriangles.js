// LookAtRotatedTriangles.js
// Vertex shader program 顶点着色器
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
    'uniform mat4 u_ViewMatrix;\n' +
    'uniform mat4 u_ProjMatrix;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  gl_Position =  u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n' +
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
  var nf = document.getElementById('nearFar');

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
  gl.clearColor(0, 0, 0, 1);

  /** 获取变量的存储地址 **/
  var u_ModelMatrix = gl.getUniformLocation(gl.program,'u_ModelMatrix');
  var u_ViewMatrix = gl.getUniformLocation(gl.program,'u_ViewMatrix');
  var u_ProjMatrix = gl.getUniformLocation(gl.program,'u_ProjMatrix');
  if (!u_ModelMatrix || !u_ViewMatrix || !u_ProjMatrix) {
    console.log('Failed to Get the storage locations of u_ModelMatrix, u_ViewMatrix, and/or u_ProjMatrix');
    return;
  }

  var modelMatrix = new Matrix4();//模型矩阵
  var viewMatrix = new Matrix4();//视图矩阵
  var projMatrix = new Matrix4();//投影矩阵

  // 计算视图矩阵和投影矩阵
  modelMatrix.setTranslate(0.75,0,0);//平移0.75单位
  viewMatrix.setLookAt(0,0,5,0,0,-100,0,1,0);
  projMatrix.setPerspective(30,canvas.width/canvas.height,1,100);

  //将视图矩阵和投影矩阵传递给变量
  gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);
  gl.uniformMatrix4fv(u_ViewMatrix,false,viewMatrix.elements);
  gl.uniformMatrix4fv(u_ProjMatrix,false,projMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT);//Clear <canvas>

  gl.drawArrays(gl.TRIANGLES, 0, n); // 绘制图形

  modelMatrix.setTranslate(-0.75,0,0);
  gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);
  gl.drawArrays(gl.TRIANGLES,0,n);
}
/** 设置顶点信息（顶点和颜色坐标）**/
function initVertexBuffers(gl) {
  var verticesColors = new Float32Array([
    // 顶点和颜色坐标
    0.0,  1.0,  -4.0,  0.4,  1.0,  0.4, // The back green one
    -0.5, -1.0,  -4.0,  0.4,  1.0,  0.4,
    0.5, -1.0,  -4.0,  1.0,  0.4,  0.4,

    0.0,  1.0,  -2.0,  1.0,  1.0,  0.4, // The middle yellow one
    -0.5, -1.0,  -2.0,  1.0,  1.0,  0.4,
    0.5, -1.0,  -2.0,  1.0,  0.4,  0.4,

    0.0,  1.0,   0.0,  0.4,  0.4,  1.0,  // The front blue one
    -0.5, -1.0,   0.0,  0.4,  0.4,  1.0,
    0.5, -1.0,   0.0,  1.0,  0.4,  0.4,
  ]);
  var n = 9; // 顶点数目

  // 创建缓存区对象
  var vertexColorbuffer = gl.createBuffer();
  if (!vertexColorbuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // 将顶点坐标和颜色坐标写入缓存区对象
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  var FSIZE = verticesColors.BYTES_PER_ELEMENT;

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
  gl.enableVertexAttribArray(a_Position);

  // 将颜色坐标分派给a_TexCoord，并开启它
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return -1;
  }
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
  gl.enableVertexAttribArray(a_Color);  // Enable the assignment of the buffer object
  return n;
}

var g_near = 0.0,g_far = 0.5;

/** 键盘点击事件 **/
function keydown(ev, gl, n, u_ProjMatrix, projMatrix,nf) {

  switch(ev.keyCode){
    case 39 : g_near +=0.01;break;
    case 37 : g_near -=0.01;break;
    case 38 : g_far +=0.01;break;
    case 40 : g_far -=0.01;break;
    default : return;
  }
  draw(gl, n, u_ProjMatrix, projMatrix,nf);
}

function draw(gl, n, u_ProjMatrix, projMatrix,nf) {
  // 使用矩阵设置可视空间
  projMatrix.setOrtho(-1,1,-1,1,g_near,g_far);

  /** 将视图矩阵传递给变量 **/
  gl.uniformMatrix4fv(u_ProjMatrix,false,projMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT);     // Clear <canvas>

  // 显示当前的near和far值
  nf.innerHTML = 'near:' +　Math.round(g_near * 100)/100 + ', far : '+ Math.round(g_far * 100)/100;

  // 绘制图形
  gl.drawArrays(gl.TRIANGLES, 0, n);
}