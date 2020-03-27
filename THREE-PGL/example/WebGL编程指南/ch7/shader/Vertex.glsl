precision highp float;
precision highp int;
#define HIGH_PRECISION
#define SHADER_NAME MeshBasicMaterial
#define USE_COLOR
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
attribute vec4 position;
attribute vec3 normal;
attribute vec2 uv;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

attribute vec3 color;
varying vec3 vColor;
void main() {
    vColor.xyz = color.xyz;

    vec3 transformed = vec3(position);
    vec4 mvPosition = vec4(transformed, 1.0);
    mvPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * mvPosition;
}