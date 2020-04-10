export default /* glsl */`

#define PHONG

varying vec3 vViewPosition;

#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif

// color_pars_vertex.glsl.js
#ifdef USE_COLOR
	varying vec3 vColor;
#endif

void main() {
  // color_vertex.glsl.js
  #ifdef USE_COLOR
	  vColor.xyz = color.xyz;
  #endif
  
  vec3 objectNormal = vec3( normal );
  vec3 transformedNormal = objectNormal;
  transformedNormal = normalMatrix * transformedNormal;
  
  #ifndef FLAT_SHADED
    vNormal = normalize( transformedNormal );
  #endif

  vec3 transformed = vec3(position);
  vec4 mvPosition = vec4(transformed, 1.0);
  mvPosition = modelViewMatrix * mvPosition;
  gl_Position = projectionMatrix * mvPosition;
  
  vViewPosition = - mvPosition.xyz;
}
`;
