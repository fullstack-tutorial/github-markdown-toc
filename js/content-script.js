const $ = function (str) {
    return document.querySelector(str);
};

setTimeout(function () {
    var git_reg = /[https://github.com].*/;
    if (git_reg.test(document.URL)) {
        var _readme = $('article');
        var data = _readme.querySelectorAll('h1,h2,h3,h4,h5,h6');;
        var div = init(data);
        document.body.appendChild(div);
    }
}, 1000)

function init(list) {
    var toc = document.createElement("ul");
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
        // "background": "gainsboro",
        "border": "1px solid #d1d5da",
    })
    var stack = new Array();
    for (var i = 0; i < list.length; i++) {
        var header = list[i];
        var level = parseInt(header.tagName.replace('H', ''), 10) - 1;
        // 通过两个where循环对栈进行调整,确保stack中标题级数与当前标题级数相同
        while (stack.length < level) {
            stack.push(0);
        }
        while (stack.length > level) {
            stack.pop();
        }

        // 最小一级标题标号步进 + 1
        stack[stack.length - 1]++;
        // 生成标题标号( 1.1,1.2.. )
        var index = stack.join(".")
        // 生成标题ID
        var id = "title" + index;
        header.setAttribute('id', id);
        var li = document.createElement("li");
        addStyle(li, {
            "listStyle": "none",
        })
        toc.appendChild(li);
        var a = document.createElement("a");
        addStyle(a, {
            "color": "#0366d6",
            "textOverflow ": "ellipsis"
        })
        // 为目录项设置链接
        a.setAttribute("href", "#" + id)
        // 目录项文本前面放置缩进空格
        a.innerHTML = new Array(level * 4).join('&nbsp;') + index + new Array(2).join('&nbsp;') + header.textContent;
        toc.lastChild.appendChild(a);
    }
    return toc;

}


function addStyle(obj, atrr) {
    for (var pro in atrr) {
        obj.style[pro] = atrr[pro];
    }
}
