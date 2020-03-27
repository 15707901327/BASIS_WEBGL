var common =
  "#define RECIPROCAL_PI 0.31830988618\n" + // 1/PI
  "#define saturate(a) clamp( a, 0.0, 1.0 )\n" + // 限制a的值在0-1之间

  // 入射光
  "struct IncidentLight {\n" +
  "   vec3 color;\n" +
  "   vec3 direction;\n" +
  "   bool visible;\n" +
  "};\n" +

  "struct ReflectedLight {\n" +
  "   vec3 directDiffuse;\n" +
  "   vec3 directSpecular;\n" +
  "   vec3 indirectDiffuse;\n" +
  "   vec3 indirectSpecular;\n" +
  "};\n" +

  "struct GeometricContext {\n" +
  "   vec3 position;\n" +
  "   vec3 normal;\n" +
  "   vec3 viewDir;\n" +
  "};\n";
var lights_pars_begin =
  "uniform vec3 ambientLightColor;\n" +
  "vec3 getAmbientLightIrradiance(const in vec3 ambientLightColor){\n" +
  "   vec3 irradiance = ambientLightColor;\n" +
  "   return irradiance;\n" +
  "}\n" +

  // 平行光
  "#if 1 > 0\n" +
  "   struct DirectionalLight {\n" +
  "       vec3 direction;\n" +
  "       vec3 color;\n" +
  "       int shadow;\n" +
  "       float shadowBias;\n" +
  "       float shadowRadius;\n" +
  "       vec2 shadowMapSize;\n" +
  "   };\n" +
  "   uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n" +

  "   void getDirectionalDirectLightIrradiance(const in DirectionalLight directionalLight,const in GeometricContext geometry,out IncidentLight directLight) {\n" +
  "       directLight.color = directionalLight.color;\n" +
  "       directLight.direction = directionalLight.direction;\n" +
  "       directLight.visible = true;\n" +
  "   }\n" +
  "#endif\n";

// 定义光照模型
var bsdfs =
  "vec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n" +
  "   return RECIPROCAL_PI * diffuseColor;\n" +
  "}\n";

var lights_phong_pars_fragment =
  "#ifndef FLAT_SHADED\n" +
  "   varying vec3 vNormal;\n" +
  "#endif\n" +

  "struct BlinnPhongMaterial {\n" +
  "   vec3 diffuseColor;\n" +
  "   vec3 specularColor;\n" +
  "   float specularShininess;\n" +
  "   float specularStrength;\n" +
  "};\n" + // 必须加上精度限定

  /**
   * directLight：入射光颜色
   * geometry：几何体
   * material：材质
   * reflectedLight：反射光
   */
  "void RE_Direct_BlinnPhong(const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight){\n" +
  "   #ifdef TOON\n" +
  "       vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n" +
  "   #else\n" +
  "       float dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n" + // cos
  "       vec3 irradiance = dotNL * directLight.color;\n" +
  "   #endif\n" +
  "   reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n" +
  // "   reflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n" +
  "}\n" +

  /**
   * RE_IndirectDiffuse_BlinnPhong
   * irradiance:光源颜色
   * geometry：几何体
   * material：材质
   * reflectedLight：反射光
   */
  "void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n" +
  "   reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n" +
  "}\n" +

  "#define RE_Direct RE_Direct_BlinnPhong\n" +
  "#define RE_IndirectDiffuse RE_IndirectDiffuse_BlinnPhong\n";

var lights_fragment_begin =
  "GeometricContext geometry;\n" +
  "geometry.normal = normal;\n" +

  "IncidentLight directLight;\n" + // 实例化入射光
  // 计算平行光
  "#if ( 1 > 0 ) && defined( RE_Direct )\n" +
  "   DirectionalLight directionalLight;\n" +
  // "   #pragma unroll_loop\n" +
  "   for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n" +
  "       directionalLight = directionalLights[ i ];\n" +
  "       getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n" +
  "       RE_Direct( directLight, geometry, material, reflectedLight );\n" +
  "   }\n" +
  "#endif\n";

var normal_fragment_begin =
  "#ifdef FLAT_SHADED\n" +
  "#else\n" +
  "   vec3 normal = normalize( vNormal );\n" +
  "#endif\n";

var beginnormal_vertex =
  "vec3 objectNormal = vec3( normal );\n";
var defaultnormal_vertex =
  "vec3 transformedNormal = normalMatrix * objectNormal;\n";

var points_vert =
  "attribute vec4 position;\n" +
  "uniform float size;\n" +
  "void main(){\n" +
  " gl_Position = position; //设置坐标\n" +
  " gl_PointSize = size; //设置尺寸\n" +
  "}";
var points_frag =
  "precision highp float;\n" +
  "uniform vec3 diffuse;\n" + // 必须加上精度限定
  "void main() {\n" +
  " gl_FragColor = vec4(diffuse,1.0);\n" +
  "}";

var meshphong_vert =
  "#define PHONG\n" +

  "#ifndef FLAT_SHADED\n" +
  "   varying vec3 vNormal;\n" +
  "#endif\n" +

  "#if defined(USE_MAP)\n" +
  "   varying vec2 vUv;\n" +
  "#endif\n" +

  "#ifdef USE_COLOR\n" +
  "   attribute vec3 color;\n" +
  "   varying vec3 vColor;\n" +
  "#endif\n" +

  "void main(){\n" +

  "   #if defined( USE_MAP )\n" +
  "       vUv = uv;\n" +
  "   #endif\n" +

  beginnormal_vertex +
  defaultnormal_vertex +

  "   #ifndef FLAT_SHADED \n" + // Normal computed with derivatives when FLAT_SHADED
  "       vNormal = normalize( transformedNormal );\n" +
  "   #endif\n" +

  "   #ifdef USE_COLOR\n" +
  "       vColor.xyz = color.xyz;\n" +
  "   #endif\n" +

  " vec4 mvPosition = projectionMatrix * modelViewMatrix * position; //设置坐标\n" +
  " gl_Position = mvPosition; //设置坐标\n" +
  "}";
var meshphong_frag =
  "uniform vec3 diffuse;\n" +

  common + // 包含着色器公共模块(包含常用的数学工具函数以及一些常量定义什么的)

  bsdfs + // 定义光照模型

  lights_pars_begin + // 定义光照结构体，相关函数
  lights_phong_pars_fragment + // 定义BlinnPhongMaterial结构体 宏定义函数：RE_Direct RE_IndirectDiffuse

  "#if defined( USE_MAP )\n" +
  "   varying vec2 vUv;\n" +
  "#endif\n" +

  "#ifdef USE_MAP\n" +
  "   uniform sampler2D map;\n" +
  "#endif\n" +

  "#ifdef USE_COLOR\n" +
  "   varying vec3 vColor;\n" +
  "#endif\n" +

  "void main() {\n" +
  "   vec4 diffuseColor = vec4(diffuse,1.0);\n" +
  "   ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n" +

  "   #ifdef USE_MAP\n" +
  "       vec4 texelColor = texture2D( map, vUv );\n" +
  "       diffuseColor = texelColor;\n" +
  "   #endif\n" +

  "   #ifdef USE_COLOR\n" +
  "       diffuseColor.rgb *= vColor;\n" +
  "   #endif\n" +

  "   BlinnPhongMaterial material;\n" +
  "   material.diffuseColor = diffuseColor.rgb;\n" +

  normal_fragment_begin +

  lights_fragment_begin +

  // 计算环境光照
  "   #if defined( RE_IndirectDiffuse )\n" +
  "        vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n" +
  "    #endif\n" +

  // 环境光照 * 基本颜色
  "   #if defined( RE_IndirectDiffuse )\n" +
  "        RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n" +
  "    #endif\n" +

  "   vec3 outgoingLight = reflectedLight.indirectDiffuse + reflectedLight.indirectDiffuse;\n" +

  "   gl_FragColor = vec4(outgoingLight,diffuseColor.a);\n" +
  "}";

import meshbasic_frag from "../shaderLib/meshbasic_frag.glsl.js";
import meshbasic_vert from "../shaderLib/meshbasic_vert.glsl.js";

var ShaderChunk = {
  meshbasic_frag: meshbasic_frag,
  meshbasic_vert: meshbasic_vert,
  points_frag: points_frag,
  points_vert: points_vert,
  meshphong_vert: meshphong_vert,
  meshphong_frag: meshphong_frag
};

export {ShaderChunk};