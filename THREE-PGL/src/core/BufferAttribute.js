/**
 *
 * @param array 数组
 * @param itemSize 数据长度
 * @param normalized 表明是否是浮点数
 * @constructor
 */
function BufferAttribute(array, itemSize, normalized) {
  this.array = array;
  this.itemSize = itemSize;
  this.count = array !== undefined ? array.length / itemSize : 0;

  this.normalized = normalized === true; // 表明是否是浮点数

  this.dynamic = false; // false 只会向缓存区对象中写入一次数据，但需要绘制很多次 true 多次写入，绘制多次

  this.version = 0; // 版本
};
Object.defineProperty(BufferAttribute.prototype, 'needsUpdate', {
  set: function(value) {
    if (value === true) this.version++;
  }
});
Object.assign(BufferAttribute.prototype, {

  isBufferAttribute: true,

  onUploadCallback: function() {
  },

  setArray: function(array) {

    if (Array.isArray(array)) {

      throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');

    }

    this.count = array !== undefined ? array.length / this.itemSize : 0;
    this.array = array;

    return this;

  },

  setDynamic: function(value) {

    this.dynamic = value;

    return this;

  },

  copy: function(source) {

    this.name = source.name;
    this.array = new source.array.constructor(source.array);
    this.itemSize = source.itemSize;
    this.count = source.count;
    this.normalized = source.normalized;

    this.dynamic = source.dynamic;

    return this;

  },

  copyAt: function(index1, attribute, index2) {

    index1 *= this.itemSize;
    index2 *= attribute.itemSize;

    for (var i = 0, l = this.itemSize; i < l; i++) {

      this.array[index1 + i] = attribute.array[index2 + i];

    }

    return this;

  },

  copyArray: function(array) {

    this.array.set(array);

    return this;

  },

  copyColorsArray: function(colors) {

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

  copyVector2sArray: function(vectors) {

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

  copyVector3sArray: function(vectors) {

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

  copyVector4sArray: function(vectors) {

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

  set: function(value, offset) {

    if (offset === undefined) offset = 0;

    this.array.set(value, offset);

    return this;

  },

  getX: function(index) {
    return this.array[index * this.itemSize];
  },

  setX: function(index, x) {

    this.array[index * this.itemSize] = x;

    return this;

  },

  getY: function(index) {

    return this.array[index * this.itemSize + 1];

  },

  setY: function(index, y) {

    this.array[index * this.itemSize + 1] = y;

    return this;

  },

  getZ: function(index) {

    return this.array[index * this.itemSize + 2];

  },

  setZ: function(index, z) {

    this.array[index * this.itemSize + 2] = z;

    return this;

  },

  getW: function(index) {

    return this.array[index * this.itemSize + 3];

  },

  setW: function(index, w) {

    this.array[index * this.itemSize + 3] = w;

    return this;

  },

  setXY: function(index, x, y) {

    index *= this.itemSize;

    this.array[index + 0] = x;
    this.array[index + 1] = y;

    return this;

  },

  setXYZ: function(index, x, y, z) {

    index *= this.itemSize;

    this.array[index + 0] = x;
    this.array[index + 1] = y;
    this.array[index + 2] = z;

    return this;

  },

  setXYZW: function(index, x, y, z, w) {

    index *= this.itemSize;

    this.array[index + 0] = x;
    this.array[index + 1] = y;
    this.array[index + 2] = z;
    this.array[index + 3] = w;

    return this;

  },

  onUpload: function(callback) {

    this.onUploadCallback = callback;

    return this;

  },

  clone: function() {

    return new this.constructor(this.array, this.itemSize).copy(this);

  },

  toJSON: function() {

    return {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.prototype.slice.call(this.array),
      normalized: this.normalized
    };

  }

});

function Float32BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Float32Array(array), itemSize, normalized);
}

Float32BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Float32BufferAttribute.prototype.constructor = Float32BufferAttribute;

function Uint32BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Uint32Array(array), itemSize, normalized);
}

Uint32BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Uint32BufferAttribute.prototype.constructor = Uint32BufferAttribute;

function Uint16BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Uint16Array(array), itemSize, normalized);
}

Uint16BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Uint16BufferAttribute.prototype.constructor = Uint16BufferAttribute;

export {
  BufferAttribute,
  Float32BufferAttribute,
  Uint16BufferAttribute,
  Uint32BufferAttribute
};