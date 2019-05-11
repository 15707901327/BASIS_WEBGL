var VSHADER_SOURCE =
    "attribute vec4 a_Position;\n" +
    "uniform vec4 u_pos;\n" +
    "void main() {\n" +
    " gl_Position = a_Position + u_pos;\n" +
    "}";
var FSHADER_SOURCE =
    "void main(){\n" +
    " gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" +
    "}";

function main() {
    var canvas = document.getElementById("webgl");
    var gl = canvas.getContext('webgl');

    gl.clearColor(1.0, 1.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var vert = PGL.WebGLShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
    var fragment = PGL.WebGLShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);

    var program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.useProgram(program);

    var a_Position = gl.getAttribLocation(program, "a_Position");

    var vectex = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vectex, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    var u_pos = gl.getUniformLocation(program, "u_pos");
    gl.uniform4f(u_pos, 1.0, 1.0, 1.0, 1.0);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}