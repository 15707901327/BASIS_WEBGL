import {WebGLLights} from "./WebGLLights.js";

/**
 * Webgl渲染状态
 * @returns {{init: init, pushLight: pushLight, pushShadow: pushShadow, state: {shadowsArray: Array, lightsArray: Array, lights: {setup, state}}, setupLights: setupLights}}
 * @constructor
 */
function WebGLRenderState() {

  var lights = new WebGLLights();

  var lightsArray = []; // 场景灯光
  var shadowsArray = []; // 贴图灯光

  function init() {

    lightsArray.length = 0;
    shadowsArray.length = 0;

  }

  function pushLight(light) {
    lightsArray.push(light);
  }

  function pushShadow(shadowLight) {
    shadowsArray.push(shadowLight);
  }

  /**
   * 设置灯光
   * @param camera
   */
  function setupLights(camera) {
    lights.setup(lightsArray, shadowsArray, camera);
  }

  var state = {
    lightsArray: lightsArray,
    shadowsArray: shadowsArray,

    lights: lights
  };

  return {
    init: init,
    state: state,
    setupLights: setupLights,

    pushLight: pushLight,
    pushShadow: pushShadow
  };

};

/**
 * WebGL渲染状态管理
 * @returns {{get: (function(*, *): WebGLRenderState), dispose: dispose}}
 * @constructor
 */
function WebGLRenderStates() {

  var renderStates = {};

  function onSceneDispose(event) {

    var scene = event.target;

    scene.removeEventListener('dispose', onSceneDispose);

    delete renderStates[scene.id];

  }

  function get(scene, camera) {

    var renderState;

    if (renderStates[scene.id] === undefined) {

      renderState = new WebGLRenderState();
      renderStates[scene.id] = {};
      renderStates[scene.id][camera.id] = renderState;

      // scene.addEventListener( 'dispose', onSceneDispose );

    } else {

      if (renderStates[scene.id][camera.id] === undefined) {

        renderState = new WebGLRenderState();
        renderStates[scene.id][camera.id] = renderState;

      } else {

        renderState = renderStates[scene.id][camera.id];

      }

    }

    return renderState;

  }

  function dispose() {

    renderStates = {};

  }

  return {
    get: get,
    dispose: dispose
  };

};

export {WebGLRenderState, WebGLRenderStates}