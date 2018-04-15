// 顶点着色器程序
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' + //设置坐标
  '  gl_PointSize = 10.0;\n' + //设置尺寸
  '}\n'; 

// 片元着色器
var FSHADER_SOURCE = 
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

/**
 * 函数的执行流程
 * 1.获取canvas元素
 * 2.获取WebGL绘图的上下文
 * 3.初始化着色器
 * 4.设置背景色
 * 5.清空<canvas>
 * 6.绘图
 */
function main() {
  var canvas = document.getElementById('webgl');

  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  /**
   * 初始化着色器
   * initShaders(gl,vshader,fshader)
   * 在WebGL系统内部建立和初始化着色器
   * 参数：
   *  gl：指定渲染的上下文
   *  vshader：指定顶点着色器程序代码（字符串）
   *  fshader：指定片元着色器程序代码（字符串）
   * 返回值：
   *  true：初始化着色器成功
   *  false：初始化着色器失败
   */
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // 获取attribute变量的存储位置
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
      console.log("Failed to get the storage location of a_position");
      return;
  }

  // 将顶点的位置传输给attribute变量
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);

  // 设置<canvas>的背景
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空<canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
    
  /**
   * 绘制一个点
   * gl.drawArrays(mode, first, count)
   * 执行顶点着色器，按照mode参数指定的方式绘制图形
   * 参数：
   *  mode：指定绘制的方式，可以接收一下常量符号：gl_POINTS,
   *    gl_LINES,gl_LINE_STRIP,gl_LINE_LOOP,gl_TRIANGLES,gl_TRIANGLE_STRIP,
   *    gl_TRIANGLE_FAN
   *  first:指定从那个顶点开始绘制
   *  count：指定绘制需要用到多少个顶点（整形数）
   * 返回值：无
   * 错误：
   *  INVALID_ENUM：传入的mode参数不是前述参数之一
   *  INVALID_VALUE：参数first或count是负数
   */
  gl.drawArrays(gl.POINTS, 0, 1);
}
