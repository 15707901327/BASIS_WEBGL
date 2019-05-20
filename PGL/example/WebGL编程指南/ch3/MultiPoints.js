window.onload = function (ev) {
	// 获取<canvas>元素
	var canvas = document.getElementById('webgl');

	var webGlRenderer = new Math.WebGLRenderer({
		canvas: canvas
	});
	webGlRenderer.setClearColor(new Math.Color(0, 0, 0), 1);

	var scene = new Math.Scene();

	var geometry = new Math.BufferGeometry();
	var vertices = [0.0, 0.5, -0.5, -0.5, 0.5, -0.5];
	geometry.addAttribute('position', new Math.Float32BufferAttribute(vertices, 2));

	var pointsMaterial = new Math.PointsMaterial({
		size: 20,
		color: new Math.Color(1, 0, 0)
	});

	var particles = new Math.Points(geometry, pointsMaterial);
	scene.add(particles);

	webGlRenderer.render(scene);
};