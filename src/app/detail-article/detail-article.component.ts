import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent implements OnInit {

  constructor(public posts:PostsService,public route:ActivatedRoute,private location:Location) { }
  article?:any

  ngOnInit(): void {
    const id:string|null=this.route.snapshot.paramMap.get("id")
    this.posts.getFullArticle(id).subscribe((result:any)=>{
      this.article=result
    })
  }
  back(){
    this.location.back()
  }


}
