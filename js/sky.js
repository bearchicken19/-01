(function (w) {

// 此处写背景天空的构造函数
// 需要的参数有画布对象，图片，绘制的坐标位置
    function Sky(ctx, img, speed) {
        this.ctx = ctx;
        this.img = img;
        this.speed = speed || 10;
        this.width = img.width;
        // 当外面有第二次创建该对象的时候，让静态属性自增
        Sky.len++;
        this.x = this.width * (Sky.len - 1);
        this.y = 0;
    }

// 定义sky的静态属性
    Sky.len = 0;
    Sky.prototype = {
        constructor: Sky,
        draw: function () {
            this.ctx.drawImage(this.img, this.x, this.y);
        },
        updata: function () {
            this.x -= this.speed;
            this.x = this.x <= -this.width ? this.width : this.x;
        }

    }
    w.getSky = function (ctx, img, speed) {
        return new Sky(ctx, img, speed);
    }
}(window));