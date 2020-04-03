import {PGL} from "../../built/PGL.js";
import {WebGLUniforms} from "./WebGLUniforms.js";

/**
 * 获取精度
 * @param parameters
 * @returns {string}
 */
function generatePrecision(parameters) {

  var precisionstring = "precision " + parameters.precision + " float;\nprecision " + parameters.precision + " int;";

  if (parameters.precision === "highp") {
    precisionstring += "\n#define HIGH_PRECISION";
  } else if (parameters.precision === "mediump") {
    precisionstring += "\n#define MEDIUM_PRECISION";
  } else if (parameters.precision === "lowp") {
    precisionstring += "\n#define LOW_PRECISION";
  }
  return precisionstring;
}

/**
 * 过滤空字符串
 * @param string
 * @returns {boolean}
 */
function filterEmptyLine(string) {
  return string !== '';
}

var includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;

/**
 * 替换引入的文件
 * @param string
 * @returns {void | never}
 */
function resolveIncludes(string) {
  return string.replace(includePattern, includeReplacer);
}

function includeReplacer(match, include) {

  var string = ShaderChunk[include];
  if (string === undefined) {
    throw new Error('Can not resolve #include <' + include + '>');
  }

  return resolveIncludes(string);
}

/**
 * 替换灯的数量
 * @param string
 * @param parameters
 * @return {string}
 */
function replaceLightNums(string, parameters) {

  return string
  .replace(/NUM_DIR_LIGHTS/g, parameters.numDirLights) // 替换平行光的数量
  .replace(/NUM_SPOT_LIGHTS/g, parameters.numSpotLights)
  .replace(/NUM_RECT_AREA_LIGHTS/g, parameters.numRectAreaLights)
  .replace(/NUM_POINT_LIGHTS/g, parameters.numPointLights)
  .replace(/NUM_HEMI_LIGHTS/g, parameters.numHemiLights);

}

// Unroll Loops
var loopPattern = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;

/**
 *
 * @param string
 * @return {string | void}
 */
function unrollLoops(string) {
  return string.replace(loopPattern, loopReplacer);
}

function loopReplacer(match, start, end, snippet) {

  var string = '';

  for (var i = parseInt(start); i < parseInt(end); i++) {

    string += snippet
    .replace(/\[ i \]/g, '[ ' + i + ' ]')
    .replace(/UNROLLED_LOOP_INDEX/g, i);

  }

  return string;

}

/**
 * 获取Attribute属性对应的存储地址
 * @param gl
 * @param program
 * @return {{}}
 */
function fetchAttributeLocations(gl, program) {

  var attributes = {};

  var n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

  for (var i = 0; i < n; i++) {

    var info = gl.getActiveAttrib(program, i);
    var name = info.name;

    // console.log( 'THREE.WebGLProgram: ACTIVE VERTEX ATTRIBUTE:', name, i );

    attributes[name] = gl.getAttribLocation(program, name);

  }

  return attributes;

}

/**
 * 着色器程序
 * @param renderer 渲染器
 * @param cacheKey
 * @param parameters
 * @returns {WebGLProgram}
 * @constructor
 */
function WebGLProgram(renderer, cacheKey, parameters) {
  var gl = renderer.context;

  var vertexShader = parameters.vertexShader;
  var fragmentShader = parameters.fragmentShader;

  var program = gl.createProgram();

  var prefixVertex, prefixFragment;

  if (parameters.isRawShaderMaterial) {
  } else {

    prefixVertex = [

      generatePrecision(parameters), // 设置精度

      '#define SHADER_NAME ' + parameters.shaderName,

      parameters.map ? '#define USE_MAP' : '',

      parameters.vertexColors ? '#define USE_COLOR' : '', // 启用顶点颜色

      'uniform mat4 modelViewMatrix;',
      'uniform mat4 projectionMatrix;',
      'uniform mat4 viewMatrix;',
      'uniform mat3 normalMatrix;',

      'attribute vec4 position;',
      'attribute vec3 normal;',
      'attribute vec2 uv;',

      // 添加颜色变量
      '#ifdef USE_COLOR',
      '	attribute vec3 color;',
      '#endif',

      '\n'

    ].filter(filterEmptyLine).join('\n');

    prefixFragment = [

      generatePrecision(parameters),

      '#define SHADER_NAME ' + parameters.name,

      parameters.map ? '#define USE_MAP' : '',

      parameters.vertexColors ? '#define USE_COLOR' : '', // 顶点颜色

      'uniform mat4 viewMatrix;', // 视图矩阵

      '\n'

    ].filter(filterEmptyLine).join('\n');

  }

  vertexShader = resolveIncludes(vertexShader);

  // 替换代表灯的数字
  fragmentShader = replaceLightNums(fragmentShader, parameters);
  fragmentShader = unrollLoops(fragmentShader);

  var vertexGlsl = prefixVertex + vertexShader;
  var fragmentGlsl = prefixFragment + fragmentShader;

  // 创建着色器
  var glVertexShader = PGL.WebGLShader(gl, gl.VERTEX_SHADER, vertexGlsl, true);
  var glFragmentShader = PGL.WebGLShader(gl, gl.FRAGMENT_SHADER, fragmentGlsl, true);

  gl.attachShader(program, glVertexShader);
  gl.attachShader(program, glFragmentShader);

  gl.linkProgram(program);

  gl.deleteShader(glVertexShader);
  gl.deleteShader(glFragmentShader);

  // set up caching for uniform locations
  var cachedUniforms;

  /**
   * 获取uniform变量的地址
   * @return {*}
   */
  this.getUniforms = function() {
    if (cachedUniforms === undefined) {
      cachedUniforms = new WebGLUniforms(gl, program);
    }
    return cachedUniforms;
  };

  // set up caching for attribute locations
  var cachedAttributes;

  /**
   * 获取Attribute的存储地址
   * @return {*}
   */
  this.getAttributes = function() {
    if (cachedAttributes === undefined) {
      cachedAttributes = fetchAttributeLocations(gl, program);
    }
    return cachedAttributes;
  };

  this.program = program;
  this.vertexShader = glVertexShader;
  this.fragmentShader = glFragmentShader;

  return this;
};

export {WebGLProgram};