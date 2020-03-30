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
    var a_name

    switch(name){
      case "vertices":
        a_name = "a_Position";
        break;
      case "color":
        a_name = "a_Color";
        break;
      default:
        a_name = name;
    }

    return a_name;
  }
});

export default BufferGeometry;