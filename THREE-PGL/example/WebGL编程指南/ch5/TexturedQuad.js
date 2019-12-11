// var VSHADER_SOURCE =
//   'attribute vec4 a_Position;\n' +
//   'attribute vec2 a_TexCoord;\n' +
//   'varying vec2 v_TexCoord;\n' +
//   'void main() {\n' +
//   '  gl_Position = a_Position;\n' +
//   '  v_TexCoord = a_TexCoord;\n' +
//   '}\n';

var VSHADER_SOURCE =
    'precision highp float;\n' +
    'precision highp int;\n' +
    '#define SHADER_NAME MeshPhongMaterial\n' +
    '#define USE_MAP\n' +
  'attribute vec4 position;\n' +
  'attribute vec2 uv;\n' +
    '#if defined(USE_MAP)\n' +
    '   varying vec2 vUv;\n' +
    '#endif\n' +
  'void main() {\n' +
    '  gl_Position = position;\n' +
    '   #if defined( USE_MAP )\n' +
    '       vUv = uv;\n' +
    '   #endif\n' +
  '}\n';

// Fragment shader program 片元着色器
// var FSHADER_SOURCE =
//   '#ifdef GL_ES\n' +
//   'precision mediump float;\n' +
//   '#endif\n' +
//   'uniform sampler2D u_Sampler;\n' +
//   'varying vec2 v_TexCoord;\n' +
//   'void main() {\n' +
//   '  gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
//   '}\n';

// Fragment shader program 片元着色器
var FSHADER_SOURCE =
    'precision highp float;\n' +
    'precision highp int;\n' +
    '#define SHADER_NAME MeshPhongMaterial\n' +
    '#ifdef USE_MAP\n' +
    '   uniform sampler2D map;\n' +
    '#endif\n' +
    '#define USE_MAP\n' +
    'uniform vec3 diffuse;\n' +
  'uniform sampler2D map;\n' +
    '#if defined( USE_MAP )\n' +
    '   varying vec2 vUv;\n' +
    '#endif\n' +
  'void main() {\n' +
    '   vec4 diffuseColor = vec4(0.0,1.0,1.0,1.0);\n' +
    '   #ifdef USE_MAP\n' +
    '       vec4 texelColor = texture2D( map, vUv );\n' +
    '       diffuseColor = texelColor;\n' +
    '   #endif\n' +
  '     gl_FragColor = diffuseColor;\n' +
  '}\n';

function main(){
    var canvas = document.getElementById('webgl');
    var gl = canvas.getContext('webgl');

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, VSHADER_SOURCE);
    gl.compileShader(vertexShader);

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, FSHADER_SOURCE);
    gl.compileShader(fragmentShader);

    var progrom = gl.createProgram();
    gl.attachShader(progrom, vertexShader);
    gl.attachShader(progrom, fragmentShader);
    gl.linkProgram(progrom);
    gl.useProgram(progrom);

    var verticesTexCoords = new Float32Array([
        // 顶点坐标，纹理坐标
        -0.5,  0.5,   0.0, 1.0,
        -0.5, -0.5,  0.0, 0.0,
        0.5,  0.5,   1.0, 1.0,
        0.5, -0.5,   1.0, 0.0
    ]);
    var vertexTexCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);

    var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
    var a_Position = gl.getAttribLocation(progrom, "position");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
    gl.enableVertexAttribArray(a_Position);

    var a_TexCoord = gl.getAttribLocation(progrom, "uv");
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
    gl.enableVertexAttribArray(a_TexCoord);

    var texture = gl.createTexture();
    var u_Sampler = gl.getUniformLocation(progrom, "map");
    var image = new Image();
    image.onload = function () {

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);//对纹理图像进行y轴反转
        // 开启0号纹理单元
        gl.activeTexture(gl.TEXTURE0);
        // 向target绑定纹理对象
        gl.bindTexture(gl.TEXTURE_2D, texture);

        /**配置纹理参数 CLAMP_TO_EDGE  ：纹理外填充了最边缘纹理颜色 MIRRORED_REPEAT：重复贴图**/
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        // 配置纹理图像
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        // 将纹理单元编号传递给取样器
        gl.uniform1i(u_Sampler, 0);

        gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);//绘制矩形
    };
    image.src = '../resources/sky.jpg';
    // image.src = '../resources/parasol.jpg';
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

    var positions = new Float32Array([
        -0.5, 0.5, 0.0,
        -0.5, -0.5, 0.0,
        0.5, 0.5, 0.0,
        0.5, -0.5, 0.0
    ]);
    var uvs = new Float32Array([
        0.0, 1.0,
        0.0, 0.0,
        1.0, 1.0,
        1.0, 0.0
    ]);
    bufferGeometry.addAttribute('position', new PGL.Float32BufferAttribute(positions, 3));
    bufferGeometry.addAttribute('uv', new PGL.Float32BufferAttribute(uvs, 2));

    var meshPhongMaterial = new PGL.MeshPhongMaterial();
    var textureLoader = new PGL.TextureLoader();
    textureLoader.load('../resources/parasol.jpg',function (texture) {
        texture.minFilter = PGL.LinearFilter;
        meshPhongMaterial.map = texture;
        meshPhongMaterial.needsUpdate = true;
    });

    var mesh = new PGL.Mesh(bufferGeometry, meshPhongMaterial);
    mesh.drawMode = PGL.TriangleStripDrawMode;
    scene.add(mesh);

    var ANGLE_STEP = 45;

    var g_last = Date.now();

    var currentAngle = 0.0;
    function tick(){
        requestAnimationFrame(tick);

        // currentAngle = animate(currentAngle);
        // mesh.rotateZ(currentAngle * Math.PI / 180);

        webGlRenderer.render(scene);
    }

    function animate(angle) {
        var now = Date.now();
        var elapsed = now - g_last;
        g_last = now;

        var newAngle = (ANGLE_STEP * elapsed) / 1000;
        return newAngle %= 360;
    }

    tick();
};