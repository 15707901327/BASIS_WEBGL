var vertexHeader = '\
    uniform mat3 gl_NormalMatrix;\
    uniform mat4 gl_ModelViewMatrix;\
    uniform mat4 gl_ProjectionMatrix;\
    uniform mat4 gl_ModelViewProjectionMatrix;\
    uniform mat4 gl_ModelViewMatrixInverse;\
    uniform mat4 gl_ProjectionMatrixInverse;\
    uniform mat4 gl_ModelViewProjectionMatrixInverse;\
    attribute vec4 gl_Vertex;\
    attribute vec4 gl_TexCoord;\
    attribute vec3 gl_Normal;\
    attribute vec4 gl_Color;\
    vec4 ftransform() {\
      return gl_ModelViewProjectionMatrix * gl_Vertex;\
    }\
  ';
var fragmentHeader = '\
    precision highp float;\
    uniform mat3 gl_NormalMatrix;\
    uniform mat4 gl_ModelViewMatrix;\
    uniform mat4 gl_ProjectionMatrix;\
    uniform mat4 gl_ModelViewProjectionMatrix;\
    uniform mat4 gl_ModelViewMatrixInverse;\
    uniform mat4 gl_ProjectionMatrixInverse;\
    uniform mat4 gl_ModelViewProjectionMatrixInverse;\
  ';

var source =
  "varying vec2 coord;" +
  "void main() {" +
  "   coord = gl_Vertex.xy * 0.5 + 0.5;" +
  "   gl_Position = vec4(gl_Vertex.xyz, 1.0);" +
  "}" +
  "uniform sampler2D texture;" +
  "uniform vec2 delta;" +
  "varying vec2 coord;" +
  "void main() {" +
  /* get vertex info */
  "vec4 info = texture2D(texture, coord);" +
  /* calculate average neighbor height */
  "vec2 dx = vec2(delta.x, 0.0);" +
  "vec2 dy = vec2(0.0, delta.y);" +
  "float average = (" +
  "   texture2D(texture, coord - dx).r +" +
  "   texture2D(texture, coord - dy).r +" +
  "   texture2D(texture, coord + dx).r + " +
  "   texture2D(texture, coord + dy).r" +
  ") * 0.25;" +
  "/* change the velocity to move toward the average */" +
  "info.g += (average - info.r) * 2.0;" +
  "/* attenuate the velocity a little so waves do not last forever */" +
  "info.g *= 0.995;" +
  "/* move the vertex along the velocity */" +
  "info.r += info.g;" +
  "gl_FragColor = info;" +
  "}";


var vertexSource =
  "uniform mat3 LIGHTGLgl_NormalMatrix;" +
  "uniform mat4 LIGHTGLgl_ModelViewMatrix;" +
  "uniform mat4 LIGHTGLgl_ProjectionMatrix;" +
  "uniform mat4 LIGHTGLgl_ModelViewProjectionMatrix;" +
  "uniform mat4 LIGHTGLgl_ModelViewMatrixInverse;" +
  "uniform mat4 LIGHTGLgl_ProjectionMatrixInverse;" +
  "uniform mat4 LIGHTGLgl_ModelViewProjectionMatrixInverse;" +
  "attribute vec4 LIGHTGLgl_Vertex;" +
  "attribute vec4 LIGHTGLgl_TexCoord;" +
  "attribute vec3 LIGHTGLgl_Normal;" +
  "attribute vec4 LIGHTGLgl_Color;" +
  "vec4 ftransform() {" +
  "   return LIGHTGLgl_ModelViewProjectionMatrix * LIGHTGLgl_Vertex;" +
  "}" +
  "varying vec2 coord;" +
  "void main() {" +
  "   coord = LIGHTGLgl_Vertex.xy * 0.5 + 0.5;" +
  "   gl_Position = vec4(LIGHTGLgl_Vertex.xyz, 1.0);" +
  "}";

// dropShader
var fragmentSource =
  "precision highp float;" +
  "uniform mat3 LIGHTGLgl_NormalMatrix;" +
  "uniform mat4 LIGHTGLgl_ModelViewMatrix;" +
  "uniform mat4 LIGHTGLgl_ProjectionMatrix;" +
  " uniform mat4 LIGHTGLgl_ModelViewProjectionMatrix;" +
  "uniform mat4 LIGHTGLgl_ModelViewMatrixInverse;" +
  "uniform mat4 LIGHTGLgl_ProjectionMatrixInverse;" +
  "uniform mat4 LIGHTGLgl_ModelViewProjectionMatrixInverse;" +
  "const float PI = 3.141592653589793; " +
  "uniform sampler2D texture;" +
  "uniform vec2 center;" +
  "uniform float radius;" +
  "uniform float strength;" +
  "varying vec2 coord;" +
  "void main() { " +
  /* get vertex info */
  "   vec4 info = texture2D(texture, coord);" +
  /* add the drop to the height */
  "   float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);" +
  "   drop = 0.5 - cos(drop * PI) * 0.5;" +
  "   info.r += drop * strength;" +
  "   gl_FragColor = info;" +
  "}";

// updateShader
var fragmentSource =
  "precision highp float;" +
  "uniform mat3 LIGHTGLgl_NormalMatrix;" +
  "uniform mat4 LIGHTGLgl_ModelViewMatrix;" +
  "uniform mat4 LIGHTGLgl_ProjectionMatrix;" +
  " uniform mat4 LIGHTGLgl_ModelViewProjectionMatrix;" +
  "uniform mat4 LIGHTGLgl_ModelViewMatrixInverse;" +
  "uniform mat4 LIGHTGLgl_ProjectionMatrixInverse;" +
  "uniform mat4 LIGHTGLgl_ModelViewProjectionMatrixInverse;" +
  '\
    uniform sampler2D texture;\
    uniform vec2 delta;\
    varying vec2 coord;\
    void main() {\
      /* get vertex info */\
      vec4 info = texture2D(texture, coord);\
      \
      /* calculate average neighbor height */\
      vec2 dx = vec2(delta.x, 0.0);\
      vec2 dy = vec2(0.0, delta.y);\
      float average = (\
        texture2D(texture, coord - dx).r +\
        texture2D(texture, coord - dy).r +\
        texture2D(texture, coord + dx).r +\
        texture2D(texture, coord + dy).r\
      ) * 0.25;\
      \
      /* change the velocity to move toward the average */\
      info.g += (average - info.r) * 2.0;\
      \
      /* attenuate the velocity a little so waves do not last forever */\
      info.g *= 0.995;\
      \
      /* move the vertex along the velocity */\
      info.r += info.g;\
      \
      gl_FragColor = info;\
    }\
  ';

// normalShader
var fragmentSource =
  "precision highp float;" +
  "uniform mat3 LIGHTGLgl_NormalMatrix;" +
  "uniform mat4 LIGHTGLgl_ModelViewMatrix;" +
  "uniform mat4 LIGHTGLgl_ProjectionMatrix;" +
  " uniform mat4 LIGHTGLgl_ModelViewProjectionMatrix;" +
  "uniform mat4 LIGHTGLgl_ModelViewMatrixInverse;" +
  "uniform mat4 LIGHTGLgl_ProjectionMatrixInverse;" +
  "uniform mat4 LIGHTGLgl_ModelViewProjectionMatrixInverse;" +
'\
    uniform sampler2D texture;\
    uniform vec2 delta;\
    varying vec2 coord;\
    void main() {\
      /* get vertex info */\
      vec4 info = texture2D(texture, coord);\
      \
      /* update the normal */\
      vec3 dx = vec3(delta.x, texture2D(texture, vec2(coord.x + delta.x, coord.y)).r - info.r, 0.0);\
      vec3 dy = vec3(0.0, texture2D(texture, vec2(coord.x, coord.y + delta.y)).r - info.r, delta.y);\
      info.ba = normalize(cross(dy, dx)).xz;\
      \
      gl_FragColor = info;\
    }\
  '
// sphereShader
var fragmentSource =
  "precision highp float;" +
  "uniform mat3 LIGHTGLgl_NormalMatrix;" +
  "uniform mat4 LIGHTGLgl_ModelViewMatrix;" +
  "uniform mat4 LIGHTGLgl_ProjectionMatrix;" +
  " uniform mat4 LIGHTGLgl_ModelViewProjectionMatrix;" +
  "uniform mat4 LIGHTGLgl_ModelViewMatrixInverse;" +
  "uniform mat4 LIGHTGLgl_ProjectionMatrixInverse;" +
  "uniform mat4 LIGHTGLgl_ModelViewProjectionMatrixInverse;" +
  '\
   uniform sampler2D texture;\
   uniform vec3 oldCenter;\
   uniform vec3 newCenter;\
   uniform float radius;\
   varying vec2 coord;\
   \
   float volumeInSphere(vec3 center) {\
     vec3 toCenter = vec3(coord.x * 2.0 - 1.0, 0.0, coord.y * 2.0 - 1.0) - center;\
     float t = length(toCenter) / radius;\
     float dy = exp(-pow(t * 1.5, 6.0));\
     float ymin = min(0.0, center.y - dy);\
     float ymax = min(max(0.0, center.y + dy), ymin + 2.0 * dy);\
     return (ymax - ymin) * 0.1;\
   }\
   \
   void main() {\
     /* get vertex info */\
     vec4 info = texture2D(texture, coord);\
     \
     /* add the old volume */\
     info.r += volumeInSphere(oldCenter);\
     \
     /* subtract the new volume */\
     info.r -= volumeInSphere(newCenter);\
     \
     gl_FragColor = info;\
   }\
 ';

