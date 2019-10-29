// Author:@yonechen
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 获取随机向量
vec2 random_perlin(vec2 st){
    st = vec2(dot(st, vec2(127.1, 311.7)), dot(st, vec2(265.4, 133.6)));
    return -1. + 2.0*fract(sin(st)*43758.5453123);
}

// 获取随机向量演变
float random_value(vec2 st) {
    float h = dot(st, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// 梯度噪声算法
float noise_perlin (vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = dot(random_perlin(i), f);
    float b = dot(random_perlin(i + vec2(1., 0.)), f - vec2(1., 0.));
    float c = dot(random_perlin(i + vec2(0., 1.)), f - vec2(0., 1.));
    float d = dot(random_perlin(i + vec2(1., 1.)), f - vec2(1., 1.));

    vec2 u = smoothstep(0., 1., f);

    // Mix 4 coorners percentages
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// 梯度噪声演变
float noise_value (vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random_value(i);
    float b = random_value(i + vec2(1, 0));
    float c = random_value(i + vec2(0, 1));
    float d = random_value(i + vec2(1, 1));

    vec2 u = smoothstep(0.0, 1.0, f);

    // Mix 4 coorners percentages
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// 噪声
float noise(vec2 p) {
    return noise_value(p);
}

// 分形布朗运动算法：fbm = noise(st) + 0.5 * noise(2*st) + 0.25 * noise(4*st)
float fbm(in vec2 p){
    float f = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
        f += a * noise(p);
        p = 2.0 * p;
        a *= 0.5;
    }
    return f;
}

// 翘曲域算法：f(p) = fbm( p + fbm( p + fbm( p ) ) )
float pattern(in vec2 p){
    vec2 q = vec2(fbm(p), fbm(p));
    vec2 r = vec2(fbm(p + 1.0*q + 0.126*u_time), fbm(p + 1.0*q + 0.15*u_time));
    return fbm(p + 1.0*r);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy*3.0;
    float n = pattern(st)*0.5+0.5;

    vec3 color = mix(vec3(0.101961, 0.619608, 0.666667), vec3(0.666667, 0.666667, 0.498039), clamp((n)*4.0, 0.0, 1.0));

    color = mix(color, vec3(0, 0, 0.164706), clamp((n)*2.0, 0.0, 1.0));

    color = mix(color, vec3(0.666667, 1, 1), clamp((n*n*n)*1.0, 0.0, 1.0));

    gl_FragColor = vec4(n*color, 1.);
    // gl_FragColor = vec4(n,n,n,1.0);
}