(function (w) {

// 管道的构造函数
function Pipe(ctx,pipedown,pipeup,space,landheight,speed) {
    this.ctx = ctx;
    this.pipedown = pipedown;
    this.pipeup = pipeup;
    this.space = space;
    this.landheight = landheight;
    this.speed = speed || 10;
    // 管道的宽高
    this.width = pipedown.width;
    this.height = pipedown.height;
    // 在画布滚动时，管道是布满整个画布的，因此需要创建多个管道对象，根据管道的宽度52以及画布
    // 的宽度800，横向管道间的宽度为3个管道的宽度，计算出管道对象的个数为5个
    Pipe.len ++;
    this.x = 300 + this.width*4*(Pipe.len - 1) ;
    this.ydown = 0;
    this.yup = 0;
    this._bind();
}
Pipe.len = 0;
Pipe.prototype = {
    constructor : Pipe,
    // 上下管道的x轴坐标是一致的，y坐标是不同的，这里定义一个函数，每次创建对象的时候
    // 自动随机生成上下管道的y坐标
    _bind : function () {
        // 上管道y坐标的最大取值为画布高度减去管道间距space和大地的高度以及管道的最小取值
        var maxheight = this.ctx.canvas.height - this.space - this.landheight - 100;
        maxheight = Math.random()*maxheight;
        maxheight = maxheight <= 0? 50 : maxheight;
        this.ydown = maxheight - this.height;
        // 下管道的y坐标等于上管道的最大高度加上管道间距
        this.yup = maxheight + this.space;
    },
    draw : function () {
        this.ctx.drawImage(this.pipedown,this.x,this.ydown);
        this.ctx.drawImage(this.pipeup,this.x,this.yup);
        // 绘制管道的同时绘制管道路径
        this._drawPath();
        // 清除管道路径,因为是一次创建了5个管道对象，清除路径的时候需要一次清除5个，
        // 如果直接在绘制路径的方法中先清除路径，会导致绘制的第5个路径之前的4个路径都
        // 已经被清除了，如果碰到小鸟就不会结束游戏，因此要在调用对象绘制方法前清除
    },
    // 要实现小鸟碰到管道就停止游戏，需要判断小鸟的中心点是否在管道的路径中，因此这里需要
    // 每次绘制的管道的同时绘制管道路径
    _drawPath : function(){
        this.ctx.rect(this.x,this.ydown,this.width,this.height);
        this.ctx.rect(this.x,this.yup,this.width,this.height);
        this.ctx.stroke();
    },
    updata : function () {
        this.x -= this.speed;
        if (this.x <= -this.width*4){
            this.x += this.width*4*Pipe.len;
            this._bind();
        }
    }
}
w.getPipe = function (ctx,pipedown,pipeup,space,landheight,speed) {
    return new Pipe(ctx,pipedown,pipeup,space,landheight,speed);
}
}(window))