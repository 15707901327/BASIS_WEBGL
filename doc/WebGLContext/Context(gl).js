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
 * 说明：一旦指定背景颜色之后，背景颜色就会被驻存在WebGL系统（WebGL System）中，在下一次调用方法
 *  之前不会改变（只需要要设置一次）。
 */
gl.clearColor(red,green,blue,alpha);

/**
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
gl.clear(buffer);

/**
 * gl.drawArrays(mode, first, count)
 * 执行顶点着色器，按照mode参数指定的方式绘制图形
 * 参数：
 *  mode：指定绘制的方式，可以接收一下常量符号：gl_POINTS,
 *    gl_LINES,gl_LINE_STRIP,gl_LINE_LOOP,gl_TRIANGLES,gl_TRIANGLE_STRIP,
 *    gl_TRIANGLE_FAN
 *  first:指定从那个顶点开始绘制
 *  count：指定绘制需要用到多少个顶点（整形数）
 * 返回值：无
 * 错误：
 *  INVALID_ENUM：传入的mode参数不是前述参数之一
 *  INVALID_VALUE：参数first或count是负数
 */
gl.drawArrays(mode, first, count)