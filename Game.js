/**
 * Created by Administrator on 2018/7/11.
 */
//逻辑代码
(function (w) {
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




