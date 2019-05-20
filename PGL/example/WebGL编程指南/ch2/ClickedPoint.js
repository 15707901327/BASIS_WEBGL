window.onload = function (ev) {
	// 获取<canvas>元素
	var canvas = document.getElementById('webgl');

	var webGlRenderer = new Math.WebGLRenderer({
		canvas: canvas
	});
	webGlRenderer.setClearColor(new Math.Color(0.5, 1, 1), 1);

	var scene = new Math.Scene();
	canvas.onmousedown = function (ev) {
		click(ev, canvas);
	};

	function click(ev, canvas) {

		var x = ev.clientX; // x coordinate of a mouse pointer
		var y = ev.clientY; // y coordinate of a mouse pointer
		var rect = ev.target.getBoundingClientRect();

		x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
		y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

		var vertices = [x, y, 1.0];

		var geometry = new Math.BufferGeometry();
		geometry.addAttribute('position', new Math.Float32BufferAttribute(vertices, 3));
		var pointsMaterial = new Math.PointsMaterial({
			size: 20
		});

		var particles = new Math.Points(geometry, pointsMaterial);
		scene.add(particles);
		webGlRenderer.render(scene);
	}
	webGlRenderer.render(scene);
};