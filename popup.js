// gets all of the html elements
const tabsCurrentlyOpenData = document.getElementById("tabsCurrentlyOpenData");
const tabsOpenedTodayData = document.getElementById("tabsOpenedTodayData");
const tabsLeftOpenData = document.getElementById("tabsLeftOpenData");
const tabsLeftOpenStreakData = document.getElementById("tabsLeftOpenStreakData");
const tabsOpenedSinceInstallData = document.getElementById("tabsOpenedSinceInstallData");
const globalButton = document.getElementById("globalScore");

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



// Takes you to the global scores page
globalButton.addEventListener("click", () => {
    // location.href = "popupGlobal.html"
    // send signal to fetch data on the background. js file
    chrome.runtime.sendMessage({ command: "yup" }, function(response) {
        console.log(response, " this is the mother fucking response")

    });

});