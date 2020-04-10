export var VERTEX_SHADER = `
precision mediump float;
precision mediump int;
attribute vec4 a_Position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
  vec3 transformed = vec3(a_Position);
  vec4 mvPosition = vec4(transformed, 1.0);
  mvPosition = modelViewMatrix * mvPosition;
  gl_Position = projectionMatrix * mvPosition;
}
`;
export var FRAGMENT_SHADER = `
precision mediump float;
void main(){
  gl_FragColor = vec4(0.6,0.6,0.6,1.0);
}
`;