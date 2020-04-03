import {BufferGeometry} from "../core/BufferGeometry.js";
import {Vector3} from "../math/Vector3.js";
import {Float32BufferAttribute} from "../core/BufferAttribute.js";

/**
 * 初始化法线
 * @param indices 索引
 * @param vertices 顶点
 * @returns {Array}
 */
BufferGeometry.prototype.initNormals = function(indices, vertices) {
  // 顶点坐标
  var posA = new Vector3();
  var posB = new Vector3();
  var posC = new Vector3();

  // 面上的向量
  var nab = new Vector3();
  var nbc = new Vector3();

  var faceNormals = [];
  var count = indices.length / 3;
  for (var i = 0; i < count; i++) {
    posA.set(
      vertices[indices[i * 3] * 3],
      vertices[indices[i * 3] * 3 + 1],
      vertices[indices[i * 3] * 3 + 2]
    );
    posB.set(
      vertices[indices[i * 3 + 1] * 3],
      vertices[indices[i * 3 + 1] * 3 + 1],
      vertices[indices[i * 3 + 1] * 3 + 2]
    );
    posC.set(
      vertices[indices[i * 3 + 2] * 3],
      vertices[indices[i * 3 + 2] * 3 + 1],
      vertices[indices[i * 3 + 2] * 3 + 2]
    );

    nab.subVectors(posA, posB);
    nbc.subVectors(posB, posC);

    var faceNormal = new Vector3();
    faceNormal.crossVectors(nab, nbc);
    faceNormals.push(faceNormal.normalize());
  }

  var vertex_count = vertices.length / 3;
  var vertexNormals = [];
  for (var i = 0; i < vertex_count; i++) {

    // 包含顶点的面法线
    var vertexfaceNormals = [];
    for (var j = 0; j < indices.length; j++) {
      if (i === indices[j]) {
        var faceNormal = faceNormals[Math.floor(j / 3)];
        // 去除重复元素
        var isVisible = false;
        for (var k = 0; k < vertexfaceNormals.length; k++) {
          if (vertexfaceNormals[k].x === faceNormal.x && vertexfaceNormals[k].y === faceNormal.y && vertexfaceNormals[k].z === faceNormal.z) {
            isVisible = true;
            break;
          }
        }

        if (!isVisible) {
          vertexfaceNormals.push(faceNormals[Math.floor(j / 3)]);
        }
      }
    }

    var vertexNormal = new Vector3();
    for (var j = 0; j < vertexfaceNormals.length; j++) {
      vertexNormal.add(vertexfaceNormals[j]);
    }

    vertexNormal.normalize();
    vertexNormals.push(vertexNormal.x);
    vertexNormals.push(vertexNormal.y);
    vertexNormals.push(vertexNormal.z);
  }

  this.setAttribute('normal', new Float32BufferAttribute(vertexNormals, 3));

  return vertexfaceNormals;
};

export {};