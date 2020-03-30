/**
 * BufferAttribute
 * @param array
 * @param itemSize
 * @constructor
 */
function BufferAttribute(array, itemSize) {
  this.array = array;
  this.itemSize = itemSize;
  this.count = array !== undefined ? array.length / itemSize : 0;
}

Object.assign(BufferAttribute.prototype, {});

function Float32BufferAttribute(array, itemSize) {
  BufferAttribute.call(this, new Float32Array(array), itemSize)
}

function Uint8BufferAttribute(array, itemSize) {
  BufferAttribute.call(this, new Uint8Array(array), itemSize)
}

export {BufferAttribute, Float32BufferAttribute, Uint8BufferAttribute};