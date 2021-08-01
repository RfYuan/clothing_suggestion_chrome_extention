// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log("Got "+msg.text)
    /*
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    */            
    // If the received message has the expected format...
    if (msg.text === 'report_back') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        sendResponse(document.all[0].outerHTML);
    }
});