/**
 * 上下文类
 */
class WebGLRenderingContext {
	
	constructor(){}
	
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
	drawElements(mode, count, type, offset){
	
	}

}