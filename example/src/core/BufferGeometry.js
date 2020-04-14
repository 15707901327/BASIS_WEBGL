/**
 * 几何体
 * @constructor
 */
import {arrayMax} from "../utils.js";
import {Uint32BufferAttribute, Uint16BufferAttribute, Uint8BufferAttribute} from "../core/BufferAttribute.js";

function BufferGeometry() {
  this.index = null; // 索引值
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

  /**
   * 设置索引值
   * @param index
   */
  setIndex: function(index) {
    if (Array.isArray(index)) {
      this.index = new (arrayMax(index) > 255 ? (arrayMax(index) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute) : Uint8BufferAttribute)(index, 1);
    } else {
      this.index = index;
    }
  },

  translateAttributeName: function(name) {
    var a_name;

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