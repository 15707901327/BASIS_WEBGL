var utils = {};

utils.createVertexBufferObject = function(gl,vertices){
    var vertexBuffer = gl.createBuffer(); // 创建缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer); //绑定缓冲区
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW); //给缓冲区填充数据
    return vertexBuffer;
}

utils.initVertexBufferObject = function(gl,vertices,size,location){
    var vertexBuffer = gl.createBuffer(); // 创建缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer); //绑定缓冲区
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW); //给缓冲区填充数据
    if(size && location != null){
    	   gl.vertexAttribPointer(location,size,gl.FLOAT,false,0,0); // 把缓冲区分配给attribute变量
    }
   
    return vertexBuffer;
}

