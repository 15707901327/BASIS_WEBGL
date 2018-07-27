// cuon-utils.js (c) 2012 kanda and matsuda
/**
 * 在WebGL系统内部建立和初始化着色器 （Create a program object and make current）
 *  1. 创建着色器对象（gl.createShader）
 *  2. 向着色器对象中填充着色器程序的源代码(gl.shaderSource())
 *  3. 编译着色器(gl.compileShader())
 *  4. 创建程序对象(gl.createProgram())
 *  5. 为程序对象分配着色器(gl.attachShader())
 *  6. 链接程序对象(gl.linkProgram())
 *  7. 使用程序对象(gl.useProgram())
 * @param gl GL context 指定渲染的上下文
 * @param vshader a vertex shader program (string) 指定顶点着色器程序代码（字符串）
 * @param fshader a fragment shader program (string) 指定片元着色器程序代码（字符串）
 * @return true, if the program object was created and successfully made current (true：初始化着色器成功 false：初始化着色器失败)
 */
function initShaders(gl, vshader, fshader) {
  var program = createProgram(gl, vshader, fshader);
  if (!program) {
    console.log('Failed to create program');
    return false;
  }

  gl.useProgram(program);
  gl.program = program;

  return true;
}

/**
 * Create the linked program object (创建一个链接好的程序对象)
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return created program object, or null if the creation has failed
 */
function createProgram(gl, vshader, fshader) {
  // 创建着色器对象
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  // 创建程序对象
  var program = gl.createProgram();
  if (!program) {
    return null;
  }

  // 为程序对象分配顶点着色器和片元着色器
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // 链接着色器
  gl.linkProgram(program);

  // 检查链接
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    console.log('Failed to link program: ' + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}

/**
 * Create a shader object （创建一个编译好的着色器对象）
 * @param gl GL context
 * @param type the type of the shader object to be created
 * @param source shader program (string)
 * @return created shader object, or null if the creation has failed.
 */
function loadShader(gl, type, source) {
  // 创建着色器对象
  var shader = gl.createShader(type);
  if (shader == null) {
    console.log('unable to create shader');
    return null;
  }

  // 设置着色器的源代码
  gl.shaderSource(shader, source);

  // 编译着色器
  gl.compileShader(shader);

  // 检查着色器的编译状态
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    console.log('Failed to compile shader: ' + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/**
 * Initialize and get the rendering for WebGL
 * @param canvas <cavnas> element
 * @param opt_debug flag to initialize the context for debugging
 * @return the rendering context for WebGL
 */
/**
 * getWebGLContext（element,[,debug]）
 * 获取WebGL绘图的上下文，如果开启来debug属性，遇到错误时将在控制台显示错误消息
 * 参数：
 *  element:指定<canvas>元素
 *  debug：可选，如果设置为true，JavaScript中发生的错误将被显示在控制台上，注意，在调试结束后关闭它，
 *      否则会影响性能。
 * 返回值：
 *  non-null：WebGL绘图上下文
 *  null：WebGL不可用
 * 说明：在获取WebGL绘图上下文时，canvas.getContext()函数接收的参数，在不同的浏览器中会不同，
 *  所以使用getWebGLContext()来隐藏不同浏览器之间的差异。
 */
function getWebGLContext(canvas, opt_debug)                                                                                     {
  // Get the rendering context for WebGL
  var gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) return null;

  // if opt_debug is explicitly false, create the context for debugging
  if (arguments.length < 2 || opt_debug) {
    gl = WebGLDebugUtils.makeDebugContext(gl);
  }

  return gl;
}
