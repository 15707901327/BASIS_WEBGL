export default /* glsl */`
attribute vec3 color;
varying vec3 vColor;

void main() {
  vColor.xyz = color.xyz;

  vec3 transformed = vec3(position);
  vec4 mvPosition = vec4(transformed, 1.0);
  mvPosition = modelViewMatrix * mvPosition;
  gl_Position = projectionMatrix * mvPosition;
}
`;
