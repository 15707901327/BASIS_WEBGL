var VERTEX_SHADER =
    "attribute vec4 a_Position;\n" +
    "uniform vec2 u_CosBSinB;\n" +
    "void main(){\n" +
    '  gl_Position.x = a_Position.x * u_CosBSinB.x - a_Position.y * u_CosBSinB.y;\n' +
    '  gl_Position.y = a_Position.x * u_CosBSinB.y + a_Position.y * u_CosBSinB.x;\n' +
    '  gl_Position.z = a_Position.z;\n' +
    '  gl_Position.w = 1.0;\n' +
    "}";
var FRAGMENT_SHADER =
    "void main(){\n" +
    " gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" +
    "}";

var ANGLE = 45.0;

function main() {
    var canvas = document.getElementById("webgl");
    var gl = canvas.getContext("webgl");

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, VERTEX_SHADER);
    gl.compileShader(vertexShader);

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, FRAGMENT_SHADER);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);


    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]), gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    var radian = Math.PI * ANGLE / 180.0;
    var cosB = Math.cos(radian);
    var sinB = Math.sin(radian);
    var u_CosBSinB = gl.getUniformLocation(program, "u_CosBSinB");
    gl.uniform2f(u_CosBSinB, cosB, sinB);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

window.onload = function (ev) {
    // main();

    // 获取<canvas>元素
    var canvas = document.getElementById('webgl');

    var webGlRenderer = new PGL.WebGLRenderer({
        canvas: canvas
    });
    webGlRenderer.setClearColor(new PGL.Color(0, 0, 0), 1);

    var scene = new PGL.Scene();

    var bufferGeometry = new PGL.BufferGeometry();

    var positions = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    bufferGeometry.addAttribute('position', new PGL.Float32BufferAttribute(positions, 2));

    var meshPhongMaterial = new PGL.MeshPhongMaterial({
        color: new PGL.Color(1, 0, 0)
    });

    var mesh = new PGL.Mesh(bufferGeometry, meshPhongMaterial);
    // mesh.rotateZ(ANGLE / 180 * Math.PI);
    scene.add(mesh);

    webGlRenderer.render(scene);
};