import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './routing/app-routing.module';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SinkComponent } from './404/404.component';
import { ArticlesComponent } from './articles/articles.component';
import { EventsComponent } from './events/events.component';
import { MailsComponent } from './mails/mails.component';
import { AccountingComponent } from './accounting/accounting.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    SinkComponent,
    ArticlesComponent,
    EventsComponent,
    MailsComponent,
    AccountingComponent,
    SubscriptionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent, NavComponent]
})
export class AppModule { }
