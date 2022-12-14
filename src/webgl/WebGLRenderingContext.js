/**
 * 上下文类
 */
class WebGLRenderingContext {
	
	constructor(){}
	
	/**
	 * 将定义好的WebGLProgram 对象添加到当前的渲染状态中。
	 * @param program {WebGLProgram} 指定待使用的程序对象
	 */
	useProgram(program){}
	
	/**
	 * 用来设置视口，即指定从标准设备到窗口坐标的 x、y 仿射变换。
	 * 设置gl.drawArrays()和gl.drawElements()函数的绘图区域。在canvas上绘图时，x和y就是canvas中的坐标
	 * @param x {GLint} 用来设定视口的左下角水平坐标。默认值：0。
	 * @param y {GLint} 用来设定视口的左下角垂直坐标。默认值：0。
	 * @param width {GLsizei} 用来设定视口的宽度。默认值：canvas 的宽度。
	 * @param height {GLsizei} 用来设定视口的高度。默认值：canvas 的高度。
	 */
	viewport(x,y,width,height){}
	
	/**
	 * 执行着色器，按照mode参数指定的方式，根据绑定到gl.ELEMENT_ARRAY_BUFFER的缓存区中的顶点索引值绘制图形。
	 * 异常:
	 * 如果 mode 不是正确值， gl.INVALID_ENUM 将会抛出错误异常。
	 * 如果 offset 不是给定类型大小的有效倍数，gl.INVALID_OPERATION 将会抛出错误异常。
	 * 如果 count 是负的， gl.INVALID_VALUE 将会抛出错误异常。
	 * @param mode {enum} 指定绘制的方式:
	 * 	gl.POINTS: 画单独的点。
	 * 	gl.LINE_STRIP: 画一条直线到下一个顶点。
	 * 	gl.LINE_LOOP: 绘制一条直线到下一个顶点，并将最后一个顶点返回到第一个顶点。
	 * 	gl.LINES: 在一对顶点之间画一条线。
	 * 	gl.TRIANGLE_STRIP,
	 * 	gl.TRIANGLE_FAN.
	 * 	gl.TRIANGLES, 为一组三个顶点绘制一个三角形。
	 * @param count {int} 指定要渲染的元素数量。
	 * @param type {enum} 指定元素数组缓冲区中的值的类型。可能的值是：
	 *   gl.UNSIGNED_BYTE  对应格式：Uint8Array
	 *   gl.UNSIGNED_SHORT 对应格式：Uint16Array
	 *   当使用 OES_element_index_uint (en-US) 扩展时：
	 *   gl.UNSIGNED_INT   对应格式：Uint32Array
	 *
	 * @param offset {int} 字节单位 指定元素数组缓冲区中的偏移量。必须是给定类型大小的有效倍数。
	 *
	 * @return {None}
	 */
	drawElements(mode, count, type, offset){}
	
	/**
	 * 获取指定名称的uniform变量的存储位置
	 * INVALID_OPERATION:程序对象未能成功连接
	 * INVALID_VALUE：name参数的长度大于attribute变量名的最大长度（默认256字节）
	 * @param program {WebGLProgram} 指定包含顶点着色器和片元着色器的着色器程序对象。
	 * @param name {string} 指定想要获取其存储位置的uniform变量名称
	 * @return none-unll 指定uniform变量的位置 null 指定的uniform变量不存在，或者其命名具有gl_或webgl_前缀
	 */
	getUniformLocation(program, name){}

}