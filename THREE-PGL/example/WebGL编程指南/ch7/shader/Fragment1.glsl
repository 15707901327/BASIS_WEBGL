precision highp float;
precision highp int;

#define HIGH_PRECISION
#define SHADER_NAME MeshBasicMaterial
#define GAMMA_FACTOR 2

uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;

uniform float toneMappingExposure;
uniform float toneMappingWhitePoint;

vec4 LinearToLinear( in vec4 value ) {
    return value;
}
vec4 linearToOutputTexel( vec4 value ) { return LinearToLinear( value ); }

struct ReflectedLight {
    vec3 directDiffuse;
    vec3 directSpecular;
    vec3 indirectDiffuse;
    vec3 indirectSpecular;
};

uniform vec3 diffuse;
uniform float opacity;

varying vec3 vColor;
void main() {
    vec4 diffuseColor = vec4( diffuse, opacity );
    diffuseColor.rgb *= vColor;

    float specularStrength;
    specularStrength = 1.0;

    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
    reflectedLight.indirectDiffuse += vec3( 1.0 );
    reflectedLight.indirectDiffuse *= diffuseColor.rgb;

    vec3 outgoingLight = reflectedLight.indirectDiffuse;

    gl_FragColor = vec4( outgoingLight, diffuseColor.a );
    gl_FragColor = linearToOutputTexel( gl_FragColor );
}