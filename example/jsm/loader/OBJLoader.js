import FileLoader from "./FileLoader.js";
import BufferGeometry from "../core/BufferGeometry.js";

function OBJLoader() {

}

Object.assign(OBJLoader.prototype, {
  /**
   * 加载
   * @param url 路径
   * @param callback 返回函数
   */
  load: function(url, callback) {
    var scope = this;

    var fileLoader = new FileLoader();
    fileLoader.load(url, function(text) {
      callback(scope.parse(text));
    });
  },

  /**
   * 解析数据
   */
  parse: function(objStr) {

    // 原始顶点坐标列表--直接从obj文件中加载
    var alv = [];
    // 结果顶点坐标列表--按面组织好
    var alvResult = [];

    // 原始纹理坐标列表
    var alt = [];
    // 纹理坐标结果列表
    var altResult = [];

    // 原始法向量列表
    var aln = [];
    // 法向结果量列表
    var alnResult = [];

    var lines = objStr.split("\n");
    for (var lineIndex in lines) {
      // 去掉开头结尾空格
      var line = lines[lineIndex].replace(/[ \t]+/g, " ").replace(/\s\s*$/, "");
      // 过滤注释
      if (line[0] === "#") {
        continue;
      }

      var array = line.split(" ");
      // 顶点
      if (array[0] === "v") {
        alv.push(parseFloat(array[1]));
        alv.push(parseFloat(array[2]));
        alv.push(parseFloat(array[3]));
      }
      // 纹理坐标
      else if (array[0] === "vt") {
        alt.push(parseFloat(array[1]));
        alt.push(1.0 - parseFloat(array[2]));
      }
      // 法线
      else if (array[0] === "vn") {
        aln.push(parseFloat(array[1]));
        aln.push(parseFloat(array[2]));
        aln.push(parseFloat(array[3]));
      }

      // 处理面
      else if (array[0] === "f") {

        if (array.length !== 4) {
          alert("array.length != 4");
          continue;
        }

        for (var i = 1; i < 4; ++i) {
          var tempArray = array[i].split("/");
          var vIndex = tempArray[0] - 1;
          var tIndex = tempArray[1] - 1;
          var nIndex = tempArray[2] - 1;

          // 顶点坐标
          alvResult.push(alv[vIndex * 3 + 0]);
          alvResult.push(alv[vIndex * 3 + 1]);
          alvResult.push(alv[vIndex * 3 + 2]);

          // 纹理坐标
          altResult.push(alt[tIndex * 2 + 0]);
          altResult.push(alt[tIndex * 2 + 1]);

          // 法线
          alnResult.push(aln[nIndex * 3 + 0]);
          alnResult.push(aln[nIndex * 3 + 1]);
          alnResult.push(aln[nIndex * 3 + 2]);
        }
      }
    }

    var bufferGeometry = new BufferGeometry();
    bufferGeometry.attributes.vertices = alvResult;
    bufferGeometry.attributes.uvs = altResult;
    bufferGeometry.attributes.normals = alnResult;

    return bufferGeometry;
  }
});

export default OBJLoader;