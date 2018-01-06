import { Component } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  public user = {"name":"Moritz", "surname":"Ahrens"}
  public accounting = {money: "321,57 €"};
  tasks: Object[] = [
    {"color":"#f44336", "name":"Gesamtlayout machen"},
    {"color":"#4caf50", "name":"Plakate gestalten"},
    {"color":"#2196f3", "name":"Plakate gestalten"},
    {"color":"#ffeb3b", "name":"Plakate gestalten"},
    {"color":"#ffa726", "name":"Plakate gestalten"},
  ]
  nextEvents: Object[] = [
    {name: "Heiligabend", date: "24.12.2017"},
    {name: "Heiligabend", date: "24.12.2017"}
  ];
  mails: Object[] = [
    {from:"Matthias Hansen ab cdefghijklmnop", subject: "Schülerzeitung: Terminänderung"},
    {from:"Matthias Hansen", subject: "Fwd: Druck"}
  ]
  
  constructor(){
    for(var i=0;i<this.mails.length;i++){
      if(this.mails[i]['from'].length>21){
        this.mails[i]['cut']=this.mails[i]['from'].substr(0, 18)+'...';
      }
    }
  }

  openMail(mail): void {
    console.log("Opening mail:", mail)
  }

    // Doughnut
  public doughnutChartLabels:string[] = ['In Arbeit', 'fast Fertig', 'in Redigation', 'Fertig', 'geändert'];
  public doughnutChartData:number[] = [7, 11, 5, 6, 2];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartColors:any[] = [{
    backgroundColor: ['#f1c232', '#5ecb30', '#5ecb30', '#499b26', '#cc0000']
  }];
  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }

  public lineChartData:Array<any> = [
    {data: [65, 65, 85.25, 126.36, 104.26, 137.26, 169.35], label: 'Kontostand in €'},
  ];
  public lineChartLabels:Array<any> = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli'];
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
}
