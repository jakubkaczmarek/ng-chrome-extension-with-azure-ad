import { Component, OnInit } from '@angular/core';
import { CommonAccountService } from '../common/services/common-account.service';
@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
    userName: string;
    loggedIn: boolean;
    constructor(private accountService: CommonAccountService) {
        this.loggedIn = accountService.userExistsAndIsNotExpired();
        if (this.loggedIn) {
            this.userName = accountService.getUserName();
        }
    }
    ngOnInit() { }
    login() {
        this.accountService.redirectToLoginPage();
    }
    logout() {
        this.accountService.redirectToLogoutPage();
    }
}
