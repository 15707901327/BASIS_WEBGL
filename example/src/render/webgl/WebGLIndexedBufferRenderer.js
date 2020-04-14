function WebGLIndexedBufferRenderer(gl) {

  let type;

  this.setIndex = function(value) {
    type = value.type;
  };

  this.render = function(start, count) {
    gl.drawElements(gl.TRIANGLES, count, type, 0); // 绘制图形
  }

}

Object.assign(WebGLIndexedBufferRenderer.prototype, {});

export {WebGLIndexedBufferRenderer};