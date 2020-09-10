function Gamescreen(ctx,obj) {
    this.ctx = ctx;
    this.obj = obj;
// 把所有的对象添加到数组中然后遍历数组全部调用其中的函数就可以实现相同功能
this.role = [];
this._init();
}
Gamescreen.prototype = {
    constructor : Gamescreen,
    _init : function(){
        // 两个sky对象
        for (var i = 0; i < 2; i++) {
            this.role.push(getSky(this.ctx,this.obj.sky));

        }

// 5个管道对象
        for (var i = 0; i < 5; i++) {
            this.role.push(getPipe(this.ctx,this.obj.pipedowm,this.obj.pipeup,150,this.obj.land.height));

        }

// 4个大地对象
        for (var i = 0; i < 4; i++) {
            this.role.push(getLand(this.ctx,this.obj.land));

        }

// 1个小鸟对象
        this.role.push(getBird(this.ctx,this.obj.bird,3,20,20))
    },
    draw : function () {
        // 清除绘制的管道路径
        this.ctx.beginPath();
        // 遍历role数组，执行里面所有对象的draw和updata方法
        this.role.forEach(function (ele) {
            ele.draw();
            ele.updata();
        });
    }
}
