// background.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "key_pressed" ) {
      console.log(request.key);
      console.log(request.key2);
      switch (request.key) {
        case "Q":
        popTab(sender.tab.windowId);
        break;
      }
    }
  }
);

function popTab(windowId){
  let id;
  chrome.tabs.query({currentWindow: true, active: true }, function (tabArray) {
    id = tabArray[0].id;
  });
  chrome.windows.get(windowId, {}, function(oldWin){
    chrome.windows.create({
      top: oldWin.top,
      left: oldWin.left,
      width: oldWin.width,
      height: oldWin.height,
      focused: true
    }, function(newWin){
      chrome.tabs.query({currentWindow: true, active: true }, function (tabArray) {
        newWindowId = tabArray[0].id;
        chrome.tabs.move(id, { windowId: newWin.id, index: -1}, function(){
          chrome.tabs.remove(newWindowId, function(){});
        });
      });
    });
  })
}