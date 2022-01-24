import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(public posts:PostsService) { }
  dataPosts!:any[]
  paginatorArray!:any[]
  lengthPosts!:number
  pageSize!:number
  pageIndex:number=0
  @ViewChild('paginator',{static:true})
  paginator!:MatPaginator


  ngOnInit(): void {
    this.posts.getPosts().subscribe((result:any)=>{
      this.dataPosts=result
      this.lengthPosts=result.length
      this.changedItemsPage()
    })
   const paginatorIntl=this.paginator._intl
   this.paginator.pageIndex=0
  }
  changedItemsPage(event?:any|undefined){
    this.pageSize=this.paginator.pageSize
    this.paginatorArray=this.dataPosts.slice(0,this.pageSize) 
    if(event){
      if(event.pageIndex>this.pageIndex){
        this.paginatorArray=this.dataPosts.slice(((event.pageIndex) * this.pageSize ), ((event.pageIndex+1)* this.pageSize))
        
      }
      else if(event.pageIndex<this.pageIndex){

      }
    }
  
    
  }

}
