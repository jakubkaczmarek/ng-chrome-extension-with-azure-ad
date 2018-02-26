import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EventPageComponent } from './event-page/event-page.component';
import { PopupComponent } from './popup/popup.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonAccountService } from './common/services/common-account.service';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    EventPageComponent,
    PopupComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
  ],
  providers: [CommonAccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
