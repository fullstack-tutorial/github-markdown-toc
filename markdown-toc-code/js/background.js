chrome.browserAction.setBadgeText({ text: 'new' });
chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
chrome.browserAction.onClicked.addEventListener(claaback);

function claaback() {
	console.log(1);
}
chrome.runtime.onMessage.addEventListener(bk);
function bk() {
	console.log("hello")
}



// // 右键菜单管理
// chrome.contextMenus.create({
// 	"type": "radio",
// 	"title": "切换绝对路径抓取",
// 	"checked": false,
// 	"onclick": switch_absolute_xpath   // 点击时调用方法
// });
// chrome.contextMenus.create({
// 	"type": "radio",
// 	"title": "切换NCC路径抓取",
// 	"checked": true,
// 	"onclick": switch_ncc_xpath
// });
// // 参数会传递 tab 信息，通过 tab.id 可以获取用户是在到那个页面里点击我们菜单选项的
// function switch_absolute_xpath(info, tab) {
// 	// 然后我通过 tab.id 给对应页面传递消息
// 	chrome.tabs.sendMessage(tab.id, { type: 'switch_absolute_xpath' });
// }
// function switch_ncc_xpath(info, tab) {
// 	chrome.tabs.sendMessage(tab.id, { type: 'switch_ncc_xpath' });
// }


chrome.contextMenus.create({
	id: 'baidu-search',
	title: '使用度娘搜索：%s',
	contexts: ['selection']
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
	switch (info.menuItemId) {
		case 'baidu-search':
			chrome.tabs.create({ url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(info.selectionText) });
			break;
	}
});


