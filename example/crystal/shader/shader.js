export var VERTEX_SHADER = `
 	attribute vec4 a_Position;
 	void main(){
 	  gl_Position = a_Position;
 	  gl_PointSize = 10.0;
 	}
`;
export var FRAGMENT_SHADER = `
	void main(){
	  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
	}
`;
