/**
 * 加载创建贴图
 * @constructor
 */
function TextureLoader(gl) {
  this.gl = gl;
}

Object.assign(TextureLoader.prototype, {

  /**
   * 加载
   * @param url 贴图路径
   * @param callback 回调函数
   * @returns {Texture}
   */
  load: function(url, callback) {
    var gl = this.gl;

    var texture = gl.createTexture();
    var image = new Image();
    image.onload = function() {

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.bindTexture(gl.TEXTURE_2D, null);

      if (callback) callback(texture);
    };
    image.src = url;

    return texture;
  }
});

export default TextureLoader;