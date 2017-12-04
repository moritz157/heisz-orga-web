import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sidenav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent{
  user: Object = {"username": "test1"};
  navRoutes: Object[] = [{name: "Dashboard", path: "dashboard"}, {name: "Artikel", path: "articles"}, {name: "Termine", path: "events"}, {name: "Mails", path: "mails"}, {name: "Buchhaltung", path: "accounting"}, {name: "Abosystem", path: "subscriptions"}];
  selected="Dashboard";

  constructor(private router: Router){

  }

  navigate(e: MouseEvent, route: Object): void {
    console.log("Click:", route['name'], route['path']);
    this.selected=route['name'];
    this.router.navigateByUrl("/"+route['path']);
  }
}
