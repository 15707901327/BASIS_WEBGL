var VERTEX_SHADER =
    "attribute vec4 a_Position;\n" +
    "attribute float a_PointSize;\n" +
    "attribute vec4 a_Color;\n" +
    "varying vec4 v_Color;\n" +
    "void main(){\n" +
    "   gl_Position = a_Position;\n" +
    "   gl_PointSize = a_PointSize;\n" +
    "   v_Color = a_Color;\n" +
    "}";
var FRAGMENT_SHADER =
    "precision mediump float;\n" +
    "varying vec4 v_Color;\n" +
    "void main(){\n" +
    "   gl_FragColor = v_Color;\n" +
    "}";

window.onload = function (ev) {
    var cancas = document.getElementById('webgl');

    var gl = cancas.getContext('webgl');
    gl.clearColor(0.0, 0.0, 0.0, 1);

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

    var vertexSizes = new Float32Array([
        0.5, 0.5, 5.0, 1.0, 0.0, 0.0,
        -0.5, 0.5, 10.0, 0.0, 1.0, 0.0,
        0.5, -0.5, 15.0, 0.0, 0.0, 1.0
    ]);
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexSizes, gl.STATIC_DRAW);

    var FSIZE = vertexSizes.BYTES_PER_ELEMENT;
    var a_Position = gl.getAttribLocation(progrom, "a_Position");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 6, 0);
    gl.enableVertexAttribArray(a_Position);

    var a_PointSize = gl.getAttribLocation(progrom, 'a_PointSize');
    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 6, FSIZE * 2);
    gl.enableVertexAttribArray(a_PointSize);

    var a_Color = gl.getAttribLocation(progrom, "a_Color");
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
    gl.enableVertexAttribArray(a_Color);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
};