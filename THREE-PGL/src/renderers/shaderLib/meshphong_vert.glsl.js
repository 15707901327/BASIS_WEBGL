/*export default /!* glsl *!/`
uniform vec3 diffuse;

common + // 包含着色器公共模块(包含常用的数学工具函数以及一些常量定义什么的)

bsdfs + // 定义光照模型

lights_pars_begin + // 定义光照结构体，相关函数
lights_phong_pars_fragment + // 定义BlinnPhongMaterial结构体 宏定义函数：RE_Direct RE_IndirectDiffuse

#if defined( USE_MAP )
   varying vec2 vUv;
#endif

#ifdef USE_MAP
   uniform sampler2D map;
#endif

void main() {
   vec4 diffuseColor = vec4(diffuse,1.0);
   ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

   #ifdef USE_MAP
       vec4 texelColor = texture2D( map, vUv );
       diffuseColor = texelColor;
   #endif

   #ifdef USE_COLOR
       diffuseColor.rgb *= vColor;
   #endif

   BlinnPhongMaterial material;
   material.diffuseColor = diffuseColor.rgb;

normal_fragment_begin +

lights_fragment_begin +

// 计算环境光照
   #if defined( RE_IndirectDiffuse )
        vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
    #endif

// 环境光照 * 基本颜色
   #if defined( RE_IndirectDiffuse )
        RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
    #endif

   vec3 outgoingLight = reflectedLight.indirectDiffuse + reflectedLight.indirectDiffuse;

   gl_FragColor = vec4(outgoingLight,diffuseColor.a);
}
`;*/

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
