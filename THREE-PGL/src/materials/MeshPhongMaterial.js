import {Material} from './Material.js';

function MeshPhongMaterial(parameters) {
  Material.call(this);

  this.type = 'MeshPhongMaterial';

  this.color = new PGL.Color(0xffffff); // diffuse

  this.map = null;

  this.setValues(parameters);
};
MeshPhongMaterial.prototype = Object.create(Material.prototype);
MeshPhongMaterial.prototype.constructor = MeshPhongMaterial;
MeshPhongMaterial.prototype.isMeshPhongMaterial = true;

export {MeshPhongMaterial};