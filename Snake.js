/**
 * Created by Administrator on 2018/7/11.
 */
//�����ߵĴ���
(function (window) {

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
