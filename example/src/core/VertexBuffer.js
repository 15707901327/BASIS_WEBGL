/**
 * 顶点的缓冲
 * @param gl 上下文
 * @param vertices 顶点数组
 * @constructor
 */
function VertexBuffers(gl, vertices) {
  this.gl = gl;
  this.vertices = vertices;
};
Object.assign(VertexBuffers.prototype, {
  init: function() {
    var gl = this.gl;
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
  }
});

export default VertexBuffers;