import { Component, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { Event, EventService } from '../services/event.service';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements AfterViewInit{
  @ViewChild(CalendarComponent)
  private calendar: CalendarComponent;

  private nextEvents: Event[];

  constructor(private zone: NgZone, private eventService: EventService){

  }

  ngAfterViewInit(){
    this.eventService.getEvents()
    .then((events) => {
      this.nextEvents=events;
      console.log("Events:", events)
    })
    var that = this;
    this.zone.run(() => {
      setTimeout(function(){
        console.log(that.calendar.date);
        //that.calendar.date = new Date("2018-01-20");
        //console.log("Set date to 16.09.2002");
        //console.log(that.calendar.date);
      }, 5000);
    })
  }

}


