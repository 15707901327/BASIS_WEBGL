/**
 * 函数的执行流程
 * 1.获取canvas元素
 * 2.获取WebGL绘图的上下文
 * 3.设置背景色
 * 4.清空<canvas>
 */
function main() {
    // 获取<canvas>元素
    var canvas = document.getElementById('webgl');

    /**
     * 获取WebGL绘图上下文
     * 说明：在获取WebGL绘图上下文时，canvas.getContext()函数接收的参数，在不同的浏览器中会不同，
     *  所以使用getWebGLContext()来隐藏不同浏览器之间的差异。
     * getWebGLContext（element,[,debug]）
     * 获取WebGL绘图的上下文，如果开启来debug属性，遇到错误时将在控制台显示错误消息
     * 参数：
     *  element:指定<canvas>元素
     *  debug：可选，如果设置为true，JavaScript中发生的错误将被显示在控制台上，注意，在调试结束后关闭它，
     *      否则会影响性能。
     * 返回值：
     *  non-null：WebGL绘图上下文
     *  null：WebGL不可用
     */
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    /**
     * gl.clearColor(red,green,blue,alpha)
     * 指定绘图区域的背景色
     * 参数：
     *  red：指定红色值（从0.0到1.0）
     *  green：指定绿色值（从0.0到1.0）
     *  blue：指定蓝色值（从0.0到1.0）
     *  alpha：指定透明度值（从0.0到1.0）
     *  如果任何值小于0.0大于1.0，那么就会分别截断为0.0或1.0
     * 返回值：无
     * 说明：
     *  一旦指定背景颜色之后，背景颜色就会被驻存在WebGL系统（WebGL System）中，在下一次调用方法
     *  之前不会改变（只需要要设置一次）。
     */
    gl.clearColor(0.5, 0.5, 0.5, 1.0);

    /**
     * 用之前指定的背景色清空绘图（即用背景色填充，擦除已经绘制的内容）区域，如果没有指定，则使用默认值
     * gl.clear(buffer)
     * 将指定缓存区设定为预定的值。如果清空是颜色缓存区，那么将使用gl.clearColor()指定的值
     * （作为预定值）
     * 参数：
     *  buffer：指定待清空的缓存区，位操作符OR(|)可用来指定多个缓存区
     *      gl.COLOR_BUFFER_BIT：指定颜色缓存区
     *      gl.DEPTH_BUFFER_BIT：指定深度缓存区
     *      gl.STENCIL_BUFFER_BIT：指定模版缓存区
     * 返回值：无
     * 错误：
     *  INVALID_VALUE：缓存区不是以上三种类型
     */
    gl.clear(gl.COLOR_BUFFER_BIT);
}
