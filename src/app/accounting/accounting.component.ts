import { Component, ViewChild, OnInit } from '@angular/core';
import { AccountingService, Booking, Company, Invoice } from './accounting.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css'],
  providers: [AccountingService]
})
export class AccountingComponent implements OnInit{
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
    
  }

  ngOnInit() {
    this.accountingService.getBookings()
    .then((result) => {
      console.log("This.chart:", this.chart);
      this.bookings = result;
      console.log(result);
      var monthlyBalances = this.accountingService.calculateMonthlyBalances(result);
      console.log(monthlyBalances);
      this.lineChartData = monthlyBalances['datasets'];
      this.lineChartLabels = monthlyBalances['labels'];           
      this.chart.chart.config.data.labels = monthlyBalances['labels'];
      this.chart.chart.config.data.datasets = monthlyBalances['datasets'];
      this.chart.chart.update();
    });
  }

  openBooking(booking) {
    console.log(booking);
  }
}

