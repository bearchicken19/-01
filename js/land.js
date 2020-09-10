(function (w) {

// 此处写大地的构造函数
function Land(ctx,img,speed) {
    this.ctx = ctx;
    this.img = img;
    this.speed = speed || 10;
    // 大地的高度
    this.width = img.width;
    // 大地的宽度
    this.height = img.height;
    // 大地的宽度是336，画布的宽度是800，所以要创建最少4个大地对象才可以实现大地在画布
    // 上向左滚动无缝连接
    Land.len++;
    this.x = this.width * (Land.len - 1);
    this.y = this.ctx.canvas.height - this.height;
}
// 静态属性变量
Land.len = 0;
Land.prototype = {
    constructor : Land,
    draw : function () {
        this.ctx.drawImage(this.img,this.x,this.y);
    },
    updata : function () {
        this.x -= this.speed;
        this.x += this.x <= -this.width? this.width*(Land.len) : 0;
    }
}
w.getLand = function (ctx,img,speed) {
    return new Land(ctx,img,speed);
}
}(window))