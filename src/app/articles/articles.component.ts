import { Component } from '@angular/core';
import { Article, ArticleService } from '../services/article.service';

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers: [ ArticleService ]
})
export class ArticlesComponent{

  private articles: Article[];
  constructor(private articleService: ArticleService){
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getArticles().then( data => {
      this.articles = data;
    })
  }

}
