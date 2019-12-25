/**
 * webgl辅助方法
 * @returns {{isWebGL2: boolean, getWebGLContext: (function(*, *=): (CanvasRenderingContext2D|WebGLRenderingContext|CanvasRenderingContext2D|WebGLRenderingContext))}}
 * @constructor
 */
let WebGLUntil = function() {

  var isWebGL2 = false;

  /**
   * 获取上下文
   * @param canvas
   * @param params
   * @returns {{gl: (*|CanvasRenderingContext2D|WebGLRenderingContext), isWebGL2: boolean}}
   */
  function getWebGLContext(canvas, params) {
    var context = canvas.getContext('webgl2', params);
    isWebGL2 = !!context;

    if (!isWebGL2) {
      // 获取webgl关键字
      var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
      for (let ii = 0; ii < names.length; ++ii) {
        try{
          context = canvas.getContext(names[ii], params);
        }catch(e){
        }
        if (context) {
          break;
        }
      }
    }

    return context;
  }

  /**
   *
   * @returns {boolean}
   */
  function getIsWebGL2() {
    return isWebGL2;
  }

  return {
    getWebGLContext: getWebGLContext,
    getIsWebGL2: getIsWebGL2
  }
};

export {WebGLUntil}