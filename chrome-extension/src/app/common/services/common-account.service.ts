import { Authentication, AuthenticationContext, AdalConfig, User } from 'adal-ts';
import { environment } from '../../../environments/environment';

export class CommonAccountService {
    private baseUrl = environment.authAppBaseUrl;
    private loggedInKey = 'loggedIn';
    public userExistsAndIsNotExpired(): boolean {
        const user = this.getAuthorizedUser();
        if (!user) {
            return false;
        }
        const isTokenExpired = this.isAuthorizationTokenExpired(user.exp);
        return !isTokenExpired;
    }
    public isUserLoggedIn(): boolean {
        const loggedInValue = localStorage.getItem(this.loggedInKey);
        const loggedIn = loggedInValue === 'true';
        return loggedIn;
    }
    public getUserName(): string {
        const user = this.getAuthorizedUser();
        let result = '';
        if (user) {
            result = user.name;
        }
        return result;
    }
    public redirectToLoginPage() {
        this.openUrlInCurrentTab(this.getLoginUrl());
    }
    public redirectToLogoutPage() {
        this.openUrlInCurrentTab(this.getLogoutUrl());
    }
    public getLoginUrl(): string {
        return this.getAuthorizationAppUrl('home/signin');
    }
    public getLogoutUrl(): string {
        return this.getAuthorizationAppUrl('home/signout');
    }
    public isAccountKey(key: string): boolean {
        return key.indexOf('adal.') >= 0 || key === this.loggedInKey;
    }
    getAuthorizedUser(): User {
        return this.getAuthenticationContext().getUser();
    }
    getAuthorizationAppUrl(relativePath: string) {
        if (relativePath[0] !== '/') {
            relativePath = '/' + relativePath;
        }
        return this.baseUrl + relativePath;
    }
    openUrlInCurrentTab(targetUrl) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.update(tabs[0].id, { url: targetUrl });
        });
    }
    getAuthenticationContext(): AuthenticationContext {
        return Authentication.getContext(new AdalConfig('', '', ''));
    }
    isAuthorizationTokenExpired(expirationTimestamp: number): boolean {
        if (!expirationTimestamp) {
            return true;
        }
        const expirationDate = new Date(expirationTimestamp * 1000);
        const currentDate = new Date();
        return currentDate > expirationDate;
    }
}
