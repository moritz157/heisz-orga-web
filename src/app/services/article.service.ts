import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User, AuthService } from './auth.service';

@Injectable()
export class ArticleService {
    private articles: Article[];
    private mockJson: Object[] = [
        {
            id: 0,
            name: "Lehrervoting",
            seitenzahl: 2,
            anfang: 3,
            ende: 5,
            ressort: "Heiszes vom Heilwig",
            layout: 0,
            artikel: 4,
            autor_1: this.authService.sampleUsers()[0],
            autor_2: this.authService.sampleUsers()[1],
            anmerkungen: "",
            layouter_1: this.authService.sampleUsers()[0],
            layouter_2: this.authService.sampleUsers()[0]
        },
        {
            id: 1,
            name: "Dr. Winter",
            seitenzahl: 2,
            anfang: 3,
            ende: 5,
            ressort: "Heiszer Scheisz",
            layout: 1,
            artikel: 3,
            autor_1: this.authService.sampleUsers()[0],
            autor_2: this.authService.sampleUsers()[1],
            anmerkungen: "",
            layouter_1: this.authService.sampleUsers()[0],
            layouter_2: this.authService.sampleUsers()[0]
        },
        {
            id: 2,
            name: "Test",
            seitenzahl: 2,
            anfang: 3,
            ende: 5,
            ressort: "Anzeige",
            layout: 2,
            artikel: 3,
            autor_1: this.authService.sampleUsers()[0],
            autor_2: this.authService.sampleUsers()[1],
            anmerkungen: "",
            layouter_1: this.authService.sampleUsers()[0],
            layouter_2: this.authService.sampleUsers()[0]
        }
    ];

    private endpoint: string = 'https://localhost/api/'; 

    constructor(private authService: AuthService, private http: HttpClient){

    }

    getArticles(): Promise<Article[]>{
        var that = this;
        return new Promise((resolve, reject) => {
            var result: Article[] = [];
            that.mockJson.forEach(ar => {
                console.log("Ar:", ar)
                result.push(new Article(ar));
            });
            resolve(result);
            //this.http.get(this.endpoint+'')
        });
    }
}

export class Article {
    id: number;
    name: string;
    seitenzahl: number;
    anfang: number;
    ende: number;
    ressort: string;
    layout: number;
    artikel: number;
    autor_1: User;
    autor_2: User;
    anmerkungen: string;
    layouter_1: User;
    layouter_2: User;

    constructor(private article: Object){
        this.id = article["id"] || 0;
        this.name = article["name"] || "";
        this.seitenzahl = article["seitenzahl"] || 1;
        this.anfang = article["anfang"] || 3;
        this.ende = article["ende"] || this.anfang+this.seitenzahl;
        this.ressort = article["ressort"] || "";
        this.layout = article["layout"] || 0;
        this.artikel = article["artikel"] || 0;
        this.autor_1 = article["autor_1"] || undefined;
        this.autor_2 = article["autor_2"] || undefined;
        this.anmerkungen = article["anmerkungen"] || "";
        this.layouter_1 = article["layouter_1"] || undefined;
        this.layouter_2 = article["layouter_2"] || undefined;
    }
}