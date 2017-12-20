import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SinkComponent } from '../404/404.component';
import { ArticlesComponent } from '../articles/articles.component';
import { EventsComponent } from '../events/events.component';
import { MailsComponent } from '../mails/mails.component';
import { AccountingComponent } from '../accounting/accounting.component';
import { SubscriptionsComponent } from '../subscriptions/subscriptions.component';
import { NewBookingComponent } from '../accounting/newBooking.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'events', component: EventsComponent },
  { path: 'mails', component: MailsComponent },
  { path: 'accounting', component: AccountingComponent },
  { path: 'newBooking', component: NewBookingComponent },
  { path: 'booking/:id', component: NewBookingComponent },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: SinkComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}