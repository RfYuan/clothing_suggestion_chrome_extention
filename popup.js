// Initialize button with users's prefered color
let changeColor = document.getElementById("changeColor");
const buttonOptions = document.getElementById("buttonDiv");
const selectedClassName = "current";
const buttonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

function handleButtonClick(e){
    const current = e.target.parentElement.querySelector(`.${selectedClassName}`);
    if (current && current !== e.target){
        current.classList.remove(selectedClassName);
    }
    
    const color = e.target.dataset.color;
    e.target.classList.add(selectedClassName);
    chrome.storage.sync.set({color});
    changeColor.style.backgroundColor = color;
}

function constructOptions(buttonColors) {
    chrome.storage.sync.get("color",(data) => {
        const currentColor = data.color;
          console.log('Default background color set to %cgreen', `color: ${currentColor}`);

        for (let buttonColor of buttonColors){
            const button = document.createElement("button");
            button.dataset.color = buttonColor;
            button.style.backgroundColor = buttonColor;
           
           if (buttonColor === currentColor){
               button.classList.add(selectedClassName);
           }
           
           button.addEventListener("click", handleButtonClick);
           buttonOptions.appendChild(button);
        }  
    })
}

constructOptions(buttonColors)
;

/*
// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
*/
