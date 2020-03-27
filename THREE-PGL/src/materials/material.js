var materialId = 0;

function Material() {
  Object.defineProperty(this, 'id', {value: materialId++});

  this.name = '';
  this.type = 'Material'; // 材质类型

  this.lights = true; // 对灯光敏感

  this.vertexColors = false;

  this.depthTest = true; // 设置是否启动隐藏面消除

  // 设置多边形偏移
  this.polygonOffset = false;
  this.polygonOffsetFactor = 0;
  this.polygonOffsetUnits = 0;

  this.precision = null; // override the renderer's default precision for this material

  this.visible = true;

  this.userData = {};

  this.version = 0; // 控制着色器程序更新
};
Object.defineProperty(Material.prototype, 'needsUpdate', {
  set: function(value) {
    if (value === true) this.version++;
  }
});
Material.prototype = {
  /**
   * 把给定的参数设置到当前的对象中去
   * @param values
   */
  setValues: function(values) {
    if (values === undefined) return;

    for (var key in values) {

      var newValue = values[key];

      if (newValue === undefined) {

        console.warn("THREE.Material: '" + key + "' parameter is undefined.");
        continue;

      }

      // for backward compatability if shading is set in the constructor
      if (key === 'shading') {

        console.warn('THREE.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.');
        this.flatShading = (newValue === FlatShading) ? true : false;
        continue;

      }

      var currentValue = this[key];

      if (currentValue === undefined) {

        console.warn("THREE." + this.type + ": '" + key + "' is not a property of this material.");
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
};

export {Material};