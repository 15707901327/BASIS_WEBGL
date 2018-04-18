/**
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
gl.drawArrays(mode, first, count);

// 变量的相关方法
// attribute变量相关方法
/**
 * 获取由name参数指定的attribute变量的存储位置
 * 参数：
 *    gl.program：指定包含顶点着色器和片元着色器的着色器程序对象。
 *    name：指定想要获取其存储地址的attribute变量的名称
 * 返回值：
 *    大于等于0：attribute变量的存储地址
 *    -1：指定的attribute变量不存在，或者其命名具有gl_或webgl_前缀
 * 错误：
 *    INVALID_OPERATION:程序对象未能成功连接
 *    INVALID_VALUE：name参数的长度大于attribute变量名的最大长度（默认256字节）
 */
gl.getAttribLocation(gl.program, name);

/**
 * 将数据（v0，v1，v2）传给由location参数指定的attribute变量
 * 参数：
 *    location：指定将要修改的attribute变量的存储位置
 *    v0：指定填充attribute变量第一个分量的值
 *    v1：指定填充attribute变量第二个分量的值
 *    v2：指定填充attribute变量第三个分量的值
 *    v3：指定填充attribute变量第四个个分量的值
 * 返回值：无
 * 错误：
 *    INVALID_OPERATION:程序对象未能成功连接（没有当前program对象）
 *    INVALID_VALUE：location大于等于attribute变量名的最大数目（默认为8）
 * 说明：
 *    vertexAttrib1f：v1，v2默认0.0, v3默认1.0
 *    vertexAttrib2f：v2默认0.0, v3默认1.0
 *    vertexAttrib3f：v3默认1.0
 * 矢量方法：
 *    gl.vertexAttrib1fv(location,Float32Array);
 *    gl.vertexAttrib4fv(location,Float32Array);
 *    实例：
 *      var position = new Float32Array([0.0,0.0,0.0,1.0]);
 *      gl.vertexAttrib4fv(a_Position, position);
 */
gl.vertexAttrib1f(location, v0);
gl.vertexAttrib2f(location, v0, v1);
gl.vertexAttrib3f(location, v0, v1, v2);
gl.vertexAttrib4f(location, v0, v1, v2, v3);

// uniform变量相关方法
/**
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
gl.getUniformLocation(program, name);
/**
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
gl.uniform[1234]f(location, v0, v1, v2, v3);