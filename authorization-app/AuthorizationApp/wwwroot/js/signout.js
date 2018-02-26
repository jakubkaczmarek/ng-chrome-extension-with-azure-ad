(function () {
    var adalConfig = window.adalConfig;
    var authContext = new AuthenticationContext(adalConfig);
    var user = authContext.getCachedUser();
    if (user) {
        authContext.logOut();
    }
    else {
        localStorage.setItem('loggedIn', 'false');
    }
}());
