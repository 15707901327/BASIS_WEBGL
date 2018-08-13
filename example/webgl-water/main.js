/*
 * WebGL Water
 * http://madebyevan.com/webgl-water/
 *
 * Copyright 2011 Evan Wallace
 * Released under the MIT license
 */

function text2html(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
}

function handleError(text) {
  var html = text2html(text);
  if (html == 'WebGL not supported') {
    html = 'Your browser does not support WebGL.<br>Please see\
    <a href="http://www.khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">\
    Getting a WebGL Implementation</a>.';
  }
  var loading = document.getElementById('loading');
  loading.innerHTML = html;
  loading.style.zIndex = 1;
}

window.onerror = handleError;

var webGLRenderer = new PGL.WebGLRenderer();
var gl = webGLRenderer.getContext();
gl.HALF_FLOAT_OES = 0x8D61;

addMatrixStack();
addImmediateMode();
addEventListeners();
addOtherMethods();

function mapKeyCode(code) {
  var named = {
    8: 'BACKSPACE',
    9: 'TAB',
    13: 'ENTER',
    16: 'SHIFT',
    27: 'ESCAPE',
    32: 'SPACE',
    37: 'LEFT',
    38: 'UP',
    39: 'RIGHT',
    40: 'DOWN'
  };
  return named[code] || (code >= 65 && code <= 90 ? String.fromCharCode(code) : null);
}

function on(element, name, callback) {
  element.addEventListener(name, callback);
}

on(document, 'keydown', function (e) {
  if (!e.altKey && !e.ctrlKey && !e.metaKey) {
    var key = mapKeyCode(e.keyCode);
    if (key) PGL.keys[key] = true;
    PGL.keys[e.keyCode] = true;
  }
});

on(document, 'keyup', function (e) {
  if (!e.altKey && !e.ctrlKey && !e.metaKey) {
    var key = mapKeyCode(e.keyCode);
    if (key) PGL.keys[key] = false;
    PGL.keys[e.keyCode] = false;
  }
});

// ### Matrix stack
//
// Implement the OpenGL modelview and projection matrix stacks, along with some
// other useful GLU matrix functions.
function addMatrixStack() {
  gl.MODELVIEW = PGL.ENUM | 1;
  gl.PROJECTION = PGL.ENUM | 2;
  var tempMatrix = new PGL.Matrix();
  var resultMatrix = new PGL.Matrix();
  gl.modelviewMatrix = new PGL.Matrix();
  gl.projectionMatrix = new PGL.Matrix();
  var modelviewStack = [];
  var projectionStack = [];
  var matrix, stack;
  gl.matrixMode = function (mode) {
    switch (mode) {
      case gl.MODELVIEW:
        matrix = 'modelviewMatrix';
        stack = modelviewStack;
        break;
      case gl.PROJECTION:
        matrix = 'projectionMatrix';
        stack = projectionStack;
        break;
      default:
        throw new Error('invalid matrix mode ' + mode);
    }
  };
  gl.loadIdentity = function () {
    PGL.Matrix.identity(gl[matrix]);
  };
  gl.loadMatrix = function (m) {
    var from = m.m, to = gl[matrix].m;
    for (var i = 0; i < 16; i++) {
      to[i] = from[i];
    }
  };
  gl.multMatrix = function (m) {
    gl.loadMatrix(PGL.Matrix.multiply(gl[matrix], m, resultMatrix));
  };
  gl.perspective = function (fov, aspect, near, far) {
    gl.multMatrix(PGL.Matrix.perspective(fov, aspect, near, far, tempMatrix));
  };
  gl.frustum = function (l, r, b, t, n, f) {
    gl.multMatrix(Matrix.frustum(l, r, b, t, n, f, tempMatrix));
  };
  gl.ortho = function (l, r, b, t, n, f) {
    gl.multMatrix(Matrix.ortho(l, r, b, t, n, f, tempMatrix));
  };
  gl.scale = function (x, y, z) {
    gl.multMatrix(Matrix.scale(x, y, z, tempMatrix));
  };
  gl.translate = function (x, y, z) {
    gl.multMatrix(PGL.Matrix.translate(x, y, z, tempMatrix));
  };
  gl.rotate = function (a, x, y, z) {
    gl.multMatrix(PGL.Matrix.rotate(a, x, y, z, tempMatrix));
  };
  gl.lookAt = function (ex, ey, ez, cx, cy, cz, ux, uy, uz) {
    gl.multMatrix(Matrix.lookAt(ex, ey, ez, cx, cy, cz, ux, uy, uz, tempMatrix));
  };
  gl.pushMatrix = function () {
    stack.push(Array.prototype.slice.call(gl[matrix].m));
  };
  gl.popMatrix = function () {
    var m = stack.pop();
    gl[matrix].m = hasFloat32Array ? new Float32Array(m) : m;
  };
  gl.project = function (objX, objY, objZ, modelview, projection, viewport) {
    modelview = modelview || gl.modelviewMatrix;
    projection = projection || gl.projectionMatrix;
    viewport = viewport || gl.getParameter(gl.VIEWPORT);
    var point = projection.transformPoint(modelview.transformPoint(new Vector(objX, objY, objZ)));
    return new Vector(
      viewport[0] + viewport[2] * (point.x * 0.5 + 0.5),
      viewport[1] + viewport[3] * (point.y * 0.5 + 0.5),
      point.z * 0.5 + 0.5
    );
  };
  gl.unProject = function (winX, winY, winZ, modelview, projection, viewport) {
    modelview = modelview || gl.modelviewMatrix;
    projection = projection || gl.projectionMatrix;
    viewport = viewport || gl.getParameter(gl.VIEWPORT);
    var point = new PGL.Vector3(
      (winX - viewport[0]) / viewport[2] * 2 - 1,
      (winY - viewport[1]) / viewport[3] * 2 - 1,
      winZ * 2 - 1
    );
    return PGL.Matrix.inverse(PGL.Matrix.multiply(projection, modelview, tempMatrix), resultMatrix).transformPoint(point);
  };
  gl.matrixMode(gl.MODELVIEW);
}

// ### Immediate mode
//
// Provide an implementation of OpenGL's deprecated immediate mode. This is
// depricated for a reason: constantly re-specifying the geometry is a bad
// idea for performance. You should use a `GL.Mesh` instead, which specifies
// the geometry once and caches it on the graphics card. Still, nothing
// beats a quick `gl.begin(gl.POINTS); gl.vertex(1, 2, 3); gl.end();` for
// debugging. This intentionally doesn't implement fixed-function lighting
// because it's only meant for quick debugging tasks.
function addImmediateMode() {
  var immediateMode = {
    mesh: new PGL.Mesh({coords: true, colors: true, triangles: false}),
    mode: -1,
    coord: [0, 0, 0, 0],
    color: [1, 1, 1, 1],
    pointSize: 1,
    shader: new PGL.Shader('\
      uniform float pointSize;\
      varying vec4 color;\
      varying vec4 coord;\
      void main() {\
        color = gl_Color;\
        coord = gl_TexCoord;\
        gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
        gl_PointSize = pointSize;\
      }\
    ', '\
      uniform sampler2D texture;\
      uniform float pointSize;\
      uniform bool useTexture;\
      varying vec4 color;\
      varying vec4 coord;\
      void main() {\
        gl_FragColor = color;\
        if (useTexture) gl_FragColor *= texture2D(texture, coord.xy);\
      }\
    ')
  };
  gl.pointSize = function (pointSize) {
    immediateMode.shader.uniforms({pointSize: pointSize});
  };
  gl.begin = function (mode) {
    if (immediateMode.mode != -1) throw new Error('mismatched gl.begin() and gl.end() calls');
    immediateMode.mode = mode;
    immediateMode.mesh.colors = [];
    immediateMode.mesh.coords = [];
    immediateMode.mesh.vertices = [];
  };
  gl.color = function (r, g, b, a) {
    immediateMode.color = (arguments.length == 1) ? r.toArray().concat(1) : [r, g, b, a || 1];
  };
  gl.texCoord = function (s, t) {
    immediateMode.coord = (arguments.length == 1) ? s.toArray(2) : [s, t];
  };
  gl.vertex = function (x, y, z) {
    immediateMode.mesh.colors.push(immediateMode.color);
    immediateMode.mesh.coords.push(immediateMode.coord);
    immediateMode.mesh.vertices.push(arguments.length == 1 ? x.toArray() : [x, y, z]);
  };
  gl.end = function () {
    if (immediateMode.mode == -1) throw new Error('mismatched gl.begin() and gl.end() calls');
    immediateMode.mesh.compile();
    immediateMode.shader.uniforms({
      useTexture: !!gl.getParameter(gl.TEXTURE_BINDING_2D)
    }).draw(immediateMode.mesh, immediateMode.mode);
    immediateMode.mode = -1;
  };
}

function on(element, name, callback) {
  element.addEventListener(name, callback);
}
function off(element, name, callback) {
  element.removeEventListener(name, callback);
}

// ### Improved mouse events
//
// This adds event listeners on the `gl.canvas` element that call
// `gl.onmousedown()`, `gl.onmousemove()`, and `gl.onmouseup()` with an
// augmented event object. The event object also has the properties `x`, `y`,
// `deltaX`, `deltaY`, and `dragging`.
function addEventListeners() {
  var context = gl, oldX = 0, oldY = 0, buttons = {}, hasOld = false;
  var has = Object.prototype.hasOwnProperty;

  function isDragging() {
    for (var b in buttons) {
      if (has.call(buttons, b) && buttons[b]) return true;
    }
    return false;
  }

  function augment(original) {
    // Make a copy of original, a native `MouseEvent`, so we can overwrite
    // WebKit's non-standard read-only `x` and `y` properties (which are just
    // duplicates of `pageX` and `pageY`). We can't just use
    // `Object.create(original)` because some `MouseEvent` functions must be
    // called in the context of the original event object.
    var e = {};
    for (var name in original) {
      if (typeof original[name] == 'function') {
        e[name] = (function (callback) {
          return function () {
            callback.apply(original, arguments);
          };
        })(original[name]);
      } else {
        e[name] = original[name];
      }
    }
    e.original = original;
    e.x = e.pageX;
    e.y = e.pageY;
    for (var obj = gl.canvas; obj; obj = obj.offsetParent) {
      e.x -= obj.offsetLeft;
      e.y -= obj.offsetTop;
    }
    if (hasOld) {
      e.deltaX = e.x - oldX;
      e.deltaY = e.y - oldY;
    } else {
      e.deltaX = 0;
      e.deltaY = 0;
      hasOld = true;
    }
    oldX = e.x;
    oldY = e.y;
    e.dragging = isDragging();
    e.preventDefault = function () {
      e.original.preventDefault();
    };
    e.stopPropagation = function () {
      e.original.stopPropagation();
    };
    return e;
  }

  function mousedown(e) {
    gl = context;
    if (!isDragging()) {
      // Expand the event handlers to the document to handle dragging off canvas.
      on(document, 'mousemove', mousemove);
      on(document, 'mouseup', mouseup);
      off(gl.canvas, 'mousemove', mousemove);
      off(gl.canvas, 'mouseup', mouseup);
    }
    buttons[e.which] = true;
    e = augment(e);
    if (gl.onmousedown) gl.onmousedown(e);
    e.preventDefault();
  }

  function mousemove(e) {
    gl = context;
    e = augment(e);
    if (gl.onmousemove) gl.onmousemove(e);
    e.preventDefault();
  }

  function mouseup(e) {
    gl = context;
    buttons[e.which] = false;
    if (!isDragging()) {
      // Shrink the event handlers back to the canvas when dragging ends.
      off(document, 'mousemove', mousemove);
      off(document, 'mouseup', mouseup);
      on(gl.canvas, 'mousemove', mousemove);
      on(gl.canvas, 'mouseup', mouseup);
    }
    e = augment(e);
    if (gl.onmouseup) gl.onmouseup(e);
    e.preventDefault();
  }

  function reset() {
    hasOld = false;
  }

  function resetAll() {
    buttons = {};
    hasOld = false;
  }

  on(gl.canvas, 'mousedown', mousedown);
  on(gl.canvas, 'mousemove', mousemove);
  on(gl.canvas, 'mouseup', mouseup);
  on(gl.canvas, 'mouseover', reset);
  on(gl.canvas, 'mouseout', reset);
  on(document, 'contextmenu', resetAll);
}
function addOtherMethods() {
  // ### Multiple contexts
  //
  // When using multiple contexts in one web page, `gl.makeCurrent()` must be
  // called before issuing commands to a different context.
  (function (context) {
    gl.makeCurrent = function () {
      gl = context;
    };
  })(gl);

  // ### Animation
  //
  // Call `gl.animate()` to provide an animation loop that repeatedly calls
  // `gl.onupdate()` and `gl.ondraw()`.
  gl.animate = function () {
    var post =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      function (callback) {
        setTimeout(callback, 1000 / 60);
      };
    var time = new Date().getTime();
    var context = gl;

    function update() {
      gl = context;
      var now = new Date().getTime();
      if (gl.onupdate) gl.onupdate((now - time) / 1000);
      if (gl.ondraw) gl.ondraw();
      post(update);
      time = now;
    }

    update();
  };

  // ### Fullscreen
  //
  // Provide an easy way to get a fullscreen app running, including an
  // automatic 3D perspective projection matrix by default. This should be
  // called once.
  //
  // Just fullscreen, no automatic camera:
  //
  //     gl.fullscreen({ camera: false });
  //
  // Adjusting field of view, near plane distance, and far plane distance:
  //
  //     gl.fullscreen({ fov: 45, near: 0.1, far: 1000 });
  //
  // Adding padding from the edge of the window:
  //
  //     gl.fullscreen({ paddingLeft: 250, paddingBottom: 60 });
  //
  gl.fullscreen = function (options) {
    options = options || {};
    var top = options.paddingTop || 0;
    var left = options.paddingLeft || 0;
    var right = options.paddingRight || 0;
    var bottom = options.paddingBottom || 0;
    if (!document.body) {
      throw new Error('document.body doesn\'t exist yet (call gl.fullscreen() from ' +
        'window.onload() or from inside the <body> tag)');
    }
    document.body.appendChild(gl.canvas);
    document.body.style.overflow = 'hidden';
    gl.canvas.style.position = 'absolute';
    gl.canvas.style.left = left + 'px';
    gl.canvas.style.top = top + 'px';

    function resize() {
      gl.canvas.width = window.innerWidth - left - right;
      gl.canvas.height = window.innerHeight - top - bottom;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      if (options.camera || !('camera' in options)) {
        gl.matrixMode(gl.PROJECTION);
        gl.loadIdentity();
        gl.perspective(options.fov || 45, gl.canvas.width / gl.canvas.height,
          options.near || 0.1, options.far || 1000);
        gl.matrixMode(gl.MODELVIEW);
      }
      if (gl.ondraw) gl.ondraw();
    }

    on(window, 'resize', resize);
    resize();
  };
}

var water;
var cubemap;
var renderer;
var angleX = -25;
var angleY = -200.5;

// Sphere physics info
var useSpherePhysics = false;
var center;
var oldCenter;
var velocity;
var gravity;
var radius;
var paused = false;

window.onload = function () {
  var ratio = window.devicePixelRatio || 1;
  var help = document.getElementById('help');

  function onresize() {
    var width = innerWidth - help.clientWidth - 20;
    var height = innerHeight;
    gl.canvas.width = width * ratio;
    gl.canvas.height = height * ratio;
    gl.canvas.style.width = width + 'px';
    gl.canvas.style.height = height + 'px';
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.matrixMode(gl.PROJECTION);
    gl.loadIdentity();
    gl.perspective(45, gl.canvas.width / gl.canvas.height, 0.01, 100);
    gl.matrixMode(gl.MODELVIEW);
    draw();
  }

  document.body.appendChild(gl.canvas);
  gl.clearColor(0, 0, 0, 1);

  water = new Water();
  renderer = new Renderer();
  cubemap = new Cubemap({
    xneg: document.getElementById('xneg'),
    xpos: document.getElementById('xpos'),
    yneg: document.getElementById('ypos'),
    ypos: document.getElementById('ypos'),
    zneg: document.getElementById('zneg'),
    zpos: document.getElementById('zpos')
  });

  if (!water.textureA.canDrawTo() || !water.textureB.canDrawTo()) {
    throw new Error('Rendering to floating-point textures is required but not supported');
  }

  center = oldCenter = new PGL.Vector3(-0.4, -0.75, 0.2);
  velocity = new PGL.Vector3();
  gravity = new PGL.Vector3(0, -4, 0);
  radius = 0.25;

  for (var i = 0; i < 20; i++) {
    water.addDrop(Math.random() * 2 - 1, Math.random() * 2 - 1, 0.03, (i & 1) ? 0.01 : -0.01);
  }

  document.getElementById('loading').innerHTML = '';
  onresize();

  var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
    setTimeout(callback, 0);
  };

  var prevTime = new Date().getTime();

  function animate() {
    var nextTime = new Date().getTime();
    if (!paused) {
      update((nextTime - prevTime) / 1000);
      draw();
    }
    prevTime = nextTime;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  window.onresize = onresize;

  var prevHit;
  var planeNormal;
  var mode = -1;
  var MODE_ADD_DROPS = 0;
  var MODE_MOVE_SPHERE = 1;
  var MODE_ORBIT_CAMERA = 2;

  var oldX, oldY;

  function startDrag(x, y) {
    oldX = x;
    oldY = y;
    var tracer = new PGL.Raytracer();
    var ray = tracer.getRayForPixel(x * ratio, y * ratio);
    var pointOnPlane = tracer.eye.add(ray.multiply(-tracer.eye.y / ray.y));
    var sphereHitTest = PGL.Raytracer.hitTestSphere(tracer.eye, ray, center, radius);
    if (sphereHitTest) {
      mode = MODE_MOVE_SPHERE;
      prevHit = sphereHitTest.hit;
      planeNormal = tracer.getRayForPixel(gl.canvas.width / 2, gl.canvas.height / 2).negative();
    } else if (Math.abs(pointOnPlane.x) < 1 && Math.abs(pointOnPlane.z) < 1) {
      mode = MODE_ADD_DROPS;
      duringDrag(x, y);
    } else {
      mode = MODE_ORBIT_CAMERA;
    }
  }

  function duringDrag(x, y) {
    switch (mode) {
      case MODE_ADD_DROPS: {
        var tracer = new PGL.Raytracer();
        var ray = tracer.getRayForPixel(x * ratio, y * ratio);
        var pointOnPlane = tracer.eye.add(ray.multiply(-tracer.eye.y / ray.y));
        water.addDrop(pointOnPlane.x, pointOnPlane.z, 0.03, 0.01);
        if (paused) {
          water.updateNormals();
          renderer.updateCaustics(water);
        }
        break;
      }
      case MODE_MOVE_SPHERE: {
        var tracer = new PGL.Raytracer();
        var ray = tracer.getRayForPixel(x * ratio, y * ratio);
        var t = -planeNormal.dot(tracer.eye.subtract(prevHit)) / planeNormal.dot(ray);
        var nextHit = tracer.eye.add(ray.multiply(t));
        center = center.add(nextHit.subtract(prevHit));
        center.x = Math.max(radius - 1, Math.min(1 - radius, center.x));
        center.y = Math.max(radius - 1, Math.min(10, center.y));
        center.z = Math.max(radius - 1, Math.min(1 - radius, center.z));
        prevHit = nextHit;
        if (paused) renderer.updateCaustics(water);
        break;
      }
      case MODE_ORBIT_CAMERA: {
        angleY -= x - oldX;
        angleX -= y - oldY;
        angleX = Math.max(-89.999, Math.min(89.999, angleX));
        break;
      }
    }
    oldX = x;
    oldY = y;
    if (paused) draw();
  }

  function stopDrag() {
    mode = -1;
  }

  function isHelpElement(element) {
    return element === help || element.parentNode && isHelpElement(element.parentNode);
  }

  document.onmousedown = function (e) {
    if (!isHelpElement(e.target)) {
      e.preventDefault();
      startDrag(e.pageX, e.pageY);
    }
  };

  document.onmousemove = function (e) {
    duringDrag(e.pageX, e.pageY);
  };

  document.onmouseup = function () {
    stopDrag();
  };

  document.ontouchstart = function (e) {
    if (e.touches.length === 1 && !isHelpElement(e.target)) {
      e.preventDefault();
      startDrag(e.touches[0].pageX, e.touches[0].pageY);
    }
  };

  document.ontouchmove = function (e) {
    if (e.touches.length === 1) {
      duringDrag(e.touches[0].pageX, e.touches[0].pageY);
    }
  };

  document.ontouchend = function (e) {
    if (e.touches.length == 0) {
      stopDrag();
    }
  };

  document.onkeydown = function (e) {
    if (e.which == ' '.charCodeAt(0)) paused = !paused;
    else if (e.which == 'G'.charCodeAt(0)) useSpherePhysics = !useSpherePhysics;
    else if (e.which == 'L'.charCodeAt(0) && paused) draw();
  };

  var frame = 0;

  function update(seconds) {
    if (seconds > 1) return;
    frame += seconds * 2;

    if (mode === MODE_MOVE_SPHERE) {
      // Start from rest when the player releases the mouse after moving the sphere
      velocity = new PGL.Vector3();
    } else if (useSpherePhysics) {
      // Fall down with viscosity under water
      var percentUnderWater = Math.max(0, Math.min(1, (radius - center.y) / (2 * radius)));
      velocity = velocity.add(gravity.multiply(seconds - 1.1 * seconds * percentUnderWater));
      velocity = velocity.subtract(velocity.unit().multiply(percentUnderWater * seconds * velocity.dot(velocity)));
      center = center.add(velocity.multiply(seconds));

      // Bounce off the bottom
      if (center.y < radius - 1) {
        center.y = radius - 1;
        velocity.y = Math.abs(velocity.y) * 0.7;
      }
    }

    // Displace water around the sphere
    water.moveSphere(oldCenter, center, radius);
    oldCenter = center;

    // Update the water simulation and graphics
    water.stepSimulation();
    water.stepSimulation();
    water.updateNormals();
    renderer.updateCaustics(water);
  }

  function draw() {
    // Change the light direction to the camera look vector when the L key is pressed
    if (PGL.keys.L) {
      renderer.lightDir = PGL.Vector3.fromAngles((90 - angleY) * Math.PI / 180, -angleX * Math.PI / 180);
      if (paused) renderer.updateCaustics(water);
    }

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.loadIdentity();
    gl.translate(0, 0, -4);
    gl.rotate(-angleX, 1, 0, 0);
    gl.rotate(-angleY, 0, 1, 0);
    gl.translate(0, 0.5, 0);

    gl.enable(gl.DEPTH_TEST);
    renderer.sphereCenter = center;
    renderer.sphereRadius = radius;
    renderer.renderCube();
    renderer.renderWater(water, cubemap);
    renderer.renderSphere();
    gl.disable(gl.DEPTH_TEST);
  }
};
