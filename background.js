// on install listener
// on extension install counts current tabs open sets default values and saves
chrome.runtime.onInstalled.addListener(() => {
    // saves the currently open tabs and tabs open
    chrome.storage.sync.get("tabsCurrentlyOpenData", ({ tabsCurrentlyOpenData }) => {
        if (!tabsCurrentlyOpenData) {
            chrome.storage.sync.set({ "tabsCurrentlyOpenData": 0 });
        }
    });
    chrome.storage.sync.get("tabsOpenedTodayData", ({ tabsOpenedTodayData }) => {
        if (!tabsOpenedTodayData) {
            chrome.storage.sync.set({ "tabsOpenedTodayData": 0 });
        }
    });
    chrome.storage.sync.get("tabsLeftOpenData", ({ tabsLeftOpenData }) => {
        if (!tabsLeftOpenData) {
            chrome.storage.sync.set({ "tabsLeftOpenData": 0 });
        }
    });
    chrome.storage.sync.get("tabsLeftOpenStreakData", ({ tabsLeftOpenStreakData }) => {
        if (!tabsLeftOpenStreakData) {
            chrome.storage.sync.set({ "tabsLeftOpenStreakData": 0 });
        }
    });
    chrome.storage.sync.get("tabsOpenedSinceInstallData", ({ tabsOpenedSinceInstallData }) => {
        if (!tabsOpenedSinceInstallData) {
            chrome.storage.sync.set({ "tabsOpenedSinceInstallData": 0 });
        }
    });



});
// Any change listener
// On any update we check for tabs currently open then save.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    // once tab open is complete
    if (changeInfo.status == 'complete') {
        // checks the time stamp on open of new page
        checkTimestamp()
        chrome.tabs.query({ windowType: 'normal' }, function(tabs) {
            var tabsCurrentlyOpenData = tabs.length
                // saves the number of tabs currently open
            chrome.storage.sync.set({ "tabsCurrentlyOpenData": tabsCurrentlyOpenData });

        });
    }
});
// Tab opened listener
// On new tab opened we update the count and save data.
chrome.tabs.onCreated.addListener(function(tab) {
    // updates the number of tabs opened today
    chrome.storage.sync.get("tabsOpenedTodayData", function(result) {
        var tabsOpen = result["tabsOpenedTodayData"] + 1
        chrome.storage.sync.set({ "tabsOpenedTodayData": tabsOpen });
    });
});
// close tab listener
// when user closes tab we updates the count then save
chrome.tabs.onRemoved.addListener(function() {
    // checks the time stamp on close
    checkTimestamp()
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
            var tabsOpenedToday = 0
            chrome.storage.sync.set({ "tabsOpenedTodayData": tabsOpenedToday });
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
    // var testTimeStamp = 1652413666
    chrome.storage.sync.set({ "timeStamp": timeStamp });
}
// Function checks if it's a new day yet.
function checkTimestamp() {
    chrome.storage.sync.get("timeStamp", ({ timeStamp }) => {
        // ******************************************************************logging here
        // console.log("this is the time stamp", timeStamp)
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
setInterval(checkTimestamp, 60000)