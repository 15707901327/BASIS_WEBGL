/**
 * 三维坐标
 * @param x
 * @param y
 * @param z
 * @constructor
 */
function Vector3(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

Object.assign(Vector3.prototype, {

  isVector3: true,

  /**
   * 设置值
   * @param x
   * @param y
   * @param z
   */
  set: function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  },

  copy: function (v) {

    this.x = v.x;
    this.y = v.y;
    this.z = v.z;

    return this;

  },

  subVectors: function (a, b) {

    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;

    return this;

  },

  lengthSq: function () {

    return this.x * this.x + this.y * this.y + this.z * this.z;

  },

  normalize: function () {
    return this.divideScalar(this.length() || 1);
  },

  length: function () {

    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

  },

  divideScalar: function (scalar) {

    return this.multiplyScalar(1 / scalar);

  },
  multiplyScalar: function (scalar) {

    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;

    return this;

  },
  crossVectors: function (a, b) {

    var ax = a.x, ay = a.y, az = a.z;
    var bx = b.x, by = b.y, bz = b.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;

    return this;

  },
});

export default Vector3;