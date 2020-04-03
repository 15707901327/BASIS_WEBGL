import {PGL} from "../../../src/built/PGL.js";
import {Color} from "../../../src/math/Color.js";
import {Mesh} from "../../../src/object/Mesh.js";
import {BufferGeometry} from "../../../src/core/BufferGeometry.js";
import {Float32BufferAttribute} from "../../../src/core/BufferAttribute.js";
import {MeshPhongMaterial} from "../../../src/materials/MeshPhongMaterial.js";
import {AmbientLight} from "../../../src/Lights/AmbientLight.js";
import {} from "../../../src/built/PUntils.js";

window.onload = function(ev) {
  // 获取<canvas>元素
  var canvas = document.getElementById('webgl');

  var webGlRenderer = new PGL.WebGLRenderer({
    canvas: canvas
  });
  webGlRenderer.setClearColor(new Color(0, 0, 0), 1);

  var camera = new PGL.PerspectiveCamera(45, 400 / 400, 0.1, 30000);
  camera.position.set(3, 3, 7);
  camera.lookAt(0, 0, 0);

  var scene = new PGL.Scene();

  var ambientLight = new AmbientLight(0xff0000, 0.4);
  scene.add(ambientLight);

  var bufferGeometry = new BufferGeometry();
  var positions = [
    // 顶点
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    -1.0, 1.0, -1.0,
    -1.0, -1.0, -1.0
  ];
  var color = [
    // 颜色
    1.0, 1.0, 1.0,  // v0 White
    1.0, 0.0, 1.0,  // v1 Magenta
    1.0, 0.0, 0.0,  // v2 Red
    1.0, 1.0, 0.0,  // v3 Yellow
    0.0, 1.0, 0.0,  // v4 Green
    0.0, 1.0, 1.0,  // v5 Cyan
    0.0, 0.0, 1.0,  // v6 Blue
    0.0, 0.0, 0.0   // v7 Black
  ];
  var indices = [
    0, 1, 2, 0, 2, 3,    // front
    0, 3, 4, 0, 4, 5,    // right
    0, 5, 6, 0, 6, 1,    // up
    1, 6, 7, 1, 7, 2,    // left
    7, 4, 3, 7, 3, 2,    // down
    4, 7, 6, 4, 6, 5     // back
  ]; // 顶点索引

  bufferGeometry.setIndex(indices);
  bufferGeometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  bufferGeometry.setAttribute('color', new Float32BufferAttribute(color, 3));
  bufferGeometry.initNormals(indices, positions);

  var material = new MeshPhongMaterial({
    vertexColors: true
  });

  var mesh = new Mesh(bufferGeometry, material);
  scene.add(mesh);

  tick();

  function tick() {
    requestAnimationFrame(tick);
    webGlRenderer.render(scene, camera);
  }

};