var VERTEX_SHADER =
    "attribute vec4 a_Position;\n" +
    "uniform mat4 u_modelMatrix;\n" +
    "void main(){\n" +
    "   gl_Position = u_modelMatrix * a_Position;\n" +
    "}";
var FRAGMENT_SHADER =
    "void main(){\n" +
    "   gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" +
    "}";

function main() {
    var canvas = document.getElementById('webgl');

    var gl = canvas.getContext("webgl");
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

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

    var a_Position = gl.getAttribLocation(progrom, "a_Position");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    var modelMatrix = new Matrix4();
    var u_modelMatrix = gl.getUniformLocation(progrom, "u_modelMatrix");

    // 一秒旋转的度数
    var ANGLE_STEP = 45.0;
    var g_last = Date.now();

    var currentAngle = 0.0;
    var tick = function () {
        currentAngle = animate(currentAngle);

        draw(gl, 3, currentAngle, modelMatrix, u_modelMatrix);

        requestAnimationFrame(tick);
    };

    tick();

    function animate(angle) {
        var now = Date.now();
        var elapsed = now - g_last;
        g_last = now;

        var newAngle = angle + (ANGLE_STEP * elapsed) / 1000;
        return newAngle %= 360;
    }

    function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
        // 设置当前的旋转角度
        modelMatrix.setRotate(currentAngle, 0, 0, 1);

        gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

        // Clear <canvas>
        gl.clear(gl.COLOR_BUFFER_BIT);

        // 绘制三角形
        gl.drawArrays(gl.TRIANGLES, 0, n);
    }
}

window.onload = function (ev) {
    // main();

    // 获取<canvas>元素
    var canvas = document.getElementById('webgl');

    var webGlRenderer = new PGL.WebGLRenderer({
        canvas: canvas
    });
    webGlRenderer.setClearColor(new PGL.Color(0, 0, 0), 1);
    var gl = webGlRenderer.getContext();

    var scene = new PGL.Scene();

    var bufferGeometry = new PGL.BufferGeometry();

    var positions = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    bufferGeometry.addAttribute('position', new PGL.Float32BufferAttribute(positions, 2));

    var meshPhongMaterial = new PGL.MeshPhongMaterial({
        color: new PGL.Color(1, 0, 0)
    });

    var mesh = new PGL.Mesh(bufferGeometry, meshPhongMaterial);
    scene.add(mesh);

    function tick(){
        mesh.rotateZ(Math.PI / 4);
        webGlRenderer.render(scene);

        requestAnimationFrame(tick);
    }

    tick();
};