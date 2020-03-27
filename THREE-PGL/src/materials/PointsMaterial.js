import {Material} from './Material.js';

function PointsMaterial(parameters) {
  Material.call(this);

  this.type = 'PointsMaterial';

  this.color = new PGL.Color(0xffffff);

  this.size = 1;// 点的大小

  this.setValues(parameters);
};
PointsMaterial.prototype = Object.create(PGL.Material.prototype);
PointsMaterial.prototype.constructor = PGL.PointsMaterial;
PointsMaterial.prototype.isPointsMaterial = true;

export {PointsMaterial};