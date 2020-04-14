function WebGLAttributes(gl) {

  var buffers = new WeakMap();

  var createBuffer = function(attribute, bufferType) {

    var array = attribute.array;

    // 创建缓存区对象
    var buffer = gl.createBuffer();
    if (!buffer) {
      return -1;
    }
    gl.bindBuffer(bufferType, buffer);
    gl.bufferData(bufferType, array, gl.STATIC_DRAW);

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
      buffer: buffer, // 属性的缓冲空间
      type: type, // 属性类型
    }
  };

  function get(attribute) {
    return buffers.get(attribute);
  }

  function update(attribute, bufferType) {
    buffers.set(attribute, createBuffer(attribute, bufferType));
  }

  return {
    update: update,
    get: get
  }
}

export {WebGLAttributes};