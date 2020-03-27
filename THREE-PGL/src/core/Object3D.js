import {Vector3} from "../math/Vector3.js";
import {Quaternion} from "../math/Quaternion.js";
import {Matrix4} from "../math/Matrix4.js";
import {Matrix3} from "../math/Matrix3.js";
import {Layers} from "./Layers.js";

var object3DId = 0;

function Object3D() {

  Object.defineProperty(this, 'id', {value: object3DId++});

  this.parent = null;
  this.children = [];

  // 上方向
  this.up = Object3D.DefaultUp.clone();

  this.visible = true;

  var position = new Vector3();
  var quaternion = new Quaternion();
  var scale = new Vector3(1, 1, 1);

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
      value: new Matrix4()
    },
    // 法线矩阵
    normalMatrix: {
      value: new Matrix3()
    }
  });

  this.matrix = new Matrix4();
  this.matrixWorld = new Matrix4();

  this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
  this.matrixWorldNeedsUpdate = false;

  this.layers = new Layers(); // 图层
  this.visible = true; // 是否显示

  this.frustumCulled = true; // 标记是否检查物体在可视范围之内，默认检查 true

  this.userData = {};
};
Object3D.prototype = {

  constructor: Object3D,

  isObject3D: true,

  rotateOnAxis: function() {

    // rotate object on axis in object space
    // axis is assumed to be normalized

    var q1 = new Quaternion();

    return function rotateOnAxis(axis, angle) {

      q1.setFromAxisAngle(axis, angle);

      this.quaternion.multiply(q1);

      return this;

    };

  }(),

  rotateOnWorldAxis: function() {

    // rotate object on axis in world space
    // axis is assumed to be normalized
    // method assumes no rotated parent

    var q1 = new Quaternion();

    return function rotateOnWorldAxis(axis, angle) {

      q1.setFromAxisAngle(axis, angle);

      this.quaternion.premultiply(q1);

      return this;

    };

  }(),

  rotateX: function() {

    var v1 = new Vector3(1, 0, 0);

    return function rotateX(angle) {

      return this.rotateOnAxis(v1, angle);

    };

  }(),

  rotateY: function() {

    var v1 = new Vector3(0, 1, 0);

    return function rotateY(angle) {

      return this.rotateOnAxis(v1, angle);

    };

  }(),

  rotateZ: function() {

    var v1 = new Vector3(0, 0, 1);

    return function rotateZ(angle) {

      return this.rotateOnAxis(v1, angle);

    };

  }(),

  translateOnAxis: function() {

    // translate object by distance along axis in object space
    // axis is assumed to be normalized

    var v1 = new Vector3();

    return function translateOnAxis(axis, distance) {

      v1.copy(axis).applyQuaternion(this.quaternion);

      this.position.add(v1.multiplyScalar(distance));

      return this;

    };

  }(),

  translateX: function() {

    var v1 = new Vector3(1, 0, 0);

    return function translateX(distance) {

      return this.translateOnAxis(v1, distance);

    };

  }(),

  translateY: function() {

    var v1 = new Vector3(0, 1, 0);

    return function translateY(distance) {

      return this.translateOnAxis(v1, distance);

    };

  }(),

  translateZ: function() {

    var v1 = new Vector3(0, 0, 1);

    return function translateZ(distance) {

      return this.translateOnAxis(v1, distance);

    };

  }(),

  /**
   * 把object对象放到children数组中，从原有得父类中移除该对象
   * @param object 可以是一个值，也可以是多个值
   * @return {add}
   */
  add: function(object) {

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

  remove: function(object) {

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
  updateMatrix: function() {

    this.matrix.compose(this.position, this.quaternion, this.scale);

    this.matrixWorldNeedsUpdate = true;

  },
  /**
   * 更新当前对象以及子类对象的本地和世界坐标矩阵
   * @param force
   */
  updateMatrixWorld: function(force) {

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
  lookAt: function() {

    // This method does not support objects having non-uniformly-scaled parent(s)

    var q1 = new Quaternion();
    var m1 = new Matrix4();
    var target = new Vector3();
    var position = new Vector3();

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
  updateWorldMatrix: function(updateParents, updateChildren) {

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
Object3D.DefaultUp = new Vector3(0, 1, 0); // 默认上方向
Object3D.DefaultMatrixAutoUpdate = true; // 默认更新值

export {Object3D};