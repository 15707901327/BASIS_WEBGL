function WebGLAttributes(gl) {

  var createBuffer = function(attribute) {

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, attribute.array, gl.STATIC_DRAW);
  };

  return {
    createBuffer: createBuffer,
  }
}

export {WebGLAttributes};