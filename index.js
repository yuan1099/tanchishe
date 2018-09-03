
//�����д���й���ʳ��Ĵ���.
;(function (w) {
    //���������������ʾʳ���div
    var list = [];

    //1�����ó�,Сʳ�����п��ɸߵ�,�б���ɫ,�ж�λ�������,��������һ������,�ж����Ӧ���гɴ�������Ĺ��캯��.
    function Food(width,height,bgColor,x,y){
        this.width = width || 20;
        this.height = height || 20;
        this.bgColor = bgColor || 'green';
        this.x = x || 0;
        this.y = y || 0;
    }

    //2.��ʳ�������ʾ�ڵ�ͼ��. ��ʾ�ڵ�ͼ�ϵĴ����װ��һ������. ��װ�ɵ��������д���Ķ�? ��װ��ԭ����.
    //a.д��ԭ����,Ҫ��ʾ��ʳ��������ֱ�ӵ���.  b.ÿһ��ʵ������ʳ�����,��Ҫ��ʾ.
    Food.prototype.render = function (map) {

        //��Ⱦ������֮ǰ������ʳ����ʧ
        remove(map);
        //2.1 ����һ�����������

        this.x = Math.floor(Math.random() * map.offsetWidth/this.width) * this.width;
        this.y = Math.floor(Math.random() * map.offsetHeight/this.height) * this.height;
        //2.2 ����һ��div,�����divӵ�����ʳ��������е���ʾ��Ϣ
        var div1 = document.createElement('div');
        div1.style.position = 'absolute';
        div1.style.left = this.x + 'px';
        div1.style.top = this.y+'px';
        div1.style.width = this.width+'px';
        div1.style.height = this.height+"px";
        div1.style.backgroundColor = this.bgColor;
        //2.3 �����div׷�ӵ���ͼmap��
        map.appendChild(div1);
        //�����div����list������
        list.push(div1);

    }
    function remove(map){
        for(var i=0;i<list.length;i++){
            map.removeChild(list[i])
        }
        list.length=0;
    }

    //3. Ҫ�ѹ��캯��Food,��¶������.
    w.Food = Food;//��仰����˼���ǰ�������캯��Food,��ֵ��window���������Food.


}(window));
//----------------------------------------------------------------------------------------------


//�����ߵĴ���
;(function (window) {

    function getColorForRandom( ){
        //�������һ��ʮ������
        var arr=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
        var str='#';
        //ѭ������6��0-15����
        for(var i=0;i<6;i++){
            var num=Math.floor(Math.random()*16);
            //����������������arr������ȥȥֵ
            str+=arr[num];
        }
        return str;
    }
    //����һ������list�����������������Ӧ��div��
    var list = [];
    //�ߵĹ��캯��
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
    //�Ѵ����������߶������ʾ�ڵ�ͼ�ϣ���ʾ����δ����װ��һ��������д��ԭ����
    Snake.prototype.render = function (map) {
        //��Ⱦ����ǰ����ԭ��������ɾ��
        remove(map);
        //����һ��һ�ڵ���ʾ�����������߾���ʾ������
        for (var i = 0; i < this.body.length; i++) {
            //�õ��ߵ�ÿһ��
            var snakeUnit = this.body[i];
            //��ʾÿһ�ڣ�һ������div����divӵ����һ��������ʾ��Ϣ
            var div1 = document.createElement('div');
            div1.style.position = 'absolute';
            div1.style.left = snakeUnit.x * this.width + 'px';
            div1.style.top = snakeUnit.y * this.height + 'px';
            div1.style.width = this.width + 'px';
            div1.style.height = this.height + 'px';
            div1.style.backgroundColor = snakeUnit.bgColor;
            //��div��ӵ���ͼ��
            map.appendChild(div1);
            //��div���浽list������
            list.push(div1);
        }
    }
    //ɾ�����ߣ�����ɾ�����߶�Ӧ�������Ӧ������div��
    function remove(map) {
        //��list�����б����div����map���Ƴ�
        for (var i = 0; i < list.length; i++) {
            map.removeChild(list[i]);
        }
        //ÿ�ζ���list�������
        list.length = 0;
    }

    //���߶�������д��ԭ���У��߶����һֱ�ӵ��������
    Snake.prototype.move = function (food,map) {
        //������ͷ֮�������
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y
        }
        //��ͷ
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


//�߼�����
;(function (w) {
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






