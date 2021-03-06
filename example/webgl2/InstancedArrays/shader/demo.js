var VERTEX_SHADER = `
precision mediump float;
precision mediump int;

attribute vec4 a_Position;
attribute vec4 a_Color;
attribute vec4 a_Offset;

varying vec4 v_Color;

void main(){
  v_Color = a_Color;
  gl_Position = a_Position + a_Offset;
}
`;

var FRAGMENT_SHADER = `
precision mediump float;
precision mediump int;
varying vec4 v_Color;

void main(){
  gl_FragColor = v_Color;
}
`;

export {VERTEX_SHADER, FRAGMENT_SHADER};