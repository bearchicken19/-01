(function (w) {

// 此处写小鸟的构造函数
function Bird(ctx,img,currentFrame,x,y,speed) {
    this.ctx = ctx;
    this.img = img;
    // 小鸟横向的帧数
    this.currentFrame = currentFrame;
    this.width = img.width/currentFrame;
    this.height = img.height;
    this.x = x;
    this.y = y;
    // 小鸟当前横向的帧数
    this.nowFrame = 0;
    // 小鸟下落的速度
    this.speed = speed || 4;
    // 小鸟下落的加速度
    this.speedplus = 1.5;
    // 创建对象时直接调用绑定点击事件
    this._bind();
}
Bird.prototype = {
    constructor : Bird,
    draw : function () {
        // 每次绘制小鸟的时候下落有头向下旋转的角度，为了不影响其他已经绘制好的图像
        // 这里需要把绘制小鸟之前的状态保存起来，会之后在把之前的状态滚回
        this.ctx.save();
        // 把坐标移动到小鸟的中心位置，旋转的角度根据下落速度决定，绘制坐标变成宽高
        // 的一半的负值
        this.ctx.translate(this.x + this.width/2,this.y + this.height/2);
        this.ctx.rotate(Math.PI/180 * this.speed * 2 );
        this.ctx.drawImage(this.img,
            this.width*this.nowFrame,0,this.width,this.height,
            -this.width/2,-this.height/2,this.width,this.height);
        this.ctx.restore();
    },
    updata : function () {
        this.nowFrame ++;
        this.nowFrame = this.nowFrame >= this.currentFrame? 0 : this.nowFrame;
        // 想要小鸟下落就需要改变绘制y轴的值
        this.y += this.speed;
        // 想要让小鸟下落的更自然，需要一个下落的加速度
        this.speed += this.speedplus;
    },
    // 给小鸟绑定一个点击事件，该是间实现点击一次画布，小鸟往上飞一段距离
    // 改事件不需要每一个创建的对象都调用，之间在创建对象的时候就调用，在构造函数中
    _bind : function () {
        // 要让小鸟往上飞一段，y轴的值要减去一个值，但是因为小鸟下落是有加速度的，所以
        // 减去的值随着时间的增加以及加速度影响的下落速度的增加，会使得上飞的的值相对减小
        // 从而出现点击后小鸟不会往上飞，而是往下落的速度减缓了，因此这里应该直接改变小鸟
        // 下落的速度变成负值，那么在每一次点击后定时器触发的时候因为下落速度变成的负值，
        // 小鸟会向上飞一点，然后随着加速度的不断增加，负值变正直接着下落
        var that = this;
        this.ctx.canvas.addEventListener('click',function () {
            that.speed = -6;
        })
    }
}
// 存储已经创建好的鸟实例对象
    var bird = null;
w.getBird = function (ctx,img,currentFrame,x,y,speed) {
    // 单例模式，游戏中只能存在一个鸟对象
    if (!bird){
        bird = new Bird(ctx,img,currentFrame,x,y,speed);
    }
    return bird;
}
}(window))