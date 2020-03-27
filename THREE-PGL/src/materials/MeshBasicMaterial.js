import {Material} from './Material.js';
import {Color} from '../math/Color.js';

function MeshBasicMaterial(parameters) {

  Material.call(this);

  this.type = 'MeshBasicMaterial';

  this.color = new Color( 0xffffff ); // emissive

  this.setValues( parameters );
}

MeshBasicMaterial.prototype = Object.create( Material.prototype );
MeshBasicMaterial.prototype.constructor = MeshBasicMaterial;
MeshBasicMaterial.prototype.isMeshBasicMaterial = true;

export {MeshBasicMaterial};