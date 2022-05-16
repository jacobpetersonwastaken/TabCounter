// gets all of the html elements
let tabsCurrentlyOpenData = document.getElementById("tabsCurrentlyOpenData");
let tabsOpenedTodayData = document.getElementById("tabsOpenedTodayData");
let tabsLeftOpenData = document.getElementById("tabsLeftOpenData");
let tabsLeftOpenStreakData = document.getElementById("tabsLeftOpenStreakData");
let tabsOpenedSinceInstallData = document.getElementById("tabsOpenedSinceInstallData");
// gets num of tabs currently open and displays it
chrome.storage.sync.get("tabsCurrentlyOpenData", function(result) {
    var tabsOpen = result["tabsCurrentlyOpenData"]
    tabsCurrentlyOpenData.textContent = String(tabsOpen);
});
// gets num of tabs that have been opened and displays it
chrome.storage.sync.get("tabsOpenedTodayData", function(result) {
    var openedToday = result["tabsOpenedTodayData"]
    tabsOpenedTodayData.textContent = String(openedToday);
});
// gets num of tabs left open and displays it
chrome.storage.sync.get("tabsLeftOpenData", function(result) {
    var leftOpen = result["tabsLeftOpenData"]
    tabsLeftOpenData.textContent = String(leftOpen);
});
// gets num of the tab open streak and displays it
chrome.storage.sync.get("tabsLeftOpenStreakData", function(result) {
    var leftOpenStreak = result["tabsLeftOpenStreakData"]
    tabsLeftOpenStreakData.textContent = String(leftOpenStreak);
});
// gets num of tabs opened since install and displays it
chrome.storage.sync.get("tabsOpenedSinceInstallData", function(result) {
    var tabsSinceInstall = result["tabsOpenedSinceInstallData"]
    tabsOpenedSinceInstallData.textContent = String(tabsSinceInstall);
});