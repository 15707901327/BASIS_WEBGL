function Color(r, g, b) {
  if (g === undefined && b === undefined) {
    // r is PGL.Color, hex or string
    return this.set(r);
  }
  return this.setRGB(r, g, b);
};
Object.assign(Color.prototype, {

  isColor: true,

  r: 1, g: 1, b: 1,

  set: function(value) {
    if (value && value.isColor) {
      this.copy(value);
    } else if (typeof value === 'number') {
      this.setHex(value);
    } else if (typeof value === 'string') {
      this.setStyle(value);
    }
    return this;
  },

  setHex: function(hex) {
    hex = Math.floor(hex);

    this.r = (hex >> 16 & 255) / 255;
    this.g = (hex >> 8 & 255) / 255;
    this.b = (hex & 255) / 255;

    return this;
  },

  setRGB: function(r, g, b) {

    this.r = r;
    this.g = g;
    this.b = b;

    return this;

  },

  setHSL: function() {
    function hue2rgb(p, q, t) {

      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
      return p;

    }

    return function setHSL(h, s, l) {

      // h,s,l ranges are in 0.0 - 1.0
      h = PGL.Math.euclideanModulo(h, 1);
      s = PGL.Math.clamp(s, 0, 1);
      l = PGL.Math.clamp(l, 0, 1);

      if (s === 0) {
        this.r = this.g = this.b = l;
      } else {

        var p = l <= 0.5 ? l * (1 + s) : l + s - (l * s);
        var q = (2 * l) - p;
        this.r = hue2rgb(q, p, h + 1 / 3);
        this.g = hue2rgb(q, p, h);
        this.b = hue2rgb(q, p, h - 1 / 3);
      }
      return this;
    };
  }(),

  multiplyScalar: function(s) {

    this.r *= s;
    this.g *= s;
    this.b *= s;

    return this;

  },

  setStyle: function(style) {

    function handleAlpha(string) {
      if (string === undefined) return;
      if (parseFloat(string) < 1) {
        console.warn('PGL.Color: Alpha component of ' + style + ' will be ignored.');
      }
    }

    var m;
    if (m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(style)) {
      // rgb / hsl
      var color;
      var name = m[1];
      var components = m[2];
      switch(name){
        case 'rgb':
        case 'rgba':
          if (color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
            // rgb(255,0,0) rgba(255,0,0,0.5)
            this.r = Math.min(255, parseInt(color[1], 10)) / 255;
            this.g = Math.min(255, parseInt(color[2], 10)) / 255;
            this.b = Math.min(255, parseInt(color[3], 10)) / 255;
            handleAlpha(color[5]);
            return this;
          }
          if (color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
            // rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
            this.r = Math.min(100, parseInt(color[1], 10)) / 100;
            this.g = Math.min(100, parseInt(color[2], 10)) / 100;
            this.b = Math.min(100, parseInt(color[3], 10)) / 100;
            handleAlpha(color[5]);
            return this;
          }
          break;
        case 'hsl':
        case 'hsla':
          if (color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
            // hsl(120,50%,50%) hsla(120,50%,50%,0.5)
            var h = parseFloat(color[1]) / 360;
            var s = parseInt(color[2], 10) / 100;
            var l = parseInt(color[3], 10) / 100;
            handleAlpha(color[5]);
            return this.setHSL(h, s, l);
          }
          break;
      }
    } else if (m = /^\#([A-Fa-f0-9]+)$/.exec(style)) {

      // hex color
      var hex = m[1];
      var size = hex.length;

      if (size === 3) {
        // #ff0
        this.r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255;
        this.g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255;
        this.b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255;
        return this;
      } else if (size === 6) {
        // #ff0000
        this.r = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255;
        this.g = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255;
        this.b = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255;

        return this;

      }

    }

    if (style && style.length > 0) {

      // color keywords
      var hex = PGL.ColorKeywords[style];

      if (hex !== undefined) {
        // red
        this.setHex(hex);
      } else {
        // unknown color
        console.warn('THREE.Color: Unknown color ' + style);
      }
    }
    return this;
  },

  clone: function() {
    return new this.constructor(this.r, this.g, this.b);
  },

  copy: function(color) {
    this.r = color.r;
    this.g = color.g;
    this.b = color.b;

    return this;
  }
});

export {Color};