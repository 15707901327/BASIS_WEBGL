function WebGLAttributes(gl) {

  var createBuffer = function(attribute, bufferType) {

    var buffer = gl.createBuffer();
    gl.bindBuffer(bufferType, buffer);
    gl.bufferData(bufferType, attribute.array, gl.STATIC_DRAW);
  };

  return {
    createBuffer: createBuffer,
  }
}

export {WebGLAttributes};