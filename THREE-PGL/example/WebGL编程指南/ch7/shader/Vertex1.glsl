precision highp float;
precision highp int;

#define USE_COLOR// 定义颜色

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

#ifdef USE_COLOR
attribute vec3 color;
#endif

#ifdef USE_COLOR
varying vec3 vColor;
#endif

void main() {
    #ifdef USE_COLOR
    vColor.xyz = color.xyz;
    #endif

    vec3 transformed = vec3(position);
    vec4 mvPosition = vec4(transformed, 1.0);
    mvPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * mvPosition;
}