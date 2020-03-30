var VERTEX_SHADER = `
attribute vec4 a_Position;
void main(){
  gl_Position = a_Position;
}
`;

var FRAGMENT_SHADER = `
precision mediump float;
void main(){
  gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}
`;

export {VERTEX_SHADER, FRAGMENT_SHADER};