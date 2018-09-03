/**
 * Created by Administrator on 2018/7/11.
 */
//�߼�����
(function (w) {
    var that = null;//��������洢this
    //������Ϸ����Ĺ��캯��
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        //��that��ֵ
        that = this;
    }

//��Ϸ��ʼ������д��ԭ���У���Ϸ����ֱ�ӵ������
    Game.prototype.startGame = function () {
        //��ʾʳ�����
        this.food.render(this.map);
        //��ʾ�߶���
        this.snake.render(this.map);
        //���߶����������ǵ����ߵ�move����
        //this.snake.move();
        //����������Ⱦ����
        //this.snake.render(this.map);
        //���߲�ͣ�Ķ�����
        sankeAutMove();
        //���ݼ��̰������ı����ƶ��ķ���
        bindKey();
    }
//���ݼ��̰������ı��ߵ��ƶ�����
    function bindKey() {
        //��ȡ���̰������ı䷽��
        window.onkeydown = function (e) {
            switch (e.keyCode) {
                //37��38��39��40��ʾascii��
                case 37:
                    //�жϷ�����Ϊ������
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

    //дһ�����������߲�ͣ�Ķ�
    function sankeAutMove() {
        //��ʱ��
        var timeId = setInterval(function () {
            this.snake.move(this.food, this.map);
            this.snake.render(this.map);
            //�ж���ͷ�Ƿ񳬳��߽磬�����߽���ֹͣ��ʱ��
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




