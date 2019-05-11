window.onload = function (ev) {
	// 获取<canvas>元素
	var canvas = document.getElementById('webgl');

	var webGlRenderer = new PGL.WebGLRenderer({
		canvas: canvas
	});
	var scene = new PGL.Scene();
	webGlRenderer.setClearColor(new PGL.Color(1, 1, 0.5), 1);
	webGlRenderer.render(scene);
};
