import {Box3} from "../math/Box3.js";
import {Vector3} from "../math/Vector3.js";
import {Sphere} from "../math/Sphere.js";
import {arrayMax} from "../../src/utils.js";
import {Uint16BufferAttribute, Uint32BufferAttribute} from "./BufferAttribute.js";

var bufferGeometryId = 1; // BufferGeometry uses odd numbers as Id
function BufferGeometry() {
  Object.defineProperty(this, 'id', {value: bufferGeometryId += 2});

  this.attributes = {}; // 保存属性信息
  this.morphAttributes = {};

  this.boundingBox = null; // 包围盒子
  this.boundingSphere = null; // 包围球
}

Object.assign(BufferGeometry.prototype, {

  constructor: BufferGeometry,

  isBufferGeometry: true,

  /**
   * 设置顶点索引
   * @param index 索引值
   */
  setIndex: function(index) {

    if (Array.isArray(index)) {
      this.index = new (arrayMax(index) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute)(index, 1);
    } else {
      this.index = index;
    }
  },

  /**
   * 把属性添加到this.attributes中
   * @param name
   * @param attribute
   * @return {*}
   */
  setAttribute: function(name, attribute) {
    this.attributes[name] = attribute;
    return this;
  },

  /**
   * 计算模型的最小包围球的大小
   */
  computeBoundingSphere: function() {

    var box = new Box3();
    var boxMorphTargets = new Box3();
    var vector = new Vector3();

    return function computeBoundingSphere() {

      if (this.boundingSphere === null) {
        this.boundingSphere = new Sphere();
      }

      var position = this.attributes.position;
      var morphAttributesPosition = this.morphAttributes.position;

      if (position) {

        // first, find the center of the bounding sphere

        var center = this.boundingSphere.center;

        box.setFromBufferAttribute(position);

        // process morph attributes if present
        if (morphAttributesPosition) {

          for (var i = 0, il = morphAttributesPosition.length; i < il; i++) {

            var morphAttribute = morphAttributesPosition[i];
            boxMorphTargets.setFromBufferAttribute(morphAttribute);

            box.expandByPoint(boxMorphTargets.min);
            box.expandByPoint(boxMorphTargets.max);

          }

        }

        box.getCenter(center);

        // second, try to find a boundingSphere with a radius smaller than the
        // boundingSphere of the boundingBox: sqrt(3) smaller in the best case
        // 获取最大半径的平方
        var maxRadiusSq = 0;

        for (var i = 0, il = position.count; i < il; i++) {
          vector.fromBufferAttribute(position, i);
          maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));
        }

        // process morph attributes if present

        if (morphAttributesPosition) {

          for (var i = 0, il = morphAttributesPosition.length; i < il; i++) {

            var morphAttribute = morphAttributesPosition[i];

            for (var j = 0, jl = morphAttribute.count; j < jl; j++) {

              vector.fromBufferAttribute(morphAttribute, j);

              maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));

            }

          }

        }

        this.boundingSphere.radius = Math.sqrt(maxRadiusSq);

        if (isNaN(this.boundingSphere.radius)) {
          console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
        }

      }

    };

  }()
});

export {BufferGeometry};