/**
 * Created by Administrator on 2018/7/11.
 */
//�����д���й���ʳ��Ĵ���.
(function (w) {
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