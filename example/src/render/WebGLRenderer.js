/**
 * 渲染器
 * @param options
 *  canvas:画布,
 *  stencil:模板缓存
 *  alpha:透明
 *  depth:深度
 *  antialias：抗锯齿
 *  enableWebGL2: 是否启用webgl2
 * @constructor
 */
import {WebGLUntil} from "../WebGLUntil.js";
import Matrix4 from "../math/Matrix4.js";

let WebGLRenderer = function(options) {

  options = options || {};
  var _canvas = options.canvas;
  var _stencil = options.stencil !== undefined ? options.stencil : false;
  var _alpha = options.alpha !== undefined ? options.alpha : false;
  var _depth = options.depth !== undefined ? options.depth : true;
  var _antialias = options.antialias !== undefined ? options.antialias : false;
  var _enableWebGL2 = options.enableWebGL2 !== undefined ? options.enableWebGL2 : false;

  var webGLUntil = new WebGLUntil(_enableWebGL2);

  var _gl = getContext(_canvas);

  /**
   * 获取上下文
   * @param canvas 画布
   * @returns {*}
   * @param canvas
   * @returns {CanvasRenderingContext2D|WebGLRenderingContext}
   */
  function getContext(canvas) {
    // 获取上下文参数
    var params = {
      alpha: _alpha,
      depth: _depth,
      stencil: _stencil,
      antialias: _antialias
    };

    return webGLUntil.getWebGLContext(canvas, params);
  }

  /**
   * 获取上下文
   */
  this.getContext = function() {
    return _gl;
  };

  /**
   * 设置视口
   */
  this.setViewport = function() {
    _gl.viewport(0, 0, _canvas.width, _canvas.height);
  };

  /**
   * 设置清空颜色
   */
  this.setClearColor = function() {
    _gl.clearColor(0.0, 0.0, 0.0, 1.0);
  };

  /**
   * 渲染几何体
   * @param geometry
   * @param camera 相机
   */
  this.render = function(geometry, camera) {

    var gl = this.getContext();
    // 创建缓存区对象
    var vertexColorBuffer = gl.createBuffer();
    var indexBuffer = gl.createBuffer();

    // 将顶点坐标和颜色坐标写入缓存区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry.attributes.vertices, gl.STATIC_DRAW);

    var FSIZE = geometry.attributes.vertices.BYTES_PER_ELEMENT;

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

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.attributes.indexes, gl.STATIC_DRAW);

    // 设置<canvas>背景色，并开启隐藏面消除
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    /** 获取变量的存储地址 **/
      // Get the storage location of u_MvpMatrix
    var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
    if (!u_MvpMatrix) {
      console.log('Failed to get the storage location of u_MvpMatrix');
      return;
    }

    /** 设置视点和可视空间 **/
    var mvpMatrix = new Matrix4();
    mvpMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    /** 设置视点和可视空间 **/
    // var mvpMatrix = new Matrix4();
    // mvpMatrix.setPerspective(30, _canvas.width / _canvas.height, 1, 100);
    // mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);

    //将视图矩阵和投影矩阵传递给变量
    gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

    //清空颜色缓存区和深度缓存区
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0); // 绘制图形
  }
};
Object.assign(WebGLRenderer.prototype, {});

export default WebGLRenderer;