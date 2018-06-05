var vertexSource =
  "varying vec2 coord;" +
  "void main() {" +
  " coord = gl_Vertex.xy * 0.5 + 0.5;" +
  " gl_Position = vec4(gl_Vertex.xyz, 1.0);" +
  "}";
var fragmentSource =
  "const float PI = 3.141592653589793;" +
  "uniform sampler2D texture;" +
  "uniform vec2 center;" +
  "uniform float radius;" +
  "uniform float strength;" +
  "varying vec2 coord;" +
  "void main() { " +
  " vec4 info = texture2D(texture, coord);" + // get vertex info
  " float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);" + // add the drop to the height
  " drop = 0.5 - cos(drop * PI) * 0.5;" +
  " info.r += drop * strength;" +
  " gl_FragColor = info;" +
  "} ";

var header =
  '\
    uniform mat3 gl_NormalMatrix;\
    uniform mat4 gl_ModelViewMatrix;\
    uniform mat4 gl_ProjectionMatrix;\
    uniform mat4 gl_ModelViewProjectionMatrix;\
    uniform mat4 gl_ModelViewMatrixInverse;\
    uniform mat4 gl_ProjectionMatrixInverse;\
    uniform mat4 gl_ModelViewProjectionMatrixInverse;\
  ';
var vertexHeader =
  "uniform mat3 gl_NormalMatrix;" +
  "uniform mat4 gl_ModelViewMatrix;" +
  "uniform mat4 gl_ProjectionMatrix;" +
  "uniform mat4 gl_ModelViewProjectionMatrix;" +
  "uniform mat4 gl_ModelViewMatrixInverse;" +
  "uniform mat4 gl_ProjectionMatrixInverse;" +
  "uniform mat4 gl_ModelViewProjectionMatrixInverse;" +

  "attribute vec4 gl_Vertex;" +
  "attribute vec4 gl_TexCoord;" +
  "attribute vec3 gl_Normal;" +
  "attribute vec4 gl_Color;" +
  "vec4 ftransform() {" +
  " return gl_ModelViewProjectionMatrix * gl_Vertex;" +
  "}";
var fragmentHeader =
  "precision highp float;" +
  "uniform mat3 gl_NormalMatrix;" +
  "uniform mat4 gl_ModelViewMatrix;" +
  "uniform mat4 gl_ProjectionMatrix;" +
  "uniform mat4 gl_ModelViewProjectionMatrix;" +
  "uniform mat4 gl_ModelViewMatrixInverse;" +
  "uniform mat4 gl_ProjectionMatrixInverse;" +
  "uniform mat4 gl_ModelViewProjectionMatrixInverse;";

// vertexSource + fragmentSource
var source =
  "varying vec2 coord;" +
  "void main() {" +
  " coord = gl_Vertex.xy * 0.5 + 0.5;" +
  " gl_Position = vec4(gl_Vertex.xyz, 1.0);" +
  "}" +
  "const float PI = 3.141592653589793;" +
  "uniform sampler2D texture;" +
  "uniform vec2 center;" +
  "uniform float radius;" +
  "uniform float strength;" +
  "varying vec2 coord;" +
  "void main() {" +
  " vec4 info = texture2D(texture, coord);" + // get vertex info
  " float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);" + // add the drop to the height
  " drop = 0.5 - cos(drop * PI) * 0.5;" +
  " info.r += drop * strength;" +
  " gl_FragColor = info;" +
  "}";