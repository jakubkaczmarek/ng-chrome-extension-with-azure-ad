import { Component, OnInit } from '@angular/core';
import { CommonAccountService } from '../common/services/common-account.service';

@Component({
    selector: 'app-event-page',
    templateUrl: './event-page.component.html',
    styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
    constructor(private accountService: CommonAccountService) { }
    ngOnInit() {
        this.addMessageListener();
    }
    addMessageListener() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            switch (request.command) {
            case 'signInAndRedirectToHomepage': this.signInAndRedirectToHomepage(request.adalData);
                break;
            case 'signOutAndRedirectToHomepage': this.signOutAndRedirectToHomepage();
                break;
            default: return;
            }
        });
    }
    signInAndRedirectToHomepage(adalData) {
        this.updateAdalData(adalData);
        this.redirectToHomepage();
    }
    signOutAndRedirectToHomepage() {
        this.clearAdalData();
        this.redirectToHomepage();
    }
    redirectToHomepage() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            const homepageUrl = chrome.extension.getURL('index.html#/homepage');
            chrome.tabs.update(tab.id, { url: homepageUrl });
        });
    }
    updateAdalData(adalData) {
        for (const key in adalData) {
            const value = adalData[key];
            localStorage.setItem(key, value);
        }
    }
    clearAdalData() {
        for (const key in localStorage) {
            if (this.accountService.isAccountKey(key)) {
                localStorage.removeItem(key);
            }
        }
    }
}
