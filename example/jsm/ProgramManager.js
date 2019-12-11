/**
 * 创建着色器程序
 * @constructor
 */
function ProgramManager() {
}

Object.assign(ProgramManager.prototype, {
  /**
   * 初始化shader
   * @param gl
   * @param vshader
   * @param fshader
   */
  initShaders: function(gl, vshader, fshader) {
    var program = this.createProgram(gl, vshader, fshader);
    if (!program) {
      console.log('Failed to create program');
      return false;
    }

    gl.useProgram(program);
    gl.program = program;

    return true;
  },

  /**
   * 创建程序对象
   * @param gl
   * @param vshader 顶点着色器代码
   * @param fshader 片源着色器代码
   * @returns {null|*|WebGLProgram}
   */
  createProgram: function(gl, vshader, fshader) {
    // 创建着色器对象
    var vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vshader);
    var fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fshader);
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
  },

  /**
   * 创建shader
   * @param gl 上下文
   * @param type 类型
   * @param source 代码
   * @returns {null|*|WebGLShader}
   */
  loadShader: function(gl, type, source) {
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
});

export default ProgramManager;