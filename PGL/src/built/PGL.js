// 定义常量
var PGL = {
	REVISION: 1 // 版本
};

/**
 * WebGL渲染器
 * 1. 获取绘画的上下文
 * @param parameters
 *  _canvas:画布
 *  _context:上下文
 * @return {*}
 * @constructor
 */
PGL.WebGLRenderer = function (parameters) {

	console.log('PGL.WebGLRenderer', PGL.REVISION);

	parameters = parameters || {};
	var _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas'),
		_context = parameters.context !== undefined ? parameters.context : null;

	// public properties
	this.domElement = _canvas;

	// Get the rendering context for WebGL
	var _gl = getWebGLContext();
	if (!_gl) return null;

	var state = new PGL.WebGLState(_gl);

	// 渲染物体
	this.render = function () {
	};

	// 获取上下文
	this.getContext = function () {
		return _gl;
	};

	this.clearColor = function () {
		_gl.clear(_gl.COLOR_BUFFER_BIT);
	};

	// 设置背景颜色
	this.setClearColor = function () {
		WebGLState.setClearColor.apply(WebGLState, arguments);
	};

	/**
	 * 获取上下文
	 * @return {*|CanvasRenderingContext2D|WebGLRenderingContext}
	 * @private
	 */
	function getWebGLContext() {
		try {
			var gl = _context || _canvas.getContext('webgl') || _canvas.getContext('experimental-webgl');
			if (gl === null) {
				if (_canvas.getContext('webgl') !== null) {
					throw new Error('Error creating WebGL context with your selected attributes.');
				} else {
					throw new Error('Error creating WebGL context.');
				}
			}

			// Some experimental-webgl implementations do not have getShaderPrecisionFormat
			if (gl.getShaderPrecisionFormat === undefined) {
				gl.getShaderPrecisionFormat = function () {
					return {'rangeMin': 1, 'rangeMax': 1, 'precision': 1};
				};
			}

			return gl;
		} catch (error) {
			console.error('THREE.WebGLRenderer: ' + error.message);
		}
	}
};

/**
 * WebGL的相关状态
 * @param gl
 * @constructor
 */
PGL.WebGLState = function (gl) {
	// 缓存区清空颜色
	var currentColor = new PGL.Vector4(1, 1, 1, 1);

	function setClearColor(color, alpha) {}

	// 设置背景颜色
	gl.clearColor(currentColor.x, currentColor.y, currentColor.z, currentColor.w);
};