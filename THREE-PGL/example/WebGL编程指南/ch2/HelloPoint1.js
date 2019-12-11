window.onload = function (ev) {
	// 获取<canvas>元素
	var canvas = document.getElementById('webgl');

	var webGlRenderer = new Math.WebGLRenderer({
		canvas: canvas
	});
	webGlRenderer.setClearColor(new Math.Color(0.5, 1, 1), 1);

	var scene = new Math.Scene();
	var geometry = new Math.Geometry();
	var shaderMaterial = new Math.ShaderMaterial(
		{
			vertexShader: document.getElementById('vertexShader').textContent,
			fragmentShader: document.getElementById('fragmentShader').textContent
		}
	);

	var mesh = new Math.Mesh(geometry, shaderMaterial);
	scene.add(mesh);

	webGlRenderer.render(scene);
};