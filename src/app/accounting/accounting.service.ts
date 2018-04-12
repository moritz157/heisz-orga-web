import { Injectable } from '@angular/core';
//import { Booking, Invoice, Company } from './accounting.component';
import { OrderByPipe } from '../pipes/orderBy.pipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { reject } from 'q';

@Injectable()
export class AccountingService {
  constructor(private orderByPipe: OrderByPipe, private http: HttpClient, private auth: AuthService){

  }
  private bookingsJson: Object[] = [{
      "id": 1,
      "subject": "Anzeige Schülerzeitung DIN A4 U4",
      "debtor": 8,
      "creditor": 1,
      "amount": 107.16,
      "date": "2017-10-08 11:54:47"
    }, {
      "id": 2,
      "subject": "Veum, Cole and Lemke",
      "debtor": 6,
      "creditor": 2,
      "amount": 35.32,
      "date": "2017-06-16 02:14:24"
    }, {
      "id": 3,
      "subject": "Lesch LLC",
      "debtor": 4,
      "creditor": 1,
      "amount": 26.0,
      "date": "2017-08-13 20:06:27"
    }, {
      "id": 4,
      "subject": "Kiehn-Harber",
      "debtor": 4,
      "creditor": 1,
      "amount": 16.43,
      "date": "2017-10-29 14:59:51"
    }, {
      "id": 5,
      "subject": "Adams-Friesen",
      "debtor": 2,
      "creditor": 10,
      "amount": 63.37,
      "date": "2017-07-30 15:40:55"
    }, {
      "id": 6,
      "subject": "Renner, Hilpert and VonRueden",
      "debtor": 7,
      "creditor": 1,
      "amount": 10.81,
      "date": "2017-10-30 04:53:52"
    }
  ];
  
  private companysJson: Object[] = [{
      "id": 1,
      "name": "Heisz",
      "address": "Wilhelm-Metzger Straße 4, 22297 Hamburg"
    }, {
      "id": 2,
      "name": "Reilly-Sanford",
      "address": "64868 Crowley Way"
    }, {
      "id": 3,
      "name": "Nicolas, Gottlieb and Brakus",
      "address": "0 Hansons Parkway"
    }, {
      "id": 4,
      "name": "Ritchie and Sons",
      "address": "5 Superior Park"
    }, {
      "id": 5,
      "name": "Runolfsdottir-Medhurst",
      "address": "24 Vermont Avenue"
    }, {
      "id": 6,
      "name": "Ryan-Balistreri",
      "address": "65 Scoville Trail"
    }, {
      "id": 7,
      "name": "Eichmann-Koepp",
      "address": "41644 Straubel Point"
    }, {
      "id": 8,
      "name": "Crona-Ullrich",
      "address": "79639 Lindbergh Court"
    }, {
      "id": 9,
      "name": "Koss, Dickens and Heidenreich",
      "address": "42 Loeprich Court"
    }, {
      "id": 10,
      "name": "Kessler and Sons",
      "address": "906 Loeprich Point"
    }
  ];

  private invoicesJson: Object[] = [
    {
      id: 1,
      debtor: 2,
      amount: 120,
      date: "2018-01-01",
    },
    {
      id: 2,
      debtor: 6,
      amount: 50,
      date: "2017-12-15",
    },
    {
      id: 3,
      debtor: 3,
      amount: 11.11,
      date: "2011-11-11",
    }
  ];

  private endpoint: string = 'https://localhost/api/';
  
  getBookings(): Promise<any> {
    return new Promise((resolve, reject) => {
        Observable.forkJoin(this.listRequest('bookings'), this.listRequest('companys')).subscribe((res) => {
          this.bookingsJson = res[0]['bookings'];
          console.log("-------------SET BOOKINGS:", this.bookingsJson);
          this.companysJson = res[1]['companys'];
        }, undefined, () => {
          var bookingsJson = this.bookingsJson;
          var companysJson = this.companysJson;
          var result: Booking[]=[];
          for(var i=0;i<bookingsJson.length;i++){
              var creditor: Company;
              var debtor: Company;
              for(var ii=0;ii<companysJson.length;ii++){
                  if(companysJson[ii]['id']==bookingsJson[i]['creditor']){
                      creditor=new Company(companysJson[ii]['name'], companysJson[ii]['address'], companysJson[ii]['id']);
                      console.log("Creditor:",companysJson[ii], creditor);
                  }
                  if(companysJson[ii]['id']==bookingsJson[i]['debtor']){
                      debtor=new Company(companysJson[ii]['name'], companysJson[ii]['address'], companysJson[ii]['id']);
                      console.log("Debtor:",companysJson[ii]);
                  }
                  
              }
              var newBooking = new Booking(bookingsJson[i]['subject'], debtor, creditor, bookingsJson[i]['amount'], bookingsJson[i]['date'], bookingsJson[i]['id']);
              result.push(newBooking);
          }
          console.log("-------------GOT BOOKINGS----");
          resolve(result);
        });
    });
  }

  getBooking(id: Number): Promise<Booking>{
    var that = this;
    return new Promise(function(resolve, reject){

      that.getBookings()
      .then((bookings) => {

        for(var i=0;i<bookings.length;i++){
          if(bookings[i].id==id){
            resolve(bookings[i]);
          }
        }
        console.log("Not found");
        resolve(undefined);
      })
      .catch((err) => {reject(err)});
    })
  }

  calculateMonthlyBalances(input): Object{
    const monthNames: String[] = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    var orderedInput = this.orderByPipe.transform(input, "date", "ASC");
    var result: Object = {datasets: [{data: [], label: "Kontostand in €"}], labels: []};
    var totalBalance = 0;
    var tempMonthBalance = 0;
    for(var i=0;i<orderedInput.length;i++){
      var tmpDate = new Date(orderedInput[i]['date']);
      var lastDate: Date;
      if(orderedInput[i-1]){
        lastDate = new Date(orderedInput[i-1]['date']);
      }
      if((lastDate) && !(tmpDate.getMonth() == lastDate.getMonth() && tmpDate.getFullYear() == lastDate.getFullYear())){
        console.log("Month finished:"+lastDate.getMonth());
        totalBalance+=tempMonthBalance;
        result['datasets'][0]['data'].push(totalBalance.toFixed(2));
        result['labels'].push(monthNames[lastDate.getMonth()]+"-"+lastDate.getFullYear());
        tempMonthBalance=0;
      } 
      if(this.isOutgoingBooking(orderedInput[i])){
        tempMonthBalance-=orderedInput[i]['amount'];
      }else{
        tempMonthBalance+=orderedInput[i]['amount'];
      }
    }
    console.log("Month finished:"+lastDate.getMonth());
    totalBalance+=tempMonthBalance;
    result['datasets'][0]['data'].push(totalBalance.toFixed(2));
    result['labels'].push(monthNames[lastDate.getMonth()]+"-"+lastDate.getFullYear());
    tempMonthBalance=0; 
    return result;
  }

  getCompanys(): Promise<Company[]> {
    return new Promise((resolve, reject) => {
      this.listRequest('companys').subscribe((res) => {
        if(res['companys']){
          this.companysJson = res['companys'];
        }
        var result: Company[] = [];
        for(var i=0;i<this.companysJson.length;i++){
          result.push(new Company(this.companysJson[i]['name'], this.companysJson[i]['address'], this.companysJson[i]['id']))
        }
        resolve(result);
      })
    })
  }

  getCompany(id: number): Company{
      (async () {await this.getCompanys();})()
      return (new Company(this.companysJson[id]['name'], this.companysJson[id]['address'], this.companysJson[id]['id']));

  }

  isOutgoingBooking(booking){
    return booking['creditor']['id']==1;
  }

  getInvoices(): Promise<Invoice[]>{
    return new Promise((resolve, reject) => {
      this.listRequest('invoices').subscribe((res) => {
        if(res['invoices']){
          this.invoicesJson = res['invoices'];
        }
        var result: Invoice[] = [];
        for(var i=0;i<this.invoicesJson.length;i++){
          result.push(new Invoice(this.getCompany(this.invoicesJson[i]["debtor"]), this.invoicesJson[i]["amount"], new Date(this.invoicesJson[i]["date"]), this.invoicesJson[i]["id"]));
        }
        resolve(result);
      })
    })
  }

  listRequest(path: string) {
    let headers = new HttpHeaders().set('sessionid', this.auth.session.id);
    console.log(headers);
    return this.http.get(this.endpoint+path, {headers});
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
  constructor(public debtor: Company, public amount: Number, public date: Date, public id?: Number){
    
  }

  save(): Promise<{}> {
    return new Promise(function(resolve, reject){
      resolve({success: true, error: ''});
    });
  }
}

export class Company {
  constructor(public name: String, public address: String, public id?: Number){

  }
}