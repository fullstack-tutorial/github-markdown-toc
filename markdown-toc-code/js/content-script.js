const $ = function (str) {
    return document.querySelector(str);
};

function addStyle(obj, atrr) {
    for (var pro in atrr) {
        obj.style[pro] = atrr[pro];
    }
}

setTimeout(function () {
    var git_reg = /[https://github.com].*/;
    if (git_reg.test(document.URL)) {
        var _readme = $('article');
        var data = _readme.querySelectorAll('h1,h2,h3');
        // var data = _readme.querySelectorAll('h1,h2,h3,h4,h5,h6');
        var div = init(data);
        document.body.appendChild(div);
    }
}, 1000)

// 初始化
function init(list) {
    var toc = document.createElement("div");
    addStyle(toc, {
        "position": "fixed",
        "margin-right": "20px",
        "padding": "20px",
        "border-radius": "3px",
        "width": "400px",
        "height": "85%",
        "min-height": "200px",
        "z-index": 999,
        "left": "10px",
        "top": "70px",
        "bottom": "20px",
        "overflow-x": "hidden",
        "overflow": "auto",
        "background-color": "#fafbfc",
        "border": "1px solid #d1d5da",
        "cursor":"e-resize"
    })
    var toc_ul = document.createElement("ul");
    var stack = new Array();


    var firstLevel = 0;
    var isGetFisrtLevel = false;

    for (var i = 0; i < list.length; i++) {
        var header = list[i];

        // debugger;
        var hreftagname = header.firstElementChild.hash;
        var level = parseInt(header.tagName.replace('H', ''), 10);
        if(!isGetFisrtLevel){
            // console.log("exec");
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
        toc_ul.appendChild(li);
        toc_ul.lastChild.appendChild(a);

    }
    toc.appendChild(toc_ul);
    return toc;
}

