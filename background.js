// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "POST_CONTENT") {
    console.log("Received post content:", message.content);
    // You can add additional processing here if needed
  }
});
