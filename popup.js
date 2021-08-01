chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    message.innerText = request.source;
  }
});


function onWindowLoad() {

  //const tabId = getTabId();
  var message = document.querySelector('#message');

  chrome.scripting.executeScript({
  target: {tabId: null},
  files: ["getPagesSource.js"]
  }, ()=> {
    console.log('Pop up hit');
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;