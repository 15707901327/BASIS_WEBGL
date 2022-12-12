/**
 * 上下文类
 */
class WebGLRenderingContext {
	
	constructor(){}
	
	/**
	 * 执行着色器，按照mode参数指定的方式，根据绑定到gl.ELEMENT_ARRAY_BUFFER的缓存区中的顶点索引值绘制图形。
	 * @param mode {number} mode：指定绘制的方式，可以接收一下常量符号：gl_POINTS, gl_LINES, gl_LINE_STRIP, gl_LINE_LOOP, gl_TRIANGLES,gl_TRIANGLE_STRIP, gl_TRIANGLE_FAN.
	 * @param count {int} 指定绘制需要用到多少个顶点（整形数）
	 * @param type 用于指定元素数组缓冲区中值的类型
	 * @param offset 指定索引数组中开始绘制的位置，以字节为单位
	 */
	drawElements(mode, count, type, offset){
	
	}

}