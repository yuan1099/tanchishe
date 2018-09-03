
//这里就写所有关于食物的代码.
;(function (w) {
    //利用数组来存放显示食物的div
    var list = [];

    //1分析得出,小食物是有宽由高的,有背景色,有定位的坐标的,所以他是一个对象,有对象就应该有成创建对象的构造函数.
    function Food(width,height,bgColor,x,y){
        this.width = width || 20;
        this.height = height || 20;
        this.bgColor = bgColor || 'green';
        this.x = x || 0;
        this.y = y || 0;
    }

    //2.让食物对象显示在地图上. 显示在地图上的代码封装成一个函数. 封装成的这个函数写在哪儿? 封装在原型中.
    //a.写在原型中,要显示的食物对象可以直接调用.  b.每一个实例化的食物对象,都要显示.
    Food.prototype.render = function (map) {

        //渲染新事物之前，让老食物消失
        remove(map);
        //2.1 计算一个随机的坐标

        this.x = Math.floor(Math.random() * map.offsetWidth/this.width) * this.width;
        this.y = Math.floor(Math.random() * map.offsetHeight/this.height) * this.height;
        //2.2 创建一个div,让这个div拥有这个食物对象所有的显示信息
        var div1 = document.createElement('div');
        div1.style.position = 'absolute';
        div1.style.left = this.x + 'px';
        div1.style.top = this.y+'px';
        div1.style.width = this.width+'px';
        div1.style.height = this.height+"px";
        div1.style.backgroundColor = this.bgColor;
        //2.3 把这个div追加到地图map中
        map.appendChild(div1);
        //把这个div存入list数组中
        list.push(div1);

    }
    function remove(map){
        for(var i=0;i<list.length;i++){
            map.removeChild(list[i])
        }
        list.length=0;
    }

    //3. 要把构造函数Food,暴露在外面.
    w.Food = Food;//这句话的意思就是把这个构造函数Food,赋值给window对象的属性Food.


}(window));
//----------------------------------------------------------------------------------------------


//关于蛇的代码
;(function (window) {

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

//-------------------------------------------------------------------------------------------------------------------


//逻辑代码
;(function (w) {
    var that = null;//定义变量存储this
    //创建游戏对象的构造函数
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        //给that赋值
        that = this;
    }

//游戏开始方法，写在原型中，游戏对象直接点出来。
    Game.prototype.startGame = function () {
        //显示食物对象
        this.food.render(this.map);
        //显示蛇对象
        this.snake.render(this.map);
        //让蛇动起来，就是调用蛇的move方法
        //this.snake.move();
        //把新坐标渲染出来
        //this.snake.render(this.map);
        //让蛇不停的动起来
        sankeAutMove();
        //根据键盘按键，改变蛇移动的方向
        bindKey();
    }
//根据键盘按键，改变蛇的移动方向
    function bindKey() {
        //获取键盘按键，改变方向
        window.onkeydown = function (e) {
            switch (e.keyCode) {
                //37、38、39、40表示ascii码
                case 37:
                    //判断方向不能为反方向
                    if (this.snake.direction != 'right') {
                        this.snake.direction = 'left'
                    }
                    break;
                case 38:
                    if (this.snake.direction != 'down') {
                        this.snake.direction = 'up'
                    }
                    break;
                case 39:
                    if (this.snake.direction != 'left') {
                        this.snake.direction = 'right'
                    }
                    break;
                case 40:
                    if (this.snake.direction != 'up') {
                        this.snake.direction = 'down'
                    }
                    break;
            }
        }.bind(that);
    }

    //写一个方法，让蛇不停的动
    function sankeAutMove() {
        //定时器
        var timeId = setInterval(function () {
            this.snake.move(this.food, this.map);
            this.snake.render(this.map);
            //判断蛇头是否超出边界，超出边界则停止定时器
            var snakeHeadX = this.snake.body[0].x * this.snake.width;
            var snakeHeadY = this.snake.body[0].y * that.snake.height;
            if (snakeHeadX < 0 || snakeHeadY < 0 || snakeHeadX > this.map.offsetWidth || snakeHeadY > this.map.offsetHeight) {
                alert('Game Over!');
                clearInterval(timeId);
            }
        }.bind(that), 300)
    }

    w.Game = Game;
}(window));






