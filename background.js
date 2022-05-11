// on install listener
// on extension install counts current tabs open sets default values and saves
chrome.runtime.onInstalled.addListener(() => {
    // counts how many tabs are currently open
    chrome.tabs.query({ windowType: 'normal' }, function(tabs) {
        var tabsCurrentlyOpenData = tabs.length
            // saves the currently open tabs and tabs open
        var tabsOpenedTodayData = 0
        var tabsLeftOpenData = 0
        var tabsLeftOpenStreakData = 0
        var tabsOpenedSinceInstallData = 0
        chrome.storage.sync.set({ "tabsCurrentlyOpenData": tabsCurrentlyOpenData });
        chrome.storage.sync.set({ "tabsOpenedTodayData": tabsOpenedTodayData });
        chrome.storage.sync.set({ "tabsLeftOpenData": tabsLeftOpenData });
        chrome.storage.sync.set({ "tabsLeftOpenStreakData": tabsLeftOpenStreakData });
        chrome.storage.sync.set({ "tabsOpenedSinceInstallData": tabsOpenedSinceInstallData });
    });
});
// new tab listener
// on new tab opened we count then update tabs opened today then save
chrome.tabs.onUpdated.addListener(function(tavId, changeInfo, tab) {
    // once tab open is complete
    if (changeInfo.status == 'complete') {
        chrome.tabs.query({ windowType: 'normal' }, function(tabs) {
            var tabsCurrentlyOpenData = tabs.length
                // saves the number of tabs currently open
            chrome.storage.sync.set({ "tabsCurrentlyOpenData": tabsCurrentlyOpenData });
            // updates the number of tabs opened today
            chrome.storage.sync.get("tabsOpenedTodayData", function(result) {
                var tabsOpen = result["tabsOpenedTodayData"] + 1
                chrome.storage.sync.set({ "tabsOpenedTodayData": tabsOpen });
            });
        });
    }
});
// close tab listener
// when user closes tab we updates the count then save
chrome.tabs.onRemoved.addListener(function() {
    chrome.tabs.query({ windowType: 'normal' }, function(tabs) {
        var tabsCurrentlyOpenData = tabs.length
            // updates the currently open tabs
        chrome.storage.sync.set({ "tabsCurrentlyOpenData": tabsCurrentlyOpenData });
    });
});
// function updates all of the values at 12AM.
function nextDayUpdate() {
    // opens tabs opened today and tabs since installed 
    chrome.storage.sync.get("tabsOpenedSinceInstallData", ({ tabsOpenedSinceInstallData }) => {
        chrome.storage.sync.get("tabsOpenedTodayData", ({ tabsOpenedTodayData }) => {
            // addes tabs opened today to tabs opened since install
            var sumNum = tabsOpenedSinceInstallData + tabsOpenedTodayData
            chrome.storage.sync.set({ "tabsOpenedSinceInstallData": sumNum });
            // resets tabs open today
            var tabsOpenedTodayData = 0
            chrome.storage.sync.set({ "tabsOpenedTodayData": tabsOpenedTodayData });
        });
    });
    // opens currently open tabs, tabs left open and  tabs left open streak
    chrome.storage.sync.get("tabsCurrentlyOpenData", ({ tabsCurrentlyOpenData }) => {
        var currentOpenTabs = tabsCurrentlyOpenData
        chrome.storage.sync.get("tabsLeftOpenData", ({ tabsLeftOpenData }) => {
            chrome.storage.sync.get("tabsLeftOpenStreakData", ({ tabsLeftOpenStreakData }) => {
                var leftOpenTabs = tabsLeftOpenData
                var streakNum = tabsLeftOpenStreakData
                    // if the amount of current tabs open are less than the tabs that were 
                    // left open then we reset the streak counter
                if (currentOpenTabs < leftOpenTabs) {
                    // reset streak, set tabs left open to current
                    streakNum = 0
                    chrome.storage.sync.set({ "tabsLeftOpenStreakData": streakNum });
                    chrome.storage.sync.set({ "tabsLeftOpenData": currentOpenTabs });
                } else {
                    // adds to streak
                    streakNum += 1
                    chrome.storage.sync.set({ "tabsLeftOpenStreakData": streakNum });
                    chrome.storage.sync.set({ "tabsLeftOpenData": currentOpenTabs });
                }
            });
        });
    });
}
// function gets the current time then the timestamp for tomorrow at 12AM and saves it
function updateTimeStamp() {
    // Gets tomorrows time stamp
    let tomorrow = new Date();
    let tomorrowDate = new Date().getDate() + 1
    tomorrow.setDate(tomorrowDate);
    // update time to 12AM or 00:00
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
    tomorrow.setMilliseconds(0);
    // Save the new timestamp
    var timeStamp = tomorrow.getTime();
    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    // Test time below
    // var testTimeStamp = 1652222142
    chrome.storage.sync.set({ "timeStamp": timeStamp });
}
// Function checks if it's a new day yet.
function checkTimestamp() {
    chrome.storage.sync.get("timeStamp", ({ timeStamp }) => {
        // If it's a brand new install and nothing there we run it.
        if (!timeStamp) {
            updateTimeStamp();
        } else {
            // If the time now is greater than the time stamp (its past 12AM)
            // then we will update the data and get a new timestamp for the next day
            if (Date.now() >= timeStamp) {
                nextDayUpdate();
                updateTimeStamp();
            }
        }
    });
}
//Runs every 2 minutes 
setInterval(checkTimestamp, 120000)