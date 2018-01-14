import { Component,  OnInit, NgZone } from '@angular/core';

@Component({
    selector: "calendar",
    templateUrl: 'calendar.component.html',
    styleUrls: ['calendar.component.css']

})
export class CalendarComponent implements OnInit{
    private _date: Date;
    set date(date: Date){
        this.zone.run(() => {
            this._date = date;
            this.generateFields();
            console.log("Date was set to:", this._date);

        });
    }

    get date(){
        return this._date;
    }

    private fields: Object[] = [];
    monthNames: String[] = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

    constructor(private zone: NgZone){
        this._date = new Date("2018-02-16");
        this.generateFields();
    }

    private lastDate: Date = undefined;
    generateFields(): void {
        var date = this._date;
        console.log("this.fields.length:", this.fields.length);
        if(this.fields.length==0){
            var monthFields = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
            var preFields = 0;
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
            if(firstDay==0){
                preFields = 6;
            }else{
                preFields = firstDay-1;
            }

            var daysMonthBefore = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
            console.log("monthBefore:", new Date(date.getFullYear(), date.getMonth(), 0),"daysMonthBefore:", daysMonthBefore);
            for(var i=0;i<preFields;i++){
                this.fields.push({"pre":true,"date":daysMonthBefore-(preFields-i-1)});
            }
            for(var i=0;i<monthFields;i++){
                this.fields.push({"pre":false,"date":i+1,"selected":false});
                if(date.getDate() == i+1){
                    this.fields[this.fields.length-1]["selected"]=true;

                }
            }
            console.log("Fields:", this.fields);
            this.lastDate = new Date(date);
        }else if(this.lastDate && date.getMonth()===this.lastDate.getMonth() && date.getFullYear()===this.lastDate.getFullYear()){
            console.log("Just changing selection", this.lastDate);
            for(var i=0;i<this.fields.length;i++){
                if(this.fields[i]["pre"]==false && this.fields[i]["date"]==date.getDate()){
                    this.fields[i]["selected"]=true;
                }else{
                    this.fields[i]["selected"]=false;
                }
            }
        }else{
            console.log("Clearing fields")
            this.fields = [];
            this.generateFields();
        }
    }

    select(field){
        for(var i=0;i<this.fields.length;i++){
            if(this.fields[i]["pre"]==false && this.fields[i]==field){
                this.fields[i]["selected"]=true;
                this._date.setDate(field.date);
            }else{
                this.fields[i]["selected"]=false;
            }
        }
    }

    ngOnInit() {
        
    }

    monthBack() {
        var tmp = this.date;
        tmp.setMonth(tmp.getMonth()-1);
        this.date = tmp;
        this.generateFields();
    }

    monthForward() {
        var tmp = this.date;
        tmp.setMonth(tmp.getMonth()+1);
        this.date = tmp;
        //this.generateFields();
    }
}