import Vector3 from "../math/Vector3.js";
import Matrix4 from "../math/Matrix4.js";
import {Quaternion} from "../math/Quaternion.js";

let _target = new Vector3();
let _position = new Vector3();
let _m1 = new Matrix4();

/**
 * 投影相机
 * @param fov 视角
 * @param aspect 宽度比
 * @param near 近视点
 * @param far 远视点
 * @constructor
 */
function PerspectiveCamera(fov, aspect, near, far) {

  this.fov = fov;
  this.aspect = aspect;
  this.near = near;
  this.far = far;

  this.matrix = new Matrix4(); // 本地位置坐标
  this.matrixWorld = new Matrix4(); // 世界位置坐标
  this.matrixWorldInverse = new Matrix4(); // 视图矩阵
  this.projectionMatrix = new Matrix4(); // 投影矩阵
  this.projectionMatrixInverse = new Matrix4(); // 投影矩阵的逆矩阵

  this.up = new Vector3(0, 1, 0);
  this.position = new Vector3();
  this.quaternion = new Quaternion();
  this.scale = new Vector3(1, 1, 1);

  // 初始化投影矩阵
  this.updateProjectionMatrix();
}

Object.assign(PerspectiveCamera.prototype, {
  /**
   * 更新投影矩阵
   */
  updateProjectionMatrix: function() {
    var near = this.near,
      top = near * Math.tan(Math.PI / 180 * 0.5 * this.fov),
      height = 2 * top,
      width = this.aspect * height,
      left = -0.5 * width;

    this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far);
  },

  /**
   * 更新本地矩阵，设置需要更新世界矩阵
   */
  updateMatrix: function() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
  },

  /**
   * 更新相机以及相机子类的本地和世界坐标矩阵
   * 设置matrixWorld的倒数矩阵matrixWorldInverse
   * @param force
   */
  updateMatrixWorld: function() {

    // 更新本地矩阵
    this.updateMatrix();

    // 设置世界矩阵
    this.matrixWorld.copy(this.matrix);

    this.matrixWorldInverse.getInverse(this.matrixWorld);
  },

  lookAt: function(x, y, z) {

    if (x.isVector3) {
      _target.copy(x);
    } else {
      _target.set(x, y, z);
    }

    _position.copy(this.position);

    _m1.lookAt(_position, _target, this.up);

    this.quaternion.setFromRotationMatrix(_m1);
  },
});

export default PerspectiveCamera;