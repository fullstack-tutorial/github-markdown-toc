// doc 获取
var _$ = function(str, dom, isAll) {
  var DOM = dom || document;
  return DOM[`querySelector${isAll ? "All" : ""}`](str);
};

// style 添加
var addStyle = function(obj, atrr) {
  for (var pro in atrr) {
    obj.style[pro] = atrr[pro];
  }
};

// 全局变量
var $container, $repoheadDetailsContainer, $jsRepoNav, containerClient;

// Github页面 过去一秒后开始加载元素 渲染toc目录
var domInit = function() {
  var _readme = _$("article");
  if (_readme) {
    var data = _$("h1,h2,h3", _readme, true);
    var div = init(data);
    document.body.appendChild(div);

    bindResize(_$("#div_right_bar"));
    var $idHtml = _$("#js-repo-pjax-container");
    $container = $idHtml.children[1];
    containerClient = $container.getClientRects()[0];
    $repoheadDetailsContainer = _$(".repohead-details-container");
    $jsRepoNav = _$(".js-repo-nav");

    // 因为你这里你根本不知道页面结构到底加载好了没 资源  z加载enme完毕了吗
    initTocBar(350);
  }
};

var pluginInit = function() {
  domInit();
  // 处理单页跳转，页面未重新加载问题
  var github_progress = _$("#js-pjax-loader-bar");
  var observer = new MutationObserver(function(mutations, observer) {
    mutations.forEach(function(mutation) {
      if (mutation.target.getAttribute("class").indexOf("is-loading") === -1) {
        removeArtice();
        domInit();
      }
    });
  });
  observer.observe(github_progress, { attributeFilter: ["class"] });
};

var removeArtice = function() {
  var toc = _$("#toc");
  if (toc) {
    document.body.removeChild(toc);
  }
};

document.addEventListener("DOMContentLoaded", pluginInit, false);

function initTocBar(initWidth) {
  var els = _$("#toc").style;

  //宇宙超级无敌运算中...
  var w2 = initWidth + "px";

  var minWidth = 200;
  var moveWidth = parseInt(initWidth);
  if (moveWidth < 200) {
    return;
  }
  var $header = _$(".Header");

  if (moveWidth > minWidth && initWidth > containerClient.left) {
    document.getElementsByTagName("html")[0].style.marginLeft = w2;
    $header.style.paddingLeft = 0 + "px";
    $container.style.marginLeft = "10px";
    $repoheadDetailsContainer.style.marginLeft = "10px";
    $jsRepoNav.style.marginLeft = "10px";
  } else {
    $header.style.paddingLeft = moveWidth + "px";
    document.getElementsByTagName("html")[0].style.marginLeft = 0;
    $container.style.marginLeft = "auto";
    $repoheadDetailsContainer.style.marginLeft = "auto";
    $jsRepoNav.style.marginLeft = "auto";
  }
  els.width = initTocBar + "px";
}

//  这里是画出 toc的逻辑
function init(list) {
  var toc = document.createElement("div");
  toc.setAttribute("class", "toc");
  toc.setAttribute("id", "toc");

  var div_top = document.createElement("div");
  addStyle(div_top, { width: "100%" });
  div_top.setAttribute("id", "top");

  var div_toc = document.createElement("div");
  div_toc.setAttribute("id", "div_toc");
  div_toc.setAttribute("class", "div_toc");

  var div_right_bar = document.createElement("div"); // 这是一个 拖动bar
  div_right_bar.setAttribute("id", "div_right_bar");
  div_right_bar.setAttribute("class", "div_right_bar");
  div_right_bar.textContent = "";

  var firstLevel = 0;
  var isGetFisrtLevel = false;

  for (var i = 0; i < list.length; i++) {
    var header = list[i];

    var hreftagname = header.firstElementChild.hash;
    var level = parseInt(header.tagName.replace("H", ""), 10);

    if (!isGetFisrtLevel) {
      firstLevel = level;
      isGetFisrtLevel = true;

      var header_p = document.createElement("li");
      header_p.textContent = "GitHub Markdown TOC";
      addStyle(header_p, {
        listStyle: "none",
        "font-size": "20px",
        "margin-bottom": "10px"
      });

      var gotop_li = document.createElement("li");
      var gotop_li = document.createElement("li");
      addStyle(gotop_li, { listStyle: "none" });
      var gotop_a = document.createElement("a");
      addStyle(gotop_a, {
        color: "#0366d6",
        "textOverflow ": "ellipsis",
        "font-weight": "bold"
      });
      gotop_a.innerHTML = "▲ GO TOP";
      gotop_a.setAttribute("href", "#");
      div_toc.appendChild(header_p);

      div_toc.appendChild(gotop_li);
      div_toc.lastChild.appendChild(gotop_a);
    }

    var li = document.createElement("li");
    addStyle(li, { listStyle: "none" });

    var a = document.createElement("a");
    addStyle(a, { color: "#0366d6", "textOverflow ": "ellipsis" });

    // a.innerHTML = level + header.textContent;
    if (level == firstLevel) {
      a.innerHTML = header.textContent;
      addStyle(a, { "font-weight": "bold" });
    } else {
      a.innerHTML = new Array(level * 2).join("&nbsp;") + header.textContent;
    }
    a.setAttribute("href", hreftagname);
    // li.appendChild(a);
    div_toc.appendChild(li);
    div_toc.lastChild.appendChild(a);
  }

  toc.appendChild(div_top);
  toc.appendChild(div_toc);
  toc.appendChild(div_right_bar);

  var div_shrink = document.createElement("div");
  div_shrink.innerHTML =
    '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1546073873342" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1761" data-spm-anchor-id="a313x.7781069.0.i1" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><defs><style type="text/css"></style></defs><path d="M866.8672 257.024H157.184c-30.208 0-54.6304-22.8864-54.6304-51.2 0-28.2624 24.4736-51.2 54.6304-51.2H866.816c30.208 0 54.6304 22.9376 54.6304 51.2 0 28.3136-24.4736 51.2-54.6304 51.2z m0 307.2H157.184c-30.208 0-54.6304-22.8864-54.6304-51.2 0-28.2624 24.4736-51.2 54.6304-51.2H866.816c30.208 0 54.6304 22.9376 54.6304 51.2 0 28.3136-24.4736 51.2-54.6304 51.2z m0 307.2H157.184c-30.208 0-54.6304-22.8864-54.6304-51.2 0-28.2624 24.4736-51.2 54.6304-51.2H866.816c30.208 0 54.6304 22.9376 54.6304 51.2 0 28.3136-24.4736 51.2-54.6304 51.2z" fill="#333333" p-id="1762"></path></svg>';
  addStyle(div_shrink, {
    width: "32px",
    height: "32px",
    display: "inline-block",
    position: "absolute",
    bottom: "10px"
  });
  var isExpand = conversionBoolean(getCookie("github-markdown-toc-isShow"));
  div_shrink.addEventListener("click", function() {
    var div = _$("#toc"),
      w = div.clientWidth || div.offsetWidth;
    isExpand
      ? addStyle(div, {
          transform: "translateX(-" + w + "px)"
        })
      : addStyle(div, { transform: "translateX(0px)" });
    resetLayout(isExpand, w);
    isExpand = !isExpand;
    setCookie("github-markdown-toc-isShow", isExpand);
  });
  if (isExpand == false) {
    toc.setAttribute("style", "transform: translateX(-350px)");
  }
  toc.appendChild(div_shrink);
  return toc;
}

var resetLayout = function(isShow, w) {
  var $header = _$(".Header"),
    htmlMarginLeft = "0px",
    headerPaddingLeft = "0px",
    containerMarginLeft = "auto",
    rdContainerMarginLeft = "auto",
    jsRepoNavMarginLeft = "auto";
  if (!isShow) {
    if (w > containerClient.left) {
      htmlMarginLeft = w + "px";
      containerMarginLeft = "10px";
      rdContainerMarginLeft = "10px";
      jsRepoNavMarginLeft = "10px";
    } else {
      headerPaddingLeft = w + "px";
    }
  }
  document.getElementsByTagName("html")[0].style.marginLeft = htmlMarginLeft;
  $header.style.paddingLeft = headerPaddingLeft;
  $container.style.marginLeft = containerMarginLeft;
  $repoheadDetailsContainer.style.marginLeft = rdContainerMarginLeft;
  $jsRepoNav.style.marginLeft = jsRepoNavMarginLeft;
};

var conversionBoolean = function(val) {
  var obj = {
    true: true,
    false: false
  };
  return obj[val];
};

var setCookie = function(name, value) {
  document.cookie = name + "=" + escape(value);
};

var getCookie = function(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
};

// 这里是绑定resize事件的方法
function bindResize(el) {
  //初始化参数
  var els = _$("#toc").style;
  //鼠标的 X 和 Y 轴坐标
  x = 0;
  //邪恶的食指
  el.onmousedown = function(e) {
    //按下元素后，计算当前鼠标与对象计算后的坐标
    (x = e.clientX - el.offsetWidth), (y = e.clientY - el.offsetHeight);
    //在支持 setCapture 做些东东
    el.setCapture
      ? //捕捉焦点
        (el.setCapture(),
        //设置事件
        (el.onmousemove = function(ev) {
          mouseMove(ev || event);
        }),
        (el.onmouseup = mouseUp))
      : (function() {
          document.addEventListener("mousemove", mouseMove, false);
          document.addEventListener("mouseup", mouseUp, false);
        })();
    //防止默认事件发生
    e.preventDefault();
  };

  //移动事件
  function mouseMove(e) {
    //宇宙超级无敌运算中...
    var w = document.body.clientWidth;
    var w2 = e.clientX + "px";
    var minWidth = 200;
    var moveWidth = parseInt(e.clientX);
    if (moveWidth < 200) {
      return;
    }
    var $header = _$(".Header");

    if (moveWidth > minWidth && e.clientX > containerClient.left) {
      document.getElementsByTagName("html")[0].style.marginLeft = w2;
      $header.style.paddingLeft = 0 + "px";
      // $container.style.marginLeft = '10px';
      $container.style.marginLeft = "10px";
      $repoheadDetailsContainer.style.marginLeft = "10px";
      $jsRepoNav.style.marginLeft = "10px";
    } else {
      $header.style.paddingLeft = moveWidth + "px";
      document.getElementsByTagName("html")[0].style.marginLeft = 0;
      $container.style.marginLeft = "auto";
      $repoheadDetailsContainer.style.marginLeft = "auto";
      $jsRepoNav.style.marginLeft = "auto";
    }
    els.width = e.clientX + "px";
  }
  //停止事件
  function mouseUp() {
    //在支持 releaseCapture 做些东东
    el.releaseCapture
      ? //释放焦点
        (el.releaseCapture(),
        //移除事件
        (el.onmousemove = el.onmouseup = null))
      : (function() {
          document.removeEventListener("mousemove", mouseMove);
          document.removeEventListener("mouseup", mouseUp);
        })();
  }
}
