import { Component, ViewChild } from '@angular/core';
import { AccountingService } from './accounting.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css'],
  providers: [AccountingService]
})
export class AccountingComponent{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  private bookings: Booking[];
  private companys: Company[];

  private orderById=0;
  private orderByData = [
    {"name": "date", "dir":"DESC"},
    {"name": "date", "dir":"ASC"},
    {"name": "subject", "dir":"ASC"},
    {"name": "subject", "dir":"DESC"},
    {"name": "amount", "dir":"ASC"},
    {"name": "amount", "dir":"DESC"},
  ]

  public lineChartData:Array<any> = [
    {data: [65, 65, 85.25, 126.36, 104.26, 137.26, 169.35], label: 'Kontostand in €'},
  ];
  public lineChartLabels:Array<any> = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';


  constructor(private accountingService: AccountingService){
    accountingService.getBookings()
    .then((result) => {
      this.bookings = result;
      console.log(result);
      var monthlyBalances = accountingService.calculateMonthlyBalances(result);
      console.log(monthlyBalances);
      this.lineChartData = monthlyBalances['datasets'];
      this.lineChartLabels = monthlyBalances['labels'];           
      this.chart.chart.config.data.labels = monthlyBalances['labels'];
      this.chart.chart.config.data.datasets = monthlyBalances['datasets'];
      this.chart.chart.update();
      console.log(this.chart);
    });
  }

  openBooking(booking) {
    console.log(booking);
  }
}

export class Booking {
  constructor(public subject: String, public debtor: Company, public creditor: Company, public amount: Number, public date: Date, public id?: Number){

  }

  save(): Promise<{}> {
    return new Promise(function(resolve, reject){
      resolve({success: true, error: ''});
    });
  }
}

export class Invoice {
  constructor(public debtor: Number, public amount: Number, public id?: Number){
    
  }

  save(): Promise<{}> {
    return new Promise(function(resolve, reject){
      resolve({success: true, error: ''});
    });
  }
}

export class Company {
  constructor(public name: String, public adress: String, public id?: Number){

  }
}