(function () {
    var adalConfig = window.adalConfig;
    var authContext = new AuthenticationContext(adalConfig);
    var isCallback = authContext.isCallback(window.location.hash);
    authContext.handleWindowCallback();
    if (isCallback && !authContext.getLoginError()) {
        window.location = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
    }

    if (!authContext.getLoginError() && authContext.getCachedUser() != null) {
        localStorage.setItem('loggedIn', 'true');
    }
    window.onhashchange = function () {
        loadView(stripHash(window.location.hash));
    };
    window.onload = function () {
        $(window).trigger("hashchange");
    };
    function loadView(view) {
        if (!authContext.getCachedUser()) {
            authContext.config.redirectUri = window.location.href;
            authContext.login();
            return;
        }
    }
    function stripHash(view) {
        return view.substr(view.indexOf('#') + 1);
    }
}());
