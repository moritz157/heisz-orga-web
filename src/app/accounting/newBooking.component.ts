import { Component, OnInit } from '@angular/core';
import { AccountingService, Booking } from './accounting.service';
import { AccountingComponent } from 'app/accounting/accounting.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'newBooking',
  templateUrl: './newBooking.component.html',
  styleUrls: ['./newBooking.component.css'],
  providers: [ AccountingService ]
})
export class NewBookingComponent implements OnInit{
    private companys = [];
    private booking: Booking;
    private ready: Boolean = false;

    private title = "Neue Buchung";
    constructor(private accountingService: AccountingService, private route: ActivatedRoute){
        this.companys = accountingService.getCompanys();
    }

    ngOnInit(): void{
        var id = this.route.snapshot.params['id'];
        console.log("Id:", id);
        if(id){
            this.title = "Buchung bearbeiten";
            console.log("Loading booking...")
            this.accountingService.getBooking(id)
            .then((booking) => {
                if(booking){
                    this.booking=booking;
                    console.log("Current Booking:", booking);
                    this.ready=true;
                }else{
                    alert("Diese Buchung kann nicht gefunden werden :(");
                }
            })
            .catch((err) => {
                console.log("Error:", err);
            });
        }else{
            this.booking=new Booking("", undefined, undefined, 0.00, new Date(Date.now()));
            this.ready=true;
        }
    }

    save() {
        console.log(this.booking);
    }

    cancel() {
        console.log("Cancel");
    }

    compareCompanys(c1, c2){
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }
}
