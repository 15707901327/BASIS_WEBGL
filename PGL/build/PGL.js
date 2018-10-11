// 常量
var PGL = {
  REVISION: '1',
  ColorKeywords: {
    'aliceblue': 0xF0F8FF,
    'antiquewhite': 0xFAEBD7,
    'aqua': 0x00FFFF,
    'aquamarine': 0x7FFFD4,
    'azure': 0xF0FFFF,
    'beige': 0xF5F5DC,
    'bisque': 0xFFE4C4,
    'black': 0x000000,
    'blanchedalmond': 0xFFEBCD,
    'blue': 0x0000FF,
    'blueviolet': 0x8A2BE2,
    'brown': 0xA52A2A,
    'burlywood': 0xDEB887,
    'cadetblue': 0x5F9EA0,
    'chartreuse': 0x7FFF00,
    'chocolate': 0xD2691E,
    'coral': 0xFF7F50,
    'cornflowerblue': 0x6495ED,
    'cornsilk': 0xFFF8DC,
    'crimson': 0xDC143C,
    'cyan': 0x00FFFF,
    'darkblue': 0x00008B,
    'darkcyan': 0x008B8B,
    'darkgoldenrod': 0xB8860B,
    'darkgray': 0xA9A9A9,
    'darkgreen': 0x006400,
    'darkgrey': 0xA9A9A9,
    'darkkhaki': 0xBDB76B,
    'darkmagenta': 0x8B008B,
    'darkolivegreen': 0x556B2F,
    'darkorange': 0xFF8C00,
    'darkorchid': 0x9932CC,
    'darkred': 0x8B0000,
    'darksalmon': 0xE9967A,
    'darkseagreen': 0x8FBC8F,
    'darkslateblue': 0x483D8B,
    'darkslategray': 0x2F4F4F,
    'darkslategrey': 0x2F4F4F,
    'darkturquoise': 0x00CED1,
    'darkviolet': 0x9400D3,
    'deeppink': 0xFF1493,
    'deepskyblue': 0x00BFFF,
    'dimgray': 0x696969,
    'dimgrey': 0x696969,
    'dodgerblue': 0x1E90FF,
    'firebrick': 0xB22222,
    'floralwhite': 0xFFFAF0,
    'forestgreen': 0x228B22,
    'fuchsia': 0xFF00FF,
    'gainsboro': 0xDCDCDC,
    'ghostwhite': 0xF8F8FF,
    'gold': 0xFFD700,
    'goldenrod': 0xDAA520,
    'gray': 0x808080,
    'green': 0x008000,
    'greenyellow': 0xADFF2F,
    'grey': 0x808080,
    'honeydew': 0xF0FFF0,
    'hotpink': 0xFF69B4,
    'indianred': 0xCD5C5C,
    'indigo': 0x4B0082,
    'ivory': 0xFFFFF0,
    'khaki': 0xF0E68C,
    'lavender': 0xE6E6FA,
    'lavenderblush': 0xFFF0F5,
    'lawngreen': 0x7CFC00,
    'lemonchiffon': 0xFFFACD,
    'lightblue': 0xADD8E6,
    'lightcoral': 0xF08080,
    'lightcyan': 0xE0FFFF,
    'lightgoldenrodyellow': 0xFAFAD2,
    'lightgray': 0xD3D3D3,
    'lightgreen': 0x90EE90,
    'lightgrey': 0xD3D3D3,
    'lightpink': 0xFFB6C1,
    'lightsalmon': 0xFFA07A,
    'lightseagreen': 0x20B2AA,
    'lightskyblue': 0x87CEFA,
    'lightslategray': 0x778899,
    'lightslategrey': 0x778899,
    'lightsteelblue': 0xB0C4DE,
    'lightyellow': 0xFFFFE0,
    'lime': 0x00FF00,
    'limegreen': 0x32CD32,
    'linen': 0xFAF0E6,
    'magenta': 0xFF00FF,
    'maroon': 0x800000,
    'mediumaquamarine': 0x66CDAA,
    'mediumblue': 0x0000CD,
    'mediumorchid': 0xBA55D3,
    'mediumpurple': 0x9370DB,
    'mediumseagreen': 0x3CB371,
    'mediumslateblue': 0x7B68EE,
    'mediumspringgreen': 0x00FA9A,
    'mediumturquoise': 0x48D1CC,
    'mediumvioletred': 0xC71585,
    'midnightblue': 0x191970,
    'mintcream': 0xF5FFFA,
    'mistyrose': 0xFFE4E1,
    'moccasin': 0xFFE4B5,
    'navajowhite': 0xFFDEAD,
    'navy': 0x000080,
    'oldlace': 0xFDF5E6,
    'olive': 0x808000,
    'olivedrab': 0x6B8E23,
    'orange': 0xFFA500,
    'orangered': 0xFF4500,
    'orchid': 0xDA70D6,
    'palegoldenrod': 0xEEE8AA,
    'palegreen': 0x98FB98,
    'paleturquoise': 0xAFEEEE,
    'palevioletred': 0xDB7093,
    'papayawhip': 0xFFEFD5,
    'peachpuff': 0xFFDAB9,
    'peru': 0xCD853F,
    'pink': 0xFFC0CB,
    'plum': 0xDDA0DD,
    'powderblue': 0xB0E0E6,
    'purple': 0x800080,
    'rebeccapurple': 0x663399,
    'red': 0xFF0000,
    'rosybrown': 0xBC8F8F,
    'royalblue': 0x4169E1,
    'saddlebrown': 0x8B4513,
    'salmon': 0xFA8072,
    'sandybrown': 0xF4A460,
    'seagreen': 0x2E8B57,
    'seashell': 0xFFF5EE,
    'sienna': 0xA0522D,
    'silver': 0xC0C0C0,
    'skyblue': 0x87CEEB,
    'slateblue': 0x6A5ACD,
    'slategray': 0x708090,
    'slategrey': 0x708090,
    'snow': 0xFFFAFA,
    'springgreen': 0x00FF7F,
    'steelblue': 0x4682B4,
    'tan': 0xD2B48C,
    'teal': 0x008080,
    'thistle': 0xD8BFD8,
    'tomato': 0xFF6347,
    'turquoise': 0x40E0D0,
    'violet': 0xEE82EE,
    'wheat': 0xF5DEB3,
    'white': 0xFFFFFF,
    'whitesmoke': 0xF5F5F5,
    'yellow': 0xFFFF00,
    'yellowgreen': 0x9ACD32
  } // 对颜色的映射
};
// Math
(function (PGL) {
  PGL.Math = {

    generateUUID: (function () {
      var lut = [];
      for (var i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? '0' : '') + (i).toString(16).toUpperCase();
      }

      return function generateUUID() {
        var d0 = Math.random() * 0xffffffff | 0;
        var d1 = Math.random() * 0xffffffff | 0;
        var d2 = Math.random() * 0xffffffff | 0;
        var d3 = Math.random() * 0xffffffff | 0;
        return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
          lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
          lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
          lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
      };

    })(),

    euclideanModulo: function (n, m) {

      return ((n % m) + m) % m;

    },

    clamp: function (value, min, max) {

      return Math.max(min, Math.min(max, value));

    }
  };

  /**
   * @param normal
   * @param constant
   * @constructor
   */
  PGL.Plane = function (normal, constant) {
    // normal is assumed to be normalized
    this.normal = (normal !== undefined) ? normal : new PGL.Vector3(1, 0, 0);
    this.constant = (constant !== undefined) ? constant : 0;
  };
  Object.assign(PGL.Plane.prototype, {
    distanceToPoint: function (point) {
      return this.normal.dot(point) + this.constant;
    }
  });

  PGL.Vector3 = function (x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  };
  Object.assign(PGL.Vector3.prototype, {
    isVector3: true,

    clone: function () {
      return new this.constructor(this.x, this.y, this.z);
    },

    copy: function (v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      return this;
    },

    addVectors: function (a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      this.z = a.z + b.z;
      return this;
    },

    multiplyScalar: function (scalar) {

      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;

      return this;

    },

    applyMatrix4: function (m) {

      var x = this.x, y = this.y, z = this.z;
      var e = m.elements;

      var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);

      this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
      this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
      this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;

      return this;

    },

    /**
     * 获得x\y\z的最小值
     * @param v
     * @return {min}
     */
    min: function (v) {
      this.x = Math.min(this.x, v.x);
      this.y = Math.min(this.y, v.y);
      this.z = Math.min(this.z, v.z);
      return this;
    },

    /**
     * 获得x\y\z的最大值
     * @param v
     * @return {min}
     */
    max: function (v) {

      this.x = Math.max(this.x, v.x);
      this.y = Math.max(this.y, v.y);
      this.z = Math.max(this.z, v.z);

      return this;

    },

    dot: function (v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    },

    /**
     * 计算两点距离的平方
     * @param v
     * @return {number}
     */
    distanceToSquared: function (v) {
      var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
      return dx * dx + dy * dy + dz * dz;
    }
  });

  PGL.Box3 = function (min, max) {
    this.min = (min !== undefined) ? min : new PGL.Vector3(+Infinity, +Infinity, +Infinity);
    this.max = (max !== undefined) ? max : new PGL.Vector3(-Infinity, -Infinity, -Infinity);
  };
  Object.assign(PGL.Box3.prototype, {
    isBox3: true,

    /**
     * 设置这些点的最大最小值
     * @param points
     * @return {setFromPoints}
     */
    setFromPoints: function (points) {

      this.makeEmpty();

      for (var i = 0, il = points.length; i < il; i++) {
        this.expandByPoint(points[i]);
      }
      return this;
    },

    /**
     * 设置min、max的值为Infinity
     * @return {makeEmpty}
     */
    makeEmpty: function () {
      this.min.x = this.min.y = this.min.z = +Infinity;
      this.max.x = this.max.y = this.max.z = -Infinity;

      return this;
    },

    /**
     * 对比点，设置最大最小值
     * @param point
     * @return {expandByPoint}
     */
    expandByPoint: function (point) {
      this.min.min(point);
      this.max.max(point);
      return this;
    },

    /**
     * 如果max < min 的值，返回false 否则返回true
     * @return {boolean}
     */
    isEmpty: function () {
      // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
      return (this.max.x < this.min.x) || (this.max.y < this.min.y) || (this.max.z < this.min.z);
    },

    /**
     * 获取中点坐标
     */
    getCenter: function (target) {
      if (target === undefined) {
        console.warn('PGL.Box3: .getCenter() target is now required');
        target = new PGL.Vector3();
      }
      return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
  });

  PGL.Matrix4 = function () {
    this.elements = [

      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1

    ];
    if (arguments.length > 0) {
      console.error('PGL.Matrix4: the constructor no longer reads arguments. use .set() instead.');
    }
  };
  Object.assign(PGL.Matrix4.prototype, {
    getMaxScaleOnAxis: function () {

      var te = this.elements;

      var scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
      var scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
      var scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];

      return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));

    }
  });

  PGL.Sphere = function (center, radius) {
    this.center = (center !== undefined) ? center : new PGL.Vector3();
    this.radius = (radius !== undefined) ? radius : 0;
  };
  Object.assign(PGL.Sphere.prototype, {
    /**
     * 设置圆心和半径
     */
    setFromPoints: function () {
      var box = new PGL.Box3();
      /**
       * points:点坐标的集合
       * optionalCenter：物体的中心
       */
      return function setFromPoints(points, optionalCenter) {

        var center = this.center;

        if (optionalCenter !== undefined) {
          center.copy(optionalCenter);
        } else {
          box.setFromPoints(points).getCenter(center);
        }

        var maxRadiusSq = 0;
        for (var i = 0, il = points.length; i < il; i++) {
          maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
        }

        this.radius = Math.sqrt(maxRadiusSq);

        return this;
      };
    }(),

    clone: function () {
      return new this.constructor().copy(this);
    },

    /**
     * 拷贝圆心和半径
     * @param sphere
     * @return {copy}
     */
    copy: function (sphere) {
      this.center.copy(sphere.center);
      this.radius = sphere.radius;
      return this;
    },

    applyMatrix4: function (matrix) {

      this.center.applyMatrix4(matrix);
      this.radius = this.radius * matrix.getMaxScaleOnAxis();

      return this;

    }
  });

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
    }
  });

  PGL.Vector4 = function (x, y, z, w) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = (w !== undefined) ? w : 1;
  };
  Object.assign(PGL.Vector4.prototype, {
    isVector4: true,

    set: function (x, y, z, w) {

      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;

      return this;

    },

    setScalar: function (scalar) {

      this.x = scalar;
      this.y = scalar;
      this.z = scalar;
      this.w = scalar;

      return this;

    },

    setX: function (x) {

      this.x = x;

      return this;

    },

    setY: function (y) {

      this.y = y;

      return this;

    },

    setZ: function (z) {

      this.z = z;

      return this;

    },

    setW: function (w) {

      this.w = w;

      return this;

    },

    setComponent: function (index, value) {

      switch (index) {

        case 0:
          this.x = value;
          break;
        case 1:
          this.y = value;
          break;
        case 2:
          this.z = value;
          break;
        case 3:
          this.w = value;
          break;
        default:
          throw new Error('index is out of range: ' + index);

      }

      return this;

    },

    getComponent: function (index) {

      switch (index) {

        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        case 3:
          return this.w;
        default:
          throw new Error('index is out of range: ' + index);

      }

    },

    clone: function () {

      return new this.constructor(this.x, this.y, this.z, this.w);

    },

    copy: function (v) {

      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      this.w = (v.w !== undefined) ? v.w : 1;

      return this;

    },

    add: function (v) {

      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      this.w += v.w;

      return this;

    },

    addScalar: function (s) {

      this.x += s;
      this.y += s;
      this.z += s;
      this.w += s;

      return this;

    },

    addVectors: function (a, b) {

      this.x = a.x + b.x;
      this.y = a.y + b.y;
      this.z = a.z + b.z;
      this.w = a.w + b.w;

      return this;

    },

    addScaledVector: function (v, s) {

      this.x += v.x * s;
      this.y += v.y * s;
      this.z += v.z * s;
      this.w += v.w * s;

      return this;

    },

    sub: function (v) {

      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      this.w -= v.w;

      return this;

    },

    subScalar: function (s) {

      this.x -= s;
      this.y -= s;
      this.z -= s;
      this.w -= s;

      return this;

    },

    subVectors: function (a, b) {

      this.x = a.x - b.x;
      this.y = a.y - b.y;
      this.z = a.z - b.z;
      this.w = a.w - b.w;

      return this;

    },

    multiplyScalar: function (scalar) {

      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
      this.w *= scalar;

      return this;

    },

    applyMatrix4: function (m) {

      var x = this.x, y = this.y, z = this.z, w = this.w;
      var e = m.elements;

      this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
      this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
      this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
      this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;

      return this;

    },

    divideScalar: function (scalar) {

      return this.multiplyScalar(1 / scalar);

    },

    setAxisAngleFromQuaternion: function (q) {

      // http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm

      // q is assumed to be normalized

      this.w = 2 * Math.acos(q.w);

      var s = Math.sqrt(1 - q.w * q.w);

      if (s < 0.0001) {

        this.x = 1;
        this.y = 0;
        this.z = 0;

      } else {

        this.x = q.x / s;
        this.y = q.y / s;
        this.z = q.z / s;

      }

      return this;

    },

    setAxisAngleFromRotationMatrix: function (m) {

      // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

      // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

      var angle, x, y, z,		// variables for result
        epsilon = 0.01,		// margin to allow for rounding errors
        epsilon2 = 0.1,		// margin to distinguish between 0 and 180 degrees

        te = m.elements,

        m11 = te[0], m12 = te[4], m13 = te[8],
        m21 = te[1], m22 = te[5], m23 = te[9],
        m31 = te[2], m32 = te[6], m33 = te[10];

      if ((Math.abs(m12 - m21) < epsilon) &&
        (Math.abs(m13 - m31) < epsilon) &&
        (Math.abs(m23 - m32) < epsilon)) {

        // singularity found
        // first check for identity matrix which must have +1 for all terms
        // in leading diagonal and zero in other terms

        if ((Math.abs(m12 + m21) < epsilon2) &&
          (Math.abs(m13 + m31) < epsilon2) &&
          (Math.abs(m23 + m32) < epsilon2) &&
          (Math.abs(m11 + m22 + m33 - 3) < epsilon2)) {

          // this singularity is identity matrix so angle = 0

          this.set(1, 0, 0, 0);

          return this; // zero angle, arbitrary axis

        }

        // otherwise this singularity is angle = 180

        angle = Math.PI;

        var xx = (m11 + 1) / 2;
        var yy = (m22 + 1) / 2;
        var zz = (m33 + 1) / 2;
        var xy = (m12 + m21) / 4;
        var xz = (m13 + m31) / 4;
        var yz = (m23 + m32) / 4;

        if ((xx > yy) && (xx > zz)) {

          // m11 is the largest diagonal term

          if (xx < epsilon) {

            x = 0;
            y = 0.707106781;
            z = 0.707106781;

          } else {

            x = Math.sqrt(xx);
            y = xy / x;
            z = xz / x;

          }

        } else if (yy > zz) {

          // m22 is the largest diagonal term

          if (yy < epsilon) {

            x = 0.707106781;
            y = 0;
            z = 0.707106781;

          } else {

            y = Math.sqrt(yy);
            x = xy / y;
            z = yz / y;

          }

        } else {

          // m33 is the largest diagonal term so base result on this

          if (zz < epsilon) {

            x = 0.707106781;
            y = 0.707106781;
            z = 0;

          } else {

            z = Math.sqrt(zz);
            x = xz / z;
            y = yz / z;

          }

        }

        this.set(x, y, z, angle);

        return this; // return 180 deg rotation

      }

      // as we have reached here there are no singularities so we can handle normally

      var s = Math.sqrt((m32 - m23) * (m32 - m23) +
        (m13 - m31) * (m13 - m31) +
        (m21 - m12) * (m21 - m12)); // used to normalize

      if (Math.abs(s) < 0.001) s = 1;

      // prevent divide by zero, should not happen if matrix is orthogonal and should be
      // caught by singularity test above, but I've left it in just in case

      this.x = (m32 - m23) / s;
      this.y = (m13 - m31) / s;
      this.z = (m21 - m12) / s;
      this.w = Math.acos((m11 + m22 + m33 - 1) / 2);

      return this;

    },

    min: function (v) {

      this.x = Math.min(this.x, v.x);
      this.y = Math.min(this.y, v.y);
      this.z = Math.min(this.z, v.z);
      this.w = Math.min(this.w, v.w);

      return this;

    },

    max: function (v) {

      this.x = Math.max(this.x, v.x);
      this.y = Math.max(this.y, v.y);
      this.z = Math.max(this.z, v.z);
      this.w = Math.max(this.w, v.w);

      return this;

    },

    clamp: function (min, max) {

      // assumes min < max, componentwise

      this.x = Math.max(min.x, Math.min(max.x, this.x));
      this.y = Math.max(min.y, Math.min(max.y, this.y));
      this.z = Math.max(min.z, Math.min(max.z, this.z));
      this.w = Math.max(min.w, Math.min(max.w, this.w));

      return this;

    },

    clampScalar: function () {

      var min, max;

      return function clampScalar(minVal, maxVal) {

        if (min === undefined) {

          min = new Vector4();
          max = new Vector4();

        }

        min.set(minVal, minVal, minVal, minVal);
        max.set(maxVal, maxVal, maxVal, maxVal);

        return this.clamp(min, max);

      };

    }(),

    clampLength: function (min, max) {

      var length = this.length();

      return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));

    },

    floor: function () {

      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      this.z = Math.floor(this.z);
      this.w = Math.floor(this.w);

      return this;

    },

    ceil: function () {

      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      this.z = Math.ceil(this.z);
      this.w = Math.ceil(this.w);

      return this;

    },

    round: function () {

      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.z = Math.round(this.z);
      this.w = Math.round(this.w);

      return this;

    },

    roundToZero: function () {

      this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
      this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
      this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
      this.w = (this.w < 0) ? Math.ceil(this.w) : Math.floor(this.w);

      return this;

    },

    negate: function () {

      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      this.w = -this.w;

      return this;

    },

    dot: function (v) {

      return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;

    },

    lengthSq: function () {

      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;

    },

    length: function () {

      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);

    },

    manhattanLength: function () {

      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);

    },

    normalize: function () {

      return this.divideScalar(this.length() || 1);

    },

    setLength: function (length) {

      return this.normalize().multiplyScalar(length);

    },

    lerp: function (v, alpha) {

      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      this.z += (v.z - this.z) * alpha;
      this.w += (v.w - this.w) * alpha;

      return this;

    },

    lerpVectors: function (v1, v2, alpha) {

      return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);

    },

    /**
     * 如果各个分量的值都相等，返回true 否则 返回false
     * @param v
     * @return {boolean}
     */
    equals: function (v) {

      return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z) && (v.w === this.w));

    },

    fromArray: function (array, offset) {

      if (offset === undefined) offset = 0;

      this.x = array[offset];
      this.y = array[offset + 1];
      this.z = array[offset + 2];
      this.w = array[offset + 3];

      return this;

    },

    toArray: function (array, offset) {

      if (array === undefined) array = [];
      if (offset === undefined) offset = 0;

      array[offset] = this.x;
      array[offset + 1] = this.y;
      array[offset + 2] = this.z;
      array[offset + 3] = this.w;

      return array;

    },

    fromBufferAttribute: function (attribute, index, offset) {

      if (offset !== undefined) {

        console.warn('THREE.Vector4: offset has been removed from .fromBufferAttribute().');

      }

      this.x = attribute.getX(index);
      this.y = attribute.getY(index);
      this.z = attribute.getZ(index);
      this.w = attribute.getW(index);

      return this;

    }
  });
})(PGL);
// core
(function (PGL) {
  /**
   * @param array {Float32Array}
   * @param itemSize 一组数据的长度
   * @param normalized
   * @constructor
   */
  PGL.BufferAttribute = function (array, itemSize, normalized) {
    if (Array.isArray(array)) {
      throw new TypeError('PGL.BufferAttribute: array should be a Typed Array.');
    }

    this.name = '';

    this.array = array;
    this.itemSize = itemSize;
    this.count = array !== undefined ? array.length / itemSize : 0; // 数据有多少组
    this.normalized = normalized === true;
  };
  Object.assign(PGL.BufferAttribute.prototype, {
    isBufferAttribute: true,

    copyArray: function (array) {
      this.array.set(array);
      return this;
    },

    /**
     * 将color类型的数组，放置到当前的一维数组（Float32Array）中
     * @param colors color类型的数组
     * @return {copyVector3sArray}
     */
    copyColorsArray: function (colors) {

      var array = this.array, offset = 0;

      for (var i = 0, l = colors.length; i < l; i++) {
        var color = colors[i];
        if (color === undefined) {
          console.warn('PGL.BufferAttribute.copyColorsArray(): color is undefined', i);
          color = new PGL.Color();
        }
        array[offset++] = color.r;
        array[offset++] = color.g;
        array[offset++] = color.b;
      }
      return this;
    },

    /**
     * 将vector3类型的数组，放置到当前的一维数组（Float32Array）中
     * @param vectors vector3类型的数组
     * @return {copyVector3sArray}
     */
    copyVector3sArray: function (vectors) {

      var array = this.array, offset = 0;

      for (var i = 0, l = vectors.length; i < l; i++) {
        var vector = vectors[i];
        if (vector === undefined) {
          console.warn('PGL.BufferAttribute.copyVector3sArray(): vector is undefined', i);
          vector = new Vector3();
        }
        array[offset++] = vector.x;
        array[offset++] = vector.y;
        array[offset++] = vector.z;
      }
      return this;
    }
  });

  PGL.Int32BufferAttribute = function (array, itemSize, normalized) {
    PGL.BufferAttribute.call(this, new Int32Array(array), itemSize, normalized);
  };
  PGL.Int32BufferAttribute.prototype = Object.create(PGL.BufferAttribute.prototype);
  PGL.Int32BufferAttribute.prototype.constructor = PGL.Int32BufferAttribute;

  /**
   * @param array 数组的长度
   * @param itemSize 一组数据的大小
   * @param normalized
   * @constructor
   */
  PGL.Float32BufferAttribute = function (array, itemSize, normalized) {
    PGL.BufferAttribute.call(this, new Float32Array(array), itemSize, normalized);
  };
  PGL.Float32BufferAttribute.prototype = Object.create(PGL.BufferAttribute.prototype);
  PGL.Float32BufferAttribute.prototype.constructor = PGL.Float32BufferAttribute;

  PGL.EventDispatcher = function () {
  };
  Object.assign(PGL.EventDispatcher.prototype, {
    dispatchEvent: function (event) {

      if (this._listeners === undefined) return;

      var listeners = this._listeners;
      var listenerArray = listeners[event.type];

      if (listenerArray !== undefined) {
        event.target = this;
        var array = listenerArray.slice(0);

        for (var i = 0, l = array.length; i < l; i++) {
          array[i].call(this, event);
        }
      }
    },

    addEventListener: function (type, listener) {

      if (this._listeners === undefined) this._listeners = {};

      var listeners = this._listeners;

      if (listeners[type] === undefined) {

        listeners[type] = [];

      }

      if (listeners[type].indexOf(listener) === -1) {

        listeners[type].push(listener);

      }

    }
  });

  var bufferGeometryId = 0;
  PGL.BufferGeometry = function () {
    Object.defineProperty(this, 'id', {value: bufferGeometryId += 2});

    this.uuid = PGL.Math.generateUUID();

    this.name = '';
    this.type = 'BufferGeometry';

    this.index = null;
    this.attributes = {};

    this.morphAttributes = {};

    this.groups = [];

    this.boundingBox = null;
    this.boundingSphere = null;

    this.drawRange = {start: 0, count: Infinity};

    this.userData = {};
  };
  PGL.BufferGeometry.prototype = Object.assign(Object.create(PGL.EventDispatcher.prototype), {

    constructor: PGL.BufferGeometry,

    isBufferGeometry: true,

    addAttribute: function (name, attribute) {
      if (!(attribute && attribute.isBufferAttribute) && !(attribute && attribute.isInterleavedBufferAttribute)) {

        console.warn('PGL.BufferGeometry: .addAttribute() now expects ( name, attribute ).');
        return this.addAttribute(name, new PGL.BufferAttribute(arguments[1], arguments[2]));
      }

      this.attributes[name] = attribute;
      return this;
    },

    /**
     * 设置顶点坐标、颜色、外围圆、外围包围盒子
     * @param object
     * @return {setFromObject}
     */
    setFromObject: function (object) {
      // console.log( 'PGL.BufferGeometry.setFromObject(). Converting', object, this );
      var geometry = object.geometry;
      if (object.isPoints) {

        var positions = new PGL.Float32BufferAttribute(geometry.vertices.length * 3, 3);
        var colors = new PGL.Float32BufferAttribute(geometry.colors.length * 3, 3);

        this.addAttribute('position', positions.copyVector3sArray(geometry.vertices));
        this.addAttribute('color', colors.copyColorsArray(geometry.colors));

        if (geometry.lineDistances && geometry.lineDistances.length === geometry.vertices.length) {
          var lineDistances = new PGL.Float32BufferAttribute(geometry.lineDistances.length, 1);
          this.addAttribute('lineDistance', lineDistances.copyArray(geometry.lineDistances));
        }

        if (geometry.boundingSphere !== null) {
          this.boundingSphere = geometry.boundingSphere.clone();
        }

        if (geometry.boundingBox !== null) {

          this.boundingBox = geometry.boundingBox.clone();

        }

      }
      return this;
    },

    updateFromObject: function (object) {

      var geometry = object.geometry;

      if (object.isMesh) {

        var direct = geometry.__directGeometry;

        if (geometry.elementsNeedUpdate === true) {

          direct = undefined;
          geometry.elementsNeedUpdate = false;

        }

        if (direct === undefined) {

          return this.fromGeometry(geometry);

        }

        direct.verticesNeedUpdate = geometry.verticesNeedUpdate;
        direct.normalsNeedUpdate = geometry.normalsNeedUpdate;
        direct.colorsNeedUpdate = geometry.colorsNeedUpdate;
        direct.uvsNeedUpdate = geometry.uvsNeedUpdate;
        direct.groupsNeedUpdate = geometry.groupsNeedUpdate;

        geometry.verticesNeedUpdate = false;
        geometry.normalsNeedUpdate = false;
        geometry.colorsNeedUpdate = false;
        geometry.uvsNeedUpdate = false;
        geometry.groupsNeedUpdate = false;

        geometry = direct;

      }

      var attribute;

      if (geometry.verticesNeedUpdate === true) {

        attribute = this.attributes.position;

        if (attribute !== undefined) {

          attribute.copyVector3sArray(geometry.vertices);
          attribute.needsUpdate = true;

        }

        geometry.verticesNeedUpdate = false;

      }

      if (geometry.normalsNeedUpdate === true) {

        attribute = this.attributes.normal;

        if (attribute !== undefined) {

          attribute.copyVector3sArray(geometry.normals);
          attribute.needsUpdate = true;

        }

        geometry.normalsNeedUpdate = false;

      }

      if (geometry.colorsNeedUpdate === true) {

        attribute = this.attributes.color;

        if (attribute !== undefined) {

          attribute.copyColorsArray(geometry.colors);
          attribute.needsUpdate = true;

        }

        geometry.colorsNeedUpdate = false;

      }

      if (geometry.uvsNeedUpdate) {

        attribute = this.attributes.uv;

        if (attribute !== undefined) {

          attribute.copyVector2sArray(geometry.uvs);
          attribute.needsUpdate = true;

        }

        geometry.uvsNeedUpdate = false;

      }

      if (geometry.lineDistancesNeedUpdate) {

        attribute = this.attributes.lineDistance;

        if (attribute !== undefined) {

          attribute.copyArray(geometry.lineDistances);
          attribute.needsUpdate = true;

        }

        geometry.lineDistancesNeedUpdate = false;

      }

      if (geometry.groupsNeedUpdate) {

        geometry.computeGroups(object.geometry);
        this.groups = geometry.groups;

        geometry.groupsNeedUpdate = false;

      }

      return this;

    }

  });

  var geometryId = 0;
  PGL.Geometry = function () {
    Object.defineProperty(this, 'id', {value: geometryId += 2});

    this.uuid = PGL.Math.generateUUID();

    this.name = '';
    this.type = 'Geometry';

    this.vertices = [];

    this.colors = [];
    this.faces = [];
    this.faceVertexUvs = [[]];

    this.morphTargets = [];
    this.morphNormals = [];

    this.skinWeights = [];
    this.skinIndices = [];

    this.lineDistances = [];

    this.boundingBox = null;
    this.boundingSphere = null;

    // update flags

    this.elementsNeedUpdate = false;
    this.verticesNeedUpdate = false;
    this.uvsNeedUpdate = false;
    this.normalsNeedUpdate = false;
    this.colorsNeedUpdate = false;
    this.lineDistancesNeedUpdate = false;
    this.groupsNeedUpdate = false;
  };
  PGL.Geometry.prototype = Object.assign(Object.create(PGL.EventDispatcher.prototype), {
    constructor: PGL.Geometry,

    isGeometry: true,

    computeBoundingSphere: function () {
      if (this.boundingSphere === null) {
        this.boundingSphere = new PGL.Sphere();
      }
      this.boundingSphere.setFromPoints(this.vertices);
    }
  });

  var object3DId = 0;
  PGL.Object3D = function () {

    Object.defineProperty(this, 'id', {value: object3DId++});

    this.uuid = PGL.Math.generateUUID();

    this.name = '';
    this.type = 'Object3D';

    this.parent = null;
    this.children = [];

    this.up = PGL.Object3D.DefaultUp.clone();

    var position = new PGL.Vector3();

    Object.defineProperties(this, {
      position: {
        enumerable: true,
        value: position
      },
      modelViewMatrix: {
        value: new PGL.Matrix4()
      }
    });

    this.matrix = new PGL.Matrix4();
    this.matrixWorld = new PGL.Matrix4();

    this.matrixAutoUpdate = PGL.Object3D.DefaultMatrixAutoUpdate;
    this.matrixWorldNeedsUpdate = false;

    this.visible = true;

    this.castShadow = false;
    this.receiveShadow = false;

    this.frustumCulled = true;
    this.renderOrder = 0;

    this.userData = {};
  };
  PGL.Object3D.DefaultUp = new PGL.Vector3(0, 1, 0);
  PGL.Object3D.DefaultMatrixAutoUpdate = true;
  PGL.Object3D.prototype = Object.assign(Object.create(PGL.EventDispatcher.prototype), {
    constructor: PGL.Object3D,

    isObject3D: true,

    /**
     * 把object对象放到children数组中，object的parent指向这个类别
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
        console.error("PGL.Object3D.add: object can't be added as a child of itself.", object);
        return this;
      }

      if ((object && object.isObject3D)) {
        if (object.parent !== null) {
          object.parent.remove(object);
        }

        object.parent = this;
        object.dispatchEvent({type: 'added'});

        this.children.push(object);

      } else {
        console.error("PGL.Object3D.add: object not an instance of PGL.Object3D.", object);
      }

      return this;
    }
  });
})(PGL);
// materials
(function (PGL) {
  var materialId = 0;
  PGL.Material = function () {
    Object.defineProperty(this, 'id', {value: materialId++});

    this.uuid = PGL.Math.generateUUID();

    this.name = '';
    this.type = 'Material';
  };
  PGL.Material.prototype = Object.assign(Object.create(PGL.EventDispatcher.prototype), {
    constructor: PGL.Material,

    isMaterial: true,

    /**
     * 把给定的参数设置到当前的对象中去
     * @param values
     */
    setValues: function (values) {

      if (values === undefined) return;

      for (var key in values) {
        var newValue = values[key];

        if (newValue === undefined) {
          console.warn("PGL.Material: '" + key + "' parameter is undefined.");
          continue;
        }

        // for backward compatability if shading is set in the constructor
        if (key === 'shading') {
          console.warn('PGL.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.');
          this.flatShading = (newValue === FlatShading) ? true : false;
          continue;
        }

        var currentValue = this[key];

        if (currentValue === undefined) {
          console.warn("PGL." + this.type + ": '" + key + "' is not a property of this material.");
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
  });

  PGL.PointsMaterial = function (parameters) {
    PGL.Material.call(this);

    this.type = 'PointsMaterial';

    this.color = new PGL.Color(0xffffff);

    this.setValues(parameters);
  };
  PGL.PointsMaterial.prototype = Object.create(PGL.Material.prototype);
  PGL.PointsMaterial.prototype.constructor = PGL.PointsMaterial;
  PGL.PointsMaterial.prototype.isPointsMaterial = true;
})(PGL);
// scene
(function (PGL) {
  PGL.Scene = function () {
    PGL.Object3D.call(this);

    this.type = 'Scene';

    this.autoUpdate = true;
  };
  PGL.Scene.prototype = Object.assign(Object.create(PGL.Object3D.prototype), {
    constructor: PGL.Scene
  });
})(PGL);
// objects
(function (PGL) {
  PGL.Points = function (geometry, material) {
    PGL.Object3D.call(this);

    this.type = 'Points';

    this.geometry = geometry;
    this.material = material !== undefined ? material : new PointsMaterial({color: Math.random() * 0xffffff});
  };
  PGL.Points.prototype = Object.assign(Object.create(PGL.Object3D.prototype), {
    constructor: PGL.Points,

    isPoints: true
  });
})(PGL);

// renderer
(function (PGL) {

  PGL.Color = function (r, g, b) {
    if (g === undefined && b === undefined) {
      // r is PGL.Color, hex or string
      return this.set(r);
    }
    return this.setRGB(r, g, b);
  };
  Object.assign(PGL.Color.prototype, {
    isColor: true,
    r: 1, g: 1, b: 1,

    set: function (value) {
      if (value && value.isColor) {
        this.copy(value);
      } else if (typeof value === 'number') {
        this.setHex(value);
      } else if (typeof value === 'string') {
        this.setStyle(value);
      }
      return this;
    },

    setHex: function (hex) {
      hex = Math.floor(hex);

      this.r = (hex >> 16 & 255) / 255;
      this.g = (hex >> 8 & 255) / 255;
      this.b = (hex & 255) / 255;

      return this;
    },

    setRGB: function (r, g, b) {

      this.r = r;
      this.g = g;
      this.b = b;

      return this;

    },

    setHSL: function () {
      function hue2rgb(p, q, t) {

        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
        return p;

      }

      return function setHSL(h, s, l) {

        // h,s,l ranges are in 0.0 - 1.0
        h = PGL.Math.euclideanModulo(h, 1);
        s = PGL.Math.clamp(s, 0, 1);
        l = PGL.Math.clamp(l, 0, 1);

        if (s === 0) {
          this.r = this.g = this.b = l;
        } else {

          var p = l <= 0.5 ? l * (1 + s) : l + s - (l * s);
          var q = (2 * l) - p;
          this.r = hue2rgb(q, p, h + 1 / 3);
          this.g = hue2rgb(q, p, h);
          this.b = hue2rgb(q, p, h - 1 / 3);
        }
        return this;
      };
    }(),

    setStyle: function (style) {

      function handleAlpha(string) {
        if (string === undefined) return;
        if (parseFloat(string) < 1) {
          console.warn('PGL.Color: Alpha component of ' + style + ' will be ignored.');
        }
      }

      var m;
      if (m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(style)) {
        // rgb / hsl
        var color;
        var name = m[1];
        var components = m[2];
        switch (name) {
          case 'rgb':
          case 'rgba':
            if (color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
              // rgb(255,0,0) rgba(255,0,0,0.5)
              this.r = Math.min(255, parseInt(color[1], 10)) / 255;
              this.g = Math.min(255, parseInt(color[2], 10)) / 255;
              this.b = Math.min(255, parseInt(color[3], 10)) / 255;
              handleAlpha(color[5]);
              return this;
            }
            if (color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
              // rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
              this.r = Math.min(100, parseInt(color[1], 10)) / 100;
              this.g = Math.min(100, parseInt(color[2], 10)) / 100;
              this.b = Math.min(100, parseInt(color[3], 10)) / 100;
              handleAlpha(color[5]);
              return this;
            }
            break;
          case 'hsl':
          case 'hsla':
            if (color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
              // hsl(120,50%,50%) hsla(120,50%,50%,0.5)
              var h = parseFloat(color[1]) / 360;
              var s = parseInt(color[2], 10) / 100;
              var l = parseInt(color[3], 10) / 100;
              handleAlpha(color[5]);
              return this.setHSL(h, s, l);
            }
            break;
        }
      } else if (m = /^\#([A-Fa-f0-9]+)$/.exec(style)) {

        // hex color
        var hex = m[1];
        var size = hex.length;

        if (size === 3) {
          // #ff0
          this.r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255;
          this.g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255;
          this.b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255;
          return this;
        } else if (size === 6) {
          // #ff0000
          this.r = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255;
          this.g = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255;
          this.b = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255;

          return this;

        }

      }

      if (style && style.length > 0) {

        // color keywords
        var hex = PGL.ColorKeywords[style];

        if (hex !== undefined) {
          // red
          this.setHex(hex);
        } else {
          // unknown color
          console.warn('THREE.Color: Unknown color ' + style);
        }
      }
      return this;
    },

    copy: function (color) {
      this.r = color.r;
      this.g = color.g;
      this.b = color.b;

      return this;
    }
  });

  /**
   * 对canvas背景色的管理
   * @param renderer 渲染器
   * @param state 状态管理器
   * @constructor
   */
  PGL.WebGLBackground = function (renderer, state) {
    // 默认的背景颜色和透明度
    var clearColor = new PGL.Color(0x000000);
    var clearAlpha = 0;

    function render() {
      setClear(clearColor, clearAlpha);

      if (renderer.autoClear) {
        renderer.clear(renderer.autoClearColor);
      }
    }

    /**
     * 设置背景颜色
     * @param color
     * @param alpha
     */
    function setClear(color, alpha) {
      state.buffers.colorBuffer.setClear(color.r, color.g, color.b, clearAlpha);
    }

    return {
      // 获取默认颜色
      getClearColor: function () {
        return clearColor;
      },
      // 设置默认的背景颜色和透明度
      setClearColor: function (color, alpha) {
        clearColor.set(color);
        clearAlpha = alpha !== undefined ? alpha : 1;
        setClear(clearColor, clearAlpha);
      },
      // 获取默认透明度
      getClearAlpha: function () {
        return clearAlpha;
      },
      // 设置默认的透明度
      setClearAlpha: function (alpha) {
        clearAlpha = alpha;
        setClear(clearColor, clearAlpha);
      },
      render: render
    }
  };

  /**
   * 保存场景状态
   * @param gl 上下文
   * @constructor
   */
  PGL.WebGLState = function (gl) {

    function ColorBuffer() {

      var color = new PGL.Vector4(); // 要设置的背景颜色
      var currentColorClear = new PGL.Vector4(0, 0, 0, 0); // 当前的背景颜色

      return {
        /**
         * 设置背景颜色
         *  premultipliedAlpha 控制a值是否乘到rgb上
         */
        setClear: function (r, g, b, a, premultipliedAlpha) {
          if (premultipliedAlpha === true) {
            r *= a;
            g *= a;
            b *= a;
          }

          color.set(r, g, b, a);

          if (currentColorClear.equals(color) === false) {
            gl.clearColor(r, g, b, a);
            currentColorClear.copy(color);
          }
        }
      }
    }

    var colorBuffer = new ColorBuffer();

    // init
    colorBuffer.setClear(0, 0, 0, 1);

    return {
      buffers: {
        colorBuffer: colorBuffer
      }
    }
  };

  PGL.WebGLInfo = function (gl) {
    var memory = {
      geometries: 0,
      textures: 0
    };

    var render = {
      frame: 0,
      calls: 0,
      triangles: 0,
      points: 0,
      lines: 0
    };

    function update(count, mode, instanceCount) {

      instanceCount = instanceCount || 1;

      render.calls++;

      switch (mode) {

        case gl.TRIANGLES:
          render.triangles += instanceCount * (count / 3);
          break;

        case gl.TRIANGLE_STRIP:
        case gl.TRIANGLE_FAN:
          render.triangles += instanceCount * (count - 2);
          break;

        case gl.LINES:
          render.lines += instanceCount * (count / 2);
          break;

        case gl.LINE_STRIP:
          render.lines += instanceCount * (count - 1);
          break;

        case gl.LINE_LOOP:
          render.lines += instanceCount * count;
          break;

        case gl.POINTS:
          render.points += instanceCount * count;
          break;

        default:
          console.error('THREE.WebGLInfo: Unknown draw mode:', mode);
          break;

      }

    }

    function reset() {

      render.frame++;
      render.calls = 0;
      render.triangles = 0;
      render.points = 0;
      render.lines = 0;

    }

    return {
      memory: memory,
      render: render,
      programs: null,
      autoReset: true,
      reset: reset,
      update: update
    };
  };

  PGL.WebGLAttributes = function (gl) {

    var buffers = new WeakMap();

    function createBuffer( attribute, bufferType ) {

      var array = attribute.array;
      var usage = attribute.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;

      var buffer = gl.createBuffer();

      gl.bindBuffer( bufferType, buffer );
      gl.bufferData( bufferType, array, usage );

      // attribute.onUploadCallback();

      var type = gl.FLOAT;

      if ( array instanceof Float32Array ) {

        type = gl.FLOAT;

      } else if ( array instanceof Float64Array ) {

        console.warn( 'THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.' );

      } else if ( array instanceof Uint16Array ) {

        type = gl.UNSIGNED_SHORT;

      } else if ( array instanceof Int16Array ) {

        type = gl.SHORT;

      } else if ( array instanceof Uint32Array ) {

        type = gl.UNSIGNED_INT;

      } else if ( array instanceof Int32Array ) {

        type = gl.INT;

      } else if ( array instanceof Int8Array ) {

        type = gl.BYTE;

      } else if ( array instanceof Uint8Array ) {

        type = gl.UNSIGNED_BYTE;

      }

      return {
        buffer: buffer,
        type: type,
        bytesPerElement: array.BYTES_PER_ELEMENT,
        version: attribute.version
      };

    }

    function update(attribute, bufferType) {

      if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

      var data = buffers.get(attribute);

      if (data === undefined) {

        buffers.set(attribute, createBuffer(attribute, bufferType));

      } else if (data.version < attribute.version) {

        updateBuffer(data.buffer, attribute, bufferType);

        data.version = attribute.version;

      }

    }

    return {
      update: update
    }
  };

  PGL.WebGLGeometries = function (gl, attributes, info) {

    var geometries = {};
    var wireframeAttributes = {};

    function onGeometryDispose(event) {
      console.log("onGeometryDispose");
    }

    /**
     * 获取buffergeometry
     * @param object
     * @param geometry
     * @return {*}
     */
    function get(object, geometry) {
      var buffergeometry = geometries[geometry.id];

      if (buffergeometry) return buffergeometry;

      geometry.addEventListener('dispose', onGeometryDispose);

      if (geometry.isBufferGeometry) {

        buffergeometry = geometry;

      } else if (geometry.isGeometry) {

        if (geometry._bufferGeometry === undefined) {
          geometry._bufferGeometry = new PGL.BufferGeometry().setFromObject(object);
        }

        buffergeometry = geometry._bufferGeometry;
      }

      geometries[geometry.id] = buffergeometry;

      info.memory.geometries++;

      return buffergeometry;
    }

    function update(geometry) {

      var index = geometry.index;
      var geometryAttributes = geometry.attributes;

      if (index !== null) {
        attributes.update(index, gl.ELEMENT_ARRAY_BUFFER);
      }

      for (var name in geometryAttributes) {
        attributes.update(geometryAttributes[name], gl.ARRAY_BUFFER);
      }

      // morph targets
      var morphAttributes = geometry.morphAttributes;

      for (var name in morphAttributes) {
        var array = morphAttributes[name];
        for (var i = 0, l = array.length; i < l; i++) {
          attributes.update(array[i], gl.ARRAY_BUFFER);
        }
      }
    }

    return {
      get: get,
      update: update
    }
  };

  PGL.WebGLObjects = function (geometries, info) {

    var updateList = {};

    function update(object) {
      var frame = info.render.frame;

      var geometry = object.geometry;
      var buffergeometry = geometries.get(object, geometry);

      // Update once per frame

      if (updateList[buffergeometry.id] !== frame) {

        if (geometry.isGeometry) {

          buffergeometry.updateFromObject(object);

        }

        geometries.update(buffergeometry);

        updateList[buffergeometry.id] = frame;

      }

      return buffergeometry;
    }

    function dispose() {

      updateList = {};

    }

    return {
      update: update,
      dispose: dispose
    }
  };

  PGL.WebGLRenderList = function () {
    var renderItemsIndex = 0;

    var opaque = [];
    var transparent = [];

    function init() {
      renderItemsIndex = 0;

      opaque.length = 0;
      transparent.length = 0;
    }

    return {
      opaque: opaque,
      transparent: transparent,

      init: init
    }
  };
  /**
   * 场景渲染列表
   * @constructor
   */
  PGL.WebGLRenderLists = function () {
    var lists = {};

    function get(scene) {
      var hash = scene.id;
      var list = lists[hash];

      if (list === undefined) {
        list = new PGL.WebGLRenderList();
        lists[hash] = list;
      }

      return list;
    }

    return {
      get: get
    }
  };

  /**
   * 渲染器
   * @param parameters
   *  _canvas:canvas标签
   *  _context:上下文
   * @constructor
   */
  PGL.WebGLRenderer = function (parameters) {
    console.log("PGL.WebGLRenderer", PGL.REVISION);

    parameters = parameters || {};

    this._canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
    this._context = parameters.context !== undefined ? parameters.context : null;

    var currentRenderList = null;

    // public properties
    this.domElement = this._canvas;

    // clearing 清空缓存区参数
    this.autoClear = true;
    this.autoClearColor = true;

    // scene graph
    this.sortObjects = true;

    // internal properties
    var _this = this;

    // frustum
    var _frustum = new PGL.Frustum();

    // 获取上下文
    var _gl = this.getWebGLContext();

    initGLContext();

    var state, info;
    var attributes, geometries, objects;
    var renderLists;

    var background;

    function initGLContext() {
      state = new PGL.WebGLState(_gl); // 初始化管理状态
      info = new PGL.WebGLInfo(_gl);
      attributes = new PGL.WebGLAttributes(_gl);
      geometries = new PGL.WebGLGeometries(_gl, attributes, info);
      objects = new PGL.WebGLObjects(geometries, info);
      renderLists = new PGL.WebGLRenderLists();
      background = new PGL.WebGLBackground(_this, state); // 初始化背景控制
    }

    function projectObject(object, sortObjects) {
      if (object.visible === false) return;

      var visible = true;
      if (visible) {
        if (object.isPoints) {

          // 判断是否在可视范围
          if (!object.frustumCulled || _frustum.intersectsObject(object)) {
            var geometry = objects.update(object);
          }
        }
      }

      var children = object.children;

      for (var i = 0, l = children.length; i < l; i++) {
        projectObject(children[i], sortObjects);
      }
    }

    // Rendering
    this.render = function (scene) {

      currentRenderList = renderLists.get(scene);
      currentRenderList.init();

      projectObject(scene, _this.sortObjects);

      background.render();
    };

    // API
    // 获取上下文
    this.getContext = function () {
      return _gl;
    };

    // 设置背景颜色以及透明度
    this.setClearColor = function () {
      background.setClearColor.apply(null, arguments);
    };

    /**
     * 根据参数清空颜色缓存区、深度缓存区、模版缓存区.默认清空
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
    }
  };
  Object.assign(PGL.WebGLRenderer.prototype, {
    /**
     * 获取上下文
     * @return {*|CanvasRenderingContext2D|WebGLRenderingContext}
     * @private
     */
    getWebGLContext: function () {
      try {
        var gl = this._context || this._canvas.getContext('webgl') || this._canvas.getContext('experimental-webgl');
        if (gl === null) {
          if (this._canvas.getContext('webgl') !== null) {
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
    },
    /**
     * 设置绘图区域的大小
     * @param width
     * @param height
     */
    setSize: function (width, height) {
      this._canvas.width = width;
      this._canvas.height = height;
    }
  })
})(PGL);