// ClickedPints.js (c) 2012 matsuda
// 顶点着色器
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'void main() {\n' +
    '  gl_Position = a_Position;\n' +
    '  gl_PointSize = 10.0;\n' +
    '}\n';

// 片元着色器
var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
    'void main() {\n' +
    '  gl_FragColor = u_FragColor;\n' +
    '}\n';

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

    // Get the storage location of a_Position
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    /**
     * gl.getUniformLocation(program, name)
     * 获取指定名称的uniform变量的存储位置
     * 参数：
     *  program：指定包含顶点着色器和片元着色器程序对象
     *  name：指定想要获取其存储位置的uniform变量名称
     * 返回值：
     *  non-unll:指定uniform变量的位置
     *  null：指定的uniform变量不存在，或者其命名具有gl_或webgl_前缀
     * 错误：
     *  INVALID_OPERATION:程序对象未能成功连接
     *  INVALID_VALUE：name参数的长度大于attribute变量名的最大长度（默认256字节）
     */
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (u_FragColor < 0) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }

    // Register function (event handler) to be called on a mouse press
    canvas.onmousedown = function(ev){
        click(ev, gl, canvas, a_Position, u_FragColor);
    };

    // Specify the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_points = []; // The array for the position of a mouse press
var g_colors = []; // 存储点颜色的数组
function click(ev, gl, canvas, a_Position, u_FragColor) {
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect() ;

    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
    // Store the coordinates to g_points array
    g_points.push(x);
    g_points.push(y);

    // 将点的颜色储存到数组中
    if (x >= 0.0 && y >= 0.0) {      // First quadrant
        g_colors.push([1.0, 0.0, 0.0, 1.0]);  // Red
    } else if (x < 0.0 && y < 0.0) { // Third quadrant
        g_colors.push([0.0, 1.0, 0.0, 1.0]);  // Green
    } else {                         // Others
        g_colors.push([1.0, 1.0, 1.0, 1.0]);  // White
    }

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_points.length;
    for(var i = 0; i < len; i += 2) {
        // Pass the position of a point to a_Position variable
        gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0);

        /**
         * gl.uniform[1234]f(location, v0, v1, v2, v3);
         * 将数据（v0，v1，v2,v3）传给由location参数指定的uniform变量
         * 参数：
         *    location：指定将要修改的uniform变量的存储位置
         *    v0：指定填充uniform变量第一个分量的值
         *    v1：指定填充uniform变量第二个分量的值
         *    v2：指定填充uniform变量第三个分量的值
         *    v3：指定填充uniform变量第四个个分量的值
         * 返回值：无
         * 错误：
         *    INVALID_OPERATION:程序对象未能成功连接（没有当前program对象），
         *    或者localhost是非法的变量的存储位置
         */
        gl.uniform4f(u_FragColor, g_colors[i/2][0], g_colors[i/2][1], g_colors[i/2][2],g_colors[i/2][3]);

        // Draw
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}
