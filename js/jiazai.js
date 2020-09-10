
// 先定义一个函数实现的功能是当所有的图片都加载完成后再返回这个含有所有已经加载好的
// 图片的键值对对象回来操作这些图片
// 参数是要加载的图片的名称地址键值对
function jiazai(obj,fn) {
    var obj2 = {};
    // 参数obj的数量
    var num = 0;
    // 返回的加载好的obj2的数量
    var num2 =0;
    for (var k in obj){
        num ++;
        var img = new Image();
        img.src = obj[k];
        img.onload = function(){
            // 判断何时执行回调函数，当加载的图片的数量大于等于参数图片的数量时
            num2++;
            if (num2 >= num){
                fn(obj2);
            }
        }
        // 图片加载后才可以放到返回的obj中
        obj2[k] = img;
    }
}
