window.onload = function (ev) {
	// 获取<canvas>元素
	var canvas = document.getElementById('webgl');

	var webGlRenderer = new PGL.WebGLRenderer({
		canvas: canvas
	});
	webGlRenderer.setClearColor(new PGL.Color(0.5, 1, 1), 1);

	var scene = new PGL.Scene();

	var geometry = new PGL.BufferGeometry();
	var vertices = [0.0, 0.5, -0.5, -0.5, 0.5, -0.5];
	geometry.addAttribute('position', new PGL.Float32BufferAttribute(vertices, 3));

	var pointsMaterial = new PGL.PointsMaterial({
		size: 20
	});

	var particles = new PGL.Points(geometry, pointsMaterial);
	scene.add(particles);

	webGlRenderer.render(scene);
};