var VERTEX_SHADER =
	'uniform mat4 x_matrix;\n' +
	'attribute vec4 a_Position;\n' +
	'void main(){\n' +
	' gl_Position = x_matrix * a_Position;\n' +
	' gl_PointSize = 10.0;\n' +
	'}';
var FRAGMENT_SHADER =
	'void main(){\n' +
	' gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n' +
	'}';

var ANGLE = 90.0;
var Tx = Ty = Tz = 0.5;
var Sx = Sy = Sz = 1.5;

function main() {
	var canvas = document.getElementById("webgl");
	var gl = canvas.getContext("webgl");

	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, VERTEX_SHADER);
	gl.compileShader(vertexShader);

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, FRAGMENT_SHADER);
	gl.compileShader(fragmentShader);

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	gl.useProgram(program);

	var vertex = new Float32Array([0.5, 0.0, 0.0, -0.5, -0.5, 0.0]);
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertex, gl.STATIC_DRAW);
	var a_Position = gl.getAttribLocation(program, "a_Position");
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(a_Position);

	var radian = Math.PI * ANGLE / 180.0;
	var cosB = Math.cos(radian);
	var sinB = Math.sin(radian);

	// 旋转矩阵
	// var xformMatrix = new Float32Array([
	// 	cosB, sinB, 0, 0,
	// 	-sinB, cosB, 0, 0,
	// 	0, 0, 1.0, 0,
	// 	0, 0, 0, 1.0
	// ]);

	// 平移矩阵
	// var xformMatrix = new Float32Array([
	// 	1.0, 0.0, 0, 0,
	// 	0.0, 1.0, 0, 0,
	// 	0, 0, 1.0, 0,
	// 	Tx, Ty, Tz, 1.0
	// ]);

	var xformMatrix = new Float32Array([
		Sx, 0.0, 0, 0,
		0.0, Sy, 0, 0,
		0, 0, Sz, 0,
		0, 0, 0, 1.0
	]);

	var matrix = gl.getUniformLocation(program, "x_matrix");
	gl.uniformMatrix4fv(matrix, false, xformMatrix);

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.drawArrays(gl.TRIANGLES, 0, 3);
}