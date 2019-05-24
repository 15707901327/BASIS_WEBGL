var VERTEX_SHADER =
    "attribute vec4 a_position;\n" +
    "uniform mat4 u_xformMatrix;\n" +
    "void main(){\n" +
    "   gl_Position = u_xformMatrix * a_position;\n" +
    "}";
var FRAGMENT_SHADER =
    "void main(){\n" +
    "   gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" +
    "}";

var ANGLE  = 45;
function main() {
    var canvas = document.getElementById('webgl');

    var gl = canvas.getContext("webgl");

    var vertex_shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertex_shader, VERTEX_SHADER);
    gl.compileShader(vertex_shader);

    var fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragment_shader, FRAGMENT_SHADER);
    gl.compileShader(fragment_shader);

    var progrom = gl.createProgram();
    gl.attachShader(progrom, vertex_shader);
    gl.attachShader(progrom, fragment_shader);
    gl.linkProgram(progrom);
    gl.useProgram(progrom);

    var vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_position = gl.getAttribLocation(progrom, "a_position");
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_position);

    var xformMatrix = new Matrix4();
    xformMatrix.setRotate(ANGLE, 0, 0, 1);

    // var xformMatrix = new PGL.Matrix4();
    // xformMatrix.makeRotationAxis(new PGL.Vector3(0, 0, 1), ANGLE / 180 * Math.PI);

    var u_xformMatrix = gl.getUniformLocation(progrom, "u_xformMatrix");
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

window.onload = function (ev) {
    main();
};