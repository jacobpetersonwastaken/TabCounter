// gets all of the html elements
const tabsCurrentlyOpenData = document.getElementById("tabsCurrentlyOpenData");
const tabsOpenedTodayData = document.getElementById("tabsOpenedTodayData");
const tabsLeftOpenData = document.getElementById("tabsLeftOpenData");
const tabsLeftOpenStreakData = document.getElementById("tabsLeftOpenStreakData");
const tabsOpenedSinceInstallData = document.getElementById("tabsOpenedSinceInstallData");

//link elements
const discordButton = document.getElementById("discord");
const redditButton = document.getElementById("reddit");
const donateButton = document.getElementById("donate");

//animated gif
const background = document.getElementById("popupContainer");
const globalButton = document.getElementById("globalScore");
const loginButton = document.getElementById("loginButton");

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

//links
    // onClick's logic below:
    discordButton.addEventListener('click', function() {
        var newURL = "https://discord.gg/RUVzxYCeHa";
        chrome.tabs.create({ url: newURL });
    });
    redditButton.addEventListener('click', function() {
        var newURL = "https://www.reddit.com/r/melockchain/";
        chrome.tabs.create({ url: newURL });
    });
    donateButton.addEventListener('click', function() {
        var newURL = "https://tabcounter.com/donate";
        chrome.tabs.create({ url: newURL });
    });

donateButton.addEventListener("mouseover", () => playgif());
donateButton.addEventListener("mouseleave", ()=> stopgif());
function playgif() {
    background.style.backgroundImage = "url(images/moneygif.gif)";
}
function stopgif(){
    background.style.backgroundImage = "none";
    background.style.backgroundColor = "222831";
}




globalButton.addEventListener("mouseover", () => playcomingsoon());
globalButton.addEventListener("mouseleave", ()=> stopcomingsoon());

loginButton.addEventListener("mouseover", () => playcomingsoon());
loginButton.addEventListener("mouseleave", ()=> stopcomingsoon());


function playcomingsoon() {
    background.style.backgroundImage = "url(images/comingsoongif.gif)";
}
function stopcomingsoon(){
    background.style.backgroundImage = "none";
    background.style.backgroundColor = "222831";
}
