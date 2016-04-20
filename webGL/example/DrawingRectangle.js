/**
 * Created by 1231 on 2016/4/14.
 */
function main(){
    //获取<canvas>元素
    var canvas = document.getElementById("example");
    if(!canvas){
        console.log('Failed to retrieve the <cancas> element');
        return;
    }

    //获取绘制二维图形的绘制上下文
    var ctx = canvas.getContext('2d');

    /**
     * 绘制蓝色的矩形，
     * rgb表示颜色（0-255）
     * a ： 透明度 （0.0-1.0）*/
    ctx.fillStyle = 'rgba(0,0,255,0.5)';//设置填充颜色为蓝色
    ctx.fillRect(120,10,150,150);//使用填充颜色填充矩形
}