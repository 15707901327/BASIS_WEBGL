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
	 * 	gl.TRIANGLE_STRIP：绘制三角形带
	 * 	gl.TRIANGLE_FAN：绘制三角形扇
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
	getProgramParameter(program,name){}
	
	/**
	 * 获取指定名称的uniform变量的存储位置
	 * INVALID_OPERATION:程序对象未能成功连接
	 * INVALID_VALUE：name参数的长度大于attribute变量名的最大长度（默认256字节）
	 * @param program {WebGLProgram} 指定包含顶点着色器和片元着色器的着色器程序对象。
	 * @param name {string} 指定想要获取其存储位置的uniform变量名称
	 * @return none-unll 指定uniform变量的位置 null 指定的uniform变量不存在，或者其命名具有gl_或webgl_前缀
	 */
	getUniformLocation(program, name){}
	
	/**
	 * 返回包含统一属性的大小，类型和名称的WebGLActiveInfo对象。它通常在查询未知的制服时用于调试或创建通用库。
	 * @param program {WebGLProgram} 一个WebGL程序，指定WebGL着色器程序，从中获取统一变量的信息。
	 * @param index {GLuint} 指定要获取的顶点属性的索引。该值是[gl.getProgramParameter(program，gl.ACTIVE_ATTRIBUTES)]{@link WebGLRenderingContext#getProgramParameter}返回的索引0到N-1。
	 * @return info {WebGLActiveInfo}
	 * 返回值的type属性将是以下属性之一：
	 * 	gl.FLOAT
	 * 	gl.FLOAT_VEC2
	 * 	gl.FLOAT_VEC3
	 * 	gl.FLOAT_VEC4
	 * 	gl.INT
	 * 	gl.INT_VEC2
	 * 	gl.INT_VEC3
	 * 	gl.INT_VEC4
	 * 	gl.BOOL
	 * 	gl.BOOL_VEC2
	 * 	gl.BOOL_VEC3
	 * 	gl.BOOL_VEC4
	 * 	gl.FLOAT_MAT2
	 * 	gl.FLOAT_MAT3
	 * 	gl.FLOAT_MAT4
	 * 	gl.SAMPLER_2D
	 * 	gl.SAMPLER_CUBE
	 * 	使用WebGL 2上下文时，还可以使用以下值:
	 * 	gl.UNSIGNED_INT
	 * 	gl.UNSIGNED_INT_VEC2
	 * 	gl.UNSIGNED_INT_VEC3
	 * 	gl.UNSIGNED_INT_VEC4
	 * 	gl.FLOAT_MAT2x3
	 * 	gl.FLOAT_MAT2x4
	 * 	gl.FLOAT_MAT3x2
	 * 	gl.FLOAT_MAT3x4
	 * 	gl.FLOAT_MAT4x2
	 * 	gl.FLOAT_MAT4x3
	 * 	gl.SAMPLER_2D
	 * 	gl.SAMPLER_3D
	 * 	gl.SAMPLER_CUBE
	 * 	gl.SAMPLER_2D_SHADOW
	 * 	gl.SAMPLER_2D_ARRAY
	 * 	gl.SAMPLER_2D_ARRAY_SHADOW
	 * 	gl.SAMPLER_CUBE_SHADOW
	 * 	gl.INT_SAMPLER_2D
	 * 	gl.INT_SAMPLER_3D
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
	getActiveUniform(program,index){}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param v0 指定填充uniform变量第一个分量的值
	 */
	uniform1f(location, v0){}
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param value 指定填充uniform变量第一个分量的值
	 */
	uniform1fv(location, value){}
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param v0 指定填充uniform变量第一个分量的值
	 */
	uniform1i(location, v0){}
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param value 指定填充uniform变量第一个分量的值
	 */
	uniform1iv(location, value){}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param v0 指定填充uniform变量第一个分量的值
	 * @param v1 指定填充uniform变量第二个分量的值
	 */
	uniform2f(location, v0, v1){}
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param value 指定填充uniform变量第一个分量的值
	 */
	uniform2fv(location, value){}
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param v0 指定填充uniform变量第一个分量的值
	 * @param v1 指定填充uniform变量第二个分量的值
	 */
	uniform2i(location, v0, v1){}
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param value 指定填充uniform变量第一个分量的值
	 */
	uniform2iv(location, value){}
	
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param v0 指定填充uniform变量第一个分量的值
	 * @param v1 指定填充uniform变量第二个分量的值
	 * @param v2 指定填充uniform变量第三个分量的值
	 */
	uniform3f(location, v0, v1, v2){}
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param value 指定填充uniform变量第一个分量的值
	 */
	uniform3fv(location, value){}
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param v0 指定填充uniform变量第一个分量的值
	 * @param v1 指定填充uniform变量第二个分量的值
	 * @param v2 指定填充uniform变量第三个分量的值
	 */
	uniform3i(location, v0, v1, v2){}
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param value 指定填充uniform变量第一个分量的值
	 */
	uniform3iv(location, value){}
	
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
	uniform4f(location, v0, v1, v2, v3){}
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param value 指定填充uniform变量第一个分量的值
	 */
	uniform4fv(location, value){}
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
	uniform4i(location, v0, v1, v2, v3){}
	/**
	 * 指定统一变量的值。当程序对象成功链接时，程序对象中定义的所有活动统一变量都初始化为0。它们保留通过调用此方法分配给它们的值，直到程序对象上发生下一次成功的链接操作，此时它们再次初始化为0。
	 * gl.uniform[1234][fi][v]()
	 * 错误：INVALID_OPERATION:程序对象未能成功连接，或者localhost是非法的变量的存储位置
	 * @param location {WebGLUniformLocation} 指定将要修改的uniform变量的存储位置
	 * @param value 指定填充uniform变量第一个分量的值
	 */
	uniform4iv(location, value){}
	
	/**
	 * 获取由name参数指定的attribute变量的存储位置
	 * INVALID_OPERATION:程序对象未能成功连接
	 * -1：指定的attribute变量不存在，或者其命名具有gl_或webgl_前缀
	 * @param program {WebGLProgram} 指定包含顶点着色器和片元着色器的着色器程序对象
	 * @param name {String} 指定想要获取其存储地址的attribute变量的名称
	 * @return {GLint}大于等于0：attribute变量的存储地址,-1：指定的attribute变量不存在，或者其命名具有gl_或webgl_前缀
	 */
	getAttribLocation(program,name){}
	
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
	getActiveAttrib(program,index){}
}