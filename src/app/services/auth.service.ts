import { Injectable } from "@angular/core";


@Injectable()
export class AuthService {
    public user: User;
    public session: Session;
    private setDefaultUser: Boolean = true;
    private defaultUser: User = new User({"firstname":"Moritz", "lastname":"Ahrens", "email":"moritz.ahrens2@gmail.com", "id":1});
    private defaultSession: Session = new Session({"id":"7dbe1f224b6a0554949a3e7c15db82ee755953997eaa8c2727b4e5c8c7db8e9b", "user_id":1}); 

    constructor(){
        if(window.localStorage.getItem("session_id")){
            var data = this.getDataFromSessionId(window.localStorage.getItem("session_id"));
            this.user = data.user;
            this.session = data.session;
        }else if(this.setDefaultUser){
            //this.user = this.defaultUser;
            //this.session = new Session({"id":"session_no_000001", "user_id":1});
            console.log("Set default user:", this.user);
        }
    }

    public login(username: String, password: String): Promise<User>{
        var that = this;
        return new Promise(function(resolve, reject){
            that.user = that.defaultUser;
            that.session = that.defaultSession;
            window.localStorage.setItem("session_id", "session_no_000001")
            resolve(new User({}));
        })
    }

    public logout(): Promise<Object> {
        var p = this.session.destroy();
        p.then(() => {
            this.user = undefined;
        });
        return p;
        
    }

    public getDataFromSessionId(session_id){
        return {"user": this.defaultUser, "session": this.defaultSession}
    }

    public sampleUsers(): User[] { 
        return([
            new User({"firstname":"Max", "lastname":"Mustermann", "email":"max.mustermann@test.de", id: 1}),
            new User({"firstname":"Erika", "lastname":"Mustermann", "email":"erika.mustermann@test.de", id: 2})
        ]);
    }
}

export class User {
    public email: String;
    public id: Number;
    public firstname: String;
    public lastname: String;
    public avatar: String;
    public flags: String[];
    public settings: Object; 

    constructor(user: Object){
        this.email = user['email'] || "";
        this.id = user['id'] || -1;
        this.firstname = user['firstname'] || "";
        this.lastname = user['lastname'] || "";
        this.flags = user['flags'] || [];
        this.settings = user['settings'] || {};
        this.avatar = user['avatar'] || this.generateAvatar();
    }

    public generateAvatar(): String {
        const colors = ["#c62828", "#ad1457", "#6a1b9a", "#4527a0", "#283593", "#1565c0", "#0277bd", "#00838f", "#2e7d32", "#558b2f", "#9e9d24", "#f9a825", "#ff8f00", "#ef6c00", "#d84315"];
        return "https://dummyimage.com/60x60/"+colors[Math.round(Math.random() * (colors.length - 1))].substr(1)+"/ffffff&text="+this.firstname[0]+this.lastname[0];
    }

    public sampleUsers(): User[] { 
        return([
            new User({"firstname":"Max", "lastname":"Mustermann", "email":"max.mustermann@test.de", id: 1}),
            new User({"firstname":"Erika", "lastname":"Mustermann", "email":"erika.mustermann@test.de", id: 2})
        ]);
    }
}

export class Session {
    public id: string;
    public user_id: Number;
    public created: number;
    public expires: number;

    constructor(session: Object) {
        const expireTime: number = 1000 * 60 * 60 * 24 *30;

        this.id = session['id'] || "";
        this.user_id = session["user_id"] || "";
        this.created = session["created"] || Date.now();
        this.expires = session["expires"] || this.created + expireTime;
        //console.log("Creating session: ", this.created, expireTime);
    }

    public generateSessionId(): Promise<string> {
        return new Promise(function(resolve, reject){
            resolve("");
        })
    }

    public destroy(): Promise<Object> {
        return new Promise(function(resolve, reject){
            resolve({});
        })
    }

    public isExpired(){
        //console.log("Session expired? ", this.expires, Date.now(), this.expires > Date.now());
        return this.expires < Date.now();
    }
}