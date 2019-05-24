PGL.UniformsUtils = {

    merge: function (uniforms) {

        var merged = {};

        for (var u = 0; u < uniforms.length; u++) {
            var tmp = this.clone(uniforms[u]);
            for (var p in tmp) {
                merged[p] = tmp[p];
            }
        }
        return merged;

    },

    clone: function (uniforms_src) {

        var uniforms_dst = {};

        for (var u in uniforms_src) {

            uniforms_dst[u] = {};

            for (var p in uniforms_src[u]) {

                var parameter_src = uniforms_src[u][p];

                if (parameter_src && (parameter_src.isColor ||
                    parameter_src.isMatrix3 || parameter_src.isMatrix4 ||
                    parameter_src.isVector2 || parameter_src.isVector3 || parameter_src.isVector4 ||
                    parameter_src.isTexture)) {

                    uniforms_dst[u][p] = parameter_src.clone();

                } else if (Array.isArray(parameter_src)) {

                    uniforms_dst[u][p] = parameter_src.slice();

                } else {

                    uniforms_dst[u][p] = parameter_src;

                }

            }

        }

        return uniforms_dst;

    }

};

var points_vert =
    "attribute vec4 position;\n" +
    "uniform float size;\n" +
    "void main(){\n" +
    " gl_Position = position; //设置坐标\n" +
    " gl_PointSize = size; //设置尺寸\n" +
    "}";
var points_frag =
    "precision highp float;\n" +
    "uniform vec3 diffuse;\n" + // 必须加上精度限定
    "void main() {\n" +
    " gl_FragColor = vec4(diffuse,1.0);\n" +
    "}";

var meshphong_vert =
    "attribute vec4 position;\n" +
    "void main(){\n" +
    " vec4 mvPosition = modelViewMatrix * position; //设置坐标\n" +
    " gl_Position = mvPosition; //设置坐标\n" +
    "}";
var meshphong_frag =
    "uniform vec3 diffuse;\n" + // 必须加上精度限定
    "void main() {\n" +
    " gl_FragColor = vec4(diffuse,1.0);\n" +
    "}";
var ShaderChunk = {
    points_frag: points_frag,
    points_vert: points_vert,
    meshphong_vert: meshphong_vert,
    meshphong_frag: meshphong_frag
};
PGL.UniformsUtils = {
    merge: function (uniforms) {
        var merged = {};
        for (var u = 0; u < uniforms.length; u++) {
            var tmp = this.clone(uniforms[u]);
            for (var p in tmp) {
                merged[p] = tmp[p];
            }
        }
        return merged;
    },
    clone: function (uniforms_src) {

        var uniforms_dst = {};

        for (var u in uniforms_src) {

            uniforms_dst[u] = {};

            for (var p in uniforms_src[u]) {

                var parameter_src = uniforms_src[u][p];

                if (parameter_src && (parameter_src.isColor ||
                    parameter_src.isMatrix3 || parameter_src.isMatrix4 ||
                    parameter_src.isVector2 || parameter_src.isVector3 || parameter_src.isVector4 ||
                    parameter_src.isTexture)) {

                    uniforms_dst[u][p] = parameter_src.clone();

                } else if (Array.isArray(parameter_src)) {

                    uniforms_dst[u][p] = parameter_src.slice();

                } else {

                    uniforms_dst[u][p] = parameter_src;

                }

            }

        }

        return uniforms_dst;

    }
};
PGL.UniformsLib = {
    phone: {
        diffuse: {value: new PGL.Color(0xeeeeee)}
    },
    points: {
        size: {value: 1.0},
        diffuse: {value: new PGL.Color(0xeeeeee)}
    }
};
PGL.ShaderLib = {
    phong: {
        uniforms: PGL.UniformsUtils.merge([
            PGL.UniformsLib.phone
        ]),

        vertexShader: ShaderChunk.meshphong_vert,
        fragmentShader: ShaderChunk.meshphong_frag
    },
    points: {

        uniforms: PGL.UniformsUtils.merge([
            PGL.UniformsLib.points
        ]),

        vertexShader: ShaderChunk.points_vert,
        fragmentShader: ShaderChunk.points_frag

    }
};

var object3DId = 0;
PGL.Object3D = function () {

    Object.defineProperty(this, 'id', {value: object3DId++});

    this.parent = null;
    this.children = [];

    this.visible = true;

    var position = new PGL.Vector3();
    var quaternion = new PGL.Quaternion();
    var scale = new PGL.Vector3(1, 1, 1);

    Object.defineProperties(this, {
        position: {
            configurable: true,
            enumerable: true,
            value: position
        },
        quaternion: {
            configurable: true,
            enumerable: true,
            value: quaternion
        },
        modelViewMatrix: {
            value: new PGL.Matrix4()
        },
        scale: {
            configurable: true,
            enumerable: true,
            value: scale
        }
    });

    this.matrix = new PGL.Matrix4();
    this.matrixWorld = new PGL.Matrix4();

    this.matrixAutoUpdate = PGL.Object3D.DefaultMatrixAutoUpdate;
    this.matrixWorldNeedsUpdate = false;

    this.userData = {};
};
PGL.Object3D.prototype = {

    constructor: PGL.Object3D,

    isObject3D: true,

    rotateOnAxis: function () {

        // rotate object on axis in object space
        // axis is assumed to be normalized

        var q1 = new PGL.Quaternion();

        return function rotateOnAxis(axis, angle) {

            q1.setFromAxisAngle(axis, angle);

            this.quaternion.multiply(q1);

            return this;

        };

    }(),

    rotateOnWorldAxis: function () {

        // rotate object on axis in world space
        // axis is assumed to be normalized
        // method assumes no rotated parent

        var q1 = new PGL.Quaternion();

        return function rotateOnWorldAxis(axis, angle) {

            q1.setFromAxisAngle(axis, angle);

            this.quaternion.premultiply(q1);

            return this;

        };

    }(),

    rotateX: function () {

        var v1 = new PGL.Vector3(1, 0, 0);

        return function rotateX(angle) {

            return this.rotateOnAxis(v1, angle);

        };

    }(),

    rotateY: function () {

        var v1 = new PGL.Vector3(0, 1, 0);

        return function rotateY(angle) {

            return this.rotateOnAxis(v1, angle);

        };

    }(),

    rotateZ: function () {

        var v1 = new PGL.Vector3(0, 0, 1);

        return function rotateZ(angle) {

            return this.rotateOnAxis(v1, angle);

        };

    }(),

    translateOnAxis: function () {

        // translate object by distance along axis in object space
        // axis is assumed to be normalized

        var v1 = new PGL.Vector3();

        return function translateOnAxis(axis, distance) {

            v1.copy(axis).applyQuaternion(this.quaternion);

            this.position.add(v1.multiplyScalar(distance));

            return this;

        };

    }(),

    translateX: function () {

        var v1 = new PGL.Vector3(1, 0, 0);

        return function translateX(distance) {

            return this.translateOnAxis(v1, distance);

        };

    }(),

    translateY: function () {

        var v1 = new PGL.Vector3(0, 1, 0);

        return function translateY(distance) {

            return this.translateOnAxis(v1, distance);

        };

    }(),

    translateZ: function () {

        var v1 = new PGL.Vector3(0, 0, 1);

        return function translateZ(distance) {

            return this.translateOnAxis(v1, distance);

        };

    }(),

    /**
     * 把object对象放到children数组中，从原有得父类中移除该对象
     * @param object 可以是一个值，也可以是多个值
     * @return {add}
     */
    add: function (object) {

        if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }
            return this;
        }

        if (object === this) {
            console.error("THREE.Object3D.add: object can't be added as a child of itself.", object);
            return this;
        }

        if ((object && object.isObject3D)) {

            if (object.parent !== null) {
                object.parent.remove(object);
            }

            object.parent = this;
            // object.dispatchEvent({type: 'added'});

            this.children.push(object);
        } else {
            console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", object);
        }

        return this;

    },

    remove: function (object) {

        if (arguments.length > 1) {

            for (var i = 0; i < arguments.length; i++) {

                this.remove(arguments[i]);

            }

            return this;

        }

        var index = this.children.indexOf(object);

        if (index !== -1) {

            object.parent = null;

            object.dispatchEvent({type: 'removed'});

            this.children.splice(index, 1);

        }

        return this;

    },

    /**
     * 更新本地矩阵，设置需要更新世界矩阵
     */
    updateMatrix: function () {

        this.matrix.compose(this.position, this.quaternion, this.scale);

        this.matrixWorldNeedsUpdate = true;

    },
    /**
     * 更新当前对象以及子类对象的本地和世界坐标矩阵
     * @param force
     */
    updateMatrixWorld: function (force) {

        if (this.matrixAutoUpdate) this.updateMatrix();

        if (this.matrixWorldNeedsUpdate || force) {

            if (this.parent === null) {

                this.matrixWorld.copy(this.matrix);

            } else {

                this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);

            }

            this.matrixWorldNeedsUpdate = false;

            force = true;

        }

        // update children

        var children = this.children;

        for (var i = 0, l = children.length; i < l; i++) {

            children[i].updateMatrixWorld(force);

        }

    }
};
PGL.Object3D.DefaultUp = new PGL.Vector3(0, 1, 0); // 默认上方向
PGL.Object3D.DefaultMatrixAutoUpdate = true; // 默认更新值

// 场景
PGL.Scene = function () {
    PGL.Object3D.call(this);

    this.type = 'Scene';

    this.background = null;

    this.autoUpdate = true; // checked by the renderer
};
PGL.Scene.prototype = Object.assign(Object.create(PGL.Object3D.prototype), {

    constructor: PGL.Scene,

    isScene: true
});

PGL.Points = function (geometry, material) {

    PGL.Object3D.call(this);

    this.geometry = geometry !== undefined ? geometry : new PGL.BufferGeometry();
    this.material = material !== undefined ? material : new PGL.PointsMaterial({color: Math.random() * 0xffffff});
};
PGL.Points.prototype = Object.assign(Object.create(PGL.Object3D.prototype), {
    constructor: PGL.Points,

    isPoints: true
});

PGL.Mesh = function (geometry, material) {

    PGL.Object3D.call(this);

    this.type = 'Mesh';

    this.geometry = geometry;
    this.material = material;

    this.drawMode = PGL.TrianglesDrawMode; // 绘制图形的方式
};
PGL.Mesh.prototype = Object.assign(Object.create(PGL.Object3D.prototype), {
    constructor: PGL.Mesh,

    isMesh: true
});

var bufferGeometryId = 1; // BufferGeometry uses odd numbers as Id
PGL.BufferGeometry = function () {
    Object.defineProperty(this, 'id', {value: bufferGeometryId += 2});

    this.attributes = {}; // 保存属性信息
};
Object.assign(PGL.BufferGeometry.prototype, {

    constructor: PGL.BufferGeometry,

    isBufferGeometry: true,

    /**
     * 把属性添加到this.attributes中
     * @param name
     * @param attribute
     * @return {*}
     */
    addAttribute: function (name, attribute) {
        this.attributes[name] = attribute;
        return this;
    }
});

var geometryId = 0; // Geometry uses even numbers as Id
PGL.Geometry = function () {
    Object.defineProperty(this, 'id', {value: geometryId += 2});
};

var materialId = 0;
PGL.Material = function () {
    Object.defineProperty(this, 'id', {value: materialId++});

    this.name = '';
    this.type = 'Material';

    this.userData = {};

    this.needsUpdate = true; // 设置是否需要修改材质
};
PGL.Material.prototype = {
    /**
     * 把给定的参数设置到当前的对象中去
     * @param values
     */
    setValues: function (values) {
        if (values === undefined) return;

        for (var key in values) {

            var newValue = values[key];

            if (newValue === undefined) {

                console.warn("THREE.Material: '" + key + "' parameter is undefined.");
                continue;

            }

            // for backward compatability if shading is set in the constructor
            if (key === 'shading') {

                console.warn('THREE.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.');
                this.flatShading = (newValue === FlatShading) ? true : false;
                continue;

            }

            var currentValue = this[key];

            if (currentValue === undefined) {

                console.warn("THREE." + this.type + ": '" + key + "' is not a property of this material.");
                continue;

            }

            if (currentValue && currentValue.isColor) {

                currentValue.set(newValue);

            } else if ((currentValue && currentValue.isVector3) && (newValue && newValue.isVector3)) {

                currentValue.copy(newValue);

            } else if (key === 'overdraw') {

                // ensure overdraw is backwards-compatible with legacy boolean type
                this[key] = Number(newValue);

            } else {

                this[key] = newValue;

            }

        }
    }
};
PGL.ShaderMaterial = function (options) {

    PGL.Material.call(this);

    var options = options || {};
    this.vertexShader = options.vertexShader;
    this.fragmentShader = options.fragmentShader;
};

PGL.PointsMaterial = function (parameters) {
    PGL.Material.call(this);

    this.type = 'PointsMaterial';

    this.color = new PGL.Color(0xffffff);

    this.size = 1;// 点的大小

    this.setValues(parameters);
};
PGL.PointsMaterial.prototype = Object.create(PGL.Material.prototype);
PGL.PointsMaterial.prototype.constructor = PGL.PointsMaterial;
PGL.PointsMaterial.prototype.isPointsMaterial = true;

PGL.MeshPhongMaterial = function (parameters) {
    PGL.Material.call(this);

    this.type = 'MeshPhongMaterial';

    this.color = new PGL.Color(0xffffff); // diffuse

    this.setValues(parameters);
};
PGL.MeshPhongMaterial.prototype = Object.create(PGL.Material.prototype);
PGL.MeshPhongMaterial.prototype.constructor = PGL.MeshPhongMaterial;
PGL.MeshPhongMaterial.prototype.isMeshPhongMaterial = true;

/**
 *
 * @param array 数组
 * @param itemSize 数据长度
 * @param normalized 表明是否是浮点数
 * @constructor
 */
PGL.BufferAttribute = function (array, itemSize, normalized) {
    this.array = array;
    this.itemSize = itemSize;
    this.count = array !== undefined ? array.length / itemSize : 0;

    this.normalized = normalized === true; // 表明是否是浮点数

    this.dynamic = false; // false 只会向缓存区对象中写入一次数据，但需要绘制很多次 true 多次写入，绘制多次

    this.version = 0; // 版本
};
PGL.Float32BufferAttribute = function (array, itemSize, normalized) {
    PGL.BufferAttribute.call(this, new Float32Array(array), itemSize, normalized);
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
        _context = parameters.context !== undefined ? parameters.context : null,

        _alpha = parameters.alpha !== undefined ? parameters.alpha : false,
        _depth = parameters.depth !== undefined ? parameters.depth : true,
        _stencil = parameters.stencil !== undefined ? parameters.stencil : true,
        _antialias = parameters.antialias !== undefined ? parameters.antialias : false,
        _premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
        _preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false,
        _powerPreference = parameters.powerPreference !== undefined ? parameters.powerPreference : 'default';

    // public properties
    this.domElement = _canvas;
    this.context = null;

    // clearing
    this.autoClear = true;
    this.autoClearColor = true;
    this.autoClearDepth = true;
    this.autoClearStencil = true;

    var _this = this,
        // 标记丢失上下文
        _isContextLost = false;

    var _gl;
    try {

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
            _gl.getShaderPrecisionFormat = function () {
                return {'rangeMin': 1, 'rangeMax': 1, 'precision': 1};
            };
        }
    } catch (error) {
        console.error('THREE.WebGLRenderer: ' + error.message);
        throw error;
    }

    var extensions, capabilities, state;
    var properties, attributes, geometries, objects;
    var programCache, renderLists;

    var background, bufferRenderer;

    function initGLContext() {

        // 保存当前WebGL开启的扩展功能
        extensions = new PGL.WebGLExtensions(_gl);

        // 获取当前webgl的基础属性
        capabilities = new PGL.WebGLCapabilities(_gl, extensions, parameters);

        state = new PGL.WebGLState(_gl);

        properties = new PGL.WebGLProperties();
        attributes = new PGL.WebGLAttributes(_gl);
        geometries = new PGL.WebGLGeometries(_gl, attributes);
        objects = new PGL.WebGLObjects(geometries);

        programCache = new PGL.WebGLPrograms(_this, extensions, capabilities);
        renderLists = PGL.WebGLRenderList();

        background = new PGL.WebGLBackground(_this, state);

        bufferRenderer = new PGL.WebGLBufferRenderer(_gl);

        _this.context = _gl;
        _this.capabilities = capabilities;
        _this.extensions = extensions;
        _this.properties = properties;
        _this.renderLists = renderLists;
        _this.state = state;
    }

    initGLContext();

    // API

    // 获取上下文
    this.getContext = function () {
        return _gl;
    };

    // Clearing

    // 设置背景颜色
    this.setClearColor = function () {
        background.setClearColor.apply(background, arguments);
    };

    /**
     * 根据参数清空颜色缓存区、深度缓存区、模版缓存区
     * @param color
     * @param depth
     * @param stencil
     */
    this.clear = function (color, depth, stencil) {

        var bits = 0;

        if (color === undefined || color) bits |= _gl.COLOR_BUFFER_BIT;
        if (depth === undefined || depth) bits |= _gl.DEPTH_BUFFER_BIT;
        if (stencil === undefined || stencil) bits |= _gl.STENCIL_BUFFER_BIT;

        _gl.clear(bits);

    };

    this.clearColor = function () {

        this.clear(true, false, false);

    };

    this.clearDepth = function () {

        this.clear(false, true, false);

    };

    this.clearStencil = function () {

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
    this.renderBufferDirect = function (object) {

        var program = setProgram(null, null, object.material, object);
        program = object.material.program;
        var updateBuffers = false;
        updateBuffers = true;

        var renderer = bufferRenderer;

        var position = object.geometry.attributes !== undefined ? object.geometry.attributes.position : undefined;

        // 着色器关联顶点属性
        if (updateBuffers) {
            // 设置顶点相关信息
            setupVertexAttributes(object.material, program, object.geometry);
        }

        var dataCount = Infinity;
        if (position !== undefined) {
            dataCount = position.count;
        } else {
            dataCount = 1;
        }

        if (object.isMesh) {
            switch (object.drawMode) {
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
     * @param material 材质
     * @param program 着色器
     * @param geometry 几何体
     */
    function setupVertexAttributes(material, program, geometry) {

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

                    switch (value.length) {
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

    // 渲染物体
    this.render = function (scene) {

        // 检查是否丢失上下文
        if (_isContextLost) return;

        // update scene graph 更新对象的位置矩阵
        if (scene.autoUpdate === true) scene.updateMatrixWorld();

        projectObject(scene);

        var opaqueObjects = renderLists.opaque;

        // 渲染背景
        background.render(scene);

        if (opaqueObjects.length) renderObjects(opaqueObjects, scene);

    };

    /**
     * 拆分渲染对象，解析几何体、以及几何体中的attribute变量
     * @param object PGL.Scene
     */
    function projectObject(object) {
        if (object.visible === false) return;

        var visible = true;

        if (visible) {
            if (object.isPoints || object.isMesh) {
                // 获取bufferGeometry 获取缓存区
                var geometry = objects.update(object);
                var material = object.material;

                renderLists.opaque.push(object);
            }
        }

        var children = object.children;

        for (var i = 0, l = children.length; i < l; i++) {
            projectObject(children[i]);
        }
    }

    /**
     * 渲染多个物体
     * @param renderList
     * @param scene
     */
    function renderObjects(renderList, scene) {
        for (var i = 0; i < renderList.length; i++) {
            var renderItem = renderList[i];
            renderObject(renderItem, scene);
        }
    }

    /**
     * 渲染单个物体,计算模型视图矩阵
     * @param object
     * @param scene
     */
    function renderObject(object, scene) {
        // 计算对象的模型视图矩阵
        object.modelViewMatrix.multiplyMatrices(new PGL.Matrix4(), object.matrixWorld);

        _this.renderBufferDirect(object);
    }

    /**
     * 根据材质组件着色器字符串
     * @param material 材质
     * @param object 对象
     */
    function initMaterial(material, object) {

        var materialProperties = properties.get(material);

        // 获取参数
        var parameters = programCache.getParameters(object);

        var program;
        var programChange = true;

        if (programChange) {
            if (parameters.shaderID) {
                var shader = PGL.ShaderLib[parameters.shaderID];
                materialProperties.shader = {
                    name: material.type,
                    uniforms: PGL.UniformsUtils.clone(shader.uniforms),
                    vertexShader: shader.vertexShader,
                    fragmentShader: shader.fragmentShader
                }
            } else {
                materialProperties.shader = {
                    name: material.type,
                    vertexShader: material.vertexShader,
                    fragmentShader: material.fragmentShader
                };
            }

            program = programCache.acquireProgram(material, materialProperties.shader, parameters);

            materialProperties.program = program;
            material.program = program;
        }

        var uniforms = materialProperties.shader.uniforms;
        var progUniforms = materialProperties.program.getUniforms();
        var uniformsList = PGL.WebGLUniforms.seqWithValue(progUniforms.seq, uniforms);
        materialProperties.uniformsList = uniformsList;
    }

    /**
     * 设置着色器程序
     * @param camera 相机
     * @param fog 雾化
     * @param material 材质
     * @param object 对象
     */
    function setProgram(camera, fog, material, object) {

        var materialProperties = properties.get(object.material);

        // 更新着色器程序
        if (material.needsUpdate) {
            initMaterial(material, object);
            material.needsUpdate = false;
        }

        var refreshMaterial = false;

        var program = materialProperties.program,
            p_uniforms = program.getUniforms(),
            m_uniforms = materialProperties.shader.uniforms;

        if (state.useProgram(program.program)) {
            refreshMaterial = true;
        }

        if (refreshMaterial) {
            if (object.material.isMeshPhongMaterial) {
                refreshUniformsCommon(m_uniforms, object.material);
            } else if (object.material.isPointsMaterial) {
                // 更新uniform相关变量
                refreshUniformsPoints(m_uniforms, object.material);
            }

            // 将uniforms变量传送给着色器
            PGL.WebGLUniforms.upload(_gl, materialProperties.uniformsList, m_uniforms, _this);
        }

        p_uniforms.setValue(_gl, 'modelViewMatrix', object.modelViewMatrix);
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
    }

    function refreshUniformsPoints(uniforms, material) {
        uniforms.diffuse.value = material.color;
        uniforms.size.value = material.size;
    }
};

/**
 * WebGL的相关状态
 * @param gl
 * @constructor
 */
PGL.WebGLState = function (gl) {

    function ColorBuffer() {

        var color = new PGL.Vector4();
        var currentColorClear = new PGL.Vector4(0, 0, 0, 0);

        return {
            setClear: function (r, g, b, a) {
                color.set(r, g, b, a);

                if (currentColorClear.equals(color) === false) {
                    gl.clearColor(r, g, b, a);
                    currentColorClear.copy(color);
                }
            }
        }
    }

    var colorBuffer = new ColorBuffer();

    var maxVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
    var newAttributes = new Uint8Array(maxVertexAttributes);
    var enabledAttributes = new Uint8Array(maxVertexAttributes);
    var attributeDivisors = new Uint8Array(maxVertexAttributes);

    var enabledCapabilities = {}; // 保存功能开启状态

    var currentProgram = null; // 当前使用的着色器程序

    colorBuffer.setClear(0, 0, 0, 1);

    // 初始化newAttributes为0
    function initAttributes() {
        for (var i = 0, l = newAttributes.length; i < l; i++) {
            newAttributes[i] = 0;
        }
    }

    /**
     * 开启功能
     * @param attribute
     */
    function enableAttribute(attribute) {
        enableAttributeAndDivisor(attribute, 0);
    }

    /**
     * 开启buffer地址
     * @param attribute
     * @param meshPerAttribute
     */
    function enableAttributeAndDivisor(attribute, meshPerAttribute) {

        newAttributes[attribute] = 1;

        if (enabledAttributes[attribute] === 0) {
            gl.enableVertexAttribArray(attribute);
            enabledAttributes[attribute] = 1;
        }
    }

    /**
     * 开启功能
     * @param id
     */
    function enable(id) {
        if (enabledCapabilities[id] !== true) {
            gl.enable(id);
            enabledCapabilities[id] = true;
        }
    }

    function useProgram(program) {
        if (currentProgram !== program) {
            gl.useProgram(program);

            currentProgram = program;

            return true;

        }

        return false;
    }

    return {
        buffers: {
            color: colorBuffer
        },

        initAttributes: initAttributes,
        enableAttribute: enableAttribute,
        enableAttributeAndDivisor: enableAttributeAndDivisor,
        enable: enable,

        useProgram: useProgram
    }
};
/**
 * 渲染列表
 * @return {{opaque: Array, transparent: Array}}
 * @constructor
 */
PGL.WebGLRenderList = function () {
    var opaque = [];
    var transparent = [];

    return {
        opaque: opaque,
        transparent: transparent
    };
};

/**
 * 着色器程序管理
 * @constructor
 */
PGL.WebGLPrograms = function (renderer, extensions, capabilities, textures) {

    var programs = []; // 保存所有的着色器程序
    var shaderIDs = {
        MeshPhongMaterial: "phong",
        PointsMaterial: 'points'
    };

    this.getParameters = function (object) {
        var shaderID = shaderIDs[object.material.type];

        var precision = capabilities.precision;

        var parameters = {
            shaderID: shaderID,

            precision: precision
        };

        return parameters;
    };

    this.acquireProgram = function (material, shader, parameters) {

        var program;

        program = new PGL.WebGLProgram(renderer, null, null, material, shader, parameters);

        programs.push(program);

        return program;
    };

    this.programs = programs;
};

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

function filterEmptyLine(string) {
    return string !== '';
}

/**
 * 着色器程序
 * @param renderer
 * @param shader
 * @param renderer
 * @param extensions
 * @param code
 * @param material
 * @param shader
 * @param parameters
 * @param capabilities
 * @param textures
 * @returns {PGL.WebGLProgram}
 * @constructor
 */
PGL.WebGLProgram = function (renderer, extensions, code, material, shader, parameters, capabilities, textures) {
    var gl = renderer.context;

    var vertexShader = shader.vertexShader;
    var fragmentShader = shader.fragmentShader;

    var program = gl.createProgram();

    var prefixVertex, prefixFragment;

    if (material.isRawShaderMaterial) {
    } else {

        prefixVertex = [

            'precision ' + parameters.precision + ' float;',
            'precision ' + parameters.precision + ' int;',

            '#define SHADER_NAME ' + shader.name,
            'uniform mat4 modelViewMatrix;',
            '\n'

        ].filter(filterEmptyLine).join('\n');

        prefixFragment = [

            'precision ' + parameters.precision + ' float;',
            'precision ' + parameters.precision + ' int;',

            '#define SHADER_NAME ' + shader.name,
            '\n'

        ].filter(filterEmptyLine).join('\n');

    }

    var vertexGlsl = prefixVertex + vertexShader;
    var fragmentGlsl = prefixFragment + fragmentShader;

    // 创建着色器
    var glVertexShader = PGL.WebGLShader(gl, gl.VERTEX_SHADER, vertexGlsl);
    var glFragmentShader = PGL.WebGLShader(gl, gl.FRAGMENT_SHADER, fragmentGlsl);

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
    this.getUniforms = function () {
        if (cachedUniforms === undefined) {
            cachedUniforms = new PGL.WebGLUniforms(gl, program, renderer);
        }
        return cachedUniforms;
    };

    // set up caching for attribute locations
    var cachedAttributes;

    /**
     * 获取Attribute的存储地址
     * @return {*}
     */
    this.getAttributes = function () {
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

function addLineNumbers(string) {

    var lines = string.split('\n');

    for (var i = 0; i < lines.length; i++) {

        lines[i] = (i + 1) + ': ' + lines[i];

    }

    return lines.join('\n');

}

/**
 * 实例化一个着色器
 * @param gl 上下文
 * @param type 类型
 * @param string 字符串
 * @param debug 标记是否打印调试信息
 * @return {*|WebGLShader}
 * @constructor
 */
PGL.WebGLShader = function (gl, type, string, debug) {

    var shader = gl.createShader(type);

    gl.shaderSource(shader, string);
    gl.compileShader(shader);

    if (debug === true) {

        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) === false) {
            console.error('THREE.WebGLShader: Shader couldn\'t compile.');
        }

        if (gl.getShaderInfoLog(shader) !== '') {
            console.warn('THREE.WebGLShader: gl.getShaderInfoLog()', type === gl.VERTEX_SHADER ? 'vertex' : 'fragment', gl.getShaderInfoLog(shader), addLineNumbers(string));
        }
    }

    // --enable-privileged-webgl-extension
    // console.log( type, gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );

    return shader;
};

/**
 * 绘制图形
 * @param gl
 * @constructor
 */
PGL.WebGLBufferRenderer = function (gl) {
    var mode;

    function setMode(value) {
        mode = value;
    }

    function render(start, count) {
        gl.drawArrays(mode, start, count);
    }

    this.setMode = setMode;
    this.render = render;
};

/**
 * 材质属性管理器
 * @constructor
 */
PGL.WebGLProperties = function () {
    var properties = new WeakMap();

    /**
     * 获取map，如果未定义，设置为{}
     * @param object
     */
    function get(object) {

        var map = properties.get(object);

        if (map === undefined) {
            map = {};
            properties.set(object, map);
        }

        return map;
    }

    return {
        get: get
    }
};

/**
 * 背景管理
 * @param renderer
 * @param state
 * @param objects
 * @constructor
 */
PGL.WebGLBackground = function (renderer, state) {

    var clearColor = new PGL.Color(0x000000);
    var clearAlpha = 0;

    /**
     * 设置清空背景颜色值，
     * @param scene
     * @param forceClear 强制清空缓存区
     */
    function render(scene, forceClear) {
        var background = scene.background;
        if (background === null) {
            setClear(clearColor, clearAlpha);
        }

        if (renderer.autoClear || forceClear) {
            renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
        }
    }

    /**
     * 设置背景颜色
     * @param color
     * @param alpha
     */
    function setClear(color, alpha) {
        state.buffers.color.setClear(color.r, color.g, color.b, alpha);
    }

    return {
        getClearColor: function () {

            return clearColor;

        },
        setClearColor: function (color, alpha) {
            clearColor.set(color);
            clearAlpha = alpha !== undefined ? alpha : 1;
            setClear(clearColor, clearAlpha);
        },
        getClearAlpha: function () {
            return clearAlpha;
        },
        setClearAlpha: function (alpha) {
            clearAlpha = alpha;
            setClear(clearColor, clearAlpha);
        },
        render: render
    }
};

/**
 * 管理attribute变量（创建buffer）
 * @param gl
 * @constructor
 */
PGL.WebGLAttributes = function (gl) {

    var buffers = new WeakMap();

    /**
     * 创建缓存区
     * @param attribute
     * @param bufferType
     * @return {{buffer: AudioBuffer | WebGLBuffer, type: number, bytesPerElement: number, version}}
     */
    function createBuffer(attribute, bufferType) {
        var array = attribute.array;
        var usage = attribute.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;

        var buffer = gl.createBuffer();

        gl.bindBuffer(bufferType, buffer);
        gl.bufferData(bufferType, array, usage);

        var type = gl.FLOAT;

        if (array instanceof Float32Array) {

            type = gl.FLOAT;

        } else if (array instanceof Float64Array) {
            console.warn('THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.');
        } else if (array instanceof Uint16Array) {
            type = gl.UNSIGNED_SHORT;
        } else if (array instanceof Int16Array) {
            type = gl.SHORT;
        } else if (array instanceof Uint32Array) {
            type = gl.UNSIGNED_INT;
        } else if (array instanceof Int32Array) {
            type = gl.INT;
        } else if (array instanceof Int8Array) {
            type = gl.BYTE;
        } else if (array instanceof Uint8Array) {
            type = gl.UNSIGNED_BYTE;
        }

        return {
            buffer: buffer,
            type: type,
            bytesPerElement: array.BYTES_PER_ELEMENT,
            version: attribute.version
        };
    }

    function get(attribute) {
        if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;
        return buffers.get(attribute);
    }

    /**
     * 创建或则更新buffer
     * @param attribute
     * @param bufferType
     */
    function update(attribute, bufferType) {
        if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

        var data = buffers.get(attribute);

        if (data === undefined) {
            buffers.set(attribute, createBuffer(attribute, bufferType));
        }
    }

    return {
        get: get,
        update: update
    }
};

/**
 * 管理几何体
 * @param gl
 * @param attributes
 * @return
 * @constructor
 */
PGL.WebGLGeometries = function (gl, attributes) {
    var geometries = {};
    var wireframeAttributes = {};

    /**
     * 获取对象的buffer几何体
     * @param object 对象
     * @param geometry 几何体
     * @return {*}
     */
    function get(object, geometry) {
        var buffergeometry = geometries[geometry.id];

        if (buffergeometry) return buffergeometry;

        if (geometry.isBufferGeometry) {
            buffergeometry = geometry;
        }

        geometries[geometry.id] = buffergeometry;

        return buffergeometry;
    }

    function update(geometry) {
        var index = geometry.index;
        var geometryAttributes = geometry.attributes;

        for (var name in geometryAttributes) {
            attributes.update(geometryAttributes[name], gl.ARRAY_BUFFER);
        }
    }

    return {
        get: get,
        update: update
    }
};

/**
 * 管理几何体对象
 * @param geometries
 * @return {{update: update}}
 * @constructor
 */
PGL.WebGLObjects = function (geometries) {
    var updateList = {};

    function update(object) {
        var frame = 0;

        var geometry = object.geometry;
        var buffergeometry = geometries.get(object, geometry);

        if (buffergeometry) {
            if (updateList[buffergeometry.id] !== frame) {
                geometries.update(buffergeometry);

                updateList[buffergeometry.id] = frame;
            }
        }


        return buffergeometry;
    }

    return {
        update: update
    }
};

/**
 * 保存当前WebGL开启的扩展功能
 * @param gl 上下文
 * @return {{get: get}}
 * @constructor
 */
PGL.WebGLExtensions = function (gl) {

    var extensions = {};

    return {

        get: function (name) {

            if (extensions[name] !== undefined) {

                return extensions[name];

            }

            var extension;

            switch (name) {

                case 'WEBGL_depth_texture':
                    extension = gl.getExtension('WEBGL_depth_texture') || gl.getExtension('MOZ_WEBGL_depth_texture') || gl.getExtension('WEBKIT_WEBGL_depth_texture');
                    break;

                case 'EXT_texture_filter_anisotropic':
                    extension = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('MOZ_EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
                    break;

                case 'WEBGL_compressed_texture_s3tc':
                    extension = gl.getExtension('WEBGL_compressed_texture_s3tc') || gl.getExtension('MOZ_WEBGL_compressed_texture_s3tc') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
                    break;

                case 'WEBGL_compressed_texture_pvrtc':
                    extension = gl.getExtension('WEBGL_compressed_texture_pvrtc') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');
                    break;

                default:
                    extension = gl.getExtension(name);

            }

            if (extension === null) {

                console.warn('THREE.WebGLRenderer: ' + name + ' extension not supported.');

            }

            extensions[name] = extension;

            return extension;

        }

    };

};

/**
 * 获取当前webgl的基础参数
 * @param gl 上下文
 * @param extensions 获取扩展方法的对象
 * @param parameters 参数
 *    precision：精度 highp
 *    logarithmicDepthBuffer：
 * @return {{getMaxAnisotropy: getMaxAnisotropy, getMaxPrecision: getMaxPrecision, precision: *, logarithmicDepthBuffer: boolean, maxTextures: *|any, maxVertexTextures: *|any, maxTextureSize: *|any, maxCubemapSize: *|any, maxAttributes: *|any, maxVertexUniforms: *|any, maxVaryings: *|any, maxFragmentUniforms: *|any, vertexTextures: boolean, floatFragmentTextures: boolean, floatVertexTextures: boolean}}
 * @constructor
 */
PGL.WebGLCapabilities = function (gl, extensions, parameters) {

    var maxAnisotropy;

    function getMaxAnisotropy() {

        if (maxAnisotropy !== undefined) return maxAnisotropy;

        var extension = extensions.get('EXT_texture_filter_anisotropic');

        if (extension !== null) {

            maxAnisotropy = gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);

        } else {

            maxAnisotropy = 0;

        }

        return maxAnisotropy;

    }

    /**
     * 检查支持的最高精度
     * @param precision
     * @return {string}
     */
    function getMaxPrecision(precision) {

        if (precision === 'highp') {

            if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision > 0 &&
                gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision > 0) {

                return 'highp';

            }

            precision = 'mediump';

        }

        if (precision === 'mediump') {

            if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision > 0 &&
                gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision > 0) {

                return 'mediump';

            }

        }

        return 'lowp';

    }

    var isWebGL2 = typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext;

    var precision = parameters.precision !== undefined ? parameters.precision : 'highp';
    var maxPrecision = getMaxPrecision(precision);

    if (maxPrecision !== precision) {

        console.warn('THREE.WebGLRenderer:', precision, 'not supported, using', maxPrecision, 'instead.');
        precision = maxPrecision;

    }

    var logarithmicDepthBuffer = parameters.logarithmicDepthBuffer === true;

    var maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    var maxVertexTextures = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    var maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    var maxCubemapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);

    var maxAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
    var maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
    var maxVaryings = gl.getParameter(gl.MAX_VARYING_VECTORS);
    var maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);

    var vertexTextures = maxVertexTextures > 0;
    var floatFragmentTextures = isWebGL2 || !!extensions.get('OES_texture_float');
    var floatVertexTextures = vertexTextures && floatFragmentTextures;

    var maxSamples = isWebGL2 ? gl.getParameter(gl.MAX_SAMPLES) : 0;

    return {

        isWebGL2: isWebGL2,

        getMaxAnisotropy: getMaxAnisotropy,
        getMaxPrecision: getMaxPrecision,

        precision: precision,
        logarithmicDepthBuffer: logarithmicDepthBuffer,

        maxTextures: maxTextures,
        maxVertexTextures: maxVertexTextures,
        maxTextureSize: maxTextureSize,
        maxCubemapSize: maxCubemapSize,

        maxAttributes: maxAttributes,
        maxVertexUniforms: maxVertexUniforms,
        maxVaryings: maxVaryings,
        maxFragmentUniforms: maxFragmentUniforms,

        vertexTextures: vertexTextures,
        floatFragmentTextures: floatFragmentTextures,
        floatVertexTextures: floatVertexTextures,

        maxSamples: maxSamples

    };

};
