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
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';
/**
 * 函数的执行流程
 * 1.获取canvas元素
 * 2.获取WebGL绘图的上下文
 * 3.设置点的坐标信息
 * 4.设置背景色
 * 5.清空<canvas>
 * 6.绘制
 */
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

    // 设置顶点的位置
    var n = initVertexBuffers(gl);
    if(n < 0){
        console.log('Failed to set the positions of the vertices');
        return;
    }

    // Specify the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, n);
}

/**
 * 创建顶点缓存区对象，并将多个顶点的数据保存在缓存区中，然后将缓存区传递给着色器。
 * @param gl：上下文
 * @returns {number}：顶点的个数
 */
function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);
    var n = 3; // 点的个数

    /**
     * gl.createBuffer()
     * 1.创建缓存区对象
     * 返回值：
     *  非null：新创建的缓存区对象
     *  null：创建缓存区对象失败
     */
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
        console.log('Failed to create the buffer object');
        return -1;
    }

    /**
     * gl.bindBuffer(target, buffer);
     * 允许使用buffer表示的缓存区对象并将其绑定到target表示的目标上
     * 参数：
     *  target：
     *      gl.ARRAY_BUFFER：表示缓存区对象中包含来顶点的数据
     *      gl.ELEMENT_ARRAY_BUFFER:表示缓存区对象中包含了顶点的索引值
     *          "OpenGL ES着色器语言[GLSL ES]"
     *  buffer:指定之前🈶️由gl.createBuffer()返回的待绑定的缓存区对象，
     *      如果指定为空，则禁用对target的绑定
     * 返回值：无
     * 错误：INVALID_ENUM target不是上诉值之一，这时将保持原有的绑定情况不变
     */
    // 2.将缓存区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    /**
     * gl.bufferData(target, data, usage)
     * 开辟存储空间，向绑定在target上的缓存区对象中写入数据data
     * 参数：
     *  target：gl.ARRAY_BUFFER或gl.ELEMENT_ARRAY_BUFFER
     *  data:写入缓存区对象的数据（类型化数组）
     *  usage：表示程序将如何使用缓存存储在缓存区对象中的数据。该参数
     *      将帮组WebGL优化操作，但是就算你传入了错误的值，也不会终止
     *      程序（仅仅是降低程序的效率）
     *      gl.STATIC_DRAW：只会向缓存区对象中写入一次数据，但需要绘制很多次
     *      gl.STREAM_DRAM:只会向缓存区对象中写入一次数据，然后绘制若干次
     *      gl.DYNAMIC_DRAM:会向缓存区对象中多次写入数据，并绘制很多次
     * 返回值：无
     * 错误：
     *  INVALID_ENUM:target不是上述值之一，这时将保持原有的绑定情况不变
     */
    // 3.向缓存区对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Get the storage location of a_Position
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    // 4.将缓存区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0 );

    // 5.连接a_Position变量与分配给它的缓存区对象
    gl.enableVertexAttribArray(a_Position);

    return n;
}
