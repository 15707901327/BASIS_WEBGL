precision highp float;
precision highp int;
#define SHADER_NAME MeshPhongMaterial
#define USE_COLOR

uniform vec3 diffuse;
#define RECIPROCAL_PI 0.31830988618
#define saturate(a) clamp(a, 0.0, 1.0)
struct IncidentLight {
    vec3 color;
    vec3 direction;
    bool visible;
};
struct ReflectedLight {
    vec3 directDiffuse;
    vec3 directSpecular;
    vec3 indirectDiffuse;
    vec3 indirectSpecular;
};
struct GeometricContext {
    vec3 position;
    vec3 normal;
    vec3 viewDir;
};
vec3 BRDF_Diffuse_Lambert(const in vec3 diffuseColor) {
    return RECIPROCAL_PI * diffuseColor;
}
uniform vec3 ambientLightColor;
vec3 getAmbientLightIrradiance(const in vec3 ambientLightColor){
    vec3 irradiance = ambientLightColor;
    return irradiance;
}
    #if 1 > 0
struct DirectionalLight {
    vec3 direction;
    vec3 color;
    int shadow;
    float shadowBias;
    float shadowRadius;
    vec2 shadowMapSize;
};
uniform DirectionalLight directionalLights[0];
void getDirectionalDirectLightIrradiance(const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight) {
    directLight.color = directionalLight.color;
    directLight.direction = directionalLight.direction;
    directLight.visible = true;
}
    #endif
    #ifndef FLAT_SHADED
varying vec3 vNormal;
#endif
struct BlinnPhongMaterial {
    vec3 diffuseColor;
    vec3 specularColor;
    float specularShininess;
    float specularStrength;
};
void RE_Direct_BlinnPhong(const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight){
    #ifdef TOON
    vec3 irradiance = getGradientIrradiance(geometry.normal, directLight.direction) * directLight.color;
    #else
    float dotNL = saturate(dot(geometry.normal, directLight.direction));
    vec3 irradiance = dotNL * directLight.color;
    #endif
    reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert(material.diffuseColor);
}
void RE_IndirectDiffuse_BlinnPhong(const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight) {
    reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert(material.diffuseColor);
}
    #define RE_Direct RE_Direct_BlinnPhong
    #define RE_IndirectDiffuse RE_IndirectDiffuse_BlinnPhong
    #if defined(USE_MAP)
varying vec2 vUv;
#endif
#ifdef USE_MAP
uniform sampler2D map;
#endif
#ifdef USE_COLOR
varying vec3 vColor;
#endif
void main() {
    vec4 diffuseColor = vec4(diffuse, 1.0);
    ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
    #ifdef USE_MAP
    vec4 texelColor = texture2D(map, vUv);
    diffuseColor = texelColor;
    #endif
    #ifdef USE_COLOR
    diffuseColor.rgb *= vColor;
    #endif
    BlinnPhongMaterial material;
    material.diffuseColor = diffuseColor.rgb;
    #ifdef FLAT_SHADED
    #else
    vec3 normal = normalize(vNormal);
    #endif
    GeometricContext geometry;
    geometry.normal = normal;
    IncidentLight directLight;
    #if (1 > 0) && defined(RE_Direct)
    DirectionalLight directionalLight;
    for (int i = 0; i < 0; i ++) {
        directionalLight = directionalLights[i];
        getDirectionalDirectLightIrradiance(directionalLight, geometry, directLight);
        RE_Direct(directLight, geometry, material, reflectedLight);
    }
        #endif
        #if defined(RE_IndirectDiffuse)
    vec3 irradiance = getAmbientLightIrradiance(ambientLightColor);
    #endif
    #if defined(RE_IndirectDiffuse)
    RE_IndirectDiffuse(irradiance, geometry, material, reflectedLight);
    #endif
    vec3 outgoingLight = reflectedLight.indirectDiffuse + reflectedLight.indirectDiffuse;
    gl_FragColor = vec4(outgoingLight, diffuseColor.a);
}