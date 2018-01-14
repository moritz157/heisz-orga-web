import { Component, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { User } from '../services/auth.service';
import { CalendarComponent } from './calendar.component';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements AfterViewInit{
  @ViewChild(CalendarComponent)
  private calendar: CalendarComponent;

  constructor(private zone: NgZone){

  }

  ngAfterViewInit(){
    var that = this;
    this.zone.run(() => {
      setTimeout(function(){
        console.log(that.calendar.date);
        that.calendar.date = new Date("2018-01-20");
        //console.log("Set date to 16.09.2002");
        //console.log(that.calendar.date);
      }, 5000);
    })
  }

}

export class Event {
  public eventDateTime: Date;
  public title: String;
  public description: String;
  public members: User[];
  public color: String;
  
  constructor(eventObject: Object) {

  }
}
