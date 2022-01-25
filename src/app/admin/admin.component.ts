import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../auth.service';
import { PostsService } from '../posts.service';
import {Project,PortfolioService} from "../portfolio.service"

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  posts?:any
  projects?:Array<Project>
  paginatorArray?:any[]
  pageSize!:number
  pageIndex:number=0
  @ViewChild('paginator',{static:true})
  paginator!:MatPaginator
  paginatorArrayByProject?:any[]
  pageSizeByProject!:number
  pageIndexByProject:number=0
  @ViewChild('paginatorByProject',{static:true})
  paginatorByProject!:MatPaginator
  constructor(public auth:AuthService,public post:PostsService,private projectsService:PortfolioService) { }

  ngOnInit(): void {
   
    this.post.getPosts().subscribe((data)=>{
      this.posts=data
      this.changedItemsPage()
    })
    this.projectsService.getProjects().subscribe((data)=>{ 
        this.projects=data
        this.changedItemsPageByProject()
    })
    
 
  }
  changedItemsPage(event?:any|undefined){
    this.pageSize=this.paginator.pageSize
    this.paginatorArray=this.posts.slice(0,this.pageSize) 
    if(event){
      if(event.pageIndex>this.pageIndex){
        this.paginatorArray=this.posts.slice(((event.pageIndex) * this.pageSize ), ((event.pageIndex+1)* this.pageSize))
        
      }
      else if(event.pageIndex<this.pageIndex){

      }
    }
  
    
  }
  changedItemsPageByProject(event?:any|undefined){
    this.pageSizeByProject=this.paginatorByProject.pageSize
    this.paginatorArrayByProject=this.projects!.slice(0,this.pageSizeByProject) 
    if(event){
      if(event.pageIndex>this.pageIndexByProject){
        this.paginatorArrayByProject=this.projects!.slice(((event.pageIndex) * this.pageSizeByProject ), ((event.pageIndex+1)* this.pageSizeByProject))
        
      }
      else if(event.pageIndex<this.pageIndexByProject){

      }
    }
  
    
  }

}
