/**
 * Created by itcast on 2018 07/11.
 */
//这里就写所有关于游戏逻辑的代码.
(function (w) {
  //1.创建游戏对象的构造函数
  function Game(map){
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
  }


  //2.游戏开始方法. 写在原型中好,游戏对象直接可以点出来.
  Game.prototype.startGame = function () {
    //2.1 显示食物对象
    this.food.render(this.map);
    //2.2 显示蛇对象
    this.snake.render(this.map);

    //让蛇动起来,实际上就是调用蛇的move方法.
    this.snake.move();
    //把新坐标的蛇给渲染出来.
    this.snake.render(this.map);
  }


  //3.把游戏对象的构造函数Game给暴露出去
  w.Game = Game;

}(window));