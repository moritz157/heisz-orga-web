import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routing/app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SinkComponent } from './404/404.component';
import { ArticlesComponent } from './articles/articles.component';
import { EventsComponent } from './events/events.component';
import { MailsComponent } from './mails/mails.component';
import { AccountingComponent } from './accounting/accounting.component';
import { NewBookingComponent } from './accounting/newBooking.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './events/calendar.component';

import { ChartsModule } from 'ng2-charts';

import { AccountingService } from './accounting/accounting.service';
import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';
import { ArticleService } from './services/article.service';

import { OrderByPipe } from './pipes/orderBy.pipe';
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
    NewBookingComponent,
    SubscriptionsComponent,
    LoginComponent,
    CalendarComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [
    AccountingService,
    OrderByPipe,
    AuthService,
    EventService,
    ArticleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
