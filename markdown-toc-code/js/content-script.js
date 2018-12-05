const $ = function (str) {
    return document.querySelector(str);
};

function addStyle(obj, atrr) {
    for (var pro in atrr) {
        obj.style[pro] = atrr[pro];
    }
}

// Github页面 过去一秒后开始加载元素 渲染toc目录
setTimeout(function () {
    var git_reg = /[https://github.com].*/;
    if (git_reg.test(document.URL)) {
        var _readme = $('article');
        var data = _readme.querySelectorAll('h1,h2,h3');
        var div = init(data);
        document.body.appendChild(div);
    }
    // alert($(window).width);
    console.log(document.getElementById('div_right_bar'));
    bindResize(document.getElementById('div_right_bar'));
}, 1000)

//  这里是画出 toc的逻辑
function init(list) {
    var toc = document.createElement("div");
    toc.setAttribute("class", "toc"); 
    toc.setAttribute("id", "toc"); 

    var div_top = document.createElement("div");
    addStyle(div_top, {"width": "100%"});
    div_top.setAttribute('id', "top");

    var div_toc = document.createElement("div");
    div_toc.setAttribute('id', "div_toc");
    div_toc.setAttribute("class", "div_toc"); 

    var div_right_bar = document.createElement("div");  // 这是一个 拖动bar
    div_right_bar.setAttribute('id', "div_right_bar");
    div_right_bar.setAttribute("class", "div_right_bar"); 
    div_right_bar.textContent = "bar";



    var toc_ul = document.createElement("ul");

    var firstLevel = 0;
    var isGetFisrtLevel = false;

    for (var i = 0; i < list.length; i++) {
        var header = list[i];

        var hreftagname = header.firstElementChild.hash;
        var level = parseInt(header.tagName.replace('H', ''), 10);
        if(!isGetFisrtLevel){
            firstLevel = level;
            isGetFisrtLevel = true;
        }

        var li = document.createElement("li");
        addStyle(li, {"listStyle": "none"});

        var a = document.createElement("a");
        addStyle(a, {"color": "#0366d6","textOverflow ": "ellipsis"});

        // a.innerHTML = level + header.textContent;

        console.log("firstLevel  "+firstLevel);
        console.log("level "+level);
        if( level == firstLevel ){
            a.innerHTML = header.textContent;
        }
        else{
            a.innerHTML = new Array(level * 2).join('&nbsp;')  + header.textContent;
        }
        a.setAttribute("href", hreftagname);
        // li.appendChild(a);
        div_toc.appendChild(li);
        div_toc.lastChild.appendChild(a);
    }

    toc.appendChild(div_top);
    toc.appendChild(div_toc);
    toc.appendChild(div_right_bar);
    return toc;
}

// 这里是绑定resize事件的方法
function bindResize(el) {
    //初始化参数
    var els = document.getElementById('toc').style;
    
    //鼠标的 X 和 Y 轴坐标
    x = 0;

     //邪恶的食指
    el.onmousedown = function(e){
        //按下元素后，计算当前鼠标与对象计算后的坐标

        x = e.clientX - el.offsetWidth,
        y = e.clientY - el.offsetHeight;
        console.log(x);
        //在支持 setCapture 做些东东
        el.setCapture ? (
        //捕捉焦点
            el.setCapture(),
        //设置事件
            el.onmousemove = function (ev)
            {
                mouseMove(ev || event);
            },
            el.onmouseup = mouseUp
        ) : (
            function(){
                document.addEventListener('mousemove',mouseMove,false);
                document.addEventListener('mouseup',mouseUp,false);
            }()
        );
        //防止默认事件发生
        e.preventDefault();
    }

    //移动事件
    function mouseMove(e) {
        //宇宙超级无敌运算中...
        els.width = e.clientX - x + 'px';
    }
    //停止事件
    function mouseUp() {
        //在支持 releaseCapture 做些东东
        el.releaseCapture ? (
            //释放焦点
            el.releaseCapture(),
            //移除事件
            el.onmousemove = el.onmouseup = null
        ) : (
                function(){
                    document.removeEventListener("mousemove", mouseMove);
                    document.removeEventListener("mouseup", mouseUp);
                }()
                //卸载事件
                // 这里也需要改写，你帮我看下啊。这样对吗？1
               
            );
    }
}