/**
 * 几何体
 * @constructor
 */
function BufferGeometry() {
  this.attributes = {}; // 保存属性信息
}

Object.assign(BufferGeometry.prototype, {

  /**
   * 设置attribute变量
   * @param name
   * @param attribute
   */
  setAttribute: function(name, attribute) {
    this.attributes[name] = attribute;
  },

  translateAttributeName: function(name) {
    if (name === "vertices") {
      return "a_Position";
    }

    return name;
  }
});

export default BufferGeometry;