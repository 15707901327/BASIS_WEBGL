import {Object3D} from "../core/Object3D.js";

function Mesh(geometry, material) {

  Object3D.call(this);

  this.type = 'Mesh';

  this.geometry = geometry;
  this.material = material;
};
Mesh.prototype = Object.assign(Object.create(Object3D.prototype), {
  constructor: Mesh,

  isMesh: true
});

export {Mesh};