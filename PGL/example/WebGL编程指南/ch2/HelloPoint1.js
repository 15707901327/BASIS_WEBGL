window.onload = function (ev) {
	// 获取<canvas>元素
	var canvas = document.getElementById('webgl');

	var webGlRenderer = new PGL.WebGLRenderer({
		canvas: canvas
	});
	webGlRenderer.setClearColor(new PGL.Color(0.5, 1, 1), 1);

	var scene = new PGL.Scene();
	var geometry = new PGL.Geometry();
	var shaderMaterial = new PGL.ShaderMaterial(
		{
			vertexShader: document.getElementById('vertexShader').textContent,
			fragmentShader: document.getElementById('fragmentShader').textContent
		}
	);

	var mesh = new PGL.Mesh(geometry, shaderMaterial);
	scene.add(mesh);

	webGlRenderer.render(scene);
};