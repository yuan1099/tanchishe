/**
 * Created by Administrator on 2018/7/11.
 */
(function(w){
    var list=[];
    //食物有宽高，有背景色，有坐标；
    function Food(width,height,bgColor,x,y){
        this.width=width||20;
        this.height=height||20;
        this.bgColor=bgColor||'green';
        this.x=x||0;
        this.y=y||0;
    }
    Food.prototype.render=function(map){
        this.x=Math.floor(Math.random()*map.offsetWidth/this.width)*this.width;
        this.y=Math.floor(Math.random()*map.offsetHeight/this.height)*this.height;
        var div1=document.createElement('div');
        div1.style.position='absolute';
        div1.style.left=this.x+'px';
        div1.style.top=this.y+'px';
        div1.style.width=this.width+'px';
        div1.style.height=this.height+'px';
        div1.style.backgroundColor=this.bgColor;
        map.appendChild(div1);

    }
    w.Food=Food;
}(window))