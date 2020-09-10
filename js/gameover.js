function Gameover(ctx) {
    this.ctx = ctx;
}
Gameover.prototype ={
    constructor : Gameover,
    draw : function () {
        this.ctx.fillStyle = 'rgba(50,50,50,0.5)';
        this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        this.ctx.fillStyle = 'red';
        this.ctx.font = '40px 微软雅黑';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('GAME OVER!!!',this.ctx.canvas.width/2,this.ctx.canvas.height/2);
    }
}