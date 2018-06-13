// ClickedPints.js (c) 2012 matsuda
// 顶点着色器
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'uniform mat4 u_ViewMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_ViewMatrix * a_Position;\n' +
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

/**
 * 函数的执行流程
 * 1.获取canvas元素
 * 2.获取WebGL绘图的上下文
 * 3.设置点的坐标信息
 * 4.设置背景色
 * 5.清空<canvas>
 * 6.绘制
 */
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

  // 设置顶点的位置
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }

  var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if (!u_ViewMatrix) {
    console.log('Failed to get the u_ViewMatrix');
    return;
  }

  // 设置视点、视线和上方向
  var viewMatrix = new Matrix4();
  viewMatrix.setLookAt(0.20, 0.25, 0.25, 0, 0, 0, 0, 1, 0);

  // 将视图矩阵传递给u_ViewMatrix变量
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);

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
  var verticesColors = new Float32Array([
    0.0, 0.5, -0.4, 0.4, 1.0, 0.4,
    -0.5, -0.5, -0.4, 0.4, 1.0, 0.4,
    0.5, -0.5, -0.4, 1.0, 0.4, 0.4,

    0.5, 0.4, -0.2, 1.0, 0.4, 0.4,
    -0.5, 0.4, -0.2, 1.0, 1.0, 0.4,
    0.0, -0.6, -0.2, 1.0, 1.0, 0.4,

    0.0, 0.5, 0.0, 0.4, 0.4, 1.0,
    -0.5, -0.5, 0.0, 0.4, 0.4, 1.0,
    0.5, -0.5, 0.0, 1.0, 0.4, 0.4
  ]);
  var n = 9; // 点的个数

  /**
   * gl.createBuffer()
   * 1.创建缓存区对象
   * 返回值：
   *  非null：新创建的缓存区对象
   *  null：创建缓存区对象失败
   */
  var vertexColorBuffer = gl.createBuffer();
  if (!vertexColorBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  /**
   * gl.bindBuffer(target, buffer);
   * 允许使用buffer表示的缓存区对象并将其绑定到target表示的目标上
   * 参数：
   *  target：
   *      gl.ARRAY_BUFFER：表示缓存区对象中包含来顶点的数据
   *      gl.ELEMENT_ARRAY_BUFFER:表示缓存区对象中包含了顶点的索引值
   *          "OpenGL ES着色器语言[GLSL ES]"
   *  buffer:指定之前🈶️由gl.createBuffer()返回的待绑定的缓存区对象，
   *      如果指定为空，则禁用对target的绑定
   * 返回值：无
   * 错误：INVALID_ENUM target不是上诉值之一，这时将保持原有的绑定情况不变
   */
  // 2.将缓存区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);

  /**
   * gl.bufferData(target, data, usage)
   * 开辟存储空间，向绑定在target上的缓存区对象中写入数据data
   * 参数：
   *  target：gl.ARRAY_BUFFER或gl.ELEMENT_ARRAY_BUFFER
   *  data:写入缓存区对象的数据（类型化数组）
   *  usage：表示程序将如何使用缓存存储在缓存区对象中的数据。该参数
   *      将帮组WebGL优化操作，但是就算你传入了错误的值，也不会终止
   *      程序（仅仅是降低程序的效率）
   *      gl.STATIC_DRAW：只会向缓存区对象中写入一次数据，但需要绘制很多次
   *      gl.STREAM_DRAM:只会向缓存区对象中写入一次数据，然后绘制若干次
   *      gl.DYNAMIC_DRAM:会向缓存区对象中多次写入数据，并绘制很多次
   * 返回值：无
   * 错误：
   *  INVALID_ENUM:target不是上述值之一，这时将保持原有的绑定情况不变
   */
  // 3.向缓存区对象写入数据
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  // Get the storage location of a_Position
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  /**
   * 4.将缓存区对象分配给a_Position变量
   * gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
   * 将绑定到gl.ARRAY_BUFFER上的缓存区对象分配给由location指定的attribute变量
   * 参数：
   *  location：指定待分配attribute变量的存储位置
   *  size：指定缓存区中每个顶点的分量个数（1到4）。若size比attribute变量需要的分量数少，缺失分量
   *      将按照与vertexAttrib[1234]f（）相同的规则补全。
   *  type:用以下类型之一来指定格式
   *      gl.UNSIGNED_BYTE:无符号字节，Unit8Array
   *      gl.SHORT:短整型，Int16Array
   *      gl.UNSIGNED_SHORT:无符号短整型，Unit16Array
   *      gl.INT:无符号整型，Int16Array
   *      gl.UNSIGNED_INT:无符号整型，Unit16Array
   *      gl.FLOAT:浮点型，Float32Array
   *  normalize：
   *      传入true或false，表明是否将非浮点型的数据归一化到[0,1]或[-1,1]区间
   *  stride：指定相邻两个顶点的字节数，默认为0
   *  offset：指定缓存区对象中的偏移量（以字节为单位），即attribute变量从缓存区中的何处开始储存，
   *      如果是起始位置开始的，offset设置为0
   * 返回值：无
   * 错误：
   *      INVALID_OPERATION:程序对象未能成功连接（没有当前program对象）
   *      INVALID_VALUE：location大于等于attribute变量名的最大数目（默认为8），或则stride或
   *          offset是负值
   */
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  /**
   * 5.连接a_Position变量与分配给它的缓存区对象
   * gl.enableVertexAttribArray(location)
   * 参数：
   *  开启location指定的attribute变量
   * 返回值：无
   * 错误：
   *  INVALID_VALUE：location大于等于attribute变量名的最大数目（默认为8）
   */
  gl.enableVertexAttribArray(a_Position);

  return n;
}
