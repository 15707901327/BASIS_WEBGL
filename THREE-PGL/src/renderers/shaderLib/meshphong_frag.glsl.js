export default /* glsl */`

vec4 LinearToLinear( in vec4 value ) {
  return value;
}
vec4 linearToOutputTexel( vec4 value ) { return LinearToLinear( value ); }

#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

/**** common.glsl.js **/
#define PI 3.14159265359
#define RECIPROCAL_PI 0.31830988618

#ifndef saturate
  #define saturate(a) clamp( a, 0.0, 1.0 )
#endif

struct IncidentLight {
    vec3 color;
    vec3 direction;
    bool visible;
};

// 定义灯光结构体
struct ReflectedLight {
    vec3 directDiffuse; // 直接漫反射
    vec3 directSpecular; // 直接高光
    vec3 indirectDiffuse; // 间接满反射
    vec3 indirectSpecular; // 间接高光
};

struct GeometricContext {
    vec3 position;
    vec3 normal;
    vec3 viewDir;
    #ifdef CLEARCOAT
    vec3 clearcoatNormal;
    #endif
};

/*
 * // http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations
 * 逆变换方向
 */
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	// dir can be either a direction vector or a normal vector
	// upper-left 3x3 of matrix is assumed to be orthogonal
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}

// color_pars_fragment.glsl.js
#ifdef USE_COLOR
	varying vec3 vColor;
#endif

/**** bsdfs.glsl.js ***********************/
/*
 * 兰伯特模型计算漫反射光照
 */
vec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
} // validated

vec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotLH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );

	return ( 1.0 - specularColor ) * fresnel + specularColor;

} // validated

float G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {

	// geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)
	return 0.25;

}

float D_BlinnPhong( const in float shininess, const in float dotNH ) {
    return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}

/*
 * 计算高光反射
 * incidentLight：入射光
 * geometry：几何体
 * shininess：平滑度
 */
vec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {

	vec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );

	//float dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );
	//float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
	float dotNH = saturate( dot( geometry.normal, halfDir ) );
	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );

	vec3 F = F_Schlick( specularColor, dotLH );

	float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );

	float D = D_BlinnPhong( shininess, dotNH );

	return F * ( G * D );

} // validated

/**** lights_pars_begin.glsl.js ***********/
uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ]; // 光探头

/*
 * 获取辐照度
 */
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
    float x = normal.x, y = normal.y, z = normal.z;
    vec3 result = shCoefficients[ 0 ] * 0.886227;
    result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
    result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
    result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
    result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
    result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
    result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
    result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
    result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
    return result;
}

/*
 * 探头
 */
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {
	vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}

/* 
 * 获取环境光照射强度
 * 返回：环境光的强度
 */
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	return irradiance;
}

#if 1 > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};

	uniform DirectionalLight directionalLights[ 1 ];
	
	/*
	 * directionalLight: 平行光
	 * geometry：几何体
	 * directLight：入射光
	 */
	void getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		directLight.color = directionalLight.color;
		directLight.direction = directionalLight.direction;
		directLight.visible = true;
	}
#endif

/**** lights_phong_pars_fragment.glsl.js **/
varying vec3 vViewPosition;

#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif

// 高光材质结构体
struct BlinnPhongMaterial {
	vec3	diffuseColor;
	vec3	specularColor;
	float	specularShininess;
	float	specularStrength;
};

/*
 * directLight：入射光
 * geometry：几何体
 * material：材质
 * reflectedLight: 反射光
 */
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
  // 计算反射光强度
  float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
  vec3 irradiance = dotNL * directLight.color;

	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI; // punctual light
	#endif
	
	// 计算漫反射颜色
	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
	
	// 计算镜面反射颜色
	reflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;
}

/*
 * 计算间接漫反射
 */
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}

#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong

#define Material_LightProbeLOD( material )	(0)

void main() {
    vec4 diffuseColor = vec4( diffuse, opacity );
    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
    vec3 totalEmissiveRadiance = emissive;
    
    // color_fragment.glsl.js
    #ifdef USE_COLOR
      diffuseColor.rgb *= vColor;
    #endif
    
    float specularStrength;
    #ifdef USE_SPECULARMAP
      vec4 texelSpecular = texture2D( specularMap, vUv );
      specularStrength = texelSpecular.r;
    #else
      specularStrength = 1.0;
    #endif
    
    // 设置法线
    #ifdef FLAT_SHADED
        vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
        vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
        vec3 normal = normalize( cross( fdx, fdy ) );
    #else
        vec3 normal = normalize( vNormal );
        #ifdef DOUBLE_SIDED
            normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );
        #endif
    #endif
    vec3 geometryNormal = normal;
    
    // 设置材质
    BlinnPhongMaterial material;
    material.diffuseColor = diffuseColor.rgb;
    material.specularColor = specular;
    material.specularShininess = shininess;
    material.specularStrength = specularStrength;

    // 设置几何体
    GeometricContext geometry;
    geometry.position = - vViewPosition;
    geometry.normal = normal;
    
    // 入射光
    IncidentLight directLight;

    #if ( 1 > 0 ) && defined( RE_Direct )
        DirectionalLight directionalLight;
        directionalLight = directionalLights[ 0 ];
        // 平行光设置给入射光
        getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );
        // 计算漫反射颜色和高光反射颜色
        RE_Direct( directLight, geometry, material, reflectedLight );
    #endif

    #if defined( RE_IndirectDiffuse )
        // 辐照度
        vec3 iblIrradiance = vec3( 0.0 );
        // 照度
        vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
        irradiance += getLightProbeIrradiance( lightProbe, geometry );
    #endif
    
    // 计算间接漫反射光照
    #if defined(RE_IndirectDiffuse)
        RE_IndirectDiffuse(irradiance, geometry, material, reflectedLight);
    #endif

    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
    gl_FragColor = vec4(outgoingLight, diffuseColor.a);
    gl_FragColor = linearToOutputTexel( gl_FragColor );
}
`;

