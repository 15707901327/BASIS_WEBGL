// Helper to pick the right setter for the singular case
/**
 * 得到数据的传输类型
 * @param type
 * @return {*}
 */
function getSingularSetter(type) {

	switch (type) {

		case 0x1406:
			return setValue1f; // FLOAT
		case 0x8b50:
			return setValue2fv; // _VEC2
		case 0x8b51:
			return setValue3fv; // _VEC3
		case 0x8b52:
			return setValue4fv; // _VEC4

		case 0x8b5a:
			return setValue2fm; // _MAT2
		case 0x8b5b:
			return setValue3fm; // _MAT3
		case 0x8b5c:
			return setValue4fm; // _MAT4

		case 0x8b5e:
		case 0x8d66:
			return setValueT1; // SAMPLER_2D, SAMPLER_EXTERNAL_OES
		case 0x8B5F:
			return setValueT3D1; // SAMPLER_3D
		case 0x8b60:
			return setValueT6; // SAMPLER_CUBE

		case 0x1404:
		case 0x8b56:
			return setValue1i; // INT, BOOL
		case 0x8b53:
		case 0x8b57:
			return setValue2iv; // _VEC2
		case 0x8b54:
		case 0x8b58:
			return setValue3iv; // _VEC3
		case 0x8b55:
		case 0x8b59:
			return setValue4iv; // _VEC4

	}

}

function setValue1f(gl, v) {

	var cache = this.cache;

	if (cache[0] === v) return;

	gl.uniform1f(this.addr, v);

	cache[0] = v;

}

// Array of scalars

function setValue1fv(gl, v) {

	var cache = this.cache;

	if (arraysEqual(cache, v)) return;

	gl.uniform1fv(this.addr, v);

	copyArray(cache, v);

}

function setValue1iv(gl, v) {

	var cache = this.cache;

	if (arraysEqual(cache, v)) return;

	gl.uniform1iv(this.addr, v);

	copyArray(cache, v);

}

// Array of vectors (flat or from THREE classes)

function setValueV2a(gl, v) {

	var cache = this.cache;
	var data = flatten(v, this.size, 2);

	if (arraysEqual(cache, data)) return;

	gl.uniform2fv(this.addr, data);

	this.updateCache(data);

}

function setValueV3a(gl, v) {

	var cache = this.cache;
	var data = flatten(v, this.size, 3);

	if (arraysEqual(cache, data)) return;

	gl.uniform3fv(this.addr, data);

	this.updateCache(data);

}

function setValueV4a(gl, v) {

	var cache = this.cache;
	var data = flatten(v, this.size, 4);

	if (arraysEqual(cache, data)) return;

	gl.uniform4fv(this.addr, data);

	this.updateCache(data);

}

// Array of matrices (flat or from THREE clases)

function setValueM2a(gl, v) {

	var cache = this.cache;
	var data = flatten(v, this.size, 4);

	if (arraysEqual(cache, data)) return;

	gl.uniformMatrix2fv(this.addr, false, data);

	this.updateCache(data);

}

function setValueM3a(gl, v) {

	var cache = this.cache;
	var data = flatten(v, this.size, 9);

	if (arraysEqual(cache, data)) return;

	gl.uniformMatrix3fv(this.addr, false, data);

	this.updateCache(data);

}

function setValueM4a(gl, v) {

	var cache = this.cache;
	var data = flatten(v, this.size, 16);

	if (arraysEqual(cache, data)) return;

	gl.uniformMatrix4fv(this.addr, false, data);

	this.updateCache(data);

}

// Array of textures (2D / Cube)

function setValueT1a(gl, v, renderer) {

	var cache = this.cache;
	var n = v.length;

	var units = allocTexUnits(renderer, n);

	if (arraysEqual(cache, units) === false) {

		gl.uniform1iv(this.addr, units);
		copyArray(cache, units);

	}

	for (var i = 0; i !== n; ++i) {

		renderer.setTexture2D(v[i] || emptyTexture, units[i]);

	}

}

function setValueT6a(gl, v, renderer) {

	var cache = this.cache;
	var n = v.length;

	var units = allocTexUnits(renderer, n);

	if (arraysEqual(cache, units) === false) {

		gl.uniform1iv(this.addr, units);
		copyArray(cache, units);

	}

	for (var i = 0; i !== n; ++i) {

		renderer.setTextureCube(v[i] || emptyCubeTexture, units[i]);

	}

}

function SingleUniform(id, activeInfo, addr) {

	this.id = id;
	this.addr = addr;
	this.cache = [];
	this.setValue = getSingularSetter(activeInfo.type);

	// this.path = activeInfo.name; // DEBUG

}

/**
 *
 * @param id
 * @param activeInfo
 * @param addr
 * @constructor
 */
function PureArrayUniform(id, activeInfo, addr) {

	this.id = id;
	this.addr = addr;
	this.cache = [];
	this.size = activeInfo.size;
	this.setValue = getPureArraySetter(activeInfo.type);

	// this.path = activeInfo.name; // DEBUG

}

var RePathPart = /([\w\d_]+)(\])?(\[|\.)?/g;

function addUniform(container, uniformObject) {

	container.seq.push(uniformObject);
	container.map[uniformObject.id] = uniformObject;

}

/**
 *
 * @param activeInfo{WebGLActiveInfo}
 * @param addr 属性地址
 * @param container{WebGLUniforms}
 */
function parseUniform(activeInfo, addr, container) {

	var path = activeInfo.name,
		pathLength = path.length;

	// reset RegExp object, because of the early exit of a previous run
	RePathPart.lastIndex = 0;

	while (true) {

		/**
		 * exec() 方法用于检索字符串中的正则表达式的匹配。
		 * 返回一个数组：
		 *  0：正则表达式匹配的文本
		 *  1：RegExpObject 的第 1 个子表达式相匹配的文本
		 *  2：RegExpObject 的第 2 个子表达式相匹配的文本（如果有的话）
		 *  index： 属性声明的是匹配文本的第一个字符的位置
		 *  input：属性则存放的是被检索的字符串 string
		 *  但是，当 RegExpObject 是一个全局正则表达式时，它会在 RegExpObject 的 lastIndex 属性指定的字符处开始检索字符串 string。
		 *  当 exec() 找到了与表达式相匹配的文本时，在匹配后，它将把 RegExpObject 的 lastIndex 属性设置为匹配文本的最后一个字符的下一个位置。
		 *  这就是说，您可以通过反复调用 exec() 方法来遍历字符串中的所有匹配文本。当 exec() 再也找不到匹配的文本时，它将返回 null，并把 lastIndex 属性重置为 0。
		 */
		var match = RePathPart.exec(path),
			matchEnd = RePathPart.lastIndex,

			id = match[1],
			idIsIndex = match[2] === ']',
			subscript = match[3];

		if (idIsIndex) id = id | 0; // convert to integer

		if (subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength) {

			// bare name or "pure" bottom-level array "[0]" suffix

			addUniform(container, subscript === undefined ?
				new SingleUniform(id, activeInfo, addr) :
				new PureArrayUniform(id, activeInfo, addr));

			break;

		} else {

			// step into inner node / create it in case it doesn't exist

			var map = container.map, next = map[id];

			if (next === undefined) {

				next = new StructuredUniform(id);
				addUniform(container, next);

			}

			container = next;

		}

	}

}

function UniformContainer() {
	this.seq = [];
	this.map = {};
}

/**
 * 管理Uniform及地址
 * @param gl
 * @param program
 * @param renderer
 * @constructor
 */
PGL.WebGLUniforms = function (gl, program, renderer) {

	UniformContainer.call(this);
	this.renderer = renderer;

	// 获取变量Uniform的数量
	var n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

	for (var i = 0; i < n; ++i) {

		var info = gl.getActiveUniform(program, i),
			addr = gl.getUniformLocation(program, info.name);

		parseUniform(info, addr, this);

	}
};

/**
 * 将uniforms变量传送给着色器
 * @param gl 上下文
 * @param seq uniformsList
 * @param values{Object}
 * @param renderer
 */
PGL.WebGLUniforms.upload = function ( gl, seq, values, renderer ) {
	for ( var i = 0, n = seq.length; i !== n; ++ i ) {
		var u = seq[ i ],
			v = values[ u.id ];
		if ( v.needsUpdate !== false ) {
			// note: always updating when .needsUpdate is undefined
			u.setValue( gl, v.value, renderer );
		}
	}
};

/**
 * 比较同时存在的属性，添加到数组
 * @param seq
 * @param values
 * @return {Array}
 */
PGL.WebGLUniforms.seqWithValue = function (seq, values) {
	var r = [];
	for ( var i = 0, n = seq.length; i !== n; ++ i ) {
		var u = seq[ i ];
		if ( u.id in values ) r.push( u );
	}
	return r;
};