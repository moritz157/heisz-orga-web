import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, User, Session } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  loggedIn: Boolean = false;
  navigatingToLogin = false;

  constructor(private auth: AuthService, private router: Router){
    
   /* setTimeout(() => {
      this.user = {"username": "test1"};
    }, 2000);*/
  }

  ngOnInit(): void {
    console.log("router:", this.router);
    this.loggedIn = this.auth.user && this.auth.session && !this.auth.session.isExpired();
    if(!this.loggedIn){
      console.log("Navigating...");
      this.navigatingToLogin = true;
      this.router.navigateByUrl("/login")
    }else{
      console.log("Logged In!")
    }

    this.router.events.subscribe(() => {
      //console.log("ROUTER-EVENT")
      this.loggedIn = this.auth.user && this.auth.session && !this.auth.session.isExpired();
      if(!this.loggedIn){
        console.log("[Router] Not logged in", this.auth.user, this.auth.session);
        //console.log("not logged in")
        if(this.router.url=="/login"){
          this.navigatingToLogin = true;
         
        }else if(!this.navigatingToLogin){
          this.router.navigateByUrl("/login");
        }
      }else {
        console.log("[Router] Logged in");
      }
    });
}
}
