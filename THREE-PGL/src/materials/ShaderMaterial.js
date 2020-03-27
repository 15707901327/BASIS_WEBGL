import {Material} from './Material.js';

function ShaderMaterial(options) {

  Material.call(this);

  var options = options || {};
  this.vertexShader = options.vertexShader;
  this.fragmentShader = options.fragmentShader;
};

export {ShaderMaterial};