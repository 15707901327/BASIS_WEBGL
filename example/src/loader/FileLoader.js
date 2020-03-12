/**
 * 加载文件
 * @constructor
 */
function FileLoader() {

}

Object.assign(FileLoader.prototype, {
  /**
   * 加载
   * @param url 路径
   * @param callback 返回函数
   */
  load: function(url, callback) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4) {
        callback(req.responseText);
      }
    };
    req.open("GET", url, true);
    req.responseType = "text";
    req.send(null);
  }
});
export default FileLoader;