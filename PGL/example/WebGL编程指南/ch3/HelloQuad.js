window.onload = function (ev) {
	// 获取<canvas>元素
	var canvas = document.getElementById('webgl');

	var webGlRenderer = new PGL.WebGLRenderer({
		canvas: canvas
	});
	webGlRenderer.setClearColor(new PGL.Color(0, 0, 0), 1);
	var gl = webGlRenderer.getContext();

	var scene = new PGL.Scene();

	var bufferGeometry = new PGL.BufferGeometry();

	var positions = new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5]);
	bufferGeometry.addAttribute('position', new PGL.Float32BufferAttribute(positions, 2));

	var meshPhongMaterial = new PGL.MeshPhongMaterial({
		color: new PGL.Color(1, 0, 0)
	});

	var mesh = new PGL.Mesh(bufferGeometry, meshPhongMaterial);
	mesh.drawMode = PGL.TriangleStripDrawMode;
	scene.add(mesh);

	webGlRenderer.render(scene);
};