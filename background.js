chrome.action.onClicked.addListener((tab) => {
  if (tab.url && tab.url.includes("myworkdayjobs.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => alert("This extension works only on Workday pages.")
    });
  }
});
