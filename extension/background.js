
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "analyzeSpectral",
    title: "Analyze Spectral Fingerprint",
    contexts: ["image"] 
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "analyzeSpectral") {
    chrome.storage.local.set({ targetImageUrl: info.srcUrl }, () => {
      chrome.action.openPopup();
    });
  }
});