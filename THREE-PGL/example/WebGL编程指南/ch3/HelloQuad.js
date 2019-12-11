window.onload = function (ev) {
	// 获取<canvas>元素
	var canvas = document.getElementById('webgl');

	var webGlRenderer = new Math.WebGLRenderer({
		canvas: canvas
	});
	webGlRenderer.setClearColor(new Math.Color(0, 0, 0), 1);

	var scene = new Math.Scene();

	var bufferGeometry = new Math.BufferGeometry();

	var positions = new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5]);
	bufferGeometry.addAttribute('position', new Math.Float32BufferAttribute(positions, 2));

	var meshPhongMaterial = new Math.MeshPhongMaterial({
		color: new Math.Color(1, 0, 0)
	});

	var mesh = new Math.Mesh(bufferGeometry, meshPhongMaterial);
	mesh.drawMode = Math.TriangleStripDrawMode;
	scene.add(mesh);

	webGlRenderer.render(scene);
};