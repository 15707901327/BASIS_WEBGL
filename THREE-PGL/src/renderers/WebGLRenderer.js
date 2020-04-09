import {Matrix4} from "../math/Matrix4.js";
import {Vector3} from "../math/Vector3.js";
import {WebGLUniforms} from "./webgl/WebGLUniforms.js";
import {PGL} from "../built/PGL.js";

/**
 * WebGL渲染器
 * 1. 获取绘画的上下文
 * @param parameters
 *  _canvas:画布
 *  _context:上下文
 * @return {*}
 * @constructor
 */
function WebGLRenderer(parameters) {

  console.log('PGL.WebGLRenderer', PGL.REVISION);

  parameters = parameters || {};
  var _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas'),
    _context = parameters.context !== undefined ? parameters.context : null,

    _alpha = parameters.alpha !== undefined ? parameters.alpha : false,
    _depth = parameters.depth !== undefined ? parameters.depth : true,
    _stencil = parameters.stencil !== undefined ? parameters.stencil : true,
    _antialias = parameters.antialias !== undefined ? parameters.antialias : false,
    _premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
    _preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false,
    _powerPreference = parameters.powerPreference !== undefined ? parameters.powerPreference : 'default';

  var currentRenderState = null; // 当前渲染状态
  var currentRenderList = null;  // 当前渲染列表

  // public properties
  this.domElement = _canvas;
  this.context = null;

  // clearing
  this.autoClear = true;
  this.autoClearColor = true;
  this.autoClearDepth = true;
  this.autoClearStencil = true;

  // scene graph
  this.sortObjects = true;

  var _this = this,
    // 标记丢失上下文
    _isContextLost = false,

    _currentCamera = null, // 当前渲染相机

    // 使用贴图的通道
    _usedTextureUnits = 0,

    // frustum
    _frustum = new PGL.Frustum(),

    // camera matrices cache
    _projScreenMatrix = new Matrix4(),

    _vector3 = new Vector3(); //

  var _gl;
  try{

    var contextAttributes = {
      alpha: _alpha,
      depth: _depth,
      stencil: _stencil,
      antialias: _antialias,
      premultipliedAlpha: _premultipliedAlpha,
      preserveDrawingBuffer: _preserveDrawingBuffer,
      powerPreference: _powerPreference
    };

    // event listeners must be registered before WebGL context is created, see #12753

    _canvas.addEventListener('webglcontextlost', onContextLost, false);
    _canvas.addEventListener('webglcontextrestored', onContextRestore, false);

    _gl = _context || _canvas.getContext('webgl', contextAttributes) || _canvas.getContext('experimental-webgl', contextAttributes);

    if (_gl === null) {
      if (_canvas.getContext('webgl') !== null) {
        throw new Error('Error creating WebGL context with your selected attributes.');
      } else {
        throw new Error('Error creating WebGL context.');
      }
    }

    // Some experimental-webgl implementations do not have getShaderPrecisionFormat
    if (_gl.getShaderPrecisionFormat === undefined) {
      _gl.getShaderPrecisionFormat = function() {
        return {'rangeMin': 1, 'rangeMax': 1, 'precision': 1};
      };
    }
  }catch(error){
    console.error('THREE.WebGLRenderer: ' + error.message);
    throw error;
  }

  var extensions, capabilities, state, info;
  var properties, textures, attributes, geometries, objects;
  var programCache, renderLists, renderStates;

  var background, bufferRenderer, indexedBufferRenderer;
  var utils;

  function initGLContext() {

    // 保存当前WebGL开启的扩展功能
    extensions = new PGL.WebGLExtensions(_gl);

    // 获取当前webgl的基础属性
    capabilities = new PGL.WebGLCapabilities(_gl, extensions, parameters);

    utils = new PGL.WebGLUtils(_gl, extensions, capabilities);

    state = new PGL.WebGLState(_gl, extensions, utils, capabilities);

    info = new PGL.WebGLInfo(_gl);
    properties = new PGL.WebGLProperties();
    textures = new PGL.WebGLTextures(_gl, extensions, state, properties, capabilities, utils, info);
    attributes = new PGL.WebGLAttributes(_gl);
    geometries = new PGL.WebGLGeometries(_gl, attributes, info);
    objects = new PGL.WebGLObjects(geometries, info);

    programCache = new PGL.WebGLPrograms(_this, extensions, capabilities);
    renderLists = new PGL.WebGLRenderLists();
    renderStates = new PGL.WebGLRenderStates();

    background = new PGL.WebGLBackground(_this, state);

    indexedBufferRenderer = new PGL.WebGLIndexedBufferRenderer(_gl, extensions, info, capabilities);
    bufferRenderer = new PGL.WebGLBufferRenderer(_gl, extensions, info, capabilities);

    _this.context = _gl;
    _this.capabilities = capabilities;
    _this.extensions = extensions;
    _this.properties = properties;
    _this.renderLists = renderLists;
    _this.state = state;
    _this.info = info;
  }

  initGLContext();

  // API

  // 获取上下文
  this.getContext = function() {
    return _gl;
  };

  // Clearing

  // 设置背景颜色
  this.setClearColor = function() {
    background.setClearColor.apply(background, arguments);
  };

  /**
   * 根据参数清空颜色缓存区、深度缓存区、模版缓存区
   * @param color
   * @param depth
   * @param stencil
   */
  this.clear = function(color, depth, stencil) {

    var bits = 0;

    if (color === undefined || color) bits |= _gl.COLOR_BUFFER_BIT;
    if (depth === undefined || depth) bits |= _gl.DEPTH_BUFFER_BIT;
    if (stencil === undefined || stencil) bits |= _gl.STENCIL_BUFFER_BIT;

    _gl.clear(bits);

  };

  this.clearColor = function() {

    this.clear(true, false, false);

  };

  this.clearDepth = function() {

    this.clear(false, true, false);

  };

  this.clearStencil = function() {

    this.clear(false, false, true);

  };

  // Events

  /**
   * 丢失上下文
   * @param event
   */
  function onContextLost(event) {
    event.preventDefault();
    console.log('THREE.WebGLRenderer: Context Lost.');
    _isContextLost = true;
  }

  /**
   * 恢复上下文，初始化之前的参数
   */
  function onContextRestore(/* event */) {
    console.log('THREE.WebGLRenderer: Context Restored.');

    _isContextLost = false;

    initGLContext();
  }

  /**
   * 渲染缓存区
   */
  this.renderBufferDirect = function(camera, scene, geometry, material, object, group) {

    // 控制缠绕方向 true 反转缠绕方向
    var frontFaceCW = (object.isMesh && object.matrixWorld.determinant() < 0);

    var program = setProgram(camera, scene, material, object);

    // 根据材质设置绘制图形的方式（剔除、缠绕方向、混合、偏移）
    state.setMaterial(material, frontFaceCW);

    var updateBuffers = true;

    var index = geometry.index;
    var position = geometry.attributes.position;

    var attribute;
    var renderer = bufferRenderer;

    if (index !== null) {

      attribute = attributes.get(index);

      renderer = indexedBufferRenderer;
      renderer.setIndex(attribute);
    }

    // 着色器关联顶点属性
    if (updateBuffers) {
      // 设置顶点相关信息
      setupVertexAttributes(object, geometry, material, program);

      if (index !== null) {
        _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, attribute.buffer);
      }
    }

    var dataCount = (index !== null) ? index.count : position.count;

    if (object.isMesh) {
      switch(object.drawMode){
        case PGL.TrianglesDrawMode:
          renderer.setMode(_gl.TRIANGLES);
          break;
        case PGL.TriangleStripDrawMode:
          renderer.setMode(_gl.TRIANGLE_STRIP);
          break;
        case PGL.TriangleFanDrawMode:
          renderer.setMode(_gl.TRIANGLE_FAN);
          break;
      }
    } else if (object.isPoints) {
      renderer.setMode(_gl.POINTS);
    }

    renderer.render(0, dataCount);
  };

  /**
   * 设置顶点属性
   * @param object 对象
   * @param material 材质
   * @param program 着色器
   * @param geometry 几何体
   */
  function setupVertexAttributes(object, geometry, material, program) {

    state.initAttributes();

    var geometryAttributes = geometry.attributes;

    var programAttributes = program.getAttributes();

    var materialDefaultAttributeValues = material.defaultAttributeValues;

    for (var name in programAttributes) {

      var programAttribute = programAttributes[name];

      if (programAttribute >= 0) {
        var geometryAttribute = geometryAttributes[name];

        if (geometryAttribute !== undefined) {
          var normalized = geometryAttribute.normalized;
          var size = geometryAttribute.itemSize;

          var attribute = attributes.get(geometryAttribute);

          if (attribute === undefined) continue;

          var buffer = attribute.buffer;
          var type = attribute.type;
          var bytesPerElement = attribute.bytesPerElement;

          state.enableAttribute(programAttribute);

          _gl.bindBuffer(_gl.ARRAY_BUFFER, buffer);
          _gl.vertexAttribPointer(programAttribute, size, type, normalized, 0, 0);
        } else if (materialDefaultAttributeValues !== undefined) {
          var value = materialDefaultAttributeValues[name];

          switch(value.length){
            case 3:
              _gl.vertexAttrib3fv(programAttribute, value);
              break;
            case 4:
              _gl.vertexAttrib4fv(programAttribute, value);
              break;
            default:
              _gl.vertexAttrib1fv(programAttribute, value)
          }
        }
      }
    }
  }

  /**
   * 循环渲染物体
   * @param scene 场景
   * @param camera 相机
   */
  this.render = function(scene, camera) {

    // 检查相机
    if (!(camera && camera.isCamera)) {
      console.error('THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.');
      return;
    }

    var forceClear;

    // 判断是否强制刷新缓冲区
    if (arguments[3] !== undefined) {
      console.warn('PGL.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead.');
      forceClear = arguments[3];
    }

    // 检查是否丢失上下文
    if (_isContextLost) return;

    // update scene graph 更新对象的位置矩阵
    if (scene.autoUpdate === true) scene.updateMatrixWorld();

    // 更新相机矩阵和视锥
    if (camera.parent === null) camera.updateMatrixWorld();

    // 获取当前渲染状态
    currentRenderState = renderStates.get(scene, camera);
    currentRenderState.init();

    // 投影矩阵 * 视图矩阵
    _projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    // 设置视锥体
    _frustum.setFromMatrix(_projScreenMatrix);

    // 初始化渲染列表
    currentRenderList = renderLists.get(scene, camera);
    currentRenderList.init();

    projectObject(scene, camera, 0, _this.sortObjects);

    var opaqueObjects = currentRenderList.opaque;

    // 设置灯光
    currentRenderState.setupLights(camera);

    if (this.info.autoReset) this.info.reset();

    // 渲染背景
    background.render(currentRenderList, scene, camera, forceClear);

    if (scene.overrideMaterial) {
    } else {
      // opaque pass (front-to-back order)
      if (opaqueObjects.length) renderObjects(opaqueObjects, scene, camera);
    }

    // Ensure depth buffer writing is enabled so it can be cleared on next render

    state.buffers.depth.setTest(true);

    state.setPolygonOffset(false);

  };

  /**
   * 拆分渲染对象，解析几何体、以及几何体中的attribute变量
   * @param object
   * @param camera
   * @param groupOrder
   * @param sortObjects
   */
  function projectObject(object, camera, groupOrder, sortObjects) {
    if (object.visible === false) return;

    // 根据相机判断是否显示模型
    var visible = object.layers.test(camera.layers);

    if (visible) {
      if (object.isLight) {
        currentRenderState.pushLight(object);
        if (object.castShadow) {
          currentRenderState.pushShadow(object);
        }
      }
      if (object.isPoints || object.isMesh) {

        // 检查物体是否在平截头体内
        if (!object.frustumCulled || _frustum.intersectsObject(object)) {

          if (sortObjects) {
            _vector3.setFromMatrixPosition(object.matrixWorld)
            .applyMatrix4(_projScreenMatrix);
          }

          // 获取bufferGeometry 获取缓存区
          var geometry = objects.update(object);
          var material = object.material;

          if (Array.isArray(material)) {
          } else if (material.visible) {
            currentRenderList.push(object, geometry, material, groupOrder, _vector3.z, null);
          }
        }
      }
    }

    var children = object.children;

    for (var i = 0, l = children.length; i < l; i++) {
      projectObject(children[i], camera, groupOrder, sortObjects);
    }
  }

  /**
   * 渲染物体
   * @param renderList 渲染列表
   * @param scene 场景
   * @param camera 相机
   * @param overrideMaterial
   */
  function renderObjects(renderList, scene, camera, overrideMaterial) {
    for (var i = 0; i < renderList.length; i++) {
      var renderItem = renderList[i];

      var object = renderItem.object;
      var geometry = renderItem.geometry;
      var material = overrideMaterial === undefined ? renderItem.material : overrideMaterial;
      var group = renderItem.group;

      if (camera.isArrayCamera) {
      } else {
        renderObject(object, scene, camera, geometry, material, group);
      }
    }
  }

  /**
   * 渲染单个物体,计算模型视图矩阵
   * @param object
   * @param scene
   * @param camera
   * @param geometry
   * @param material
   * @param group
   */
  function renderObject(object, scene, camera, geometry, material, group) {

    // 获取渲染状态
    currentRenderState = renderStates.get(scene, camera);

    // 计算对象的模型视图矩阵
    object.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, object.matrixWorld);
    // 获取对象的法线矩阵
    object.normalMatrix.getNormalMatrix(object.modelViewMatrix);

    if (object.isImmediateRenderObject) {
    } else {
      _this.renderBufferDirect(camera, scene, geometry, material, object, group);
    }

    currentRenderState = renderStates.get(scene, camera);
  }

  /**
   * 根据材质组件着色器字符串
   * @param material 材质
   * @param scene 场景
   * @param object 对象
   */
  function initMaterial(material, scene, object) {

    var materialProperties = properties.get(material);

    // 获取管理灯光
    var lights = currentRenderState.state.lights;

    // 获取灯光版本
    var lightsStateVersion = lights.state.version;

    // 获取参数
    var parameters = programCache.getParameters(material, lights.state, null, scene, null, null, object);
    var programCacheKey = null;

    var program = materialProperties.program;
    var programChange = true;

    // 获取shader变量、顶点着色器、片元着色器，创建着色器程序
    if (programChange) {
      program = programCache.acquireProgram(parameters, programCacheKey);

      materialProperties.program = program;
      materialProperties.uniforms = parameters.uniforms;
      materialProperties.environment = material.isMeshStandardMaterial ? scene.environment : null;
      materialProperties.outputEncoding = _this.outputEncoding;
      material.program = program;
    }

    // 获取uniform变量
    var uniforms = materialProperties.uniforms;

    // store the light setup it was created for
    materialProperties.needsLights = materialNeedsLights(material);
    materialProperties.lightsStateVersion = lightsStateVersion;

    // 添加灯光属性
    if (materialProperties.needsLights) {
      // wire up the material to this renderer's lighting state
      uniforms.ambientLightColor.value = lights.state.ambient;
    }

    var progUniforms = materialProperties.program.getUniforms();
    var uniformsList = WebGLUniforms.seqWithValue(progUniforms.seq, uniforms);
    materialProperties.uniformsList = uniformsList;
  }

  /**
   * 设置着色器程序
   * @param camera 相机
   * @param scene 场景
   * @param material 材质
   * @param object 对象
   */
  function setProgram(camera, scene, material, object) {

    var materialProperties = properties.get(material);
    var lights = currentRenderState.state.lights; // 获取灯光数据

    if (material.version === materialProperties.__version) {

    } else {
      initMaterial(material, scene, object);
      materialProperties.__version = material.version;
    }

    var refreshProgram = false;
    var refreshMaterial = false;

    var program = materialProperties.program,
      p_uniforms = program.getUniforms(),
      m_uniforms = materialProperties.uniforms;

    if (state.useProgram(program.program)) {
      refreshProgram = true;
      refreshMaterial = true;
    }

    // 设置相机的投影矩阵、视图矩阵
    if (refreshProgram || _currentCamera !== camera) {

      // 设置投影矩阵
      p_uniforms.setValue(_gl, 'projectionMatrix', camera.projectionMatrix);

      if (capabilities.logarithmicDepthBuffer) {
        p_uniforms.setValue(_gl, 'logDepthBufFC', 2.0 / (Math.log(camera.far + 1.0) / Math.LN2));
      }

      if (_currentCamera !== camera) {

        _currentCamera = camera;

        // lighting uniforms depend on the camera so enforce an update
        // now, in case this material supports lights - or later, when
        // the next material that does gets activated:

        refreshMaterial = true;		// set to true on material change
        // refreshLights = true;		// remains set until update done
      }

      // load material specific uniforms
      // (shader material also gets them for the sake of genericity)

      if (material.isMeshPhongMaterial) {
        var uCamPos = p_uniforms.map.cameraPosition;
        if (uCamPos !== undefined) {
          uCamPos.setValue(_gl, _vector3.setFromMatrixPosition(camera.matrixWorld));
        }
      }

      if (material.isMeshPhongMaterial) {

        // 设置视图矩阵
        p_uniforms.setValue(_gl, 'viewMatrix', camera.matrixWorldInverse);
      }
    }

    if (refreshMaterial) {
      // 获取unform变量地址
      if (material.isMeshBasicMaterial) {
        refreshUniformsCommon(m_uniforms, material);
      } else if (object.material.isMeshPhongMaterial) {
        refreshUniformsCommon(m_uniforms, material);
        refreshUniformsPhong(m_uniforms, material);
      } else if (object.material.isPointsMaterial) {
        // 更新uniform相关变量
        refreshUniformsPoints(m_uniforms, material);
      }

      // 将uniforms变量传送给着色器
      WebGLUniforms.upload(_gl, materialProperties.uniformsList, m_uniforms, textures);
    }

    p_uniforms.setValue(_gl, 'modelViewMatrix', object.modelViewMatrix);
    p_uniforms.setValue(_gl, 'normalMatrix', object.normalMatrix);

    return program;
  }

  /**
   * 更新uniforms属性
   * @param uniforms
   * @param material
   */
  function refreshUniformsCommon(uniforms, material) {
    if (material.color) {
      uniforms.diffuse.value = material.color;
    }

    if (material.emissive) {
      uniforms.emissive.value.copy(material.emissive).multiplyScalar(material.emissiveIntensity);
    }

    if (material.map) {
      uniforms.map.value = material.map;
    }
  }

  /**
   * 设置高亮材质uniform属性
   * @param uniforms
   * @param material
   */
  function refreshUniformsPhong(uniforms, material) {
  }

  function refreshUniformsPoints(uniforms, material) {
    uniforms.diffuse.value = material.color;
    uniforms.size.value = material.size;
  }

  function materialNeedsLights(material) {

    return material.isMeshLambertMaterial || material.isMeshToonMaterial || material.isMeshPhongMaterial ||
      material.isMeshStandardMaterial || material.isShadowMaterial ||
      (material.isShaderMaterial && material.lights === true);

  }

  // Textures

  // 分配纹理单元
  function allocTextureUnit() {

    var textureUnit = _usedTextureUnits;

    if (textureUnit >= capabilities.maxTextures) {
      console.warn('THREE.WebGLRenderer: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + capabilities.maxTextures);
    }

    _usedTextureUnits += 1;

    return textureUnit;
  }

  this.allocTextureUnit = allocTextureUnit;

  // this.setTexture2D = setTexture2D;
  this.setTexture2D = (function() {

    var warned = false;

    // backwards compatibility: peel texture.texture
    /**
     * texture
     * slot：纹理通道
     */
    return function setTexture2D(texture, slot) {
      if (texture && texture.isWebGLRenderTarget) {
        if (!warned) {
          console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead.");
          warned = true;
        }
        texture = texture.texture;
      }
      textures.setTexture2D(texture, slot);
    };
  }());
};

export {WebGLRenderer};