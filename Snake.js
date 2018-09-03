/**
 * Created by Administrator on 2018/7/11.
 */
//关于蛇的代码
(function (window) {

    function getColorForRandom( ){
        //随机生成一个十六进制
        var arr=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    var str='#';
        //循环产生6个0-15的数
        for(var i=0;i<6;i++){
            var num=Math.floor(Math.random()*16);
            //根据这个随机数，在arr数组中去去值
            str+=arr[num];
        }
        return str;
    }
    //申明一个数组list，用来保存蛇身体对应的div；
    var list = [];
    //蛇的构造函数
    function Snake(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        this.direction = direction || 'right';
        this.body = [
            {x: 3, y: 1, bgColor: 'skyblue'},
            {x: 2, y: 1, bgColor: 'green'},
            {x: 1, y: 1, bgColor: 'blue'},
        ];
    }
    //把创建出来的蛇对象给显示在地图上，显示蛇这段代码封装成一个方法，写在原型中
    Snake.prototype.render = function (map) {
        //渲染新蛇前，把原来的老蛇删掉
        remove(map);
        //把蛇一节一节的显示出来，整个蛇就显示出来了
        for (var i = 0; i < this.body.length; i++) {
            //拿到蛇的每一节
            var snakeUnit = this.body[i];
            //显示每一节，一样创建div，让div拥有这一节所有显示信息
            var div1 = document.createElement('div');
            div1.style.position = 'absolute';
            div1.style.left = snakeUnit.x * this.width + 'px';
            div1.style.top = snakeUnit.y * this.height + 'px';
            div1.style.width = this.width + 'px';
            div1.style.height = this.height + 'px';
            div1.style.backgroundColor = snakeUnit.bgColor;
            //把div添加到地图上
            map.appendChild(div1);
            //把div保存到list数组中
            list.push(div1);
        }
    }
        //删除老蛇，就是删除老蛇对应的坐标对应产生的div；
    function remove(map) {
        //把list数组中保存的div，从map中移除
        for (var i = 0; i < list.length; i++) {
            map.removeChild(list[i]);
        }
        //每次都把list数组清空
        list.length = 0;
    }

    //让蛇动起来，写在原型中，蛇对象可一直接点出来调用
    Snake.prototype.move = function (food,map) {
        //出来蛇头之外的蛇身
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y
        }
        //蛇头
        switch (this.direction) {
            case 'up':
                this.body[0].y--;
                break;
            case 'down':
                this.body[0].y++;
                break;
            case 'left':
                this.body[0].x--;
                break;
            case 'right':
                this.body[0].x++;
                break;

        }
        var snakeHeadX=this.body[0].x*this.width;
        var snakeHeadY=this.body[0].y*this.height;
        var foodX=food.x;
        var foodY=food.y;
        var snakeLastUnit=this.body[this.body.length-1];
        if(snakeHeadX==foodX&&snakeHeadY==foodY){
            this.body.push({
                x:snakeLastUnit.x,
                y:snakeLastUnit.y,
                bgColor:getColorForRandom()
            });
            food.render(map)
        }
    }

    window.Snake = Snake;
}(window));
