const $ = function (str) {
    return document.querySelector(str);
};

function addStyle(obj, atrr) {
    for (var pro in atrr) {
        obj.style[pro] = atrr[pro];
    }
}

// Github页面 过去一秒后开始加载元素 渲染toc目录
// setTimeout(function () {
//     var git_reg = /[https://github.com].*/;
//     if (git_reg.test(document.URL)) {
//         var _readme = $('article');
//         var data = _readme.querySelectorAll('h1,h2,h3');
//         var div = init(data);
//         document.body.appendChild(div);
//     }
//     // alert($(window).width);
//     console.log(document.getElementById('div_right_bar'));
//     bindResize(document.getElementById('div_right_bar'));
//     // 因为你这里你根本不知道页面结构到底加载好了没 资源  z加载enme完毕了吗
//     document.getElementsByTagName('html')[0].style.marginLeft  = "350px";
// }, 1000)
//看看 这里执行了吗
let $container;
let $repoheadDetailsContainer;
let $jsRepoNav;
let containerClient;
const domInit = function(){
    console.log(new Date().getTime(),'初始化开始')
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
    const $idHtml = document.querySelector('#js-repo-pjax-container');
    $container =  $idHtml.children[1];
    $repoheadDetailsContainer = document.querySelector('.repohead-details-container');
    $jsRepoNav = document.querySelector('.js-repo-nav');
    containerClient =  $container.getClientRects()[0];

    // 因为你这里你根本不知道页面结构到底加载好了没 资源  z加载enme完毕了吗
    // document.querySelector('.Header').style.paddingLeft = '350px';
    initTocBar(350);
    // document.querySelector('#js-repo-pjax-container').style.paddingLeft = '350px';
    
    
    // document.getElementsByTagName('html')[0].style.marginLeft  = "350px";
}
document.addEventListener('DOMContentLoaded',domInit,false);


function initTocBar(initWidth){
    var els = document.getElementById('toc').style;

    //宇宙超级无敌运算中...  
    let w = document.body.clientWidth;
    let w2 = initWidth + 'px';

    var minWidth = 200;
    var moveWidth = parseInt(initWidth);
    if(moveWidth < 200){
        return;
    }
    var $header = document.querySelector('.Header');
    
    
    if(moveWidth > minWidth && initWidth > containerClient.left){
        document.getElementsByTagName('html')[0].style.marginLeft = w2;
        $header.style.paddingLeft = 0 + 'px';
        // $container.style.marginLeft = '10px';
        $container.style.marginLeft = '10px';
        $repoheadDetailsContainer.style.marginLeft = '10px';
        $jsRepoNav.style.marginLeft = '10px';
    }else{
        $header.style.paddingLeft = moveWidth + 'px';
        document.getElementsByTagName('html')[0].style.marginLeft = 0;
        $container.style.marginLeft = 'auto';
        $repoheadDetailsContainer.style.marginLeft = 'auto';
        $jsRepoNav.style.marginLeft = 'auto';
    }
    els.width = initTocBar  + 'px';
}



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
    div_right_bar.textContent = "";



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

            var header_p = document.createElement("li");
            header_p.textContent = "GitHub Markdown TOC";
            addStyle(header_p, {"listStyle": "none","font-size":"20px","margin-bottom":"10px"});

            var gotop_li = document.createElement("li");
            var gotop_li = document.createElement("li");
            addStyle(gotop_li, {"listStyle": "none"});
            var gotop_a = document.createElement("a");
            addStyle(gotop_a, {"color": "#0366d6","textOverflow ": "ellipsis","font-weight":"bold"});
            gotop_a.innerHTML = "▲ GO TOP";
            gotop_a.setAttribute("href", "#");
            div_toc.appendChild(header_p);

            div_toc.appendChild(gotop_li);
            div_toc.lastChild.appendChild(gotop_a);
        }

        var li = document.createElement("li");
        addStyle(li, {"listStyle": "none"});

        var a = document.createElement("a");
        addStyle(a, {"color": "#0366d6","textOverflow ": "ellipsis"});

        // a.innerHTML = level + header.textContent;
        if( level == firstLevel ){
            a.innerHTML = header.textContent;
            addStyle(a, {"font-weight":"bold"});
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
        console.log(e);
        // document.querySelector('#js-repo-pjax-container').style.paddingLeft = "0px";
        // console.log
        //宇宙超级无敌运算中...  
        let w = document.body.clientWidth;
        let w2 = e.clientX + 'px';
        // haha xiecuole 
        // els.width = e.clientX - x + 'px';
        // 好的你来操作
      
        // if(e.clientX && e.clientX > (w-980)/2 ){
        //     document.getElementsByTagName('html')[0].style.marginLeft = w2;
        // }else{
        //     document.getElementsByTagName('html')[0].style.marginLeft = '0px';
        // }
        // console.log(e.clientX);
        // if(e.clientX > 100){

        // }
        // console.log("e.clientX " + e.clientX);
    
        
        // var readmeWidth = document.getElementById("readme").clientWidth;
        // var maxWidth = document.getElementById("readme").clientWidth * 0.8;
        var minWidth = 200;
        var moveWidth = parseInt(e.clientX);
        if(moveWidth < 200){
            return;
        }
        var $header = document.querySelector('.Header');
       
        
        if(moveWidth > minWidth && e.clientX > containerClient.left){
            document.getElementsByTagName('html')[0].style.marginLeft = w2;
            $header.style.paddingLeft = 0 + 'px';
            // $container.style.marginLeft = '10px';
            $container.style.marginLeft = '10px';
            $repoheadDetailsContainer.style.marginLeft = '10px';
            $jsRepoNav.style.marginLeft = '10px';
        }else{
            $header.style.paddingLeft = moveWidth + 'px';
            document.getElementsByTagName('html')[0].style.marginLeft = 0;
            $container.style.marginLeft = 'auto';
            $repoheadDetailsContainer.style.marginLeft = 'auto';
            $jsRepoNav.style.marginLeft = 'auto';
        }
        els.width = e.clientX  + 'px';

        return;
        if( moveWidth > minWidth &&  e.clientX > (w-980)/2 ){
            document.getElementsByTagName('html')[0].style.marginLeft = w2;
            $header.style.paddingLeft = 0 + 'px';
           
        }


        els.width = e.clientX  + 'px';
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
            );
    }
}