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
