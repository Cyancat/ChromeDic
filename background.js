// TODO: make a global config var for {id, name, url, (type)}, and foreach to generate the items.
// TODO: make a config button.
// TODO: add shortcut key, configable certainly.

/* TODO: default dic queue:
 * http://www.weblio.jp/content/
 * http://kotobank.jp/search/result?q=
 */
var parent = chrome.contextMenus.create({"title": "邪王真眼(回_,・)", "contexts":["selection"]});
var child1 = chrome.contextMenus.create(
  {"id": "c_chromedi_01", "title": "Dictcn", "parentId": parent, "contexts":["selection"], "onclick": dragit});
var child2 = chrome.contextMenus.create(
  {"parentId": parent, "contexts":["selection"], type: "separator"});
var child2 = chrome.contextMenus.create(
  {"id": "c_chromedi_02","title": "Yahoo辞書", "parentId": parent, "contexts":["selection"], "onclick": dragit});

var type_id = null;
var type_urls = {
  "c_chromedi_01": "http://dict.cn/",
  "c_chromedi_02": "http://dic.search.yahoo.co.jp/search?ei=UTF-8&fr=dic&p="
}

function dragit(info, tab){
  type_id = info.menuItemId;
  chrome.tabs.executeScript(null, {file: "getsel.js"});
}

chrome.extension.onConnect.addListener(function(port) {
  //var tab = port.sender.tab;

  // This will get called by the content script we execute in
  // the tab as a result of the user pressing the browser action.
  port.onMessage.addListener(function(info) {
    chrome.tabs.create({url: type_urls[type_id] + encodeURIComponent(info)});
  });
});