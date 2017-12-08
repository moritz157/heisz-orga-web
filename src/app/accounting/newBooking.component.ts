import { Component } from '@angular/core';
import { AccountingService } from './accounting.service';
import { AccountingComponent } from 'app/accounting/accounting.component';

@Component({
  selector: 'newBooking',
  templateUrl: './newBooking.component.html',
  styleUrls: ['./newBooking.component.css'],
  providers: [ AccountingService ]
})
export class NewBookingComponent{
    private companys = [];

    constructor(private accountingService: AccountingService){
        this.companys = accountingService.getCompanys();
    }
}
