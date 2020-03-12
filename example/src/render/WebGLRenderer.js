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

let WebGLRenderer = function(options) {

  options = options || {};
  var _canvas = options.canvas;
  var _stencil = options.stencil !== undefined ? options.stencil : false;
  var _alpha = options.alpha !== undefined ? options.alpha : false;
  var _depth = options.depth !== undefined ? options.depth : false;
  var _antialias = options.antialias !== undefined ? options.antialias : false;
  var _enableWebGL2 = options.enableWebGL2 !== undefined ? options.enableWebGL2 : true;

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
};
Object.assign(WebGLRenderer.prototype, {});

export default WebGLRenderer;