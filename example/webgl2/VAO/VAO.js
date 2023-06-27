// ClickedPints.js (c) 2012 matsuda
// 顶点着色器
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'attribute vec4 a_Color;\n' +
	'varying vec4 v_Color;\n' +
	'void main() {\n' +
	' gl_Position = a_Position;\n' +
	' gl_PointSize = 10.0;\n' +
	' v_Color = a_Color;\n' +
	'}\n';

// 片元着色器
var FSHADER_SOURCE =
	'#ifdef GL_ES\n' +
	'precision mediump float;\n' +
	'#endif\n' +
	'varying vec4 v_Color;\n' +
	'void main() {\n' +
	' gl_FragColor = v_Color;\n' +
	'}\n';

function main() {
	var canvas = document.getElementById('webgl');
	
	// Get the rendering context for WebGL
	// var gl = canvas.getContext('webgl');
	// var ext = gl.getExtension("OES_vertex_array_object");
	
	var gl = canvas.getContext('webgl2');
	
	let program = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
	gl.useProgram(program);
	
	
	// 第一个三角形
	var verticesColors = new Float32Array([
		-0.9, 0.9, 1.0, 0.0, 0.0,
		-0.9, -0.9, 0.0, 1.0, 0.0,
		-0.0, -0.9, 0.0, 0.0, 1.0
	]);
	var FSIZE = verticesColors.BYTES_PER_ELEMENT;
	
	// var triangleArray = ext.createVertexArrayOES();
	// ext.bindVertexArrayOES(triangleArray);
	
	var triangleArray = gl.createVertexArray();
	gl.bindVertexArray(triangleArray);
	
	// 设置顶点的位置
	var vertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
	
	var a_Position = gl.getAttribLocation(program, 'a_Position');
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
	gl.enableVertexAttribArray(a_Position);
	
	var a_Color = gl.getAttribLocation(program, 'a_Color');
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
	gl.enableVertexAttribArray(a_Color);
	// ext.bindVertexArrayOES(null);
	
	// 第二个三角形
	var verticesColors2 = new Float32Array([
		0.0, 0.0, 1.0, 0.0, 0.0,
		0.0, -0.9, 0.0, 1.0, 0.0,
		0.9, -0.9, 0.0, 0.0, 1.0
	]);
	var FSIZE2 = verticesColors2.BYTES_PER_ELEMENT;
	
	// var triangleArray2 = ext.createVertexArrayOES();
	// ext.bindVertexArrayOES(triangleArray2);
	
	var triangleArray2 = gl.createVertexArray();
	gl.bindVertexArray(triangleArray2);
	
	// 设置顶点的位置
	var vertexColorBuffer2 = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer2);
	gl.bufferData(gl.ARRAY_BUFFER, verticesColors2, gl.STATIC_DRAW);

	var a_Position2 = gl.getAttribLocation(program, 'a_Position');
	gl.vertexAttribPointer(a_Position2, 2, gl.FLOAT, false, FSIZE2 * 5, 0);
	gl.enableVertexAttribArray(a_Position2);

	var a_Color2 = gl.getAttribLocation(program, 'a_Color');
	gl.vertexAttribPointer(a_Color2, 3, gl.FLOAT, false, FSIZE2 * 5, FSIZE2 * 2);
	gl.enableVertexAttribArray(a_Color2);
	
	// Specify the color for clearing <canvas>
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	
	// Clear <canvas>
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	// 绘制第一个三角形
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
	gl.enableVertexAttribArray(a_Position);
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
	gl.enableVertexAttribArray(a_Color);
	
	// gl.bindVertexArray(triangleArray);
	
	gl.drawArrays(gl.TRIANGLES, 0, 3);
	
	// 绘制第二个三角形
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer2);
	gl.vertexAttribPointer(a_Position2, 2, gl.FLOAT, false, FSIZE2 * 5, 0);
	gl.enableVertexAttribArray(a_Position2);
	gl.vertexAttribPointer(a_Color2, 3, gl.FLOAT, false, FSIZE2 * 5, FSIZE2 * 2);
	gl.enableVertexAttribArray(a_Color2);
	
	// gl.bindVertexArray(triangleArray2);
	
	gl.drawArrays(gl.TRIANGLES, 0, 3);
}
