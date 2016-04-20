// RotatedTriangle_Matrix.js (c) matsuda
// Vertex shader program
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
    'void main() {\n' +
    '  gl_Position = u_ModelMatrix * a_Position;\n' +
    '}\n';

// Fragment shader program
var FSHADER_SOURCE =
    'void main() {\n' +
    '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
    '}\n';

// The rotation angle
var ANGLE = 90.0;
//旋转速度
var ANGLE_STEP = 45.0;

function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    // Write the positions of vertices to a vertex shader
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }

    // Specify the color for clearing <canvas>
    gl.clearColor(0, 0, 0, 1);

    // Get storage location of u_ModelMatrix
    var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if (!u_ModelMatrix) {
        console.log('Failed to get the storage location of u_ModelMatrix');
        return;
    }

    /** 创建矩阵
     * 1.为旋转矩阵创建 Mactrix4 对象
     * 2.设置矩阵类型 */
    //var xformMatrix = new Matrix4();
    ////旋转矩阵
    ////xformMatrix.setRotate(ANGLE,0,0,1);
    ////平移矩阵
    //xformMatrix.setTranslate(0.5,0.5,0.0);
    //gl.uniformMatrix4fv(u_ModelMatrix, false, xformMatrix.elements);
    /** 创建矩阵 ***************************************************************************/

    /** 创建模型矩阵
     * 1.创建 Mactrix4 对象进行模型变换
     * 2.计算模型矩阵
     * 3.设置模型矩阵为旋转矩阵
     * 4.将模型矩阵乘以平移矩阵 */
    //var modelMatrix = new Matrix4();
    //
    //var ANGLE = 60.0;//旋转角
    //var Tx = 0.5;// 平移距离
    //
    //modelMatrix.setRotate(ANGLE,0,0,1);
    //modelMatrix.translate(Tx,0.0,0.0);
    //
    //gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    /** 创建矩阵 ***************************************************************************/

    //三角形当前的旋转角度
    var currentAngle = 0.0;
    var modelMatrix = new Matrix4();

    //开始绘制三角形
    var tick = function() {
        currentAngle = animate(currentAngle);  // Update the rotation angle
        draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix);   // Draw the triangle
        requestAnimationFrame(tick, canvas); // Request that the browser ?calls tick
    };
    tick();
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array ([
        0, 0.5,   -0.5, -0.5,   0.5, -0.5
    ]);
    var n = 3;   // The number of vertices

    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Assign the buffer object to a_Position variable
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    return n;
}



function draw(gl, n,currentAngle, modelMatrix, u_ModelMatrix){
    //设置旋转矩阵
    modelMatrix.setRotate(currentAngle,0,0,1);
    modelMatrix.translate(0.85, 0, 0);
    //将旋转矩阵传输给顶点着色器
    gl.uniformMatrix4fv( u_ModelMatrix,false, modelMatrix.elements);
    //清除<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制三角形
    gl.drawArrays(gl.TRIANGLES,0,n);
}

//记录上一次调用函数的时刻
var g_last = Date.now();

function animate(angle){
    //计算距离上次调用经过多长时间
    var now = Date.now();
    var elapsed = now - g_last;
    g_last = now;
    //根据距离上次调用的时间，更新当前旋转角度
    var newAngle = angle + (ANGLE_STEP * elapsed)/1000.0;
    return newAngle %= 360;
}


