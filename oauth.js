window.onload = function() {
    const loginButton = document.getElementById("loginButton");
    loginButton.addEventListener('click', function() {
        chrome.identity.getAuthToken({ interactive: true }, function(token) {
            console.log(token);
        });
    });
};