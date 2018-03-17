import { Injectable } from "@angular/core";
import { User } from '../services/auth.service';

Injectable()
export class EventService {
    private eventJson = [{
        "id": 1,
        "eventDateTime": "2017-05-12 18:50:44",
        "title": "diam erat fermentum ",
        "description": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
        "members": null,
        "color": "#c5a697"
      }, {
        "id": 2,
        "eventDateTime": "2017-05-26 22:00:57",
        "title": "vulputate vitae ",
        "description": "Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.",
        "members": null,
        "color": "#59d371"
      }, {
        "id": 3,
        "eventDateTime": "2017-07-01 11:57:15",
        "title": "duis ac nibh ",
        "description": "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede.",
        "members": null,
        "color": "#5d8eca"
      }, {
        "id": 4,
        "eventDateTime": "2017-02-13 21:06:40",
        "title": "placerat ante ",
        "description": "Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
        "members": null,
        "color": "#3bd78f"
      }, {
        "id": 5,
        "eventDateTime": "2017-02-25 21:22:19",
        "title": "sociis natoque",
        "description": "Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
        "members": null,
        "color": "#1cd6ac"
      }, {
        "id": 6,
        "eventDateTime": "2017-05-08 12:42:41",
        "title": "porttitor lorem",
        "description": "Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.",
        "members": null,
        "color": "#bbe0af"
      }, {
        "id": 7,
        "eventDateTime": "2018-01-07 06:13:46",
        "title": "odio curabitur convallis",
        "description": "Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
        "members": null,
        "color": "#14bb48"
      }, {
        "id": 8,
        "eventDateTime": "2017-10-09 20:17:54",
        "title": "in blandit ultrices haskdk  oijweffn aspojdiun q oujhfw iouewf Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesqueMaecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque",
        "description": "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
        "members": null,
        "color": "#ccf9e6"
      }];
    
    constructor(){

    }

    public getEvents(): Promise<Event[]> {
        var that = this;
        return new Promise(function(resolve, reject){
            var result: Event[] = [];
            for(var i=0;i<that.eventJson.length;i++){
                result.push(new Event(that.eventJson[i]));
            }
            resolve(result);
        });
    }
}

export class Event {
    public id: Number;
    public eventDateTime: Date;
    public title: String;
    public description: String;
    public members: User[];
    public color: String;

    constructor(eventObject: Object) {
        this.id = eventObject['id'];
        this.eventDateTime = eventObject['eventDateTime'];
        this.title = eventObject['title'] || "";
        this.description = eventObject['description'] || "";
        this.members = eventObject['members'] || [];
        this.color = eventObject['color'] || "";
    }
}