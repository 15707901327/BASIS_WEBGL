// 定义常量
var PGL = {
	REVISION: 1 // 版本
};

// Math
(function (PGL) {
	PGL.Vector2 = function (x, y) {

		this.x = x || 0;
		this.y = y || 0;

	};
	Object.defineProperties(PGL.Vector2.prototype, {

		"width": {

			get: function () {

				return this.x;

			},

			set: function (value) {

				this.x = value;

			}

		},

		"height": {

			get: function () {

				return this.y;

			},

			set: function (value) {

				this.y = value;

			}

		}

	});
	Object.assign(PGL.Vector2.prototype, {

		isVector2: true,

		set: function (x, y) {

			this.x = x;
			this.y = y;

			return this;

		},

		setScalar: function (scalar) {

			this.x = scalar;
			this.y = scalar;

			return this;

		},

		setX: function (x) {

			this.x = x;

			return this;

		},

		setY: function (y) {

			this.y = y;

			return this;

		},

		setComponent: function (index, value) {

			switch (index) {

				case 0:
					this.x = value;
					break;
				case 1:
					this.y = value;
					break;
				default:
					throw new Error('index is out of range: ' + index);

			}

			return this;

		},

		getComponent: function (index) {

			switch (index) {

				case 0:
					return this.x;
				case 1:
					return this.y;
				default:
					throw new Error('index is out of range: ' + index);

			}

		},

		clone: function () {

			return new this.constructor(this.x, this.y);

		},

		copy: function (v) {

			this.x = v.x;
			this.y = v.y;

			return this;

		},

		add: function (v, w) {

			if (w !== undefined) {

				console.warn('THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
				return this.addVectors(v, w);

			}

			this.x += v.x;
			this.y += v.y;

			return this;

		},

		addScalar: function (s) {

			this.x += s;
			this.y += s;

			return this;

		},

		addVectors: function (a, b) {

			this.x = a.x + b.x;
			this.y = a.y + b.y;

			return this;

		},

		addScaledVector: function (v, s) {

			this.x += v.x * s;
			this.y += v.y * s;

			return this;

		},

		sub: function (v, w) {

			if (w !== undefined) {

				console.warn('THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
				return this.subVectors(v, w);

			}

			this.x -= v.x;
			this.y -= v.y;

			return this;

		},

		subScalar: function (s) {

			this.x -= s;
			this.y -= s;

			return this;

		},

		subVectors: function (a, b) {

			this.x = a.x - b.x;
			this.y = a.y - b.y;

			return this;

		},

		multiply: function (v) {

			this.x *= v.x;
			this.y *= v.y;

			return this;

		},

		multiplyScalar: function (scalar) {

			this.x *= scalar;
			this.y *= scalar;

			return this;

		},

		divide: function (v) {

			this.x /= v.x;
			this.y /= v.y;

			return this;

		},

		divideScalar: function (scalar) {

			return this.multiplyScalar(1 / scalar);

		},

		applyMatrix3: function (m) {

			var x = this.x, y = this.y;
			var e = m.elements;

			this.x = e[0] * x + e[3] * y + e[6];
			this.y = e[1] * x + e[4] * y + e[7];

			return this;

		},

		min: function (v) {

			this.x = Math.min(this.x, v.x);
			this.y = Math.min(this.y, v.y);

			return this;

		},

		max: function (v) {

			this.x = Math.max(this.x, v.x);
			this.y = Math.max(this.y, v.y);

			return this;

		},

		clamp: function (min, max) {

			// assumes min < max, componentwise

			this.x = Math.max(min.x, Math.min(max.x, this.x));
			this.y = Math.max(min.y, Math.min(max.y, this.y));

			return this;

		},

		clampScalar: function () {

			var min = new PGL.Vector2();
			var max = new PGL.Vector2();

			return function clampScalar(minVal, maxVal) {

				min.set(minVal, minVal);
				max.set(maxVal, maxVal);

				return this.clamp(min, max);

			};

		}(),

		clampLength: function (min, max) {

			var length = this.length();

			return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));

		},

		floor: function () {

			this.x = Math.floor(this.x);
			this.y = Math.floor(this.y);

			return this;

		},

		ceil: function () {

			this.x = Math.ceil(this.x);
			this.y = Math.ceil(this.y);

			return this;

		},

		round: function () {

			this.x = Math.round(this.x);
			this.y = Math.round(this.y);

			return this;

		},

		roundToZero: function () {

			this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
			this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);

			return this;

		},

		negate: function () {

			this.x = -this.x;
			this.y = -this.y;

			return this;

		},

		dot: function (v) {

			return this.x * v.x + this.y * v.y;

		},

		cross: function (v) {

			return this.x * v.y - this.y * v.x;

		},

		lengthSq: function () {

			return this.x * this.x + this.y * this.y;

		},

		length: function () {

			return Math.sqrt(this.x * this.x + this.y * this.y);

		},

		manhattanLength: function () {

			return Math.abs(this.x) + Math.abs(this.y);

		},

		normalize: function () {

			return this.divideScalar(this.length() || 1);

		},

		angle: function () {

			// computes the angle in radians with respect to the positive x-axis

			var angle = Math.atan2(this.y, this.x);

			if (angle < 0) angle += 2 * Math.PI;

			return angle;

		},

		distanceTo: function (v) {

			return Math.sqrt(this.distanceToSquared(v));

		},

		distanceToSquared: function (v) {

			var dx = this.x - v.x, dy = this.y - v.y;
			return dx * dx + dy * dy;

		},

		manhattanDistanceTo: function (v) {

			return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);

		},

		setLength: function (length) {

			return this.normalize().multiplyScalar(length);

		},

		lerp: function (v, alpha) {

			this.x += (v.x - this.x) * alpha;
			this.y += (v.y - this.y) * alpha;

			return this;

		},

		lerpVectors: function (v1, v2, alpha) {

			return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);

		},

		equals: function (v) {

			return ((v.x === this.x) && (v.y === this.y));

		},

		fromArray: function (array, offset) {

			if (offset === undefined) offset = 0;

			this.x = array[offset];
			this.y = array[offset + 1];

			return this;

		},

		toArray: function (array, offset) {

			if (array === undefined) array = [];
			if (offset === undefined) offset = 0;

			array[offset] = this.x;
			array[offset + 1] = this.y;

			return array;

		},

		fromBufferAttribute: function (attribute, index, offset) {

			if (offset !== undefined) {

				console.warn('THREE.Vector2: offset has been removed from .fromBufferAttribute().');

			}

			this.x = attribute.getX(index);
			this.y = attribute.getY(index);

			return this;

		},

		rotateAround: function (center, angle) {

			var c = Math.cos(angle), s = Math.sin(angle);

			var x = this.x - center.x;
			var y = this.y - center.y;

			this.x = x * c - y * s + center.x;
			this.y = x * s + y * c + center.y;

			return this;

		}

	});

	PGL.Vector3 = function (x, y, z) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
	};
	Object.assign(PGL.Vector3.prototype, {
		isVector3: true,

		clone: function () {
			return new this.constructor(this.x, this.y, this.z);
		},

		copy: function (v) {
			this.x = v.x;
			this.y = v.y;
			this.z = v.z;
			return this;
		},

		addVectors: function (a, b) {
			this.x = a.x + b.x;
			this.y = a.y + b.y;
			this.z = a.z + b.z;
			return this;
		},

		multiplyScalar: function (scalar) {

			this.x *= scalar;
			this.y *= scalar;
			this.z *= scalar;

			return this;

		},

		applyMatrix4: function (m) {

			var x = this.x, y = this.y, z = this.z;
			var e = m.elements;

			var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);

			this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
			this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
			this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;

			return this;

		},

		/**
		 * 获得x\y\z的最小值
		 * @param v
		 * @return {min}
		 */
		min: function (v) {
			this.x = Math.min(this.x, v.x);
			this.y = Math.min(this.y, v.y);
			this.z = Math.min(this.z, v.z);
			return this;
		},

		/**
		 * 获得x\y\z的最大值
		 * @param v
		 * @return {min}
		 */
		max: function (v) {

			this.x = Math.max(this.x, v.x);
			this.y = Math.max(this.y, v.y);
			this.z = Math.max(this.z, v.z);

			return this;

		},

		dot: function (v) {
			return this.x * v.x + this.y * v.y + this.z * v.z;
		},

		/**
		 * 计算两点距离的平方
		 * @param v
		 * @return {number}
		 */
		distanceToSquared: function (v) {
			var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
			return dx * dx + dy * dy + dz * dz;
		}
	});

	PGL.Vector4 = function (x, y, z, w) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		this.w = (w !== undefined) ? w : 1;
	};
	Object.assign(PGL.Vector4.prototype, {
		isVector4: true,

		set: function (x, y, z, w) {

			this.x = x;
			this.y = y;
			this.z = z;
			this.w = w;

			return this;

		},

		setScalar: function (scalar) {

			this.x = scalar;
			this.y = scalar;
			this.z = scalar;
			this.w = scalar;

			return this;

		},

		setX: function (x) {

			this.x = x;

			return this;

		},

		setY: function (y) {

			this.y = y;

			return this;

		},

		setZ: function (z) {

			this.z = z;

			return this;

		},

		setW: function (w) {

			this.w = w;

			return this;

		},

		setComponent: function (index, value) {

			switch (index) {

				case 0:
					this.x = value;
					break;
				case 1:
					this.y = value;
					break;
				case 2:
					this.z = value;
					break;
				case 3:
					this.w = value;
					break;
				default:
					throw new Error('index is out of range: ' + index);

			}

			return this;

		},

		getComponent: function (index) {

			switch (index) {

				case 0:
					return this.x;
				case 1:
					return this.y;
				case 2:
					return this.z;
				case 3:
					return this.w;
				default:
					throw new Error('index is out of range: ' + index);

			}

		},

		clone: function () {

			return new this.constructor(this.x, this.y, this.z, this.w);

		},

		/**
		 * 拷贝对象中的每个值
		 * @param v
		 * @return {copy}
		 */
		copy: function (v) {
			this.x = v.x;
			this.y = v.y;
			this.z = v.z;
			this.w = (v.w !== undefined) ? v.w : 1;

			return this;
		},

		add: function (v) {

			this.x += v.x;
			this.y += v.y;
			this.z += v.z;
			this.w += v.w;

			return this;

		},

		addScalar: function (s) {

			this.x += s;
			this.y += s;
			this.z += s;
			this.w += s;

			return this;

		},

		addVectors: function (a, b) {

			this.x = a.x + b.x;
			this.y = a.y + b.y;
			this.z = a.z + b.z;
			this.w = a.w + b.w;

			return this;

		},

		addScaledVector: function (v, s) {

			this.x += v.x * s;
			this.y += v.y * s;
			this.z += v.z * s;
			this.w += v.w * s;

			return this;

		},

		sub: function (v) {

			this.x -= v.x;
			this.y -= v.y;
			this.z -= v.z;
			this.w -= v.w;

			return this;

		},

		subScalar: function (s) {

			this.x -= s;
			this.y -= s;
			this.z -= s;
			this.w -= s;

			return this;

		},

		subVectors: function (a, b) {

			this.x = a.x - b.x;
			this.y = a.y - b.y;
			this.z = a.z - b.z;
			this.w = a.w - b.w;

			return this;

		},

		multiplyScalar: function (scalar) {

			this.x *= scalar;
			this.y *= scalar;
			this.z *= scalar;
			this.w *= scalar;

			return this;

		},

		applyMatrix4: function (m) {

			var x = this.x, y = this.y, z = this.z, w = this.w;
			var e = m.elements;

			this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
			this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
			this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
			this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;

			return this;

		},

		divideScalar: function (scalar) {

			return this.multiplyScalar(1 / scalar);

		},

		setAxisAngleFromQuaternion: function (q) {

			// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm

			// q is assumed to be normalized

			this.w = 2 * Math.acos(q.w);

			var s = Math.sqrt(1 - q.w * q.w);

			if (s < 0.0001) {

				this.x = 1;
				this.y = 0;
				this.z = 0;

			} else {

				this.x = q.x / s;
				this.y = q.y / s;
				this.z = q.z / s;

			}

			return this;

		},

		setAxisAngleFromRotationMatrix: function (m) {

			// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

			// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

			var angle, x, y, z,		// variables for result
				epsilon = 0.01,		// margin to allow for rounding errors
				epsilon2 = 0.1,		// margin to distinguish between 0 and 180 degrees

				te = m.elements,

				m11 = te[0], m12 = te[4], m13 = te[8],
				m21 = te[1], m22 = te[5], m23 = te[9],
				m31 = te[2], m32 = te[6], m33 = te[10];

			if ((Math.abs(m12 - m21) < epsilon) &&
				(Math.abs(m13 - m31) < epsilon) &&
				(Math.abs(m23 - m32) < epsilon)) {

				// singularity found
				// first check for identity matrix which must have +1 for all terms
				// in leading diagonal and zero in other terms

				if ((Math.abs(m12 + m21) < epsilon2) &&
					(Math.abs(m13 + m31) < epsilon2) &&
					(Math.abs(m23 + m32) < epsilon2) &&
					(Math.abs(m11 + m22 + m33 - 3) < epsilon2)) {

					// this singularity is identity matrix so angle = 0

					this.set(1, 0, 0, 0);

					return this; // zero angle, arbitrary axis

				}

				// otherwise this singularity is angle = 180

				angle = Math.PI;

				var xx = (m11 + 1) / 2;
				var yy = (m22 + 1) / 2;
				var zz = (m33 + 1) / 2;
				var xy = (m12 + m21) / 4;
				var xz = (m13 + m31) / 4;
				var yz = (m23 + m32) / 4;

				if ((xx > yy) && (xx > zz)) {

					// m11 is the largest diagonal term

					if (xx < epsilon) {

						x = 0;
						y = 0.707106781;
						z = 0.707106781;

					} else {

						x = Math.sqrt(xx);
						y = xy / x;
						z = xz / x;

					}

				} else if (yy > zz) {

					// m22 is the largest diagonal term

					if (yy < epsilon) {

						x = 0.707106781;
						y = 0;
						z = 0.707106781;

					} else {

						y = Math.sqrt(yy);
						x = xy / y;
						z = yz / y;

					}

				} else {

					// m33 is the largest diagonal term so base result on this

					if (zz < epsilon) {

						x = 0.707106781;
						y = 0.707106781;
						z = 0;

					} else {

						z = Math.sqrt(zz);
						x = xz / z;
						y = yz / z;

					}

				}

				this.set(x, y, z, angle);

				return this; // return 180 deg rotation

			}

			// as we have reached here there are no singularities so we can handle normally

			var s = Math.sqrt((m32 - m23) * (m32 - m23) +
				(m13 - m31) * (m13 - m31) +
				(m21 - m12) * (m21 - m12)); // used to normalize

			if (Math.abs(s) < 0.001) s = 1;

			// prevent divide by zero, should not happen if matrix is orthogonal and should be
			// caught by singularity test above, but I've left it in just in case

			this.x = (m32 - m23) / s;
			this.y = (m13 - m31) / s;
			this.z = (m21 - m12) / s;
			this.w = Math.acos((m11 + m22 + m33 - 1) / 2);

			return this;

		},

		min: function (v) {

			this.x = Math.min(this.x, v.x);
			this.y = Math.min(this.y, v.y);
			this.z = Math.min(this.z, v.z);
			this.w = Math.min(this.w, v.w);

			return this;

		},

		max: function (v) {

			this.x = Math.max(this.x, v.x);
			this.y = Math.max(this.y, v.y);
			this.z = Math.max(this.z, v.z);
			this.w = Math.max(this.w, v.w);

			return this;

		},

		clamp: function (min, max) {

			// assumes min < max, componentwise

			this.x = Math.max(min.x, Math.min(max.x, this.x));
			this.y = Math.max(min.y, Math.min(max.y, this.y));
			this.z = Math.max(min.z, Math.min(max.z, this.z));
			this.w = Math.max(min.w, Math.min(max.w, this.w));

			return this;

		},

		clampScalar: function () {

			var min, max;

			return function clampScalar(minVal, maxVal) {

				if (min === undefined) {

					min = new Vector4();
					max = new Vector4();

				}

				min.set(minVal, minVal, minVal, minVal);
				max.set(maxVal, maxVal, maxVal, maxVal);

				return this.clamp(min, max);

			};

		}(),

		clampLength: function (min, max) {

			var length = this.length();

			return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));

		},

		floor: function () {

			this.x = Math.floor(this.x);
			this.y = Math.floor(this.y);
			this.z = Math.floor(this.z);
			this.w = Math.floor(this.w);

			return this;

		},

		ceil: function () {

			this.x = Math.ceil(this.x);
			this.y = Math.ceil(this.y);
			this.z = Math.ceil(this.z);
			this.w = Math.ceil(this.w);

			return this;

		},

		round: function () {

			this.x = Math.round(this.x);
			this.y = Math.round(this.y);
			this.z = Math.round(this.z);
			this.w = Math.round(this.w);

			return this;

		},

		roundToZero: function () {

			this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
			this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
			this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
			this.w = (this.w < 0) ? Math.ceil(this.w) : Math.floor(this.w);

			return this;

		},

		negate: function () {

			this.x = -this.x;
			this.y = -this.y;
			this.z = -this.z;
			this.w = -this.w;

			return this;

		},

		dot: function (v) {

			return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;

		},

		lengthSq: function () {

			return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;

		},

		length: function () {

			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);

		},

		manhattanLength: function () {

			return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);

		},

		normalize: function () {

			return this.divideScalar(this.length() || 1);

		},

		setLength: function (length) {

			return this.normalize().multiplyScalar(length);

		},

		lerp: function (v, alpha) {

			this.x += (v.x - this.x) * alpha;
			this.y += (v.y - this.y) * alpha;
			this.z += (v.z - this.z) * alpha;
			this.w += (v.w - this.w) * alpha;

			return this;

		},

		lerpVectors: function (v1, v2, alpha) {

			return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);

		},

		/**
		 * 如果各个分量的值都相等，返回true 否则 返回false
		 * @param v
		 * @return {boolean}
		 */
		equals: function (v) {
			return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z) && (v.w === this.w));
		},

		fromArray: function (array, offset) {

			if (offset === undefined) offset = 0;

			this.x = array[offset];
			this.y = array[offset + 1];
			this.z = array[offset + 2];
			this.w = array[offset + 3];

			return this;

		},

		toArray: function (array, offset) {

			if (array === undefined) array = [];
			if (offset === undefined) offset = 0;

			array[offset] = this.x;
			array[offset + 1] = this.y;
			array[offset + 2] = this.z;
			array[offset + 3] = this.w;

			return array;

		},

		fromBufferAttribute: function (attribute, index, offset) {

			if (offset !== undefined) {

				console.warn('THREE.Vector4: offset has been removed from .fromBufferAttribute().');

			}

			this.x = attribute.getX(index);
			this.y = attribute.getY(index);
			this.z = attribute.getZ(index);
			this.w = attribute.getW(index);

			return this;

		}
	});

	PGL.Color = function (r, g, b) {
		if (g === undefined && b === undefined) {
			// r is PGL.Color, hex or string
			return this.set(r);
		}
		return this.setRGB(r, g, b);
	};
	Object.assign(PGL.Color.prototype, {

		isColor: true,

		r: 1, g: 1, b: 1,

		set: function (value) {
			if (value && value.isColor) {
				this.copy(value);
			} else if (typeof value === 'number') {
				this.setHex(value);
			} else if (typeof value === 'string') {
				this.setStyle(value);
			}
			return this;
		},

		setHex: function (hex) {
			hex = Math.floor(hex);

			this.r = (hex >> 16 & 255) / 255;
			this.g = (hex >> 8 & 255) / 255;
			this.b = (hex & 255) / 255;

			return this;
		},

		setRGB: function (r, g, b) {

			this.r = r;
			this.g = g;
			this.b = b;

			return this;

		},

		setHSL: function () {
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

		setStyle: function (style) {

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
				switch (name) {
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

		clone: function () {
			return new this.constructor(this.r, this.g, this.b);
		},

		copy: function (color) {
			this.r = color.r;
			this.g = color.g;
			this.b = color.b;

			return this;
		}
	});
})(PGL);

// 场景
PGL.Scene = function () {
	this.children = [];
};
Object.assign(PGL.Scene.prototype, {

	/**
	 * 添加子类
	 * @param object
	 */
	add: function (object) {
		this.children.push(object);
	}
});
PGL.Mesh = function (geometry, material) {
	this.geometry = geometry;
	this.material = material;
};
PGL.Geometry = function () {

};
PGL.Material = function () {
};
PGL.ShaderMaterial = function (options) {

	PGL.Material.call(this);

	var options = options || {};
	this.vertexShader = options.vertexShader;
	this.fragmentShader = options.fragmentShader;
};

/**
 * WebGL渲染器
 * 1. 获取绘画的上下文
 * @param parameters
 *  _canvas:画布
 *  _context:上下文
 * @return {*}
 * @constructor
 */
PGL.WebGLRenderer = function (parameters) {

	console.log('PGL.WebGLRenderer', PGL.REVISION);

	parameters = parameters || {};
	var _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas'),
		_context = parameters.context !== undefined ? parameters.context : null;

	// public properties
	this.domElement = _canvas;

	// Get the rendering context for WebGL
	var _gl = getWebGLContext();
	if (!_gl) return null;

	function initShaders(gl, vshader, fshader) {
		var program = createProgram(gl, vshader, fshader);
		if (!program) {
			console.log('Failed to create program');
			return false;
		}

		gl.useProgram(program);
		gl.program = program;

		return true;
	}

	/**
	 * Create the linked program object (创建一个链接好的程序对象)
	 * @param gl GL context
	 * @param vshader a vertex shader program (string)
	 * @param fshader a fragment shader program (string)
	 * @return created program object, or null if the creation has failed
	 */
	function createProgram(gl, vshader, fshader) {
		// 创建着色器对象
		var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
		var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
		if (!vertexShader || !fragmentShader) {
			return null;
		}

		// 创建程序对象
		var program = gl.createProgram();
		if (!program) {
			return null;
		}

		// 为程序对象分配顶点着色器和片元着色器
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);

		// 链接着色器
		gl.linkProgram(program);

		// 检查链接
		var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
		if (!linked) {
			var error = gl.getProgramInfoLog(program);
			console.log('Failed to link program: ' + error);
			gl.deleteProgram(program);
			gl.deleteShader(fragmentShader);
			gl.deleteShader(vertexShader);
			return null;
		}
		return program;
	}

	/**
	 * Create a shader object （创建一个编译好的着色器对象）
	 * @param gl GL context
	 * @param type the type of the shader object to be created
	 * @param source shader program (string)
	 * @return created shader object, or null if the creation has failed.
	 */
	function loadShader(gl, type, source) {
		// 创建着色器对象
		var shader = gl.createShader(type);
		if (shader == null) {
			console.log('unable to create shader');
			return null;
		}

		// 设置着色器的源代码
		gl.shaderSource(shader, source);

		// 编译着色器
		gl.compileShader(shader);

		// 检查着色器的编译状态
		var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (!compiled) {
			var error = gl.getShaderInfoLog(shader);
			console.log('Failed to compile shader: ' + error);
			gl.deleteShader(shader);
			return null;
		}

		return shader;
	}

	var state = new PGL.WebGLState(_gl);

	// 渲染物体
	this.render = function (scene) {

		var VSHADER_SOURCE = scene.children[0].material.vertexShader;
		var FSHADER_SOURCE = scene.children[0].material.fragmentShader;

		if (!initShaders(_gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
			console.log('Failed to intialize shaders.');
			return;
		}

		/**
		 * 绘制一个点
		 * gl.drawArrays(mode, first, count)
		 * 执行顶点着色器，按照mode参数指定的方式绘制图形
		 * 参数：
		 *  mode：指定绘制的方式，可以接收一下常量符号：gl_POINTS,
		 *    gl_LINES,gl_LINE_STRIP,gl_LINE_LOOP,gl_TRIANGLES,gl_TRIANGLE_STRIP,
		 *    gl_TRIANGLE_FAN
		 *  first:指定从那个顶点开始绘制
		 *  count：指定绘制需要用到多少个顶点（整形数）
		 * 返回值：无
		 * 错误：
		 *  INVALID_ENUM：传入的mode参数不是前述参数之一
		 *  INVALID_VALUE：参数first或count是负数
		 */
		_gl.drawArrays(_gl.POINTS, 0, 1);
	};

	// 获取上下文
	this.getContext = function () {
		return _gl;
	};

	this.clearColor = function () {
		_gl.clear(_gl.COLOR_BUFFER_BIT);
	};

	// 设置背景颜色
	this.setClearColor = function (color, alpha) {
		state.buffers.color.setClear(color.r, color.g, color.b, alpha);

		this.clear(true, false, false)
	};

	/**
	 * 根据参数清空颜色缓存区、深度缓存区、模版缓存区
	 * @param color
	 * @param depth
	 * @param stencil
	 */
	this.clear = function (color, depth, stencil) {

		var bits = 0;

		if (color === undefined || color) bits |= _gl.COLOR_BUFFER_BIT;
		if (depth === undefined || depth) bits |= _gl.DEPTH_BUFFER_BIT;
		if (stencil === undefined || stencil) bits |= _gl.STENCIL_BUFFER_BIT;

		_gl.clear(bits);

	};

	this.clearColor = function () {

		this.clear(true, false, false);

	};

	this.clearDepth = function () {

		this.clear(false, true, false);

	};

	this.clearStencil = function () {

		this.clear(false, false, true);

	};

	/**
	 * 获取上下文
	 * @return {*|CanvasRenderingContext2D|WebGLRenderingContext}
	 * @private
	 */
	function getWebGLContext() {
		try {
			var gl = _context || _canvas.getContext('webgl') || _canvas.getContext('experimental-webgl');
			if (gl === null) {
				if (_canvas.getContext('webgl') !== null) {
					throw new Error('Error creating WebGL context with your selected attributes.');
				} else {
					throw new Error('Error creating WebGL context.');
				}
			}

			// Some experimental-webgl implementations do not have getShaderPrecisionFormat
			if (gl.getShaderPrecisionFormat === undefined) {
				gl.getShaderPrecisionFormat = function () {
					return {'rangeMin': 1, 'rangeMax': 1, 'precision': 1};
				};
			}

			return gl;
		} catch (error) {
			console.error('THREE.WebGLRenderer: ' + error.message);
		}
	}
};

/**
 * WebGL的相关状态
 * @param gl
 * @constructor
 */
PGL.WebGLState = function (gl) {

	function ColorBuffer() {

		var color = new PGL.Vector4();
		var currentColorClear = new PGL.Vector4(0, 0, 0, 0);

		return {
			setClear: function (r, g, b, a) {
				color.set(r, g, b, a);

				if (currentColorClear.equals(color) === false) {
					gl.clearColor(r, g, b, a);
					currentColorClear.copy(color);
				}
			}
		}
	}

	var colorBuffer = new ColorBuffer();
	colorBuffer.setClear(0, 0, 0, 1);

	return {
		buffers: {
			color: colorBuffer
		}
	}
};