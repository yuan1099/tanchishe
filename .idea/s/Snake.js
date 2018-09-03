/**
 * Created by itcast on 2018 07/11.
 */
//所有关于蛇的代码都写在这里.
(function (window) {
  var list = [];

  //1.蛇构造函数
  function Snake(width,height,direction){
    this.width = width || 20;
    this.height = height || 20;
    this.direction = direction || 'right';
    this.body = [
      {x:3,y:1,bgColor:'red'},
      {x:2,y:1,bgColor:'green'},
      {x:1,y:1,bgColor:'blue'}
    ];
  }

  //2.把创建出来的蛇对象给显示到地图上. 显示蛇这段代码封装成一个方法,写在那里. 写在原型中.
  Snake.prototype.render = function (map) {
    //如何显示蛇.把蛇的每一节像食物那样显示.整个蛇就显示出来了.
    for(var i = 0 ; i < this.body.length; i++){
      var snakeUnit = this.body[i]; //这样就拿到了蛇的每一节.
      //显示每一节.一样的创建div,让div拥有这一节所有显示信息.
      var div1 = document.createElement('div');
      div1.style.position = 'absolute';
      div1.style.left = snakeUnit.x * this.width + 'px';
      div1.style.top = snakeUnit.y * this.height + 'px';
      div1.style.width = this.width + "px";
      div1.style.height = this.height +'px';
      div1.style.backgroundColor = snakeUnit.bgColor;
      //把div添加到地图上
      map.appendChild(div1);
    }
  }

  //4.蛇移动的方法,写在原型中, 原因是蛇对象可以直接点出来调用.
  Snake.prototype.move = function () {
    //4.1 除了蛇头之外的蛇身体
    for(var i = this.body.length-1; i>0;i--){
      this.body[i].x = this.body[i-1].x;
      this.body[i].y = this.body[i-1].y;
    }
    //4.2 蛇头
    switch (this.direction){
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
  }


  //3.把创建蛇的构造函数给暴露在外面
  window.Snake = Snake;

}(window));