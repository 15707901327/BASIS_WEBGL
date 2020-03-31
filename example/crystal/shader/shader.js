export var VERTEX_SHADER = `
precision mediump float;
precision mediump int;
attribute vec4 a_Position;
attribute vec3 a_Color;
varying vec3 vColor;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
  vColor.xyz = a_Color.xyz;

  vec3 transformed = vec3(a_Position);
  vec4 mvPosition = vec4(transformed, 1.0);
  mvPosition = modelViewMatrix * mvPosition;
  gl_Position = projectionMatrix * mvPosition;
}
`;
export var FRAGMENT_SHADER = `
precision mediump float;
varying vec3 vColor;
void main(){
  gl_FragColor = vec4(vColor,1.0);
  gl_FragColor = vec4(vColor,1.0);
}
`;