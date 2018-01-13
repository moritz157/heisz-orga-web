import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent {
    private username = "";
    private password = "";
    constructor(private auth: AuthService, private router: Router){
        
    }

    scrollDown(): void {
        document.getElementById("login-wrapper").scroll(0, window.innerHeight);
    }

    login(): void {
        this.auth.login(this.username, this.password)
        .then(() => {
            console.log("Logged in");
            this.router.navigateByUrl("/dashboard");
        });
    }
}