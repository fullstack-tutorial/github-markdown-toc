 chrome.browserAction.setBadgeText({text: 'new'});
 chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
chrome.browserAction.onClicked.addEventListener(claaback);
function claaback(){
	console.log(1);
}
chrome.runtime.onMessage.addEventListener(bk);
function bk(){
	console.log("hello")
}