import {Material} from './Material.js';
import {Color} from '../math/Color.js';

function MeshPhongMaterial(parameters) {
  Material.call(this);

  this.type = 'MeshPhongMaterial';

  this.color = new Color(0xffffff); // diffuse

  this.map = null;

  // 自发光
  this.emissive = new Color( 0x000000 );
  this.emissiveIntensity = 1.0;
  this.emissiveMap = null;

  this.setValues(parameters);
}
MeshPhongMaterial.prototype = Object.create(Material.prototype);
MeshPhongMaterial.prototype.constructor = MeshPhongMaterial;
MeshPhongMaterial.prototype.isMeshPhongMaterial = true;

export {MeshPhongMaterial};