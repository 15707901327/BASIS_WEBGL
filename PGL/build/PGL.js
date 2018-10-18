// 常量
var PGL = {
  REVISION: '1', // 版本
  CullFaceNone: 0,
  CullFaceBack: 1,
  CullFaceFront: 2,
  CullFaceFrontBack: 3,
  BasicShadowMap: 0,
  PCFShadowMap: 1,
  PCFSoftShadowMap: 2,

  // 控制渲染面
  FrontSide: 0, // 前面
  BackSide: 1, // 背面
  DoubleSide: 2, // 双面
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
  }, // 对颜色的映射
  LinearToneMapping: 1,

  NoColors: 0,
  FaceColors: 1,
  VertexColors: 2,

  // 控制渲染方式
  NoBlending: 0, // 控制渲染时不混合
  NormalBlending: 1, //
  AdditiveBlending: 2,
  SubtractiveBlending: 3,
  MultiplyBlending: 4,
  CustomBlending: 5,

  AddEquation: 100,
  SubtractEquation: 101,
  ReverseSubtractEquation: 102,
  MinEquation: 103,
  MaxEquation: 104,

  // 混合因子
  ZeroFactor: 200,
  OneFactor: 201,
  SrcColorFactor: 202,
  OneMinusSrcColorFactor: 203,
  SrcAlphaFactor: 204,
  OneMinusSrcAlphaFactor: 205,
  DstAlphaFactor: 206,
  OneMinusDstAlphaFactor: 207,
  DstColorFactor: 208,
  OneMinusDstColorFactor: 209,
  SrcAlphaSaturateFactor: 210,

  // 一个将传入像素深度与当前深度缓冲区值进行比较的函数
  NeverDepth: 0,
  AlwaysDepth: 1,
  LessDepth: 2,
  LessEqualDepth: 3,
  EqualDepth: 4,
  GreaterEqualDepth: 5,
  GreaterDepth: 6,
  NotEqualDepth: 7,

  LinearEncoding: 3000,
  sRGBEncoding: 3001,
  GammaEncoding: 3007,
  RGBEEncoding: 3002,
  LogLuvEncoding: 3003,
  RGBM7Encoding: 3004,
  RGBM16Encoding: 3005,
  RGBDEncoding: 3006,

  BasicDepthPacking: 3200,
  RGBADepthPacking: 3201
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

  PGL.Vector2 = function (x, y) {

    this.x = x || 0;
    this.y = y || 0;

  };
  Object.defineProperties(PGL.Vector2.prototype, {

    "width": {

      get: function () {

        return this.x;

      },

      set: function (value) {

        this.x = value;

      }

    },

    "height": {

      get: function () {

        return this.y;

      },

      set: function (value) {

        this.y = value;

      }

    }

  });
  Object.assign(PGL.Vector2.prototype, {

    isVector2: true,

    set: function (x, y) {

      this.x = x;
      this.y = y;

      return this;

    },

    setScalar: function (scalar) {

      this.x = scalar;
      this.y = scalar;

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

    setComponent: function (index, value) {

      switch (index) {

        case 0:
          this.x = value;
          break;
        case 1:
          this.y = value;
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
        default:
          throw new Error('index is out of range: ' + index);

      }

    },

    clone: function () {

      return new this.constructor(this.x, this.y);

    },

    copy: function (v) {

      this.x = v.x;
      this.y = v.y;

      return this;

    },

    add: function (v, w) {

      if (w !== undefined) {

        console.warn('THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
        return this.addVectors(v, w);

      }

      this.x += v.x;
      this.y += v.y;

      return this;

    },

    addScalar: function (s) {

      this.x += s;
      this.y += s;

      return this;

    },

    addVectors: function (a, b) {

      this.x = a.x + b.x;
      this.y = a.y + b.y;

      return this;

    },

    addScaledVector: function (v, s) {

      this.x += v.x * s;
      this.y += v.y * s;

      return this;

    },

    sub: function (v, w) {

      if (w !== undefined) {

        console.warn('THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
        return this.subVectors(v, w);

      }

      this.x -= v.x;
      this.y -= v.y;

      return this;

    },

    subScalar: function (s) {

      this.x -= s;
      this.y -= s;

      return this;

    },

    subVectors: function (a, b) {

      this.x = a.x - b.x;
      this.y = a.y - b.y;

      return this;

    },

    multiply: function (v) {

      this.x *= v.x;
      this.y *= v.y;

      return this;

    },

    multiplyScalar: function (scalar) {

      this.x *= scalar;
      this.y *= scalar;

      return this;

    },

    divide: function (v) {

      this.x /= v.x;
      this.y /= v.y;

      return this;

    },

    divideScalar: function (scalar) {

      return this.multiplyScalar(1 / scalar);

    },

    applyMatrix3: function (m) {

      var x = this.x, y = this.y;
      var e = m.elements;

      this.x = e[0] * x + e[3] * y + e[6];
      this.y = e[1] * x + e[4] * y + e[7];

      return this;

    },

    min: function (v) {

      this.x = Math.min(this.x, v.x);
      this.y = Math.min(this.y, v.y);

      return this;

    },

    max: function (v) {

      this.x = Math.max(this.x, v.x);
      this.y = Math.max(this.y, v.y);

      return this;

    },

    clamp: function (min, max) {

      // assumes min < max, componentwise

      this.x = Math.max(min.x, Math.min(max.x, this.x));
      this.y = Math.max(min.y, Math.min(max.y, this.y));

      return this;

    },

    clampScalar: function () {

      var min = new PGL.Vector2();
      var max = new PGL.Vector2();

      return function clampScalar(minVal, maxVal) {

        min.set(minVal, minVal);
        max.set(maxVal, maxVal);

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

      return this;

    },

    ceil: function () {

      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);

      return this;

    },

    round: function () {

      this.x = Math.round(this.x);
      this.y = Math.round(this.y);

      return this;

    },

    roundToZero: function () {

      this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
      this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);

      return this;

    },

    negate: function () {

      this.x = -this.x;
      this.y = -this.y;

      return this;

    },

    dot: function (v) {

      return this.x * v.x + this.y * v.y;

    },

    cross: function (v) {

      return this.x * v.y - this.y * v.x;

    },

    lengthSq: function () {

      return this.x * this.x + this.y * this.y;

    },

    length: function () {

      return Math.sqrt(this.x * this.x + this.y * this.y);

    },

    manhattanLength: function () {

      return Math.abs(this.x) + Math.abs(this.y);

    },

    normalize: function () {

      return this.divideScalar(this.length() || 1);

    },

    angle: function () {

      // computes the angle in radians with respect to the positive x-axis

      var angle = Math.atan2(this.y, this.x);

      if (angle < 0) angle += 2 * Math.PI;

      return angle;

    },

    distanceTo: function (v) {

      return Math.sqrt(this.distanceToSquared(v));

    },

    distanceToSquared: function (v) {

      var dx = this.x - v.x, dy = this.y - v.y;
      return dx * dx + dy * dy;

    },

    manhattanDistanceTo: function (v) {

      return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);

    },

    setLength: function (length) {

      return this.normalize().multiplyScalar(length);

    },

    lerp: function (v, alpha) {

      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;

      return this;

    },

    lerpVectors: function (v1, v2, alpha) {

      return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);

    },

    equals: function (v) {

      return ((v.x === this.x) && (v.y === this.y));

    },

    fromArray: function (array, offset) {

      if (offset === undefined) offset = 0;

      this.x = array[offset];
      this.y = array[offset + 1];

      return this;

    },

    toArray: function (array, offset) {

      if (array === undefined) array = [];
      if (offset === undefined) offset = 0;

      array[offset] = this.x;
      array[offset + 1] = this.y;

      return array;

    },

    fromBufferAttribute: function (attribute, index, offset) {

      if (offset !== undefined) {

        console.warn('THREE.Vector2: offset has been removed from .fromBufferAttribute().');

      }

      this.x = attribute.getX(index);
      this.y = attribute.getY(index);

      return this;

    },

    rotateAround: function (center, angle) {

      var c = Math.cos(angle), s = Math.sin(angle);

      var x = this.x - center.x;
      var y = this.y - center.y;

      this.x = x * c - y * s + center.x;
      this.y = x * s + y * c + center.y;

      return this;

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

  PGL.Quaternion = function (x, y, z, w) {

    this._x = x || 0;
    this._y = y || 0;
    this._z = z || 0;
    this._w = (w !== undefined) ? w : 1;

  };
  Object.assign(PGL.Quaternion, {

    slerp: function (qa, qb, qm, t) {

      return qm.copy(qa).slerp(qb, t);

    },

    slerpFlat: function (dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {

      // fuzz-free, array-based Quaternion SLERP operation

      var x0 = src0[srcOffset0 + 0],
        y0 = src0[srcOffset0 + 1],
        z0 = src0[srcOffset0 + 2],
        w0 = src0[srcOffset0 + 3],

        x1 = src1[srcOffset1 + 0],
        y1 = src1[srcOffset1 + 1],
        z1 = src1[srcOffset1 + 2],
        w1 = src1[srcOffset1 + 3];

      if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {

        var s = 1 - t,

          cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,

          dir = (cos >= 0 ? 1 : -1),
          sqrSin = 1 - cos * cos;

        // Skip the Slerp for tiny steps to avoid numeric problems:
        if (sqrSin > Number.EPSILON) {

          var sin = Math.sqrt(sqrSin),
            len = Math.atan2(sin, cos * dir);

          s = Math.sin(s * len) / sin;
          t = Math.sin(t * len) / sin;

        }

        var tDir = t * dir;

        x0 = x0 * s + x1 * tDir;
        y0 = y0 * s + y1 * tDir;
        z0 = z0 * s + z1 * tDir;
        w0 = w0 * s + w1 * tDir;

        // Normalize in case we just did a lerp:
        if (s === 1 - t) {

          var f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);

          x0 *= f;
          y0 *= f;
          z0 *= f;
          w0 *= f;

        }

      }

      dst[dstOffset] = x0;
      dst[dstOffset + 1] = y0;
      dst[dstOffset + 2] = z0;
      dst[dstOffset + 3] = w0;

    }

  });
  Object.defineProperties(PGL.Quaternion.prototype, {

    x: {

      get: function () {

        return this._x;

      },

      set: function (value) {

        this._x = value;
        this.onChangeCallback();

      }

    },

    y: {

      get: function () {

        return this._y;

      },

      set: function (value) {

        this._y = value;
        this.onChangeCallback();

      }

    },

    z: {

      get: function () {

        return this._z;

      },

      set: function (value) {

        this._z = value;
        this.onChangeCallback();

      }

    },

    w: {

      get: function () {

        return this._w;

      },

      set: function (value) {

        this._w = value;
        this.onChangeCallback();

      }

    }

  });
  Object.assign(PGL.Quaternion.prototype, {

    set: function (x, y, z, w) {

      this._x = x;
      this._y = y;
      this._z = z;
      this._w = w;

      this.onChangeCallback();

      return this;

    },

    clone: function () {

      return new this.constructor(this._x, this._y, this._z, this._w);

    },

    copy: function (quaternion) {

      this._x = quaternion.x;
      this._y = quaternion.y;
      this._z = quaternion.z;
      this._w = quaternion.w;

      this.onChangeCallback();

      return this;

    },

    setFromEuler: function (euler, update) {

      if (!(euler && euler.isEuler)) {

        throw new Error('THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.');

      }

      var x = euler._x, y = euler._y, z = euler._z, order = euler.order;

      // http://www.mathworks.com/matlabcentral/fileexchange/
      // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
      //	content/SpinCalc.m

      var cos = Math.cos;
      var sin = Math.sin;

      var c1 = cos(x / 2);
      var c2 = cos(y / 2);
      var c3 = cos(z / 2);

      var s1 = sin(x / 2);
      var s2 = sin(y / 2);
      var s3 = sin(z / 2);

      if (order === 'XYZ') {

        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;

      } else if (order === 'YXZ') {

        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;

      } else if (order === 'ZXY') {

        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;

      } else if (order === 'ZYX') {

        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;

      } else if (order === 'YZX') {

        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;

      } else if (order === 'XZY') {

        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;

      }

      if (update !== false) this.onChangeCallback();

      return this;

    },

    setFromAxisAngle: function (axis, angle) {

      // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

      // assumes axis is normalized

      var halfAngle = angle / 2, s = Math.sin(halfAngle);

      this._x = axis.x * s;
      this._y = axis.y * s;
      this._z = axis.z * s;
      this._w = Math.cos(halfAngle);

      this.onChangeCallback();

      return this;

    },

    /**
     * 使用矩阵更新四元数
     * @param m 矩阵实例
     * @return {setFromRotationMatrix}
     */
    setFromRotationMatrix: function (m) {

      // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

      // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

      var te = m.elements,

        m11 = te[0], m12 = te[4], m13 = te[8],
        m21 = te[1], m22 = te[5], m23 = te[9],
        m31 = te[2], m32 = te[6], m33 = te[10],

        trace = m11 + m22 + m33,
        s;

      if (trace > 0) {

        s = 0.5 / Math.sqrt(trace + 1.0);

        this._w = 0.25 / s;
        this._x = (m32 - m23) * s;
        this._y = (m13 - m31) * s;
        this._z = (m21 - m12) * s;

      } else if (m11 > m22 && m11 > m33) {

        s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

        this._w = (m32 - m23) / s;
        this._x = 0.25 * s;
        this._y = (m12 + m21) / s;
        this._z = (m13 + m31) / s;

      } else if (m22 > m33) {

        s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

        this._w = (m13 - m31) / s;
        this._x = (m12 + m21) / s;
        this._y = 0.25 * s;
        this._z = (m23 + m32) / s;

      } else {

        s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

        this._w = (m21 - m12) / s;
        this._x = (m13 + m31) / s;
        this._y = (m23 + m32) / s;
        this._z = 0.25 * s;

      }

      this.onChangeCallback();

      return this;

    },

    setFromUnitVectors: function () {

      // assumes direction vectors vFrom and vTo are normalized

      var v1 = new PGL.Vector3();
      var r;

      var EPS = 0.000001;

      return function setFromUnitVectors(vFrom, vTo) {

        if (v1 === undefined) v1 = new PGL.Vector3();

        r = vFrom.dot(vTo) + 1;

        if (r < EPS) {

          r = 0;

          if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {

            v1.set(-vFrom.y, vFrom.x, 0);

          } else {

            v1.set(0, -vFrom.z, vFrom.y);

          }

        } else {

          v1.crossVectors(vFrom, vTo);

        }

        this._x = v1.x;
        this._y = v1.y;
        this._z = v1.z;
        this._w = r;

        return this.normalize();

      };

    }(),

    inverse: function () {

      // quaternion is assumed to have unit length

      return this.conjugate();

    },

    conjugate: function () {

      this._x *= -1;
      this._y *= -1;
      this._z *= -1;

      this.onChangeCallback();

      return this;

    },

    dot: function (v) {

      return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

    },

    lengthSq: function () {

      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

    },

    length: function () {

      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);

    },

    normalize: function () {

      var l = this.length();

      if (l === 0) {

        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._w = 1;

      } else {

        l = 1 / l;

        this._x = this._x * l;
        this._y = this._y * l;
        this._z = this._z * l;
        this._w = this._w * l;

      }

      this.onChangeCallback();

      return this;

    },

    multiply: function (q, p) {

      if (p !== undefined) {

        console.warn('THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.');
        return this.multiplyQuaternions(q, p);

      }

      return this.multiplyQuaternions(this, q);

    },

    premultiply: function (q) {

      return this.multiplyQuaternions(q, this);

    },

    multiplyQuaternions: function (a, b) {

      // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

      var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
      var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

      this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
      this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
      this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
      this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

      this.onChangeCallback();

      return this;

    },

    slerp: function (qb, t) {

      if (t === 0) return this;
      if (t === 1) return this.copy(qb);

      var x = this._x, y = this._y, z = this._z, w = this._w;

      // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

      var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

      if (cosHalfTheta < 0) {

        this._w = -qb._w;
        this._x = -qb._x;
        this._y = -qb._y;
        this._z = -qb._z;

        cosHalfTheta = -cosHalfTheta;

      } else {

        this.copy(qb);

      }

      if (cosHalfTheta >= 1.0) {

        this._w = w;
        this._x = x;
        this._y = y;
        this._z = z;

        return this;

      }

      var sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

      if (sqrSinHalfTheta <= Number.EPSILON) {

        var s = 1 - t;
        this._w = s * w + t * this._w;
        this._x = s * x + t * this._x;
        this._y = s * y + t * this._y;
        this._z = s * z + t * this._z;

        return this.normalize();

      }

      var sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
      var halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
      var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
        ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

      this._w = (w * ratioA + this._w * ratioB);
      this._x = (x * ratioA + this._x * ratioB);
      this._y = (y * ratioA + this._y * ratioB);
      this._z = (z * ratioA + this._z * ratioB);

      this.onChangeCallback();

      return this;

    },

    equals: function (quaternion) {

      return (quaternion._x === this._x) && (quaternion._y === this._y) && (quaternion._z === this._z) && (quaternion._w === this._w);

    },

    fromArray: function (array, offset) {

      if (offset === undefined) offset = 0;

      this._x = array[offset];
      this._y = array[offset + 1];
      this._z = array[offset + 2];
      this._w = array[offset + 3];

      this.onChangeCallback();

      return this;

    },

    toArray: function (array, offset) {

      if (array === undefined) array = [];
      if (offset === undefined) offset = 0;

      array[offset] = this._x;
      array[offset + 1] = this._y;
      array[offset + 2] = this._z;
      array[offset + 3] = this._w;

      return array;

    },

    onChange: function (callback) {

      this.onChangeCallback = callback;

      return this;

    },

    onChangeCallback: function () {
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

  PGL.Matrix3 = function () {

    this.elements = [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ];

    if (arguments.length > 0) {
      console.error('THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.');
    }

  };
  Object.assign(PGL.Matrix3.prototype, {

    isMatrix3: true,

    set: function (n11, n12, n13, n21, n22, n23, n31, n32, n33) {

      var te = this.elements;

      te[0] = n11;
      te[1] = n21;
      te[2] = n31;
      te[3] = n12;
      te[4] = n22;
      te[5] = n32;
      te[6] = n13;
      te[7] = n23;
      te[8] = n33;

      return this;

    },

    identity: function () {

      this.set(
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
      );

      return this;

    },

    clone: function () {

      return new this.constructor().fromArray(this.elements);

    },

    copy: function (m) {

      var te = this.elements;
      var me = m.elements;

      te[0] = me[0];
      te[1] = me[1];
      te[2] = me[2];
      te[3] = me[3];
      te[4] = me[4];
      te[5] = me[5];
      te[6] = me[6];
      te[7] = me[7];
      te[8] = me[8];

      return this;

    },

    setFromMatrix4: function (m) {

      var me = m.elements;

      this.set(
        me[0], me[4], me[8],
        me[1], me[5], me[9],
        me[2], me[6], me[10]
      );

      return this;

    },

    applyToBufferAttribute: function () {

      var v1 = new PGL.Vector3();

      return function applyToBufferAttribute(attribute) {

        for (var i = 0, l = attribute.count; i < l; i++) {

          v1.x = attribute.getX(i);
          v1.y = attribute.getY(i);
          v1.z = attribute.getZ(i);

          v1.applyMatrix3(this);

          attribute.setXYZ(i, v1.x, v1.y, v1.z);

        }

        return attribute;

      };

    }(),

    multiply: function (m) {

      return this.multiplyMatrices(this, m);

    },

    premultiply: function (m) {

      return this.multiplyMatrices(m, this);

    },

    multiplyMatrices: function (a, b) {

      var ae = a.elements;
      var be = b.elements;
      var te = this.elements;

      var a11 = ae[0], a12 = ae[3], a13 = ae[6];
      var a21 = ae[1], a22 = ae[4], a23 = ae[7];
      var a31 = ae[2], a32 = ae[5], a33 = ae[8];

      var b11 = be[0], b12 = be[3], b13 = be[6];
      var b21 = be[1], b22 = be[4], b23 = be[7];
      var b31 = be[2], b32 = be[5], b33 = be[8];

      te[0] = a11 * b11 + a12 * b21 + a13 * b31;
      te[3] = a11 * b12 + a12 * b22 + a13 * b32;
      te[6] = a11 * b13 + a12 * b23 + a13 * b33;

      te[1] = a21 * b11 + a22 * b21 + a23 * b31;
      te[4] = a21 * b12 + a22 * b22 + a23 * b32;
      te[7] = a21 * b13 + a22 * b23 + a23 * b33;

      te[2] = a31 * b11 + a32 * b21 + a33 * b31;
      te[5] = a31 * b12 + a32 * b22 + a33 * b32;
      te[8] = a31 * b13 + a32 * b23 + a33 * b33;

      return this;

    },

    multiplyScalar: function (s) {

      var te = this.elements;

      te[0] *= s;
      te[3] *= s;
      te[6] *= s;
      te[1] *= s;
      te[4] *= s;
      te[7] *= s;
      te[2] *= s;
      te[5] *= s;
      te[8] *= s;

      return this;

    },

    determinant: function () {

      var te = this.elements;

      var a = te[0], b = te[1], c = te[2],
        d = te[3], e = te[4], f = te[5],
        g = te[6], h = te[7], i = te[8];

      return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;

    },

    getInverse: function (matrix, throwOnDegenerate) {

      if (matrix && matrix.isMatrix4) {

        console.error("THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument.");

      }

      var me = matrix.elements,
        te = this.elements,

        n11 = me[0], n21 = me[1], n31 = me[2],
        n12 = me[3], n22 = me[4], n32 = me[5],
        n13 = me[6], n23 = me[7], n33 = me[8],

        t11 = n33 * n22 - n32 * n23,
        t12 = n32 * n13 - n33 * n12,
        t13 = n23 * n12 - n22 * n13,

        det = n11 * t11 + n21 * t12 + n31 * t13;

      if (det === 0) {

        var msg = "THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0";

        if (throwOnDegenerate === true) {

          throw new Error(msg);

        } else {

          console.warn(msg);

        }

        return this.identity();

      }

      var detInv = 1 / det;

      te[0] = t11 * detInv;
      te[1] = (n31 * n23 - n33 * n21) * detInv;
      te[2] = (n32 * n21 - n31 * n22) * detInv;

      te[3] = t12 * detInv;
      te[4] = (n33 * n11 - n31 * n13) * detInv;
      te[5] = (n31 * n12 - n32 * n11) * detInv;

      te[6] = t13 * detInv;
      te[7] = (n21 * n13 - n23 * n11) * detInv;
      te[8] = (n22 * n11 - n21 * n12) * detInv;

      return this;

    },

    transpose: function () {

      var tmp, m = this.elements;

      tmp = m[1];
      m[1] = m[3];
      m[3] = tmp;
      tmp = m[2];
      m[2] = m[6];
      m[6] = tmp;
      tmp = m[5];
      m[5] = m[7];
      m[7] = tmp;

      return this;

    },

    getNormalMatrix: function (matrix4) {

      return this.setFromMatrix4(matrix4).getInverse(this).transpose();

    },

    transposeIntoArray: function (r) {

      var m = this.elements;

      r[0] = m[0];
      r[1] = m[3];
      r[2] = m[6];
      r[3] = m[1];
      r[4] = m[4];
      r[5] = m[7];
      r[6] = m[2];
      r[7] = m[5];
      r[8] = m[8];

      return this;

    },

    setUvTransform: function (tx, ty, sx, sy, rotation, cx, cy) {

      var c = Math.cos(rotation);
      var s = Math.sin(rotation);

      this.set(
        sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx,
        -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty,
        0, 0, 1
      );

    },

    scale: function (sx, sy) {

      var te = this.elements;

      te[0] *= sx;
      te[3] *= sx;
      te[6] *= sx;
      te[1] *= sy;
      te[4] *= sy;
      te[7] *= sy;

      return this;

    },

    rotate: function (theta) {

      var c = Math.cos(theta);
      var s = Math.sin(theta);

      var te = this.elements;

      var a11 = te[0], a12 = te[3], a13 = te[6];
      var a21 = te[1], a22 = te[4], a23 = te[7];

      te[0] = c * a11 + s * a21;
      te[3] = c * a12 + s * a22;
      te[6] = c * a13 + s * a23;

      te[1] = -s * a11 + c * a21;
      te[4] = -s * a12 + c * a22;
      te[7] = -s * a13 + c * a23;

      return this;

    },

    translate: function (tx, ty) {

      var te = this.elements;

      te[0] += tx * te[2];
      te[3] += tx * te[5];
      te[6] += tx * te[8];
      te[1] += ty * te[2];
      te[4] += ty * te[5];
      te[7] += ty * te[8];

      return this;

    },

    equals: function (matrix) {

      var te = this.elements;
      var me = matrix.elements;

      for (var i = 0; i < 9; i++) {

        if (te[i] !== me[i]) return false;

      }

      return true;

    },

    fromArray: function (array, offset) {

      if (offset === undefined) offset = 0;

      for (var i = 0; i < 9; i++) {

        this.elements[i] = array[i + offset];

      }

      return this;

    },

    toArray: function (array, offset) {

      if (array === undefined) array = [];
      if (offset === undefined) offset = 0;

      var te = this.elements;

      array[offset] = te[0];
      array[offset + 1] = te[1];
      array[offset + 2] = te[2];

      array[offset + 3] = te[3];
      array[offset + 4] = te[4];
      array[offset + 5] = te[5];

      array[offset + 6] = te[6];
      array[offset + 7] = te[7];
      array[offset + 8] = te[8];

      return array;

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

    /**
     * 拷贝对象中的每个值
     * @param v
     * @return {copy}
     */
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

    clone: function () {
      return new this.constructor(this.r, this.g, this.b);
    },

    copy: function (color) {
      this.r = color.r;
      this.g = color.g;
      this.b = color.b;

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

    this.array = array; // 数组
    this.itemSize = itemSize; // 一组数据的长度
    this.count = array !== undefined ? array.length / itemSize : 0; // 数据有多少组
    this.normalized = normalized === true;

    this.dynamic = false; // 程序将如何使用存储在缓存区对象中的数据 false gl.STATIC_DRAW true gl.DYNAMIC_DRAW
    this.updateRange = {offset: 0, count: -1};

    this.version = 0; // 控制当前缓存区的版本
  };
  Object.assign(PGL.BufferAttribute.prototype, {
    isBufferAttribute: true,

    onUploadCallback: function () {
    },

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
   * @param itemSize 一组数据长度
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
    this.attributes = {}; // 保存属性

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

    /**
     * 把属性添加到this.attributes中
     * @param name
     * @param attribute
     * @return {*}
     */
    addAttribute: function (name, attribute) {
      if (!(attribute && attribute.isBufferAttribute) && !(attribute && attribute.isInterleavedBufferAttribute)) {
        console.warn('PGL.BufferGeometry: .addAttribute() now expects ( name, attribute ).');
        return this.addAttribute(name, new BufferAttribute(arguments[1], arguments[2]));
      }

      if (name === 'index') {
        console.warn('PGL.BufferGeometry.addAttribute: Use .setIndex() for index attribute.');
        this.setIndex(attribute);
        return this;
      }

      this.attributes[name] = attribute;

      return this;
    },

    /**
     * 解析geometry中的属性到BufferGeometry中
     * 设置顶点坐标、颜色、外围圆、外围包围盒子
     * @param object
     * @return {setFromObject}
     */
    setFromObject: function (object) {
      // console.log( 'PGL.BufferGeometry.setFromObject(). Converting', object, this );
      var geometry = object.geometry;
      if (object.isPoints) {

        // 初始化
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

    // 开始渲染调用方法
    onBeforeRender: function () {
    },
    // 渲染结束调用方法
    onAfterRender: function () {
    },

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

    this.fog = true;
    this.lights = true;

    this.blending = PGL.NormalBlending; // 控制渲染时是否混合
    this.side = PGL.FrontSide; // 控制渲染面
    this.flatShading = false;
    this.vertexColors = PGL.NoColors; // PGL.NoColors, PGL.VertexColors, PGL.FaceColors

    // 控制透明度
    this.opacity = 1;
    this.transparent = false;

    this.blendSrc = PGL.SrcAlphaFactor;
    this.blendDst = PGL.OneMinusSrcAlphaFactor;
    this.blendEquation = PGL.AddEquation;
    this.blendSrcAlpha = null;
    this.blendDstAlpha = null;
    this.blendEquationAlpha = null;

    this.depthFunc = PGL.LessEqualDepth; // 指定了一个将传入像素深度与当前深度缓冲区值进行比较的函数
    this.depthTest = true; // 设置是否启动隐藏面消除
    this.depthWrite = true; // 是否锁定深度

    this.clippingPlanes = null;
    this.clipIntersection = false;
    this.clipShadows = false;

    this.shadowSide = null;

    this.colorWrite = true; // 是否锁定颜色

    this.precision = null; // override the renderer's default precision for this material

    // 设置多边形位移
    this.polygonOffset = false;
    this.polygonOffsetFactor = 0;
    this.polygonOffsetUnits = 0;

    this.dithering = false;

    this.alphaTest = 0;
    this.premultipliedAlpha = false;

    this.visible = true;

    this.userData = {};

    this.needsUpdate = true;
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

  /**
   * parameters = {
   *  opacity: <float>,
   *  map: new THREE.Texture( <Image> ),
   *  alphaMap: new THREE.Texture( <Image> ),
   *  displacementMap: new THREE.Texture( <Image> ),
   *  displacementScale: <float>,
   *  displacementBias: <float>,
   *  wireframe: <boolean>,
   *  wireframeLinewidth: <float>
   * }
   */
  PGL.MeshDepthMaterial = function (parameters) {

    PGL.Material.call(this);

    this.type = 'MeshDepthMaterial';

    this.depthPacking = PGL.BasicDepthPacking;

    this.skinning = false;
    this.morphTargets = false;

    this.map = null;

    this.alphaMap = null;

    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;

    this.wireframe = false;
    this.wireframeLinewidth = 1;

    this.fog = false;
    this.lights = false;

    this.setValues(parameters);

  };
  PGL.MeshDepthMaterial.prototype = Object.create(PGL.Material.prototype);
  PGL.MeshDepthMaterial.prototype.constructor = PGL.MeshDepthMaterial;
  PGL.MeshDepthMaterial.prototype.isMeshDepthMaterial = true;
  PGL.MeshDepthMaterial.prototype.copy = function (source) {

    Material.prototype.copy.call(this, source);

    this.depthPacking = source.depthPacking;

    this.skinning = source.skinning;
    this.morphTargets = source.morphTargets;

    this.map = source.map;

    this.alphaMap = source.alphaMap;

    this.displacementMap = source.displacementMap;
    this.displacementScale = source.displacementScale;
    this.displacementBias = source.displacementBias;

    this.wireframe = source.wireframe;
    this.wireframeLinewidth = source.wireframeLinewidth;

    return this;

  };

  /**
   *
   * parameters = {
   *
   *  referencePosition: <float>,
   *  nearDistance: <float>,
   *  farDistance: <float>,
   *
   *  skinning: <bool>,
   *  morphTargets: <bool>,
   *
   *  map: new THREE.Texture( <Image> ),
   *
   *  alphaMap: new THREE.Texture( <Image> ),
   *
   *  displacementMap: new THREE.Texture( <Image> ),
   *  displacementScale: <float>,
   *  displacementBias: <float>
   *
   * }
   */
  PGL.MeshDistanceMaterial = function (parameters) {

    PGL.Material.call(this);

    this.type = 'MeshDistanceMaterial';

    this.referencePosition = new PGL.Vector3();
    this.nearDistance = 1;
    this.farDistance = 1000;

    this.skinning = false;
    this.morphTargets = false;

    this.map = null;

    this.alphaMap = null;

    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;

    this.fog = false;
    this.lights = false;

    this.setValues(parameters);

  };
  PGL.MeshDistanceMaterial.prototype = Object.create(PGL.Material.prototype);
  PGL.MeshDistanceMaterial.prototype.constructor = PGL.MeshDistanceMaterial;
  PGL.MeshDistanceMaterial.prototype.isMeshDistanceMaterial = true;
  PGL.MeshDistanceMaterial.prototype.copy = function (source) {

    Material.prototype.copy.call(this, source);

    this.referencePosition.copy(source.referencePosition);
    this.nearDistance = source.nearDistance;
    this.farDistance = source.farDistance;

    this.skinning = source.skinning;
    this.morphTargets = source.morphTargets;

    this.map = source.map;

    this.alphaMap = source.alphaMap;

    this.displacementMap = source.displacementMap;
    this.displacementScale = source.displacementScale;
    this.displacementBias = source.displacementBias;

    return this;

  };
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

// render -> shader
(function (PGL) {
  var alphamap_fragment = "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif\n";

  var alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif\n";

  var alphatest_fragment = "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n";

  var aomap_fragment = "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif\n";

  var aomap_pars_fragment = "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif";

  var begin_vertex = "\nvec3 transformed = vec3( position );\n";

  var beginnormal_vertex = "\nvec3 objectNormal = vec3( normal );\n";

  var bsdfs = "float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tif( decayExponent > 0.0 ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tfloat maxDistanceCutoffFactor = pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\treturn distanceFalloff * maxDistanceCutoffFactor;\n#else\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n#endif\n\t}\n\treturn 1.0;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn specularColor * AB.x + AB.y;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n";

  var bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tfDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif\n";

  var clipping_planes_fragment = "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t#endif\n#endif\n";

  var clipping_planes_pars_fragment = "#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif\n";

  var clipping_planes_pars_vertex = "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvarying vec3 vViewPosition;\n#endif\n";

  var clipping_planes_vertex = "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n";

  var color_fragment = "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif";

  var color_pars_fragment = "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n";

  var color_pars_vertex = "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif";

  var color_vertex = "#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif";

  var common = "#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\n";

  var cube_uv_reflection_fragment = "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV( sampler2D envMap, vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif\n";

  var defaultnormal_vertex = "vec3 transformedNormal = normalMatrix * objectNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n";

  var displacementmap_pars_vertex = "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif\n";

  var displacementmap_vertex = "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif\n";

  var emissivemap_fragment = "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif\n";

  var emissivemap_pars_fragment = "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif\n";

  var encodings_fragment = "  gl_FragColor = linearToOutputTexel( gl_FragColor );\n";

  var encodings_pars_fragment = "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( gammaFactor ) ), value.w );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.w );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.xyz * value.w * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat M      = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM            = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat D      = max( maxRange / maxRGB, 1.0 );\n\tD            = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n\tXp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract(Le);\n\tvResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n\treturn vec4( max(vRGB, 0.0), 1.0 );\n}\n";

  var envmap_fragment = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\treflectVec = normalize( reflectVec );\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\treflectVec = normalize( reflectVec );\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif\n";

  var envmap_pars_fragment = "#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n#ifdef USE_ENVMAP\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif\n";

  var envmap_pars_vertex = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif\n";

  var envmap_vertex = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif\n";

  var fog_vertex = "\n#ifdef USE_FOG\nfogDepth = -mvPosition.z;\n#endif";

  var fog_pars_vertex = "#ifdef USE_FOG\n  varying float fogDepth;\n#endif\n";

  var fog_fragment = "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif\n";

  var fog_pars_fragment = "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif\n";

  var gradientmap_pars_fragment = "#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif\n";

  var lightmap_fragment = "#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif\n";

  var lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif";

  var lights_lambert_vertex = "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif\n";

  var lights_pars_begin = "uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t\tfloat shadowCameraNear;\n\t\tfloat shadowCameraFar;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif\n";

  var envmap_physical_pars_fragment = "#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent ));\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif\n";

  var lights_phong_fragment = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n";

  var lights_phong_pars_fragment = "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)\n";

  var lights_physical_fragment = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat );\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n";

  var lights_physical_pars_fragment = "struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos - halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos + halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos + halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos - halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#ifndef STANDARD\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.indirectSpecular += ( 1.0 - clearCoatDHR ) * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\t#ifndef STANDARD\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}\n";

  var lights_fragment_begin = "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearCoatRadiance = vec3( 0.0 );\n#endif\n";

  var lights_fragment_maps = "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tirradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), maxMipLevel );\n\t#ifndef STANDARD\n\t\tclearCoatRadiance += getLightProbeIndirectRadiance( geometry, Material_ClearCoat_BlinnShininessExponent( material ), maxMipLevel );\n\t#endif\n#endif\n";

  var lights_fragment_end = "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif\n";

  var logdepthbuf_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif";

  var logdepthbuf_pars_fragment = "#ifdef USE_LOGDEPTHBUF\n\tuniform float logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n#endif\n";

  var logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n\tuniform float logDepthBufFC;\n#endif";

  var logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\tgl_Position.z *= gl_Position.w;\n\t#endif\n#endif\n";

  var map_fragment = "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif\n";

  var map_pars_fragment = "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n";

  var map_particle_fragment = "#ifdef USE_MAP\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n";

  var map_particle_pars_fragment = "#ifdef USE_MAP\n\tuniform mat3 uvTransform;\n\tuniform sampler2D map;\n#endif\n";

  var metalnessmap_fragment = "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif\n";

  var metalnessmap_pars_fragment = "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif";

  var morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif\n";

  var morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif";

  var morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif\n";

  var normal_fragment_begin = "#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n#endif\n";

  var normal_fragment_maps = "#ifdef USE_NORMALMAP\n\t#ifdef OBJECTSPACE_NORMALMAP\n\t\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\t#ifdef FLIP_SIDED\n\t\t\tnormal = - normal;\n\t\t#endif\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#endif\n\t\tnormal = normalize( normalMatrix * normal );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n";

  var normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\t#ifdef OBJECTSPACE_NORMALMAP\n\t\tuniform mat3 normalMatrix;\n\t#else\n\t\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\t\tvec2 st0 = dFdx( vUv.st );\n\t\t\tvec2 st1 = dFdy( vUv.st );\n\t\t\tfloat scale = sign( st1.t * st0.s - st0.t * st1.s );\n\t\t\tvec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n\t\t\tvec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n\t\t\tvec3 N = normalize( surf_norm );\n\t\t\tmat3 tsn = mat3( S, T, N );\n\t\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\t\tmapN.xy *= normalScale;\n\t\t\tmapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t\treturn normalize( tsn * mapN );\n\t\t}\n\t#endif\n#endif\n";

  var packing = "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n";

  var premultiplied_alpha_fragment = "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n";

  var project_vertex = "vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n";

  var dithering_fragment = "#if defined( DITHERING )\n  gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif\n";

  var dithering_pars_fragment = "#if defined( DITHERING )\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif\n";

  var roughnessmap_fragment = "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif\n";

  var roughnessmap_pars_fragment = "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif";

  var shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif\n";

  var shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n#endif\n";

  var shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif\n";

  var shadowmask_pars_fragment = "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}\n";

  var skinbase_vertex = "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif";

  var skinning_pars_vertex = "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif\n";

  var skinning_vertex = "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif\n";

  var skinnormal_vertex = "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif\n";

  var specularmap_fragment = "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif";

  var specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif";

  var tonemapping_fragment = "#if defined( TONE_MAPPING )\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif\n";

  var tonemapping_pars_fragment = "#ifndef saturate\n\t#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\n";

  var uv_pars_fragment = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif";

  var uv_pars_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\n";

  var uv_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif";

  var uv2_pars_fragment = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif";

  var uv2_pars_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif";

  var uv2_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif";

  var worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n#endif\n";

  var cube_frag = "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldPosition;\nvoid main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n\tgl_FragColor.a *= opacity;\n}\n";

  var cube_vert = "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}\n";

  var depth_frag = "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}\n";

  var depth_vert = "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n";

  var distanceRGBA_frag = "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}\n";

  var distanceRGBA_vert = "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}\n";

  var equirect_frag = "uniform sampler2D tEquirect;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldPosition );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n}\n";

  var equirect_vert = "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n";

  var linedashed_frag = "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n";

  var linedashed_vert = "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n";

  var meshbasic_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n";

  var meshbasic_vert = "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}\n";

  var meshlambert_frag = "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n";

  var meshlambert_vert = "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n";

  var meshphong_frag = "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n";

  var meshphong_vert = "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n";

  var meshphysical_frag = "#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n";

  var meshphysical_vert = "#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n";

  var normal_frag = "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}\n";

  var normal_vert = "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}\n";

  var points_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n";

  var points_vert = "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#ifdef USE_SIZEATTENUATION\n\t\tgl_PointSize = size * ( scale / - mvPosition.z );\n\t#else\n\t\tgl_PointSize = size;\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}\n";

  var shadow_frag = "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <fog_fragment>\n}\n";

  var shadow_vert = "#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n";

  var sprite_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n";

  var sprite_vert = "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tvec4 mvPosition;\n\tmvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n";

  var ShaderChunk = {
    alphamap_fragment: alphamap_fragment,
    alphamap_pars_fragment: alphamap_pars_fragment,
    alphatest_fragment: alphatest_fragment,
    aomap_fragment: aomap_fragment,
    aomap_pars_fragment: aomap_pars_fragment,
    begin_vertex: begin_vertex,
    beginnormal_vertex: beginnormal_vertex,
    bsdfs: bsdfs,
    bumpmap_pars_fragment: bumpmap_pars_fragment,
    clipping_planes_fragment: clipping_planes_fragment,
    clipping_planes_pars_fragment: clipping_planes_pars_fragment,
    clipping_planes_pars_vertex: clipping_planes_pars_vertex,
    clipping_planes_vertex: clipping_planes_vertex,
    color_fragment: color_fragment,
    color_pars_fragment: color_pars_fragment,
    color_pars_vertex: color_pars_vertex,
    color_vertex: color_vertex,
    common: common,
    cube_uv_reflection_fragment: cube_uv_reflection_fragment,
    defaultnormal_vertex: defaultnormal_vertex,
    displacementmap_pars_vertex: displacementmap_pars_vertex,
    displacementmap_vertex: displacementmap_vertex,
    emissivemap_fragment: emissivemap_fragment,
    emissivemap_pars_fragment: emissivemap_pars_fragment,
    encodings_fragment: encodings_fragment,
    encodings_pars_fragment: encodings_pars_fragment,
    envmap_fragment: envmap_fragment,
    envmap_pars_fragment: envmap_pars_fragment,
    envmap_pars_vertex: envmap_pars_vertex,
    envmap_physical_pars_fragment: envmap_physical_pars_fragment,
    envmap_vertex: envmap_vertex,
    fog_vertex: fog_vertex,
    fog_pars_vertex: fog_pars_vertex,
    fog_fragment: fog_fragment,
    fog_pars_fragment: fog_pars_fragment,
    gradientmap_pars_fragment: gradientmap_pars_fragment,
    lightmap_fragment: lightmap_fragment,
    lightmap_pars_fragment: lightmap_pars_fragment,
    lights_lambert_vertex: lights_lambert_vertex,
    lights_pars_begin: lights_pars_begin,
    lights_phong_fragment: lights_phong_fragment,
    lights_phong_pars_fragment: lights_phong_pars_fragment,
    lights_physical_fragment: lights_physical_fragment,
    lights_physical_pars_fragment: lights_physical_pars_fragment,
    lights_fragment_begin: lights_fragment_begin,
    lights_fragment_maps: lights_fragment_maps,
    lights_fragment_end: lights_fragment_end,
    logdepthbuf_fragment: logdepthbuf_fragment,
    logdepthbuf_pars_fragment: logdepthbuf_pars_fragment,
    logdepthbuf_pars_vertex: logdepthbuf_pars_vertex,
    logdepthbuf_vertex: logdepthbuf_vertex,
    map_fragment: map_fragment,
    map_pars_fragment: map_pars_fragment,
    map_particle_fragment: map_particle_fragment,
    map_particle_pars_fragment: map_particle_pars_fragment,
    metalnessmap_fragment: metalnessmap_fragment,
    metalnessmap_pars_fragment: metalnessmap_pars_fragment,
    morphnormal_vertex: morphnormal_vertex,
    morphtarget_pars_vertex: morphtarget_pars_vertex,
    morphtarget_vertex: morphtarget_vertex,
    normal_fragment_begin: normal_fragment_begin,
    normal_fragment_maps: normal_fragment_maps,
    normalmap_pars_fragment: normalmap_pars_fragment,
    packing: packing,
    premultiplied_alpha_fragment: premultiplied_alpha_fragment,
    project_vertex: project_vertex,
    dithering_fragment: dithering_fragment,
    dithering_pars_fragment: dithering_pars_fragment,
    roughnessmap_fragment: roughnessmap_fragment,
    roughnessmap_pars_fragment: roughnessmap_pars_fragment,
    shadowmap_pars_fragment: shadowmap_pars_fragment,
    shadowmap_pars_vertex: shadowmap_pars_vertex,
    shadowmap_vertex: shadowmap_vertex,
    shadowmask_pars_fragment: shadowmask_pars_fragment,
    skinbase_vertex: skinbase_vertex,
    skinning_pars_vertex: skinning_pars_vertex,
    skinning_vertex: skinning_vertex,
    skinnormal_vertex: skinnormal_vertex,
    specularmap_fragment: specularmap_fragment,
    specularmap_pars_fragment: specularmap_pars_fragment,
    tonemapping_fragment: tonemapping_fragment,
    tonemapping_pars_fragment: tonemapping_pars_fragment,
    uv_pars_fragment: uv_pars_fragment,
    uv_pars_vertex: uv_pars_vertex,
    uv_vertex: uv_vertex,
    uv2_pars_fragment: uv2_pars_fragment,
    uv2_pars_vertex: uv2_pars_vertex,
    uv2_vertex: uv2_vertex,
    worldpos_vertex: worldpos_vertex,

    cube_frag: cube_frag,
    cube_vert: cube_vert,
    depth_frag: depth_frag,
    depth_vert: depth_vert,
    distanceRGBA_frag: distanceRGBA_frag,
    distanceRGBA_vert: distanceRGBA_vert,
    equirect_frag: equirect_frag,
    equirect_vert: equirect_vert,
    linedashed_frag: linedashed_frag,
    linedashed_vert: linedashed_vert,
    meshbasic_frag: meshbasic_frag,
    meshbasic_vert: meshbasic_vert,
    meshlambert_frag: meshlambert_frag,
    meshlambert_vert: meshlambert_vert,
    meshphong_frag: meshphong_frag,
    meshphong_vert: meshphong_vert,
    meshphysical_frag: meshphysical_frag,
    meshphysical_vert: meshphysical_vert,
    normal_frag: normal_frag,
    normal_vert: normal_vert,
    points_frag: points_frag,
    points_vert: points_vert,
    shadow_frag: shadow_frag,
    shadow_vert: shadow_vert,
    sprite_frag: sprite_frag,
    sprite_vert: sprite_vert
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

      map: {value: null},
      uvTransform: {value: new PGL.Matrix3()},

      alphaMap: {value: null},

    },

    specularmap: {

      specularMap: {value: null},

    },

    envmap: {

      envMap: {value: null},
      flipEnvMap: {value: -1},
      reflectivity: {value: 1.0},
      refractionRatio: {value: 0.98},
      maxMipLevel: {value: 0}

    },

    aomap: {

      aoMap: {value: null},
      aoMapIntensity: {value: 1}

    },

    lightmap: {

      lightMap: {value: null},
      lightMapIntensity: {value: 1}

    },

    emissivemap: {

      emissiveMap: {value: null}

    },

    bumpmap: {

      bumpMap: {value: null},
      bumpScale: {value: 1}

    },

    normalmap: {

      normalMap: {value: null},
      normalScale: {value: new PGL.Vector2(1, 1)}

    },

    displacementmap: {

      displacementMap: {value: null},
      displacementScale: {value: 1},
      displacementBias: {value: 0}

    },

    roughnessmap: {

      roughnessMap: {value: null}

    },

    metalnessmap: {

      metalnessMap: {value: null}

    },

    gradientmap: {

      gradientMap: {value: null}

    },

    fog: {

      fogDensity: {value: 0.00025},
      fogNear: {value: 1},
      fogFar: {value: 2000},
      fogColor: {value: new PGL.Color(0xffffff)}

    },

    lights: {

      ambientLightColor: {value: []},

      directionalLights: {
        value: [], properties: {
          direction: {},
          color: {},

          shadow: {},
          shadowBias: {},
          shadowRadius: {},
          shadowMapSize: {}
        }
      },

      directionalShadowMap: {value: []},
      directionalShadowMatrix: {value: []},

      spotLights: {
        value: [], properties: {
          color: {},
          position: {},
          direction: {},
          distance: {},
          coneCos: {},
          penumbraCos: {},
          decay: {},

          shadow: {},
          shadowBias: {},
          shadowRadius: {},
          shadowMapSize: {}
        }
      },

      spotShadowMap: {value: []},
      spotShadowMatrix: {value: []},

      pointLights: {
        value: [], properties: {
          color: {},
          position: {},
          decay: {},
          distance: {},

          shadow: {},
          shadowBias: {},
          shadowRadius: {},
          shadowMapSize: {},
          shadowCameraNear: {},
          shadowCameraFar: {}
        }
      },

      pointShadowMap: {value: []},
      pointShadowMatrix: {value: []},

      hemisphereLights: {
        value: [], properties: {
          direction: {},
          skyColor: {},
          groundColor: {}
        }
      },

      // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
      rectAreaLights: {
        value: [], properties: {
          color: {},
          position: {},
          width: {},
          height: {}
        }
      }

    },

    points: {

      diffuse: {value: new PGL.Color(0xeeeeee)},
      opacity: {value: 1.0},
      size: {value: 1.0},
      scale: {value: 1.0},
      map: {value: null},
      uvTransform: {value: new PGL.Matrix3()}

    }

  };

  PGL.ShaderLib = {

    basic: {
      uniforms: PGL.UniformsUtils.merge([
        PGL.UniformsLib.common,
        PGL.UniformsLib.specularmap,
        PGL.UniformsLib.envmap,
        PGL.UniformsLib.aomap,
        PGL.UniformsLib.lightmap,
        PGL.UniformsLib.fog
      ]),
      vertexShader: ShaderChunk.meshbasic_vert,
      fragmentShader: ShaderChunk.meshbasic_frag
    },

    lambert: {

      uniforms: PGL.UniformsUtils.merge([
        PGL.UniformsLib.common,
        PGL.UniformsLib.specularmap,
        PGL.UniformsLib.envmap,
        PGL.UniformsLib.aomap,
        PGL.UniformsLib.lightmap,
        PGL.UniformsLib.emissivemap,
        PGL.UniformsLib.fog,
        PGL.UniformsLib.lights,
        {
          emissive: {value: new PGL.Color(0x000000)}
        }
      ]),

      vertexShader: ShaderChunk.meshlambert_vert,
      fragmentShader: ShaderChunk.meshlambert_frag

    },

    phong: {

      uniforms: PGL.UniformsUtils.merge([
        PGL.UniformsLib.common,
        PGL.UniformsLib.specularmap,
        PGL.UniformsLib.envmap,
        PGL.UniformsLib.aomap,
        PGL.UniformsLib.lightmap,
        PGL.UniformsLib.emissivemap,
        PGL.UniformsLib.bumpmap,
        PGL.UniformsLib.normalmap,
        PGL.UniformsLib.displacementmap,
        PGL.UniformsLib.gradientmap,
        PGL.UniformsLib.fog,
        PGL.UniformsLib.lights,
        {
          emissive: {value: new PGL.Color(0x000000)},
          specular: {value: new PGL.Color(0x111111)},
          shininess: {value: 30}
        }
      ]),

      vertexShader: ShaderChunk.meshphong_vert,
      fragmentShader: ShaderChunk.meshphong_frag

    },

    standard: {

      uniforms: PGL.UniformsUtils.merge([
        PGL.UniformsLib.common,
        PGL.UniformsLib.envmap,
        PGL.UniformsLib.aomap,
        PGL.UniformsLib.lightmap,
        PGL.UniformsLib.emissivemap,
        PGL.UniformsLib.bumpmap,
        PGL.UniformsLib.normalmap,
        PGL.UniformsLib.displacementmap,
        PGL.UniformsLib.roughnessmap,
        PGL.UniformsLib.metalnessmap,
        PGL.UniformsLib.fog,
        PGL.UniformsLib.lights,
        {
          emissive: {value: new PGL.Color(0x000000)},
          roughness: {value: 0.5},
          metalness: {value: 0.5},
          envMapIntensity: {value: 1} // temporary
        }
      ]),

      vertexShader: ShaderChunk.meshphysical_vert,
      fragmentShader: ShaderChunk.meshphysical_frag

    },

    points: {

      uniforms: PGL.UniformsUtils.merge([
        PGL.UniformsLib.points,
        PGL.UniformsLib.fog
      ]),

      vertexShader: ShaderChunk.points_vert,
      fragmentShader: ShaderChunk.points_frag

    },

    dashed: {

      uniforms: PGL.UniformsUtils.merge([
        PGL.UniformsLib.common,
        PGL.UniformsLib.fog,
        {
          scale: {value: 1},
          dashSize: {value: 1},
          totalSize: {value: 2}
        }
      ]),

      vertexShader: ShaderChunk.linedashed_vert,
      fragmentShader: ShaderChunk.linedashed_frag

    },

    depth: {

      uniforms: PGL.UniformsUtils.merge([
        PGL.UniformsLib.common,
        PGL.UniformsLib.displacementmap
      ]),

      vertexShader: ShaderChunk.depth_vert,
      fragmentShader: ShaderChunk.depth_frag

    },

    normal: {

      uniforms: PGL.UniformsUtils.merge([
        PGL.UniformsLib.common,
        PGL.UniformsLib.bumpmap,
        PGL.UniformsLib.normalmap,
        PGL.UniformsLib.displacementmap,
        {
          opacity: {value: 1.0}
        }
      ]),

      vertexShader: ShaderChunk.normal_vert,
      fragmentShader: ShaderChunk.normal_frag

    },

    /* -------------------------------------------------------------------------
    //	Cube map shader
     ------------------------------------------------------------------------- */

    cube: {

      uniforms: {
        tCube: {value: null},
        tFlip: {value: -1},
        opacity: {value: 1.0}
      },

      vertexShader: ShaderChunk.cube_vert,
      fragmentShader: ShaderChunk.cube_frag

    },

    equirect: {

      uniforms: {
        tEquirect: {value: null},
      },

      vertexShader: ShaderChunk.equirect_vert,
      fragmentShader: ShaderChunk.equirect_frag

    },

    distanceRGBA: {

      uniforms: PGL.UniformsUtils.merge([
        PGL.UniformsLib.common,
        PGL.UniformsLib.displacementmap,
        {
          referencePosition: {value: new PGL.Vector3()},
          nearDistance: {value: 1},
          farDistance: {value: 1000}
        }
      ]),

      vertexShader: ShaderChunk.distanceRGBA_vert,
      fragmentShader: ShaderChunk.distanceRGBA_frag

    },

    shadow: {

      uniforms: PGL.UniformsUtils.merge([
        PGL.UniformsLib.lights,
        PGL.UniformsLib.fog,
        {
          color: {value: new PGL.Color(0x00000)},
          opacity: {value: 1.0}
        },
      ]),

      vertexShader: ShaderChunk.shadow_vert,
      fragmentShader: ShaderChunk.shadow_frag

    }

  };
  PGL.ShaderLib.physical = {

    uniforms: PGL.UniformsUtils.merge([
      PGL.ShaderLib.standard.uniforms,
      {
        clearCoat: {value: 0},
        clearCoatRoughness: {value: 0}
      }
    ]),

    vertexShader: ShaderChunk.meshphysical_vert,
    fragmentShader: ShaderChunk.meshphysical_frag

  };
})(PGL);

// renderer
(function (PGL) {

  /**
   * 对canvas背景色的管理
   * @param renderer 渲染器
   * @param state 状态管理器
   * @param objects 对象管理器
   * @param premultipliedAlpha 颜色值中的透明度是否预乘到rgb值中
   * @constructor
   */
  PGL.WebGLBackground = function (renderer, state, objects, premultipliedAlpha) {
    // 默认的背景颜色和透明度
    var clearColor = new PGL.Color(0x000000);
    var clearAlpha = 0;

    var planeCamera, planeMesh;
    var boxMesh;

    /**
     * 清空缓存区（设置背景颜色）
     * @param renderList 渲染列表
     * @param scene 场景
     * @param camera 相机
     * @param forceClear 标记强制清空颜色，深度，Stencil
     */
    function render(renderList, scene, camera, forceClear) {
      var background = scene.background;

      // 清空颜色缓存区
      if (background === null) {
        setClear(clearColor, clearAlpha);
      }

      // 清空颜色、深度、模板缓存区
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
      state.buffers.color.setClear(color.r, color.g, color.b, alpha, premultipliedAlpha);
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
   * 保存场景状态（颜色缓存、深度缓存等）
   * @param gl 上下文
   * @param extensions 获取扩展的对象
   * @param utils 转换方法
   * @return {{buffers: {color: ColorBuffer, depth: DepthBuffer, stencil: StencilBuffer}, initAttributes: initAttributes, enableAttribute: enableAttribute, enableAttributeAndDivisor: enableAttributeAndDivisor, disableUnusedAttributes: disableUnusedAttributes, enable: enable, disable: disable, getCompressedTextureFormats: getCompressedTextureFormats, useProgram: useProgram, setBlending: setBlending, setMaterial: setMaterial, setFlipSided: setFlipSided, setCullFace: setCullFace, setLineWidth: setLineWidth, setPolygonOffset: setPolygonOffset, setScissorTest: setScissorTest, activeTexture: activeTexture, bindTexture: bindTexture, compressedTexImage2D: compressedTexImage2D, texImage2D: texImage2D, scissor: scissor, viewport: viewport, reset: reset}}
   * @constructor
   */
  PGL.WebGLState = function (gl, extensions, utils) {

    function ColorBuffer() {

      var locked = false;

      var color = new PGL.Vector4(); // 要设置的背景颜色
      var currentColorMask = null;
      var currentColorClear = new PGL.Vector4(0, 0, 0, 0); // 当前的背景颜色

      return {

        /**
         * 设置颜色分量是否写入帧缓存
         * @param colorMask
         */
        setMask: function (colorMask) {
          if (currentColorMask !== colorMask && !locked) {
            gl.colorMask(colorMask, colorMask, colorMask, colorMask);
            currentColorMask = colorMask;
          }
        },

        setLocked: function (lock) {
          locked = lock;
        },

        /**
         * 设置背景颜色
         *  premultipliedAlpha 控制a值是否预乘到rgb上
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
        },

        reset: function () {

          locked = false;

          currentColorMask = null;
          currentColorClear.set(-1, 0, 0, 0); // set to invalid state

        }
      };
    }

    function DepthBuffer() {

      var locked = false;

      var currentDepthMask = null;
      var currentDepthFunc = null;
      var currentDepthClear = null;

      return {

        /**
         * 设置隐藏面消除
         * @param depthTest true 启动 false 关闭
         */
        setTest: function (depthTest) {
          if (depthTest) {
            enable(gl.DEPTH_TEST);
          } else {
            disable(gl.DEPTH_TEST);
          }
        },

        /**
         * 锁定或释放深度缓存区的写入操作
         * @param depthMask
         */
        setMask: function (depthMask) {
          if (currentDepthMask !== depthMask && !locked) {
            gl.depthMask(depthMask);
            currentDepthMask = depthMask;
          }
        },

        /**
         * 指定了一个将传入像素深度与当前深度缓冲区值进行比较的函数
         * @param depthFunc
         */
        setFunc: function (depthFunc) {
          if (currentDepthFunc !== depthFunc) {
            if (depthFunc) {
              switch (depthFunc) {
                case PGL.NeverDepth:
                  gl.depthFunc(gl.NEVER);
                  break;
                case PGL.AlwaysDepth:
                  gl.depthFunc(gl.ALWAYS);
                  break;
                case PGL.LessDepth:
                  gl.depthFunc(gl.LESS);
                  break;
                case PGL.LessEqualDepth:
                  gl.depthFunc(gl.LEQUAL);
                  break;
                case PGL.EqualDepth:
                  gl.depthFunc(gl.EQUAL);
                  break;
                case PGL.GreaterEqualDepth:
                  gl.depthFunc(gl.GEQUAL);
                  break;
                case PGL.GreaterDepth:
                  gl.depthFunc(gl.GREATER);
                  break;
                case PGL.NotEqualDepth:
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

    function StencilBuffer() {

      var locked = false;

      var currentStencilMask = null;
      var currentStencilFunc = null;
      var currentStencilRef = null;
      var currentStencilFuncMask = null;
      var currentStencilFail = null;
      var currentStencilZFail = null;
      var currentStencilZPass = null;
      var currentStencilClear = null;

      return {

        setTest: function (stencilTest) {

          if (stencilTest) {

            enable(gl.STENCIL_TEST);

          } else {

            disable(gl.STENCIL_TEST);

          }

        },

        setMask: function (stencilMask) {

          if (currentStencilMask !== stencilMask && !locked) {

            gl.stencilMask(stencilMask);
            currentStencilMask = stencilMask;

          }

        },

        setFunc: function (stencilFunc, stencilRef, stencilMask) {

          if (currentStencilFunc !== stencilFunc ||
            currentStencilRef !== stencilRef ||
            currentStencilFuncMask !== stencilMask) {

            gl.stencilFunc(stencilFunc, stencilRef, stencilMask);

            currentStencilFunc = stencilFunc;
            currentStencilRef = stencilRef;
            currentStencilFuncMask = stencilMask;

          }

        },

        setOp: function (stencilFail, stencilZFail, stencilZPass) {

          if (currentStencilFail !== stencilFail ||
            currentStencilZFail !== stencilZFail ||
            currentStencilZPass !== stencilZPass) {

            gl.stencilOp(stencilFail, stencilZFail, stencilZPass);

            currentStencilFail = stencilFail;
            currentStencilZFail = stencilZFail;
            currentStencilZPass = stencilZPass;

          }

        },

        setLocked: function (lock) {

          locked = lock;

        },

        setClear: function (stencil) {

          if (currentStencilClear !== stencil) {
            gl.clearStencil(stencil);
            currentStencilClear = stencil;
          }
        },

        reset: function () {

          locked = false;

          currentStencilMask = null;
          currentStencilFunc = null;
          currentStencilRef = null;
          currentStencilFuncMask = null;
          currentStencilFail = null;
          currentStencilZFail = null;
          currentStencilZPass = null;
          currentStencilClear = null;

        }
      };
    }

    var colorBuffer = new ColorBuffer();
    var depthBuffer = new DepthBuffer();
    var stencilBuffer = new StencilBuffer();

    var maxVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
    var newAttributes = new Uint8Array(maxVertexAttributes);
    var enabledAttributes = new Uint8Array(maxVertexAttributes);
    var attributeDivisors = new Uint8Array(maxVertexAttributes);

    var capabilities = {};

    var compressedTextureFormats = null;

    var currentProgram = null;

    var currentBlending = null; // 记录混合类型
    var currentBlendEquation = null;
    var currentBlendSrc = null;
    var currentBlendDst = null;
    var currentBlendEquationAlpha = null;
    var currentBlendSrcAlpha = null;
    var currentBlendDstAlpha = null;
    var currentPremultipledAlpha = false;

    var currentFlipSided = null;
    var currentCullFace = null;

    var currentLineWidth = null;

    var currentPolygonOffsetFactor = null;
    var currentPolygonOffsetUnits = null;

    var maxTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);

    var lineWidthAvailable = false;
    var version = 0;
    var glVersion = gl.getParameter(gl.VERSION);

    if (glVersion.indexOf('WebGL') !== -1) {

      version = parseFloat(/^WebGL\ ([0-9])/.exec(glVersion)[1]);
      lineWidthAvailable = (version >= 1.0);

    } else if (glVersion.indexOf('OpenGL ES') !== -1) {

      version = parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(glVersion)[1]);
      lineWidthAvailable = (version >= 2.0);

    }

    var currentTextureSlot = null;
    var currentBoundTextures = {};

    var currentScissor = new PGL.Vector4(); // 当前裁剪区域
    var currentViewport = new PGL.Vector4(); // 当前视点区域

    // 创建空的纹理
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
    emptyTextures[gl.TEXTURE_CUBE_MAP] = createTexture(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_CUBE_MAP_POSITIVE_X, 6);

    // init
    colorBuffer.setClear(0, 0, 0, 1); // 指定绘图区域的背景颜色
    depthBuffer.setClear(1); // 指定绘图区域的深度
    stencilBuffer.setClear(0); //

    enable(gl.DEPTH_TEST); // 消除隐藏面
    depthBuffer.setFunc(PGL.LessEqualDepth);

    setFlipSided(false);
    setCullFace(PGL.CullFaceBack);
    enable(gl.CULL_FACE);

    enable(gl.BLEND); // 混合
    setBlending(PGL.NormalBlending);

    function initAttributes() {

      for (var i = 0, l = newAttributes.length; i < l; i++) {

        newAttributes[i] = 0;

      }

    }

    function enableAttribute(attribute) {

      enableAttributeAndDivisor(attribute, 0);

    }

    function enableAttributeAndDivisor(attribute, meshPerAttribute) {

      newAttributes[attribute] = 1;

      if (enabledAttributes[attribute] === 0) {

        gl.enableVertexAttribArray(attribute);
        enabledAttributes[attribute] = 1;

      }

      if (attributeDivisors[attribute] !== meshPerAttribute) {

        var extension = extensions.get('ANGLE_instanced_arrays');

        extension.vertexAttribDivisorANGLE(attribute, meshPerAttribute);
        attributeDivisors[attribute] = meshPerAttribute;

      }

    }

    function disableUnusedAttributes() {

      for (var i = 0, l = enabledAttributes.length; i !== l; ++i) {

        if (enabledAttributes[i] !== newAttributes[i]) {

          gl.disableVertexAttribArray(i);
          enabledAttributes[i] = 0;

        }

      }

    }

    /**
     * 开启WebGL能力，并设置到capabilities对象中
     * @param id 名称
     */
    function enable(id) {
      if (capabilities[id] !== true) {
        gl.enable(id);
        capabilities[id] = true;
      }
    }

    function disable(id) {

      if (capabilities[id] !== false) {

        gl.disable(id);
        capabilities[id] = false;

      }

    }

    function getCompressedTextureFormats() {

      if (compressedTextureFormats === null) {

        compressedTextureFormats = [];

        if (extensions.get('WEBGL_compressed_texture_pvrtc') ||
          extensions.get('WEBGL_compressed_texture_s3tc') ||
          extensions.get('WEBGL_compressed_texture_etc1') ||
          extensions.get('WEBGL_compressed_texture_astc')) {

          var formats = gl.getParameter(gl.COMPRESSED_TEXTURE_FORMATS);

          for (var i = 0; i < formats.length; i++) {

            compressedTextureFormats.push(formats[i]);

          }

        }

      }

      return compressedTextureFormats;

    }

    function useProgram(program) {

      if (currentProgram !== program) {

        gl.useProgram(program);

        currentProgram = program;

        return true;

      }

      return false;

    }

    /**
     * 设置混合
     * @param blending 混合类型
     * @param blendEquation
     * @param blendSrc
     * @param blendDst
     * @param blendEquationAlpha
     * @param blendSrcAlpha
     * @param blendDstAlpha
     * @param premultipliedAlpha
     */
    function setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha) {

      if (blending !== PGL.NoBlending) {
        enable(gl.BLEND);
      } else {
        disable(gl.BLEND);
      }

      if (blending !== PGL.CustomBlending) {

        if (blending !== currentBlending || premultipliedAlpha !== currentPremultipledAlpha) {
          switch (blending) {

            case PGL.AdditiveBlending:
              if (premultipliedAlpha) {
                gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.ONE, gl.ONE);
              } else {
                gl.blendEquation(gl.FUNC_ADD);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
              }
              break;
            case PGL.SubtractiveBlending:
              if (premultipliedAlpha) {
                gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                gl.blendFuncSeparate(gl.ZERO, gl.ZERO, gl.ONE_MINUS_SRC_COLOR, gl.ONE_MINUS_SRC_ALPHA);
              } else {
                gl.blendEquation(gl.FUNC_ADD);
                gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_COLOR);
              }
              break;
            case PGL.MultiplyBlending:
              if (premultipliedAlpha) {
                gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                gl.blendFuncSeparate(gl.ZERO, gl.SRC_COLOR, gl.ZERO, gl.SRC_ALPHA);
              } else {
                gl.blendEquation(gl.FUNC_ADD);
                gl.blendFunc(gl.ZERO, gl.SRC_COLOR);
              }
              break;

            default:
              if (premultipliedAlpha) {
                gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
              } else {
                // 允许RGB和Alpha使用不同的混合方式
                gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                // 分别指定源和目标的颜色（RGB）分量和A（alpha）分量
                gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
              }
          }
        }

        currentBlendEquation = null;
        currentBlendSrc = null;
        currentBlendDst = null;
        currentBlendEquationAlpha = null;
        currentBlendSrcAlpha = null;
        currentBlendDstAlpha = null;

      } else {

        blendEquationAlpha = blendEquationAlpha || blendEquation;
        blendSrcAlpha = blendSrcAlpha || blendSrc;
        blendDstAlpha = blendDstAlpha || blendDst;

        if (blendEquation !== currentBlendEquation || blendEquationAlpha !== currentBlendEquationAlpha) {

          gl.blendEquationSeparate(utils.convert(blendEquation), utils.convert(blendEquationAlpha));

          currentBlendEquation = blendEquation;
          currentBlendEquationAlpha = blendEquationAlpha;

        }

        if (blendSrc !== currentBlendSrc || blendDst !== currentBlendDst || blendSrcAlpha !== currentBlendSrcAlpha || blendDstAlpha !== currentBlendDstAlpha) {

          gl.blendFuncSeparate(utils.convert(blendSrc), utils.convert(blendDst), utils.convert(blendSrcAlpha), utils.convert(blendDstAlpha));

          currentBlendSrc = blendSrc;
          currentBlendDst = blendDst;
          currentBlendSrcAlpha = blendSrcAlpha;
          currentBlendDstAlpha = blendDstAlpha;

        }

      }

      currentBlending = blending;
      currentPremultipledAlpha = premultipliedAlpha;
    }

    /**
     * 设置材质的多边形位移、消除隐藏面、混合等
     * @param material
     * @param frontFaceCW
     */
    function setMaterial(material, frontFaceCW) {

      material.side === PGL.DoubleSide
        ? disable(gl.CULL_FACE)
        : enable(gl.CULL_FACE);

      var flipSided = (material.side === PGL.BackSide);
      if (frontFaceCW) flipSided = !flipSided;

      setFlipSided(flipSided);

      (material.blending === PGL.NormalBlending && material.transparent === false)
        ? setBlending(PGL.NoBlending)
        : setBlending(material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha);

      depthBuffer.setFunc(material.depthFunc); // 指定了一个将传入像素深度与当前深度缓冲区值进行比较的函数
      depthBuffer.setTest(material.depthTest); // 设置是否启动隐藏面消除
      depthBuffer.setMask(material.depthWrite); // 锁定或释放深度缓存区的写入操作
      colorBuffer.setMask(material.colorWrite); // 是否锁定颜色

      // 设置多边形位移
      setPolygonOffset(material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits);
    }

    //

    function setFlipSided(flipSided) {
      if (currentFlipSided !== flipSided) {

        if (flipSided) {

          gl.frontFace(gl.CW);

        } else {

          gl.frontFace(gl.CCW);

        }

        currentFlipSided = flipSided;

      }
    }

    function setCullFace(cullFace) {

      if (cullFace !== PGL.CullFaceNone) {

        enable(gl.CULL_FACE);

        if (cullFace !== currentCullFace) {

          if (cullFace === PGL.CullFaceBack) {

            gl.cullFace(gl.BACK);

          } else if (cullFace === PGL.CullFaceFront) {

            gl.cullFace(gl.FRONT);

          } else {

            gl.cullFace(gl.FRONT_AND_BACK);

          }

        }

      } else {

        disable(gl.CULL_FACE);

      }

      currentCullFace = cullFace;

    }

    function setLineWidth(width) {

      if (width !== currentLineWidth) {

        if (lineWidthAvailable) gl.lineWidth(width);

        currentLineWidth = width;

      }

    }

    /**
     * 设置多边形位移
     * @param polygonOffset
     * @param factor
     * @param units
     */
    function setPolygonOffset(polygonOffset, factor, units) {
      if (polygonOffset) {
        enable(gl.POLYGON_OFFSET_FILL);

        if (currentPolygonOffsetFactor !== factor || currentPolygonOffsetUnits !== units) {
          gl.polygonOffset(factor, units);
          currentPolygonOffsetFactor = factor;
          currentPolygonOffsetUnits = units;
        }
      } else {
        disable(gl.POLYGON_OFFSET_FILL);
      }
    }

    function setScissorTest(scissorTest) {

      if (scissorTest) {

        enable(gl.SCISSOR_TEST);

      } else {

        disable(gl.SCISSOR_TEST);

      }

    }

    // texture

    function activeTexture(webglSlot) {

      if (webglSlot === undefined) webglSlot = gl.TEXTURE0 + maxTextures - 1;

      if (currentTextureSlot !== webglSlot) {

        gl.activeTexture(webglSlot);
        currentTextureSlot = webglSlot;

      }

    }

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

    function compressedTexImage2D() {

      try {

        gl.compressedTexImage2D.apply(gl, arguments);

      } catch (error) {

        console.error('THREE.WebGLState:', error);

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
     * 设置裁剪区域
     * @param scissor{PGL.Vector4}
     */
    function scissor(scissor) {
      if (currentScissor.equals(scissor) === false) {
        gl.scissor(scissor.x, scissor.y, scissor.z, scissor.w);
        currentScissor.copy(scissor);
      }
    }

    /**
     * 设置gl.drawArrays()和gl.drawElements()函数的绘图区域
     * @param viewport{PGL.Vector4}
     */
    function viewport(viewport) {
      if (currentViewport.equals(viewport) === false) {
        gl.viewport(viewport.x, viewport.y, viewport.z, viewport.w);
        currentViewport.copy(viewport);
      }
    }

    //

    function reset() {

      for (var i = 0; i < enabledAttributes.length; i++) {

        if (enabledAttributes[i] === 1) {

          gl.disableVertexAttribArray(i);
          enabledAttributes[i] = 0;

        }

      }

      capabilities = {};

      compressedTextureFormats = null;

      currentTextureSlot = null;
      currentBoundTextures = {};

      currentProgram = null;

      currentBlending = null;

      currentFlipSided = null;
      currentCullFace = null;

      colorBuffer.reset();
      depthBuffer.reset();
      stencilBuffer.reset();

    }

    return {

      buffers: {
        color: colorBuffer,
        depth: depthBuffer,
        stencil: stencilBuffer
      },

      initAttributes: initAttributes,
      enableAttribute: enableAttribute,
      enableAttributeAndDivisor: enableAttributeAndDivisor,
      disableUnusedAttributes: disableUnusedAttributes,
      enable: enable,
      disable: disable,
      getCompressedTextureFormats: getCompressedTextureFormats,

      useProgram: useProgram,

      setBlending: setBlending,
      setMaterial: setMaterial,

      setFlipSided: setFlipSided,
      setCullFace: setCullFace,

      setLineWidth: setLineWidth,
      setPolygonOffset: setPolygonOffset,

      setScissorTest: setScissorTest,

      activeTexture: activeTexture,
      bindTexture: bindTexture,
      compressedTexImage2D: compressedTexImage2D,
      texImage2D: texImage2D,

      scissor: scissor,
      viewport: viewport,

      reset: reset

    };
  };

  PGL.WebGLInfo = function (gl) {
    var memory = {
      geometries: 0, // 记录当前解析的geometry个数
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

    /**
     * 重置渲染属性
     */
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
      autoReset: true, // 标记重新设置渲染属性
      reset: reset,
      update: update
    };
  };

  /**
   * 对属性数据相关的操作（顶点数据、颜色数据等）
   * 管理缓存区
   * @param gl
   * @return {{update: update}}
   * @constructor
   */
  PGL.WebGLAttributes = function (gl) {

    var buffers = new WeakMap();

    /**
     * 创建缓存区
     * @param attribute 数据
     * @param bufferType 类型(是包含顶点数据，还是索引数据)
     * @return {{buffer: AudioBuffer | WebGLBuffer, type: number, bytesPerElement: number, version: *|number|string}}
     */
    function createBuffer(attribute, bufferType) {

      var array = attribute.array;
      var usage = attribute.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW; // 表示程序将如何使用存储在缓存区对象中的数据

      var buffer = gl.createBuffer();

      gl.bindBuffer(bufferType, buffer);
      gl.bufferData(bufferType, array, usage);

      attribute.onUploadCallback();

      // 获取数据类型
      var type = gl.FLOAT;
      if (array instanceof Float32Array) {
        type = gl.FLOAT;
      } else if (array instanceof Float64Array) {
        console.warn('PGL.WebGLAttributes: Unsupported data buffer format: Float64Array.');
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
        bytesPerElement: array.BYTES_PER_ELEMENT, // 数组中每个元素所占据的字节数
        version: attribute.version
      };

    }

    function updateBuffer(buffer, attribute, bufferType) {

      var array = attribute.array;
      var updateRange = attribute.updateRange;

      gl.bindBuffer(bufferType, buffer);

      if (attribute.dynamic === false) {

        gl.bufferData(bufferType, array, gl.STATIC_DRAW);

      } else if (updateRange.count === -1) {

        // Not using update ranges

        gl.bufferSubData(bufferType, 0, array);

      } else if (updateRange.count === 0) {

        console.error('THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.');

      } else {

        gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT,
          array.subarray(updateRange.offset, updateRange.offset + updateRange.count));

        updateRange.count = -1; // reset range

      }

    }

    /**
     * 更新缓存区
     * @param attribute
     * @param bufferType
     */
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

  /**
   * 解析geometry几何体中的属性
   * @param gl
   * @param attributes{PGL.WebGLAttributes}
   * @param info{PGL.WebGLInfo}
   * @return {{get: get, update: update}}
   * @constructor
   */
  PGL.WebGLGeometries = function (gl, attributes, info) {

    var geometries = {}; // 保存buffergeometry对象
    var wireframeAttributes = {};

    function onGeometryDispose(event) {
      console.log("onGeometryDispose");
    }

    /**
     * 从geometry获取buffergeometry
     * @param object 网格对象
     * @param geometry 几何体对象
     * @return {PGL.BufferGeometry}
     */
    function get(object, geometry) {
      var buffergeometry = geometries[geometry.id];

      if (buffergeometry) return buffergeometry;

      geometry.addEventListener('dispose', onGeometryDispose);

      if (geometry.isBufferGeometry) {
        buffergeometry = geometry;
      }
      else if (geometry.isGeometry) {
        if (geometry._bufferGeometry === undefined) {
          geometry._bufferGeometry = new PGL.BufferGeometry().setFromObject(object);
        }
        buffergeometry = geometry._bufferGeometry;
      }

      geometries[geometry.id] = buffergeometry;

      info.memory.geometries++;

      return buffergeometry;
    }

    /**
     * 更新缓存区
     * @param geometry PGL.BufferGeometry
     */
    function update(geometry) {

      var index = geometry.index;
      var geometryAttributes = geometry.attributes;

      if (index !== null) {
        attributes.update(index, gl.ELEMENT_ARRAY_BUFFER);
      }

      // 更新缓存区
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

  /**
   *
   * @param geometries
   * @param info{PGL.WebGLInfo}
   * @return {{update: update, dispose: dispose}}
   * @constructor
   */
  PGL.WebGLObjects = function (geometries, info) {

    var updateList = {};

    /**
     * 获取几何体的buffergeometry，并处理属性
     * @param object
     */
    function update(object) {
      var frame = info.render.frame;

      var geometry = object.geometry; // 几何对象
      var buffergeometry = geometries.get(object, geometry); // 获取PGL.BufferGeometry对象

      // Update once per frame
      if (updateList[buffergeometry.id] !== frame) {
        if (geometry.isGeometry) {
          buffergeometry.updateFromObject(object);
        }
        geometries.update(buffergeometry); // 更新缓存区等
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

  PGL.WebGLPrograms = function (renderer, extensions, capabilities) {

    var programs = [];

    var shaderIDs = {
      MeshDepthMaterial: 'depth',
      MeshDistanceMaterial: 'distanceRGBA',
      MeshNormalMaterial: 'normal',
      MeshBasicMaterial: 'basic',
      MeshLambertMaterial: 'lambert',
      MeshPhongMaterial: 'phong',
      MeshToonMaterial: 'phong',
      MeshStandardMaterial: 'physical',
      MeshPhysicalMaterial: 'physical',
      LineBasicMaterial: 'basic',
      LineDashedMaterial: 'dashed',
      PointsMaterial: 'points',
      ShadowMaterial: 'shadow'
    };

    var parameterNames = [
      "precision", "supportsVertexTextures", "map", "mapEncoding", "envMap", "envMapMode", "envMapEncoding",
      "lightMap", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "objectSpaceNormalMap", "displacementMap", "specularMap",
      "roughnessMap", "metalnessMap", "gradientMap",
      "alphaMap", "combine", "vertexColors", "fog", "useFog", "fogExp",
      "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning",
      "maxBones", "useVertexTexture", "morphTargets", "morphNormals",
      "maxMorphTargets", "maxMorphNormals", "premultipliedAlpha",
      "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights",
      "shadowMapEnabled", "shadowMapType", "toneMapping", 'physicallyCorrectLights',
      "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering"
    ];

    function allocateBones(object) {

      var skeleton = object.skeleton;
      var bones = skeleton.bones;

      if (capabilities.floatVertexTextures) {

        return 1024;

      } else {

        // default for when object is not specified
        // ( for example when prebuilding shader to be used with multiple objects )
        //
        //  - leave some extra space for other uniforms
        //  - limit here is ANGLE's 254 max uniform vectors
        //    (up to 54 should be safe)

        var nVertexUniforms = capabilities.maxVertexUniforms;
        var nVertexMatrices = Math.floor((nVertexUniforms - 20) / 4);

        var maxBones = Math.min(nVertexMatrices, bones.length);

        if (maxBones < bones.length) {

          console.warn('THREE.WebGLRenderer: Skeleton has ' + bones.length + ' bones. This GPU supports ' + maxBones + '.');
          return 0;

        }

        return maxBones;

      }

    }

    function getTextureEncodingFromMap(map, gammaOverrideLinear) {

      var encoding;

      if (!map) {
        encoding = PGL.LinearEncoding;
      } else if (map.isTexture) {
        encoding = map.encoding;
      } else if (map.isWebGLRenderTarget) {
        console.warn("PGL.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead.");
        encoding = map.texture.encoding;
      }

      // add backwards compatibility for WebGLRenderer.gammaInput/gammaOutput parameter, should probably be removed at some point.
      if (encoding === PGL.LinearEncoding && gammaOverrideLinear) {
        encoding = PGL.GammaEncoding;
      }

      return encoding;
    }

    this.getParameters = function (material, lights, shadows, fog, nClipPlanes, nClipIntersection, object) {

      var shaderID = shaderIDs[material.type];

      // heuristics to create shader parameters according to lights in the scene
      // (not to blow over maxLights budget)

      var maxBones = object.isSkinnedMesh ? allocateBones(object) : 0;
      var precision = capabilities.precision;

      if (material.precision !== null) {
        precision = capabilities.getMaxPrecision(material.precision);
        if (precision !== material.precision) {
          console.warn('PGL.WebGLProgram.getParameters:', material.precision, 'not supported, using', precision, 'instead.');
        }
      }

      var currentRenderTarget = renderer.getRenderTarget();

      var parameters = {

        shaderID: shaderID,

        precision: precision,
        supportsVertexTextures: capabilities.vertexTextures,
        outputEncoding: getTextureEncodingFromMap((!currentRenderTarget) ? null : currentRenderTarget.texture, renderer.gammaOutput),
        map: !!material.map,
        mapEncoding: getTextureEncodingFromMap(material.map, renderer.gammaInput),
        envMap: !!material.envMap,
        envMapMode: material.envMap && material.envMap.mapping,
        envMapEncoding: getTextureEncodingFromMap(material.envMap, renderer.gammaInput),
        envMapCubeUV: (!!material.envMap) && ((material.envMap.mapping === CubeUVReflectionMapping) || (material.envMap.mapping === CubeUVRefractionMapping)),
        lightMap: !!material.lightMap,
        aoMap: !!material.aoMap,
        emissiveMap: !!material.emissiveMap,
        emissiveMapEncoding: getTextureEncodingFromMap(material.emissiveMap, renderer.gammaInput),
        bumpMap: !!material.bumpMap,
        normalMap: !!material.normalMap,
        objectSpaceNormalMap: material.normalMapType === ObjectSpaceNormalMap,
        displacementMap: !!material.displacementMap,
        roughnessMap: !!material.roughnessMap,
        metalnessMap: !!material.metalnessMap,
        specularMap: !!material.specularMap,
        alphaMap: !!material.alphaMap,

        gradientMap: !!material.gradientMap,

        combine: material.combine,

        vertexColors: material.vertexColors,

        fog: !!fog,
        useFog: material.fog,
        fogExp: (fog && fog.isFogExp2),

        flatShading: material.flatShading,

        sizeAttenuation: material.sizeAttenuation,
        logarithmicDepthBuffer: capabilities.logarithmicDepthBuffer,

        skinning: material.skinning && maxBones > 0,
        maxBones: maxBones,
        useVertexTexture: capabilities.floatVertexTextures,

        morphTargets: material.morphTargets,
        morphNormals: material.morphNormals,
        maxMorphTargets: renderer.maxMorphTargets,
        maxMorphNormals: renderer.maxMorphNormals,

        numDirLights: lights.directional.length,
        numPointLights: lights.point.length,
        numSpotLights: lights.spot.length,
        numRectAreaLights: lights.rectArea.length,
        numHemiLights: lights.hemi.length,

        numClippingPlanes: nClipPlanes,
        numClipIntersection: nClipIntersection,

        dithering: material.dithering,

        shadowMapEnabled: renderer.shadowMap.enabled && object.receiveShadow && shadows.length > 0,
        shadowMapType: renderer.shadowMap.type,

        toneMapping: renderer.toneMapping,
        physicallyCorrectLights: renderer.physicallyCorrectLights,

        premultipliedAlpha: material.premultipliedAlpha,

        alphaTest: material.alphaTest,
        doubleSided: material.side === DoubleSide,
        flipSided: material.side === BackSide,

        depthPacking: (material.depthPacking !== undefined) ? material.depthPacking : false

      };

      return parameters;

    };

    this.getProgramCode = function (material, parameters) {

      var array = [];

      if (parameters.shaderID) {
        array.push(parameters.shaderID);
      } else {
        array.push(material.fragmentShader);
        array.push(material.vertexShader);
      }

      if (material.defines !== undefined) {

        for (var name in material.defines) {

          array.push(name);
          array.push(material.defines[name]);

        }

      }

      for (var i = 0; i < parameterNames.length; i++) {
        array.push(parameters[parameterNames[i]]);
      }

      array.push(material.onBeforeCompile.toString());

      array.push(renderer.gammaOutput);

      return array.join();
    };

    this.acquireProgram = function (material, shader, parameters, code) {

      var program;

      // Check if code has been already compiled
      for (var p = 0, pl = programs.length; p < pl; p++) {

        var programInfo = programs[p];

        if (programInfo.code === code) {

          program = programInfo;
          ++program.usedTimes;

          break;

        }

      }

      if (program === undefined) {

        program = new WebGLProgram(renderer, extensions, code, material, shader, parameters);
        programs.push(program);

      }

      return program;

    };

    this.releaseProgram = function (program) {

      if (--program.usedTimes === 0) {

        // Remove from unordered set
        var i = programs.indexOf(program);
        programs[i] = programs[programs.length - 1];
        programs.pop();

        // Free WebGL resources
        program.destroy();

      }

    };

    // Exposed for resource monitoring & error feedback via renderer.info:
    this.programs = programs;

  };

  function painterSortStable(a, b) {

    if (a.renderOrder !== b.renderOrder) {

      return a.renderOrder - b.renderOrder;

    } else if (a.program && b.program && a.program !== b.program) {

      return a.program.id - b.program.id;

    } else if (a.material.id !== b.material.id) {

      return a.material.id - b.material.id;

    } else if (a.z !== b.z) {

      return a.z - b.z;

    } else {

      return a.id - b.id;

    }

  }

  function reversePainterSortStable(a, b) {

    if (a.renderOrder !== b.renderOrder) {

      return a.renderOrder - b.renderOrder;

    }
    if (a.z !== b.z) {

      return b.z - a.z;

    } else {

      return a.id - b.id;

    }

  }

  /**
   * 保存渲染的对象，并管理
   * @return {{opaque: Array, transparent: Array, init: init, push: push, sort: sort}}
   * @constructor
   */
  PGL.WebGLRenderList = function () {
    var renderItems = []; // 保存所有的项
    var renderItemsIndex = 0; // 记录渲染的个数

    var opaque = []; // 保存不透明的项
    var transparent = []; // 保存透明项

    function init() {
      renderItemsIndex = 0;

      opaque.length = 0;
      transparent.length = 0;
    }

    /**
     *
     * @param object 对象
     * @param geometry{PGL.BufferGeometry}
     * @param material 材质
     * @param z
     * @param group
     */
    function push(object, geometry, material, z, group) {

      var renderItem = renderItems[renderItemsIndex];

      if (renderItem === undefined) {

        renderItem = {
          id: object.id,
          object: object,
          geometry: geometry,
          material: material,
          program: material.program,
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
        renderItem.program = material.program;
        renderItem.renderOrder = object.renderOrder;
        renderItem.z = z;
        renderItem.group = group;

      }

      (material.transparent === true ? transparent : opaque).push(renderItem);

      renderItemsIndex++;

    }

    /**
     * 给所有的渲染项目进行排序
     */
    function sort() {
      if (opaque.length > 1) opaque.sort(painterSortStable);
      if (transparent.length > 1) transparent.sort(reversePainterSortStable);
    }

    return {
      opaque: opaque,
      transparent: transparent,

      init: init,
      push: push,

      sort: sort
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

  PGL.WebGLProperties = function () {

    var properties = new WeakMap();

    function get(object) {

      var map = properties.get(object);

      if (map === undefined) {

        map = {};
        properties.set(object, map);

      }

      return map;

    }

    function remove(object) {

      properties.delete(object);

    }

    function update(object, key, value) {

      properties.get(object)[key] = value;

    }

    function dispose() {

      properties = new WeakMap();

    }

    return {
      get: get,
      remove: remove,
      update: update,
      dispose: dispose
    };

  };

  function UniformsCache() {

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
              direction: new PGL.Vector3(),
              color: new Color(),

              shadow: false,
              shadowBias: 0,
              shadowRadius: 1,
              shadowMapSize: new Vector2()
            };
            break;

          case 'SpotLight':
            uniforms = {
              position: new PGL.Vector3(),
              direction: new PGL.Vector3(),
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
              position: new PGL.Vector3(),
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
              direction: new PGL.Vector3(),
              skyColor: new Color(),
              groundColor: new Color()
            };
            break;

          case 'RectAreaLight':
            uniforms = {
              color: new Color(),
              position: new PGL.Vector3(),
              halfWidth: new PGL.Vector3(),
              halfHeight: new PGL.Vector3()
              // TODO (abelnation): set RectAreaLight shadow uniforms
            };
            break;

        }

        lights[light.id] = uniforms;

        return uniforms;

      }

    };
  }

  var count = 0;

  PGL.WebGLLights = function () {

    var cache = new UniformsCache();

    var state = {

      id: count++,

      hash: '',

      ambient: [0, 0, 0],
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

    var vector3 = new PGL.Vector3();
    var matrix4 = new PGL.Matrix4();
    var matrix42 = new PGL.Matrix4();

    function setup(lights, shadows, camera) {

      var r = 0, g = 0, b = 0;

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
          uniforms.decay = (light.distance === 0) ? 0.0 : light.decay;

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
          uniforms.decay = (light.distance === 0) ? 0.0 : light.decay;

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

      state.hash = state.id + ',' + directionalLength + ',' + pointLength + ',' + spotLength + ',' + rectAreaLength + ',' + hemiLength + ',' + shadows.length;

    }

    return {
      setup: setup,
      state: state
    };

  };

  PGL.WebGLRenderState = function () {

    var lights = new PGL.WebGLLights();

    var lightsArray = [];
    var shadowsArray = [];
    var spritesArray = [];

    function init() {

      lightsArray.length = 0;
      shadowsArray.length = 0;
      spritesArray.length = 0;

    }

    function pushLight(light) {

      lightsArray.push(light);

    }

    function pushShadow(shadowLight) {

      shadowsArray.push(shadowLight);

    }

    function pushSprite(sprite) {

      spritesArray.push(sprite);

    }

    function setupLights(camera) {

      lights.setup(lightsArray, shadowsArray, camera);

    }

    var state = {
      lightsArray: lightsArray,
      shadowsArray: shadowsArray,
      spritesArray: spritesArray,

      lights: lights
    };

    return {
      init: init,
      state: state,
      setupLights: setupLights,

      pushLight: pushLight,
      pushShadow: pushShadow,
      pushSprite: pushSprite
    };

  };

  /**
   * 管理渲染状态
   * @return {{get: get, dispose: dispose}}
   * @constructor
   */
  PGL.WebGLRenderStates = function () {

    var renderStates = {};

    /**
     * 获取渲染状态
     * @param scene
     * @return {*}
     */
    function get(scene) {

      var hash = scene.id;
      var renderState = renderStates[hash];

      if (renderState === undefined) {
        renderState = new PGL.WebGLRenderState();
        renderStates[hash] = renderState;
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

  PGL.WebGLClipping = function () {

    var scope = this,

      globalState = null,
      numGlobalPlanes = 0,
      localClippingEnabled = false,
      renderingShadows = false,

      plane = new PGL.Plane(),
      viewNormalMatrix = new PGL.Matrix3(),

      uniform = {value: null, needsUpdate: false};

    this.uniform = uniform;
    this.numPlanes = 0;
    this.numIntersection = 0;

    /**
     *
     * @param planes
     * @param enableLocalClipping
     * @param camera
     * @return {boolean|*}
     */
    this.init = function (planes, enableLocalClipping, camera) {

      var enabled =
        planes.length !== 0 ||
        enableLocalClipping ||
        // enable state of previous frame - the clipping code has to
        // run another frame in order to reset the state:
        numGlobalPlanes !== 0 ||
        localClippingEnabled;

      localClippingEnabled = enableLocalClipping;

      globalState = projectPlanes(planes, camera, 0);
      numGlobalPlanes = planes.length;

      return enabled;

    };

    this.beginShadows = function () {

      renderingShadows = true;
      projectPlanes(null);

    };

    this.endShadows = function () {

      renderingShadows = false;
      resetGlobalState();

    };

    this.setState = function (planes, clipIntersection, clipShadows, camera, cache, fromCache) {

      if (!localClippingEnabled || planes === null || planes.length === 0 || renderingShadows && !clipShadows) {

        // there's no local clipping

        if (renderingShadows) {

          // there's no global clipping

          projectPlanes(null);

        } else {

          resetGlobalState();

        }

      } else {

        var nGlobal = renderingShadows ? 0 : numGlobalPlanes,
          lGlobal = nGlobal * 4,

          dstArray = cache.clippingState || null;

        uniform.value = dstArray; // ensure unique state

        dstArray = projectPlanes(planes, camera, lGlobal, fromCache);

        for (var i = 0; i !== lGlobal; ++i) {

          dstArray[i] = globalState[i];

        }

        cache.clippingState = dstArray;
        this.numIntersection = clipIntersection ? this.numPlanes : 0;
        this.numPlanes += nGlobal;

      }


    };

    function resetGlobalState() {

      if (uniform.value !== globalState) {

        uniform.value = globalState;
        uniform.needsUpdate = numGlobalPlanes > 0;

      }

      scope.numPlanes = numGlobalPlanes;
      scope.numIntersection = 0;

    }

    function projectPlanes(planes, camera, dstOffset, skipTransform) {

      var nPlanes = planes !== null ? planes.length : 0,
        dstArray = null;

      if (nPlanes !== 0) {

        dstArray = uniform.value;

        if (skipTransform !== true || dstArray === null) {

          var flatSize = dstOffset + nPlanes * 4,
            viewMatrix = camera.matrixWorldInverse;

          viewNormalMatrix.getNormalMatrix(viewMatrix);

          if (dstArray === null || dstArray.length < flatSize) {

            dstArray = new Float32Array(flatSize);

          }

          for (var i = 0, i4 = dstOffset; i !== nPlanes; ++i, i4 += 4) {

            plane.copy(planes[i]).applyMatrix4(viewMatrix, viewNormalMatrix);

            plane.normal.toArray(dstArray, i4);
            dstArray[i4 + 3] = plane.constant;

          }

        }

        uniform.value = dstArray;
        uniform.needsUpdate = true;

      }

      scope.numPlanes = nPlanes;

      return dstArray;

    }

  };

  /**
   * 获取WebGL的扩展对象，并保存
   * @param gl 上下文
   * @return {{get: get}}
   * @constructor
   */
  PGL.WebGLExtensions = function (gl) {
    var extensions = {};
    return {
      /**
       * 获取WebGL扩展对象
       * @param name
       * @return {*}
       */
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
   * 返回一个转换方法
   * @param gl 上下文
   * @param extensions 获取扩展方法的对象
   * @return {{convert: convert}}
   * @constructor
   */
  PGL.WebGLUtils = function (gl, extensions) {
    function convert(p) {

      var extension;

      if (p === RepeatWrapping) return gl.REPEAT;
      if (p === ClampToEdgeWrapping) return gl.CLAMP_TO_EDGE;
      if (p === MirroredRepeatWrapping) return gl.MIRRORED_REPEAT;

      if (p === NearestFilter) return gl.NEAREST;
      if (p === NearestMipMapNearestFilter) return gl.NEAREST_MIPMAP_NEAREST;
      if (p === NearestMipMapLinearFilter) return gl.NEAREST_MIPMAP_LINEAR;

      if (p === LinearFilter) return gl.LINEAR;
      if (p === LinearMipMapNearestFilter) return gl.LINEAR_MIPMAP_NEAREST;
      if (p === LinearMipMapLinearFilter) return gl.LINEAR_MIPMAP_LINEAR;

      if (p === UnsignedByteType) return gl.UNSIGNED_BYTE;
      if (p === UnsignedShort4444Type) return gl.UNSIGNED_SHORT_4_4_4_4;
      if (p === UnsignedShort5551Type) return gl.UNSIGNED_SHORT_5_5_5_1;
      if (p === UnsignedShort565Type) return gl.UNSIGNED_SHORT_5_6_5;

      if (p === ByteType) return gl.BYTE;
      if (p === ShortType) return gl.SHORT;
      if (p === UnsignedShortType) return gl.UNSIGNED_SHORT;
      if (p === IntType) return gl.INT;
      if (p === UnsignedIntType) return gl.UNSIGNED_INT;
      if (p === FloatType) return gl.FLOAT;

      if (p === HalfFloatType) {

        extension = extensions.get('OES_texture_half_float');

        if (extension !== null) return extension.HALF_FLOAT_OES;

      }

      if (p === AlphaFormat) return gl.ALPHA;
      if (p === RGBFormat) return gl.RGB;
      if (p === RGBAFormat) return gl.RGBA;
      if (p === LuminanceFormat) return gl.LUMINANCE;
      if (p === LuminanceAlphaFormat) return gl.LUMINANCE_ALPHA;
      if (p === DepthFormat) return gl.DEPTH_COMPONENT;
      if (p === DepthStencilFormat) return gl.DEPTH_STENCIL;

      if (p === AddEquation) return gl.FUNC_ADD;
      if (p === SubtractEquation) return gl.FUNC_SUBTRACT;
      if (p === ReverseSubtractEquation) return gl.FUNC_REVERSE_SUBTRACT;

      if (p === ZeroFactor) return gl.ZERO;
      if (p === OneFactor) return gl.ONE;
      if (p === SrcColorFactor) return gl.SRC_COLOR;
      if (p === OneMinusSrcColorFactor) return gl.ONE_MINUS_SRC_COLOR;
      if (p === SrcAlphaFactor) return gl.SRC_ALPHA;
      if (p === OneMinusSrcAlphaFactor) return gl.ONE_MINUS_SRC_ALPHA;
      if (p === DstAlphaFactor) return gl.DST_ALPHA;
      if (p === OneMinusDstAlphaFactor) return gl.ONE_MINUS_DST_ALPHA;

      if (p === DstColorFactor) return gl.DST_COLOR;
      if (p === OneMinusDstColorFactor) return gl.ONE_MINUS_DST_COLOR;
      if (p === SrcAlphaSaturateFactor) return gl.SRC_ALPHA_SATURATE;

      if (p === RGB_S3TC_DXT1_Format || p === RGBA_S3TC_DXT1_Format ||
        p === RGBA_S3TC_DXT3_Format || p === RGBA_S3TC_DXT5_Format) {

        extension = extensions.get('WEBGL_compressed_texture_s3tc');

        if (extension !== null) {

          if (p === RGB_S3TC_DXT1_Format) return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
          if (p === RGBA_S3TC_DXT1_Format) return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
          if (p === RGBA_S3TC_DXT3_Format) return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
          if (p === RGBA_S3TC_DXT5_Format) return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;

        }

      }

      if (p === RGB_PVRTC_4BPPV1_Format || p === RGB_PVRTC_2BPPV1_Format ||
        p === RGBA_PVRTC_4BPPV1_Format || p === RGBA_PVRTC_2BPPV1_Format) {

        extension = extensions.get('WEBGL_compressed_texture_pvrtc');

        if (extension !== null) {

          if (p === RGB_PVRTC_4BPPV1_Format) return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
          if (p === RGB_PVRTC_2BPPV1_Format) return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
          if (p === RGBA_PVRTC_4BPPV1_Format) return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
          if (p === RGBA_PVRTC_2BPPV1_Format) return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;

        }

      }

      if (p === RGB_ETC1_Format) {

        extension = extensions.get('WEBGL_compressed_texture_etc1');

        if (extension !== null) return extension.COMPRESSED_RGB_ETC1_WEBGL;

      }

      if (p === RGBA_ASTC_4x4_Format || p === RGBA_ASTC_5x4_Format || p === RGBA_ASTC_5x5_Format ||
        p === RGBA_ASTC_6x5_Format || p === RGBA_ASTC_6x6_Format || p === RGBA_ASTC_8x5_Format ||
        p === RGBA_ASTC_8x6_Format || p === RGBA_ASTC_8x8_Format || p === RGBA_ASTC_10x5_Format ||
        p === RGBA_ASTC_10x6_Format || p === RGBA_ASTC_10x8_Format || p === RGBA_ASTC_10x10_Format ||
        p === RGBA_ASTC_12x10_Format || p === RGBA_ASTC_12x12_Format) {

        extension = extensions.get('WEBGL_compressed_texture_astc');

        if (extension !== null) {

          return p;

        }

      }

      if (p === MinEquation || p === MaxEquation) {

        extension = extensions.get('EXT_blend_minmax');

        if (extension !== null) {

          if (p === MinEquation) return extension.MIN_EXT;
          if (p === MaxEquation) return extension.MAX_EXT;

        }

      }

      if (p === UnsignedInt248Type) {

        extension = extensions.get('WEBGL_depth_texture');

        if (extension !== null) return extension.UNSIGNED_INT_24_8_WEBGL;

      }

      return 0;

    }

    return {convert: convert};
  };

  /**
   * 获取当前WebGL的支持能力（精度、最大贴图数量等）
   * @param gl 上下文
   * @param extensions 获取扩展方法的对象
   * @param parameters 参数
   *  precision：精度 highp
   *  logarithmicDepthBuffer：
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
     * 获取当前WebGL支持的最高精度
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

    // 结合给定精度和最高精度，设置当前使用的精度
    var precision = parameters.precision !== undefined ? parameters.precision : 'highp'; // 给定的精度
    var maxPrecision = getMaxPrecision(precision); // 当前支持的最大精度

    if (maxPrecision !== precision) {
      console.warn('THREE.WebGLRenderer:', precision, 'not supported, using', maxPrecision, 'instead.');
      precision = maxPrecision;
    }

    var logarithmicDepthBuffer = parameters.logarithmicDepthBuffer === true;

    var maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    var maxVertexTextures = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    var maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE); // 获取支持纹理的最大尺寸
    var maxCubemapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);

    var maxAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
    var maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
    var maxVaryings = gl.getParameter(gl.MAX_VARYING_VECTORS);
    var maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);

    var vertexTextures = maxVertexTextures > 0;
    var floatFragmentTextures = !!extensions.get('OES_texture_float');
    var floatVertexTextures = vertexTextures && floatFragmentTextures;

    return {

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
      floatVertexTextures: floatVertexTextures

    };

  };

  /**
   *
   * @param _gl 上下文
   * @param extensions 获取扩展的对象
   * @param state
   * @param properties
   * @param capabilities
   * @param utils
   * @param info
   * @constructor
   */
  PGL.WebGLTextures = function (_gl, extensions, state, properties, capabilities, utils, info) {

    var _isWebGL2 = (typeof WebGL2RenderingContext !== 'undefined' && _gl instanceof WebGL2RenderingContext);
    /* global WebGL2RenderingContext */
    var _videoTextures = {};
    var _canvas;

    //

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

        console.warn('THREE.WebGLRenderer: image is too big (' + image.width + 'x' + image.height + '). Resized to ' + canvas.width + 'x' + canvas.height, image);

        return canvas;

      }

      return image;

    }

    function isPowerOfTwo(image) {

      return _Math.isPowerOfTwo(image.width) && _Math.isPowerOfTwo(image.height);

    }

    function makePowerOfTwo(image) {

      if (image instanceof HTMLImageElement || image instanceof HTMLCanvasElement || image instanceof ImageBitmap) {

        if (_canvas === undefined) _canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');

        _canvas.width = _Math.floorPowerOfTwo(image.width);
        _canvas.height = _Math.floorPowerOfTwo(image.height);

        var context = _canvas.getContext('2d');
        context.drawImage(image, 0, 0, _canvas.width, _canvas.height);

        console.warn('THREE.WebGLRenderer: image is not power of two (' + image.width + 'x' + image.height + '). Resized to ' + _canvas.width + 'x' + _canvas.height, image);

        return _canvas;

      }

      return image;

    }

    function textureNeedsPowerOfTwo(texture) {

      return (texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping) ||
        (texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter);

    }

    function textureNeedsGenerateMipmaps(texture, isPowerOfTwo) {

      return texture.generateMipmaps && isPowerOfTwo &&
        texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;

    }

    function generateMipmap(target, texture, width, height) {

      _gl.generateMipmap(target);

      var textureProperties = properties.get(texture);

      // Note: Math.log( x ) * Math.LOG2E used instead of Math.log2( x ) which is not supported by IE11
      textureProperties.__maxMipLevel = Math.log(Math.max(width, height)) * Math.LOG2E;

    }

    // Fallback filters for non-power-of-2 textures

    function filterFallback(f) {

      if (f === NearestFilter || f === NearestMipMapNearestFilter || f === NearestMipMapLinearFilter) {

        return _gl.NEAREST;

      }

      return _gl.LINEAR;

    }

    //

    function onTextureDispose(event) {

      var texture = event.target;

      texture.removeEventListener('dispose', onTextureDispose);

      deallocateTexture(texture);

      if (texture.isVideoTexture) {

        delete _videoTextures[texture.id];

      }

      info.memory.textures--;

    }

    function onRenderTargetDispose(event) {

      var renderTarget = event.target;

      renderTarget.removeEventListener('dispose', onRenderTargetDispose);

      deallocateRenderTarget(renderTarget);

      info.memory.textures--;

    }

    //

    function deallocateTexture(texture) {

      var textureProperties = properties.get(texture);

      if (texture.image && textureProperties.__image__webglTextureCube) {

        // cube texture

        _gl.deleteTexture(textureProperties.__image__webglTextureCube);

      } else {

        // 2D texture

        if (textureProperties.__webglInit === undefined) return;

        _gl.deleteTexture(textureProperties.__webglTexture);

      }

      // remove all webgl properties
      properties.remove(texture);

    }

    function deallocateRenderTarget(renderTarget) {

      var renderTargetProperties = properties.get(renderTarget);
      var textureProperties = properties.get(renderTarget.texture);

      if (!renderTarget) return;

      if (textureProperties.__webglTexture !== undefined) {

        _gl.deleteTexture(textureProperties.__webglTexture);

      }

      if (renderTarget.depthTexture) {

        renderTarget.depthTexture.dispose();

      }

      if (renderTarget.isWebGLRenderTargetCube) {

        for (var i = 0; i < 6; i++) {

          _gl.deleteFramebuffer(renderTargetProperties.__webglFramebuffer[i]);
          if (renderTargetProperties.__webglDepthbuffer) _gl.deleteRenderbuffer(renderTargetProperties.__webglDepthbuffer[i]);

        }

      } else {

        _gl.deleteFramebuffer(renderTargetProperties.__webglFramebuffer);
        if (renderTargetProperties.__webglDepthbuffer) _gl.deleteRenderbuffer(renderTargetProperties.__webglDepthbuffer);

      }

      properties.remove(renderTarget.texture);
      properties.remove(renderTarget);

    }

    //


    function setTexture2D(texture, slot) {

      var textureProperties = properties.get(texture);

      if (texture.isVideoTexture) updateVideoTexture(texture);

      if (texture.version > 0 && textureProperties.__version !== texture.version) {

        var image = texture.image;

        if (image === undefined) {

          console.warn('THREE.WebGLRenderer: Texture marked for update but image is undefined', texture);

        } else if (image.complete === false) {

          console.warn('THREE.WebGLRenderer: Texture marked for update but image is incomplete', texture);

        } else {

          uploadTexture(textureProperties, texture, slot);
          return;

        }

      }

      state.activeTexture(_gl.TEXTURE0 + slot);
      state.bindTexture(_gl.TEXTURE_2D, textureProperties.__webglTexture);

    }

    function setTextureCube(texture, slot) {

      var textureProperties = properties.get(texture);

      if (texture.image.length === 6) {

        if (texture.version > 0 && textureProperties.__version !== texture.version) {

          if (!textureProperties.__image__webglTextureCube) {

            texture.addEventListener('dispose', onTextureDispose);

            textureProperties.__image__webglTextureCube = _gl.createTexture();

            info.memory.textures++;

          }

          state.activeTexture(_gl.TEXTURE0 + slot);
          state.bindTexture(_gl.TEXTURE_CUBE_MAP, textureProperties.__image__webglTextureCube);

          _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);

          var isCompressed = (texture && texture.isCompressedTexture);
          var isDataTexture = (texture.image[0] && texture.image[0].isDataTexture);

          var cubeImage = [];

          for (var i = 0; i < 6; i++) {

            if (!isCompressed && !isDataTexture) {

              cubeImage[i] = clampToMaxSize(texture.image[i], capabilities.maxCubemapSize);

            } else {

              cubeImage[i] = isDataTexture ? texture.image[i].image : texture.image[i];

            }

          }

          var image = cubeImage[0],
            isPowerOfTwoImage = isPowerOfTwo(image),
            glFormat = utils.convert(texture.format),
            glType = utils.convert(texture.type);

          setTextureParameters(_gl.TEXTURE_CUBE_MAP, texture, isPowerOfTwoImage);

          for (var i = 0; i < 6; i++) {

            if (!isCompressed) {

              if (isDataTexture) {

                state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glFormat, cubeImage[i].width, cubeImage[i].height, 0, glFormat, glType, cubeImage[i].data);

              } else {

                state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glFormat, glFormat, glType, cubeImage[i]);

              }

            } else {

              var mipmap, mipmaps = cubeImage[i].mipmaps;

              for (var j = 0, jl = mipmaps.length; j < jl; j++) {

                mipmap = mipmaps[j];

                if (texture.format !== RGBAFormat && texture.format !== RGBFormat) {

                  if (state.getCompressedTextureFormats().indexOf(glFormat) > -1) {

                    state.compressedTexImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, glFormat, mipmap.width, mipmap.height, 0, mipmap.data);

                  } else {

                    console.warn('THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()');

                  }

                } else {

                  state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, glFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data);

                }

              }

            }

          }

          if (!isCompressed) {

            textureProperties.__maxMipLevel = 0;

          } else {

            textureProperties.__maxMipLevel = mipmaps.length - 1;

          }

          if (textureNeedsGenerateMipmaps(texture, isPowerOfTwoImage)) {

            // We assume images for cube map have the same size.
            generateMipmap(_gl.TEXTURE_CUBE_MAP, texture, image.width, image.height);

          }

          textureProperties.__version = texture.version;

          if (texture.onUpdate) texture.onUpdate(texture);

        } else {

          state.activeTexture(_gl.TEXTURE0 + slot);
          state.bindTexture(_gl.TEXTURE_CUBE_MAP, textureProperties.__image__webglTextureCube);

        }

      }

    }

    function setTextureCubeDynamic(texture, slot) {

      state.activeTexture(_gl.TEXTURE0 + slot);
      state.bindTexture(_gl.TEXTURE_CUBE_MAP, properties.get(texture).__webglTexture);

    }

    function setTextureParameters(textureType, texture, isPowerOfTwoImage) {

      var extension;

      if (isPowerOfTwoImage) {

        _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_S, utils.convert(texture.wrapS));
        _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_T, utils.convert(texture.wrapT));

        _gl.texParameteri(textureType, _gl.TEXTURE_MAG_FILTER, utils.convert(texture.magFilter));
        _gl.texParameteri(textureType, _gl.TEXTURE_MIN_FILTER, utils.convert(texture.minFilter));

      } else {

        _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE);
        _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE);

        if (texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping) {

          console.warn('THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.', texture);

        }

        _gl.texParameteri(textureType, _gl.TEXTURE_MAG_FILTER, filterFallback(texture.magFilter));
        _gl.texParameteri(textureType, _gl.TEXTURE_MIN_FILTER, filterFallback(texture.minFilter));

        if (texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter) {

          console.warn('THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.', texture);

        }

      }

      extension = extensions.get('EXT_texture_filter_anisotropic');

      if (extension) {

        if (texture.type === FloatType && extensions.get('OES_texture_float_linear') === null) return;
        if (texture.type === HalfFloatType && extensions.get('OES_texture_half_float_linear') === null) return;

        if (texture.anisotropy > 1 || properties.get(texture).__currentAnisotropy) {

          _gl.texParameterf(textureType, extension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(texture.anisotropy, capabilities.getMaxAnisotropy()));
          properties.get(texture).__currentAnisotropy = texture.anisotropy;

        }

      }

    }

    function uploadTexture(textureProperties, texture, slot) {

      if (textureProperties.__webglInit === undefined) {

        textureProperties.__webglInit = true;

        texture.addEventListener('dispose', onTextureDispose);

        textureProperties.__webglTexture = _gl.createTexture();

        info.memory.textures++;

      }

      state.activeTexture(_gl.TEXTURE0 + slot);
      state.bindTexture(_gl.TEXTURE_2D, textureProperties.__webglTexture);

      _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
      _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha);
      _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, texture.unpackAlignment);

      var image = clampToMaxSize(texture.image, capabilities.maxTextureSize);

      if (textureNeedsPowerOfTwo(texture) && isPowerOfTwo(image) === false) {

        image = makePowerOfTwo(image);

      }

      var isPowerOfTwoImage = isPowerOfTwo(image),
        glFormat = utils.convert(texture.format),
        glType = utils.convert(texture.type);

      setTextureParameters(_gl.TEXTURE_2D, texture, isPowerOfTwoImage);

      var mipmap, mipmaps = texture.mipmaps;

      if (texture.isDepthTexture) {

        // populate depth texture with dummy data

        var internalFormat = _gl.DEPTH_COMPONENT;

        if (texture.type === FloatType) {

          if (!_isWebGL2) throw new Error('Float Depth Texture only supported in WebGL2.0');
          internalFormat = _gl.DEPTH_COMPONENT32F;

        } else if (_isWebGL2) {

          // WebGL 2.0 requires signed internalformat for glTexImage2D
          internalFormat = _gl.DEPTH_COMPONENT16;

        }

        if (texture.format === DepthFormat && internalFormat === _gl.DEPTH_COMPONENT) {

          // The error INVALID_OPERATION is generated by texImage2D if format and internalformat are
          // DEPTH_COMPONENT and type is not UNSIGNED_SHORT or UNSIGNED_INT
          // (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
          if (texture.type !== UnsignedShortType && texture.type !== UnsignedIntType) {

            console.warn('THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.');

            texture.type = UnsignedShortType;
            glType = utils.convert(texture.type);

          }

        }

        // Depth stencil textures need the DEPTH_STENCIL internal format
        // (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
        if (texture.format === DepthStencilFormat) {

          internalFormat = _gl.DEPTH_STENCIL;

          // The error INVALID_OPERATION is generated by texImage2D if format and internalformat are
          // DEPTH_STENCIL and type is not UNSIGNED_INT_24_8_WEBGL.
          // (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
          if (texture.type !== UnsignedInt248Type) {

            console.warn('THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.');

            texture.type = UnsignedInt248Type;
            glType = utils.convert(texture.type);

          }

        }

        state.texImage2D(_gl.TEXTURE_2D, 0, internalFormat, image.width, image.height, 0, glFormat, glType, null);

      } else if (texture.isDataTexture) {

        // use manually created mipmaps if available
        // if there are no manual mipmaps
        // set 0 level mipmap and then use GL to generate other mipmap levels

        if (mipmaps.length > 0 && isPowerOfTwoImage) {

          for (var i = 0, il = mipmaps.length; i < il; i++) {

            mipmap = mipmaps[i];
            state.texImage2D(_gl.TEXTURE_2D, i, glFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data);

          }

          texture.generateMipmaps = false;
          textureProperties.__maxMipLevel = mipmaps.length - 1;

        } else {

          state.texImage2D(_gl.TEXTURE_2D, 0, glFormat, image.width, image.height, 0, glFormat, glType, image.data);
          textureProperties.__maxMipLevel = 0;

        }

      } else if (texture.isCompressedTexture) {

        for (var i = 0, il = mipmaps.length; i < il; i++) {

          mipmap = mipmaps[i];

          if (texture.format !== RGBAFormat && texture.format !== RGBFormat) {

            if (state.getCompressedTextureFormats().indexOf(glFormat) > -1) {

              state.compressedTexImage2D(_gl.TEXTURE_2D, i, glFormat, mipmap.width, mipmap.height, 0, mipmap.data);

            } else {

              console.warn('THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()');

            }

          } else {

            state.texImage2D(_gl.TEXTURE_2D, i, glFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data);

          }

        }

        textureProperties.__maxMipLevel = mipmaps.length - 1;

      } else {

        // regular Texture (image, video, canvas)

        // use manually created mipmaps if available
        // if there are no manual mipmaps
        // set 0 level mipmap and then use GL to generate other mipmap levels

        if (mipmaps.length > 0 && isPowerOfTwoImage) {

          for (var i = 0, il = mipmaps.length; i < il; i++) {

            mipmap = mipmaps[i];
            state.texImage2D(_gl.TEXTURE_2D, i, glFormat, glFormat, glType, mipmap);

          }

          texture.generateMipmaps = false;
          textureProperties.__maxMipLevel = mipmaps.length - 1;

        } else {

          state.texImage2D(_gl.TEXTURE_2D, 0, glFormat, glFormat, glType, image);
          textureProperties.__maxMipLevel = 0;

        }

      }

      if (textureNeedsGenerateMipmaps(texture, isPowerOfTwoImage)) {

        generateMipmap(_gl.TEXTURE_2D, texture, image.width, image.height);

      }

      textureProperties.__version = texture.version;

      if (texture.onUpdate) texture.onUpdate(texture);

    }

    // Render targets

    // Setup storage for target texture and bind it to correct framebuffer
    function setupFrameBufferTexture(framebuffer, renderTarget, attachment, textureTarget) {

      var glFormat = utils.convert(renderTarget.texture.format);
      var glType = utils.convert(renderTarget.texture.type);
      state.texImage2D(textureTarget, 0, glFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null);
      _gl.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer);
      _gl.framebufferTexture2D(_gl.FRAMEBUFFER, attachment, textureTarget, properties.get(renderTarget.texture).__webglTexture, 0);
      _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);

    }

    // Setup storage for internal depth/stencil buffers and bind to correct framebuffer
    function setupRenderBufferStorage(renderbuffer, renderTarget) {

      _gl.bindRenderbuffer(_gl.RENDERBUFFER, renderbuffer);

      if (renderTarget.depthBuffer && !renderTarget.stencilBuffer) {

        _gl.renderbufferStorage(_gl.RENDERBUFFER, _gl.DEPTH_COMPONENT16, renderTarget.width, renderTarget.height);
        _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer);

      } else if (renderTarget.depthBuffer && renderTarget.stencilBuffer) {

        _gl.renderbufferStorage(_gl.RENDERBUFFER, _gl.DEPTH_STENCIL, renderTarget.width, renderTarget.height);
        _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer);

      } else {

        // FIXME: We don't support !depth !stencil
        _gl.renderbufferStorage(_gl.RENDERBUFFER, _gl.RGBA4, renderTarget.width, renderTarget.height);

      }

      _gl.bindRenderbuffer(_gl.RENDERBUFFER, null);

    }

    // Setup resources for a Depth Texture for a FBO (needs an extension)
    function setupDepthTexture(framebuffer, renderTarget) {

      var isCube = (renderTarget && renderTarget.isWebGLRenderTargetCube);
      if (isCube) throw new Error('Depth Texture with cube render targets is not supported');

      _gl.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer);

      if (!(renderTarget.depthTexture && renderTarget.depthTexture.isDepthTexture)) {

        throw new Error('renderTarget.depthTexture must be an instance of THREE.DepthTexture');

      }

      // upload an empty depth texture with framebuffer size
      if (!properties.get(renderTarget.depthTexture).__webglTexture ||
        renderTarget.depthTexture.image.width !== renderTarget.width ||
        renderTarget.depthTexture.image.height !== renderTarget.height) {

        renderTarget.depthTexture.image.width = renderTarget.width;
        renderTarget.depthTexture.image.height = renderTarget.height;
        renderTarget.depthTexture.needsUpdate = true;

      }

      setTexture2D(renderTarget.depthTexture, 0);

      var webglDepthTexture = properties.get(renderTarget.depthTexture).__webglTexture;

      if (renderTarget.depthTexture.format === DepthFormat) {

        _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.TEXTURE_2D, webglDepthTexture, 0);

      } else if (renderTarget.depthTexture.format === DepthStencilFormat) {

        _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.TEXTURE_2D, webglDepthTexture, 0);

      } else {

        throw new Error('Unknown depthTexture format');

      }

    }

    // Setup GL resources for a non-texture depth buffer
    function setupDepthRenderbuffer(renderTarget) {

      var renderTargetProperties = properties.get(renderTarget);

      var isCube = (renderTarget.isWebGLRenderTargetCube === true);

      if (renderTarget.depthTexture) {

        if (isCube) throw new Error('target.depthTexture not supported in Cube render targets');

        setupDepthTexture(renderTargetProperties.__webglFramebuffer, renderTarget);

      } else {

        if (isCube) {

          renderTargetProperties.__webglDepthbuffer = [];

          for (var i = 0; i < 6; i++) {

            _gl.bindFramebuffer(_gl.FRAMEBUFFER, renderTargetProperties.__webglFramebuffer[i]);
            renderTargetProperties.__webglDepthbuffer[i] = _gl.createRenderbuffer();
            setupRenderBufferStorage(renderTargetProperties.__webglDepthbuffer[i], renderTarget);

          }

        } else {

          _gl.bindFramebuffer(_gl.FRAMEBUFFER, renderTargetProperties.__webglFramebuffer);
          renderTargetProperties.__webglDepthbuffer = _gl.createRenderbuffer();
          setupRenderBufferStorage(renderTargetProperties.__webglDepthbuffer, renderTarget);

        }

      }

      _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);

    }

    // Set up GL resources for the render target
    function setupRenderTarget(renderTarget) {

      var renderTargetProperties = properties.get(renderTarget);
      var textureProperties = properties.get(renderTarget.texture);

      renderTarget.addEventListener('dispose', onRenderTargetDispose);

      textureProperties.__webglTexture = _gl.createTexture();

      info.memory.textures++;

      var isCube = (renderTarget.isWebGLRenderTargetCube === true);
      var isTargetPowerOfTwo = isPowerOfTwo(renderTarget);

      // Setup framebuffer

      if (isCube) {

        renderTargetProperties.__webglFramebuffer = [];

        for (var i = 0; i < 6; i++) {

          renderTargetProperties.__webglFramebuffer[i] = _gl.createFramebuffer();

        }

      } else {

        renderTargetProperties.__webglFramebuffer = _gl.createFramebuffer();

      }

      // Setup color buffer

      if (isCube) {

        state.bindTexture(_gl.TEXTURE_CUBE_MAP, textureProperties.__webglTexture);
        setTextureParameters(_gl.TEXTURE_CUBE_MAP, renderTarget.texture, isTargetPowerOfTwo);

        for (var i = 0; i < 6; i++) {

          setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer[i], renderTarget, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i);

        }

        if (textureNeedsGenerateMipmaps(renderTarget.texture, isTargetPowerOfTwo)) {

          generateMipmap(_gl.TEXTURE_CUBE_MAP, renderTarget.texture, renderTarget.width, renderTarget.height);

        }

        state.bindTexture(_gl.TEXTURE_CUBE_MAP, null);

      } else {

        state.bindTexture(_gl.TEXTURE_2D, textureProperties.__webglTexture);
        setTextureParameters(_gl.TEXTURE_2D, renderTarget.texture, isTargetPowerOfTwo);
        setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer, renderTarget, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D);

        if (textureNeedsGenerateMipmaps(renderTarget.texture, isTargetPowerOfTwo)) {

          generateMipmap(_gl.TEXTURE_2D, renderTarget.texture, renderTarget.width, renderTarget.height);

        }

        state.bindTexture(_gl.TEXTURE_2D, null);

      }

      // Setup depth and stencil buffers

      if (renderTarget.depthBuffer) {

        setupDepthRenderbuffer(renderTarget);

      }

    }

    function updateRenderTargetMipmap(renderTarget) {

      var texture = renderTarget.texture;
      var isTargetPowerOfTwo = isPowerOfTwo(renderTarget);

      if (textureNeedsGenerateMipmaps(texture, isTargetPowerOfTwo)) {

        var target = renderTarget.isWebGLRenderTargetCube ? _gl.TEXTURE_CUBE_MAP : _gl.TEXTURE_2D;
        var webglTexture = properties.get(texture).__webglTexture;

        state.bindTexture(target, webglTexture);
        generateMipmap(target, texture, renderTarget.width, renderTarget.height);
        state.bindTexture(target, null);

      }

    }

    function updateVideoTexture(texture) {

      var id = texture.id;
      var frame = info.render.frame;

      // Check the last frame we updated the VideoTexture

      if (_videoTextures[id] !== frame) {

        _videoTextures[id] = frame;
        texture.update();

      }

    }

    this.setTexture2D = setTexture2D;
    this.setTextureCube = setTextureCube;
    this.setTextureCubeDynamic = setTextureCubeDynamic;
    this.setupRenderTarget = setupRenderTarget;
    this.updateRenderTargetMipmap = updateRenderTargetMipmap;

  };

  function absNumericalSort(a, b) {

    return Math.abs(b[1]) - Math.abs(a[1]);

  }

  PGL.WebGLMorphtargets = function (gl) {

    var influencesList = {};
    var morphInfluences = new Float32Array(8);

    function update(object, geometry, material, program) {

      var objectInfluences = object.morphTargetInfluences;

      var length = objectInfluences.length;

      var influences = influencesList[geometry.id];

      if (influences === undefined) {

        // initialise list

        influences = [];

        for (var i = 0; i < length; i++) {

          influences[i] = [i, 0];

        }

        influencesList[geometry.id] = influences;

      }

      var morphTargets = material.morphTargets && geometry.morphAttributes.position;
      var morphNormals = material.morphNormals && geometry.morphAttributes.normal;

      // Remove current morphAttributes

      for (var i = 0; i < length; i++) {

        var influence = influences[i];

        if (influence[1] !== 0) {

          if (morphTargets) geometry.removeAttribute('morphTarget' + i);
          if (morphNormals) geometry.removeAttribute('morphNormal' + i);

        }

      }

      // Collect influences

      for (var i = 0; i < length; i++) {

        var influence = influences[i];

        influence[0] = i;
        influence[1] = objectInfluences[i];

      }

      influences.sort(absNumericalSort);

      // Add morphAttributes

      for (var i = 0; i < 8; i++) {

        var influence = influences[i];

        if (influence) {

          var index = influence[0];
          var value = influence[1];

          if (value) {

            if (morphTargets) geometry.addAttribute('morphTarget' + i, morphTargets[index]);
            if (morphNormals) geometry.addAttribute('morphNormal' + i, morphNormals[index]);

            morphInfluences[i] = value;
            continue;

          }

        }

        morphInfluences[i] = 0;

      }

      program.getUniforms().setValue(gl, 'morphTargetInfluences', morphInfluences);

    }

    return {

      update: update

    };

  };

  PGL.WebGLBufferRenderer = function (gl, extensions, info) {

    var mode;

    function setMode(value) {

      mode = value;

    }

    function render(start, count) {

      gl.drawArrays(mode, start, count);

      info.update(count, mode);

    }

    function renderInstances(geometry, start, count) {

      var extension = extensions.get('ANGLE_instanced_arrays');

      if (extension === null) {

        console.error('THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
        return;

      }

      extension.drawArraysInstancedANGLE(mode, start, count, geometry.maxInstancedCount);

      info.update(count, mode, geometry.maxInstancedCount);

    }

    //

    this.setMode = setMode;
    this.render = render;
    this.renderInstances = renderInstances;

  };

  PGL.WebGLIndexedBufferRenderer = function (gl, extensions, info) {

    var mode;

    function setMode(value) {

      mode = value;

    }

    var type, bytesPerElement;

    function setIndex(value) {

      type = value.type;
      bytesPerElement = value.bytesPerElement;

    }

    function render(start, count) {

      gl.drawElements(mode, count, type, start * bytesPerElement);

      info.update(count, mode);

    }

    function renderInstances(geometry, start, count) {

      var extension = extensions.get('ANGLE_instanced_arrays');

      if (extension === null) {

        console.error('THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
        return;

      }

      extension.drawElementsInstancedANGLE(mode, count, type, start * bytesPerElement, geometry.maxInstancedCount);

      info.update(count, mode, geometry.maxInstancedCount);

    }

    //

    this.setMode = setMode;
    this.setIndex = setIndex;
    this.render = render;
    this.renderInstances = renderInstances;

  };

  PGL.WebGLSpriteRenderer = function (renderer, gl, state, textures, capabilities) {

    var vertexBuffer, elementBuffer;
    var program, attributes, uniforms;

    var texture;

    // decompose matrixWorld

    var spritePosition = new PGL.Vector3();
    var spriteRotation = new PGL.Quaternion();
    var spriteScale = new PGL.Vector3();

    function init() {

      var vertices = new Float32Array([
        -0.5, -0.5, 0, 0,
        0.5, -0.5, 1, 0,
        0.5, 0.5, 1, 1,
        -0.5, 0.5, 0, 1
      ]);

      var faces = new Uint16Array([
        0, 1, 2,
        0, 2, 3
      ]);

      vertexBuffer = gl.createBuffer();
      elementBuffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, faces, gl.STATIC_DRAW);

      program = createProgram();

      attributes = {
        position: gl.getAttribLocation(program, 'position'),
        uv: gl.getAttribLocation(program, 'uv')
      };

      uniforms = {
        uvOffset: gl.getUniformLocation(program, 'uvOffset'),
        uvScale: gl.getUniformLocation(program, 'uvScale'),

        rotation: gl.getUniformLocation(program, 'rotation'),
        center: gl.getUniformLocation(program, 'center'),
        scale: gl.getUniformLocation(program, 'scale'),

        color: gl.getUniformLocation(program, 'color'),
        map: gl.getUniformLocation(program, 'map'),
        opacity: gl.getUniformLocation(program, 'opacity'),

        modelViewMatrix: gl.getUniformLocation(program, 'modelViewMatrix'),
        projectionMatrix: gl.getUniformLocation(program, 'projectionMatrix'),

        fogType: gl.getUniformLocation(program, 'fogType'),
        fogDensity: gl.getUniformLocation(program, 'fogDensity'),
        fogNear: gl.getUniformLocation(program, 'fogNear'),
        fogFar: gl.getUniformLocation(program, 'fogFar'),
        fogColor: gl.getUniformLocation(program, 'fogColor'),
        fogDepth: gl.getUniformLocation(program, 'fogDepth'),

        alphaTest: gl.getUniformLocation(program, 'alphaTest')
      };

      var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
      canvas.width = 8;
      canvas.height = 8;

      var context = canvas.getContext('2d');
      context.fillStyle = 'white';
      context.fillRect(0, 0, 8, 8);

      texture = new CanvasTexture(canvas);

    }

    this.render = function (sprites, scene, camera) {

      if (sprites.length === 0) return;

      // setup gl

      if (program === undefined) {

        init();

      }

      state.useProgram(program);

      state.initAttributes();
      state.enableAttribute(attributes.position);
      state.enableAttribute(attributes.uv);
      state.disableUnusedAttributes();

      state.disable(gl.CULL_FACE);
      state.enable(gl.BLEND);

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.vertexAttribPointer(attributes.position, 2, gl.FLOAT, false, 2 * 8, 0);
      gl.vertexAttribPointer(attributes.uv, 2, gl.FLOAT, false, 2 * 8, 8);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);

      gl.uniformMatrix4fv(uniforms.projectionMatrix, false, camera.projectionMatrix.elements);

      state.activeTexture(gl.TEXTURE0);
      gl.uniform1i(uniforms.map, 0);

      var oldFogType = 0;
      var sceneFogType = 0;
      var fog = scene.fog;

      if (fog) {

        gl.uniform3f(uniforms.fogColor, fog.color.r, fog.color.g, fog.color.b);

        if (fog.isFog) {

          gl.uniform1f(uniforms.fogNear, fog.near);
          gl.uniform1f(uniforms.fogFar, fog.far);

          gl.uniform1i(uniforms.fogType, 1);
          oldFogType = 1;
          sceneFogType = 1;

        } else if (fog.isFogExp2) {

          gl.uniform1f(uniforms.fogDensity, fog.density);

          gl.uniform1i(uniforms.fogType, 2);
          oldFogType = 2;
          sceneFogType = 2;

        }

      } else {

        gl.uniform1i(uniforms.fogType, 0);
        oldFogType = 0;
        sceneFogType = 0;

      }


      // update positions and sort

      for (var i = 0, l = sprites.length; i < l; i++) {

        var sprite = sprites[i];

        sprite.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, sprite.matrixWorld);
        sprite.z = -sprite.modelViewMatrix.elements[14];

      }

      sprites.sort(painterSortStable);

      // render all sprites

      var scale = [];
      var center = [];

      for (var i = 0, l = sprites.length; i < l; i++) {

        var sprite = sprites[i];
        var material = sprite.material;

        if (material.visible === false) continue;

        sprite.onBeforeRender(renderer, scene, camera, undefined, material, undefined);

        gl.uniform1f(uniforms.alphaTest, material.alphaTest);
        gl.uniformMatrix4fv(uniforms.modelViewMatrix, false, sprite.modelViewMatrix.elements);

        sprite.matrixWorld.decompose(spritePosition, spriteRotation, spriteScale);

        scale[0] = spriteScale.x;
        scale[1] = spriteScale.y;

        center[0] = sprite.center.x - 0.5;
        center[1] = sprite.center.y - 0.5;

        var fogType = 0;

        if (scene.fog && material.fog) {

          fogType = sceneFogType;

        }

        if (oldFogType !== fogType) {

          gl.uniform1i(uniforms.fogType, fogType);
          oldFogType = fogType;

        }

        if (material.map !== null) {

          gl.uniform2f(uniforms.uvOffset, material.map.offset.x, material.map.offset.y);
          gl.uniform2f(uniforms.uvScale, material.map.repeat.x, material.map.repeat.y);

        } else {

          gl.uniform2f(uniforms.uvOffset, 0, 0);
          gl.uniform2f(uniforms.uvScale, 1, 1);

        }

        gl.uniform1f(uniforms.opacity, material.opacity);
        gl.uniform3f(uniforms.color, material.color.r, material.color.g, material.color.b);

        gl.uniform1f(uniforms.rotation, material.rotation);
        gl.uniform2fv(uniforms.center, center);
        gl.uniform2fv(uniforms.scale, scale);

        state.setBlending(material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha);
        state.buffers.depth.setTest(material.depthTest);
        state.buffers.depth.setMask(material.depthWrite);
        state.buffers.color.setMask(material.colorWrite);

        textures.setTexture2D(material.map || texture, 0);

        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

        sprite.onAfterRender(renderer, scene, camera, undefined, material, undefined);

      }

      // restore gl

      state.enable(gl.CULL_FACE);

      state.reset();

    };

    function createProgram() {

      var program = gl.createProgram();

      var vertexShader = gl.createShader(gl.VERTEX_SHADER);
      var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

      gl.shaderSource(vertexShader, [

        'precision ' + capabilities.precision + ' float;',

        '#define SHADER_NAME ' + 'SpriteMaterial',

        'uniform mat4 modelViewMatrix;',
        'uniform mat4 projectionMatrix;',
        'uniform float rotation;',
        'uniform vec2 center;',
        'uniform vec2 scale;',
        'uniform vec2 uvOffset;',
        'uniform vec2 uvScale;',

        'attribute vec2 position;',
        'attribute vec2 uv;',

        'varying vec2 vUV;',
        'varying float fogDepth;',

        'void main() {',

        '	vUV = uvOffset + uv * uvScale;',

        '	vec2 alignedPosition = ( position - center ) * scale;',

        '	vec2 rotatedPosition;',
        '	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;',
        '	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;',

        '	vec4 mvPosition;',

        '	mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );',
        '	mvPosition.xy += rotatedPosition;',

        '	gl_Position = projectionMatrix * mvPosition;',

        '	fogDepth = - mvPosition.z;',

        '}'

      ].join('\n'));

      gl.shaderSource(fragmentShader, [

        'precision ' + capabilities.precision + ' float;',

        '#define SHADER_NAME ' + 'SpriteMaterial',

        'uniform vec3 color;',
        'uniform sampler2D map;',
        'uniform float opacity;',

        'uniform int fogType;',
        'uniform vec3 fogColor;',
        'uniform float fogDensity;',
        'uniform float fogNear;',
        'uniform float fogFar;',
        'uniform float alphaTest;',

        'varying vec2 vUV;',
        'varying float fogDepth;',

        'void main() {',

        '	vec4 texture = texture2D( map, vUV );',

        '	gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );',

        '	if ( gl_FragColor.a < alphaTest ) discard;',

        '	if ( fogType > 0 ) {',

        '		float fogFactor = 0.0;',

        '		if ( fogType == 1 ) {',

        '			fogFactor = smoothstep( fogNear, fogFar, fogDepth );',

        '		} else {',

        '			const float LOG2 = 1.442695;',
        '			fogFactor = exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 );',
        '			fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );',

        '		}',

        '		gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );',

        '	}',

        '}'

      ].join('\n'));

      gl.compileShader(vertexShader);
      gl.compileShader(fragmentShader);

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);

      gl.linkProgram(program);

      return program;

    }

    function painterSortStable(a, b) {

      if (a.renderOrder !== b.renderOrder) {

        return a.renderOrder - b.renderOrder;

      } else if (a.z !== b.z) {

        return b.z - a.z;

      } else {

        return b.id - a.id;

      }

    }

  };

  PGL.WebVRManager = function (renderer) {

    var scope = this;

    var device = null;
    var frameData = null;

    var poseTarget = null;

    var controllers = [];
    var standingMatrix = new PGL.Matrix4();
    var standingMatrixInverse = new PGL.Matrix4();

    if (typeof window !== 'undefined' && 'VRFrameData' in window) {

      frameData = new window.VRFrameData();
      window.addEventListener('vrdisplaypresentchange', onVRDisplayPresentChange, false);

    }

    var matrixWorldInverse = new PGL.Matrix4();
    var tempQuaternion = new PGL.Quaternion();
    var tempPosition = new PGL.Vector3();

    // var cameraL = new PerspectiveCamera();
    // cameraL.bounds = new Vector4(0.0, 0.0, 0.5, 1.0);
    // cameraL.layers.enable(1);
    //
    // var cameraR = new PerspectiveCamera();
    // cameraR.bounds = new Vector4(0.5, 0.0, 0.5, 1.0);
    // cameraR.layers.enable(2);
    //
    // var cameraVR = new ArrayCamera([cameraL, cameraR]);
    // cameraVR.layers.enable(1);
    // cameraVR.layers.enable(2);

    //

    function isPresenting() {
      return device !== null && device.isPresenting === true;
    }

    var currentSize, currentPixelRatio;

    function onVRDisplayPresentChange() {

      if (isPresenting()) {

        var eyeParameters = device.getEyeParameters('left');
        var renderWidth = eyeParameters.renderWidth;
        var renderHeight = eyeParameters.renderHeight;

        currentPixelRatio = renderer.getPixelRatio();
        currentSize = renderer.getSize();

        renderer.setDrawingBufferSize(renderWidth * 2, renderHeight, 1);

        animation.start();

      } else if (scope.enabled) {

        renderer.setDrawingBufferSize(currentSize.width, currentSize.height, currentPixelRatio);

        animation.stop();

      }

    }

    //

    var isTriggerPressed = false;

    function findGamepad(id) {

      var gamepads = navigator.getGamepads && navigator.getGamepads();

      for (var i = 0, j = 0, l = gamepads.length; i < l; i++) {

        var gamepad = gamepads[i];

        if (gamepad && (gamepad.id === 'Daydream Controller' ||
            gamepad.id === 'Gear VR Controller' || gamepad.id === 'Oculus Go Controller' ||
            gamepad.id === 'OpenVR Gamepad' || gamepad.id.startsWith('Oculus Touch') ||
            gamepad.id.startsWith('Spatial Controller'))) {

          if (j === id) return gamepad;

          j++;

        }

      }

    }

    function updateControllers() {

      for (var i = 0; i < controllers.length; i++) {

        var controller = controllers[i];

        var gamepad = findGamepad(i);

        if (gamepad !== undefined && gamepad.pose !== undefined) {

          if (gamepad.pose === null) return;

          //  Pose

          var pose = gamepad.pose;

          if (pose.hasPosition === false) controller.position.set(0.2, -0.6, -0.05);

          if (pose.position !== null) controller.position.fromArray(pose.position);
          if (pose.orientation !== null) controller.quaternion.fromArray(pose.orientation);
          controller.matrix.compose(controller.position, controller.quaternion, controller.scale);
          controller.matrix.premultiply(standingMatrix);
          controller.matrix.decompose(controller.position, controller.quaternion, controller.scale);
          controller.matrixWorldNeedsUpdate = true;
          controller.visible = true;

          //  Trigger

          var buttonId = gamepad.id === 'Daydream Controller' ? 0 : 1;

          if (isTriggerPressed !== gamepad.buttons[buttonId].pressed) {

            isTriggerPressed = gamepad.buttons[buttonId].pressed;

            if (isTriggerPressed) {

              controller.dispatchEvent({type: 'selectstart'});

            } else {

              controller.dispatchEvent({type: 'selectend'});
              controller.dispatchEvent({type: 'select'});

            }

          }

        } else {

          controller.visible = false;

        }

      }

    }

    //

    this.enabled = false;
    this.userHeight = 1.6;

    this.getController = function (id) {

      var controller = controllers[id];

      if (controller === undefined) {

        controller = new Group();
        controller.matrixAutoUpdate = false;
        controller.visible = false;

        controllers[id] = controller;

      }

      return controller;

    };

    this.getDevice = function () {

      return device;

    };

    this.setDevice = function (value) {

      if (value !== undefined) device = value;

      animation.setContext(value);

    };

    this.setPoseTarget = function (object) {

      if (object !== undefined) poseTarget = object;

    };

    this.getCamera = function (camera) {

      if (device === null) {

        camera.position.set(0, scope.userHeight, 0);
        return camera;

      }

      device.depthNear = camera.near;
      device.depthFar = camera.far;

      device.getFrameData(frameData);

      //

      var stageParameters = device.stageParameters;

      if (stageParameters) {

        standingMatrix.fromArray(stageParameters.sittingToStandingTransform);

      } else {

        standingMatrix.makeTranslation(0, scope.userHeight, 0);

      }


      var pose = frameData.pose;
      var poseObject = poseTarget !== null ? poseTarget : camera;

      // We want to manipulate poseObject by its position and quaternion components since users may rely on them.
      poseObject.matrix.copy(standingMatrix);
      poseObject.matrix.decompose(poseObject.position, poseObject.quaternion, poseObject.scale);

      if (pose.orientation !== null) {

        tempQuaternion.fromArray(pose.orientation);
        poseObject.quaternion.multiply(tempQuaternion);

      }

      if (pose.position !== null) {

        tempQuaternion.setFromRotationMatrix(standingMatrix);
        tempPosition.fromArray(pose.position);
        tempPosition.applyQuaternion(tempQuaternion);
        poseObject.position.add(tempPosition);

      }

      poseObject.updateMatrixWorld();

      if (device.isPresenting === false) return camera;

      //

      cameraL.near = camera.near;
      cameraR.near = camera.near;

      cameraL.far = camera.far;
      cameraR.far = camera.far;

      cameraVR.matrixWorld.copy(camera.matrixWorld);
      cameraVR.matrixWorldInverse.copy(camera.matrixWorldInverse);

      cameraL.matrixWorldInverse.fromArray(frameData.leftViewMatrix);
      cameraR.matrixWorldInverse.fromArray(frameData.rightViewMatrix);

      // TODO (mrdoob) Double check this code

      standingMatrixInverse.getInverse(standingMatrix);

      cameraL.matrixWorldInverse.multiply(standingMatrixInverse);
      cameraR.matrixWorldInverse.multiply(standingMatrixInverse);

      var parent = poseObject.parent;

      if (parent !== null) {

        matrixWorldInverse.getInverse(parent.matrixWorld);

        cameraL.matrixWorldInverse.multiply(matrixWorldInverse);
        cameraR.matrixWorldInverse.multiply(matrixWorldInverse);

      }

      // envMap and Mirror needs camera.matrixWorld

      cameraL.matrixWorld.getInverse(cameraL.matrixWorldInverse);
      cameraR.matrixWorld.getInverse(cameraR.matrixWorldInverse);

      cameraL.projectionMatrix.fromArray(frameData.leftProjectionMatrix);
      cameraR.projectionMatrix.fromArray(frameData.rightProjectionMatrix);

      // HACK (mrdoob)
      // https://github.com/w3c/webvr/issues/203

      cameraVR.projectionMatrix.copy(cameraL.projectionMatrix);

      //

      var layers = device.getLayers();

      if (layers.length) {

        var layer = layers[0];

        if (layer.leftBounds !== null && layer.leftBounds.length === 4) {

          cameraL.bounds.fromArray(layer.leftBounds);

        }

        if (layer.rightBounds !== null && layer.rightBounds.length === 4) {

          cameraR.bounds.fromArray(layer.rightBounds);

        }

      }

      updateControllers();

      return cameraVR;

    };

    this.getStandingMatrix = function () {

      return standingMatrix;

    };

    this.isPresenting = isPresenting;

    // Animation Loop

    // var animation = new WebGLAnimation();

    this.setAnimationLoop = function (callback) {

      animation.setAnimationLoop(callback);

    };

    this.submitFrame = function () {

      if (isPresenting()) device.submitFrame();

    };

    this.dispose = function () {

      if (typeof window !== 'undefined') {

        window.removeEventListener('vrdisplaypresentchange', onVRDisplayPresentChange);

      }

    };

  };

  PGL.WebXRManager = function (renderer) {

    var gl = renderer.context;

    var device = null;
    var session = null;

    var frameOfRef = null;

    var pose = null;

    var controllers = [];
    var inputSources = [];

    function isPresenting() {
      return session !== null && frameOfRef !== null;
    }

    //

    var cameraL = new PerspectiveCamera();
    cameraL.layers.enable(1);
    cameraL.viewport = new Vector4();

    var cameraR = new PerspectiveCamera();
    cameraR.layers.enable(2);
    cameraR.viewport = new Vector4();

    var cameraVR = new ArrayCamera([cameraL, cameraR]);
    cameraVR.layers.enable(1);
    cameraVR.layers.enable(2);

    //

    this.enabled = false;

    this.getController = function (id) {

      var controller = controllers[id];

      if (controller === undefined) {

        controller = new Group();
        controller.matrixAutoUpdate = false;
        controller.visible = false;

        controllers[id] = controller;

      }

      return controller;

    };

    this.getDevice = function () {

      return device;

    };

    this.setDevice = function (value) {

      if (value !== undefined) device = value;

      gl.setCompatibleXRDevice(value);

    };

    //

    function onSessionEvent(event) {

      var controller = controllers[inputSources.indexOf(event.inputSource)];
      if (controller) controller.dispatchEvent({type: event.type});

    }

    function onSessionEnd() {

      renderer.setFramebuffer(null);
      animation.stop();

    }

    this.setSession = function (value, options) {

      session = value;

      if (session !== null) {

        session.addEventListener('select', onSessionEvent);
        session.addEventListener('selectstart', onSessionEvent);
        session.addEventListener('selectend', onSessionEvent);
        session.addEventListener('end', onSessionEnd);

        session.baseLayer = new XRWebGLLayer(session, gl);
        session.requestFrameOfReference(options.frameOfReferenceType).then(function (value) {

          frameOfRef = value;

          renderer.setFramebuffer(session.baseLayer.framebuffer);

          animation.setContext(session);
          animation.start();

        });

        //

        inputSources = session.getInputSources();

        session.addEventListener('inputsourceschange', function () {

          inputSources = session.getInputSources();
          console.log(inputSources);

        });

      }

    };

    function updateCamera(camera, parent) {

      if (parent === null) {

        camera.matrixWorld.copy(camera.matrix);

      } else {

        camera.matrixWorld.multiplyMatrices(parent.matrixWorld, camera.matrix);

      }

      camera.matrixWorldInverse.getInverse(camera.matrixWorld);

    }

    this.getCamera = function (camera) {

      if (isPresenting()) {

        var parent = camera.parent;
        var cameras = cameraVR.cameras;

        // apply camera.parent to cameraVR

        updateCamera(cameraVR, parent);

        for (var i = 0; i < cameras.length; i++) {

          updateCamera(cameras[i], parent);

        }

        // update camera and its children

        camera.matrixWorld.copy(cameraVR.matrixWorld);

        var children = camera.children;

        for (var i = 0, l = children.length; i < l; i++) {

          children[i].updateMatrixWorld(true);

        }

        return cameraVR;

      }

      return camera;

    };

    this.isPresenting = isPresenting;

    // Animation Loop

    var onAnimationFrameCallback = null;

    function onAnimationFrame(time, frame) {

      pose = frame.getDevicePose(frameOfRef);

      if (pose !== null) {

        var layer = session.baseLayer;
        var views = frame.views;

        for (var i = 0; i < views.length; i++) {

          var view = views[i];
          var viewport = layer.getViewport(view);
          var viewMatrix = pose.getViewMatrix(view);

          var camera = cameraVR.cameras[i];
          camera.matrix.fromArray(viewMatrix).getInverse(camera.matrix);
          camera.projectionMatrix.fromArray(view.projectionMatrix);
          camera.viewport.set(viewport.x, viewport.y, viewport.width, viewport.height);

          if (i === 0) {

            cameraVR.matrix.copy(camera.matrix);

            // HACK (mrdoob)
            // https://github.com/w3c/webvr/issues/203

            cameraVR.projectionMatrix.copy(camera.projectionMatrix);

          }

        }

      }

      //

      for (var i = 0; i < controllers.length; i++) {

        var controller = controllers[i];

        var inputSource = inputSources[i];

        if (inputSource) {

          var inputPose = frame.getInputPose(inputSource, frameOfRef);

          if (inputPose !== null) {

            controller.matrix.elements = inputPose.pointerMatrix;
            controller.matrix.decompose(controller.position, controller.rotation, controller.scale);
            controller.visible = true;

            continue;

          }

        }

        controller.visible = false;

      }

      if (onAnimationFrameCallback) onAnimationFrameCallback(time);

    }

    var animation = new WebGLAnimation();
    animation.setAnimationLoop(onAnimationFrame);

    this.setAnimationLoop = function (callback) {

      onAnimationFrameCallback = callback;

    };

    this.dispose = function () {
    };

    // DEPRECATED

    this.getStandingMatrix = function () {

      console.warn('THREE.WebXRManager: getStandingMatrix() is no longer needed.');
      return new THREE.Matrix4();

    };

    this.submitFrame = function () {
    };

  };

  /**
   *
   * @param _renderer 上下文
   * @param _objects
   * @param maxTextureSize 纹理的最大尺寸
   * @constructor
   */
  PGL.WebGLShadowMap = function (_renderer, _objects, maxTextureSize) {

    var _frustum = new PGL.Frustum(),
      _projScreenMatrix = new PGL.Matrix4(),

      _shadowMapSize = new PGL.Vector2(),
      _maxShadowMapSize = new PGL.Vector2(maxTextureSize, maxTextureSize), // 最大阴影范围

      _lookTarget = new PGL.Vector3(),
      _lightPositionWorld = new PGL.Vector3(),

      _MorphingFlag = 1,
      _SkinningFlag = 2,

      _NumberOfMaterialVariants = (_MorphingFlag | _SkinningFlag) + 1,

      _depthMaterials = new Array(_NumberOfMaterialVariants),
      _distanceMaterials = new Array(_NumberOfMaterialVariants),

      _materialCache = {};

    var shadowSide = {0: PGL.BackSide, 1: PGL.FrontSide, 2: PGL.DoubleSide};

    var cubeDirections = [
      new PGL.Vector3(1, 0, 0), new PGL.Vector3(-1, 0, 0), new PGL.Vector3(0, 0, 1),
      new PGL.Vector3(0, 0, -1), new PGL.Vector3(0, 1, 0), new PGL.Vector3(0, -1, 0)
    ];

    var cubeUps = [
      new PGL.Vector3(0, 1, 0), new PGL.Vector3(0, 1, 0), new PGL.Vector3(0, 1, 0),
      new PGL.Vector3(0, 1, 0), new PGL.Vector3(0, 0, 1), new PGL.Vector3(0, 0, -1)
    ];

    var cube2DViewPorts = [
      new PGL.Vector4(), new PGL.Vector4(), new PGL.Vector4(),
      new PGL.Vector4(), new PGL.Vector4(), new PGL.Vector4()
    ];

    // init

    for (var i = 0; i !== _NumberOfMaterialVariants; ++i) {

      var useMorphing = (i & _MorphingFlag) !== 0;
      var useSkinning = (i & _SkinningFlag) !== 0;

      var depthMaterial = new PGL.MeshDepthMaterial({
        depthPacking: PGL.RGBADepthPacking,

        morphTargets: useMorphing,
        skinning: useSkinning
      });

      _depthMaterials[i] = depthMaterial;

      //

      var distanceMaterial = new PGL.MeshDistanceMaterial({

        morphTargets: useMorphing,
        skinning: useSkinning

      });

      _distanceMaterials[i] = distanceMaterial;

    }

    //

    var scope = this;

    this.enabled = false;

    this.autoUpdate = true;
    this.needsUpdate = false;

    this.type = PGL.PCFShadowMap;

    this.render = function (lights, scene, camera) {

      if (scope.enabled === false) return;
      if (scope.autoUpdate === false && scope.needsUpdate === false) return;

      if (lights.length === 0) return;

      // TODO Clean up (needed in case of contextlost)
      var _gl = _renderer.context;
      var _state = _renderer.state;

      // Set GL state for depth map.
      _state.disable(_gl.BLEND);
      _state.buffers.color.setClear(1, 1, 1, 1);
      _state.buffers.depth.setTest(true);
      _state.setScissorTest(false);

      // render depth map

      var faceCount;

      for (var i = 0, il = lights.length; i < il; i++) {

        var light = lights[i];
        var shadow = light.shadow;
        var isPointLight = light && light.isPointLight;

        if (shadow === undefined) {

          console.warn('THREE.WebGLShadowMap:', light, 'has no shadow.');
          continue;

        }

        var shadowCamera = shadow.camera;

        _shadowMapSize.copy(shadow.mapSize);
        _shadowMapSize.min(_maxShadowMapSize);

        if (isPointLight) {

          var vpWidth = _shadowMapSize.x;
          var vpHeight = _shadowMapSize.y;

          // These viewports map a cube-map onto a 2D texture with the
          // following orientation:
          //
          //  xzXZ
          //   y Y
          //
          // X - Positive x direction
          // x - Negative x direction
          // Y - Positive y direction
          // y - Negative y direction
          // Z - Positive z direction
          // z - Negative z direction

          // positive X
          cube2DViewPorts[0].set(vpWidth * 2, vpHeight, vpWidth, vpHeight);
          // negative X
          cube2DViewPorts[1].set(0, vpHeight, vpWidth, vpHeight);
          // positive Z
          cube2DViewPorts[2].set(vpWidth * 3, vpHeight, vpWidth, vpHeight);
          // negative Z
          cube2DViewPorts[3].set(vpWidth, vpHeight, vpWidth, vpHeight);
          // positive Y
          cube2DViewPorts[4].set(vpWidth * 3, 0, vpWidth, vpHeight);
          // negative Y
          cube2DViewPorts[5].set(vpWidth, 0, vpWidth, vpHeight);

          _shadowMapSize.x *= 4.0;
          _shadowMapSize.y *= 2.0;

        }

        if (shadow.map === null) {

          var pars = {minFilter: NearestFilter, magFilter: NearestFilter, format: RGBAFormat};

          shadow.map = new WebGLRenderTarget(_shadowMapSize.x, _shadowMapSize.y, pars);
          shadow.map.texture.name = light.name + ".shadowMap";

          shadowCamera.updateProjectionMatrix();

        }

        if (shadow.isSpotLightShadow) {

          shadow.update(light);

        }

        var shadowMap = shadow.map;
        var shadowMatrix = shadow.matrix;

        _lightPositionWorld.setFromMatrixPosition(light.matrixWorld);
        shadowCamera.position.copy(_lightPositionWorld);

        if (isPointLight) {

          faceCount = 6;

          // for point lights we set the shadow matrix to be a translation-only matrix
          // equal to inverse of the light's position

          shadowMatrix.makeTranslation(-_lightPositionWorld.x, -_lightPositionWorld.y, -_lightPositionWorld.z);

        } else {

          faceCount = 1;

          _lookTarget.setFromMatrixPosition(light.target.matrixWorld);
          shadowCamera.lookAt(_lookTarget);
          shadowCamera.updateMatrixWorld();

          // compute shadow matrix

          shadowMatrix.set(
            0.5, 0.0, 0.0, 0.5,
            0.0, 0.5, 0.0, 0.5,
            0.0, 0.0, 0.5, 0.5,
            0.0, 0.0, 0.0, 1.0
          );

          shadowMatrix.multiply(shadowCamera.projectionMatrix);
          shadowMatrix.multiply(shadowCamera.matrixWorldInverse);

        }

        _renderer.setRenderTarget(shadowMap);
        _renderer.clear();

        // render shadow map for each cube face (if omni-directional) or
        // run a single pass if not

        for (var face = 0; face < faceCount; face++) {

          if (isPointLight) {

            _lookTarget.copy(shadowCamera.position);
            _lookTarget.add(cubeDirections[face]);
            shadowCamera.up.copy(cubeUps[face]);
            shadowCamera.lookAt(_lookTarget);
            shadowCamera.updateMatrixWorld();

            var vpDimensions = cube2DViewPorts[face];
            _state.viewport(vpDimensions);

          }

          // update camera matrices and frustum

          _projScreenMatrix.multiplyMatrices(shadowCamera.projectionMatrix, shadowCamera.matrixWorldInverse);
          _frustum.setFromMatrix(_projScreenMatrix);

          // set object matrices & frustum culling

          renderObject(scene, camera, shadowCamera, isPointLight);

        }

      }

      scope.needsUpdate = false;

    };

    function getDepthMaterial(object, material, isPointLight, lightPositionWorld, shadowCameraNear, shadowCameraFar) {

      var geometry = object.geometry;

      var result = null;

      var materialVariants = _depthMaterials;
      var customMaterial = object.customDepthMaterial;

      if (isPointLight) {

        materialVariants = _distanceMaterials;
        customMaterial = object.customDistanceMaterial;

      }

      if (!customMaterial) {

        var useMorphing = false;

        if (material.morphTargets) {

          if (geometry && geometry.isBufferGeometry) {

            useMorphing = geometry.morphAttributes && geometry.morphAttributes.position && geometry.morphAttributes.position.length > 0;

          } else if (geometry && geometry.isGeometry) {

            useMorphing = geometry.morphTargets && geometry.morphTargets.length > 0;

          }

        }

        if (object.isSkinnedMesh && material.skinning === false) {

          console.warn('THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:', object);

        }

        var useSkinning = object.isSkinnedMesh && material.skinning;

        var variantIndex = 0;

        if (useMorphing) variantIndex |= _MorphingFlag;
        if (useSkinning) variantIndex |= _SkinningFlag;

        result = materialVariants[variantIndex];

      } else {

        result = customMaterial;

      }

      if (_renderer.localClippingEnabled &&
        material.clipShadows === true &&
        material.clippingPlanes.length !== 0) {

        // in this case we need a unique material instance reflecting the
        // appropriate state

        var keyA = result.uuid, keyB = material.uuid;

        var materialsForVariant = _materialCache[keyA];

        if (materialsForVariant === undefined) {

          materialsForVariant = {};
          _materialCache[keyA] = materialsForVariant;

        }

        var cachedMaterial = materialsForVariant[keyB];

        if (cachedMaterial === undefined) {

          cachedMaterial = result.clone();
          materialsForVariant[keyB] = cachedMaterial;

        }

        result = cachedMaterial;

      }

      result.visible = material.visible;
      result.wireframe = material.wireframe;

      result.side = (material.shadowSide != null) ? material.shadowSide : shadowSide[material.side];

      result.clipShadows = material.clipShadows;
      result.clippingPlanes = material.clippingPlanes;
      result.clipIntersection = material.clipIntersection;

      result.wireframeLinewidth = material.wireframeLinewidth;
      result.linewidth = material.linewidth;

      if (isPointLight && result.isMeshDistanceMaterial) {

        result.referencePosition.copy(lightPositionWorld);
        result.nearDistance = shadowCameraNear;
        result.farDistance = shadowCameraFar;

      }

      return result;

    }

    function renderObject(object, camera, shadowCamera, isPointLight) {

      if (object.visible === false) return;

      var visible = object.layers.test(camera.layers);

      if (visible && (object.isMesh || object.isLine || object.isPoints)) {

        if (object.castShadow && (!object.frustumCulled || _frustum.intersectsObject(object))) {

          object.modelViewMatrix.multiplyMatrices(shadowCamera.matrixWorldInverse, object.matrixWorld);

          var geometry = _objects.update(object);
          var material = object.material;

          if (Array.isArray(material)) {

            var groups = geometry.groups;

            for (var k = 0, kl = groups.length; k < kl; k++) {

              var group = groups[k];
              var groupMaterial = material[group.materialIndex];

              if (groupMaterial && groupMaterial.visible) {

                var depthMaterial = getDepthMaterial(object, groupMaterial, isPointLight, _lightPositionWorld, shadowCamera.near, shadowCamera.far);
                _renderer.renderBufferDirect(shadowCamera, null, geometry, depthMaterial, object, group);

              }

            }

          } else if (material.visible) {

            var depthMaterial = getDepthMaterial(object, material, isPointLight, _lightPositionWorld, shadowCamera.near, shadowCamera.far);
            _renderer.renderBufferDirect(shadowCamera, null, geometry, depthMaterial, object, null);

          }

        }

      }

      var children = object.children;

      for (var i = 0, l = children.length; i < l; i++) {

        renderObject(children[i], camera, shadowCamera, isPointLight);

      }

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

    this._context = parameters.context !== undefined ? parameters.context : null;

    var _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas'),
      _alpha = parameters.alpha !== undefined ? parameters.alpha : false,
      _depth = parameters.depth !== undefined ? parameters.depth : true,
      _stencil = parameters.stencil !== undefined ? parameters.stencil : true,
      _antialias = parameters.antialias !== undefined ? parameters.antialias : false,
      _premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
      _preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false,
      _powerPreference = parameters.powerPreference !== undefined ? parameters.powerPreference : 'default';

    this._canvas = _canvas;

    var currentRenderList = null;
    var currentRenderState = null;

    // public properties
    this.domElement = this._canvas;
    this.context = null;

    // clearing 清空缓存区参数
    this.autoClear = true; // 设置是否清空颜色，深度，Stencil
    this.autoClearColor = true;
    this.autoClearDepth = true;
    this.autoClearStencil = true;

    // scene graph
    this.sortObjects = true;

    // user-defined clipping
    this.clippingPlanes = [];
    this.localClippingEnabled = false;

    // physically based shading
    this.gammaFactor = 2.0;	// for backwards compatibility
    this.gammaInput = false;
    this.gammaOutput = false;

    // physical lights
    this.physicallyCorrectLights = false;

    // tone mapping
    this.toneMapping = PGL.LinearToneMapping;
    this.toneMappingExposure = 1.0;
    this.toneMappingWhitePoint = 1.0;

    // morphs
    this.maxMorphTargets = 8;
    this.maxMorphNormals = 4;

    // internal properties

    // internal properties
    var _this = this,

      _isContextLost = false, // 标记是否丢失上下文

      // internal state cache

      _framebuffer = null,

      _currentRenderTarget = null,
      _currentFramebuffer = null,
      _currentMaterialId = -1,
      _currentGeometryProgram = '',

      _currentCamera = null,
      _currentArrayCamera = null, // 标记当前是否是多个相机

      _currentViewport = new PGL.Vector4(),
      _currentScissor = new PGL.Vector4(),
      _currentScissorTest = null,

      _usedTextureUnits = 0,

      // canvas 的长宽
      _width = this._canvas.width,
      _height = this._canvas.height,

      _pixelRatio = 1, // 像素比率

      _viewport = new PGL.Vector4(0, 0, _width, _height), // 设置绘图区域
      _scissor = new PGL.Vector4(0, 0, _width, _height),
      _scissorTest = false,

      // frustum
      _frustum = new PGL.Frustum(),

      // clipping
      _clipping = new PGL.WebGLClipping(),
      _clippingEnabled = false,
      _localClippingEnabled = false,

      // camera matrices cache

      _projScreenMatrix = new PGL.Matrix4(),

      _vector3 = new PGL.Vector3();

    // 获取上下文
    var _gl = this.getWebGLContext();

    var extensions, capabilities, state, info;
    var properties, textures, attributes, geometries, objects;
    var programCache, renderLists, renderStates;

    var background, morphtargets, bufferRenderer, indexedBufferRenderer;
    var spriteRenderer;

    var utils;

    /**
     * 初始化WebGL的一些方法
     */
    function initGLContext() {
      // 提前获取WebGL的扩展对象，并保存
      extensions = new PGL.WebGLExtensions(_gl);
      extensions.get('WEBGL_depth_texture');
      extensions.get('OES_texture_float');
      extensions.get('OES_texture_float_linear');
      extensions.get('OES_texture_half_float');
      extensions.get('OES_texture_half_float_linear');
      extensions.get('OES_standard_derivatives');
      extensions.get('OES_element_index_uint');
      extensions.get('ANGLE_instanced_arrays');

      // 对象中的转换函数
      utils = new PGL.WebGLUtils(_gl, extensions);

      // 获取当前WebGL的能力
      capabilities = new PGL.WebGLCapabilities(_gl, extensions, parameters);

      // 初始化管理状态
      state = new PGL.WebGLState(_gl, extensions, utils);
      state.scissor(_currentScissor.copy(_scissor).multiplyScalar(_pixelRatio)); // 设置裁剪区域
      state.viewport(_currentViewport.copy(_viewport).multiplyScalar(_pixelRatio)); // 设置绘图区域

      info = new PGL.WebGLInfo(_gl);
      properties = new PGL.WebGLProperties();
      textures = new PGL.WebGLTextures(_gl, extensions, state, properties, capabilities, utils, info);
      attributes = new PGL.WebGLAttributes(_gl);
      geometries = new PGL.WebGLGeometries(_gl, attributes, info);
      objects = new PGL.WebGLObjects(geometries, info);
      morphtargets = new PGL.WebGLMorphtargets(_gl);
      programCache = new PGL.WebGLPrograms(_this, extensions, capabilities);
      renderLists = new PGL.WebGLRenderLists();
      renderStates = new PGL.WebGLRenderStates();

      background = new PGL.WebGLBackground(_this, state, objects, _premultipliedAlpha); // 初始化背景控制

      bufferRenderer = new PGL.WebGLBufferRenderer(_gl, extensions, info);
      indexedBufferRenderer = new PGL.WebGLIndexedBufferRenderer(_gl, extensions, info);

      spriteRenderer = new PGL.WebGLSpriteRenderer(_this, _gl, state, textures, capabilities);

      info.programs = programCache.programs;

      _this.context = _gl;
      _this.capabilities = capabilities;
      _this.extensions = extensions;
      _this.properties = properties;
      _this.renderLists = renderLists;
      _this.state = state;
      _this.info = info;
    }

    initGLContext();

    // vr

    var vr = ('xr' in navigator) ? new PGL.WebXRManager(_this) : new PGL.WebVRManager(_this);

    this.vr = vr;

    // shadow map
    var shadowMap = new PGL.WebGLShadowMap(_this, objects, capabilities.maxTextureSize);
    this.shadowMap = shadowMap;

    // API
    // 获取上下文
    this.getContext = function () {
      return _gl;
    };

    /**
     * 更新场景的尺寸及视点
     * @param value
     */
    this.setPixelRatio = function (value) {
      if (value === undefined) return;

      _pixelRatio = value;
      this.setSize(_width, _height, false);
    };

    /**
     * 更新场景的尺寸_width、_height，以及视点
     * @param width
     * @param height
     * @param updateStyle
     */
    this.setSize = function (width, height, updateStyle) {

      if (vr.isPresenting()) {
        console.warn('PGL.WebGLRenderer: Can\'t change size while VR device is presenting.');
        return;
      }

      _width = width;
      _height = height;

      _canvas.width = width * _pixelRatio;
      _canvas.height = height * _pixelRatio;

      if (updateStyle !== false) {

        _canvas.style.width = width + 'px';
        _canvas.style.height = height + 'px';

      }

      this.setViewport(0, 0, width, height);
    };

    // Events
    function onMaterialDispose(event) {
      var material = event.target;
      material.removeEventListener('dispose', onMaterialDispose);
      deallocateMaterial(material);
    }

    // Buffer deallocation
    function deallocateMaterial(material) {
      releaseMaterialProgramReference(material);
      properties.remove(material);
    }

    function releaseMaterialProgramReference(material) {
      var programInfo = properties.get(material).program;
      material.program = undefined;
      if (programInfo !== undefined) {
        programCache.releaseProgram(programInfo);
      }
    }

    /**
     * 更新视点
     * @param x
     * @param y
     * @param width
     * @param height
     */
    this.setViewport = function (x, y, width, height) {
      _viewport.set(x, _height - y - height, width, height);
      state.viewport(_currentViewport.copy(_viewport).multiplyScalar(_pixelRatio));
    };

    /**
     *
     * @param camera
     * @param fog
     * @param geometry 几何体
     * @param material 材质
     * @param object 渲染对象
     * @param group
     */
    this.renderBufferDirect = function (camera, fog, geometry, material, object, group) {

      var frontFaceCW = (object.isMesh && object.matrixWorld.determinant() < 0);
      state.setMaterial(material, frontFaceCW);

      var program = setProgram(camera, fog, material, object);
      var geometryProgram = geometry.id + '_' + program.id + '_' + (material.wireframe === true);

      var updateBuffers = false;

      if (geometryProgram !== _currentGeometryProgram) {

        _currentGeometryProgram = geometryProgram;
        updateBuffers = true;

      }

      if (object.morphTargetInfluences) {

        morphtargets.update(object, geometry, material, program);

        updateBuffers = true;

      }

      //

      var index = geometry.index;
      var position = geometry.attributes.position;
      var rangeFactor = 1;

      if (material.wireframe === true) {

        index = geometries.getWireframeAttribute(geometry);
        rangeFactor = 2;

      }

      var attribute;
      var renderer = bufferRenderer;

      if (index !== null) {

        attribute = attributes.get(index);

        renderer = indexedBufferRenderer;
        renderer.setIndex(attribute);

      }

      if (updateBuffers) {

        setupVertexAttributes(material, program, geometry);

        if (index !== null) {

          _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, attribute.buffer);

        }

      }

      //

      var dataCount = Infinity;

      if (index !== null) {

        dataCount = index.count;

      } else if (position !== undefined) {

        dataCount = position.count;

      }

      var rangeStart = geometry.drawRange.start * rangeFactor;
      var rangeCount = geometry.drawRange.count * rangeFactor;

      var groupStart = group !== null ? group.start * rangeFactor : 0;
      var groupCount = group !== null ? group.count * rangeFactor : Infinity;

      var drawStart = Math.max(rangeStart, groupStart);
      var drawEnd = Math.min(dataCount, rangeStart + rangeCount, groupStart + groupCount) - 1;

      var drawCount = Math.max(0, drawEnd - drawStart + 1);

      if (drawCount === 0) return;

      //

      if (object.isMesh) {

        if (material.wireframe === true) {

          state.setLineWidth(material.wireframeLinewidth * getTargetPixelRatio());
          renderer.setMode(_gl.LINES);

        } else {

          switch (object.drawMode) {

            case TrianglesDrawMode:
              renderer.setMode(_gl.TRIANGLES);
              break;

            case TriangleStripDrawMode:
              renderer.setMode(_gl.TRIANGLE_STRIP);
              break;

            case TriangleFanDrawMode:
              renderer.setMode(_gl.TRIANGLE_FAN);
              break;

          }

        }


      } else if (object.isLine) {

        var lineWidth = material.linewidth;

        if (lineWidth === undefined) lineWidth = 1; // Not using Line*Material

        state.setLineWidth(lineWidth * getTargetPixelRatio());

        if (object.isLineSegments) {

          renderer.setMode(_gl.LINES);

        } else if (object.isLineLoop) {

          renderer.setMode(_gl.LINE_LOOP);

        } else {

          renderer.setMode(_gl.LINE_STRIP);

        }

      } else if (object.isPoints) {

        renderer.setMode(_gl.POINTS);

      }

      if (geometry && geometry.isInstancedBufferGeometry) {

        if (geometry.maxInstancedCount > 0) {

          renderer.renderInstances(geometry, drawStart, drawCount);

        }

      } else {

        renderer.render(drawStart, drawCount);

      }

    };

    // Rendering
    /**
     * 渲染
     * @param scene
     * @param forceClear 标记是否强制清空深度、颜色、Stencil
     */
    this.render = function (scene, forceClear) {

      // 判断是否丢失
      if (_isContextLost) return;

      currentRenderState = renderStates.get(scene, null);
      currentRenderState.init();

      // 初始化渲染列表
      currentRenderList = renderLists.get(scene);
      currentRenderList.init();

      // 解析场景的的对象，解析几何体
      projectObject(scene, _this.sortObjects);

      // 给渲染项目排序
      if (_this.sortObjects === true) {
        currentRenderList.sort();
      }

      var shadowsArray = currentRenderState.state.shadowsArray;

      if (this.info.autoReset) this.info.reset();

      background.render(currentRenderList, scene, null, forceClear);

      var opaqueObjects = currentRenderList.opaque; // 不透明物体
      var transparentObjects = currentRenderList.transparent;// 透明物体

      if (scene.overrideMaterial) {

      } else {
        if (opaqueObjects.length) renderObjects(opaqueObjects, scene);
      }

    };

    /**
     * 解析对象
     * @param object
     * @param sortObjects
     */
    function projectObject(object, sortObjects) {
      if (object.visible === false) return;

      var visible = true;
      if (visible) {
        if (object.isPoints) {

          // 判断是否在可视范围
          if (!object.frustumCulled || _frustum.intersectsObject(object)) {
            var geometry = objects.update(object); // 获取PGL.BufferGeometry并处理属性
            var material = object.material;

            if (Array.isArray(material)) {

            } else if (material.visible) {
              currentRenderList.push(object, geometry, material, _vector3.z, null);
            }
          }
        }
      }

      var children = object.children;
      for (var i = 0, l = children.length; i < l; i++) {
        projectObject(children[i], sortObjects);
      }
    }

    /**
     * 渲染多个物体
     * @param renderList 待渲染的物体数组
     * @param scene 场景
     * @param camera 相机
     * @param overrideMaterial
     */
    function renderObjects(renderList, scene, camera, overrideMaterial) {

      for (var i = 0, l = renderList.length; i < l; i++) {

        var renderItem = renderList[i];

        var object = renderItem.object;
        var geometry = renderItem.geometry;
        var material = overrideMaterial === undefined ? renderItem.material : overrideMaterial;
        var group = renderItem.group;

        _currentArrayCamera = null;
        renderObject(object, scene, camera, geometry, material, group);

      }
    }

    /**
     * 渲染物体
     * @param object 待渲染的物体对象
     * @param scene 场景
     * @param camera 相机
     * @param geometry 几何体
     * @param material 材质
     * @param group 组
     */
    function renderObject(object, scene, camera, geometry, material, group) {
      object.onBeforeRender(_this, scene, camera, geometry, material, group);
      currentRenderState = renderStates.get(scene, _currentArrayCamera || camera);

      if (object.isImmediateRenderObject) {

      } else {
        // 渲染缓存区
        _this.renderBufferDirect(camera, scene.fog, geometry, material, object, group);
      }
    }

    /**
     *
     * @param material
     * @param fog
     * @param object
     */
    function initMaterial(material, fog, object) {

      var materialProperties = properties.get(material);

      var lights = currentRenderState.state.lights;
      var shadowsArray = currentRenderState.state.shadowsArray;

      var parameters = programCache.getParameters(
        material, lights.state, shadowsArray, fog, _clipping.numPlanes, _clipping.numIntersection, object);

      var code = programCache.getProgramCode(material, parameters);

      var program = materialProperties.program;
      var programChange = true;

      if (program === undefined) {
        // new material
        material.addEventListener('dispose', onMaterialDispose);
      }

      if (programChange) {
        if (parameters.shaderID) {
          var shader = ShaderLib[parameters.shaderID];
          materialProperties.shader = {
            name: material.type,
            uniforms: PGL.UniformsUtils.clone(shader.uniforms),
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader
          };
        } else {
          materialProperties.shader = {
            name: material.type,
            uniforms: material.uniforms,
            vertexShader: material.vertexShader,
            fragmentShader: material.fragmentShader
          };
        }

        material.onBeforeCompile(materialProperties.shader, _this);

        program = programCache.acquireProgram(material, materialProperties.shader, parameters, code);

        materialProperties.program = program;
        material.program = program;

      }

      var programAttributes = program.getAttributes();

      if (material.morphTargets) {

        material.numSupportedMorphTargets = 0;

        for (var i = 0; i < _this.maxMorphTargets; i++) {

          if (programAttributes['morphTarget' + i] >= 0) {

            material.numSupportedMorphTargets++;

          }

        }

      }

      if (material.morphNormals) {

        material.numSupportedMorphNormals = 0;

        for (var i = 0; i < _this.maxMorphNormals; i++) {

          if (programAttributes['morphNormal' + i] >= 0) {

            material.numSupportedMorphNormals++;

          }

        }

      }

      var uniforms = materialProperties.shader.uniforms;

      if (!material.isShaderMaterial &&
        !material.isRawShaderMaterial ||
        material.clipping === true) {

        materialProperties.numClippingPlanes = _clipping.numPlanes;
        materialProperties.numIntersection = _clipping.numIntersection;
        uniforms.clippingPlanes = _clipping.uniform;

      }

      materialProperties.fog = fog;

      // store the light setup it was created for

      materialProperties.lightsHash = lights.state.hash;

      if (material.lights) {

        // wire up the material to this renderer's lighting state

        uniforms.ambientLightColor.value = lights.state.ambient;
        uniforms.directionalLights.value = lights.state.directional;
        uniforms.spotLights.value = lights.state.spot;
        uniforms.rectAreaLights.value = lights.state.rectArea;
        uniforms.pointLights.value = lights.state.point;
        uniforms.hemisphereLights.value = lights.state.hemi;

        uniforms.directionalShadowMap.value = lights.state.directionalShadowMap;
        uniforms.directionalShadowMatrix.value = lights.state.directionalShadowMatrix;
        uniforms.spotShadowMap.value = lights.state.spotShadowMap;
        uniforms.spotShadowMatrix.value = lights.state.spotShadowMatrix;
        uniforms.pointShadowMap.value = lights.state.pointShadowMap;
        uniforms.pointShadowMatrix.value = lights.state.pointShadowMatrix;
        // TODO (abelnation): add area lights shadow info to uniforms

      }

      var progUniforms = materialProperties.program.getUniforms(),
        uniformsList =
          WebGLUniforms.seqWithValue(progUniforms.seq, uniforms);

      materialProperties.uniformsList = uniformsList;

    }

    /**
     *
     * @param camera
     * @param fog
     * @param material
     * @param object
     * @return {*}
     */
    function setProgram(camera, fog, material, object) {
      _usedTextureUnits = 0;

      var materialProperties = properties.get(material);

      if (material.needsUpdate) {
        initMaterial(material, fog, object);
        material.needsUpdate = false;
      }

      var refreshProgram = false;
      var refreshMaterial = false;
      var refreshLights = false;

      var program = materialProperties.program,
        p_uniforms = program.getUniforms(),
        m_uniforms = materialProperties.shader.uniforms;

      if (state.useProgram(program.program)) {

        refreshProgram = true;
        refreshMaterial = true;
        refreshLights = true;

      }

      if (material.id !== _currentMaterialId) {

        _currentMaterialId = material.id;

        refreshMaterial = true;

      }

      if (refreshProgram || camera !== _currentCamera) {

        p_uniforms.setValue(_gl, 'projectionMatrix', camera.projectionMatrix);

        if (capabilities.logarithmicDepthBuffer) {

          p_uniforms.setValue(_gl, 'logDepthBufFC',
            2.0 / (Math.log(camera.far + 1.0) / Math.LN2));

        }

        // Avoid unneeded uniform updates per ArrayCamera's sub-camera

        if (_currentCamera !== (_currentArrayCamera || camera)) {

          _currentCamera = (_currentArrayCamera || camera);

          // lighting uniforms depend on the camera so enforce an update
          // now, in case this material supports lights - or later, when
          // the next material that does gets activated:

          refreshMaterial = true;		// set to true on material change
          refreshLights = true;		// remains set until update done

        }

        // load material specific uniforms
        // (shader material also gets them for the sake of genericity)

        if (material.isShaderMaterial ||
          material.isMeshPhongMaterial ||
          material.isMeshStandardMaterial ||
          material.envMap) {

          var uCamPos = p_uniforms.map.cameraPosition;

          if (uCamPos !== undefined) {

            uCamPos.setValue(_gl,
              _vector3.setFromMatrixPosition(camera.matrixWorld));

          }

        }

        if (material.isMeshPhongMaterial ||
          material.isMeshLambertMaterial ||
          material.isMeshBasicMaterial ||
          material.isMeshStandardMaterial ||
          material.isShaderMaterial ||
          material.skinning) {

          p_uniforms.setValue(_gl, 'viewMatrix', camera.matrixWorldInverse);

        }

      }

      // skinning uniforms must be set even if material didn't change
      // auto-setting of texture unit for bone texture must go before other textures
      // not sure why, but otherwise weird things happen

      if (material.skinning) {

        p_uniforms.setOptional(_gl, object, 'bindMatrix');
        p_uniforms.setOptional(_gl, object, 'bindMatrixInverse');

        var skeleton = object.skeleton;

        if (skeleton) {

          var bones = skeleton.bones;

          if (capabilities.floatVertexTextures) {

            if (skeleton.boneTexture === undefined) {

              // layout (1 matrix = 4 pixels)
              //      RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
              //  with  8x8  pixel texture max   16 bones * 4 pixels =  (8 * 8)
              //       16x16 pixel texture max   64 bones * 4 pixels = (16 * 16)
              //       32x32 pixel texture max  256 bones * 4 pixels = (32 * 32)
              //       64x64 pixel texture max 1024 bones * 4 pixels = (64 * 64)


              var size = Math.sqrt(bones.length * 4); // 4 pixels needed for 1 matrix
              size = _Math.ceilPowerOfTwo(size);
              size = Math.max(size, 4);

              var boneMatrices = new Float32Array(size * size * 4); // 4 floats per RGBA pixel
              boneMatrices.set(skeleton.boneMatrices); // copy current values

              var boneTexture = new DataTexture(boneMatrices, size, size, RGBAFormat, FloatType);
              boneTexture.needsUpdate = true;

              skeleton.boneMatrices = boneMatrices;
              skeleton.boneTexture = boneTexture;
              skeleton.boneTextureSize = size;

            }

            p_uniforms.setValue(_gl, 'boneTexture', skeleton.boneTexture);
            p_uniforms.setValue(_gl, 'boneTextureSize', skeleton.boneTextureSize);

          } else {

            p_uniforms.setOptional(_gl, skeleton, 'boneMatrices');

          }

        }

      }

      if (refreshMaterial) {

        p_uniforms.setValue(_gl, 'toneMappingExposure', _this.toneMappingExposure);
        p_uniforms.setValue(_gl, 'toneMappingWhitePoint', _this.toneMappingWhitePoint);

        if (material.lights) {

          // the current material requires lighting info

          // note: all lighting uniforms are always set correctly
          // they simply reference the renderer's state for their
          // values
          //
          // use the current material's .needsUpdate flags to set
          // the GL state when required

          markUniformsLightsNeedsUpdate(m_uniforms, refreshLights);

        }

        // refresh uniforms common to several materials

        if (fog && material.fog) {

          refreshUniformsFog(m_uniforms, fog);

        }

        if (material.isMeshBasicMaterial) {

          refreshUniformsCommon(m_uniforms, material);

        } else if (material.isMeshLambertMaterial) {

          refreshUniformsCommon(m_uniforms, material);
          refreshUniformsLambert(m_uniforms, material);

        } else if (material.isMeshPhongMaterial) {

          refreshUniformsCommon(m_uniforms, material);

          if (material.isMeshToonMaterial) {

            refreshUniformsToon(m_uniforms, material);

          } else {

            refreshUniformsPhong(m_uniforms, material);

          }

        } else if (material.isMeshStandardMaterial) {

          refreshUniformsCommon(m_uniforms, material);

          if (material.isMeshPhysicalMaterial) {

            refreshUniformsPhysical(m_uniforms, material);

          } else {

            refreshUniformsStandard(m_uniforms, material);

          }

        } else if (material.isMeshDepthMaterial) {

          refreshUniformsCommon(m_uniforms, material);
          refreshUniformsDepth(m_uniforms, material);

        } else if (material.isMeshDistanceMaterial) {

          refreshUniformsCommon(m_uniforms, material);
          refreshUniformsDistance(m_uniforms, material);

        } else if (material.isMeshNormalMaterial) {

          refreshUniformsCommon(m_uniforms, material);
          refreshUniformsNormal(m_uniforms, material);

        } else if (material.isLineBasicMaterial) {

          refreshUniformsLine(m_uniforms, material);

          if (material.isLineDashedMaterial) {

            refreshUniformsDash(m_uniforms, material);

          }

        } else if (material.isPointsMaterial) {

          refreshUniformsPoints(m_uniforms, material);

        } else if (material.isShadowMaterial) {

          m_uniforms.color.value = material.color;
          m_uniforms.opacity.value = material.opacity;

        }

        // RectAreaLight Texture
        // TODO (mrdoob): Find a nicer implementation

        if (m_uniforms.ltc_1 !== undefined) m_uniforms.ltc_1.value = PGL.UniformsLib.LTC_1;
        if (m_uniforms.ltc_2 !== undefined) m_uniforms.ltc_2.value = PGL.UniformsLib.LTC_2;

        WebGLUniforms.upload(_gl, materialProperties.uniformsList, m_uniforms, _this);

      }

      if (material.isShaderMaterial && material.uniformsNeedUpdate === true) {

        WebGLUniforms.upload(_gl, materialProperties.uniformsList, m_uniforms, _this);
        material.uniformsNeedUpdate = false;

      }

      // common matrices

      p_uniforms.setValue(_gl, 'modelViewMatrix', object.modelViewMatrix);
      p_uniforms.setValue(_gl, 'normalMatrix', object.normalMatrix);
      p_uniforms.setValue(_gl, 'modelMatrix', object.matrixWorld);

      return program;

    }

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
    };

    this.getRenderTarget = function () {
      return _currentRenderTarget;
    };
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
    }
  })
})(PGL);