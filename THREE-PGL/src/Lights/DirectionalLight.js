import {Light} from "./Light.js";
import {Object3D} from "../core/Object3D.js";

function DirectionalLight(color, intensity) {
  Light.call(this, color, intensity);

  this.type = 'DirectionalLight';

  this.position.copy(Object3D.DefaultUp);

  this.updateMatrix();

  this.target = new Object3D();
}

DirectionalLight.prototype = Object.assign(Object.create(Light.prototype), {
  constructor: DirectionalLight,

  isDirectionalLight: true,
});

export {DirectionalLight};