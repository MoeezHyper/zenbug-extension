// Background script for Chrome extension
chrome.action.onClicked.addListener((tab) => {
  // Inject content script when extension icon is clicked
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "captureTab") {
    chrome.tabs.captureVisibleTab(
      sender.tab.windowId,
      { format: "png" },
      (dataUrl) => {
        sendResponse({ screenshot: dataUrl });
      }
    );
    return true; // Keep channel open for async response
  }
});
