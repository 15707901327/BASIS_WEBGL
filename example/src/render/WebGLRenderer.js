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
import WebGLProgram from "../../src/render/WebGLProgram.js";
import {WebGLAttributes} from "./WebGLAttributes.js";

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
  var attributes = new WebGLAttributes(_gl);

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
   * @param mesh
   * @param camera 相机
   */
  this.render = function(mesh, camera) {

    // 更新相机矩阵
    if (camera) camera.updateMatrixWorld();

    var gl = this.getContext();

    var material = mesh.material;
    var geometry = mesh.geometry;

    // 材质着色器
    let program = new WebGLProgram();
    program.createProgram(gl, material.vertex, material.fragment);
    var programAttributes = program.getAttributes(gl);
    gl.useProgram(gl.program);

    // 几何体
    for (var name in geometry.attributes) {
      attributes.createBuffer(geometry.attributes[name]);

      var a_name = geometry.translateAttributeName(name);
      gl.vertexAttribPointer(programAttributes[a_name], 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(programAttributes[a_name]);
    }

    /*// 将纹理坐标分派给a_TexCoord，并开启它
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    if (a_Color < 0) {
      console.log('Failed to get the storage location of a_Color');
      return -1;
    }
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
    gl.enableVertexAttribArray(a_Color);  // Enable the assignment of the buffer object*/

    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.attributes.indexes, gl.STATIC_DRAW);

    // 设置<canvas>背景色，并开启隐藏面消除
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    /* /!** 获取变量的存储地址 **!/
       // Get the storage location of u_MvpMatrix
     var u_modelViewMatrix = gl.getUniformLocation(gl.program, 'modelViewMatrix');
     var u_projectionMatrix = gl.getUniformLocation(gl.program, 'projectionMatrix');

     /!** 设置视点和可视空间 **!/
     var modelMatrix = new Matrix4();
     var modelViewMatrix = new Matrix4();
     modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, modelMatrix);

     //将视图矩阵和投影矩阵传递给变量
     gl.uniformMatrix4fv(u_modelViewMatrix, false, modelViewMatrix.elements);
     gl.uniformMatrix4fv(u_projectionMatrix, false, camera.projectionMatrix.elements);*/

    //清空颜色缓存区和深度缓存区
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (geometry.attributes.indexes) {
      gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0); // 绘制图形
    } else {
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
  }
};
Object.assign(WebGLRenderer.prototype, {});

export default WebGLRenderer;