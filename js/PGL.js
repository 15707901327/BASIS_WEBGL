var PGL = (function () {
  var PGL = {
    Mesh: Mesh,
    Texture: Texture,
    Shader: Shader,
    Vector3: Vector3
  };

  function Vector3(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  Vector3.prototype = {
    negative: function () {
      return new Vector3(-this.x, -this.y, -this.z);
    },
    add: function (v) {
      if (v instanceof Vector3) return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
      else return new Vector3(this.x + v, this.y + v, this.z + v);
    },
    subtract: function (v) {
      if (v instanceof Vector3) return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
      else return new Vector3(this.x - v, this.y - v, this.z - v);
    },
    multiply: function (v) {
      if (v instanceof Vector3) return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
      else return new Vector3(this.x * v, this.y * v, this.z * v);
    },
    divide: function (v) {
      if (v instanceof Vector3) return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z);
      else return new Vector3(this.x / v, this.y / v, this.z / v);
    },
    equals: function (v) {
      return this.x == v.x && this.y == v.y && this.z == v.z;
    },
    dot: function (v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    },
    cross: function (v) {
      return new Vector3(
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
      return new Vector3(this.x, this.y, this.z);
    },
    init: function (x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    }
  };
  Vector3.negative = function (a, b) {
    b.x = -a.x;
    b.y = -a.y;
    b.z = -a.z;
    return b;
  };
  Vector3.add = function (a, b, c) {
    if (b instanceof Vector3) {
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
  Vector3.subtract = function (a, b, c) {
    if (b instanceof Vector3) {
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
  Vector3.multiply = function (a, b, c) {
    if (b instanceof Vector3) {
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
  Vector3.divide = function (a, b, c) {
    if (b instanceof Vector3) {
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
  Vector3.cross = function (a, b, c) {
    c.x = a.y * b.z - a.z * b.y;
    c.y = a.z * b.x - a.x * b.z;
    c.z = a.x * b.y - a.y * b.x;
    return c;
  };
  Vector3.unit = function (a, b) {
    var length = a.length();
    b.x = a.x / length;
    b.y = a.y / length;
    b.z = a.z / length;
    return b;
  };
  Vector3.fromAngles = function (theta, phi) {
    return new Vector3(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi));
  };
  Vector3.randomDirection = function () {
    return Vector3.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
  };
  Vector3.min = function (a, b) {
    return new Vector3(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
  };
  Vector3.max = function (a, b) {
    return new Vector3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
  };
  Vector3.lerp = function (a, b, fraction) {
    return b.subtract(a).multiply(fraction).add(a);
  };
  Vector3.fromArray = function (a) {
    return new Vector3(a[0], a[1], a[2]);
  };
  Vector3.angleBetween = function (a, b) {
    return a.angleTo(b);
  };

  /******************************************************************
   * 保存缓冲区对象的相关参数，提供创建缓冲区对象的方法
   * @param target 缓存区对象中包含的是顶点的数据还是索引的数据
   * @param type 类型化数组类型
   * @constructor
   ******************************************************************/
  function Buffer(target, type) {
    this.buffer = null;
    this.target = target;
    this.type = type;
    this.data = [];
  }

  Buffer.prototype = {
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

  /********************************************************************
   * @param options
   * @constructor
   *******************************************************************/
  function Mesh(options) {
    options = options || {};
    this.vertexBuffers = {};
    this.indexBuffers = {};
    this.addVertexBuffer('vertices', 'gl_Vertex');
    if (options.coords) this.addVertexBuffer('coords', 'gl_TexCoord');
    if (options.normals) this.addVertexBuffer('normals', 'gl_Normal');
    if (options.colors) this.addVertexBuffer('colors', 'gl_Color');
    if (!('triangles' in options) || options.triangles) this.addIndexBuffer('triangles');
    if (options.lines) this.addIndexBuffer('lines');
  }

  Mesh.prototype = {
    /**
     * 添加顶点缓冲区到vertexBuffers
     * @param name
     * @param attribute
     */
    addVertexBuffer: function (name, attribute) {
      var buffer = this.vertexBuffers[attribute] = new Buffer(gl.ARRAY_BUFFER, Float32Array);
      buffer.name = name;
      this[name] = [];
    },
    /**
     * 创建一个包含顶点索引值的缓冲区对象放置到indexBuffers中保存
     * @param name
     */
    addIndexBuffer: function (name) {
      var buffer = this.indexBuffers[name] = new Buffer(gl.ELEMENT_ARRAY_BUFFER, Uint16Array);
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
  Mesh.plane = function (options) {
    options = options || {};
    var mesh = new Mesh(options);
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


  /********************************************************************
   * 提供围绕WebGL纹理的简单包装，支持渲染到纹理。
   * @param width
   * @param height
   * @param options
   *  format: 纹理数据的格式 gl.RGBA
   *  type: 纹理数据类型 gl.UNSIGNED_BYTE
   * @constructor
   ********************************************************************/
  var framebuffer;
  var renderbuffer;

  function Texture(width, height, options) {
    options = options || {};
    this.id = gl.createTexture();
    this.width = width;
    this.height = height;
    this.format = options.format || gl.RGBA;
    this.type = options.type || gl.UNSIGNED_BYTE;
    var magFilter = options.filter || options.magFilter || gl.LINEAR;
    var minFilter = options.filter || options.minFilter || gl.LINEAR;
    if (this.type === gl.FLOAT) {
      if (!Texture.canUseFloatingPointTextures()) {
        throw new Error('OES_texture_float is required but not supported');
      }
      if ((minFilter !== gl.NEAREST || magFilter !== gl.NEAREST) &&
        !Texture.canUseFloatingPointLinearFiltering()) {
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
  }

  Texture.prototype = {
    // ### .bind([unit])
    //
    // Bind this texture to the given texture unit (0-7, defaults to 0).
    bind: function (unit) {
      gl.activeTexture(gl.TEXTURE0 + (unit || 0));
      gl.bindTexture(gl.TEXTURE_2D, this.id);
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

  /*
  ### GL.Texture.canUseFloatingPointTextures()
  如果不支持`gl.FLOAT`作为纹理类型，则返回false。 这是`OES_texture_float`扩展。*/
  Texture.canUseFloatingPointTextures = function () {
    return !!gl.getExtension('OES_texture_float');
  };

  /*### GL.Texture.canUseFloatingPointLinearFiltering()
  * 如果不支持`gl.LINEAR`作为纹理过滤器模式，则返回false
  * `gl.FLOAT`类型的纹理。 这是`OES_texture_float_linear`扩展。*/
  Texture.canUseFloatingPointLinearFiltering = function () {
    return !!gl.getExtension('OES_texture_float_linear');
  };

  /* ### GL.Texture.canUseFloatingPointTextures()
  如果不支持`gl.HALF_FLOAT_OES`作为纹理类型，则返回false。这是`OES_texture_half_float`扩展。
  */
  Texture.canUseHalfFloatingPointTextures = function () {
    return !!gl.getExtension('OES_texture_half_float');
  };


  // 以`gl_`开头的非标准名称必须被破坏，否则会导致编译器错误。
  var LIGHTGL_PREFIX = 'LIGHTGL';

  function regexMap(regex, text, callback) {
    var result;
    while ((result = regex.exec(text)) != null) {
      callback(result);
    }
  }

  /**
   * 判断obj值是否是数组
   * @param obj
   * @return {boolean}
   */
  function isArray(obj) {
    var str = Object.prototype.toString.call(obj);
    return str === '[object Array]' || str === '[object Float32Array]';
  }

  /**
   * 判断是否是数字
   * @param obj
   * @return {boolean}
   */
  function isNumber(obj) {
    var str = Object.prototype.toString.call(obj);
    return str === '[object Number]' || str === '[object Boolean]';
  }

  /*****************************************************************
   *
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
        if (value instanceof Vector3) {
          value = [value.x, value.y, value.z];
        } else if (value instanceof GL.Matrix) {
          value = value.m;
        }
        if (isArray(value)) {
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
        } else if (isNumber(value)) {
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
  PGL.REVISION = 1;
})(PGL);

(function (PGL) {
  PGL.WebGLUtils = function () {

    /**
     * Creates the HTLM for a failure message
     * @param {string} canvasContainerId id of container of th
     *        canvas.
     * @return {string} The html.
     */
    var makeFailHTML = function (msg) {
      return '' +
        '<div style="margin: auto; width:500px;z-index:10000;margin-top:20em;text-align:center;">' + msg + '</div>';
      return '' +
        '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
        '<td align="center">' +
        '<div style="display: table-cell; vertical-align: middle;">' +
        '<div style="">' + msg + '</div>' +
        '</div>' +
        '</td></tr></table>';
    };

    /**
     * Mesasge for getting a webgl browser
     * @type {string}
     */
    var GET_A_WEBGL_BROWSER = '' +
      'This page requires a browser that supports WebGL.<br/>' +
      '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

    /**
     * Mesasge for need better hardware
     * @type {string}
     */
    var OTHER_PROBLEM = '' +
      "It doesn't appear your computer can support WebGL.<br/>" +
      '<a href="http://get.webgl.org">Click here for more information.</a>';

    /**
     * Creates a webgl context. If creation fails it will
     * change the contents of the container of the <canvas>
     * tag to an error message with the correct links for WebGL.
     * @param {Element} canvas. The canvas element to create a
     *     context from.
     * @param {WebGLContextCreationAttirbutes} opt_attribs Any
     *     creation attributes you want to pass in.
     * @param {function:(msg)} opt_onError An function to call
     *     if there is an error during creation.
     * @return {WebGLRenderingContext} The created context.
     */
    var setupWebGL = function (canvas, opt_attribs, opt_onError) {
      function handleCreationError(msg) {
        var container = document.getElementsByTagName("body")[0];
        //var container = canvas.parentNode;
        if (container) {
          var str = window.WebGLRenderingContext ?
            OTHER_PROBLEM :
            GET_A_WEBGL_BROWSER;
          if (msg) {
            str += "<br/><br/>Status: " + msg;
          }
          container.innerHTML = makeFailHTML(str);
        }
      }

      opt_onError = opt_onError || handleCreationError;

      if (canvas.addEventListener) {
        canvas.addEventListener("webglcontextcreationerror", function (event) {
          opt_onError(event.statusMessage);
        }, false);
      }
      var context = create3DContext(canvas, opt_attribs);
      if (!context) {
        if (!window.WebGLRenderingContext) {
          opt_onError("");
        } else {
          opt_onError("");
        }
      }

      return context;
    };

    /**
     * Creates a webgl context.
     * @param {!Canvas} canvas The canvas tag to get context
     *     from. If one is not passed in one will be created.
     * @return {!WebGLContext} The created context.
     */
    var create3DContext = function (canvas, opt_attribs) {
      var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
      var context = null;
      for (var ii = 0; ii < names.length; ++ii) {
        try {
          context = canvas.getContext(names[ii], opt_attribs);
        } catch (e) {
        }
        if (context) {
          break;
        }
      }
      return context;
    };

    return {
      create3DContext: create3DContext,
      setupWebGL: setupWebGL
    };
  }();
  PGL.WebGLDebugUtils = function() {

    /**
     * Wrapped logging function.
     * @param {string} msg Message to log.
     */
    var log = function(msg) {
      if (window.console && window.console.log) {
        window.console.log(msg);
      }
    };

    /**
     * Which arguements are enums.
     * @type {!Object.<number, string>}
     */
    var glValidEnumContexts = {

      // Generic setters and getters

      'enable': { 0:true },
      'disable': { 0:true },
      'getParameter': { 0:true },

      // Rendering

      'drawArrays': { 0:true },
      'drawElements': { 0:true, 2:true },

      // Shaders

      'createShader': { 0:true },
      'getShaderParameter': { 1:true },
      'getProgramParameter': { 1:true },

      // Vertex attributes

      'getVertexAttrib': { 1:true },
      'vertexAttribPointer': { 2:true },

      // Textures

      'bindTexture': { 0:true },
      'activeTexture': { 0:true },
      'getTexParameter': { 0:true, 1:true },
      'texParameterf': { 0:true, 1:true },
      'texParameteri': { 0:true, 1:true, 2:true },
      'texImage2D': { 0:true, 2:true, 6:true, 7:true },
      'texSubImage2D': { 0:true, 6:true, 7:true },
      'copyTexImage2D': { 0:true, 2:true },
      'copyTexSubImage2D': { 0:true },
      'generateMipmap': { 0:true },

      // Buffer objects

      'bindBuffer': { 0:true },
      'bufferData': { 0:true, 2:true },
      'bufferSubData': { 0:true },
      'getBufferParameter': { 0:true, 1:true },

      // Renderbuffers and framebuffers

      'pixelStorei': { 0:true, 1:true },
      'readPixels': { 4:true, 5:true },
      'bindRenderbuffer': { 0:true },
      'bindFramebuffer': { 0:true },
      'checkFramebufferStatus': { 0:true },
      'framebufferRenderbuffer': { 0:true, 1:true, 2:true },
      'framebufferTexture2D': { 0:true, 1:true, 2:true },
      'getFramebufferAttachmentParameter': { 0:true, 1:true, 2:true },
      'getRenderbufferParameter': { 0:true, 1:true },
      'renderbufferStorage': { 0:true, 1:true },

      // Frame buffer operations (clear, blend, depth test, stencil)

      'clear': { 0:true },
      'depthFunc': { 0:true },
      'blendFunc': { 0:true, 1:true },
      'blendFuncSeparate': { 0:true, 1:true, 2:true, 3:true },
      'blendEquation': { 0:true },
      'blendEquationSeparate': { 0:true, 1:true },
      'stencilFunc': { 0:true },
      'stencilFuncSeparate': { 0:true, 1:true },
      'stencilMaskSeparate': { 0:true },
      'stencilOp': { 0:true, 1:true, 2:true },
      'stencilOpSeparate': { 0:true, 1:true, 2:true, 3:true },

      // Culling

      'cullFace': { 0:true },
      'frontFace': { 0:true },
    };

    /**
     * Map of numbers to names.
     * @type {Object}
     */
    var glEnums = null;

    /**
     * Initializes this module. Safe to call more than once.
     * @param {!WebGLRenderingContext} ctx A WebGL context. If
     *    you have more than one context it doesn't matter which one
     *    you pass in, it is only used to pull out constants.
     */
    function init(ctx) {
      if (glEnums == null) {
        glEnums = { };
        for (var propertyName in ctx) {
          if (typeof ctx[propertyName] == 'number') {
            glEnums[ctx[propertyName]] = propertyName;
          }
        }
      }
    }

    /**
     * Checks the utils have been initialized.
     */
    function checkInit() {
      if (glEnums == null) {
        throw 'WebGLDebugUtils.init(ctx) not called';
      }
    }

    /**
     * Returns true or false if value matches any WebGL enum
     * @param {*} value Value to check if it might be an enum.
     * @return {boolean} True if value matches one of the WebGL defined enums
     */
    function mightBeEnum(value) {
      checkInit();
      return (glEnums[value] !== undefined);
    }

    /**
     * Gets an string version of an WebGL enum.
     *
     * Example:
     *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
     *
     * @param {number} value Value to return an enum for
     * @return {string} The string version of the enum.
     */
    function glEnumToString(value) {
      checkInit();
      var name = glEnums[value];
      return (name !== undefined) ? name :
        ("*UNKNOWN WebGL ENUM (0x" + value.toString(16) + ")");
    }

    /**
     * Returns the string version of a WebGL argument.
     * Attempts to convert enum arguments to strings.
     * @param {string} functionName the name of the WebGL function.
     * @param {number} argumentIndx the index of the argument.
     * @param {*} value The value of the argument.
     * @return {string} The value as a string.
     */
    function glFunctionArgToString(functionName, argumentIndex, value) {
      var funcInfo = glValidEnumContexts[functionName];
      if (funcInfo !== undefined) {
        if (funcInfo[argumentIndex]) {
          return glEnumToString(value);
        }
      }
      return value.toString();
    }

    /**
     * Given a WebGL context returns a wrapped context that calls
     * gl.getError after every command and calls a function if the
     * result is not gl.NO_ERROR.
     *
     * @param {!WebGLRenderingContext} ctx The webgl context to
     *        wrap.
     * @param {!function(err, funcName, args): void} opt_onErrorFunc
     *        The function to call when gl.getError returns an
     *        error. If not specified the default function calls
     *        console.log with a message.
     */
    function makeDebugContext(ctx, opt_onErrorFunc) {
      init(ctx);
      opt_onErrorFunc = opt_onErrorFunc || function(err, functionName, args) {
        // apparently we can't do args.join(",");
        var argStr = "";
        for (var ii = 0; ii < args.length; ++ii) {
          argStr += ((ii == 0) ? '' : ', ') +
            glFunctionArgToString(functionName, ii, args[ii]);
        }
        log("WebGL error "+ glEnumToString(err) + " in "+ functionName +
          "(" + argStr + ")");
      };

      // Holds booleans for each GL error so after we get the error ourselves
      // we can still return it to the client app.
      var glErrorShadow = { };

      // Makes a function that calls a WebGL function and then calls getError.
      function makeErrorWrapper(ctx, functionName) {
        return function() {
          var result = ctx[functionName].apply(ctx, arguments);
          var err = ctx.getError();
          if (err != 0) {
            glErrorShadow[err] = true;
            opt_onErrorFunc(err, functionName, arguments);
          }
          return result;
        };
      }

      // Make a an object that has a copy of every property of the WebGL context
      // but wraps all functions.
      var wrapper = {};
      for (var propertyName in ctx) {
        if (typeof ctx[propertyName] == 'function') {
          wrapper[propertyName] = makeErrorWrapper(ctx, propertyName);
        } else {
          wrapper[propertyName] = ctx[propertyName];
        }
      }

      // Override the getError function with one that returns our saved results.
      wrapper.getError = function() {
        for (var err in glErrorShadow) {
          if (glErrorShadow[err]) {
            glErrorShadow[err] = false;
            return err;
          }
        }
        return ctx.NO_ERROR;
      };

      return wrapper;
    }

    function resetToInitialState(ctx) {
      var numAttribs = ctx.getParameter(ctx.MAX_VERTEX_ATTRIBS);
      var tmp = ctx.createBuffer();
      ctx.bindBuffer(ctx.ARRAY_BUFFER, tmp);
      for (var ii = 0; ii < numAttribs; ++ii) {
        ctx.disableVertexAttribArray(ii);
        ctx.vertexAttribPointer(ii, 4, ctx.FLOAT, false, 0, 0);
        ctx.vertexAttrib1f(ii, 0);
      }
      ctx.deleteBuffer(tmp);

      var numTextureUnits = ctx.getParameter(ctx.MAX_TEXTURE_IMAGE_UNITS);
      for (var ii = 0; ii < numTextureUnits; ++ii) {
        ctx.activeTexture(ctx.TEXTURE0 + ii);
        ctx.bindTexture(ctx.TEXTURE_CUBE_MAP, null);
        ctx.bindTexture(ctx.TEXTURE_2D, null);
      }

      ctx.activeTexture(ctx.TEXTURE0);
      ctx.useProgram(null);
      ctx.bindBuffer(ctx.ARRAY_BUFFER, null);
      ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, null);
      ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);
      ctx.bindRenderbuffer(ctx.RENDERBUFFER, null);
      ctx.disable(ctx.BLEND);
      ctx.disable(ctx.CULL_FACE);
      ctx.disable(ctx.DEPTH_TEST);
      ctx.disable(ctx.DITHER);
      ctx.disable(ctx.SCISSOR_TEST);
      ctx.blendColor(0, 0, 0, 0);
      ctx.blendEquation(ctx.FUNC_ADD);
      ctx.blendFunc(ctx.ONE, ctx.ZERO);
      ctx.clearColor(0, 0, 0, 0);
      ctx.clearDepth(1);
      ctx.clearStencil(-1);
      ctx.colorMask(true, true, true, true);
      ctx.cullFace(ctx.BACK);
      ctx.depthFunc(ctx.LESS);
      ctx.depthMask(true);
      ctx.depthRange(0, 1);
      ctx.frontFace(ctx.CCW);
      ctx.hint(ctx.GENERATE_MIPMAP_HINT, ctx.DONT_CARE);
      ctx.lineWidth(1);
      ctx.pixelStorei(ctx.PACK_ALIGNMENT, 4);
      ctx.pixelStorei(ctx.UNPACK_ALIGNMENT, 4);
      ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, false);
      ctx.pixelStorei(ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      // TODO: Delete this IF.
      if (ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL) {
        ctx.pixelStorei(ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL, ctx.BROWSER_DEFAULT_WEBGL);
      }
      ctx.polygonOffset(0, 0);
      ctx.sampleCoverage(1, false);
      ctx.scissor(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.stencilFunc(ctx.ALWAYS, 0, 0xFFFFFFFF);
      ctx.stencilMask(0xFFFFFFFF);
      ctx.stencilOp(ctx.KEEP, ctx.KEEP, ctx.KEEP);
      ctx.viewport(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
      ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT | ctx.STENCIL_BUFFER_BIT);

      // TODO: This should NOT be needed but Firefox fails with 'hint'
      while(ctx.getError());
    }

    function makeLostContextSimulatingContext(ctx) {
      var wrapper_ = {};
      var contextId_ = 1;
      var contextLost_ = false;
      var resourceId_ = 0;
      var resourceDb_ = [];
      var onLost_ = undefined;
      var onRestored_ = undefined;
      var nextOnRestored_ = undefined;

      // Holds booleans for each GL error so can simulate errors.
      var glErrorShadow_ = { };

      function isWebGLObject(obj) {
        //return false;
        return (obj instanceof WebGLBuffer ||
          obj instanceof WebGLFramebuffer ||
          obj instanceof WebGLProgram ||
          obj instanceof WebGLRenderbuffer ||
          obj instanceof WebGLShader ||
          obj instanceof WebGLTexture);
      }

      function checkResources(args) {
        for (var ii = 0; ii < args.length; ++ii) {
          var arg = args[ii];
          if (isWebGLObject(arg)) {
            return arg.__webglDebugContextLostId__ == contextId_;
          }
        }
        return true;
      }

      function clearErrors() {
        var k = Object.keys(glErrorShadow_);
        for (var ii = 0; ii < k.length; ++ii) {
          delete glErrorShdow_[k];
        }
      }

      // Makes a function that simulates WebGL when out of context.
      function makeLostContextWrapper(ctx, functionName) {
        var f = ctx[functionName];
        return function() {
          // Only call the functions if the context is not lost.
          if (!contextLost_) {
            if (!checkResources(arguments)) {
              glErrorShadow_[ctx.INVALID_OPERATION] = true;
              return;
            }
            var result = f.apply(ctx, arguments);
            return result;
          }
        };
      }

      for (var propertyName in ctx) {
        if (typeof ctx[propertyName] == 'function') {
          wrapper_[propertyName] = makeLostContextWrapper(ctx, propertyName);
        } else {
          wrapper_[propertyName] = ctx[propertyName];
        }
      }

      function makeWebGLContextEvent(statusMessage) {
        return {statusMessage: statusMessage};
      }

      function freeResources() {
        for (var ii = 0; ii < resourceDb_.length; ++ii) {
          var resource = resourceDb_[ii];
          if (resource instanceof WebGLBuffer) {
            ctx.deleteBuffer(resource);
          } else if (resource instanceof WebctxFramebuffer) {
            ctx.deleteFramebuffer(resource);
          } else if (resource instanceof WebctxProgram) {
            ctx.deleteProgram(resource);
          } else if (resource instanceof WebctxRenderbuffer) {
            ctx.deleteRenderbuffer(resource);
          } else if (resource instanceof WebctxShader) {
            ctx.deleteShader(resource);
          } else if (resource instanceof WebctxTexture) {
            ctx.deleteTexture(resource);
          }
        }
      }

      wrapper_.loseContext = function() {
        if (!contextLost_) {
          contextLost_ = true;
          ++contextId_;
          while (ctx.getError());
          clearErrors();
          glErrorShadow_[ctx.CONTEXT_LOST_WEBGL] = true;
          setTimeout(function() {
            if (onLost_) {
              onLost_(makeWebGLContextEvent("context lost"));
            }
          }, 0);
        }
      };

      wrapper_.restoreContext = function() {
        if (contextLost_) {
          if (onRestored_) {
            setTimeout(function() {
              freeResources();
              resetToInitialState(ctx);
              contextLost_ = false;
              if (onRestored_) {
                var callback = onRestored_;
                onRestored_ = nextOnRestored_;
                nextOnRestored_ = undefined;
                callback(makeWebGLContextEvent("context restored"));
              }
            }, 0);
          } else {
            throw "You can not restore the context without a listener"
          }
        }
      };

      // Wrap a few functions specially.
      wrapper_.getError = function() {
        if (!contextLost_) {
          var err;
          while (err = ctx.getError()) {
            glErrorShadow_[err] = true;
          }
        }
        for (var err in glErrorShadow_) {
          if (glErrorShadow_[err]) {
            delete glErrorShadow_[err];
            return err;
          }
        }
        return ctx.NO_ERROR;
      };

      var creationFunctions = [
        "createBuffer",
        "createFramebuffer",
        "createProgram",
        "createRenderbuffer",
        "createShader",
        "createTexture"
      ];
      for (var ii = 0; ii < creationFunctions.length; ++ii) {
        var functionName = creationFunctions[ii];
        wrapper_[functionName] = function(f) {
          return function() {
            if (contextLost_) {
              return null;
            }
            var obj = f.apply(ctx, arguments);
            obj.__webglDebugContextLostId__ = contextId_;
            resourceDb_.push(obj);
            return obj;
          };
        }(ctx[functionName]);
      }

      var functionsThatShouldReturnNull = [
        "getActiveAttrib",
        "getActiveUniform",
        "getBufferParameter",
        "getContextAttributes",
        "getAttachedShaders",
        "getFramebufferAttachmentParameter",
        "getParameter",
        "getProgramParameter",
        "getProgramInfoLog",
        "getRenderbufferParameter",
        "getShaderParameter",
        "getShaderInfoLog",
        "getShaderSource",
        "getTexParameter",
        "getUniform",
        "getUniformLocation",
        "getVertexAttrib"
      ];
      for (var ii = 0; ii < functionsThatShouldReturnNull.length; ++ii) {
        var functionName = functionsThatShouldReturnNull[ii];
        wrapper_[functionName] = function(f) {
          return function() {
            if (contextLost_) {
              return null;
            }
            return f.apply(ctx, arguments);
          }
        }(wrapper_[functionName]);
      }

      var isFunctions = [
        "isBuffer",
        "isEnabled",
        "isFramebuffer",
        "isProgram",
        "isRenderbuffer",
        "isShader",
        "isTexture"
      ];
      for (var ii = 0; ii < isFunctions.length; ++ii) {
        var functionName = isFunctions[ii];
        wrapper_[functionName] = function(f) {
          return function() {
            if (contextLost_) {
              return false;
            }
            return f.apply(ctx, arguments);
          }
        }(wrapper_[functionName]);
      }

      wrapper_.checkFramebufferStatus = function(f) {
        return function() {
          if (contextLost_) {
            return ctx.FRAMEBUFFER_UNSUPPORTED;
          }
          return f.apply(ctx, arguments);
        };
      }(wrapper_.checkFramebufferStatus);

      wrapper_.getAttribLocation = function(f) {
        return function() {
          if (contextLost_) {
            return -1;
          }
          return f.apply(ctx, arguments);
        };
      }(wrapper_.getAttribLocation);

      wrapper_.getVertexAttribOffset = function(f) {
        return function() {
          if (contextLost_) {
            return 0;
          }
          return f.apply(ctx, arguments);
        };
      }(wrapper_.getVertexAttribOffset);

      wrapper_.isContextLost = function() {
        return contextLost_;
      };

      function wrapEvent(listener) {
        if (typeof(listener) == "function") {
          return listener;
        } else {
          return function(info) {
            listener.handleEvent(info);
          }
        }
      }

      wrapper_.registerOnContextLostListener = function(listener) {
        onLost_ = wrapEvent(listener);
      };

      wrapper_.registerOnContextRestoredListener = function(listener) {
        if (contextLost_) {
          nextOnRestored_ = wrapEvent(listener);
        } else {
          onRestored_ = wrapEvent(listener);
        }
      }

      return wrapper_;
    }

    return {
      /**
       * Initializes this module. Safe to call more than once.
       * @param {!WebGLRenderingContext} ctx A WebGL context. If
       *    you have more than one context it doesn't matter which one
       *    you pass in, it is only used to pull out constants.
       */
      'init': init,

      /**
       * Returns true or false if value matches any WebGL enum
       * @param {*} value Value to check if it might be an enum.
       * @return {boolean} True if value matches one of the WebGL defined enums
       */
      'mightBeEnum': mightBeEnum,

      /**
       * Gets an string version of an WebGL enum.
       *
       * Example:
       *   WebGLDebugUtil.init(ctx);
       *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
       *
       * @param {number} value Value to return an enum for
       * @return {string} The string version of the enum.
       */
      'glEnumToString': glEnumToString,

      /**
       * Converts the argument of a WebGL function to a string.
       * Attempts to convert enum arguments to strings.
       *
       * Example:
       *   WebGLDebugUtil.init(ctx);
       *   var str = WebGLDebugUtil.glFunctionArgToString('bindTexture', 0, gl.TEXTURE_2D);
       *
       * would return 'TEXTURE_2D'
       *
       * @param {string} functionName the name of the WebGL function.
       * @param {number} argumentIndx the index of the argument.
       * @param {*} value The value of the argument.
       * @return {string} The value as a string.
       */
      'glFunctionArgToString': glFunctionArgToString,

      /**
       * Given a WebGL context returns a wrapped context that calls
       * gl.getError after every command and calls a function if the
       * result is not NO_ERROR.
       *
       * You can supply your own function if you want. For example, if you'd like
       * an exception thrown on any GL error you could do this
       *
       *    function throwOnGLError(err, funcName, args) {
   *      throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to" +
   *            funcName;
   *    };
       *
       *    ctx = WebGLDebugUtils.makeDebugContext(
       *        canvas.getContext("webgl"), throwOnGLError);
       *
       * @param {!WebGLRenderingContext} ctx The webgl context to wrap.
       * @param {!function(err, funcName, args): void} opt_onErrorFunc The function
       *     to call when gl.getError returns an error. If not specified the default
       *     function calls console.log with a message.
       */
      'makeDebugContext': makeDebugContext,

      /**
       * Given a WebGL context returns a wrapped context that adds 4
       * functions.
       *
       * ctx.loseContext:
       *   simulates a lost context event.
       *
       * ctx.restoreContext:
       *   simulates the context being restored.
       *
       * ctx.registerOnContextLostListener(listener):
       *   lets you register a listener for context lost. Use instead
       *   of addEventListener('webglcontextlostevent', listener);
       *
       * ctx.registerOnContextRestoredListener(listener):
       *   lets you register a listener for context restored. Use
       *   instead of addEventListener('webglcontextrestored',
       *   listener);
       *
       * @param {!WebGLRenderingContext} ctx The webgl context to wrap.
       */
      'makeLostContextSimulatingContext': makeLostContextSimulatingContext,

      /**
       * Resets a context to the initial state.
       * @param {!WebGLRenderingContext} ctx The webgl context to
       *     reset.
       */
      'resetToInitialState': resetToInitialState
    };

  }();
  /**
   * WebGL渲染器
   * 1. 获取绘画的上下文
   * @param parameters
   * @return {*}
   * @constructor
   */
  PGL.WebGLRenderer = function(parameters) {

    console.log('PGL.WebGLRenderer', PGL.REVISION);

    parameters = parameters || {};

    var _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
    var opt_debug = parameters.opt_debug !== undefined ? parameters.opt_debug : false;

    // Get the rendering context for WebGL
    var gl = PGL.WebGLUtils.setupWebGL(_canvas);
    if (!gl) return null;

    // if opt_debug is explicitly false, create the context for debugging
    if (opt_debug) {
      gl = PGL.WebGLDebugUtils.makeDebugContext(gl);
    }

    this.getContext = function () {
      return gl;
    }
  }
})(PGL);