// Inject ZenBug widget only once
if (!document.getElementById("zenbug-script")) {
  const script = document.createElement("script");
  script.id = "zenbug-script"; // prevent duplicate injection
  script.src = chrome.runtime.getURL("zenbug.js");
  document.head.appendChild(script);
}

// Listen for screenshot requests from the page
window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data?.type === "ZENBUG_SCREENSHOT_REQUEST") {
    chrome.runtime.sendMessage({ action: "captureTab" }, (response) => {
      window.postMessage(
        { type: "ZENBUG_SCREENSHOT_RESPONSE", data: response?.screenshot },
        "*"
      );
    });
  }
});
