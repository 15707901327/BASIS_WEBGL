import {mergeUniforms, UniformsUtils} from "./UniformsUtils.js";
import {ShaderChunk} from "./ShaderChunk.js";
import {UniformsLib} from "./UniformsLib.js";

var ShaderLib = {
  basic: {
    uniforms: mergeUniforms([
      UniformsLib.common,
    ]),

    vertexShader: ShaderChunk.meshbasic_vert,
    fragmentShader: ShaderChunk.meshbasic_frag
  },

  phong: {
    uniforms: UniformsUtils.merge([
      UniformsLib.common,
      UniformsLib.lights
    ]),

    vertexShader: ShaderChunk.meshphong_vert,
    fragmentShader: ShaderChunk.meshphong_frag
  },
  points: {

    uniforms: UniformsUtils.merge([
      UniformsLib.points
    ]),

    vertexShader: ShaderChunk.points_vert,
    fragmentShader: ShaderChunk.points_frag

  }
};

export {ShaderLib};