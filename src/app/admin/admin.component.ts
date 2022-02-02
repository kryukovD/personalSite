import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../auth.service';
import { PostsService } from '../posts.service';
import {Project,PortfolioService, Notice} from "../portfolio.service"
import { Order,FormService } from '../form.service';
import { mergeMap } from 'rxjs/operators';
const randomize=require('randomatic')


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  posts?:any
  orders?:Order[]|Notice|any
  headersTable=["id","name","family","phone","message","category","active","apply"]
  projects?:Array<Project>
  paginatorArray?:any[]
  pageSize!:number
  pageIndex:number=0
  @ViewChild('paginator',{static:true})
  paginator!:MatPaginator
  paginatorArrayByProject?:any[]
  pageSizeByProject!:number
  pageIndexByProject:number=0
  notice?:Notice
  @ViewChild('paginatorByProject',{static:true})
  paginatorByProject!:MatPaginator
  constructor(public auth:AuthService,public post:PostsService,private projectsService:PortfolioService,private formService :FormService) { }

  ngOnInit(): void {
   
    this.post.getPosts().subscribe((data)=>{
      this.posts=data
      this.changedItemsPage()
    })
    this.projectsService.getProjects().subscribe((data)=>{ 
        this.projects=data
        this.changedItemsPageByProject()
    })
    this.formService.getOrders().subscribe((data)=>{
      this.orders=data
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
  saveStatusOrder(event:any){
    const id=event.currentTarget.value
    const input=document.querySelector(`.input__active${id}`) as HTMLInputElement
    let order=this.orders.find((item:any)=>item.id==id)
    if(input.checked){
      let key=randomize("A","5")
      this.formService.insertKeyOrder(id,1,key,order.email).pipe(mergeMap((data:Notice)=>{
        this.notice=data
        return this.formService.getOrders()
      })).subscribe((data)=>this.orders=data)
    }
    else{
      this.formService.insertKeyOrder(id,0).pipe(mergeMap((data:Notice)=>{
        this.notice=data
        return this.formService.getOrders()
      })).subscribe(data=>this.orders=data)
    }
  }

}
