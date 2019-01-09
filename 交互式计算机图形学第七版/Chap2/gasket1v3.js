"use strict";

var gl;
var points;

var NumPoints = 500000;

window.onload = function init() {
  var canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  // Initialize our data for the Sierpinski Gasket
  // First, initialize the corners of our gasket with three points.
  // 二维点
  var vertices = [
    vec2(-1, -1),
    vec2(0, 1),
    vec2(1, -1)
  ];

  // 三维点
  // var vertices = [
  //   vec3(-1, -1, 0),
  //   vec3(0, 1, 0),
  //   vec3(1, -1, 0)
  // ];

  // Specify a starting point p for our iterations
  // p must lie inside any set of three vertices
  // ((a+b)/2 + (a+c)/2)/2 = ((a+b)+(a+c))/4
  var u = mix(vertices[0], vertices[1], 0.5);
  var v = mix(vertices[0], vertices[2], 0.5);
  var p = mix(u, v, 0.5);

  // And, add our initial point into our array of points

  points = [p];

  // Compute new points
  // Each new point is located midway between
  // last point and a randomly chosen vertex

  for (var i = 0; points.length < NumPoints; ++i) {
    var j = Math.floor(Math.random() * 3);
    p = mix(points[i], vertices[j], 0.5);
    points.push(p);
  }

  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers

  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // Load the data into the GPU

  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer

  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, vertices[0].length, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  render();
};


function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, points.length);
}
