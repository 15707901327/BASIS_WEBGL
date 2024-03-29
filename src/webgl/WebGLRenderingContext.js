/**
 * 上下文类
 */
class WebGLRenderingContext {
	
	constructor() {
	}
	
	//********************* attribute变量相关方法 *************************/
	
	/**
	 * 将数据（v0，v1，v2,v3）传给由location参数指定的attribute变量，如果没有传递后面的v1, v2, v3，使用默认值0.0、0.0、1.0
	 * 重构方法：vertexAttrib[1234]f
	 * 矢量方法：
	 * gl.vertexAttrib1fv(location,Float32Array);
	 * gl.vertexAttrib4fv(location,Float32Array);
	 * 错误：
	 * INVALID_OPERATION:程序对象未能成功连接（没有当前program对象）
	 * INVALID_VALUE：location大于等于attribute变量名的最大数目（默认为8）
	 * @param location 指定将要修改的attribute变量的存储位置
	 * @param v0 指定填充attribute变量第一个分量的值
	 * @param v1 指定填充attribute变量第二个分量的值
	 * @param v2 指定填充attribute变量第三个分量的值
	 * @param v3 指定填充attribute变量第四个个分量的值
	 * @example
	 * var position = new Float32Array([0.0,0.0,0.0,1.0]);
	 * gl.vertexAttrib4fv(a_Position, position);
	 */
	vertexAttrib_1234_f(location, v0, v1, v2, v3) {
	}
	
	/**
	 * 将绑定到gl.ARRAY_BUFFER上的缓存区对象分配给由location指定的attribute变量
	 * 错误：
	 * INVALID_OPERATION:程序对象未能成功连接（没有当前program对象）
	 * INVALID_VALUE：location大于等于attribute变量名的最大数目（默认为8）,或则stride或offset是负值
	 *
	 * @param index 指定待分配attribute变量的存储位置
	 * @param size 指定缓存区中每个顶点的分量个数（1到4）。若size比attribute变量需要的分量数少，缺失分量将按照与vertexAttrib[1234]f（）相同的规则补全。
	 * @param type {GLenum} 用以下类型之一来指定格式(与类型化数据数据类型对应):
	 * gl.BYTE:带符号的8位整数，值在[-128,127]中
	 * gl.SHORT:短整型，带符号的16位整数，值在[-32768,32767]中 Int16Array
	 * gl.UNSIGNED_BYTE:无符号字节，无符号8位整数，值在[0,255]中 Unit8Array
	 * gl.UNSIGNED_SHORT:无符号短整型，无符号16位整数，值在[0,65535]中 Unit16Array
	 * gl.FLOAT: 32位浮点型，Float32Array
	 *
	 * WebGL2:
	 * gl.HALF_FLOAT:16位浮点型，Float16Array
	 * gl.INT:32-bit 无符号整型，Int16Array
	 * gl.UNSIGNED_INT:32-bit 无符号整型，Unit16Array
	 * gl.INT_2_10_10_10_REV:32位有符号整数，值在[-512,511]中
	 * gl.UNSIGNED_INT_2_10_10_10_REV：32位无符号整数，值在[0,1023]中
	 *
	 * @param normalized 传入true或false，表明是否将非浮点型的数据归一化到[0,1]或[-1,1]区间
	 * @param stride 指定相邻两个顶点的字节数，默认为0
	 * @param offset 指定缓存区对象中的偏移量（以字节为单位），即attribute变量从缓存区中的何处开始储存，如果是起始位置开始的，offset设置为0
	 * @example
	 * <a href="../../example/WebGL编程指南/ch3/MultiPoints.html" target="_blank">绘制三角形的三个顶点</a>
	 */
	vertexAttribPointer(index, size, type, normalized, stride, offset) {
	}
	
	
	/**
	 * 开启location指定的attribute变量
	 * 错误：
	 * INVALID_VALUE：location大于等于attribute变量名的最大数目（默认为8）
	 *
	 * @param index {GLuint} 指定待分配attribute变量的存储位置
	 *
	 * @see disableVertexAttribArray
	 * @see <a href="../../example/WebGL编程指南/ch3/MultiPoints.html" target="_blank">绘制三角形的三个顶点</a>
	 */
	enableVertexAttribArray(index) {
	}
	
	/**
	 * 关闭location指定的attribute变量
	 * 错误：
	 * INVALID_VALUE：location大于等于attribute变量名的最大数目（默认为8）
	 * @param index {GLuint} 指定attribute变量的存储位置
	 *
	 * @see enableVertexAttribArray
	 * @see <a href="../../example/WebGL编程指南/ch3/MultiPoints.html" target="_blank">绘制三角形的三个顶点</a>
	 */
	disableVertexAttribArray(index) {
	}
	
	/**
	 * 将定义好的WebGLProgram 对象添加到当前的渲染状态中。
	 * @param program {WebGLProgram} 指定待使用的程序对象
	 */
	useProgram(program) {
	}
	
	/**
	 * 用来设置视口，即指定从标准设备到窗口坐标的 x、y 仿射变换。
	 * 设置gl.drawArrays()和gl.drawElements()函数的绘图区域。在canvas上绘图时，x和y就是canvas中的坐标
	 * @param x {GLint} 用来设定视口的左下角水平坐标。默认值：0。
	 * @param y {GLint} 用来设定视口的左下角垂直坐标。默认值：0。
	 * @param width {GLsizei} 用来设定视口的宽度。默认值：canvas 的宽度。
	 * @param height {GLsizei} 用来设定视口的高度。默认值：canvas 的高度。
	 */
	viewport(x, y, width, height) {
	}
	
	/**
	 * 执行着色器，按照mode参数指定的方式，根据绑定到gl.ELEMENT_ARRAY_BUFFER的缓存区中的顶点索引值绘制图形。
	 * 异常:
	 * 如果 mode 不是正确值， gl.INVALID_ENUM 将会抛出错误异常。
	 * 如果 offset 不是给定类型大小的有效倍数，gl.INVALID_OPERATION 将会抛出错误异常。
	 * 如果 count 是负的， gl.INVALID_VALUE 将会抛出错误异常。
	 * @param mode {enum} 指定绘制的方式:
	 *    gl.POINTS: 画单独的点。
	 *    gl.LINE_STRIP: 画一条直线到下一个顶点。
	 *    gl.LINE_LOOP: 绘制一条直线到下一个顶点，并将最后一个顶点返回到第一个顶点。
	 *    gl.LINES: 在一对顶点之间画一条线。
	 *    gl.TRIANGLE_STRIP：绘制三角形带
	 *    gl.TRIANGLE_FAN：绘制三角形扇
	 *    gl.TRIANGLES, 为一组三个顶点绘制一个三角形。
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
	drawElements(mode, count, type, offset) {
	}
	
	/**
	 * 获取program指定的程序对象中，name指定的参数信息。返回的值随着name的不同而不同
	 * 错误：INVALID_ENUM: pname的值无效
	 * @param program {WebGLProgram} 指定程序对象
	 * @param name {GLenum} 指定待获取参数的类型，可以是gl.DELETE_STATUS、gl.LINK_STATUS、gl.VALIDATE_STATUS、gl.ATTACHED_SHADERS、gl.ACTIVE_ATTRIBUTES或gl.ACTIVE_UNIFORMS
	 * @return 根据pname的不同，返回不同的值
	 *  gl.DELETE_STATUS：返回是程序是否已被删除（true或false）
	 *  gl.LINK_STATUS：返回是程序是否已连接成功（true或false）
	 *  gl.VALIDATE_STATUS：返回是程序是否已通过验证（true或false）
	 *  gl.ATTACHED_SHADERS：已被分配给着色器的数量
	 *  gl.ACTIVE_ATTRIBUTES：顶点着色器中attribute变量的数量'
	 *  gl.ACTIVE_UNIFORMS：程序中uniform变量的数量
	 */
	getProgramParameter(program, name) {
	}
	
	/**
	 * 获取指定名称的uniform变量的存储位置
	 * INVALID_OPERATION:程序对象未能成功连接
	 * INVALID_VALUE：name参数的长度大于attribute变量名的最大长度（默认256字节）
	 * @param program {WebGLProgram} 指定包含顶点着色器和片元着色器的着色器程序对象。
	 * @param name {string} 指定想要获取其存储位置的uniform变量名称
	 * @return none-unll 指定uniform变量的位置 null 指定的uniform变量不存在，或者其命名具有gl_或webgl_前缀
	 */
	getUniformLocation(program, name) {
	}
	
	/**
	 * 返回包含统一属性的大小，类型和名称的WebGLActiveInfo对象。它通常在查询未知的制服时用于调试或创建通用库。
	 * @param program {WebGLProgram} 一个WebGL程序，指定WebGL着色器程序，从中获取统一变量的信息。
	 * @param index {GLuint} 指定要获取的顶点属性的索引。该值是[gl.getProgramParameter(program，gl.ACTIVE_ATTRIBUTES)]{@link WebGLRenderingContext#getProgramParameter}返回的索引0到N-1。
	 * @return info {WebGLActiveInfo}
	 * 返回值的type属性将是以下属性之一：
	 *    gl.FLOAT
	 *    gl.FLOAT_VEC2
	 *    gl.FLOAT_VEC3
	 *    gl.FLOAT_VEC4
	 *    gl.INT
	 *    gl.INT_VEC2
	 *    gl.INT_VEC3
	 *    gl.INT_VEC4
	 *    gl.BOOL
	 *    gl.BOOL_VEC2
	 *    gl.BOOL_VEC3
	 *    gl.BOOL_VEC4
	 *    gl.FLOAT_MAT2
	 *    gl.FLOAT_MAT3
	 *    gl.FLOAT_MAT4
	 *    gl.SAMPLER_2D
	 *    gl.SAMPLER_CUBE
	 *    使用WebGL 2上下文时，还可以使用以下值:
	 *    gl.UNSIGNED_INT
	 *    gl.UNSIGNED_INT_VEC2
	 *    gl.UNSIGNED_INT_VEC3
	 *    gl.UNSIGNED_INT_VEC4
	 *    gl.FLOAT_MAT2x3
	 *    gl.FLOAT_MAT2x4
	 *    gl.FLOAT_MAT3x2
	 *    gl.FLOAT_MAT3x4
	 *    gl.FLOAT_MAT4x2
	 *    gl.FLOAT_MAT4x3
	 *    gl.SAMPLER_2D
	 *    gl.SAMPLER_3D
	 *    gl.SAMPLER_CUBE
	 *    gl.SAMPLER_2D_SHADOW
	 *    gl.SAMPLER_2D_ARRAY
	 *    gl.SAMPLER_2D_ARRAY_SHADOW
	 *    gl.SAMPLER_CUBE_SHADOW
	 *    gl.INT_SAMPLER_2D
	 *    gl.INT_SAMPLER_3D
	 *  gl.INT_SAMPLER_CUBE
	 *  gl.INT_SAMPLER_2D_ARRAY
	 *  gl.UNSIGNED_INT_SAMPLER_2D
	 *  gl.UNSIGNED_INT_SAMPLER_3D
	 *  gl.UNSIGNED_INT_SAMPLER_CUBE
	 *  gl.UNSIGNED_INT_SAMPLER_2D_ARRAY
	 *  @example
	 *  var info = gl.getActiveAttrib( program, i );
	 *  var name = info.name;
	 */
	getActiveUniform(program, index) {
	}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param v0 指定填充uniform变量第一个分量的值
	 */
	uniform1f(location, v0) {
	}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param value 指定填充uniform变量第一个分量的值
	 */
	uniform1fv(location, value) {
	}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param v0 指定填充uniform变量第一个分量的值
	 */
	uniform1i(location, v0) {
	}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param value 指定填充uniform变量第一个分量的值
	 */
	uniform1iv(location, value) {
	}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param v0 指定填充uniform变量第一个分量的值
	 * @param v1 指定填充uniform变量第二个分量的值
	 */
	uniform2f(location, v0, v1) {
	}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param value 指定填充uniform变量第一个分量的值
	 */
	uniform2fv(location, value) {
	}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param v0 指定填充uniform变量第一个分量的值
	 * @param v1 指定填充uniform变量第二个分量的值
	 */
	uniform2i(location, v0, v1) {
	}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param value 指定填充uniform变量第一个分量的值
	 */
	uniform2iv(location, value) {
	}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param v0 指定填充uniform变量第一个分量的值
	 * @param v1 指定填充uniform变量第二个分量的值
	 * @param v2 指定填充uniform变量第三个分量的值
	 */
	uniform3f(location, v0, v1, v2) {
	}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param value 指定填充uniform变量第一个分量的值
	 */
	uniform3fv(location, value) {
	}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param v0 指定填充uniform变量第一个分量的值
	 * @param v1 指定填充uniform变量第二个分量的值
	 * @param v2 指定填充uniform变量第三个分量的值
	 */
	uniform3i(location, v0, v1, v2) {
	}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param value 指定填充uniform变量第一个分量的值
	 */
	uniform3iv(location, value) {
	}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param v0 指定填充uniform变量第一个分量的值
	 * @param v1 指定填充uniform变量第二个分量的值
	 * @param v2 指定填充uniform变量第三个分量的值
	 * @param v3 指定填充uniform变量第四个个分量的值
	 */
	uniform4f(location, v0, v1, v2, v3) {
	}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param value 指定填充uniform变量第一个分量的值
	 */
	uniform4fv(location, value) {
	}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param v0 指定填充uniform变量第一个分量的值
	 * @param v1 指定填充uniform变量第二个分量的值
	 * @param v2 指定填充uniform变量第三个分量的值
	 * @param v3 指定填充uniform变量第四个个分量的值
	 */
	uniform4i(location, v0, v1, v2, v3) {
	}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param value 指定填充uniform变量第一个分量的值
	 */
	uniform4iv(location, value) {
	}
	
	/**
	 * 获取由name参数指定的attribute变量的存储位置
	 * INVALID_OPERATION:程序对象未能成功连接
	 * -1：指定的attribute变量不存在，或者其命名具有gl_或webgl_前缀
	 * @param program {WebGLProgram} 指定包含顶点着色器和片元着色器的着色器程序对象
	 * @param name {String} 指定想要获取其存储地址的attribute变量的名称
	 * @return {GLint}大于等于0：attribute变量的存储地址,-1：指定的attribute变量不存在，或者其命名具有gl_或webgl_前缀
	 */
	getAttribLocation(program, name) {
	}
	
	/**
	 * 返回包含顶点属性的大小，类型和名称的WebGLActiveInfo对象。
	 * 它通常在查询未知的制服时用于调试或创建通用库。
	 * @param program {WebGLProgram} 包含顶点属性的WebGL程序。
	 * @param index {GLuint} 指定要获取的顶点属性的索引。该值是 [getProgramParameter]{@link WebGLRenderingContext#getProgramParameter} 返回的索引0到N-1。
	 * @return info {WebGLActiveInfo}
	 * @example
	 * var info = gl.getActiveAttrib( program, i );
	 * var name = info.name;
	 */
	getActiveAttrib(program, index) {
	}
	
	/**
	 * sampleCoverage
	 */
	sampleCoverage() {
	}
	
	/**
	 * 剪裁测试用于限制绘制区域。我们可以指定一个矩形的剪裁窗口，当启用剪裁测试后，只有在这个窗口之内的像素才能被绘制，其它像素则会被丢弃。换句话说，无论怎么绘制，剪裁窗口以外的像素将不会被修改。
	 * @param x 指定绘图区域的左上角，以像素为单位
	 * @param y 指定绘图区域的左上角，以像素为单位
	 * @param width 指定绘图区域的宽度和高度
	 * @param height 指定绘图区域的宽度和高度
	 */
	scissor(x, y, width, height) {
	}
	
	/**
	 * 设置正面和背面功能以及模板测试的参考值。
	 * 模具启用和禁用每个像素的绘图。它通常用于多通道渲染中以获得特殊效果。
	 * @param func 指定测试功能。 默认功能是gl.ALWAYS。
	 * @param ref 指定模板测试的参考值。此值被限制在0到2n -1的范围内，其中n是模板缓冲区中的位平面数。默认值为0。
	 * @param mask 指定按位掩码，用于在完成测试时对参考值和存储的模板值进行“与”运算。默认值为全1。
	 */
	stencilFunc(func, ref, mask) {
	}
	
	/**
	 * 启用WebGL扩展
	 * @param name {string} WebGL扩展功能的名称，例如：
	 * OES_vertex_array_object <a href="../webgl/index.html#VAO" target="_blank">顶点数组对象</a>
	 * @return extension 一个 WebGL 扩展对象。
	 * 如果扩展名称（区分大小写）与 WebGLRenderingContext.getSupportedExtensions 中的任何结果都不匹配，则只会返回 null 。
	 * 扩展项:<a href="../webgl/js_API/WebGL_extensions.html" target="_blank">扩展项</a>
	 */
	getExtension(name) {
	}
	
	/************************** 状态查询 *******************************/
	
	/**
	 * 返回传递参数名称的值
	 * @param pname {GLenum} 指定要返回的参数值
	 * @return 取决于参数。
	 * 参数列表：
	 * gl.COLOR_WRITEMASK:获取当前每个颜色分量是否可以写入帧缓冲区
	 * gl.MAX_VERTEX_ATTRIBS:获取最多的顶点attribute变量
	 * gl.MAX_TEXTURE_SIZE:获取纹理的最大尺寸
	 * gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS:获取当前纹理单元的数量。
	 * gl.ACTIVE_TEXTURE:获取激活的纹理单元
	 * gl.VERSION:获取版本 DOMString
	 */
	getParameter(pname) {
	}
	
	/************************** 纹理对象 *******************************/
	
	/**
	 * 创建纹理对象, 以存储纹理图像。
	 * @return texture {WebGLTexture|null} null:创建纹理对象失败
	 */
	createTexture() {
	}
	
	/**
	 * 删除纹理对象
	 * @param texture {WebGLTexture} 纹理对象
	 */
	deleteTexture(texture) {
	}
	
	/**
	 * 开启texture指定的纹理对象，并将其绑定到target上。此外，如果已经通过gl.activeTexture()激活
	 * 了某个纹理单元，则纹理对象也会绑定到这个纹理单元上。
	 * 异常：
	 * INVALID_ENUM：target不是合法的值
	 * @param target {GLenum} 可能值：
	 * gl.TEXTURE_2D：二维纹理
	 * gl.TEXTURE_CUBE_MAP：立方体纹理
	 * WebGl2：
	 * gl.TEXTURE_3D：三维纹理
	 * gl.TEXTURE_2D_ARRAY：二维数组纹理
	 *
	 * @param texture {WebGLTexture} 表示绑定的纹理单元
	 */
	bindTexture(target, texture) {
	}
	
	/**
	 * 激活texUnit指定的<a href="../index.html#textureUnit">纹理单元</a>
	 * @param texUnit 指定准备激活的纹理单元,其值是 gl.TEXTUREI ，其中的 I 在 0 到gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS - 1范围内。例如：gl.TEXTURE0、gl.TEXTURE1......gl.TEXTURE7。最后的数字表示纹理单元的编号。
	 * 纹理单元的数量视实现而定， 你可以通过访问常量 MAX_COMBINED_TEXTURE_IMAGE_UNITS来获取这个值。按照规范来说，最少是8个。
	 * 获取纹理单元个数：gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
	 * 获取激活的纹理单元：gl.getParameter(gl.ACTIVE_TEXTURE);
	 * 异常：
	 * INVALID_ENUM：texture不是合法的值
	 */
	activeTexture(texUnit) {
	}
	
	/**
	 * texParameter[fi]
	 * gl.texParameterf(GLenum target, GLenum pname, GLfloat param);
	 * gl.texParameteri(GLenum target, GLenum pname, GLint param);
	 * 将param的值赋给绑定到目标的纹理对象的pname参数上
	 * 异常：
	 * INVALID_ENUM：target不是合法的值
	 * INVALID_OPERATION：当前目标上没有绑定纹理对象
	 * @param target
	 * gl.TEXTURE_2D:二维纹理
	 * gl.TEXTURE_CUBE_MAP:立方体纹理
	 * WebGl2:
	 * gl.TEXTURE_3D:三维纹理
	 * gl.TEXTURE_2D_ARRAY:二维数组纹理
	 * @param pname  <a href="#textureParam">纹理参数</a>
	 * @param param <a href="#textureParamValue">纹理参数值</a>
	 */
	texParameter(target, pname, param) {
	}
	
	/**
	 * void gl.texImage2D(target, level, internalformat, width, height, border, format, type, ArrayBufferView?
	 * pixels);
	 * void gl.texImage2D(target, level, internalformat, format, type, ImageData? pixels);
	 * void gl.texImage2D(target, level, internalformat, format, type, HTMLImageElement? pixels);
	 * void gl.texImage2D(target, level, internalformat, format, type, HTMLCanvasElement? pixels);
	 * void gl.texImage2D(target, level, internalformat, format, type, HTMLVideoElement? pixels);
	 * void gl.texImage2D(target, level, internalformat, format, type, ImageBitmap? pixels);
	 * webgl2
	 * void gl.texImage2D(target, level, internalformat, width, height, border, format, type, GLint ptroffset);
	 * void gl.texImage2D(target, level, internalformat, width, height, border, format, type, HTMLCanvasElement source);
	 * void gl.texImage2D(target, level, internalformat, width, height, border, format, type, HTMLImageElement source);
	 * void gl.texImage2D(target, level, internalformat, width, height, border, format, type, HTMLVideoElement source);
	 * void gl.texImage2D(target, level, internalformat, width, height, border, format, type, ImageBitmap source);
	 * void gl.texImage2D(target, level, internalformat, width, height, border, format, type, ImageData source);
	 * void gl.texImage2D(target, level, internalformat, width, height, border, format, type, ArrayBufferView srcData, srcOffset);
	 * 将image指定的图像分配给绑定的目标上的纹理对象。
	 * 异常：
	 * INVALID_ENUM:target不是合法的
	 * INVALID_OPERATION:当前目标上没有绑定纹理对象
	 * @param target 激活纹理绑定点
	 * gl.TEXTURE_2D:二维纹理
	 * gl.TEXTURE_CUBE_MAP_POSITIVE_X: Positive X face for a cube-mapped texture.
	 * gl.TEXTURE_CUBE_MAP_NEGATIVE_X: Negative X face for a cube-mapped texture.
	 * gl.TEXTURE_CUBE_MAP_POSITIVE_Y: Positive Y face for a cube-mapped texture.
	 * gl.TEXTURE_CUBE_MAP_NEGATIVE_Y: Negative Y face for a cube-mapped texture.
	 * gl.TEXTURE_CUBE_MAP_POSITIVE_Z: Positive Z face for a cube-mapped texture.
	 * gl.TEXTURE_CUBE_MAP_NEGATIVE_Z: Negative Z face for a cube-mapped texture
	 * @param level 级别0是基本图像级别，级别n是第n个mipmap缩减级别。
	 * @param internalformat 图像的<a href="#internalFormat">内部格式</a>。
	 * @param width 纹理的宽度
	 * @param height 纹理的高度
	 * @param border A GLint specifying the width of the border. Must be 0.
	 * @param format <a href="#internalFormat">纹理数据的格式</a>，参考图像内部格式设置（<a href="#internalFormatType">参考关系表</a>）。
	 * @param type <a href="#internalFormat">纹理数据类型</a>，参考纹理数据的格式设置（<a href="#internalFormatType">参考关系表</a>）
	 * @param image 包含纹理图像的Image对象
	 *
	 */
	texImage2D(target, level, internalformat, format, type, image) {
	}
	
	/************************** WebGL内置功能 **************************/
	
	/**
	 * 开启cap表示的功能
	 * INVALID_ENUM:cap的值无效
	 * @param cap {GLenum} 表示WebGl能力，可能的值：
	 * gl.BLEND    激活计算片段颜色值的混合, 相关接口：[blendFunc]{@link WebGLRenderingContext#blendFunc}
	 * gl.CULL_FACE    激活多边形的剔除。相关接口：[cullFace]{@link WebGLRenderingContext#cullFace}
	 * gl.DEPTH_TEST 激活深度比较并更新深度缓冲区。[depthFunc]{@link WebGLRenderingContext#depthFunc}
	 * gl.DITHER    在将颜色组件写入颜色缓冲区之前激活颜色组件的抖动。
	 *
	 * gl.POLYGON_OFFSET_FILL 激活向多边形片段的深度值添加偏移。
	 * 说明：参数只开启了对填充面的偏移设置，不能对线与点产生作用。具体设置，参考[polygonOffset()]{@link WebGLRenderingContext#polygonOffset}方法。
	 *
	 * gl.SAMPLE_ALPHA_TO_COVERAGE 激活由alpha值确定的临时覆盖值的计算。
	 * gl.SAMPLE_COVERAGE    激活片段覆盖范围与临时覆盖范围值的AND。 [sampleCoverage]{@link WebGLRenderingContext#sampleCoverage}
	 * gl.SCISSOR_TEST    激活剪刀测试(裁剪功能)，丢弃剪刀矩形之外的碎片。 [scissor]{@link WebGLRenderingContext#scissor}
	 * gl.STENCIL_TEST    激活模具测试并更新模具缓冲区. [stencilFunc]{@link WebGLRenderingContext#stencilFunc}
	 * WebGL2:
	 * gl.RASTERIZER_DISCARD 基本体在光栅化阶段之前立即丢弃，但在可选变换反馈阶段之后丢弃。gl.clear（）命令被忽略。
	 */
	enable(cap) {
	}
	
	/**
	 * 测试是否为此上下文启用了特定的WebGL功能。默认情况下，禁用除gl.DITHER之外的所有功能。
	 * @param cap {GLenum} 表示WebGl能力，可能的值：
	 * gl.BLEND    计算片段颜色值的混合, 相关接口：[blendFunc]{@link WebGLRenderingContext#blendFunc}
	 * gl.CULL_FACE    多边形的剔除。相关接口：[cullFace]{@link WebGLRenderingContext#cullFace}
	 * gl.DEPTH_TEST 深度比较并更新深度缓冲区。[depthFunc]{@link WebGLRenderingContext#depthFunc}
	 * gl.DITHER    在将颜色组件写入颜色缓冲区之前激活颜色组件的抖动。
	 * gl.POLYGON_OFFSET_FILL    向多边形片段的深度值添加偏移。[polygonOffset]{@link WebGLRenderingContext#polygonOffset}
	 * gl.SAMPLE_ALPHA_TO_COVERAGE 由alpha值确定的临时覆盖值的计算。
	 * gl.SAMPLE_COVERAGE    片段覆盖范围与临时覆盖范围值的AND。 [sampleCoverage]{@link WebGLRenderingContext#sampleCoverage}
	 * gl.SCISSOR_TEST    剪刀测试(裁剪功能)，丢弃剪刀矩形之外的碎片。 [scissor]{@link WebGLRenderingContext#scissor}
	 * gl.STENCIL_TEST    模具测试并更新模具缓冲区. [stencilFunc]{@link WebGLRenderingContext#stencilFunc}
	 * WebGL2:
	 * gl.RASTERIZER_DISCARD 基本体在光栅化阶段之前立即丢弃，但在可选变换反馈阶段之后丢弃。gl.clear（）命令被忽略。
	 * @return bool {GLboolean} true 激活 false 未激活
	 */
	isEnabled(cap) {
	}
	
	/**
	 * 禁用此上下文的特定WebGL功能。
	 * INVALID_ENUM:cap的值无效
	 * @param cap {GLenum} 表示WebGl能力，可能的值：
	 * gl.BLEND    计算片段颜色值的混合, 相关接口：[blendFunc]{@link WebGLRenderingContext#blendFunc}
	 * gl.CULL_FACE    多边形的剔除。相关接口：[cullFace]{@link WebGLRenderingContext#cullFace}
	 * gl.DEPTH_TEST 深度比较并更新深度缓冲区。[depthFunc]{@link WebGLRenderingContext#depthFunc}
	 * gl.DITHER    在将颜色组件写入颜色缓冲区之前激活颜色组件的抖动。
	 * gl.POLYGON_OFFSET_FILL    向多边形片段的深度值添加偏移。[polygonOffset]{@link WebGLRenderingContext#polygonOffset}
	 * gl.SAMPLE_ALPHA_TO_COVERAGE 由alpha值确定的临时覆盖值的计算。
	 * gl.SAMPLE_COVERAGE    片段覆盖范围与临时覆盖范围值的AND。 [sampleCoverage]{@link WebGLRenderingContext#sampleCoverage}
	 * gl.SCISSOR_TEST    剪刀测试(裁剪功能)，丢弃剪刀矩形之外的碎片。 [scissor]{@link WebGLRenderingContext#scissor}
	 * gl.STENCIL_TEST    模具测试并更新模具缓冲区. [stencilFunc]{@link WebGLRenderingContext#stencilFunc}
	 * WebGL2:
	 * gl.RASTERIZER_DISCARD 基本体在光栅化阶段之前立即丢弃，但在可选变换反馈阶段之后丢弃。gl.clear（）命令被忽略。
	 */
	disable(cap) {
	}
	
	/************************** 深度测试 *******************************/
	/**
	 * 指定了一个将传入像素深度与当前深度缓冲区值进行比较的函数
	 * @param func {GLenum} 于设置绘制像素的条件。默认值为gl.LESS，可能值：
	 * gl.NEVER: 不通过
	 * gl.LESS: 如果传入值小于深度缓冲区值则传递
	 * gl.EQUAL: 如果传入值等于深度缓冲区值则传递
	 * gl.LEQUAL: 如果传入值小于或等于深度缓冲区值，则传递
	 * gl.GREATER: 如果传入值大于深度缓冲区值则传递
	 * gl.NOTEQUAL: 如果传入值不等于深度缓冲区值则传递
	 * gl.GEQUAL: 如果传入值大于或等于深度缓冲区值则传递
	 * gl.ALWAYS: 通过
	 * @example
	 * gl.enable(gl.DEPTH_TEST);
	 * gl.depthFunc(gl.NEVER);
	 * @example
	 * gl.getParameter(gl.DEPTH_FUNC) === gl.NEVER;
	 */
	depthFunc(func) {
	}
	
	/**
	 * 锁定或释放深度缓存区的写入操作。
	 * @param mask 指定是锁定深度缓存区的写入操作（false），还是释放（true）。
	 */
	depthMask(mask) {
	}
	
	/************************** 多边形剔除 *****************************/
	
	/**
	 * 指定加到每个顶点绘制后z值上的偏移量，偏移量按照公式m*factor+r*units计算，其中m表示顶点所在表面相对于观察者的视线的角度，而r表示硬件能够区分两个z值之差的最小值。
	 * @param factor
	 * @param units
	 */
	polygonOffset(factor, units) {
	}
	
	/************************** 剔除方法 *******************************/
	
	/**
	 * 指定前面或后面的多边形是否剔除。默认情况下禁用多边形剔除。
	 * @param mode {GLenum} 指定是正面多边形还是背面多边形是剔除的候选对象。默认值为gl.BACK。可能的值有：
	 * gl.FRONT
	 * gl.BACK
	 * gl.FRONT_AND_BACK
	 * @example
	 * gl.enable(gl.CULL_FACE);
	 * gl.cullFace(gl.FRONT_AND_BACK);
	 * @example
	 * // 获取当前模式
	 * gl.getParameter(gl.CULL_FACE_MODE) === gl.FRONT_AND_BACK;
	 */
	cullFace(mode) {
	}
	
	/************************** 混合方法 *******************************/
	
	/**
	 * 定义了用于混合像素算术的函数。
	 * 通过参数src_factor和dst_factor指定进行混合操作的函数，混合后的颜色如下计算：
	 * 混合后的颜色 = 源颜色 * src_factor + 目标颜色 * dst_factor
	 * INVALID_ENUM:src_factor, dst_factor的值不正确。
	 * @param src_factor 指定源颜色在混合后颜色中的<a href="../webgl/index.html#blending_equation_param" target="_blank">权重因子</a>.
	 * @param dst_factor 指定目标颜色在混合后颜色中的<a href="../webgl/index.html#blending_equation_param" target="_blank">权重因子</a>。
	 */
	blendFunc(src_factor, dst_factor) {
	}
	
	/**
	 * 使当前颜色作为混合操作的常量颜色
	 * @param red 指定颜色值的源混合因子
	 * @param green 指定颜色值的源混合因子
	 * @param blue 指定颜色值的源混合因子
	 * @param alpha Alpha值的目标混合因子
	 */
	blendColor(red, green, blue, alpha) {
	}
	
	/**
	 * 用于将RGB混合方程和alpha混合方程设置为单个方程。
	 * @param mode {GLenum} 混合方程
	 */
	blendEquation(mode) {
	}
	
	/**
	 * 用于分别设置RGB混合方程和alpha混合方程
	 * @param modeRGB {GLenum} 混合方程
	 * @param modeAlpha {GLenum} 混合方程
	 * @example
	 * gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
	 */
	blendEquationSeparate(modeRGB, modeAlpha) {
	}
	
	/**
	 * 分别指定源和目标的颜色（RGB）分量和A（alpha）分量
	 * @param srcRGB 指定颜色值的源<a href="#blending_equation_param">混合因子</a>
	 * @param destRGB 颜色在的目标<a href="#blending_equation_param">混合因子</a>
	 * @param srcAlpha Alpha值的源<a href="#blending_equation_param">混合因子</a>
	 * @param destAlpha Alpha值的目标<a href="#blending_equation_param">混合因子</a>
	 */
	blendFuncSeparate(srcRGB, destRGB, srcAlpha, destAlpha) {
	}
	
	/************************** 缓冲区 *********************************/
	
	/**
	 * 将指定缓存区设定为预定的值。如果清空是颜色缓冲区，那么将使用gl.clearColor()指定的值（作为预定值）
	 * 异常：
	 * INVALID_VALUE：缓冲区不是以上三种类型
	 * @param mask {GLbitfield} 指定待清空的缓冲区，位操作符OR(|)可用来指定多个缓冲区
	 * gl.COLOR_BUFFER_BIT：指定颜色缓冲区
	 * gl.DEPTH_BUFFER_BIT：指定深度缓冲区
	 * gl.STENCIL_BUFFER_BIT：指定模版缓冲区
	 */
	clear(mask) {
	}
	
	/************************** 缓冲区对象 *****************************/
	
	/**
	 * 创建缓存区对象
	 * @example
	 * <a href="../../example/WebGL编程指南/ch3/MultiPoints.html" target="_blank">绘制三角形的三个顶点</a>
	 * @return {WebGLBuffer} buffer 新创建的缓存区对象, null 创建缓存区对象失败
	 *
	 */
	createBuffer() {
	}
	
	/**
	 * 删除参数buffer表示的缓存区对象
	 * @example
	 * <a href="../../example/WebGL编程指南/ch3/MultiPoints.html" target="_blank">绘制三角形的三个顶点</a>
	 * @param buffer {WebGLBuffer} 待删除的缓存区对象
	 */
	deleteBuffer(buffer) {
	}
	
	/**
	 * 允许使用buffer表示的缓存区对象并将其绑定到target表示的目标上
	 * 错误：
	 * target不是上诉值之一，这时将保持原有的绑定情况不变
	 * @param target {GLenum}
	 * gl.ARRAY_BUFFER：表示缓存区对象中包含了顶点的数据
	 * gl.ELEMENT_ARRAY_BUFFER:表示缓存区对象中包含了顶点的索引值"OpenGL ES着色器语言[GLSLES]"
	 *
	 * webgl2:
	 * gl.UNIFORM_BUFFER：用于存储统一块的缓冲区
	 *
	 * @example
	 * <a href="../../example/WebGL编程指南/ch3/MultiPoints.html" target="_blank">绘制三角形的三个顶点</a>
	 * @param buffer {WebGLBuffer} 指定之前由gl.createBuffer()返回的待绑定的缓存区对象，如果指定为空，则禁用对target的绑定
	 */
	bindBuffer(target, buffer) {
	}
	
	/**
	 * 开辟存储空间，向绑定在target上的缓存区对象中写入数据data
	 * 重载函数:
	 * bufferData(target, size, usage)
	 * bufferData(target, ArrayBuffer? srcData, usage)
	 * bufferData(target, ArrayBufferView srcData, usage)
	 * WebGL2:
	 * bufferData(target, ArrayBufferView srcData, usage, srcOffset, length)
	 *
	 *  错误：
	 *  INVALID_ENUM target不是上诉值之一，这时将保持原有的绑定情况不变
	 *
	 * @param target {GLenum}
	 * gl.ARRAY_BUFFER：表示缓存区对象中包含了顶点的数据
	 * gl.ELEMENT_ARRAY_BUFFER:表示缓存区对象中包含了顶点的索引值"OpenGL ES着色器语言[GLSL ES]"
	 * webgl2:
	 * gl.UNIFORM_BUFFER：用于存储统一块的缓冲区
	 * @param size 设定Buffer对象的数据存储区大小
	 * @param srcData 一个ArrayBuffer，SharedArrayBuffer 或者 ArrayBufferView类型的数组对象，将被复制到Buffer的数据存储区。如果为null，数据存储区仍会被创建，但是不会进行初始化和定义。
	 * @param usage 表示程序将如何使用存储在缓存区对象中的数据。该参数将帮助webgl优化操作，但是就算你传入了错误的值，也不会终止程序（仅仅是降低程序的效率）
	 * gl.STATIC_DRAW:只会向缓存区对象中写入一次数据，但需要绘制很多次
	 * gl.STREAM_DRAW:只会向缓存区对象中写入一次数据，然后绘制若干次
	 * gl.DYNAMIC_DRAW:会向缓存区对象中写入多次数据，并绘制很多次
	 * @param srcOffset 指定读取缓冲时的初始元素索引偏移量
	 *
	 * @example
	 * <a href="../../example/WebGL编程指南/ch3/MultiPoints.html" target="_blank">绘制三角形的三个顶点</a>
	 */
	bufferData(target, srcData, usage) {
	}
	
	/**
	 * 更新缓冲区对象的数据存储的子集。
	 * 重载函数:
	 * void gl.bufferSubData(target, offset, ArrayBufferView srcData);
	 * void gl.bufferSubData(target, offset, ArrayBuffer srcData);
	 * <strong>webGL2:</strong>
	 * void gl.bufferSubData(target, dstByteOffset, ArrayBufferView srcData, srcOffset, length);
	 * @param target {GLenum}
	 * gl.ARRAY_BUFFER：包含顶点属性的缓存区，例如顶点坐标、纹理坐标数据或顶点颜色数据。
	 * gl.ELEMENT_ARRAY_BUFFER:表示缓存区对象中包含了顶点的索引值"OpenGL ES着色器语言[GLSLES]"
	 * webgl2:
	 * gl.COPY_READ_BUFFER:用于从一个缓冲区对象复制到另一个
	 * gl.COPY_WRITE_BUFFER:用于从一个缓冲区对象复制到另一个
	 * gl.TRANSFORM_FEEDBACK_BUFFER:缓冲区用于变换反馈操作
	 * gl.UNIFORM_BUFFER:缓冲区用于存储统一块
	 * gl.PIXEL_PACK_BUFFER:用于像素传输操作的缓冲区
	 * gl.PIXEL_UNPACK_BUFFER:用于像素传输操作的缓冲区
	 * @param offset
	 * @param srcData ArrayBuffer，SharedArrayBuffer或将复制到数据存储中的ArrayBufferView类型数组类型之一。
	 * @param dstByteOffset  GLintptr指定数据替换将开始的字节偏移量
	 * @param srcOffset  一个GLuint，指定元素索引偏移量从哪里开始读取缓冲区。
	 * @param length  GLuint默认为0。
	 */
	bufferSubData(target, offset, srcData) {
	}
	
	/************************** 帧缓冲区 *******************************/
	
	/**
	 * 创建帧缓存区对象。
	 * @return {WebGLFramebuffer|null} 新创建的帧缓存区对象
	 */
	createFramebuffer() {
	}
	
	/**
	 * 将framebuffer指定的帧缓冲区对象绑定到target目标上。如果framebuffer为null，那么已经绑定到target目标上的帧缓冲区对象那个将被解除绑定。
	 * 异常：
	 * 如果目标不是 gl.FRAMEBUFFER ，gl.DRAW_FRAMEBUFFER 或 gl.READ_FRAMEBUFFER ，则抛出 gl.INVALID_ENUM 错误。
	 * @param target {GLenum}
	 * gl.FRAMEBUFFER:收集用于渲染图像的颜色，alpha，深度和模板缓冲区的缓冲区数据存储。
	 * WebGL2:
	 * gl.DRAW_FRAMEBUFFER: 相当于gl.FRAMEBUFFER，用作绘图，渲染，清除和写入操作。
	 * gl.READ_FRAMEBUFFER: 用作读取操作的资源。
	 * @param framebuffer {WebGLFramebuffer} 指定被绑定的帧缓存对象
	 */
	bindFramebuffer(target, framebuffer) {
	}
	
	/**
	 * 方法定义了写入片元颜色的绘制缓冲区。绘制缓冲区设置了当前绑定帧缓冲区的状态。
	 * @param buffers {Array} 一个GLenum数组，指定将写入片段颜色的缓冲区。可能的值：
	 * gl.NONE:片元着色器的输出未被写入到任何颜色缓冲区中。
	 * gl.BACK: 片元着色器的输出被写入到输出的颜色缓冲区中。
	 * gl.COLOR_ATTACHMENT{0-15}:片元着色器的输出被写入到第n个当前帧缓冲区中的颜色关联对象。
	 */
	drawBuffers(buffers) {
	}
	
	/************************** 渲染缓冲区对象 *************************/
	
	/**
	 * 创建渲染缓冲区对象
	 * @return {WebGLFramebuffer} 新创建的渲染缓冲区对象 null: 创建渲染缓冲区对象失败
	 */
	createRenderbuffer() {
	}
	
	/**
	 * 删除渲染缓冲区对象
	 * @param renderbuffer {WebGLFramebuffer} 指定被删除的渲染缓冲对象
	 */
	deleteRenderbuffer(renderbuffer) {
	}
	
	/**
	 * 将renderbuffer指定的渲染缓冲区对象绑定到target目标上。如果renderbuffer为null，则将已经绑定在target目标上的渲染缓冲区对象解除绑定.
	 * @param targer 必须为gl.RENDERBUFFER
	 * @param renderbuffer 指定被绑定的渲染缓冲区
	 */
	bindRenderbuffer(targer, renderbuffer) {
	}
	
	/**
	 * 创建并初始化渲染缓冲区的数据
	 * @param targer 必须为gl.RENDERBUFFER
	 * @param internalformat 指定渲染缓冲区中的数据格式
	 * @param width 指定缓冲区对象的宽度
	 * @param height 指定缓冲区对象的高度
	 */
	renderbufferStorage(targer, internalformat, width, height) {
	}
	
	/**
	 * 将renderbuffer指定的 渲染缓冲区对象关联到绑定在target上的帧缓冲对象关联到绑定在target上的帧缓冲区对象
	 * @param target 必须是gl.FRAMEBUFFER
	 * @param attachment 指定关联的类型
	 * gl.DEPTH_ATTACHMENT:表示renderbuffer是深度关联对象
	 * gl.COLOR_ATTACHMENTO:表示renderbuffer是颜色关联对象
	 * gl._ATTACHMENT:表示renderbuffer是STENCIL模板关联对象
	 * @param renderbuffertarget 指定关联的类型 必须是gl.RENDERBUFFER
	 * @param renderbuffer 指定被关联的渲染缓冲区对
	 */
	framebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer) {
	}
	
	
}