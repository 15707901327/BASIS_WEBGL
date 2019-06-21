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
    "#if defined(USE_MAP)\n" +
    "   varying vec2 vUv;\n" +
    "#endif\n" +

    "#ifdef USE_COLOR\n" +
    "   attribute vec3 color;\n" +
    "   varying vec3 vColor;\n" +
    "#endif\n" +

    "void main(){\n" +
    "   #if defined( USE_MAP )\n" +
    "       vUv = uv;\n" +
    "   #endif\n" +

    "   #ifdef USE_COLOR\n" +
    "       vColor.xyz = color.xyz;\n" +
    "   #endif\n" +

    " vec4 mvPosition = projectionMatrix * modelViewMatrix * position; //设置坐标\n" +
    " gl_Position = mvPosition; //设置坐标\n" +
    "}";
var meshphong_frag =
    "uniform vec3 diffuse;\n" + // 必须加上精度限定

    "#if defined( USE_MAP )\n" +
    "   varying vec2 vUv;\n" +
    "#endif\n" +

    "#ifdef USE_MAP\n" +
    "   uniform sampler2D map;\n" +
    "#endif\n" +

    "#ifdef USE_COLOR\n" +
    "   varying vec3 vColor;\n" +
    "#endif\n" +

    "void main() {\n" +
    "   vec4 diffuseColor = vec4(diffuse,1.0);\n" +

    "   #ifdef USE_MAP\n" +
    "       vec4 texelColor = texture2D( map, vUv );\n" +
    "       diffuseColor = texelColor;\n" +
    "   #endif\n" +

    "   #ifdef USE_COLOR\n" +
    "       diffuseColor.rgb *= vColor;\n" +
    "   #endif\n" +

    "   gl_FragColor = diffuseColor;\n" +
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
    common: {
        diffuse: {value: new PGL.Color(0xeeeeee)},
        opacity: {value: 1.0},

        map: {value: null}
    },
    points: {
        size: {value: 1.0},
        diffuse: {value: new PGL.Color(0xeeeeee)}
    }
};
PGL.ShaderLib = {
    phong: {
        uniforms: PGL.UniformsUtils.merge([
            PGL.UniformsLib.common
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

/**
 * 由六个平面组成的锥体
 * @param p0
 * @param p1
 * @param p2
 * @param p3
 * @param p4
 * @param p5
 * @constructor
 */
PGL.Frustum = function (p0, p1, p2, p3, p4, p5) {

    this.planes = [

        (p0 !== undefined) ? p0 : new PGL.Plane(),
        (p1 !== undefined) ? p1 : new PGL.Plane(),
        (p2 !== undefined) ? p2 : new PGL.Plane(),
        (p3 !== undefined) ? p3 : new PGL.Plane(),
        (p4 !== undefined) ? p4 : new PGL.Plane(),
        (p5 !== undefined) ? p5 : new PGL.Plane()

    ];

};
Object.assign(PGL.Frustum.prototype, {

    set: function (p0, p1, p2, p3, p4, p5) {

        var planes = this.planes;

        planes[0].copy(p0);
        planes[1].copy(p1);
        planes[2].copy(p2);
        planes[3].copy(p3);
        planes[4].copy(p4);
        planes[5].copy(p5);

        return this;

    },

    clone: function () {

        return new this.constructor().copy(this);

    },

    copy: function (frustum) {

        var planes = this.planes;

        for (var i = 0; i < 6; i++) {

            planes[i].copy(frustum.planes[i]);

        }

        return this;

    },

    /**
     * WebGLRenderer使用它来从Camera的projectionMatrix和matrixWorldInverse设置Frustum。
     * @param m
     * @return {setFromMatrix}
     */
    setFromMatrix: function (m) {

        var planes = this.planes;
        var me = m.elements;
        var me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
        var me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];
        var me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];
        var me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];

        planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize();
        planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize();
        planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize();
        planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize();
        planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize();
        planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize();

        return this;

    },

    /**
     * 检查对象的边界球是否与Frustum相交。
     * 请注意，对象必须具有Geometry或BufferGeometry，以便可以计算边界球。
     */
    intersectsObject: function () {

        var sphere = new PGL.Sphere();

        return function intersectsObject(object) {

            var geometry = object.geometry;

            if (geometry.boundingSphere === null)
                geometry.computeBoundingSphere();

            sphere.copy(geometry.boundingSphere)
                .applyMatrix4(object.matrixWorld);

            return this.intersectsSphere(sphere);

        };

    }(),

    /**
     * 检查精灵是否与Frustum相交
     */
    intersectsSprite: function () {

        var sphere = new PGL.Sphere();

        return function intersectsSprite(sprite) {

            sphere.center.set(0, 0, 0);
            sphere.radius = 0.7071067811865476;
            sphere.applyMatrix4(sprite.matrixWorld);

            return this.intersectsSphere(sphere);

        };

    }(),

    /**
     * 如果球体与此平截头体相交，则返回true。
     * @param sphere
     * @return {boolean}
     */
    intersectsSphere: function (sphere) {

        var planes = this.planes;
        var center = sphere.center;
        var negRadius = -sphere.radius;

        for (var i = 0; i < 6; i++) {

            var distance = planes[i].distanceToPoint(center);

            if (distance < negRadius) {

                return false;

            }

        }

        return true;

    },

    intersectsBox: function () {

        var p = new Vector3();

        return function intersectsBox(box) {

            var planes = this.planes;

            for (var i = 0; i < 6; i++) {

                var plane = planes[i];

                // corner at max distance

                p.x = plane.normal.x > 0 ? box.max.x : box.min.x;
                p.y = plane.normal.y > 0 ? box.max.y : box.min.y;
                p.z = plane.normal.z > 0 ? box.max.z : box.min.z;

                if (plane.distanceToPoint(p) < 0) {

                    return false;

                }

            }

            return true;

        };

    }(),

    containsPoint: function (point) {

        var planes = this.planes;

        for (var i = 0; i < 6; i++) {

            if (planes[i].distanceToPoint(point) < 0) {

                return false;

            }

        }

        return true;

    }

});

var object3DId = 0;
PGL.Object3D = function () {

    Object.defineProperty(this, 'id', {value: object3DId++});

    this.parent = null;
    this.children = [];

    // 上方向
    this.up = PGL.Object3D.DefaultUp.clone();

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
        scale: {
            configurable: true,
            enumerable: true,
            value: scale
        },
        // 模型视图矩阵
        modelViewMatrix: {
            value: new PGL.Matrix4()
        },
        // 法线矩阵
        normalMatrix: {
            value: new PGL.Matrix3()
        }
    });

    this.matrix = new PGL.Matrix4();
    this.matrixWorld = new PGL.Matrix4();

    this.matrixAutoUpdate = PGL.Object3D.DefaultMatrixAutoUpdate;
    this.matrixWorldNeedsUpdate = false;

    this.layers = new PGL.Layers(); // 图层
    this.visible = true; // 是否显示

    this.frustumCulled = true; // 标记是否检查物体在可视范围之内，默认检查 true

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

    },
    /**
     * 更新rotation、quaternion
     * 接受的参数可以是一个THREE.Vector3类型，也可以是三个x\y\z类型
     */
    lookAt: function () {

        // This method does not support objects having non-uniformly-scaled parent(s)

        var q1 = new PGL.Quaternion();
        var m1 = new PGL.Matrix4();
        var target = new PGL.Vector3();
        var position = new PGL.Vector3();

        return function lookAt(x, y, z) {

            if (x.isVector3) {

                target.copy(x);

            } else {

                target.set(x, y, z);

            }

            var parent = this.parent;

            this.updateWorldMatrix(true, false);

            position.setFromMatrixPosition(this.matrixWorld);

            if (this.isCamera || this.isLight) {

                m1.lookAt(position, target, this.up);

            } else {

                m1.lookAt(target, position, this.up);

            }

            this.quaternion.setFromRotationMatrix(m1);

            if (parent) {

                m1.extractRotation(parent.matrixWorld);
                q1.setFromRotationMatrix(m1);
                this.quaternion.premultiply(q1.inverse());

            }

        };

    }(),
    updateWorldMatrix: function (updateParents, updateChildren) {

        var parent = this.parent;

        if (updateParents === true && parent !== null) {

            parent.updateWorldMatrix(true, false);

        }

        if (this.matrixAutoUpdate) this.updateMatrix();

        if (this.parent === null) {

            this.matrixWorld.copy(this.matrix);

        } else {

            this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);

        }

        // update children

        if (updateChildren === true) {

            var children = this.children;

            for (var i = 0, l = children.length; i < l; i++) {

                children[i].updateWorldMatrix(false, true);

            }

        }

    },
};
PGL.Object3D.DefaultUp = new PGL.Vector3(0, 1, 0); // 默认上方向
PGL.Object3D.DefaultMatrixAutoUpdate = true; // 默认更新值

// 相机
PGL.Camera = function () {

    PGL.Object3D.call(this);

    this.type = 'Camera';

    this.matrixWorldInverse = new PGL.Matrix4(); // 相机位置矩阵的倒数矩阵
    this.projectionMatrix = new PGL.Matrix4(); // 投影矩阵
    this.projectionMatrixInverse = new PGL.Matrix4();

};
PGL.Camera.prototype = Object.assign(Object.create(PGL.Object3D.prototype), {

    constructor: PGL.Camera,

    isCamera: true,

    copy: function (source, recursive) {

        PGL.Object3D.prototype.copy.call(this, source, recursive);

        this.matrixWorldInverse.copy(source.matrixWorldInverse);
        this.projectionMatrix.copy(source.projectionMatrix);
        this.projectionMatrixInverse.copy(source.projectionMatrixInverse);

        return this;

    },

    getWorldDirection: function (target) {

        if (target === undefined) {

            console.warn('THREE.Camera: .getWorldDirection() target is now required');
            target = new Vector3();

        }

        this.updateMatrixWorld(true);

        var e = this.matrixWorld.elements;

        return target.set(-e[8], -e[9], -e[10]).normalize();

    },

    /**
     * 更新相机以及相机子类的本地和世界坐标矩阵
     * 设置matrixWorld的倒数矩阵matrixWorldInverse
     * @param force
     */
    updateMatrixWorld: function (force) {

        PGL.Object3D.prototype.updateMatrixWorld.call(this, force);

        this.matrixWorldInverse.getInverse(this.matrixWorld);

    },

    clone: function () {

        return new this.constructor().copy(this);

    }

});

/**
 * 投影相机对象
 * @param fov
 * @param aspect
 * @param near
 * @param far
 * @constructor
 */
PGL.PerspectiveCamera = function (fov, aspect, near, far) {

    PGL.Camera.call(this);

    this.type = 'PerspectiveCamera';

    this.fov = fov !== undefined ? fov : 50;
    this.zoom = 1;

    this.near = near !== undefined ? near : 0.1;
    this.far = far !== undefined ? far : 2000;
    this.focus = 10;

    this.aspect = aspect !== undefined ? aspect : 1;
    this.view = null;

    this.filmGauge = 35;	// width of the film (default in millimeters)
    this.filmOffset = 0;	// horizontal film offset (same unit as gauge)

    // 初始化投影矩阵
    this.updateProjectionMatrix();

};
PGL.PerspectiveCamera.prototype = Object.assign(Object.create(PGL.Camera.prototype), {

    constructor: PGL.PerspectiveCamera,

    isPerspectiveCamera: true,

    copy: function (source, recursive) {

        PGL.Camera.prototype.copy.call(this, source, recursive);

        this.fov = source.fov;
        this.zoom = source.zoom;

        this.near = source.near;
        this.far = source.far;
        this.focus = source.focus;

        this.aspect = source.aspect;
        this.view = source.view === null ? null : Object.assign({}, source.view);

        this.filmGauge = source.filmGauge;
        this.filmOffset = source.filmOffset;

        return this;

    },

    /**
     * Sets the FOV by focal length in respect to the current .filmGauge.
     *
     * The default film gauge is 35, so that the focal length can be specified for
     * a 35mm (full frame) camera.
     *
     * Values for focal length and film gauge must have the same unit.
     */
    setFocalLength: function (focalLength) {

        // see http://www.bobatkins.com/photography/technical/field_of_view.html
        var vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;

        this.fov = _Math.RAD2DEG * 2 * Math.atan(vExtentSlope);
        this.updateProjectionMatrix();

    },

    /**
     * Calculates the focal length from the current .fov and .filmGauge.
     */
    getFocalLength: function () {

        var vExtentSlope = Math.tan(_Math.DEG2RAD * 0.5 * this.fov);

        return 0.5 * this.getFilmHeight() / vExtentSlope;

    },

    getEffectiveFOV: function () {

        return _Math.RAD2DEG * 2 * Math.atan(
            Math.tan(_Math.DEG2RAD * 0.5 * this.fov) / this.zoom);

    },

    getFilmWidth: function () {

        // film not completely covered in portrait format (aspect < 1)
        return this.filmGauge * Math.min(this.aspect, 1);

    },

    getFilmHeight: function () {

        // film not completely covered in landscape format (aspect > 1)
        return this.filmGauge / Math.max(this.aspect, 1);

    },

    /**
     * Sets an offset in a larger frustum. This is useful for multi-window or
     * multi-monitor/multi-machine setups.
     *
     * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
     * the monitors are in grid like this
     *
     *   +---+---+---+
     *   | A | B | C |
     *   +---+---+---+
     *   | D | E | F |
     *   +---+---+---+
     *
     * then for each monitor you would call it like this
     *
     *   var w = 1920;
     *   var h = 1080;
     *   var fullWidth = w * 3;
     *   var fullHeight = h * 2;
     *
     *   --A--
     *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
     *   --B--
     *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
     *   --C--
     *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
     *   --D--
     *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
     *   --E--
     *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
     *   --F--
     *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
     *
     *   Note there is no reason monitors have to be the same size or in a grid.
     */
    setViewOffset: function (fullWidth, fullHeight, x, y, width, height) {

        this.aspect = fullWidth / fullHeight;

        if (this.view === null) {

            this.view = {
                enabled: true,
                fullWidth: 1,
                fullHeight: 1,
                offsetX: 0,
                offsetY: 0,
                width: 1,
                height: 1
            };

        }

        this.view.enabled = true;
        this.view.fullWidth = fullWidth;
        this.view.fullHeight = fullHeight;
        this.view.offsetX = x;
        this.view.offsetY = y;
        this.view.width = width;
        this.view.height = height;

        this.updateProjectionMatrix();

    },

    clearViewOffset: function () {

        if (this.view !== null) {

            this.view.enabled = false;

        }

        this.updateProjectionMatrix();

    },

    /**
     * 根据给定值计算top，height，width，left等值，并调用方法设置投影矩阵
     */
    updateProjectionMatrix: function () {

        var near = this.near,
            top = near * Math.tan(
                PGL._Math.DEG2RAD * 0.5 * this.fov) / this.zoom,
            height = 2 * top,
            width = this.aspect * height,
            left = -0.5 * width,
            view = this.view;

        if (this.view !== null && this.view.enabled) {

            var fullWidth = view.fullWidth,
                fullHeight = view.fullHeight;

            left += view.offsetX * width / fullWidth;
            top -= view.offsetY * height / fullHeight;
            width *= view.width / fullWidth;
            height *= view.height / fullHeight;

        }

        var skew = this.filmOffset;
        if (skew !== 0) left += near * skew / this.getFilmWidth();

        this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far);

        this.projectionMatrixInverse.getInverse(this.projectionMatrix);

    },

    toJSON: function (meta) {

        var data = Object3D.prototype.toJSON.call(this, meta);

        data.object.fov = this.fov;
        data.object.zoom = this.zoom;

        data.object.near = this.near;
        data.object.far = this.far;
        data.object.focus = this.focus;

        data.object.aspect = this.aspect;

        if (this.view !== null) data.object.view = Object.assign({}, this.view);

        data.object.filmGauge = this.filmGauge;
        data.object.filmOffset = this.filmOffset;

        return data;

    }

});

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
    this.morphAttributes = {};

    this.boundingBox = null; // 包围盒子
    this.boundingSphere = null; // 包围球
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
    },

    /**
     * 计算模型的最小包围球的大小
     */
    computeBoundingSphere: function () {

        var box = new PGL.Box3();
        var boxMorphTargets = new PGL.Box3();
        var vector = new PGL.Vector3();

        return function computeBoundingSphere() {

            if (this.boundingSphere === null) {
                this.boundingSphere = new PGL.Sphere();
            }

            var position = this.attributes.position;
            var morphAttributesPosition = this.morphAttributes.position;

            if (position) {

                // first, find the center of the bounding sphere

                var center = this.boundingSphere.center;

                box.setFromBufferAttribute(position);

                // process morph attributes if present
                if (morphAttributesPosition) {

                    for (var i = 0, il = morphAttributesPosition.length; i < il; i++) {

                        var morphAttribute = morphAttributesPosition[i];
                        boxMorphTargets.setFromBufferAttribute(morphAttribute);

                        box.expandByPoint(boxMorphTargets.min);
                        box.expandByPoint(boxMorphTargets.max);

                    }

                }

                box.getCenter(center);

                // second, try to find a boundingSphere with a radius smaller than the
                // boundingSphere of the boundingBox: sqrt(3) smaller in the best case
                // 获取最大半径的平方
                var maxRadiusSq = 0;

                for (var i = 0, il = position.count; i < il; i++) {
                    vector.fromBufferAttribute(position, i);
                    maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));
                }

                // process morph attributes if present

                if (morphAttributesPosition) {

                    for (var i = 0, il = morphAttributesPosition.length; i < il; i++) {

                        var morphAttribute = morphAttributesPosition[i];

                        for (var j = 0, jl = morphAttribute.count; j < jl; j++) {

                            vector.fromBufferAttribute(morphAttribute, j);

                            maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));

                        }

                    }

                }

                this.boundingSphere.radius = Math.sqrt(maxRadiusSq);

                if (isNaN(this.boundingSphere.radius)) {
                    console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
                }

            }

        };

    }()
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

    this.vertexColors = PGL.NoColors; // THREE.NoColors, THREE.VertexColors, THREE.FaceColors

    this.visible = true;

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

    this.map = null;

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
Object.defineProperty(PGL.BufferAttribute.prototype, 'needsUpdate', {
    set: function (value) {
        if (value === true) this.version++;
    }
});
Object.assign(PGL.BufferAttribute.prototype, {

    isBufferAttribute: true,

    onUploadCallback: function () {
    },

    setArray: function (array) {

        if (Array.isArray(array)) {

            throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');

        }

        this.count = array !== undefined ? array.length / this.itemSize : 0;
        this.array = array;

        return this;

    },

    setDynamic: function (value) {

        this.dynamic = value;

        return this;

    },

    copy: function (source) {

        this.name = source.name;
        this.array = new source.array.constructor(source.array);
        this.itemSize = source.itemSize;
        this.count = source.count;
        this.normalized = source.normalized;

        this.dynamic = source.dynamic;

        return this;

    },

    copyAt: function (index1, attribute, index2) {

        index1 *= this.itemSize;
        index2 *= attribute.itemSize;

        for (var i = 0, l = this.itemSize; i < l; i++) {

            this.array[index1 + i] = attribute.array[index2 + i];

        }

        return this;

    },

    copyArray: function (array) {

        this.array.set(array);

        return this;

    },

    copyColorsArray: function (colors) {

        var array = this.array, offset = 0;

        for (var i = 0, l = colors.length; i < l; i++) {

            var color = colors[i];

            if (color === undefined) {

                console.warn('THREE.BufferAttribute.copyColorsArray(): color is undefined', i);
                color = new Color();

            }

            array[offset++] = color.r;
            array[offset++] = color.g;
            array[offset++] = color.b;

        }

        return this;

    },

    copyVector2sArray: function (vectors) {

        var array = this.array, offset = 0;

        for (var i = 0, l = vectors.length; i < l; i++) {

            var vector = vectors[i];

            if (vector === undefined) {

                console.warn('THREE.BufferAttribute.copyVector2sArray(): vector is undefined', i);
                vector = new Vector2();

            }

            array[offset++] = vector.x;
            array[offset++] = vector.y;

        }

        return this;

    },

    copyVector3sArray: function (vectors) {

        var array = this.array, offset = 0;

        for (var i = 0, l = vectors.length; i < l; i++) {

            var vector = vectors[i];

            if (vector === undefined) {

                console.warn('THREE.BufferAttribute.copyVector3sArray(): vector is undefined', i);
                vector = new Vector3();

            }

            array[offset++] = vector.x;
            array[offset++] = vector.y;
            array[offset++] = vector.z;

        }

        return this;

    },

    copyVector4sArray: function (vectors) {

        var array = this.array, offset = 0;

        for (var i = 0, l = vectors.length; i < l; i++) {

            var vector = vectors[i];

            if (vector === undefined) {

                console.warn('THREE.BufferAttribute.copyVector4sArray(): vector is undefined', i);
                vector = new Vector4();

            }

            array[offset++] = vector.x;
            array[offset++] = vector.y;
            array[offset++] = vector.z;
            array[offset++] = vector.w;

        }

        return this;

    },

    set: function (value, offset) {

        if (offset === undefined) offset = 0;

        this.array.set(value, offset);

        return this;

    },

    getX: function (index) {
        return this.array[index * this.itemSize];
    },

    setX: function (index, x) {

        this.array[index * this.itemSize] = x;

        return this;

    },

    getY: function (index) {

        return this.array[index * this.itemSize + 1];

    },

    setY: function (index, y) {

        this.array[index * this.itemSize + 1] = y;

        return this;

    },

    getZ: function (index) {

        return this.array[index * this.itemSize + 2];

    },

    setZ: function (index, z) {

        this.array[index * this.itemSize + 2] = z;

        return this;

    },

    getW: function (index) {

        return this.array[index * this.itemSize + 3];

    },

    setW: function (index, w) {

        this.array[index * this.itemSize + 3] = w;

        return this;

    },

    setXY: function (index, x, y) {

        index *= this.itemSize;

        this.array[index + 0] = x;
        this.array[index + 1] = y;

        return this;

    },

    setXYZ: function (index, x, y, z) {

        index *= this.itemSize;

        this.array[index + 0] = x;
        this.array[index + 1] = y;
        this.array[index + 2] = z;

        return this;

    },

    setXYZW: function (index, x, y, z, w) {

        index *= this.itemSize;

        this.array[index + 0] = x;
        this.array[index + 1] = y;
        this.array[index + 2] = z;
        this.array[index + 3] = w;

        return this;

    },

    onUpload: function (callback) {

        this.onUploadCallback = callback;

        return this;

    },

    clone: function () {

        return new this.constructor(this.array, this.itemSize).copy(this);

    },

    toJSON: function () {

        return {
            itemSize: this.itemSize,
            type: this.array.constructor.name,
            array: Array.prototype.slice.call(this.array),
            normalized: this.normalized
        };

    }

});

PGL.Float32BufferAttribute = function (array, itemSize, normalized) {
    PGL.BufferAttribute.call(this, new Float32Array(array), itemSize, normalized);
};
PGL.Float32BufferAttribute.prototype = Object.create(PGL.BufferAttribute.prototype);
PGL.Float32BufferAttribute.prototype.constructor = PGL.Float32BufferAttribute;

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
        _projScreenMatrix = new PGL.Matrix4(),

        _vector3 = new PGL.Vector3(); //

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
    var properties, textures, attributes, geometries, objects;
    var programCache, renderLists, renderStates;

    var background, bufferRenderer;
    var utils;

    function initGLContext() {

        // 保存当前WebGL开启的扩展功能
        extensions = new PGL.WebGLExtensions(_gl);

        // 获取当前webgl的基础属性
        capabilities = new PGL.WebGLCapabilities(_gl, extensions, parameters);

        utils = new PGL.WebGLUtils(_gl, extensions, capabilities);

        state = new PGL.WebGLState(_gl, extensions, utils, capabilities);

        properties = new PGL.WebGLProperties();
        textures = new PGL.WebGLTextures(_gl, extensions, state, properties, capabilities, utils, null);
        attributes = new PGL.WebGLAttributes(_gl);
        geometries = new PGL.WebGLGeometries(_gl, attributes);
        objects = new PGL.WebGLObjects(geometries);

        programCache = new PGL.WebGLPrograms(_this, extensions, capabilities);
        renderLists = new PGL.WebGLRenderLists();
        renderStates = new PGL.WebGLRenderStates();

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
    this.renderBufferDirect = function (camera, fog, geometry, material, object, group) {

        var program = setProgram(camera, null, object.material, object);
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

    /**
     * 循环渲染物体
     * @param scene 场景
     * @param camera 相机
     */
    this.render = function (scene, camera) {

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

        // 渲染背景
        background.render(currentRenderList, scene, camera, forceClear);

        if (scene.overrideMaterial) {
        }
        else {
            // opaque pass (front-to-back order)
            if (opaqueObjects.length) renderObjects(opaqueObjects, scene, camera);
        }

        // Ensure depth buffer writing is enabled so it can be cleared on next render

        state.buffers.depth.setTest(true);

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

            if (camera.isArrayCamera) {}
            else {
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

        if (object.isImmediateRenderObject) {}
        else {
            _this.renderBufferDirect(camera, scene.fog, geometry, material, object, group);
        }

        currentRenderState = renderStates.get(scene,camera);
    }

    /**
     * 根据材质组件着色器字符串
     * @param material 材质
     * @param object 对象
     */
    function initMaterial(material, object) {

        var materialProperties = properties.get(material);

        // 获取参数
        var parameters = programCache.getParameters(material, null, null, null, null, null, object);

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

        var materialProperties = properties.get(material);

        // 更新着色器程序
        if (material.needsUpdate) {
            initMaterial(material, object);
            material.needsUpdate = false;
        }

        var refreshProgram = false;
        var refreshMaterial = false;

        var program = materialProperties.program,
            p_uniforms = program.getUniforms(),
            m_uniforms = materialProperties.shader.uniforms;

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
            if (object.material.isMeshPhongMaterial) {
                refreshUniformsCommon(m_uniforms, material);
            } else if (object.material.isPointsMaterial) {
                // 更新uniform相关变量
                refreshUniformsPoints(m_uniforms, material);
            }

            // 将uniforms变量传送给着色器
            PGL.WebGLUniforms.upload(_gl, materialProperties.uniformsList, m_uniforms, _this);

            // if (material.map) {
            //     var gl = _gl;
            //
            //     var texture = gl.createTexture();
            //     gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);//对纹理图像进行y轴反转
            //     // 开启0号纹理单元
            //     gl.activeTexture(gl.TEXTURE0);
            //     // 向target绑定纹理对象
            //     gl.bindTexture(gl.TEXTURE_2D, texture);
            //
            //     /**配置纹理参数 CLAMP_TO_EDGE  ：纹理外填充了最边缘纹理颜色 MIRRORED_REPEAT：重复贴图**/
            //     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            //
            //     // 配置纹理图像
            //     gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, material.map.image);
            //
            // }
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

        if (material.map) {
            uniforms.map.value = material.map;
        }
    }

    function refreshUniformsPoints(uniforms, material) {
        uniforms.diffuse.value = material.color;
        uniforms.size.value = material.size;
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
    this.setTexture2D = (function () {

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

PGL.UniformsCache = function () {

    var lights = {};

    return {

        get: function (light) {

            if (lights[light.id] !== undefined) {

                return lights[light.id];

            }

            var uniforms;

            switch (light.type) {

                case 'DirectionalLight':
                    uniforms = {
                        direction: new Vector3(),
                        color: new Color(),

                        shadow: false,
                        shadowBias: 0,
                        shadowRadius: 1,
                        shadowMapSize: new Vector2()
                    };
                    break;

                case 'SpotLight':
                    uniforms = {
                        position: new Vector3(),
                        direction: new Vector3(),
                        color: new Color(),
                        distance: 0,
                        coneCos: 0,
                        penumbraCos: 0,
                        decay: 0,

                        shadow: false,
                        shadowBias: 0,
                        shadowRadius: 1,
                        shadowMapSize: new Vector2()
                    };
                    break;

                case 'PointLight':
                    uniforms = {
                        position: new Vector3(),
                        color: new Color(),
                        distance: 0,
                        decay: 0,

                        shadow: false,
                        shadowBias: 0,
                        shadowRadius: 1,
                        shadowMapSize: new Vector2(),
                        shadowCameraNear: 1,
                        shadowCameraFar: 1000
                    };
                    break;

                case 'HemisphereLight':
                    uniforms = {
                        direction: new Vector3(),
                        skyColor: new Color(),
                        groundColor: new Color()
                    };
                    break;

                case 'RectAreaLight':
                    uniforms = {
                        color: new Color(),
                        position: new Vector3(),
                        halfWidth: new Vector3(),
                        halfHeight: new Vector3()
                        // TODO (abelnation): set RectAreaLight shadow uniforms
                    };
                    break;

            }

            lights[light.id] = uniforms;

            return uniforms;

        }

    };
};
var count = 0;
PGL.WebGLLights = function () {

    var cache = new PGL.UniformsCache();

    var state = {

        id: count++,

        hash: {
            stateID: -1,
            directionalLength: -1,
            pointLength: -1,
            spotLength: -1,
            rectAreaLength: -1,
            hemiLength: -1,
            shadowsLength: -1
        },

        ambient: [0, 0, 0],
        probe: [],
        directional: [],
        directionalShadowMap: [],
        directionalShadowMatrix: [],
        spot: [],
        spotShadowMap: [],
        spotShadowMatrix: [],
        rectArea: [],
        point: [],
        pointShadowMap: [],
        pointShadowMatrix: [],
        hemi: []

    };

    for (var i = 0; i < 9; i++) state.probe.push(new PGL.Vector3());

    var vector3 = new PGL.Vector3();
    var matrix4 = new PGL.Matrix4();
    var matrix42 = new PGL.Matrix4();

    function setup(lights, shadows, camera) {

        var r = 0, g = 0, b = 0;

        for (var i = 0; i < 9; i++) state.probe[i].set(0, 0, 0);

        var directionalLength = 0;
        var pointLength = 0;
        var spotLength = 0;
        var rectAreaLength = 0;
        var hemiLength = 0;

        var viewMatrix = camera.matrixWorldInverse;

        for (var i = 0, l = lights.length; i < l; i++) {

            var light = lights[i];

            var color = light.color;
            var intensity = light.intensity;
            var distance = light.distance;

            var shadowMap = (light.shadow && light.shadow.map) ? light.shadow.map.texture : null;

            if (light.isAmbientLight) {

                r += color.r * intensity;
                g += color.g * intensity;
                b += color.b * intensity;

            } else if (light.isLightProbe) {

                for (var j = 0; j < 9; j++) {

                    state.probe[j].addScaledVector(light.sh.coefficients[j], intensity);

                }

            } else if (light.isDirectionalLight) {

                var uniforms = cache.get(light);

                uniforms.color.copy(light.color).multiplyScalar(light.intensity);
                uniforms.direction.setFromMatrixPosition(light.matrixWorld);
                vector3.setFromMatrixPosition(light.target.matrixWorld);
                uniforms.direction.sub(vector3);
                uniforms.direction.transformDirection(viewMatrix);

                uniforms.shadow = light.castShadow;

                if (light.castShadow) {

                    var shadow = light.shadow;

                    uniforms.shadowBias = shadow.bias;
                    uniforms.shadowRadius = shadow.radius;
                    uniforms.shadowMapSize = shadow.mapSize;

                }

                state.directionalShadowMap[directionalLength] = shadowMap;
                state.directionalShadowMatrix[directionalLength] = light.shadow.matrix;
                state.directional[directionalLength] = uniforms;

                directionalLength++;

            } else if (light.isSpotLight) {

                var uniforms = cache.get(light);

                uniforms.position.setFromMatrixPosition(light.matrixWorld);
                uniforms.position.applyMatrix4(viewMatrix);

                uniforms.color.copy(color).multiplyScalar(intensity);
                uniforms.distance = distance;

                uniforms.direction.setFromMatrixPosition(light.matrixWorld);
                vector3.setFromMatrixPosition(light.target.matrixWorld);
                uniforms.direction.sub(vector3);
                uniforms.direction.transformDirection(viewMatrix);

                uniforms.coneCos = Math.cos(light.angle);
                uniforms.penumbraCos = Math.cos(light.angle * (1 - light.penumbra));
                uniforms.decay = light.decay;

                uniforms.shadow = light.castShadow;

                if (light.castShadow) {

                    var shadow = light.shadow;

                    uniforms.shadowBias = shadow.bias;
                    uniforms.shadowRadius = shadow.radius;
                    uniforms.shadowMapSize = shadow.mapSize;

                }

                state.spotShadowMap[spotLength] = shadowMap;
                state.spotShadowMatrix[spotLength] = light.shadow.matrix;
                state.spot[spotLength] = uniforms;

                spotLength++;

            } else if (light.isRectAreaLight) {

                var uniforms = cache.get(light);

                // (a) intensity is the total visible light emitted
                //uniforms.color.copy( color ).multiplyScalar( intensity / ( light.width * light.height * Math.PI ) );

                // (b) intensity is the brightness of the light
                uniforms.color.copy(color).multiplyScalar(intensity);

                uniforms.position.setFromMatrixPosition(light.matrixWorld);
                uniforms.position.applyMatrix4(viewMatrix);

                // extract local rotation of light to derive width/height half vectors
                matrix42.identity();
                matrix4.copy(light.matrixWorld);
                matrix4.premultiply(viewMatrix);
                matrix42.extractRotation(matrix4);

                uniforms.halfWidth.set(light.width * 0.5, 0.0, 0.0);
                uniforms.halfHeight.set(0.0, light.height * 0.5, 0.0);

                uniforms.halfWidth.applyMatrix4(matrix42);
                uniforms.halfHeight.applyMatrix4(matrix42);

                // TODO (abelnation): RectAreaLight distance?
                // uniforms.distance = distance;

                state.rectArea[rectAreaLength] = uniforms;

                rectAreaLength++;

            } else if (light.isPointLight) {

                var uniforms = cache.get(light);

                uniforms.position.setFromMatrixPosition(light.matrixWorld);
                uniforms.position.applyMatrix4(viewMatrix);

                uniforms.color.copy(light.color).multiplyScalar(light.intensity);
                uniforms.distance = light.distance;
                uniforms.decay = light.decay;

                uniforms.shadow = light.castShadow;

                if (light.castShadow) {

                    var shadow = light.shadow;

                    uniforms.shadowBias = shadow.bias;
                    uniforms.shadowRadius = shadow.radius;
                    uniforms.shadowMapSize = shadow.mapSize;
                    uniforms.shadowCameraNear = shadow.camera.near;
                    uniforms.shadowCameraFar = shadow.camera.far;

                }

                state.pointShadowMap[pointLength] = shadowMap;
                state.pointShadowMatrix[pointLength] = light.shadow.matrix;
                state.point[pointLength] = uniforms;

                pointLength++;

            } else if (light.isHemisphereLight) {

                var uniforms = cache.get(light);

                uniforms.direction.setFromMatrixPosition(light.matrixWorld);
                uniforms.direction.transformDirection(viewMatrix);
                uniforms.direction.normalize();

                uniforms.skyColor.copy(light.color).multiplyScalar(intensity);
                uniforms.groundColor.copy(light.groundColor).multiplyScalar(intensity);

                state.hemi[hemiLength] = uniforms;

                hemiLength++;

            }

        }

        state.ambient[0] = r;
        state.ambient[1] = g;
        state.ambient[2] = b;

        state.directional.length = directionalLength;
        state.spot.length = spotLength;
        state.rectArea.length = rectAreaLength;
        state.point.length = pointLength;
        state.hemi.length = hemiLength;

        state.hash.stateID = state.id;
        state.hash.directionalLength = directionalLength;
        state.hash.pointLength = pointLength;
        state.hash.spotLength = spotLength;
        state.hash.rectAreaLength = rectAreaLength;
        state.hash.hemiLength = hemiLength;
        state.hash.shadowsLength = shadows.length;

    }

    return {
        setup: setup,
        state: state
    };

};

/**
 * Webgl渲染状态
 * @returns {{init: init, pushLight: pushLight, pushShadow: pushShadow, state: {shadowsArray: Array, lightsArray: Array, lights: {setup, state}}, setupLights: setupLights}}
 * @constructor
 */
PGL.WebGLRenderState = function () {

    var lights = new PGL.WebGLLights();

    var lightsArray = [];
    var shadowsArray = [];

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
PGL.WebGLRenderStates = function WebGLRenderStates() {

    var renderStates = {};

    function onSceneDispose(event) {

        var scene = event.target;

        scene.removeEventListener('dispose', onSceneDispose);

        delete renderStates[scene.id];

    }

    function get(scene, camera) {

        var renderState;

        if (renderStates[scene.id] === undefined) {

            renderState = new PGL.WebGLRenderState();
            renderStates[scene.id] = {};
            renderStates[scene.id][camera.id] = renderState;

            // scene.addEventListener( 'dispose', onSceneDispose );

        } else {

            if (renderStates[scene.id][camera.id] === undefined) {

                renderState = new PGL.WebGLRenderState();
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

/**
 * 工具类
 * @param gl 上下文
 * @param extensions 获取扩展方法的对象
 * @param capabilities
 * @return {{convert: convert}}
 * @constructor
 */
PGL.WebGLUtils = function (gl, extensions, capabilities) {

    /**
     * 根据three中的常量，返回webgl中对应的常量
     * @param p
     * @returns {GLenum|number|*|GLenum|number|*|number|GLenum}
     */
    function convert(p) {

        var extension;

        if (p === PGL.RepeatWrapping) return gl.REPEAT;
        if (p === PGL.ClampToEdgeWrapping) return gl.CLAMP_TO_EDGE;
        if (p === PGL.MirroredRepeatWrapping) return gl.MIRRORED_REPEAT;

        if (p === PGL.NearestFilter) return gl.NEAREST;
        if (p === PGL.NearestMipMapNearestFilter) return gl.NEAREST_MIPMAP_NEAREST;
        if (p === PGL.NearestMipMapLinearFilter) return gl.NEAREST_MIPMAP_LINEAR;

        if (p === PGL.LinearFilter) return gl.LINEAR;
        if (p === PGL.LinearMipMapNearestFilter) return gl.LINEAR_MIPMAP_NEAREST;
        if (p === PGL.LinearMipMapLinearFilter) return gl.LINEAR_MIPMAP_LINEAR;

        if (p === PGL.UnsignedByteType) return gl.UNSIGNED_BYTE;
        if (p === PGL.UnsignedShort4444Type) return gl.UNSIGNED_SHORT_4_4_4_4;
        if (p === PGL.UnsignedShort5551Type) return gl.UNSIGNED_SHORT_5_5_5_1;
        if (p === PGL.UnsignedShort565Type) return gl.UNSIGNED_SHORT_5_6_5;

        if (p === PGL.ByteType) return gl.BYTE;
        if (p === PGL.ShortType) return gl.SHORT;
        if (p === PGL.UnsignedShortType) return gl.UNSIGNED_SHORT;
        if (p === PGL.IntType) return gl.INT;
        if (p === PGL.UnsignedIntType) return gl.UNSIGNED_INT;
        if (p === PGL.FloatType) return gl.FLOAT;

        if (p === PGL.HalfFloatType) {

            if (capabilities.isWebGL2) return gl.HALF_FLOAT;

            extension = extensions.get('OES_texture_half_float');

            if (extension !== null) return extension.HALF_FLOAT_OES;

        }

        if (p === PGL.AlphaFormat) return gl.ALPHA;
        if (p === PGL.RGBFormat) return gl.RGB;
        if (p === PGL.RGBAFormat) return gl.RGBA;
        if (p === PGL.LuminanceFormat) return gl.LUMINANCE;
        if (p === PGL.LuminanceAlphaFormat) return gl.LUMINANCE_ALPHA;
        if (p === PGL.DepthFormat) return gl.DEPTH_COMPONENT;
        if (p === PGL.DepthStencilFormat) return gl.DEPTH_STENCIL;
        if (p === PGL.RedFormat) return gl.RED;

        if (p === PGL.AddEquation) return gl.FUNC_ADD;
        if (p === PGL.SubtractEquation) return gl.FUNC_SUBTRACT;
        if (p === PGL.ReverseSubtractEquation) return gl.FUNC_REVERSE_SUBTRACT;

        if (p === PGL.ZeroFactor) return gl.ZERO;
        if (p === PGL.OneFactor) return gl.ONE;
        if (p === PGL.SrcColorFactor) return gl.SRC_COLOR;
        if (p === PGL.OneMinusSrcColorFactor) return gl.ONE_MINUS_SRC_COLOR;
        if (p === PGL.SrcAlphaFactor) return gl.SRC_ALPHA;
        if (p === PGL.OneMinusSrcAlphaFactor) return gl.ONE_MINUS_SRC_ALPHA;
        if (p === PGL.DstAlphaFactor) return gl.DST_ALPHA;
        if (p === PGL.OneMinusDstAlphaFactor) return gl.ONE_MINUS_DST_ALPHA;

        if (p === PGL.DstColorFactor) return gl.DST_COLOR;
        if (p === PGL.OneMinusDstColorFactor) return gl.ONE_MINUS_DST_COLOR;
        if (p === PGL.SrcAlphaSaturateFactor) return gl.SRC_ALPHA_SATURATE;

        if (p === PGL.RGB_S3TC_DXT1_Format || p === PGL.RGBA_S3TC_DXT1_Format ||
            p === PGL.RGBA_S3TC_DXT3_Format || p === PGL.RGBA_S3TC_DXT5_Format) {

            extension = extensions.get('WEBGL_compressed_texture_s3tc');

            if (extension !== null) {

                if (p === PGL.RGB_S3TC_DXT1_Format) return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
                if (p === PGL.RGBA_S3TC_DXT1_Format) return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                if (p === PGL.RGBA_S3TC_DXT3_Format) return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                if (p === PGL.RGBA_S3TC_DXT5_Format) return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;

            }

        }

        if (p === PGL.RGB_PVRTC_4BPPV1_Format || p === PGL.RGB_PVRTC_2BPPV1_Format ||
            p === PGL.RGBA_PVRTC_4BPPV1_Format || p === PGL.RGBA_PVRTC_2BPPV1_Format) {

            extension = extensions.get('WEBGL_compressed_texture_pvrtc');

            if (extension !== null) {

                if (p === PGL.RGB_PVRTC_4BPPV1_Format) return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                if (p === PGL.RGB_PVRTC_2BPPV1_Format) return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                if (p === PGL.RGBA_PVRTC_4BPPV1_Format) return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                if (p === PGL.RGBA_PVRTC_2BPPV1_Format) return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;

            }

        }

        if (p === PGL.RGB_ETC1_Format) {

            extension = extensions.get('WEBGL_compressed_texture_etc1');

            if (extension !== null) return extension.COMPRESSED_RGB_ETC1_WEBGL;

        }

        if (p === PGL.RGBA_ASTC_4x4_Format || p === PGL.RGBA_ASTC_5x4_Format || p === PGL.RGBA_ASTC_5x5_Format ||
            p === PGL.RGBA_ASTC_6x5_Format || p === PGL.RGBA_ASTC_6x6_Format || p === PGL.RGBA_ASTC_8x5_Format ||
            p === PGL.RGBA_ASTC_8x6_Format || p === PGL.RGBA_ASTC_8x8_Format || p === PGL.RGBA_ASTC_10x5_Format ||
            p === PGL.RGBA_ASTC_10x6_Format || p === PGL.RGBA_ASTC_10x8_Format || p === PGL.RGBA_ASTC_10x10_Format ||
            p === PGL.RGBA_ASTC_12x10_Format || p === PGL.RGBA_ASTC_12x12_Format) {

            extension = extensions.get('WEBGL_compressed_texture_astc');

            if (extension !== null) {

                return p;

            }

        }

        if (p === PGL.MinEquation || p === PGL.MaxEquation) {

            if (capabilities.isWebGL2) {

                if (p === PGL.MinEquation) return gl.MIN;
                if (p === PGL.MaxEquation) return gl.MAX;

            }

            extension = extensions.get('EXT_blend_minmax');

            if (extension !== null) {

                if (p === PGL.MinEquation) return extension.MIN_EXT;
                if (p === PGL.MaxEquation) return extension.MAX_EXT;

            }

        }

        if (p === PGL.UnsignedInt248Type) {

            if (capabilities.isWebGL2) return gl.UNSIGNED_INT_24_8;

            extension = extensions.get('WEBGL_depth_texture');

            if (extension !== null) return extension.UNSIGNED_INT_24_8_WEBGL;

        }

        return 0;

    }

    return {convert: convert};

};

/**
 * 和贴图相关的方法属性
 * @param _gl
 * @param extensions
 * @param state
 * @param properties
 * @param capabilities
 * @param utils 辅助类
 * @param info
 * @constructor
 */
PGL.WebGLTextures = function (_gl, extensions, state, properties, capabilities, utils, info) {

    var _canvas;

    /**
     * 限制图片的大小
     * @param image
     * @param maxSize
     * @returns {HTMLElement|*}
     */
    function clampToMaxSize(image, maxSize) {

        if (image.width > maxSize || image.height > maxSize) {

            if ('data' in image) {

                console.warn('THREE.WebGLRenderer: image in DataTexture is too big (' + image.width + 'x' + image.height + ').');
                return;

            }

            // Warning: Scaling through the canvas will only work with images that use
            // premultiplied alpha.

            var scale = maxSize / Math.max(image.width, image.height);

            var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
            canvas.width = Math.floor(image.width * scale);
            canvas.height = Math.floor(image.height * scale);

            var context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

            console.warn('THREE.WebGLRenderer: image is too big (' + image.width + 'x' + image.height + '). Resized to ' + canvas.width + 'x' + canvas.height);

            return canvas;

        }

        return image;

    }

    function isPowerOfTwo(image) {

        return PGL._Math.isPowerOfTwo(image.width) && PGL._Math.isPowerOfTwo(image.height);

    }

    function setTexture2D(texture, slot) {

        var textureProperties = properties.get(texture);

        if (texture.version > 0 && textureProperties.__version !== texture.version) {

            var image = texture.image;

            if (image === undefined) {
                console.warn('THREE.WebGLRenderer: Texture marked for update but image is undefined');
            } else if (image.complete === false) {
                console.warn('THREE.WebGLRenderer: Texture marked for update but image is incomplete');
            } else {
                uploadTexture(textureProperties, texture, slot);
                return;
            }
        }

        state.activeTexture(_gl.TEXTURE0 + slot);
        state.bindTexture(_gl.TEXTURE_2D, textureProperties.__webglTexture);
    }

    function textureNeedsPowerOfTwo(texture) {

        if (capabilities.isWebGL2) return false;

        return (texture.wrapS !== PGL.ClampToEdgeWrapping || texture.wrapT !== PGL.ClampToEdgeWrapping) ||
            (texture.minFilter !== PGL.NearestFilter && texture.minFilter !== PGL.LinearFilter);

    }

    function makePowerOfTwo(image) {

        if (image instanceof HTMLImageElement || image instanceof HTMLCanvasElement || image instanceof ImageBitmap) {

            if (_canvas === undefined) _canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');

            _canvas.width = PGL._Math.floorPowerOfTwo(image.width);
            _canvas.height = PGL._Math.floorPowerOfTwo(image.height);

            var context = _canvas.getContext('2d');
            context.drawImage(image, 0, 0, _canvas.width, _canvas.height);

            console.warn('THREE.WebGLRenderer: image is not power of two (' + image.width + 'x' + image.height + '). Resized to ' + _canvas.width + 'x' + _canvas.height);

            return _canvas;

        }

        return image;

    }

    function getInternalFormat(glFormat, glType) {

        if (!capabilities.isWebGL2) return glFormat;

        if (glFormat === 6403) {

            if (glType === 5126) return 33326;
            if (glType === 5131) return 33325;
            if (glType === 5121) return 33321;

        }

        if (glFormat === 6407) {

            if (glType === 5126) return 34837;
            if (glType === 5131) return 34843;
            if (glType === 5121) return 32849;

        }

        if (glFormat === 6408) {

            if (glType === 5126) return 34836;
            if (glType === 5131) return 34842;
            if (glType === 5121) return 32856;

        }

        return glFormat;

    }

    // Fallback filters for non-power-of-2 textures
    function filterFallback(f) {

        if (f === PGL.NearestFilter || f === PGL.NearestMipMapNearestFilter || f === PGL.NearestMipMapLinearFilter) {
            return 9728;
        }
        return 9729;
    }

    /**
     * 设置纹理参数
     * @param textureType
     * @param texture
     * @param isPowerOfTwoImage
     */
    function setTextureParameters(textureType, texture, isPowerOfTwoImage) {

        var extension;

        if (isPowerOfTwoImage) {

            _gl.texParameteri(textureType, 10242, utils.convert(texture.wrapS));
            _gl.texParameteri(textureType, 10243, utils.convert(texture.wrapT));

            _gl.texParameteri(textureType, 10240, utils.convert(texture.magFilter));
            _gl.texParameteri(textureType, 10241, utils.convert(texture.minFilter));

        } else {

            _gl.texParameteri(textureType, 10242, 33071);
            _gl.texParameteri(textureType, 10243, 33071);

            if (texture.wrapS !== PGL.ClampToEdgeWrapping || texture.wrapT !== PGL.ClampToEdgeWrapping) {

                console.warn('THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.');

            }

            _gl.texParameteri(textureType, 10240, filterFallback(texture.magFilter));
            _gl.texParameteri(textureType, 10241, filterFallback(texture.minFilter));

            if (texture.minFilter !== PGL.NearestFilter && texture.minFilter !== PGL.LinearFilter) {

                console.warn('THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.');

            }

        }

        extension = extensions.get('EXT_texture_filter_anisotropic');

        if (extension) {

            if (texture.type === PGL.FloatType && extensions.get('OES_texture_float_linear') === null) return;
            if (texture.type === PGL.HalfFloatType && (capabilities.isWebGL2 || extensions.get('OES_texture_half_float_linear')) === null) return;

            if (texture.anisotropy > 1 || properties.get(texture).__currentAnisotropy) {

                _gl.texParameterf(textureType, extension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(texture.anisotropy, capabilities.getMaxAnisotropy()));
                properties.get(texture).__currentAnisotropy = texture.anisotropy;

            }

        }

    }

    /**
     *
     * @param textureProperties
     * @param texture
     * @param slot：纹理单元
     */
    function uploadTexture(textureProperties, texture, slot) {

        var textureType; // 纹理类型

        if (texture.isDataTexture3D) {
            textureType = 32879;
        } else {
            textureType = 3553;// _gl.TEXTURE_2D
        }

        if (textureProperties.__webglInit === undefined) {
            textureProperties.__webglInit = true;
            // texture.addEventListener( 'dispose', onTextureDispose );
            textureProperties.__webglTexture = _gl.createTexture();
            // info.memory.textures ++;
        }

        state.activeTexture(33984 + slot);
        // 向target绑定纹理对象
        state.bindTexture(textureType, textureProperties.__webglTexture);

        _gl.pixelStorei(37440, texture.flipY); //对纹理图像进行y轴反转
        _gl.pixelStorei(37441, texture.premultiplyAlpha); // 将Alpha通道与其他颜色通道相乘
        _gl.pixelStorei(3317, texture.unpackAlignment); // 从内存中解包像素数据。

        var image = clampToMaxSize(texture.image, capabilities.maxTextureSize);

        if (textureNeedsPowerOfTwo(texture) && isPowerOfTwo(image) === false) {
            image = makePowerOfTwo(image);
        }

        var isPowerOfTwoImage = isPowerOfTwo(image),
            glFormat = utils.convert(texture.format),
            glType = utils.convert(texture.type),
            glInternalFormat = getInternalFormat(glFormat, glType);

        setTextureParameters(textureType, texture, isPowerOfTwoImage);

        var mipmap, mipmaps = texture.mipmaps;

        if (texture.isDepthTexture) {
        } else if (texture.isDataTexture) {
        } else if (texture.isCompressedTexture) {
        } else if (texture.isDataTexture3D) {
        } else {

            // regular Texture (image, video, canvas)

            // use manually created mipmaps if available
            // if there are no manual mipmaps
            // set 0 level mipmap and then use GL to generate other mipmap levels

            if (mipmaps.length > 0 && isPowerOfTwoImage) {

                for (var i = 0, il = mipmaps.length; i < il; i++) {

                    mipmap = mipmaps[i];
                    state.texImage2D(3553, i, glInternalFormat, glFormat, glType, mipmap);

                }

                texture.generateMipmaps = false;
                textureProperties.__maxMipLevel = mipmaps.length - 1;

            } else {
                // 配置纹理图像
                state.texImage2D(3553, 0, glInternalFormat, glFormat, glType, image);
                textureProperties.__maxMipLevel = 0;
            }
        }

        // if ( textureNeedsGenerateMipmaps( texture, isPowerOfTwoImage ) ) {
        //
        //     generateMipmap( 3553, texture, image.width, image.height );
        //
        // }

        textureProperties.__version = texture.version;

        // if ( texture.onUpdate ) texture.onUpdate( texture );
    }

    this.setTexture2D = setTexture2D;
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

    function DepthBuffer() {

        var locked = false; // 锁定或释放深度缓存区的写入操作

        var currentDepthMask = null; // 锁定或释放深度缓存区的写入操作
        var currentDepthFunc = null; // 比较函数值
        var currentDepthClear = null;

        return {

            /**
             * 隐藏面消除 true 启动 false 关闭
             * @param depthTest
             */
            setTest: function (depthTest) {
                if (depthTest) {
                    enable(gl.DEPTH_TEST);
                } else {
                    disable(gl.DEPTH_TEST);
                }
            },

            /**
             * @param depthMask 指定是锁定深度缓存区的写入操作（false），还是释放（true）
             */
            setMask: function (depthMask) {

                if (currentDepthMask !== depthMask && !locked) {

                    gl.depthMask(depthMask);
                    currentDepthMask = depthMask;

                }

            },

            /**
             * 将传入像素深度与当前深度缓冲区值进行比较的函数
             * @param depthFunc
             */
            setFunc: function (depthFunc) {

                if (currentDepthFunc !== depthFunc) {

                    if (depthFunc) {

                        switch (depthFunc) {

                            case NeverDepth:

                                gl.depthFunc(gl.NEVER);
                                break;

                            case AlwaysDepth:

                                gl.depthFunc(gl.ALWAYS);
                                break;

                            case LessDepth:

                                gl.depthFunc(gl.LESS);
                                break;

                            case LessEqualDepth:

                                gl.depthFunc(gl.LEQUAL);
                                break;

                            case EqualDepth:

                                gl.depthFunc(gl.EQUAL);
                                break;

                            case GreaterEqualDepth:

                                gl.depthFunc(gl.GEQUAL);
                                break;

                            case GreaterDepth:

                                gl.depthFunc(gl.GREATER);
                                break;

                            case NotEqualDepth:

                                gl.depthFunc(gl.NOTEQUAL);
                                break;

                            default:

                                gl.depthFunc(gl.LEQUAL);

                        }

                    } else {

                        gl.depthFunc(gl.LEQUAL);

                    }

                    currentDepthFunc = depthFunc;

                }

            },

            setLocked: function (lock) {

                locked = lock;

            },

            setClear: function (depth) {

                if (currentDepthClear !== depth) {

                    gl.clearDepth(depth);
                    currentDepthClear = depth;

                }

            },

            reset: function () {

                locked = false;

                currentDepthMask = null;
                currentDepthFunc = null;
                currentDepthClear = null;

            }

        };

    }

    var colorBuffer = new ColorBuffer();
    var depthBuffer = new DepthBuffer();

    var maxVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
    var newAttributes = new Uint8Array(maxVertexAttributes);
    var enabledAttributes = new Uint8Array(maxVertexAttributes);
    var attributeDivisors = new Uint8Array(maxVertexAttributes);

    var enabledCapabilities = {}; // 保存功能开启状态

    var currentProgram = null; // 当前使用的着色器程序

    var maxTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS); // 获取最大的纹理单元

    var currentTextureSlot = null;// 当前激活的纹理单元
    var currentBoundTextures = {}; // 当前绑定的纹理对象

    /**
     * 创建纹理贴图
     * @param type
     * @param target
     * @param count
     * @returns {WebGLTexture}
     */
    function createTexture(type, target, count) {

        var data = new Uint8Array(4); // 4 is required to match default unpack alignment of 4.
        var texture = gl.createTexture();

        gl.bindTexture(type, texture);
        gl.texParameteri(type, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(type, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        for (var i = 0; i < count; i++) {
            gl.texImage2D(target + i, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        }
        return texture;
    }

    var emptyTextures = {};
    emptyTextures[gl.TEXTURE_2D] = createTexture(gl.TEXTURE_2D, gl.TEXTURE_2D, 1);

    // 指定绘图区域的颜色
    colorBuffer.setClear(0, 0, 0, 1);
    // 指定绘图区域的深度
    depthBuffer.setClear(1);

    enable(gl.DEPTH_TEST); // 开启隐藏面消除

    // 初始化newAttributes为0
    function initAttributes() {
        for (var i = 0, l = newAttributes.length; i < l; i++) {
            newAttributes[i] = 0;
        }
    }

    function texImage2D() {

        try {

            gl.texImage2D.apply(gl, arguments);

        } catch (error) {

            console.error('THREE.WebGLState:', error);

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

    /**
     * 关闭功能
     * @param id
     */
    function disable(id) {
        if (enabledCapabilities[id] !== false) {
            gl.disable(id);
            enabledCapabilities[id] = false;
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

    // texture

    // 开启对应的纹理单元
    function activeTexture(webglSlot) {

        if (webglSlot === undefined) webglSlot = gl.TEXTURE0 + maxTextures - 1;

        if (currentTextureSlot !== webglSlot) {
            gl.activeTexture(webglSlot);
            currentTextureSlot = webglSlot;
        }
    }

    /**
     * 向target绑定纹理对象
     * @param webglType 绑定的纹理目标
     * @param webglTexture 纹理贴图
     */
    function bindTexture(webglType, webglTexture) {

        if (currentTextureSlot === null) {
            activeTexture();
        }

        var boundTexture = currentBoundTextures[currentTextureSlot];

        if (boundTexture === undefined) {
            boundTexture = {type: undefined, texture: undefined};
            currentBoundTextures[currentTextureSlot] = boundTexture;
        }

        if (boundTexture.type !== webglType || boundTexture.texture !== webglTexture) {

            gl.bindTexture(webglType, webglTexture || emptyTextures[webglType]);

            boundTexture.type = webglType;
            boundTexture.texture = webglTexture;
        }
    }

    return {
        buffers: {
            color: colorBuffer,
            depth: depthBuffer
        },

        initAttributes: initAttributes,
        enableAttribute: enableAttribute,
        enableAttributeAndDivisor: enableAttributeAndDivisor,
        enable: enable,

        useProgram: useProgram,

        activeTexture: activeTexture,
        bindTexture: bindTexture,
        texImage2D: texImage2D
    }
};

/**
 * 渲染列表
 * @returns {{init: init, opaque: Array, unshift: unshift, sort: sort, transparent: Array, push: push}}
 * @constructor
 */
PGL.WebGLRenderList = function () {

    var renderItems = [];
    var renderItemsIndex = 0;

    var opaque = [];
    var transparent = [];

    var defaultProgram = {id: -1};

    function init() {

        renderItemsIndex = 0;

        opaque.length = 0;
        transparent.length = 0;

    }

    function getNextRenderItem(object, geometry, material, groupOrder, z, group) {

        var renderItem = renderItems[renderItemsIndex];

        if (renderItem === undefined) {

            renderItem = {
                id: object.id,
                object: object,
                geometry: geometry,
                material: material,
                program: material.program || defaultProgram,
                groupOrder: groupOrder,
                renderOrder: object.renderOrder,
                z: z,
                group: group
            };

            renderItems[renderItemsIndex] = renderItem;

        } else {

            renderItem.id = object.id;
            renderItem.object = object;
            renderItem.geometry = geometry;
            renderItem.material = material;
            renderItem.program = material.program || defaultProgram;
            renderItem.groupOrder = groupOrder;
            renderItem.renderOrder = object.renderOrder;
            renderItem.z = z;
            renderItem.group = group;

        }

        renderItemsIndex++;

        return renderItem;

    }

    function push(object, geometry, material, groupOrder, z, group) {

        var renderItem = getNextRenderItem(object, geometry, material, groupOrder, z, group);

        (material.transparent === true ? transparent : opaque).push(renderItem);

    }

    function unshift(object, geometry, material, groupOrder, z, group) {

        var renderItem = getNextRenderItem(object, geometry, material, groupOrder, z, group);

        (material.transparent === true ? transparent : opaque).unshift(renderItem);

    }

    function sort() {

        if (opaque.length > 1) opaque.sort(painterSortStable);
        if (transparent.length > 1) transparent.sort(reversePainterSortStable);

    }

    return {
        opaque: opaque,
        transparent: transparent,

        init: init,
        push: push,
        unshift: unshift,

        sort: sort
    };

};

/**
 * 渲染列表管理
 * @returns {{get: (function(*, *): {init: init, opaque: Array, unshift: unshift, sort: sort, transparent: Array, push: push}), dispose: dispose}}
 * @constructor
 */
PGL.WebGLRenderLists = function () {

    var lists = {};

    function onSceneDispose(event) {

        var scene = event.target;

        scene.removeEventListener('dispose', onSceneDispose);

        delete lists[scene.id];

    }

    function get(scene, camera) {

        var cameras = lists[scene.id];
        var list;
        if (cameras === undefined) {

            list = new PGL.WebGLRenderList();
            lists[scene.id] = {};
            lists[scene.id][camera.id] = list;

            // scene.addEventListener( 'dispose', onSceneDispose );

        } else {

            list = cameras[camera.id];
            if (list === undefined) {

                list = new PGL.WebGLRenderList();
                cameras[camera.id] = list;

            }

        }

        return list;

    }

    function dispose() {

        lists = {};

    }

    return {
        get: get,
        dispose: dispose
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

    /**
     * 获取参数标记
     * @param material 材质对象
     * @param lights
     * @param shadows
     * @param fog
     * @param nClipPlanes
     * @param nClipIntersection
     * @param object
     * @return {{shaderID: *, precision, supportsVertexTextures, outputEncoding, map: boolean, mapEncoding, matcap: boolean, matcapEncoding, envMap: boolean, envMapMode: *, envMapEncoding, envMapCubeUV: boolean, lightMap: boolean, aoMap: boolean, emissiveMap: boolean, emissiveMapEncoding, bumpMap: boolean, normalMap: boolean, objectSpaceNormalMap: boolean, displacementMap: boolean, roughnessMap: boolean, metalnessMap: boolean, specularMap: boolean, alphaMap: boolean, gradientMap: boolean, combine, vertexColors, fog: boolean, useFog, fogExp: *|boolean, flatShading, sizeAttenuation, logarithmicDepthBuffer: *, skinning: boolean, maxBones: *, useVertexTexture, morphTargets, morphNormals, maxMorphTargets: *|number, maxMorphNormals: *|number, numDirLights: number, numPointLights, numSpotLights: number, numRectAreaLights: number, numHemiLights: number, numClippingPlanes: *, numClipIntersection: *, dithering, shadowMapEnabled: boolean|*, shadowMapType: *, toneMapping, physicallyCorrectLights: *|boolean, premultipliedAlpha, alphaTest, doubleSided: boolean, flipSided: boolean, depthPacking: boolean}}
     */
    this.getParameters = function (material, lights, shadows, fog, nClipPlanes, nClipIntersection, object) {
        var shaderID = shaderIDs[object.material.type];

        var precision = capabilities.precision;

        var parameters = {
            shaderID: shaderID,

            precision: precision,
            map: !!material.map,
            vertexColors: material.vertexColors
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

            parameters.map ? '#define USE_MAP' : '',
            parameters.vertexColors ? '#define USE_COLOR' : '',

            'uniform mat4 modelViewMatrix;',
            'uniform mat4 projectionMatrix;',
            'uniform mat4 viewMatrix;',
            'uniform mat3 normalMatrix;',

            'attribute vec4 position;',
            'attribute vec2 uv;',

            '\n'

        ].filter(filterEmptyLine).join('\n');

        prefixFragment = [

            'precision ' + parameters.precision + ' float;',
            'precision ' + parameters.precision + ' int;',

            '#define SHADER_NAME ' + shader.name,

            parameters.map ? '#define USE_MAP' : '',
            parameters.vertexColors ? '#define USE_COLOR' : '',

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
