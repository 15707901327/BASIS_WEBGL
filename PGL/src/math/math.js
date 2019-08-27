// Math
(function (PGL) {
    PGL._Math = {

        DEG2RAD: Math.PI / 180,
        RAD2DEG: 180 / Math.PI,

        generateUUID: ( function () {

            // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136

            var lut = [];

            for ( var i = 0; i < 256; i ++ ) {

                lut[ i ] = ( i < 16 ? '0' : '' ) + ( i ).toString( 16 );

            }

            return function generateUUID() {

                var d0 = Math.random() * 0xffffffff | 0;
                var d1 = Math.random() * 0xffffffff | 0;
                var d2 = Math.random() * 0xffffffff | 0;
                var d3 = Math.random() * 0xffffffff | 0;
                var uuid = lut[ d0 & 0xff ] + lut[ d0 >> 8 & 0xff ] + lut[ d0 >> 16 & 0xff ] + lut[ d0 >> 24 & 0xff ] + '-' +
                    lut[ d1 & 0xff ] + lut[ d1 >> 8 & 0xff ] + '-' + lut[ d1 >> 16 & 0x0f | 0x40 ] + lut[ d1 >> 24 & 0xff ] + '-' +
                    lut[ d2 & 0x3f | 0x80 ] + lut[ d2 >> 8 & 0xff ] + '-' + lut[ d2 >> 16 & 0xff ] + lut[ d2 >> 24 & 0xff ] +
                    lut[ d3 & 0xff ] + lut[ d3 >> 8 & 0xff ] + lut[ d3 >> 16 & 0xff ] + lut[ d3 >> 24 & 0xff ];

                // .toUpperCase() here flattens concatenated strings to save heap memory space.
                return uuid.toUpperCase();

            };

        } )(),

        clamp: function ( value, min, max ) {

            return Math.max( min, Math.min( max, value ) );

        },

        // compute euclidian modulo of m % n
        // https://en.wikipedia.org/wiki/Modulo_operation

        euclideanModulo: function ( n, m ) {

            return ( ( n % m ) + m ) % m;

        },

        // Linear mapping from range <a1, a2> to range <b1, b2>
        // 线性映射
        mapLinear: function ( x, a1, a2, b1, b2 ) {
            return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );
        },

        // https://en.wikipedia.org/wiki/Linear_interpolation

        lerp: function ( x, y, t ) {

            return ( 1 - t ) * x + t * y;

        },

        // http://en.wikipedia.org/wiki/Smoothstep

        smoothstep: function ( x, min, max ) {

            if ( x <= min ) return 0;
            if ( x >= max ) return 1;

            x = ( x - min ) / ( max - min );

            return x * x * ( 3 - 2 * x );

        },

        smootherstep: function ( x, min, max ) {

            if ( x <= min ) return 0;
            if ( x >= max ) return 1;

            x = ( x - min ) / ( max - min );

            return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

        },

        // Random integer from <low, high> interval

        randInt: function ( low, high ) {

            return low + Math.floor( Math.random() * ( high - low + 1 ) );

        },

        // Random float from <low, high> interval

        randFloat: function ( low, high ) {

            return low + Math.random() * ( high - low );

        },

        // Random float from <-range/2, range/2> interval

        randFloatSpread: function ( range ) {

            return range * ( 0.5 - Math.random() );

        },

        degToRad: function ( degrees ) {

            return degrees * _Math.DEG2RAD;

        },

        radToDeg: function ( radians ) {

            return radians * _Math.RAD2DEG;

        },

        isPowerOfTwo: function ( value ) {

            return ( value & ( value - 1 ) ) === 0 && value !== 0;

        },

        ceilPowerOfTwo: function ( value ) {

            return Math.pow( 2, Math.ceil( Math.log( value ) / Math.LN2 ) );

        },

        floorPowerOfTwo: function ( value ) {

            return Math.pow( 2, Math.floor( Math.log( value ) / Math.LN2 ) );

        }

    };

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

        set: function (x, y, z) {

            this.x = x;
            this.y = y;
            this.z = z;

            return this;

        },

        setScalar: function (scalar) {

            this.x = scalar;
            this.y = scalar;
            this.z = scalar;

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
                default:
                    throw new Error('index is out of range: ' + index);

            }

        },

        clone: function () {

            return new this.constructor(this.x, this.y, this.z);

        },

        copy: function (v) {

            this.x = v.x;
            this.y = v.y;
            this.z = v.z;

            return this;

        },

        add: function (v, w) {

            if (w !== undefined) {

                console.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
                return this.addVectors(v, w);

            }

            this.x += v.x;
            this.y += v.y;
            this.z += v.z;

            return this;

        },

        addScalar: function (s) {

            this.x += s;
            this.y += s;
            this.z += s;

            return this;

        },

        addVectors: function (a, b) {
            this.x = a.x + b.x;
            this.y = a.y + b.y;
            this.z = a.z + b.z;

            return this;

        },

        addScaledVector: function (v, s) {

            this.x += v.x * s;
            this.y += v.y * s;
            this.z += v.z * s;

            return this;

        },

        sub: function (v, w) {

            if (w !== undefined) {

                console.warn('THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
                return this.subVectors(v, w);

            }

            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;

            return this;

        },

        subScalar: function (s) {

            this.x -= s;
            this.y -= s;
            this.z -= s;

            return this;

        },

        subVectors: function (a, b) {

            this.x = a.x - b.x;
            this.y = a.y - b.y;
            this.z = a.z - b.z;

            return this;

        },

        multiply: function (v, w) {

            if (w !== undefined) {

                console.warn('THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
                return this.multiplyVectors(v, w);

            }

            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;

            return this;
        },

        multiplyScalar: function (scalar) {

            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;

            return this;

        },

        multiplyVectors: function (a, b) {

            this.x = a.x * b.x;
            this.y = a.y * b.y;
            this.z = a.z * b.z;

            return this;

        },

        applyMatrix3: function (m) {

            var x = this.x, y = this.y, z = this.z;
            var e = m.elements;

            this.x = e[0] * x + e[3] * y + e[6] * z;
            this.y = e[1] * x + e[4] * y + e[7] * z;
            this.z = e[2] * x + e[5] * y + e[8] * z;

            return this;

        },

        setFromMatrixPosition: function (m) {

            var e = m.elements;

            this.x = e[12];
            this.y = e[13];
            this.z = e[14];

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

        applyQuaternion: function (q) {

            var x = this.x, y = this.y, z = this.z;
            var qx = q.x, qy = q.y, qz = q.z, qw = q.w;

            // calculate quat * vector

            var ix = qw * x + qy * z - qz * y;
            var iy = qw * y + qz * x - qx * z;
            var iz = qw * z + qx * y - qy * x;
            var iw = -qx * x - qy * y - qz * z;

            // calculate result * inverse quat

            this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

            return this;

        },

        project: function (camera) {

            return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);

        },

        unproject: function ( camera ) {

            return this.applyMatrix4( camera.projectionMatrixInverse ).applyMatrix4( camera.matrixWorld );

        },

        transformDirection: function (m) {

            // input: THREE.Matrix4 affine matrix
            // vector interpreted as a direction

            var x = this.x, y = this.y, z = this.z;
            var e = m.elements;

            this.x = e[0] * x + e[4] * y + e[8] * z;
            this.y = e[1] * x + e[5] * y + e[9] * z;
            this.z = e[2] * x + e[6] * y + e[10] * z;

            return this.normalize();

        },

        divide: function (v) {

            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;

            return this;

        },

        divideScalar: function (scalar) {

            return this.multiplyScalar(1 / scalar);

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

        clamp: function (min, max) {

            // assumes min < max, componentwise

            this.x = Math.max(min.x, Math.min(max.x, this.x));
            this.y = Math.max(min.y, Math.min(max.y, this.y));
            this.z = Math.max(min.z, Math.min(max.z, this.z));

            return this;

        },

        clampScalar: function ( minVal, maxVal ) {

            this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
            this.y = Math.max( minVal, Math.min( maxVal, this.y ) );
            this.z = Math.max( minVal, Math.min( maxVal, this.z ) );

            return this;

        },

        clampLength: function (min, max) {

            var length = this.length();

            return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));

        },

        floor: function () {

            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            this.z = Math.floor(this.z);

            return this;

        },

        ceil: function () {

            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            this.z = Math.ceil(this.z);

            return this;

        },

        round: function () {

            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.z = Math.round(this.z);

            return this;

        },

        roundToZero: function () {

            this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
            this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
            this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);

            return this;

        },

        negate: function () {

            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;

            return this;

        },

        dot: function (v) {
            return this.x * v.x + this.y * v.y + this.z * v.z;

        },

        // TODO lengthSquared?

        lengthSq: function () {

            return this.x * this.x + this.y * this.y + this.z * this.z;

        },

        length: function () {

            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

        },

        manhattanLength: function () {

            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);

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

            return this;

        },

        lerpVectors: function (v1, v2, alpha) {

            return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);

        },

        cross: function (v, w) {

            if (w !== undefined) {

                console.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
                return this.crossVectors(v, w);

            }

            return this.crossVectors(this, v);

        },

        crossVectors: function (a, b) {

            var ax = a.x, ay = a.y, az = a.z;
            var bx = b.x, by = b.y, bz = b.z;

            this.x = ay * bz - az * by;
            this.y = az * bx - ax * bz;
            this.z = ax * by - ay * bx;

            return this;

        },

        projectOnVector: function (vector) {

            var scalar = vector.dot(this) / vector.lengthSq();

            return this.copy(vector).multiplyScalar(scalar);

        },

        projectOnPlane: function () {

            var v1 = new Vector3();

            return function projectOnPlane(planeNormal) {

                v1.copy(this).projectOnVector(planeNormal);

                return this.sub(v1);

            };

        }(),

        reflect: function () {

            // reflect incident vector off plane orthogonal to normal
            // normal is assumed to have unit length

            var v1 = new Vector3();

            return function reflect(normal) {

                return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));

            };

        }(),

        angleTo: function (v) {

            var theta = this.dot(v) / (Math.sqrt(this.lengthSq() * v.lengthSq()));

            // clamp, to handle numerical problems

            return Math.acos(_Math.clamp(theta, -1, 1));

        },

        distanceTo: function (v) {

            return Math.sqrt(this.distanceToSquared(v));

        },

        /**
         * 计算两点距离的平方
         * @param v
         * @return {number}
         */
        distanceToSquared: function (v) {
            var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
            return dx * dx + dy * dy + dz * dz;

        },

        manhattanDistanceTo: function (v) {

            return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);

        },

        setFromSpherical: function (s) {

            return this.setFromSphericalCoords(s.radius, s.phi, s.theta);

        },

        setFromSphericalCoords: function (radius, phi, theta) {

            var sinPhiRadius = Math.sin(phi) * radius;

            this.x = sinPhiRadius * Math.sin(theta);
            this.y = Math.cos(phi) * radius;
            this.z = sinPhiRadius * Math.cos(theta);

            return this;

        },

        setFromCylindrical: function (c) {

            return this.setFromCylindricalCoords(c.radius, c.theta, c.y);

        },

        setFromCylindricalCoords: function (radius, theta, y) {

            this.x = radius * Math.sin(theta);
            this.y = y;
            this.z = radius * Math.cos(theta);

            return this;

        },

        setFromMatrixPosition: function (m) {

            var e = m.elements;

            this.x = e[12];
            this.y = e[13];
            this.z = e[14];

            return this;

        },

        setFromMatrixScale: function (m) {

            var sx = this.setFromMatrixColumn(m, 0).length();
            var sy = this.setFromMatrixColumn(m, 1).length();
            var sz = this.setFromMatrixColumn(m, 2).length();

            this.x = sx;
            this.y = sy;
            this.z = sz;

            return this;

        },

        setFromMatrixColumn: function (m, index) {

            return this.fromArray(m.elements, index * 4);

        },

        equals: function (v) {

            return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));

        },

        fromArray: function (array, offset) {

            if (offset === undefined) offset = 0;

            this.x = array[offset];
            this.y = array[offset + 1];
            this.z = array[offset + 2];

            return this;

        },

        toArray: function (array, offset) {

            if (array === undefined) array = [];
            if (offset === undefined) offset = 0;

            array[offset] = this.x;
            array[offset + 1] = this.y;
            array[offset + 2] = this.z;

            return array;

        },

        fromBufferAttribute: function (attribute, index, offset) {

            if (offset !== undefined) {

                console.warn('THREE.Vector3: offset has been removed from .fromBufferAttribute().');

            }

            this.x = attribute.getX(index);
            this.y = attribute.getY(index);
            this.z = attribute.getZ(index);

            return this;

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

        multiplyScalar: function ( s ) {

            this.r *= s;
            this.g *= s;
            this.b *= s;

            return this;

        },

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

    PGL.Matrix3 = function () {

        this.elements = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ];

        if (arguments.length > 0) {
            console.error('THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.');
        }

    };
    Object.assign(PGL.Matrix3.prototype, {

        isMatrix3: true,

        set: function (n11, n12, n13, n21, n22, n23, n31, n32, n33) {

            var te = this.elements;

            te[0] = n11;
            te[1] = n21;
            te[2] = n31;
            te[3] = n12;
            te[4] = n22;
            te[5] = n32;
            te[6] = n13;
            te[7] = n23;
            te[8] = n33;

            return this;

        },

        identity: function () {

            this.set(
                1, 0, 0,
                0, 1, 0,
                0, 0, 1
            );

            return this;

        },

        clone: function () {

            return new this.constructor().fromArray(this.elements);

        },

        copy: function (m) {

            var te = this.elements;
            var me = m.elements;

            te[0] = me[0];
            te[1] = me[1];
            te[2] = me[2];
            te[3] = me[3];
            te[4] = me[4];
            te[5] = me[5];
            te[6] = me[6];
            te[7] = me[7];
            te[8] = me[8];

            return this;

        },

        setFromMatrix4: function (m) {

            var me = m.elements;

            this.set(
                me[0], me[4], me[8],
                me[1], me[5], me[9],
                me[2], me[6], me[10]
            );

            return this;

        },

        applyToBufferAttribute: function () {

            var v1 = new PGL.Vector3();

            return function applyToBufferAttribute(attribute) {

                for (var i = 0, l = attribute.count; i < l; i++) {

                    v1.x = attribute.getX(i);
                    v1.y = attribute.getY(i);
                    v1.z = attribute.getZ(i);

                    v1.applyMatrix3(this);

                    attribute.setXYZ(i, v1.x, v1.y, v1.z);

                }

                return attribute;

            };

        }(),

        multiply: function (m) {

            return this.multiplyMatrices(this, m);

        },

        premultiply: function (m) {

            return this.multiplyMatrices(m, this);

        },

        multiplyMatrices: function (a, b) {

            var ae = a.elements;
            var be = b.elements;
            var te = this.elements;

            var a11 = ae[0], a12 = ae[3], a13 = ae[6];
            var a21 = ae[1], a22 = ae[4], a23 = ae[7];
            var a31 = ae[2], a32 = ae[5], a33 = ae[8];

            var b11 = be[0], b12 = be[3], b13 = be[6];
            var b21 = be[1], b22 = be[4], b23 = be[7];
            var b31 = be[2], b32 = be[5], b33 = be[8];

            te[0] = a11 * b11 + a12 * b21 + a13 * b31;
            te[3] = a11 * b12 + a12 * b22 + a13 * b32;
            te[6] = a11 * b13 + a12 * b23 + a13 * b33;

            te[1] = a21 * b11 + a22 * b21 + a23 * b31;
            te[4] = a21 * b12 + a22 * b22 + a23 * b32;
            te[7] = a21 * b13 + a22 * b23 + a23 * b33;

            te[2] = a31 * b11 + a32 * b21 + a33 * b31;
            te[5] = a31 * b12 + a32 * b22 + a33 * b32;
            te[8] = a31 * b13 + a32 * b23 + a33 * b33;

            return this;

        },

        multiplyScalar: function (s) {

            var te = this.elements;

            te[0] *= s;
            te[3] *= s;
            te[6] *= s;
            te[1] *= s;
            te[4] *= s;
            te[7] *= s;
            te[2] *= s;
            te[5] *= s;
            te[8] *= s;

            return this;

        },

        determinant: function () {

            var te = this.elements;

            var a = te[0], b = te[1], c = te[2],
                d = te[3], e = te[4], f = te[5],
                g = te[6], h = te[7], i = te[8];

            return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;

        },

        getInverse: function (matrix, throwOnDegenerate) {

            if (matrix && matrix.isMatrix4) {

                console.error("THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument.");

            }

            var me = matrix.elements,
                te = this.elements,

                n11 = me[0], n21 = me[1], n31 = me[2],
                n12 = me[3], n22 = me[4], n32 = me[5],
                n13 = me[6], n23 = me[7], n33 = me[8],

                t11 = n33 * n22 - n32 * n23,
                t12 = n32 * n13 - n33 * n12,
                t13 = n23 * n12 - n22 * n13,

                det = n11 * t11 + n21 * t12 + n31 * t13;

            if (det === 0) {

                var msg = "THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0";

                if (throwOnDegenerate === true) {

                    throw new Error(msg);

                } else {

                    console.warn(msg);

                }

                return this.identity();

            }

            var detInv = 1 / det;

            te[0] = t11 * detInv;
            te[1] = (n31 * n23 - n33 * n21) * detInv;
            te[2] = (n32 * n21 - n31 * n22) * detInv;

            te[3] = t12 * detInv;
            te[4] = (n33 * n11 - n31 * n13) * detInv;
            te[5] = (n31 * n12 - n32 * n11) * detInv;

            te[6] = t13 * detInv;
            te[7] = (n21 * n13 - n23 * n11) * detInv;
            te[8] = (n22 * n11 - n21 * n12) * detInv;

            return this;

        },

        transpose: function () {

            var tmp, m = this.elements;

            tmp = m[1];
            m[1] = m[3];
            m[3] = tmp;
            tmp = m[2];
            m[2] = m[6];
            m[6] = tmp;
            tmp = m[5];
            m[5] = m[7];
            m[7] = tmp;

            return this;

        },

        getNormalMatrix: function (matrix4) {

            return this.setFromMatrix4(matrix4).getInverse(this).transpose();

        },

        transposeIntoArray: function (r) {

            var m = this.elements;

            r[0] = m[0];
            r[1] = m[3];
            r[2] = m[6];
            r[3] = m[1];
            r[4] = m[4];
            r[5] = m[7];
            r[6] = m[2];
            r[7] = m[5];
            r[8] = m[8];

            return this;

        },

        setUvTransform: function (tx, ty, sx, sy, rotation, cx, cy) {

            var c = Math.cos(rotation);
            var s = Math.sin(rotation);

            this.set(
                sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx,
                -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty,
                0, 0, 1
            );

        },

        scale: function (sx, sy) {

            var te = this.elements;

            te[0] *= sx;
            te[3] *= sx;
            te[6] *= sx;
            te[1] *= sy;
            te[4] *= sy;
            te[7] *= sy;

            return this;

        },

        rotate: function (theta) {

            var c = Math.cos(theta);
            var s = Math.sin(theta);

            var te = this.elements;

            var a11 = te[0], a12 = te[3], a13 = te[6];
            var a21 = te[1], a22 = te[4], a23 = te[7];

            te[0] = c * a11 + s * a21;
            te[3] = c * a12 + s * a22;
            te[6] = c * a13 + s * a23;

            te[1] = -s * a11 + c * a21;
            te[4] = -s * a12 + c * a22;
            te[7] = -s * a13 + c * a23;

            return this;

        },

        translate: function (tx, ty) {

            var te = this.elements;

            te[0] += tx * te[2];
            te[3] += tx * te[5];
            te[6] += tx * te[8];
            te[1] += ty * te[2];
            te[4] += ty * te[5];
            te[7] += ty * te[8];

            return this;

        },

        equals: function (matrix) {

            var te = this.elements;
            var me = matrix.elements;

            for (var i = 0; i < 9; i++) {

                if (te[i] !== me[i]) return false;

            }

            return true;

        },

        fromArray: function (array, offset) {

            if (offset === undefined) offset = 0;

            for (var i = 0; i < 9; i++) {

                this.elements[i] = array[i + offset];

            }

            return this;

        },

        toArray: function (array, offset) {

            if (array === undefined) array = [];
            if (offset === undefined) offset = 0;

            var te = this.elements;

            array[offset] = te[0];
            array[offset + 1] = te[1];
            array[offset + 2] = te[2];

            array[offset + 3] = te[3];
            array[offset + 4] = te[4];
            array[offset + 5] = te[5];

            array[offset + 6] = te[6];
            array[offset + 7] = te[7];
            array[offset + 8] = te[8];

            return array;

        }

    });

    /**
     * 矩阵
     * @constructor
     */
    PGL.Matrix4 = function () {

        this.elements = [

            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1

        ];

        if (arguments.length > 0) {
            console.error('PGL.Matrix4: the constructor no longer reads arguments. use .set() instead.');
        }

    };
    Object.assign(PGL.Matrix4.prototype, {

        isMatrix4: true,

        set: function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {

            var te = this.elements;

            te[0] = n11;
            te[4] = n12;
            te[8] = n13;
            te[12] = n14;
            te[1] = n21;
            te[5] = n22;
            te[9] = n23;
            te[13] = n24;
            te[2] = n31;
            te[6] = n32;
            te[10] = n33;
            te[14] = n34;
            te[3] = n41;
            te[7] = n42;
            te[11] = n43;
            te[15] = n44;

            return this;

        },

        identity: function () {

            this.set(
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            );

            return this;

        },

        clone: function () {

            return new Matrix4().fromArray(this.elements);

        },

        copy: function (m) {

            var te = this.elements;
            var me = m.elements;

            te[0] = me[0];
            te[1] = me[1];
            te[2] = me[2];
            te[3] = me[3];
            te[4] = me[4];
            te[5] = me[5];
            te[6] = me[6];
            te[7] = me[7];
            te[8] = me[8];
            te[9] = me[9];
            te[10] = me[10];
            te[11] = me[11];
            te[12] = me[12];
            te[13] = me[13];
            te[14] = me[14];
            te[15] = me[15];

            return this;

        },

        copyPosition: function (m) {

            var te = this.elements, me = m.elements;

            te[12] = me[12];
            te[13] = me[13];
            te[14] = me[14];

            return this;

        },

        extractBasis: function (xAxis, yAxis, zAxis) {

            xAxis.setFromMatrixColumn(this, 0);
            yAxis.setFromMatrixColumn(this, 1);
            zAxis.setFromMatrixColumn(this, 2);

            return this;

        },

        makeBasis: function (xAxis, yAxis, zAxis) {

            this.set(
                xAxis.x, yAxis.x, zAxis.x, 0,
                xAxis.y, yAxis.y, zAxis.y, 0,
                xAxis.z, yAxis.z, zAxis.z, 0,
                0, 0, 0, 1
            );

            return this;

        },

        extractRotation: function () {

            var v1 = new PGL.Vector3();

            return function extractRotation(m) {

                // this method does not support reflection matrices

                var te = this.elements;
                var me = m.elements;

                var scaleX = 1 / v1.setFromMatrixColumn(m, 0).length();
                var scaleY = 1 / v1.setFromMatrixColumn(m, 1).length();
                var scaleZ = 1 / v1.setFromMatrixColumn(m, 2).length();

                te[0] = me[0] * scaleX;
                te[1] = me[1] * scaleX;
                te[2] = me[2] * scaleX;
                te[3] = 0;

                te[4] = me[4] * scaleY;
                te[5] = me[5] * scaleY;
                te[6] = me[6] * scaleY;
                te[7] = 0;

                te[8] = me[8] * scaleZ;
                te[9] = me[9] * scaleZ;
                te[10] = me[10] * scaleZ;
                te[11] = 0;

                te[12] = 0;
                te[13] = 0;
                te[14] = 0;
                te[15] = 1;

                return this;

            };

        }(),

        makeRotationFromEuler: function (euler) {

            if (!(euler && euler.isEuler)) {

                console.error('THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a PGL.Vector3 and order.');

            }

            var te = this.elements;

            var x = euler.x, y = euler.y, z = euler.z;
            var a = Math.cos(x), b = Math.sin(x);
            var c = Math.cos(y), d = Math.sin(y);
            var e = Math.cos(z), f = Math.sin(z);

            if (euler.order === 'XYZ') {

                var ae = a * e, af = a * f, be = b * e, bf = b * f;

                te[0] = c * e;
                te[4] = -c * f;
                te[8] = d;

                te[1] = af + be * d;
                te[5] = ae - bf * d;
                te[9] = -b * c;

                te[2] = bf - ae * d;
                te[6] = be + af * d;
                te[10] = a * c;

            } else if (euler.order === 'YXZ') {

                var ce = c * e, cf = c * f, de = d * e, df = d * f;

                te[0] = ce + df * b;
                te[4] = de * b - cf;
                te[8] = a * d;

                te[1] = a * f;
                te[5] = a * e;
                te[9] = -b;

                te[2] = cf * b - de;
                te[6] = df + ce * b;
                te[10] = a * c;

            } else if (euler.order === 'ZXY') {

                var ce = c * e, cf = c * f, de = d * e, df = d * f;

                te[0] = ce - df * b;
                te[4] = -a * f;
                te[8] = de + cf * b;

                te[1] = cf + de * b;
                te[5] = a * e;
                te[9] = df - ce * b;

                te[2] = -a * d;
                te[6] = b;
                te[10] = a * c;

            } else if (euler.order === 'ZYX') {

                var ae = a * e, af = a * f, be = b * e, bf = b * f;

                te[0] = c * e;
                te[4] = be * d - af;
                te[8] = ae * d + bf;

                te[1] = c * f;
                te[5] = bf * d + ae;
                te[9] = af * d - be;

                te[2] = -d;
                te[6] = b * c;
                te[10] = a * c;

            } else if (euler.order === 'YZX') {

                var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

                te[0] = c * e;
                te[4] = bd - ac * f;
                te[8] = bc * f + ad;

                te[1] = f;
                te[5] = a * e;
                te[9] = -b * e;

                te[2] = -d * e;
                te[6] = ad * f + bc;
                te[10] = ac - bd * f;

            } else if (euler.order === 'XZY') {

                var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

                te[0] = c * e;
                te[4] = -f;
                te[8] = d * e;

                te[1] = ac * f + bd;
                te[5] = a * e;
                te[9] = ad * f - bc;

                te[2] = bc * f - ad;
                te[6] = b * e;
                te[10] = bd * f + ac;

            }

            // bottom row
            te[3] = 0;
            te[7] = 0;
            te[11] = 0;

            // last column
            te[12] = 0;
            te[13] = 0;
            te[14] = 0;
            te[15] = 1;

            return this;

        },

        /**
         * 根据四元数初始化一个矩阵
         * @param q Quaternion实例
         */
        makeRotationFromQuaternion: function () {

            var zero = new PGL.Vector3(0, 0, 0);
            var one = new PGL.Vector3(1, 1, 1);

            return function makeRotationFromQuaternion(q) {

                return this.compose(zero, q, one);

            };

        }(),

        lookAt: function () {

            var x = new PGL.Vector3();
            var y = new PGL.Vector3();
            var z = new PGL.Vector3();

            /**
             * @param eye 相机的位置
             * @param target 查看的位置
             * @param up 相机的上方向
             */
            return function lookAt(eye, target, up) {

                var te = this.elements;

                z.subVectors(eye, target);

                if (z.lengthSq() === 0) {

                    // eye and target are in the same position

                    z.z = 1;

                }

                z.normalize();
                x.crossVectors(up, z);

                if (x.lengthSq() === 0) {

                    // up and z are parallel

                    if (Math.abs(up.z) === 1) {

                        z.x += 0.0001;

                    } else {

                        z.z += 0.0001;

                    }

                    z.normalize();
                    x.crossVectors(up, z);

                }

                x.normalize();
                y.crossVectors(z, x);

                te[0] = x.x;
                te[4] = y.x;
                te[8] = z.x;
                te[1] = x.y;
                te[5] = y.y;
                te[9] = z.y;
                te[2] = x.z;
                te[6] = y.z;
                te[10] = z.z;

                return this;

            };

        }(),

        multiply: function (m, n) {

            if (n !== undefined) {

                console.warn('THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.');
                return this.multiplyMatrices(m, n);

            }

            return this.multiplyMatrices(this, m);

        },

        premultiply: function (m) {

            return this.multiplyMatrices(m, this);

        },

        /**
         * 计算矩阵乘积，复制给当前矩阵
         * @param a
         * @param b
         * @returns {Matrix4}
         */
        multiplyMatrices: function (a, b) {

            var ae = a.elements;
            var be = b.elements;
            var te = this.elements;

            var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
            var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
            var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
            var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];

            var b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
            var b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
            var b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
            var b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];

            te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
            te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
            te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
            te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

            te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
            te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
            te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
            te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

            te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
            te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
            te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
            te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

            te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
            te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
            te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
            te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

            return this;

        },

        multiplyScalar: function (s) {

            var te = this.elements;

            te[0] *= s;
            te[4] *= s;
            te[8] *= s;
            te[12] *= s;
            te[1] *= s;
            te[5] *= s;
            te[9] *= s;
            te[13] *= s;
            te[2] *= s;
            te[6] *= s;
            te[10] *= s;
            te[14] *= s;
            te[3] *= s;
            te[7] *= s;
            te[11] *= s;
            te[15] *= s;

            return this;

        },

        applyToBufferAttribute: function () {

            var v1 = new PGL.Vector3();

            return function applyToBufferAttribute(attribute) {

                for (var i = 0, l = attribute.count; i < l; i++) {

                    v1.x = attribute.getX(i);
                    v1.y = attribute.getY(i);
                    v1.z = attribute.getZ(i);

                    v1.applyMatrix4(this);

                    attribute.setXYZ(i, v1.x, v1.y, v1.z);

                }

                return attribute;

            };

        }(),

        /**
         * 计算并返回当前矩阵的行列式
         * @return {number}
         */
        determinant: function () {

            var te = this.elements;

            var n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
            var n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
            var n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
            var n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];

            //TODO: make this more efficient
            //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

            return (
                n41 * (
                    +n14 * n23 * n32
                    - n13 * n24 * n32
                    - n14 * n22 * n33
                    + n12 * n24 * n33
                    + n13 * n22 * n34
                    - n12 * n23 * n34
                ) +
                n42 * (
                    +n11 * n23 * n34
                    - n11 * n24 * n33
                    + n14 * n21 * n33
                    - n13 * n21 * n34
                    + n13 * n24 * n31
                    - n14 * n23 * n31
                ) +
                n43 * (
                    +n11 * n24 * n32
                    - n11 * n22 * n34
                    - n14 * n21 * n32
                    + n12 * n21 * n34
                    + n14 * n22 * n31
                    - n12 * n24 * n31
                ) +
                n44 * (
                    -n13 * n22 * n31
                    - n11 * n23 * n32
                    + n11 * n22 * n33
                    + n13 * n21 * n32
                    - n12 * n21 * n33
                    + n12 * n23 * n31
                )

            );

        },

        transpose: function () {

            var te = this.elements;
            var tmp;

            tmp = te[1];
            te[1] = te[4];
            te[4] = tmp;
            tmp = te[2];
            te[2] = te[8];
            te[8] = tmp;
            tmp = te[6];
            te[6] = te[9];
            te[9] = tmp;

            tmp = te[3];
            te[3] = te[12];
            te[12] = tmp;
            tmp = te[7];
            te[7] = te[13];
            te[13] = tmp;
            tmp = te[11];
            te[11] = te[14];
            te[14] = tmp;

            return this;

        },

        setPosition: function (v) {

            var te = this.elements;

            te[12] = v.x;
            te[13] = v.y;
            te[14] = v.z;

            return this;

        },

        /**
         * 使用此处概述的方法将此矩阵设置为传递的矩阵m的倒数。
         * @param m 矩阵
         * @param throwOnDegenerate
         * @return {*}
         */
        getInverse: function (m, throwOnDegenerate) {

            // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
            var te = this.elements,
                me = m.elements,

                n11 = me[0], n21 = me[1], n31 = me[2], n41 = me[3],
                n12 = me[4], n22 = me[5], n32 = me[6], n42 = me[7],
                n13 = me[8], n23 = me[9], n33 = me[10], n43 = me[11],
                n14 = me[12], n24 = me[13], n34 = me[14], n44 = me[15],

                t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
                t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
                t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
                t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

            var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

            if (det === 0) {

                var msg = "THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0";

                if (throwOnDegenerate === true) {

                    throw new Error(msg);

                } else {

                    console.warn(msg);

                }

                return this.identity();

            }

            var detInv = 1 / det;

            te[0] = t11 * detInv;
            te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
            te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
            te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;

            te[4] = t12 * detInv;
            te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
            te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
            te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;

            te[8] = t13 * detInv;
            te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
            te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
            te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;

            te[12] = t14 * detInv;
            te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
            te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
            te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;

            return this;

        },

        scale: function (v) {

            var te = this.elements;
            var x = v.x, y = v.y, z = v.z;

            te[0] *= x;
            te[4] *= y;
            te[8] *= z;
            te[1] *= x;
            te[5] *= y;
            te[9] *= z;
            te[2] *= x;
            te[6] *= y;
            te[10] *= z;
            te[3] *= x;
            te[7] *= y;
            te[11] *= z;

            return this;

        },

        getMaxScaleOnAxis: function () {

            var te = this.elements;

            var scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
            var scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
            var scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];

            return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));

        },

        makeTranslation: function (x, y, z) {

            this.set(
                1, 0, 0, x,
                0, 1, 0, y,
                0, 0, 1, z,
                0, 0, 0, 1
            );

            return this;

        },

        makeRotationX: function (theta) {

            var c = Math.cos(theta), s = Math.sin(theta);

            this.set(
                1, 0, 0, 0,
                0, c, -s, 0,
                0, s, c, 0,
                0, 0, 0, 1
            );

            return this;

        },

        makeRotationY: function (theta) {

            var c = Math.cos(theta), s = Math.sin(theta);

            this.set(
                c, 0, s, 0,
                0, 1, 0, 0,
                -s, 0, c, 0,
                0, 0, 0, 1
            );

            return this;

        },

        makeRotationZ: function (theta) {

            var c = Math.cos(theta), s = Math.sin(theta);

            this.set(
                c, -s, 0, 0,
                s, c, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            );

            return this;

        },

        makeRotationAxis: function (axis, angle) {

            // Based on http://www.gamedev.net/reference/articles/article1199.asp

            var c = Math.cos(angle);
            var s = Math.sin(angle);
            var t = 1 - c;
            var x = axis.x, y = axis.y, z = axis.z;
            var tx = t * x, ty = t * y;

            this.set(
                tx * x + c, tx * y - s * z, tx * z + s * y, 0,
                tx * y + s * z, ty * y + c, ty * z - s * x, 0,
                tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
                0, 0, 0, 1
            );

            return this;

        },

        makeScale: function (x, y, z) {

            this.set(
                x, 0, 0, 0,
                0, y, 0, 0,
                0, 0, z, 0,
                0, 0, 0, 1
            );

            return this;

        },

        makeShear: function (x, y, z) {

            this.set(
                1, y, z, 0,
                x, 1, z, 0,
                x, y, 1, 0,
                0, 0, 0, 1
            );

            return this;

        },

        /**
         * 使用参数初始化当前的矩阵
         * @param position
         * @param quaternion
         * @param scale
         * @return {compose}
         */
        compose: function (position, quaternion, scale) {

            var te = this.elements;

            var x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
            var x2 = x + x, y2 = y + y, z2 = z + z;
            var xx = x * x2, xy = x * y2, xz = x * z2;
            var yy = y * y2, yz = y * z2, zz = z * z2;
            var wx = w * x2, wy = w * y2, wz = w * z2;

            var sx = scale.x, sy = scale.y, sz = scale.z;

            te[0] = (1 - (yy + zz)) * sx;
            te[1] = (xy + wz) * sx;
            te[2] = (xz - wy) * sx;
            te[3] = 0;

            te[4] = (xy - wz) * sy;
            te[5] = (1 - (xx + zz)) * sy;
            te[6] = (yz + wx) * sy;
            te[7] = 0;

            te[8] = (xz + wy) * sz;
            te[9] = (yz - wx) * sz;
            te[10] = (1 - (xx + yy)) * sz;
            te[11] = 0;

            te[12] = position.x;
            te[13] = position.y;
            te[14] = position.z;
            te[15] = 1;

            return this;

        },

        decompose: function () {

            var vector = new PGL.Vector3();
            var matrix = new PGL.Matrix4();

            return function decompose(position, quaternion, scale) {

                var te = this.elements;

                var sx = vector.set(te[0], te[1], te[2]).length();
                var sy = vector.set(te[4], te[5], te[6]).length();
                var sz = vector.set(te[8], te[9], te[10]).length();

                // if determine is negative, we need to invert one scale
                var det = this.determinant();
                if (det < 0) sx = -sx;

                position.x = te[12];
                position.y = te[13];
                position.z = te[14];

                // scale the rotation part
                matrix.copy(this);

                var invSX = 1 / sx;
                var invSY = 1 / sy;
                var invSZ = 1 / sz;

                matrix.elements[0] *= invSX;
                matrix.elements[1] *= invSX;
                matrix.elements[2] *= invSX;

                matrix.elements[4] *= invSY;
                matrix.elements[5] *= invSY;
                matrix.elements[6] *= invSY;

                matrix.elements[8] *= invSZ;
                matrix.elements[9] *= invSZ;
                matrix.elements[10] *= invSZ;

                quaternion.setFromRotationMatrix(matrix);

                scale.x = sx;
                scale.y = sy;
                scale.z = sz;

                return this;

            };

        }(),

        /**
         * 根据参数设置投影矩阵
         * @param left
         * @param right
         * @param top
         * @param bottom
         * @param near
         * @param far
         * @return {makePerspective}
         */
        makePerspective: function (left, right, top, bottom, near, far) {

            if (far === undefined) {

                console.warn('THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.');

            }

            var te = this.elements;
            var x = 2 * near / (right - left);
            var y = 2 * near / (top - bottom);

            var a = (right + left) / (right - left);
            var b = (top + bottom) / (top - bottom);
            var c = -(far + near) / (far - near);
            var d = -2 * far * near / (far - near);

            te[0] = x;
            te[4] = 0;
            te[8] = a;
            te[12] = 0;
            te[1] = 0;
            te[5] = y;
            te[9] = b;
            te[13] = 0;
            te[2] = 0;
            te[6] = 0;
            te[10] = c;
            te[14] = d;
            te[3] = 0;
            te[7] = 0;
            te[11] = -1;
            te[15] = 0;

            return this;

        },

        makeOrthographic: function (left, right, top, bottom, near, far) {

            var te = this.elements;
            var w = 1.0 / (right - left);
            var h = 1.0 / (top - bottom);
            var p = 1.0 / (far - near);

            var x = (right + left) * w;
            var y = (top + bottom) * h;
            var z = (far + near) * p;

            te[0] = 2 * w;
            te[4] = 0;
            te[8] = 0;
            te[12] = -x;
            te[1] = 0;
            te[5] = 2 * h;
            te[9] = 0;
            te[13] = -y;
            te[2] = 0;
            te[6] = 0;
            te[10] = -2 * p;
            te[14] = -z;
            te[3] = 0;
            te[7] = 0;
            te[11] = 0;
            te[15] = 1;

            return this;

        },

        equals: function (matrix) {

            var te = this.elements;
            var me = matrix.elements;

            for (var i = 0; i < 16; i++) {

                if (te[i] !== me[i]) return false;

            }

            return true;

        },

        fromArray: function (array, offset) {

            if (offset === undefined) offset = 0;

            for (var i = 0; i < 16; i++) {

                this.elements[i] = array[i + offset];

            }

            return this;

        },

        toArray: function (array, offset) {

            if (array === undefined) array = [];
            if (offset === undefined) offset = 0;

            var te = this.elements;

            array[offset] = te[0];
            array[offset + 1] = te[1];
            array[offset + 2] = te[2];
            array[offset + 3] = te[3];

            array[offset + 4] = te[4];
            array[offset + 5] = te[5];
            array[offset + 6] = te[6];
            array[offset + 7] = te[7];

            array[offset + 8] = te[8];
            array[offset + 9] = te[9];
            array[offset + 10] = te[10];
            array[offset + 11] = te[11];

            array[offset + 12] = te[12];
            array[offset + 13] = te[13];
            array[offset + 14] = te[14];
            array[offset + 15] = te[15];

            return array;

        }

    });

    /**
     * 四元数
     * @param x
     * @param y
     * @param z
     * @param w
     * @constructor
     */
    PGL.Quaternion = function (x, y, z, w) {
        this._x = x || 0;
        this._y = y || 0;
        this._z = z || 0;
        this._w = (w !== undefined) ? w : 1;
    };
    Object.defineProperties(PGL.Quaternion.prototype, {

        x: {

            get: function () {

                return this._x;

            },

            set: function (value) {

                this._x = value;
                this.onChangeCallback();

            }

        },

        y: {

            get: function () {

                return this._y;

            },

            set: function (value) {

                this._y = value;
                this.onChangeCallback();

            }

        },

        z: {

            get: function () {

                return this._z;

            },

            set: function (value) {

                this._z = value;
                this.onChangeCallback();

            }

        },

        w: {

            get: function () {

                return this._w;

            },

            set: function (value) {

                this._w = value;
                this.onChangeCallback();

            }

        }

    });
    Object.assign(PGL.Quaternion.prototype, {
        set: function ( x, y, z, w ) {

            this._x = x;
            this._y = y;
            this._z = z;
            this._w = w;

            this.onChangeCallback();

            return this;

        },

        clone: function () {

            return new this.constructor( this._x, this._y, this._z, this._w );

        },

        copy: function ( quaternion ) {

            this._x = quaternion.x;
            this._y = quaternion.y;
            this._z = quaternion.z;
            this._w = quaternion.w;

            this.onChangeCallback();

            return this;

        },

        setFromEuler: function ( euler, update ) {

            if ( ! ( euler && euler.isEuler ) ) {

                throw new Error( 'THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.' );

            }

            var x = euler._x, y = euler._y, z = euler._z, order = euler.order;

            // http://www.mathworks.com/matlabcentral/fileexchange/
            // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
            //	content/SpinCalc.m

            var cos = Math.cos;
            var sin = Math.sin;

            var c1 = cos( x / 2 );
            var c2 = cos( y / 2 );
            var c3 = cos( z / 2 );

            var s1 = sin( x / 2 );
            var s2 = sin( y / 2 );
            var s3 = sin( z / 2 );

            if ( order === 'XYZ' ) {

                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;

            } else if ( order === 'YXZ' ) {

                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;

            } else if ( order === 'ZXY' ) {

                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;

            } else if ( order === 'ZYX' ) {

                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;

            } else if ( order === 'YZX' ) {

                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;

            } else if ( order === 'XZY' ) {

                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;

            }

            if ( update !== false ) this.onChangeCallback();

            return this;

        },

        setFromAxisAngle: function ( axis, angle ) {

            // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

            // assumes axis is normalized

            var halfAngle = angle / 2, s = Math.sin( halfAngle );

            this._x = axis.x * s;
            this._y = axis.y * s;
            this._z = axis.z * s;
            this._w = Math.cos( halfAngle );

            this.onChangeCallback();

            return this;

        },

        setFromRotationMatrix: function ( m ) {

            // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

            // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

            var te = m.elements,

                m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
                m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
                m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

                trace = m11 + m22 + m33,
                s;

            if ( trace > 0 ) {

                s = 0.5 / Math.sqrt( trace + 1.0 );

                this._w = 0.25 / s;
                this._x = ( m32 - m23 ) * s;
                this._y = ( m13 - m31 ) * s;
                this._z = ( m21 - m12 ) * s;

            } else if ( m11 > m22 && m11 > m33 ) {

                s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

                this._w = ( m32 - m23 ) / s;
                this._x = 0.25 * s;
                this._y = ( m12 + m21 ) / s;
                this._z = ( m13 + m31 ) / s;

            } else if ( m22 > m33 ) {

                s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

                this._w = ( m13 - m31 ) / s;
                this._x = ( m12 + m21 ) / s;
                this._y = 0.25 * s;
                this._z = ( m23 + m32 ) / s;

            } else {

                s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

                this._w = ( m21 - m12 ) / s;
                this._x = ( m13 + m31 ) / s;
                this._y = ( m23 + m32 ) / s;
                this._z = 0.25 * s;

            }

            this.onChangeCallback();

            return this;

        },

        setFromUnitVectors: function ( vFrom, vTo ) {

            // assumes direction vectors vFrom and vTo are normalized

            var EPS = 0.000001;

            var r = vFrom.dot( vTo ) + 1;

            if ( r < EPS ) {

                r = 0;

                if ( Math.abs( vFrom.x ) > Math.abs( vFrom.z ) ) {

                    this._x = - vFrom.y;
                    this._y = vFrom.x;
                    this._z = 0;
                    this._w = r;

                } else {

                    this._x = 0;
                    this._y = - vFrom.z;
                    this._z = vFrom.y;
                    this._w = r;

                }

            } else {

                // crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3

                this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
                this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
                this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
                this._w = r;

            }

            return this.normalize();

        },

        angleTo: function ( q ) {

            return 2 * Math.acos( Math.abs( _Math.clamp( this.dot( q ), - 1, 1 ) ) );

        },

        rotateTowards: function ( q, step ) {

            var angle = this.angleTo( q );

            if ( angle === 0 ) return this;

            var t = Math.min( 1, step / angle );

            this.slerp( q, t );

            return this;

        },

        inverse: function () {

            // quaternion is assumed to have unit length

            return this.conjugate();

        },

        conjugate: function () {

            this._x *= - 1;
            this._y *= - 1;
            this._z *= - 1;

            this.onChangeCallback();

            return this;

        },

        dot: function ( v ) {

            return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

        },

        lengthSq: function () {

            return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

        },

        length: function () {

            return Math.sqrt( this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w );

        },

        normalize: function () {

            var l = this.length();

            if ( l === 0 ) {

                this._x = 0;
                this._y = 0;
                this._z = 0;
                this._w = 1;

            } else {

                l = 1 / l;

                this._x = this._x * l;
                this._y = this._y * l;
                this._z = this._z * l;
                this._w = this._w * l;

            }

            this.onChangeCallback();

            return this;

        },

        multiply: function ( q, p ) {

            if ( p !== undefined ) {

                console.warn( 'THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.' );
                return this.multiplyQuaternions( q, p );

            }

            return this.multiplyQuaternions( this, q );

        },

        premultiply: function ( q ) {

            return this.multiplyQuaternions( q, this );

        },

        multiplyQuaternions: function ( a, b ) {

            // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

            var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
            var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

            this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
            this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
            this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
            this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

            this.onChangeCallback();

            return this;

        },

        slerp: function ( qb, t ) {

            if ( t === 0 ) return this;
            if ( t === 1 ) return this.copy( qb );

            var x = this._x, y = this._y, z = this._z, w = this._w;

            // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

            var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

            if ( cosHalfTheta < 0 ) {

                this._w = - qb._w;
                this._x = - qb._x;
                this._y = - qb._y;
                this._z = - qb._z;

                cosHalfTheta = - cosHalfTheta;

            } else {

                this.copy( qb );

            }

            if ( cosHalfTheta >= 1.0 ) {

                this._w = w;
                this._x = x;
                this._y = y;
                this._z = z;

                return this;

            }

            var sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

            if ( sqrSinHalfTheta <= Number.EPSILON ) {

                var s = 1 - t;
                this._w = s * w + t * this._w;
                this._x = s * x + t * this._x;
                this._y = s * y + t * this._y;
                this._z = s * z + t * this._z;

                return this.normalize();

            }

            var sinHalfTheta = Math.sqrt( sqrSinHalfTheta );
            var halfTheta = Math.atan2( sinHalfTheta, cosHalfTheta );
            var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
                ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

            this._w = ( w * ratioA + this._w * ratioB );
            this._x = ( x * ratioA + this._x * ratioB );
            this._y = ( y * ratioA + this._y * ratioB );
            this._z = ( z * ratioA + this._z * ratioB );

            this.onChangeCallback();

            return this;

        },

        equals: function ( quaternion ) {

            return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );

        },

        fromArray: function ( array, offset ) {

            if ( offset === undefined ) offset = 0;

            this._x = array[ offset ];
            this._y = array[ offset + 1 ];
            this._z = array[ offset + 2 ];
            this._w = array[ offset + 3 ];

            this.onChangeCallback();

            return this;

        },

        toArray: function ( array, offset ) {

            if ( array === undefined ) array = [];
            if ( offset === undefined ) offset = 0;

            array[ offset ] = this._x;
            array[ offset + 1 ] = this._y;
            array[ offset + 2 ] = this._z;
            array[ offset + 3 ] = this._w;

            return array;

        },

        onChange: function ( callback ) {

            this.onChangeCallback = callback;

            return this;

        },

        onChangeCallback: function () {}
    });

    /**
     * 图层
     * @constructor
     */
    PGL.Layers = function () {
        this.mask = 1 | 0;
    };
    Object.assign( PGL.Layers.prototype, {

        /**
         * 设置图层数
         * @param channel
         */
        set: function ( channel ) {
            this.mask = 1 << channel | 0;
        },

        enable: function ( channel ) {

            this.mask |= 1 << channel | 0;

        },

        toggle: function ( channel ) {

            this.mask ^= 1 << channel | 0;

        },

        disable: function ( channel ) {

            this.mask &= ~ ( 1 << channel | 0 );

        },

        /**
         * 测试当前mask和layers.mask相与是否不等于0
         * @param layers
         * @returns {boolean}
         */
        test: function ( layers ) {
            return ( this.mask & layers.mask ) !== 0;
        }

    } );

    /**
     *
     * @param min
     * @param max
     * @constructor
     */
    PGL.Box3 = function (min, max) {
        this.min = (min !== undefined) ? min : new PGL.Vector3(+Infinity, +Infinity, +Infinity);
        this.max = (max !== undefined) ? max : new PGL.Vector3(-Infinity, -Infinity, -Infinity);
    };
    Object.assign(PGL.Box3.prototype, {

        isBox3: true,

        set: function (min, max) {

            this.min.copy(min);
            this.max.copy(max);

            return this;

        },

        /**
         * 设置值
         * @param array 一维数组
         * @return {setFromArray}
         */
        setFromArray: function (array) {

            var minX = +Infinity;
            var minY = +Infinity;
            var minZ = +Infinity;

            var maxX = -Infinity;
            var maxY = -Infinity;
            var maxZ = -Infinity;

            for (var i = 0, l = array.length; i < l; i += 3) {

                var x = array[i];
                var y = array[i + 1];
                var z = array[i + 2];

                if (x < minX) minX = x;
                if (y < minY) minY = y;
                if (z < minZ) minZ = z;

                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
                if (z > maxZ) maxZ = z;

            }

            this.min.set(minX, minY, minZ);
            this.max.set(maxX, maxY, maxZ);

            return this;

        },

        /**
         * 获取包围盒子的最大最小值
         * @param attribute
         * @return {setFromBufferAttribute}
         */
        setFromBufferAttribute: function (attribute) {

            var minX = +Infinity;
            var minY = +Infinity;
            var minZ = +Infinity;

            var maxX = -Infinity;
            var maxY = -Infinity;
            var maxZ = -Infinity;

            for (var i = 0, l = attribute.count; i < l; i++) {

                var x = attribute.getX(i);
                var y = attribute.getY(i);
                var z = attribute.getZ(i);

                if (x < minX) minX = x;
                if (y < minY) minY = y;
                if (z < minZ) minZ = z;

                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
                if (z > maxZ) maxZ = z;

            }

            this.min.set(minX, minY, minZ);
            this.max.set(maxX, maxY, maxZ);

            return this;

        },

        setFromPoints: function (points) {

            this.makeEmpty();

            for (var i = 0, il = points.length; i < il; i++) {

                this.expandByPoint(points[i]);

            }

            return this;

        },

        setFromCenterAndSize: function () {

            var v1 = new Vector3();

            return function setFromCenterAndSize(center, size) {

                var halfSize = v1.copy(size).multiplyScalar(0.5);

                this.min.copy(center).sub(halfSize);
                this.max.copy(center).add(halfSize);

                return this;

            };

        }(),

        /**
         * 设置值
         * @param object
         * @return {*}
         */
        setFromObject: function (object) {

            this.makeEmpty();

            return this.expandByObject(object);

        },

        clone: function () {

            return new this.constructor().copy(this);

        },

        copy: function (box) {

            this.min.copy(box.min);
            this.max.copy(box.max);

            return this;

        },

        makeEmpty: function () {

            this.min.x = this.min.y = this.min.z = +Infinity;
            this.max.x = this.max.y = this.max.z = -Infinity;

            return this;

        },

        isEmpty: function () {

            // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

            return (this.max.x < this.min.x) || (this.max.y < this.min.y) || (this.max.z < this.min.z);

        },

        /**
         * 获取包围盒子的中心点
         * @param target
         * @return {*}
         */
        getCenter: function (target) {

            if (target === undefined) {

                console.warn('THREE.Box3: .getCenter() target is now required');
                target = new Vector3();

            }

            return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);

        },

        getSize: function (target) {

            if (target === undefined) {

                console.warn('THREE.Box3: .getSize() target is now required');
                target = new Vector3();

            }

            return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);

        },

        expandByPoint: function (point) {

            this.min.min(point);
            this.max.max(point);

            return this;

        },

        expandByVector: function (vector) {

            this.min.sub(vector);
            this.max.add(vector);

            return this;

        },

        expandByScalar: function (scalar) {

            this.min.addScalar(-scalar);
            this.max.addScalar(scalar);

            return this;

        },

        expandByObject: function () {

            // 计算对象（包括其子对象）的世界轴对齐边界框，
            // 考虑对象和子对象得世界变换

            var scope, i, l;

            var v1 = new Vector3();

            function traverse(node) {

                var geometry = node.geometry;

                if (geometry !== undefined) {

                    if (geometry.isGeometry) {

                        var vertices = geometry.vertices;

                        for (i = 0, l = vertices.length; i < l; i++) {

                            v1.copy(vertices[i]);
                            v1.applyMatrix4(node.matrixWorld);

                            scope.expandByPoint(v1);

                        }

                    }
                    else if (geometry.isBufferGeometry) {

                        var attribute = geometry.attributes.position;

                        if (attribute !== undefined) {

                            for (i = 0, l = attribute.count; i < l; i++) {

                                v1.fromBufferAttribute(attribute, i).applyMatrix4(node.matrixWorld);

                                scope.expandByPoint(v1);

                            }

                        }

                    }

                }

            }

            return function expandByObject(object) {

                scope = this;

                object.updateMatrixWorld(true);

                object.traverse(traverse);

                return this;

            };

        }(),

        containsPoint: function (point) {

            return point.x < this.min.x || point.x > this.max.x ||
            point.y < this.min.y || point.y > this.max.y ||
            point.z < this.min.z || point.z > this.max.z ? false : true;

        },

        containsBox: function (box) {

            return this.min.x <= box.min.x && box.max.x <= this.max.x &&
                this.min.y <= box.min.y && box.max.y <= this.max.y &&
                this.min.z <= box.min.z && box.max.z <= this.max.z;

        },

        getParameter: function (point, target) {

            // This can potentially have a divide by zero if the box
            // has a size dimension of 0.

            if (target === undefined) {

                console.warn('THREE.Box3: .getParameter() target is now required');
                target = new Vector3();

            }

            return target.set(
                (point.x - this.min.x) / (this.max.x - this.min.x),
                (point.y - this.min.y) / (this.max.y - this.min.y),
                (point.z - this.min.z) / (this.max.z - this.min.z)
            );

        },

        intersectsBox: function (box) {

            // using 6 splitting planes to rule out intersections.
            return box.max.x < this.min.x || box.min.x > this.max.x ||
            box.max.y < this.min.y || box.min.y > this.max.y ||
            box.max.z < this.min.z || box.min.z > this.max.z ? false : true;

        },

        intersectsSphere: (function () {

            var closestPoint = new Vector3();

            return function intersectsSphere(sphere) {

                // Find the point on the AABB closest to the sphere center.
                this.clampPoint(sphere.center, closestPoint);

                // If that point is inside the sphere, the AABB and sphere intersect.
                return closestPoint.distanceToSquared(sphere.center) <= (sphere.radius * sphere.radius);

            };

        })(),

        intersectsPlane: function (plane) {

            // We compute the minimum and maximum dot product values. If those values
            // are on the same side (back or front) of the plane, then there is no intersection.

            var min, max;

            if (plane.normal.x > 0) {

                min = plane.normal.x * this.min.x;
                max = plane.normal.x * this.max.x;

            } else {

                min = plane.normal.x * this.max.x;
                max = plane.normal.x * this.min.x;

            }

            if (plane.normal.y > 0) {

                min += plane.normal.y * this.min.y;
                max += plane.normal.y * this.max.y;

            } else {

                min += plane.normal.y * this.max.y;
                max += plane.normal.y * this.min.y;

            }

            if (plane.normal.z > 0) {

                min += plane.normal.z * this.min.z;
                max += plane.normal.z * this.max.z;

            } else {

                min += plane.normal.z * this.max.z;
                max += plane.normal.z * this.min.z;

            }

            return (min <= -plane.constant && max >= -plane.constant);

        },

        intersectsTriangle: (function () {

            // triangle centered vertices
            var v0 = new Vector3();
            var v1 = new Vector3();
            var v2 = new Vector3();

            // triangle edge vectors
            var f0 = new Vector3();
            var f1 = new Vector3();
            var f2 = new Vector3();

            var testAxis = new Vector3();

            var center = new Vector3();
            var extents = new Vector3();

            var triangleNormal = new Vector3();

            function satForAxes(axes) {

                var i, j;

                for (i = 0, j = axes.length - 3; i <= j; i += 3) {

                    testAxis.fromArray(axes, i);
                    // project the aabb onto the seperating axis
                    var r = extents.x * Math.abs(testAxis.x) + extents.y * Math.abs(testAxis.y) + extents.z * Math.abs(testAxis.z);
                    // project all 3 vertices of the triangle onto the seperating axis
                    var p0 = v0.dot(testAxis);
                    var p1 = v1.dot(testAxis);
                    var p2 = v2.dot(testAxis);
                    // actual test, basically see if either of the most extreme of the triangle points intersects r
                    if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {

                        // points of the projected triangle are outside the projected half-length of the aabb
                        // the axis is seperating and we can exit
                        return false;

                    }

                }

                return true;

            }

            return function intersectsTriangle(triangle) {

                if (this.isEmpty()) {

                    return false;

                }

                // compute box center and extents
                this.getCenter(center);
                extents.subVectors(this.max, center);

                // translate triangle to aabb origin
                v0.subVectors(triangle.a, center);
                v1.subVectors(triangle.b, center);
                v2.subVectors(triangle.c, center);

                // compute edge vectors for triangle
                f0.subVectors(v1, v0);
                f1.subVectors(v2, v1);
                f2.subVectors(v0, v2);

                // test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
                // make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
                // axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
                var axes = [
                    0, -f0.z, f0.y, 0, -f1.z, f1.y, 0, -f2.z, f2.y,
                    f0.z, 0, -f0.x, f1.z, 0, -f1.x, f2.z, 0, -f2.x,
                    -f0.y, f0.x, 0, -f1.y, f1.x, 0, -f2.y, f2.x, 0
                ];
                if (!satForAxes(axes)) {

                    return false;

                }

                // test 3 face normals from the aabb
                axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];
                if (!satForAxes(axes)) {

                    return false;

                }

                // finally testing the face normal of the triangle
                // use already existing triangle edge vectors here
                triangleNormal.crossVectors(f0, f1);
                axes = [triangleNormal.x, triangleNormal.y, triangleNormal.z];
                return satForAxes(axes);

            };

        })(),

        clampPoint: function (point, target) {

            if (target === undefined) {

                console.warn('THREE.Box3: .clampPoint() target is now required');
                target = new Vector3();

            }

            return target.copy(point).clamp(this.min, this.max);

        },

        distanceToPoint: function () {

            var v1 = new Vector3();

            return function distanceToPoint(point) {

                var clampedPoint = v1.copy(point).clamp(this.min, this.max);
                return clampedPoint.sub(point).length();

            };

        }(),

        getBoundingSphere: function () {

            var v1 = new Vector3();

            return function getBoundingSphere(target) {

                if (target === undefined) {

                    console.warn('THREE.Box3: .getBoundingSphere() target is now required');
                    target = new Sphere();

                }

                this.getCenter(target.center);

                target.radius = this.getSize(v1).length() * 0.5;

                return target;

            };

        }(),

        intersect: function (box) {

            this.min.max(box.min);
            this.max.min(box.max);

            // ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
            if (this.isEmpty()) this.makeEmpty();

            return this;

        },

        union: function (box) {

            this.min.min(box.min);
            this.max.max(box.max);

            return this;

        },

        applyMatrix4: function () {

            var points = [
                new Vector3(),
                new Vector3(),
                new Vector3(),
                new Vector3(),
                new Vector3(),
                new Vector3(),
                new Vector3(),
                new Vector3()
            ];

            return function applyMatrix4(matrix) {

                // transform of empty box is an empty box.
                if (this.isEmpty()) return this;

                // NOTE: I am using a binary pattern to specify all 2^3 combinations below
                points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix); // 000
                points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix); // 001
                points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix); // 010
                points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix); // 011
                points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix); // 100
                points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix); // 101
                points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix); // 110
                points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix); // 111

                this.setFromPoints(points);

                return this;

            };

        }(),

        translate: function (offset) {

            this.min.add(offset);
            this.max.add(offset);

            return this;

        },

        equals: function (box) {

            return box.min.equals(this.min) && box.max.equals(this.max);

        }

    });

    /**
     * 包围球
     * @param center
     * @param radius
     * @constructor
     */
    PGL.Sphere =  function (center, radius) {
        this.center = (center !== undefined) ? center : new PGL.Vector3();
        this.radius = (radius !== undefined) ? radius : 0;
    };
    Object.assign(PGL.Sphere.prototype, {

        set: function (center, radius) {

            this.center.copy(center);
            this.radius = radius;

            return this;

        },

        /**
         * 设置圆心和半径
         */
        setFromPoints: function () {

            var box = new PGL.Box3();

            return function setFromPoints(points, optionalCenter) {

                var center = this.center;

                if (optionalCenter !== undefined) {

                    center.copy(optionalCenter);

                } else {

                    box.setFromPoints(points).getCenter(center);

                }

                var maxRadiusSq = 0;

                for (var i = 0, il = points.length; i < il; i++) {

                    maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));

                }

                this.radius = Math.sqrt(maxRadiusSq);

                return this;

            };

        }(),

        clone: function () {

            return new this.constructor().copy(this);

        },

        copy: function (sphere) {

            this.center.copy(sphere.center);
            this.radius = sphere.radius;

            return this;

        },

        empty: function () {

            return (this.radius <= 0);

        },

        containsPoint: function (point) {

            return (point.distanceToSquared(this.center) <= (this.radius * this.radius));

        },

        distanceToPoint: function (point) {

            return (point.distanceTo(this.center) - this.radius);

        },

        intersectsSphere: function (sphere) {

            var radiusSum = this.radius + sphere.radius;

            return sphere.center.distanceToSquared(this.center) <= (radiusSum * radiusSum);

        },

        intersectsBox: function (box) {

            return box.intersectsSphere(this);

        },

        intersectsPlane: function (plane) {

            return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;

        },

        clampPoint: function (point, target) {

            var deltaLengthSq = this.center.distanceToSquared(point);

            if (target === undefined) {

                console.warn('THREE.Sphere: .clampPoint() target is now required');
                target = new Vector3();

            }

            target.copy(point);

            if (deltaLengthSq > (this.radius * this.radius)) {

                target.sub(this.center).normalize();
                target.multiplyScalar(this.radius).add(this.center);

            }

            return target;

        },

        getBoundingBox: function (target) {

            if (target === undefined) {

                console.warn('THREE.Sphere: .getBoundingBox() target is now required');
                target = new Box3();

            }

            target.set(this.center, this.center);
            target.expandByScalar(this.radius);

            return target;

        },

        applyMatrix4: function (matrix) {

            this.center.applyMatrix4(matrix);
            this.radius = this.radius * matrix.getMaxScaleOnAxis();

            return this;

        },

        translate: function (offset) {

            this.center.add(offset);

            return this;

        },

        equals: function (sphere) {

            return sphere.center.equals(this.center) && (sphere.radius === this.radius);

        }

    });

    /**
     *
     * @param normal
     * @param constant
     * @constructor
     */
    PGL.Plane = function (normal, constant) {
        // normal is assumed to be normalized
        this.normal = (normal !== undefined) ? normal : new PGL.Vector3(1, 0, 0);
        this.constant = (constant !== undefined) ? constant : 0;
    };
    Object.assign(PGL.Plane.prototype, {

        set: function (normal, constant) {

            this.normal.copy(normal);
            this.constant = constant;

            return this;

        },

        /**
         * 设置定义平面的各个组件。
         * @param x
         * @param y
         * @param z
         * @param w
         * @return {setComponents}
         */
        setComponents: function (x, y, z, w) {
            this.normal.set(x, y, z);
            this.constant = w;

            return this;
        },

        setFromNormalAndCoplanarPoint: function (normal, point) {

            this.normal.copy(normal);
            this.constant = -point.dot(this.normal);

            return this;

        },

        setFromCoplanarPoints: function () {

            var v1 = new Vector3();
            var v2 = new Vector3();

            return function setFromCoplanarPoints(a, b, c) {

                var normal = v1.subVectors(c, b).cross(v2.subVectors(a, b)).normalize();

                // Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

                this.setFromNormalAndCoplanarPoint(normal, a);

                return this;

            };

        }(),

        clone: function () {

            return new this.constructor().copy(this);

        },

        copy: function (plane) {

            this.normal.copy(plane.normal);
            this.constant = plane.constant;

            return this;

        },

        normalize: function () {

            // Note: will lead to a divide by zero if the plane is invalid.

            var inverseNormalLength = 1.0 / this.normal.length();
            this.normal.multiplyScalar(inverseNormalLength);
            this.constant *= inverseNormalLength;

            return this;

        },

        negate: function () {

            this.constant *= -1;
            this.normal.negate();

            return this;

        },

        distanceToPoint: function (point) {

            return this.normal.dot(point) + this.constant;

        },

        distanceToSphere: function (sphere) {

            return this.distanceToPoint(sphere.center) - sphere.radius;

        },

        projectPoint: function (point, target) {

            if (target === undefined) {

                console.warn('THREE.Plane: .projectPoint() target is now required');
                target = new Vector3();

            }

            return target.copy(this.normal).multiplyScalar(-this.distanceToPoint(point)).add(point);

        },

        intersectLine: function () {

            var v1 = new Vector3();

            return function intersectLine(line, target) {

                if (target === undefined) {

                    console.warn('THREE.Plane: .intersectLine() target is now required');
                    target = new Vector3();

                }

                var direction = line.delta(v1);

                var denominator = this.normal.dot(direction);

                if (denominator === 0) {

                    // line is coplanar, return origin
                    if (this.distanceToPoint(line.start) === 0) {

                        return target.copy(line.start);

                    }

                    // Unsure if this is the correct method to handle this case.
                    return undefined;

                }

                var t = -(line.start.dot(this.normal) + this.constant) / denominator;

                if (t < 0 || t > 1) {

                    return undefined;

                }

                return target.copy(direction).multiplyScalar(t).add(line.start);

            };

        }(),

        intersectsLine: function (line) {

            // Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

            var startSign = this.distanceToPoint(line.start);
            var endSign = this.distanceToPoint(line.end);

            return (startSign < 0 && endSign > 0) || (endSign < 0 && startSign > 0);

        },

        intersectsBox: function (box) {

            return box.intersectsPlane(this);

        },

        intersectsSphere: function (sphere) {

            return sphere.intersectsPlane(this);

        },

        coplanarPoint: function (target) {

            if (target === undefined) {

                console.warn('THREE.Plane: .coplanarPoint() target is now required');
                target = new Vector3();

            }

            return target.copy(this.normal).multiplyScalar(-this.constant);

        },

        applyMatrix4: function () {

            var v1 = new PGL.Vector3();
            var m1 = new PGL.Matrix3();

            return function applyMatrix4(matrix, optionalNormalMatrix) {

                var normalMatrix = optionalNormalMatrix || m1.getNormalMatrix(matrix);

                var referencePoint = this.coplanarPoint(v1).applyMatrix4(matrix);

                var normal = this.normal.applyMatrix3(normalMatrix).normalize();

                this.constant = -referencePoint.dot(normal);

                return this;

            };

        }(),

        translate: function (offset) {

            this.constant -= offset.dot(this.normal);

            return this;

        },

        equals: function (plane) {

            return plane.normal.equals(this.normal) && (plane.constant === this.constant);

        }

    });
})(PGL);