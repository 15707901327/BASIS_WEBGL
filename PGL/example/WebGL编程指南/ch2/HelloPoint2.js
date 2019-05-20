window.onload = function (ev) {
	// 获取<canvas>元素
	var canvas = document.getElementById('webgl');

	var webGlRenderer = new Math.WebGLRenderer({
		canvas: canvas
	});
	webGlRenderer.setClearColor(new Math.Color(0.5, 1, 1), 1);

	var scene = new Math.Scene();

	var geometry = new Math.BufferGeometry();
	var vertices = [0.8, 0.3, 0];
	geometry.addAttribute('position', new Math.Float32BufferAttribute(vertices, 3));

	var pointsMaterial = new Math.PointsMaterial({
		size: 20
	});

	var particles = new Math.Points(geometry, pointsMaterial);
	scene.add(particles);

	webGlRenderer.render(scene);
};