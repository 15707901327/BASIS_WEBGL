// HelloCanvas.js (c) 2012 matsuda

//顶点着色器程序
var VSHADER_SOURCE =
    'void main() {\n' +
    '  gl_Position = vec4(0.5, 0.0, 0.0, 1.0);\n' + // 设置坐标,必须指定
    '  gl_PointSize = 10.0;\n' +                    // Set the point size （1.0）
    '}\n';

// Fragment shader program
var FSHADER_SOURCE =
    'void main() {\n' +
    '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the point color
    '}\n';

function main() {
    var canvas = document.getElementById('webgl');

    /**获取WebGL绘图上下文
     * 1. getWebGLContext得到上下文，隐藏了canvas.getContext('2d'); 中所需要的参数，因为参数在不同的浏览器中是不同的
     * 2. canvas : 上下文
     * 3. debug ：true **/
    var gl = getWebGLContext(canvas,true);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    //初始化着色器
    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log('Failed to intialize shaders.');
        return;
    }

    //指定清空<canvas> 的颜色
    gl.clearColor(0.0, 0.0, 1.0, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制一个点
    gl.drawArrays(gl.Points,0,1);
}
