/**
 * 渲染器
 * @param options
 *  canvas:画布
 * @constructor
 */
let WebGLRenderer = function(options) {

  options = options || {};
  var _canvas = options.canvas;

  var _gl = getContext(_canvas);

  /**
   * 获取上下文
   * @param canvas 画布
   * @returns {*}
   */
  function getContext(canvas) {
    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var context = null;
    for (var ii = 0; ii < names.length; ++ii) {
      try{
        context = canvas.getContext(names[ii], {stencil: true});//{stencil: true}
      }catch(e){
      }
      if (context) {
        break;
      }
    }
    return context;
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