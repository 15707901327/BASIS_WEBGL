var PGL = (function () {
  var PGL = {
    Shader: Shader
  };

  // 以`gl_`开头的非标准名称必须被破坏，否则会导致编译器错误。
  var LIGHTGL_PREFIX = 'LIGHTGL';

  function regexMap(regex, text, callback) {
    var result;
    while ((result = regex.exec(text)) != null) {
      callback(result);
    }
  }

  /*****************************************************************
   * src/shader.js
   * Provides a convenient wrapper for WebGL shaders. A few uniforms and attributes,
   * prefixed with `gl_`, are automatically added to all shader sources to make
   * simple shaders easier to write.
   *
   * Example usage:
   * var shader = new GL.Shader('\
   *  void main() {\
   *   gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
   *  }\
   *  ', '\
   *  uniform vec4 color;\
   *    void main() {\
   *     gl_FragColor = color;\
   *    }\
   *  ');
   *  shader.uniforms({
   *   color: [1, 0, 0, 1]
   *  }).draw(mesh);
   * @param vertexSource
   * @param fragmentSource
   * @constructor
   *******************************************************************/
  function Shader(vertexSource, fragmentSource) {
    // Allow passing in the id of an HTML script tag with the source
    function followScriptTagById(id) {
      var element = document.getElementById(id);
      return element ? element.text : id;
    }

    vertexSource = followScriptTagById(vertexSource);
    fragmentSource = followScriptTagById(fragmentSource);

    // Headers are prepended to the sources to provide some automatic functionality.
    var header = '\
    uniform mat3 gl_NormalMatrix;\
    uniform mat4 gl_ModelViewMatrix;\
    uniform mat4 gl_ProjectionMatrix;\
    uniform mat4 gl_ModelViewProjectionMatrix;\
    uniform mat4 gl_ModelViewMatrixInverse;\
    uniform mat4 gl_ProjectionMatrixInverse;\
    uniform mat4 gl_ModelViewProjectionMatrixInverse;\
  ';
    var vertexHeader = header + '\
    attribute vec4 gl_Vertex;\
    attribute vec4 gl_TexCoord;\
    attribute vec3 gl_Normal;\
    attribute vec4 gl_Color;\
    vec4 ftransform() {\
      return gl_ModelViewProjectionMatrix * gl_Vertex;\
    }\
  ';
    var fragmentHeader = '\
    precision highp float;\
  ' + header;

    // Check for the use of built-in matrices that require expensive matrix
    // multiplications to compute, and record these in `usedMatrices`.
    var source = vertexSource + fragmentSource;
    var usedMatrices = {};
    regexMap(/\b(gl_[^;]*)\b;/g, header, function (groups) {
      var name = groups[1];
      if (source.indexOf(name) !== -1) {
        var capitalLetters = name.replace(/[a-z_]/g, '');
        usedMatrices[capitalLetters] = LIGHTGL_PREFIX + name;
      }
    });
    if (source.indexOf('ftransform') !== -1) usedMatrices.MVPM = LIGHTGL_PREFIX + 'gl_ModelViewProjectionMatrix';
    this.usedMatrices = usedMatrices;

    // The `gl_` prefix must be substituted for something else to avoid compile
    // errors, since it's a reserved prefix. This prefixes all reserved names with
    // `_`. The header is inserted after any extensions, since those must come
    // first.
    function fix(header, source) {
      var replaced = {};
      var match = /^((\s*\/\/.*\n|\s*#extension.*\n)+)[^]*$/.exec(source);
      source = match ? match[1] + header + source.substr(match[1].length) : header + source;
      regexMap(/\bgl_\w+\b/g, header, function (result) {
        if (!(result in replaced)) {
          source = source.replace(new RegExp('\\b' + result + '\\b', 'g'), LIGHTGL_PREFIX + result);
          replaced[result] = true;
        }
      });
      return source;
    }

    vertexSource = fix(vertexHeader, vertexSource);
    fragmentSource = fix(fragmentHeader, fragmentSource);

    // Compile and link errors are thrown as strings.
    function compileSource(type, source) {
      var shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error('compile error: ' + gl.getShaderInfoLog(shader));
      }
      return shader;
    }

    this.program = gl.createProgram();
    gl.attachShader(this.program, compileSource(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(this.program, compileSource(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      throw new Error('link error: ' + gl.getProgramInfoLog(this.program));
    }
    this.attributes = {};
    this.uniformLocations = {};

    // Sampler uniforms need to be uploaded using `gl.uniform1i()` instead of `gl.uniform1f()`.
    // To do this automatically, we detect and remember all uniform samplers in the source code.
    var isSampler = {};
    regexMap(/uniform\s+sampler(1D|2D|3D|Cube)\s+(\w+)\s*;/g, vertexSource + fragmentSource, function (groups) {
      isSampler[groups[2]] = 1;
    });
    this.isSampler = isSampler;
  }

  Shader.prototype = {
    // ### .uniforms(uniforms)
    //
    // Set a uniform for each property of `uniforms`. The correct `gl.uniform*()` method is
    // inferred from the value types and from the stored uniform sampler flags.
    uniforms: function (uniforms) {
      gl.useProgram(this.program);

      for (var name in uniforms) {
        var location = this.uniformLocations[name] || gl.getUniformLocation(this.program, name);
        if (!location) continue;
        this.uniformLocations[name] = location;
        var value = uniforms[name];
        if (value instanceof PGL.Vector3) {
          value = [value.x, value.y, value.z];
        } else if (value instanceof PGL.Matrix) {
          value = value.m;
        }
        if (PGL.isArray(value)) {
          switch (value.length) {
            case 1:
              gl.uniform1fv(location, new Float32Array(value));
              break;
            case 2:
              gl.uniform2fv(location, new Float32Array(value));
              break;
            case 3:
              gl.uniform3fv(location, new Float32Array(value));
              break;
            case 4:
              gl.uniform4fv(location, new Float32Array(value));
              break;
            // Matrices are automatically transposed, since WebGL uses column-major
            // indices instead of row-major indices.
            case 9:
              gl.uniformMatrix3fv(location, false, new Float32Array([
                value[0], value[3], value[6],
                value[1], value[4], value[7],
                value[2], value[5], value[8]
              ]));
              break;
            case 16:
              gl.uniformMatrix4fv(location, false, new Float32Array([
                value[0], value[4], value[8], value[12],
                value[1], value[5], value[9], value[13],
                value[2], value[6], value[10], value[14],
                value[3], value[7], value[11], value[15]
              ]));
              break;
            default:
              throw new Error('don\'t know how to load uniform "' + name + '" of length ' + value.length);
          }
        } else if (PGL.isNumber(value)) {
          (this.isSampler[name] ? gl.uniform1i : gl.uniform1f).call(gl, location, value);
        } else {
          throw new Error('attempted to set uniform "' + name + '" to invalid value ' + value);
        }
      }

      return this;
    },
    draw: function (mesh, mode) {
      this.drawBuffers(mesh.vertexBuffers,
        mesh.indexBuffers[mode === gl.LINES ? 'lines' : 'triangles'],
        arguments.length < 2 ? gl.TRIANGLES : mode);
    },
    /**
     *
     * @param vertexBuffers
     * @param indexBuffer
     * @param mode
     * @return {Shader}
     */
    drawBuffers: function (vertexBuffers, indexBuffer, mode) {
      // Only construct up the built-in matrices we need for this shader.
      var used = this.usedMatrices;
      var MVM = gl.modelviewMatrix;
      var PM = gl.projectionMatrix;
      var MVMI = (used.MVMI || used.NM) ? MVM.inverse() : null;
      var PMI = (used.PMI) ? PM.inverse() : null;
      var MVPM = (used.MVPM || used.MVPMI) ? PM.multiply(MVM) : null;
      var matrices = {};
      if (used.MVM) matrices[used.MVM] = MVM;
      if (used.MVMI) matrices[used.MVMI] = MVMI;
      if (used.PM) matrices[used.PM] = PM;
      if (used.PMI) matrices[used.PMI] = PMI;
      if (used.MVPM) matrices[used.MVPM] = MVPM;
      if (used.MVPMI) matrices[used.MVPMI] = MVPM.inverse();
      if (used.NM) {
        var m = MVMI.m;
        matrices[used.NM] = [m[0], m[4], m[8], m[1], m[5], m[9], m[2], m[6], m[10]];
      }
      this.uniforms(matrices);

      // Create and enable attribute pointers as necessary.
      var length = 0;
      for (var attribute in vertexBuffers) {
        var buffer = vertexBuffers[attribute];
        var location = this.attributes[attribute] ||
          gl.getAttribLocation(this.program, attribute.replace(/^(gl_.*)$/, LIGHTGL_PREFIX + '$1'));
        if (location == -1 || !buffer.buffer) continue;
        this.attributes[attribute] = location;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, buffer.buffer.spacing, gl.FLOAT, false, 0, 0);
        length = buffer.buffer.length / buffer.buffer.spacing;
      }

      // Disable unused attribute pointers.
      for (var attribute in this.attributes) {
        if (!(attribute in vertexBuffers)) {
          gl.disableVertexAttribArray(this.attributes[attribute]);
        }
      }

      // Draw the geometry.
      if (length && (!indexBuffer || indexBuffer.buffer)) {
        if (indexBuffer) {
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
          gl.drawElements(mode, indexBuffer.buffer.length, gl.UNSIGNED_SHORT, 0);
        } else {
          gl.drawArrays(mode, 0, length);
        }
      }

      return this;
    }
  };

  return PGL;
})();

// 使用的常量
(function (PGL) {
  PGL.REVISION = 2;
  PGL.ENUM = 0x12340000; // A value to bitwise-or with new enums to make them distinguishable from the standard WebGL enums.
  PGL.keys = {} // `GL.keys` contains a mapping of key codes to booleans indicating whether that key is currently pressed.
})(PGL);

// 常用方法
(function (PGL) {
  PGL.hasFloat32Array = (typeof Float32Array !== 'undefined');
  /**
   * 判断obj值是否是数组
   * @param obj
   * @return {boolean}
   */
  PGL.isArray = function (obj) {
    var str = Object.prototype.toString.call(obj);
    return str === '[object Array]' || str === '[object Float32Array]';
  };
  /**
   * 判断是否是数字
   * @param obj
   * @return {boolean}
   */
  PGL.isNumber = function (obj) {
    var str = Object.prototype.toString.call(obj);
    return str === '[object Number]' || str === '[object Boolean]';
  };
  PGL.pickOctant = function (i) {
    return new PGL.Vector3((i & 1) * 2 - 1, (i & 2) - 1, (i & 4) / 2 - 1);
  }
})(PGL);

/**
 * 公共方法
 * PGL.Matrix
 * PGL.Vector3
 */
(function (PGL) {
  /**
   *  Represents a 4x4 matrix stored in row-major order that uses Float32Arrays
   *  when available. Matrix operations can either be done using convenient
   *  methods that return a new matrix for the result or optimized methods
   *  that store the result in an existing matrix to avoid generating garbage.
   *  ### new GL.Matrix([elements])
   *  This constructor takes 16 arguments in row-major order, which can be passed
   *  individually, as a list, or even as four lists, one for each row. If the
   *  arguments are omitted then the identity matrix is constructed instead.
   * @constructor
   */
  PGL.Matrix = function () {
    var m = Array.prototype.concat.apply([], arguments);
    if (!m.length) {
      m = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ];
    }
    this.m = PGL.hasFloat32Array ? new Float32Array(m) : m;
  };
  Object.assign(PGL.Matrix.prototype, {
    // ### .transpose()
    //
    // Returns this matrix, exchanging columns for rows.
    transpose: function () {
      return PGL.Matrix.transpose(this, new PGL.Matrix());
    },
    // ### .multiply(matrix)
    //
    // Returns the concatenation of the transforms for this matrix and `matrix`.
    // This emulates the OpenGL function `glMultMatrix()`.
    multiply: function (matrix) {
      return PGL.Matrix.multiply(this, matrix, new PGL.Matrix());
    },
    // ### .inverse()
    //
    // Returns the matrix that when multiplied with this matrix results in the
    // identity matrix.
    inverse: function () {
      return PGL.Matrix.inverse(this, new PGL.Matrix());
    },
    // ### .transformPoint(point)
    //
    // Transforms the vector as a point with a w coordinate of 1. This
    // means translations will have an effect, for example.
    transformPoint: function (v) {
      var m = this.m;
      return new PGL.Vector3(
        m[0] * v.x + m[1] * v.y + m[2] * v.z + m[3],
        m[4] * v.x + m[5] * v.y + m[6] * v.z + m[7],
        m[8] * v.x + m[9] * v.y + m[10] * v.z + m[11]
      ).divide(m[12] * v.x + m[13] * v.y + m[14] * v.z + m[15]);
    },
    // ### .transformPoint(vector)
    //
    // Transforms the vector as a vector with a w coordinate of 0. This
    // means translations will have no effect, for example.
    transformVector: function (v) {
      var m = this.m;
      return new PGL.Vector3(
        m[0] * v.x + m[1] * v.y + m[2] * v.z,
        m[4] * v.x + m[5] * v.y + m[6] * v.z,
        m[8] * v.x + m[9] * v.y + m[10] * v.z
      );
    }
  });
  // ### GL.Matrix.transpose(matrix[, result])
//
// Returns `matrix`, exchanging columns for rows. You can optionally pass an
// existing matrix in `result` to avoid allocating a new matrix.
  PGL.Matrix.transpose = function (matrix, result) {
    result = result || new PGL.Matrix();
    var m = matrix.m, r = result.m;
    r[0] = m[0];
    r[1] = m[4];
    r[2] = m[8];
    r[3] = m[12];
    r[4] = m[1];
    r[5] = m[5];
    r[6] = m[9];
    r[7] = m[13];
    r[8] = m[2];
    r[9] = m[6];
    r[10] = m[10];
    r[11] = m[14];
    r[12] = m[3];
    r[13] = m[7];
    r[14] = m[11];
    r[15] = m[15];
    return result;
  };
  // ### GL.Matrix.identity([result])
  //
  // Returns an identity matrix. You can optionally pass an existing matrix in
  // `result` to avoid allocating a new matrix. This emulates the OpenGL function
  // `glLoadIdentity()`.
  PGL.Matrix.identity = function (result) {
    result = result || new PGL.Matrix();
    var m = result.m;
    m[0] = m[5] = m[10] = m[15] = 1;
    m[1] = m[2] = m[3] = m[4] = m[6] = m[7] = m[8] = m[9] = m[11] = m[12] = m[13] = m[14] = 0;
    return result;
  };
  // ### GL.Matrix.frustum(left, right, bottom, top, near, far[, result])
  //
  // Sets up a viewing frustum, which is shaped like a truncated pyramid with the
  // camera where the point of the pyramid would be. You can optionally pass an
  // existing matrix in `result` to avoid allocating a new matrix. This emulates
  // the OpenGL function `glFrustum()`.
  PGL.Matrix.frustum = function (l, r, b, t, n, f, result) {
    result = result || new PGL.Matrix();
    var m = result.m;

    m[0] = 2 * n / (r - l);
    m[1] = 0;
    m[2] = (r + l) / (r - l);
    m[3] = 0;

    m[4] = 0;
    m[5] = 2 * n / (t - b);
    m[6] = (t + b) / (t - b);
    m[7] = 0;

    m[8] = 0;
    m[9] = 0;
    m[10] = -(f + n) / (f - n);
    m[11] = -2 * f * n / (f - n);

    m[12] = 0;
    m[13] = 0;
    m[14] = -1;
    m[15] = 0;

    return result;
  };
  // ### GL.Matrix.perspective(fov, aspect, near, far[, result])
  //
  // Returns a perspective transform matrix, which makes far away objects appear
  // smaller than nearby objects. The `aspect` argument should be the width
  // divided by the height of your viewport and `fov` is the top-to-bottom angle
  // of the field of view in degrees. You can optionally pass an existing matrix
  // in `result` to avoid allocating a new matrix. This emulates the OpenGL
  // function `gluPerspective()`.
  PGL.Matrix.perspective = function (fov, aspect, near, far, result) {
    var y = Math.tan(fov * Math.PI / 360) * near;
    var x = y * aspect;
    return PGL.Matrix.frustum(-x, x, -y, y, near, far, result);
  };
  // ### GL.Matrix.multiply(left, right[, result])
  //
  // Returns the concatenation of the transforms for `left` and `right`. You can
  // optionally pass an existing matrix in `result` to avoid allocating a new
  // matrix. This emulates the OpenGL function `glMultMatrix()`.
  PGL.Matrix.multiply = function (left, right, result) {
    result = result || new PGL.Matrix();
    var a = left.m, b = right.m, r = result.m;

    r[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
    r[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
    r[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
    r[3] = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];

    r[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
    r[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
    r[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
    r[7] = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];

    r[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
    r[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
    r[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
    r[11] = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];

    r[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
    r[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
    r[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
    r[15] = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];

    return result;
  };
  // ### GL.Matrix.translate(x, y, z[, result])
  //
  // This emulates the OpenGL function `glTranslate()`. You can optionally pass
  // an existing matrix in `result` to avoid allocating a new matrix.
  PGL.Matrix.translate = function (x, y, z, result) {
    result = result || new PGL.Matrix();
    var m = result.m;

    m[0] = 1;
    m[1] = 0;
    m[2] = 0;
    m[3] = x;

    m[4] = 0;
    m[5] = 1;
    m[6] = 0;
    m[7] = y;

    m[8] = 0;
    m[9] = 0;
    m[10] = 1;
    m[11] = z;

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    return result;
  };
  // ### GL.Matrix.rotate(a, x, y, z[, result])
  //
  // Returns a matrix that rotates by `a` degrees around the vector `x, y, z`.
  // You can optionally pass an existing matrix in `result` to avoid allocating
  // a new matrix. This emulates the OpenGL function `glRotate()`.
  PGL.Matrix.rotate = function (a, x, y, z, result) {
    if (!a || (!x && !y && !z)) {
      return PGL.Matrix.identity(result);
    }

    result = result || new PGL.Matrix();
    var m = result.m;

    var d = Math.sqrt(x * x + y * y + z * z);
    a *= Math.PI / 180;
    x /= d;
    y /= d;
    z /= d;
    var c = Math.cos(a), s = Math.sin(a), t = 1 - c;

    m[0] = x * x * t + c;
    m[1] = x * y * t - z * s;
    m[2] = x * z * t + y * s;
    m[3] = 0;

    m[4] = y * x * t + z * s;
    m[5] = y * y * t + c;
    m[6] = y * z * t - x * s;
    m[7] = 0;

    m[8] = z * x * t - y * s;
    m[9] = z * y * t + x * s;
    m[10] = z * z * t + c;
    m[11] = 0;

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    return result;
  };
  // ### GL.Matrix.inverse(matrix[, result])
  //
  // Returns the matrix that when multiplied with `matrix` results in the
  // identity matrix. You can optionally pass an existing matrix in `result`
  // to avoid allocating a new matrix. This implementation is from the Mesa
  // OpenGL function `__gluInvertMatrixd()` found in `project.c`.
  PGL.Matrix.inverse = function (matrix, result) {
    result = result || new PGL.Matrix();
    var m = matrix.m, r = result.m;

    r[0] = m[5] * m[10] * m[15] - m[5] * m[14] * m[11] - m[6] * m[9] * m[15] + m[6] * m[13] * m[11] + m[7] * m[9] * m[14] - m[7] * m[13] * m[10];
    r[1] = -m[1] * m[10] * m[15] + m[1] * m[14] * m[11] + m[2] * m[9] * m[15] - m[2] * m[13] * m[11] - m[3] * m[9] * m[14] + m[3] * m[13] * m[10];
    r[2] = m[1] * m[6] * m[15] - m[1] * m[14] * m[7] - m[2] * m[5] * m[15] + m[2] * m[13] * m[7] + m[3] * m[5] * m[14] - m[3] * m[13] * m[6];
    r[3] = -m[1] * m[6] * m[11] + m[1] * m[10] * m[7] + m[2] * m[5] * m[11] - m[2] * m[9] * m[7] - m[3] * m[5] * m[10] + m[3] * m[9] * m[6];

    r[4] = -m[4] * m[10] * m[15] + m[4] * m[14] * m[11] + m[6] * m[8] * m[15] - m[6] * m[12] * m[11] - m[7] * m[8] * m[14] + m[7] * m[12] * m[10];
    r[5] = m[0] * m[10] * m[15] - m[0] * m[14] * m[11] - m[2] * m[8] * m[15] + m[2] * m[12] * m[11] + m[3] * m[8] * m[14] - m[3] * m[12] * m[10];
    r[6] = -m[0] * m[6] * m[15] + m[0] * m[14] * m[7] + m[2] * m[4] * m[15] - m[2] * m[12] * m[7] - m[3] * m[4] * m[14] + m[3] * m[12] * m[6];
    r[7] = m[0] * m[6] * m[11] - m[0] * m[10] * m[7] - m[2] * m[4] * m[11] + m[2] * m[8] * m[7] + m[3] * m[4] * m[10] - m[3] * m[8] * m[6];

    r[8] = m[4] * m[9] * m[15] - m[4] * m[13] * m[11] - m[5] * m[8] * m[15] + m[5] * m[12] * m[11] + m[7] * m[8] * m[13] - m[7] * m[12] * m[9];
    r[9] = -m[0] * m[9] * m[15] + m[0] * m[13] * m[11] + m[1] * m[8] * m[15] - m[1] * m[12] * m[11] - m[3] * m[8] * m[13] + m[3] * m[12] * m[9];
    r[10] = m[0] * m[5] * m[15] - m[0] * m[13] * m[7] - m[1] * m[4] * m[15] + m[1] * m[12] * m[7] + m[3] * m[4] * m[13] - m[3] * m[12] * m[5];
    r[11] = -m[0] * m[5] * m[11] + m[0] * m[9] * m[7] + m[1] * m[4] * m[11] - m[1] * m[8] * m[7] - m[3] * m[4] * m[9] + m[3] * m[8] * m[5];

    r[12] = -m[4] * m[9] * m[14] + m[4] * m[13] * m[10] + m[5] * m[8] * m[14] - m[5] * m[12] * m[10] - m[6] * m[8] * m[13] + m[6] * m[12] * m[9];
    r[13] = m[0] * m[9] * m[14] - m[0] * m[13] * m[10] - m[1] * m[8] * m[14] + m[1] * m[12] * m[10] + m[2] * m[8] * m[13] - m[2] * m[12] * m[9];
    r[14] = -m[0] * m[5] * m[14] + m[0] * m[13] * m[6] + m[1] * m[4] * m[14] - m[1] * m[12] * m[6] - m[2] * m[4] * m[13] + m[2] * m[12] * m[5];
    r[15] = m[0] * m[5] * m[10] - m[0] * m[9] * m[6] - m[1] * m[4] * m[10] + m[1] * m[8] * m[6] + m[2] * m[4] * m[9] - m[2] * m[8] * m[5];

    var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];
    for (var i = 0; i < 16; i++) r[i] /= det;
    return result;
  };
  // ### GL.Matrix.ortho(left, right, bottom, top, near, far[, result])
  //
  // Returns an orthographic projection, in which objects are the same size no
  // matter how far away or nearby they are. You can optionally pass an existing
  // matrix in `result` to avoid allocating a new matrix. This emulates the OpenGL
  // function `glOrtho()`.
  PGL.Matrix.ortho = function (l, r, b, t, n, f, result) {
    result = result || new PGL.Matrix();
    var m = result.m;

    m[0] = 2 / (r - l);
    m[1] = 0;
    m[2] = 0;
    m[3] = -(r + l) / (r - l);

    m[4] = 0;
    m[5] = 2 / (t - b);
    m[6] = 0;
    m[7] = -(t + b) / (t - b);

    m[8] = 0;
    m[9] = 0;
    m[10] = -2 / (f - n);
    m[11] = -(f + n) / (f - n);

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    return result;
  };
  // ### GL.Matrix.scale(x, y, z[, result])
  //
  // This emulates the OpenGL function `glScale()`. You can optionally pass an
  // existing matrix in `result` to avoid allocating a new matrix.
  PGL.Matrix.scale = function (x, y, z, result) {
    result = result || new PGL.Matrix();
    var m = result.m;

    m[0] = x;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;

    m[4] = 0;
    m[5] = y;
    m[6] = 0;
    m[7] = 0;

    m[8] = 0;
    m[9] = 0;
    m[10] = z;
    m[11] = 0;

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    return result;
  };
  // ### GL.Matrix.lookAt(ex, ey, ez, cx, cy, cz, ux, uy, uz[, result])
  //
  // Returns a matrix that puts the camera at the eye point `ex, ey, ez` looking
  // toward the center point `cx, cy, cz` with an up direction of `ux, uy, uz`.
  // You can optionally pass an existing matrix in `result` to avoid allocating
  // a new matrix. This emulates the OpenGL function `gluLookAt()`.
  PGL.Matrix.lookAt = function (ex, ey, ez, cx, cy, cz, ux, uy, uz, result) {
    result = result || new PGL.Matrix();
    var m = result.m;

    var e = new PGL.Vector3(ex, ey, ez);
    var c = new PGL.Vector3(cx, cy, cz);
    var u = new PGL.Vector3(ux, uy, uz);
    var f = e.subtract(c).unit();
    var s = u.cross(f).unit();
    var t = f.cross(s).unit();

    m[0] = s.x;
    m[1] = s.y;
    m[2] = s.z;
    m[3] = -s.dot(e);

    m[4] = t.x;
    m[5] = t.y;
    m[6] = t.z;
    m[7] = -t.dot(e);

    m[8] = f.x;
    m[9] = f.y;
    m[10] = f.z;
    m[11] = -f.dot(e);

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    return result;
  };

  /**
   * PGL.Vector3
   * Provides a simple 3D vector class. Vector operations can be done using member functions,
   * which return new vectors, or static functions, which reuse existing vectors to avoid generating garbage.
   * @param x
   * @param y
   * @param z
   * @constructor
   */
  PGL.Vector3 = function (x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  };
  PGL.Vector3.prototype = {
    negative: function () {
      return new PGL.Vector3(-this.x, -this.y, -this.z);
    },
    add: function (v) {
      if (v instanceof PGL.Vector3) return new PGL.Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
      else return new PGL.Vector3(this.x + v, this.y + v, this.z + v);
    },
    subtract: function (v) {
      if (v instanceof PGL.Vector3) return new PGL.Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
      else return new PGL.Vector3(this.x - v, this.y - v, this.z - v);
    },
    multiply: function (v) {
      if (v instanceof PGL.Vector3) return new PGL.Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
      else return new PGL.Vector3(this.x * v, this.y * v, this.z * v);
    },
    divide: function (v) {
      if (v instanceof PGL.Vector3) return new PGL.Vector3(this.x / v.x, this.y / v.y, this.z / v.z);
      else return new PGL.Vector3(this.x / v, this.y / v, this.z / v);
    },
    equals: function (v) {
      return this.x == v.x && this.y == v.y && this.z == v.z;
    },
    dot: function (v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    },
    cross: function (v) {
      return new PGL.Vector3(
        this.y * v.z - this.z * v.y,
        this.z * v.x - this.x * v.z,
        this.x * v.y - this.y * v.x
      );
    },
    length: function () {
      return Math.sqrt(this.dot(this));
    },
    unit: function () {
      return this.divide(this.length());
    },
    min: function () {
      return Math.min(Math.min(this.x, this.y), this.z);
    },
    max: function () {
      return Math.max(Math.max(this.x, this.y), this.z);
    },
    toAngles: function () {
      return {
        theta: Math.atan2(this.z, this.x),
        phi: Math.asin(this.y / this.length())
      };
    },
    angleTo: function (a) {
      return Math.acos(this.dot(a) / (this.length() * a.length()));
    },
    toArray: function (n) {
      return [this.x, this.y, this.z].slice(0, n || 3);
    },
    clone: function () {
      return new PGL.Vector3(this.x, this.y, this.z);
    },
    init: function (x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    }
  };
  PGL.Vector3.negative = function (a, b) {
    b.x = -a.x;
    b.y = -a.y;
    b.z = -a.z;
    return b;
  };
  PGL.Vector3.add = function (a, b, c) {
    if (b instanceof PGL.Vector3) {
      c.x = a.x + b.x;
      c.y = a.y + b.y;
      c.z = a.z + b.z;
    }
    else {
      c.x = a.x + b;
      c.y = a.y + b;
      c.z = a.z + b;
    }
    return c;
  };
  PGL.Vector3.subtract = function (a, b, c) {
    if (b instanceof PGL.Vector3) {
      c.x = a.x - b.x;
      c.y = a.y - b.y;
      c.z = a.z - b.z;
    }
    else {
      c.x = a.x - b;
      c.y = a.y - b;
      c.z = a.z - b;
    }
    return c;
  };
  PGL.Vector3.multiply = function (a, b, c) {
    if (b instanceof PGL.Vector3) {
      c.x = a.x * b.x;
      c.y = a.y * b.y;
      c.z = a.z * b.z;
    }
    else {
      c.x = a.x * b;
      c.y = a.y * b;
      c.z = a.z * b;
    }
    return c;
  };
  PGL.Vector3.divide = function (a, b, c) {
    if (b instanceof PGL.Vector3) {
      c.x = a.x / b.x;
      c.y = a.y / b.y;
      c.z = a.z / b.z;
    }
    else {
      c.x = a.x / b;
      c.y = a.y / b;
      c.z = a.z / b;
    }
    return c;
  };
  PGL.Vector3.cross = function (a, b, c) {
    c.x = a.y * b.z - a.z * b.y;
    c.y = a.z * b.x - a.x * b.z;
    c.z = a.x * b.y - a.y * b.x;
    return c;
  };
  PGL.Vector3.unit = function (a, b) {
    var length = a.length();
    b.x = a.x / length;
    b.y = a.y / length;
    b.z = a.z / length;
    return b;
  };
  PGL.Vector3.fromAngles = function (theta, phi) {
    return new PGL.Vector3(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi));
  };
  PGL.Vector3.randomDirection = function () {
    return PGL.Vector3.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
  };
  PGL.Vector3.min = function (a, b) {
    return new PGL.Vector3(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
  };
  PGL.Vector3.max = function (a, b) {
    return new PGL.Vector3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
  };
  PGL.Vector3.lerp = function (a, b, fraction) {
    return b.subtract(a).multiply(fraction).add(a);
  };
  PGL.Vector3.fromArray = function (a) {
    return new PGL.Vector3(a[0], a[1], a[2]);
  };
  PGL.Vector3.angleBetween = function (a, b) {
    return a.angleTo(b);
  };

  // ### new GL.Indexer()
  //
  // Generates indices into a list of unique objects from a stream of objects
  // that may contain duplicates. This is useful for generating compact indexed
  // meshes from unindexed data.
  PGL.Indexer = function () {
    this.unique = [];
    this.indices = [];
    this.map = {};
  };
  PGL.Indexer.prototype = {
    // ### .add(v)
    //
    // Adds the object `obj` to `unique` if it hasn't already been added. Returns
    // the index of `obj` in `unique`.
    add: function (obj) {
      var key = JSON.stringify(obj);
      if (!(key in this.map)) {
        this.map[key] = this.unique.length;
        this.unique.push(obj);
      }
      return this.map[key];
    }
  };

  // ### new GL.HitTest([t, hit, normal])
  //
  // This is the object used to return hit test results. If there are no
  // arguments, the constructed argument represents a hit infinitely far
  // away.
  PGL.HitTest = function (t, hit, normal) {
    this.t = arguments.length ? t : Number.MAX_VALUE;
    this.hit = hit;
    this.normal = normal;
  };
  // ### .mergeWith(other)
  //
  // Changes this object to be the closer of the two hit test results.
  PGL.HitTest.prototype = {
    mergeWith: function (other) {
      if (other.t > 0 && other.t < this.t) {
        this.t = other.t;
        this.hit = other.hit;
        this.normal = other.normal;
      }
    }
  };

  // src/raytracer.js
  // Provides a convenient raytracing interface.
  // ### new GL.Raytracer()
  //
  // This will read the current modelview matrix, projection matrix, and viewport,
  // reconstruct the eye position, and store enough information to later generate
  // per-pixel rays using `getRayForPixel()`.
  //
  // Example usage:
  //
  //     var tracer = new GL.Raytracer();
  //     var ray = tracer.getRayForPixel(
  //       gl.canvas.width / 2,
  //       gl.canvas.height / 2);
  //     var result = GL.Raytracer.hitTestSphere(
  //       tracer.eye, ray, new GL.Vector(0, 0, 0), 1);
  PGL.Raytracer = function () {
    var v = gl.getParameter(gl.VIEWPORT);
    var m = gl.modelviewMatrix.m;

    var axisX = new PGL.Vector3(m[0], m[4], m[8]);
    var axisY = new PGL.Vector3(m[1], m[5], m[9]);
    var axisZ = new PGL.Vector3(m[2], m[6], m[10]);
    var offset = new PGL.Vector3(m[3], m[7], m[11]);
    this.eye = new PGL.Vector3(-offset.dot(axisX), -offset.dot(axisY), -offset.dot(axisZ));

    var minX = v[0], maxX = minX + v[2];
    var minY = v[1], maxY = minY + v[3];
    this.ray00 = gl.unProject(minX, minY, 1).subtract(this.eye);
    this.ray10 = gl.unProject(maxX, minY, 1).subtract(this.eye);
    this.ray01 = gl.unProject(minX, maxY, 1).subtract(this.eye);
    this.ray11 = gl.unProject(maxX, maxY, 1).subtract(this.eye);
    this.viewport = v;
  };
  PGL.Raytracer.prototype = {
    // ### .getRayForPixel(x, y)
    //
    // Returns the ray originating from the camera and traveling through the pixel `x, y`.
    getRayForPixel: function (x, y) {
      x = (x - this.viewport[0]) / this.viewport[2];
      y = 1 - (y - this.viewport[1]) / this.viewport[3];
      var ray0 = PGL.Vector3.lerp(this.ray00, this.ray10, x);
      var ray1 = PGL.Vector3.lerp(this.ray01, this.ray11, x);
      return PGL.Vector3.lerp(ray0, ray1, y).unit();
    }
  };
  // ### GL.Raytracer.hitTestBox(origin, ray, min, max)
  //
  // Traces the ray starting from `origin` along `ray` against the axis-aligned box
  // whose coordinates extend from `min` to `max`. Returns a `HitTest` with the
  // information or `null` for no intersection.
  //
  // This implementation uses the [slab intersection method](http://www.siggraph.org/education/materials/HyperGraph/raytrace/rtinter3.htm).
  PGL.Raytracer.hitTestBox = function (origin, ray, min, max) {
    var tMin = min.subtract(origin).divide(ray);
    var tMax = max.subtract(origin).divide(ray);
    var t1 = Vector.min(tMin, tMax);
    var t2 = Vector.max(tMin, tMax);
    var tNear = t1.max();
    var tFar = t2.min();

    if (tNear > 0 && tNear < tFar) {
      var epsilon = 1.0e-6, hit = origin.add(ray.multiply(tNear));
      min = min.add(epsilon);
      max = max.subtract(epsilon);
      return new HitTest(tNear, hit, new Vector(
        (hit.x > max.x) - (hit.x < min.x),
        (hit.y > max.y) - (hit.y < min.y),
        (hit.z > max.z) - (hit.z < min.z)
      ));
    }

    return null;
  };
  // ### GL.Raytracer.hitTestSphere(origin, ray, center, radius)
  //
  // Traces the ray starting from `origin` along `ray` against the sphere defined
  // by `center` and `radius`. Returns a `HitTest` with the information or `null`
  // for no intersection.
  PGL.Raytracer.hitTestSphere = function (origin, ray, center, radius) {
    var offset = origin.subtract(center);
    var a = ray.dot(ray);
    var b = 2 * ray.dot(offset);
    var c = offset.dot(offset) - radius * radius;
    var discriminant = b * b - 4 * a * c;

    if (discriminant > 0) {
      var t = (-b - Math.sqrt(discriminant)) / (2 * a), hit = origin.add(ray.multiply(t));
      return new PGL.HitTest(t, hit, hit.subtract(center).divide(radius));
    }

    return null;
  };
  // ### GL.Raytracer.hitTestTriangle(origin, ray, a, b, c)
  //
  // Traces the ray starting from `origin` along `ray` against the triangle defined
  // by the points `a`, `b`, and `c`. Returns a `HitTest` with the information or
  // `null` for no intersection.
  PGL.Raytracer.hitTestTriangle = function (origin, ray, a, b, c) {
    var ab = b.subtract(a);
    var ac = c.subtract(a);
    var normal = ab.cross(ac).unit();
    var t = normal.dot(a.subtract(origin)) / normal.dot(ray);

    if (t > 0) {
      var hit = origin.add(ray.multiply(t));
      var toHit = hit.subtract(a);
      var dot00 = ac.dot(ac);
      var dot01 = ac.dot(ab);
      var dot02 = ac.dot(toHit);
      var dot11 = ab.dot(ab);
      var dot12 = ab.dot(toHit);
      var divide = dot00 * dot11 - dot01 * dot01;
      var u = (dot11 * dot02 - dot01 * dot12) / divide;
      var v = (dot00 * dot12 - dot01 * dot02) / divide;
      if (u >= 0 && v >= 0 && u + v <= 1) return new HitTest(t, hit, normal);
    }

    return null;
  };

  /******************************************************************
   * 保存缓冲区对象的相关参数，提供创建缓冲区对象的方法
   * @param target 缓存区对象中包含的是顶点的数据还是索引的数据
   * @param type 类型化数组类型
   * @constructor
   ******************************************************************/
  PGL.Buffer = function (target, type) {
    this.buffer = null;
    this.target = target;
    this.type = type;
    this.data = [];
  };
  PGL.Buffer.prototype = {
    /**
     * 把数据放置到类型化数组中，创建缓冲区对象
     * @param type：表示程序将如何调用缓冲区对象中的数据
     */
    compile: function (type) {
      var data = [];
      for (var i = 0, chunk = 10000; i < this.data.length; i += chunk) {
        data = Array.prototype.concat.apply(data, this.data.slice(i, i + chunk));
      }
      var spacing = this.data.length ? data.length / this.data.length : 0;
      if (spacing !== Math.round(spacing)) throw new Error('buffer elements not of consistent size, average size is ' + spacing);
      this.buffer = this.buffer || gl.createBuffer();
      this.buffer.length = data.length; // 数组长度
      this.buffer.spacing = spacing; // 类型化数组一组数据的长度
      gl.bindBuffer(this.target, this.buffer);
      gl.bufferData(this.target, new this.type(data), type || gl.STATIC_DRAW);
    }
  };
})(PGL);
// 公共方法 PGL.Texture
(function (PGL) {
  /********************************************************************
   * 提供围绕WebGL纹理的简单包装，支持渲染到纹理。
   * @param width
   * @param height
   * @param options
   *  format: 纹理数据的格式 gl.RGBA
   *  type: 纹理数据类型 gl.UNSIGNED_BYTE
   * @constructor
   ********************************************************************/
  PGL.Texture = function (width, height, options) {
    options = options || {};
    this.id = gl.createTexture();
    this.width = width;
    this.height = height;
    this.format = options.format || gl.RGBA;
    this.type = options.type || gl.UNSIGNED_BYTE;
    var magFilter = options.filter || options.magFilter || gl.LINEAR;
    var minFilter = options.filter || options.minFilter || gl.LINEAR;
    if (this.type === gl.FLOAT) {
      if (!PGL.Texture.canUseFloatingPointTextures()) {
        throw new Error('OES_texture_float is required but not supported');
      }
      if ((minFilter !== gl.NEAREST || magFilter !== gl.NEAREST) &&
        !PGL.Texture.canUseFloatingPointLinearFiltering()) {
        throw new Error('OES_texture_float_linear is required but not supported');
      }
    } else if (this.type === gl.HALF_FLOAT_OES) {
      if (!Texture.canUseHalfFloatingPointTextures()) {
        throw new Error('OES_texture_half_float is required but not supported');
      }
      if ((minFilter !== gl.NEAREST || magFilter !== gl.NEAREST) &&
        !Texture.canUseHalfFloatingPointLinearFiltering()) {
        throw new Error('OES_texture_half_float_linear is required but not supported');
      }
    }
    gl.bindTexture(gl.TEXTURE_2D, this.id);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, options.wrap || options.wrapS || gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, options.wrap || options.wrapT || gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, this.format, width, height, 0, this.format, this.type, null);
  };
  var framebuffer;
  var renderbuffer;
  var checkerboardCanvas;
  PGL.Texture.prototype = {
    // ### .bind([unit])
    //
    // Bind this texture to the given texture unit (0-7, defaults to 0).
    bind: function (unit) {
      gl.activeTexture(gl.TEXTURE0 + (unit || 0));
      gl.bindTexture(gl.TEXTURE_2D, this.id);
    },
    // ### .unbind([unit])
    //
    // Clear the given texture unit (0-7, defaults to 0).
    unbind: function (unit) {
      gl.activeTexture(gl.TEXTURE0 + (unit || 0));
      gl.bindTexture(gl.TEXTURE_2D, null);
    },
    // 检查是否支持渲染到此纹理。 某些配置可能不支持浮点纹理。
    canDrawTo: function () {
      framebuffer = framebuffer || gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.id, 0);
      var result = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      return result;
    },
    // ### .drawTo(callback)
    // 将`callback`中的所有绘制调用渲染到此纹理。 这个方法设置了具有此纹理作为颜色附件和渲染缓冲区的帧缓冲区作为深度附件。 它还会暂时将视口更改为纹理的大小。
    // Example usage:
    //     texture.drawTo(function() {
    //       gl.clearColor(1, 0, 0, 1);
    //       gl.clear(gl.COLOR_BUFFER_BIT);
    //     });
    drawTo: function (callback) {
      var v = gl.getParameter(gl.VIEWPORT);
      framebuffer = framebuffer || gl.createFramebuffer();
      renderbuffer = renderbuffer || gl.createRenderbuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
      if (this.width !== renderbuffer.width || this.height !== renderbuffer.height) {
        renderbuffer.width = this.width;
        renderbuffer.height = this.height;
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
      }
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.id, 0);
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
        throw new Error('Rendering to this texture is not supported (incomplete framebuffer)');
      }
      gl.viewport(0, 0, this.width, this.height);

      callback();

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.bindRenderbuffer(gl.RENDERBUFFER, null);
      gl.viewport(v[0], v[1], v[2], v[3]);
    },
    swapWith: function (other) {
      var temp;
      temp = other.id;
      other.id = this.id;
      this.id = temp;
      temp = other.width;
      other.width = this.width;
      this.width = temp;
      temp = other.height;
      other.height = this.height;
      this.height = temp;
    }
  };
  // ### GL.Texture.fromURL(url[, options])
//
// Returns a checkerboard texture that will switch to the correct texture when
// it loads.
  PGL.Texture.fromURL = function (url, options) {
    checkerboardCanvas = checkerboardCanvas || (function () {
      var c = document.createElement('canvas').getContext('2d');
      c.canvas.width = c.canvas.height = 128;
      for (var y = 0; y < c.canvas.height; y += 16) {
        for (var x = 0; x < c.canvas.width; x += 16) {
          c.fillStyle = (x ^ y) & 16 ? '#FFF' : '#DDD';
          c.fillRect(x, y, 16, 16);
        }
      }
      return c.canvas;
    })();
    var texture = PGL.Texture.fromImage(checkerboardCanvas, options);
    var image = new Image();
    var context = gl;
    image.onload = function () {
      context.makeCurrent();
      PGL.Texture.fromImage(image, options).swapWith(texture);
    };
    image.src = url;
    return texture;
  };
  // ### GL.Texture.fromImage(image[, options])
  //
  // Return a new image created from `image`, an `<img>` tag.
  PGL.Texture.fromImage = function (image, options) {
    options = options || {};
    var texture = new PGL.Texture(image.width, image.height, options);
    try {
      gl.texImage2D(gl.TEXTURE_2D, 0, texture.format, texture.format, texture.type, image);
    } catch (e) {
      if (location.protocol == 'file:') {
        throw new Error('image not loaded for security reasons (serve this page over "http://" instead)');
      } else {
        throw new Error('image not loaded for security reasons (image must originate from the same ' +
          'domain as this page or use Cross-Origin Resource Sharing)');
      }
    }
    if (options.minFilter && options.minFilter != gl.NEAREST && options.minFilter != gl.LINEAR) {
      gl.generateMipmap(gl.TEXTURE_2D);
    }
    return texture;
  };
  /*
  ### GL.Texture.canUseFloatingPointTextures()
  如果不支持`gl.FLOAT`作为纹理类型，则返回false。 这是`OES_texture_float`扩展。*/
  PGL.Texture.canUseFloatingPointTextures = function () {
    return !!gl.getExtension('OES_texture_float');
  };
  /*### GL.Texture.canUseFloatingPointLinearFiltering()
  * 如果不支持`gl.LINEAR`作为纹理过滤器模式，则返回false
  * `gl.FLOAT`类型的纹理。 这是`OES_texture_float_linear`扩展。*/
  PGL.Texture.canUseFloatingPointLinearFiltering = function () {
    return !!gl.getExtension('OES_texture_float_linear');
  };
  /* ### GL.Texture.canUseFloatingPointTextures()
  如果不支持`gl.HALF_FLOAT_OES`作为纹理类型，则返回false。这是`OES_texture_half_float`扩展。
  */
  PGL.Texture.canUseHalfFloatingPointTextures = function () {
    return !!gl.getExtension('OES_texture_half_float');
  };
  // ### GL.Texture.canUseFloatingPointLinearFiltering()
  //
  // Returns false if `gl.LINEAR` is not supported as a texture filter mode for
  // textures of type `gl.HALF_FLOAT_OES`. This is the
  // `OES_texture_half_float_linear` extension.
  PGL.Texture.canUseHalfFloatingPointLinearFiltering = function () {
    return !!gl.getExtension('OES_texture_half_float_linear');
  };

  /********************************************************************
   * src/mesh.js
   * Represents indexed triangle geometry with arbitrary additional attributes.
   * You need a shader to draw a mesh; meshes can't draw themselves.
   *
   * A mesh is a collection of `GL.Buffer` objects which are either vertex buffers
   * (holding per-vertex attributes) or index buffers (holding the order in which
   * vertices are rendered). By default, a mesh has a position vertex buffer called
   * `vertices` and a triangle index buffer called `triangles`. New buffers can be
   * added using `addVertexBuffer()` and `addIndexBuffer()`. Two strings are
   * required when adding a new vertex buffer, the name of the data array on the
   * mesh instance and the name of the GLSL attribute in the vertex shader.
   * Example usage:
   *  var mesh = new GL.Mesh({ coords: true, lines: true });
   *  mesh.vertices = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]];
   *  //Optional attribute "coords" enabled in constructor,
   *  // available as "gl_TexCoord" in the vertex shader
   *  mesh.coords = [[0, 0], [1, 0], [0, 1], [1, 1]];
   *  // Custom attribute "weights", available as "weight" in the
   *  // vertex shader
   *  mesh.addVertexBuffer('weights', 'weight');
   *  mesh.weights = [1, 0, 0, 1];
   *  // Default index buffer "triangles"
   *  mesh.triangles = [[0, 1, 2], [2, 1, 3]];
   *  // Optional index buffer "lines" enabled in constructor
   *  mesh.lines = [[0, 1], [0, 2], [1, 3], [2, 3]];
   *  // Upload provided data to GPU memory
   *  mesh.compile();
   * ### new GL.Mesh([options])
   * Represents a collection of vertex buffers and index buffers. Each vertex
   * buffer maps to one attribute in GLSL and has a corresponding property set
   * on the Mesh instance. There is one vertex buffer by default: `vertices`,
   * which maps to `gl_Vertex`. The `coords`, `normals`, and `colors` vertex
   * buffers map to `gl_TexCoord`, `gl_Normal`, and `gl_Color` respectively,
   * and can be enabled by setting the corresponding options to true. There are
   * two index buffers, `triangles` and `lines`, which are used for rendering
   * `gl.TRIANGLES` and `gl.LINES`, respectively. Only `triangles` is enabled by
   * default, although `computeWireframe()` will add a normal buffer if it wasn't
   * initially enabled.
   * @param options
   * @constructor
   *******************************************************************/
  PGL.Mesh = function (options) {
    options = options || {};
    this.vertexBuffers = {};
    this.indexBuffers = {};
    this.addVertexBuffer('vertices', 'gl_Vertex');
    if (options.coords) this.addVertexBuffer('coords', 'gl_TexCoord');
    if (options.normals) this.addVertexBuffer('normals', 'gl_Normal');
    if (options.colors) this.addVertexBuffer('colors', 'gl_Color');
    if (!('triangles' in options) || options.triangles) this.addIndexBuffer('triangles');
    if (options.lines) this.addIndexBuffer('lines');
  };
  PGL.Mesh.prototype = {
    /**
     * 添加顶点缓冲区到vertexBuffers
     * @param name
     * @param attribute
     */
    addVertexBuffer: function (name, attribute) {
      var buffer = this.vertexBuffers[attribute] = new PGL.Buffer(gl.ARRAY_BUFFER, Float32Array);
      buffer.name = name;
      this[name] = [];
    },
    /**
     * 创建一个包含顶点索引值的缓冲区对象放置到indexBuffers中保存
     * @param name
     */
    addIndexBuffer: function (name) {
      var buffer = this.indexBuffers[name] = new PGL.Buffer(gl.ELEMENT_ARRAY_BUFFER, Uint16Array);
      this[name] = [];
    },
    /**
     * 构建vertexBuffers、indexBuffers中的缓冲对象
     */
    compile: function () {
      for (var attribute in this.vertexBuffers) {
        var buffer = this.vertexBuffers[attribute];
        buffer.data = this[buffer.name];
        buffer.compile();
      }

      for (var name in this.indexBuffers) {
        var buffer = this.indexBuffers[name];
        buffer.data = this[name];
        buffer.compile();
      }
    },
    // ### .transform(matrix)
    //
    // Transform all vertices by `matrix` and all normals by the inverse transpose
    // of `matrix`.
    transform: function (matrix) {
      this.vertices = this.vertices.map(function (v) {
        return matrix.transformPoint(Vector.fromArray(v)).toArray();
      });
      if (this.normals) {
        var invTrans = matrix.inverse().transpose();
        this.normals = this.normals.map(function (n) {
          return invTrans.transformVector(Vector.fromArray(n)).unit().toArray();
        });
      }
      this.compile();
      return this;
    },
    // ### .computeNormals()
    //
    // Computes a new normal for each vertex from the average normal of the
    // neighboring triangles. This means adjacent triangles must share vertices
    // for the resulting normals to be smooth.
    computeNormals: function () {
      if (!this.normals) this.addVertexBuffer('normals', 'gl_Normal');
      for (var i = 0; i < this.vertices.length; i++) {
        this.normals[i] = new Vector();
      }
      for (var i = 0; i < this.triangles.length; i++) {
        var t = this.triangles[i];
        var a = Vector.fromArray(this.vertices[t[0]]);
        var b = Vector.fromArray(this.vertices[t[1]]);
        var c = Vector.fromArray(this.vertices[t[2]]);
        var normal = b.subtract(a).cross(c.subtract(a)).unit();
        this.normals[t[0]] = this.normals[t[0]].add(normal);
        this.normals[t[1]] = this.normals[t[1]].add(normal);
        this.normals[t[2]] = this.normals[t[2]].add(normal);
      }
      for (var i = 0; i < this.vertices.length; i++) {
        this.normals[i] = this.normals[i].unit().toArray();
      }
      this.compile();
      return this;
    },
    // ### .computeWireframe()
    //
    // Populate the `lines` index buffer from the `triangles` index buffer.
    computeWireframe: function () {
      var indexer = new Indexer();
      for (var i = 0; i < this.triangles.length; i++) {
        var t = this.triangles[i];
        for (var j = 0; j < t.length; j++) {
          var a = t[j], b = t[(j + 1) % t.length];
          indexer.add([Math.min(a, b), Math.max(a, b)]);
        }
      }
      if (!this.lines) this.addIndexBuffer('lines');
      this.lines = indexer.unique;
      this.compile();
      return this;
    },
    // ### .getAABB()
    //
    // Computes the axis-aligned bounding box, which is an object whose `min` and
    // `max` properties contain the minimum and maximum coordinates of all vertices.
    getAABB: function () {
      var aabb = {min: new Vector(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE)};
      aabb.max = aabb.min.negative();
      for (var i = 0; i < this.vertices.length; i++) {
        var v = Vector.fromArray(this.vertices[i]);
        aabb.min = Vector.min(aabb.min, v);
        aabb.max = Vector.max(aabb.max, v);
      }
      return aabb;
    },
    // ### .getBoundingSphere()
    //
    // Computes a sphere that contains all vertices (not necessarily the smallest
    // sphere). The returned object has two properties, `center` and `radius`.
    getBoundingSphere: function () {
      var aabb = this.getAABB();
      var sphere = {center: aabb.min.add(aabb.max).divide(2), radius: 0};
      for (var i = 0; i < this.vertices.length; i++) {
        sphere.radius = Math.max(sphere.radius,
          Vector.fromArray(this.vertices[i]).subtract(sphere.center).length());
      }
      return sphere;
    }
  };
  /**
   ### PGL.Mesh.plane([options])
   Generates a square 2x2 mesh the xy plane centered at the origin.
   The`options` argument specifies options to pass to the mesh constructor.
   Additional options include `detailX` and `detailY`, which set the tesselation
   in x and y, and `detail`, which sets both `detailX` and `detailY` at once.
   Two triangles are generated by default.
   Example usage:
   var mesh1 = GL.Mesh.plane();
   var mesh2 = GL.Mesh.plane({ detail: 5 });
   var mesh3 = GL.Mesh.plane({ detailX: 20, detailY: 40 });
   */
  PGL.Mesh.plane = function (options) {
    options = options || {};
    var mesh = new PGL.Mesh(options);
    var detailX = options.detailX || options.detail || 1;
    var detailY = options.detailY || options.detail || 1;

    // 生成顶点坐标，贴图坐标，法线和三角形
    for (var y = 0; y <= detailY; y++) {
      var t = y / detailY;
      for (var x = 0; x <= detailX; x++) {
        var s = x / detailX;
        mesh.vertices.push([2 * s - 1, 2 * t - 1, 0]);
        if (mesh.coords) mesh.coords.push([s, t]);
        if (mesh.normals) mesh.normals.push([0, 0, 1]);
        if (x < detailX && y < detailY) {
          var i = x + y * (detailX + 1);
          mesh.triangles.push([i, i + 1, i + detailX + 1]);
          mesh.triangles.push([i + detailX + 1, i + 1, i + detailX + 2]);
        }
      }
    }

    mesh.compile();
    return mesh;
  };
  // ### GL.Mesh.sphere([options])
  //
  // Generates a geodesic sphere of radius 1. The `options` argument specifies
  // options to pass to the mesh constructor in addition to the `detail` option,
  // which controls the tesselation level. The detail is `6` by default.
  // Example usage:
  //
  //     var mesh1 = GL.Mesh.sphere();
  //     var mesh2 = GL.Mesh.sphere({ detail: 2 });
  //
  PGL.Mesh.sphere = function (options) {
    function tri(a, b, c) {
      return flip ? [a, c, b] : [a, b, c];
    }

    function fix(x) {
      return x + (x - x * x) / 2;
    }

    options = options || {};
    var mesh = new PGL.Mesh(options);
    var indexer = new PGL.Indexer();
    detail = options.detail || 6;

    for (var octant = 0; octant < 8; octant++) {
      var scale = PGL.pickOctant(octant);
      var flip = scale.x * scale.y * scale.z > 0;
      var data = [];
      for (var i = 0; i <= detail; i++) {
        // Generate a row of vertices on the surface of the sphere
        // using barycentric coordinates.
        for (var j = 0; i + j <= detail; j++) {
          var a = i / detail;
          var b = j / detail;
          var c = (detail - i - j) / detail;
          var vertex = {vertex: new PGL.Vector3(fix(a), fix(b), fix(c)).unit().multiply(scale).toArray()};
          if (mesh.coords) vertex.coord = scale.y > 0 ? [1 - a, c] : [c, 1 - a];
          data.push(indexer.add(vertex));
        }

        // Generate triangles from this row and the previous row.
        if (i > 0) {
          for (var j = 0; i + j <= detail; j++) {
            var a = (i - 1) * (detail + 1) + ((i - 1) - (i - 1) * (i - 1)) / 2 + j;
            var b = i * (detail + 1) + (i - i * i) / 2 + j;
            mesh.triangles.push(tri(data[a], data[a + 1], data[b]));
            if (i + j < detail) {
              mesh.triangles.push(tri(data[b], data[a + 1], data[b + 1]));
            }
          }
        }
      }
    }

    // Reconstruct the geometry from the indexer.
    mesh.vertices = indexer.unique.map(function (v) {
      return v.vertex;
    });
    if (mesh.coords) mesh.coords = indexer.unique.map(function (v) {
      return v.coord;
    });
    if (mesh.normals) mesh.normals = mesh.vertices;
    mesh.compile();
    return mesh;
  };
  // ### GL.Mesh.cube([options])
  //
  // Generates a 2x2x2 box centered at the origin. The `options` argument
  // specifies options to pass to the mesh constructor.
  var cubeData = [
    [0, 4, 2, 6, -1, 0, 0], // -x
    [1, 3, 5, 7, +1, 0, 0], // +x
    [0, 1, 4, 5, 0, -1, 0], // -y
    [2, 6, 3, 7, 0, +1, 0], // +y
    [0, 2, 1, 3, 0, 0, -1], // -z
    [4, 5, 6, 7, 0, 0, +1]  // +z
  ];
  PGL.Mesh.cube = function (options) {
    var mesh = new PGL.Mesh(options);

    for (var i = 0; i < cubeData.length; i++) {
      var data = cubeData[i], v = i * 4;
      for (var j = 0; j < 4; j++) {
        var d = data[j];
        mesh.vertices.push(PGL.pickOctant(d).toArray());
        if (mesh.coords) mesh.coords.push([j & 1, (j & 2) / 2]);
        if (mesh.normals) mesh.normals.push(data.slice(4, 7));
      }
      mesh.triangles.push([v, v + 1, v + 2]);
      mesh.triangles.push([v + 2, v + 1, v + 3]);
    }

    mesh.compile();
    return mesh;
  };
  // ### GL.Mesh.load(json[, options])
//
// Creates a mesh from the JSON generated by the `convert/convert.py` script.
// Example usage:
//
//     var data = {
//       vertices: [[0, 0, 0], [1, 0, 0], [0, 1, 0]],
//       triangles: [[0, 1, 2]]
//     };
//     var mesh = GL.Mesh.load(data);
//
  PGL.Mesh.load = function (json, options) {
    options = options || {};
    if (!('coords' in options)) options.coords = !!json.coords;
    if (!('normals' in options)) options.normals = !!json.normals;
    if (!('colors' in options)) options.colors = !!json.colors;
    if (!('triangles' in options)) options.triangles = !!json.triangles;
    if (!('lines' in options)) options.lines = !!json.lines;
    var mesh = new Mesh(options);
    mesh.vertices = json.vertices;
    if (mesh.coords) mesh.coords = json.coords;
    if (mesh.normals) mesh.normals = json.normals;
    if (mesh.colors) mesh.colors = json.colors;
    if (mesh.triangles) mesh.triangles = json.triangles;
    if (mesh.lines) mesh.lines = json.lines;
    mesh.compile();
    return mesh;
  };
})(PGL);