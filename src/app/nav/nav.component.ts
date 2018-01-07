import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sidenav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent{
  user: Object = {"username": "test1", "avatar":"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"};
  navRoutes: Object[] = [{name: "Home", path: "dashboard", mobile: true, icon: "home"}, {name: "Artikel", path: "articles", mobile: true, icon: "create"}, {name: "Termine", path: "events", mobile: true, icon: "event"}, {name: "Mails", path: "mails", mobile: true, icon: "mail"}, {name: "Buchhaltung", path: "accounting", mobile: true, icon: "attach_money"}, {name: "Abosystem", path: "subscriptions", mobile: false, icon: "group"}, {name: "Einstellungen", path: "settings", mobile: true, icon: "settings"}, {name: "Abmelden", path: "logout", mobile: false, icon: "exit_to_app"}];
  selected="Home";

  constructor(private router: Router){

  }

  navigate(e: MouseEvent, route: Object): void {
    console.log("Click:", route['name'], route['path']);
    this.selected=route['name'];
    this.router.navigateByUrl("/"+route['path']);
  }
}
