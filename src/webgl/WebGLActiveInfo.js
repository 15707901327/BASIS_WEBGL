/**
 * 代表了调用[gl.getActiveAttrib()]{@link WebGLRenderingContext#getActiveAttrib}和[gl.getActiveUniform()]{@link WebGLRenderingContext#getActiveUniform}这两个方法后传回的信息。
 */
class WebGLActiveInfo{
	constructor(){
		/**
		 * @property name 名称
		 * @readonly
		 */
		this.name = "name";
		/**
		 * @property size 大小
		 * @readonly
		 */
		this.size = "size";
		/**
		 * @property type 类型
		 * @readonly
		 */
		this.type = "type";
	}
}

export {WebGLActiveInfo};