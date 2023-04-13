/**
 * 上下文类
 */
class WebGL2RenderingContext {

    constructor() {
    }

    //********************* attribute变量相关方法 *************************/

    /**
     * 指定整数数据格式和顶点属性数组中顶点属性的位置.
     * 与WebGLRenderingContext.vertexAttribPointer（）非常相似。主要区别在于:
     * vertexAttribPointer指针指定的值在着色器中始终被解释为浮点值（即使它们最初在缓冲区中被指定为整数）.
     * vertexAttribIPointer但此方法允许指定在着色器中被解释为整数的值。
     * @param index {GLuint} 指定要修改的顶点属性的索引 (指定待分配attribute变量的存储位置)
     * @param size {GLint} 指定每个顶点属性的组件数。必须是1、2、3或4。(指定缓存区中每个顶点的分量个数（1到4）,若size比attribute变量需要的分量数少，缺失分量将按照与vertexAttrib[1234]f（）相同的规则补全。)
     * @param type {GLenum} 指定数组中每个组件的数据类型的GLenum。必须是以下其中之一：
     * gl.BYTE
     * gl.UNSIGNED_BYTE
     * gl.SHORT
     * gl.UNSIGNED_SHORT
     * gl.INT
     * gl.UNSIGNED_INT。
     *
     * @param stride {GLsizei} 指定连续顶点属性开始之间的偏移量（以字节为单位）。
     * @param offset {GLintptr} 指定顶点属性数组中第一个组件的偏移量（以字节为单位）。必须是类型的倍数。
     */
    vertexAttribIPointer(index, size, type, stride, offset) {
    }
}