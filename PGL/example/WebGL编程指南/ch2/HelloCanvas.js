window.onload = function (ev) {
	// 获取<canvas>元素
	var canvas = document.getElementById('webgl');

	var webGlRenderer = new Math.WebGLRenderer({
		canvas: canvas
	});
	var scene = new Math.Scene();
	webGlRenderer.setClearColor(new Math.Color(1, 1, 0.5), 1);
	webGlRenderer.render(scene);
};
