var normalVS = `
 	attribute vec4 aPosition; // 顶点坐标
 	attribute vec4 aColor;  // 顶点颜色
 	attribute vec3 aBarycentric; // 重心坐标
 	attribute vec3 aNormal; // 法线
 	
 	varying vec3 vNormal;
 	varying vec3 vPosition;
 	varying vec4 vColor;
 	varying vec4 vPositionMVP;
 	varying vec3 vBarycentric;
 	
  uniform mat4 uMVPMatrix;
  
 	void main(){
 	  vPosition = vec3(aPosition);
 	  vNormal = aNormal;
 		vColor = aColor;
 		vBarycentric = aBarycentric;
 	  
 		gl_Position = uMVPMatrix * aPosition;	
 	}
`;
var normalFS = `
	#extension GL_OES_standard_derivatives : enable
	
	precision mediump float;
	
	uniform vec3 uLightColor;
	uniform vec3 uLightPosition;
	uniform vec3 uAmbientLightColor;
	
	varying vec3 vNormal;
	varying vec3 vPosition;
	varying vec4 vColor;
	varying vec3 vBarycentric;
	
	float edgeFactor2(){
	    vec2 d = fwidth(vBarycentric.yz);
	    vec2 a2 = smoothstep(vec2(0.0), d*2.0, vBarycentric.yz);
	    return min(a2.x, a2.y);
	}
	
	float edgeFactor3(){
	    vec3 d = fwidth(vBarycentric);
	    vec3 a3 = smoothstep(vec3(0.0), d*2.0, vBarycentric);
	    return min(min(a3.x, a3.y), a3.z);
	}
	
	void main(){
		const float epsilon = 0.05;
		vec3 normal = normalize(vNormal);
		vec3 lightDirection = normalize(uLightPosition - vPosition);
		float normalDotDirection = max(dot(normal,lightDirection),0.0);
		vec3 diffuse = uLightColor * vec3(vColor) * 1.0;
		vec3 ambient = uAmbientLightColor * vec3(vColor);
		vec4 color = vec4(ambient + diffuse * normalDotDirection,vColor.a);
		gl_FragColor = color;
		gl_FragColor.rgb = mix(vec3(0.0,0.0,0.0), vec3(1.0), edgeFactor3());
	}
`;
