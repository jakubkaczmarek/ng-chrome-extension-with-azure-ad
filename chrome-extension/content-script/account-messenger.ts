import { CommonAccountService } from '../src/app/common/services/common-account.service';

export class AccountMessenger {
    private commonAccountService: CommonAccountService;
    constructor() {
        this.commonAccountService = new CommonAccountService();
        this.initializeSigninListener();
        this.initializeSignoutListener();
    }
    initializeSigninListener() {
        const loginUrl = this.commonAccountService.getLoginUrl();
        if (window.location.href.indexOf(loginUrl) < 0) {
            return;
        }
        const loggedIn = this.commonAccountService.isUserLoggedIn();
        if (!loggedIn) {
            return;
        }
        const adalData = this.getAdalLocalStorageData();
        const message = {
            'command': 'signInAndRedirectToHomepage',
            'adalData': adalData
        };
        this.performEventPageRequest(message);
    }
    initializeSignoutListener() {
        const logoutUrl = this.commonAccountService.getLogoutUrl();
        if (window.location.href.indexOf(logoutUrl) < 0) {
            return;
        }
        const loggedIn = this.commonAccountService.isUserLoggedIn();
        if (loggedIn) {
            return;
        }
        const message = {
            'command': 'signOutAndRedirectToHomepage'
        };
        this.performEventPageRequest(message);
    }
    getAdalLocalStorageData() {
        const result = {};
        for (const key in localStorage) {
            if (this.commonAccountService.isAccountKey(key)) {
                result[key] = localStorage[key];
            }
        }
        return result;
    }
    performEventPageRequest(message) {
        chrome.runtime.sendMessage(message);
    }
}
